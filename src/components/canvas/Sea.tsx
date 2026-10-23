// src/components/canvas/Sea.tsx
import { useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, ShaderMaterial, Vector3 } from 'three';
import { atmosphere } from '../../lib/timeOfDay';

const vertexShader = /* glsl */ `
  varying vec3 vWorld;

  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uTop;
  uniform vec3 uMid;
  uniform vec3 uHorizon;
  uniform vec3 uSunDir;
  uniform vec3 uSunColor;
  uniform float uSunVis;
  uniform vec3 uDeep;
  uniform vec3 uTint;
  uniform vec3 uGlowColor;
  uniform float uCityGlow;
  uniform vec3 uFogColor;
  uniform float uFogDensity;
  uniform float uMirror;
  uniform float uDetail;

  varying vec3 vWorld;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float waveHeight(vec2 p) {
    float t = uTime;
    float h = vnoise(p * 0.12 + vec2(t * 0.045, t * 0.030)) * 0.90;
    h += vnoise(p * 0.35 + vec2(-t * 0.080, t * 0.060)) * 0.45;
    h += vnoise(p * 0.95 + vec2(t * 0.130, -t * 0.110)) * 0.18;
    if (uDetail > 0.5) {
      h += vnoise(p * 2.40 + vec2(-t * 0.22, t * 0.18)) * 0.08;
    }
    return h;
  }

  vec3 waterNormal(vec2 p, float strength) {
    float e = 0.3;
    float h0 = waveHeight(p);
    float hx = waveHeight(p + vec2(e, 0.0));
    float hz = waveHeight(p + vec2(0.0, e));
    vec2 g = vec2(h0 - hx, h0 - hz) / e;
    return normalize(vec3(g.x * strength, 1.0, g.y * strength));
  }

  vec3 skyGradient(float up) {
    vec3 c = mix(uHorizon, uMid, smoothstep(0.0, 0.18, up));
    return mix(c, uTop, smoothstep(0.12, 0.8, up));
  }

  void main() {
    vec3 toCam = cameraPosition - vWorld;
    float dist = length(toCam);
    vec3 V = toCam / dist;

    // Ripples calm down with distance so the horizon stays clean.
    float fade = exp(-dist * 0.0065);
    vec3 N = waterNormal(vWorld.xz, fade * 0.6);

    float cosT = clamp(dot(N, V), 0.0, 1.0);
    float fres = 0.025 + 0.975 * pow(1.0 - cosT, 5.0);

    // What the water reflects: sky gradient, sun glitter, warm city glow.
    vec3 R = reflect(-V, N);
    R.y = abs(R.y);
    vec3 refl = skyGradient(R.y);

    float sd = max(dot(R, uSunDir), 0.0);
    float sparkle = smoothstep(0.30, 0.80, vnoise(vWorld.xz * 1.7 + vec2(uTime * 0.35, -uTime * 0.2)));
    float sunTerm = pow(sd, 900.0) * 6.0 * sparkle + pow(sd, 70.0) * 0.45 + pow(sd, 8.0) * 0.12 * exp(-R.y * 6.0);
    refl += uSunColor * sunTerm * uSunVis;
    refl += uGlowColor * uCityGlow * exp(-R.y * 8.0) * 0.30;

    // Deep indigo-marine body colour, lighter when looking down.
    vec3 body = mix(uDeep, uTint, pow(cosT, 2.0) * 0.55);

    vec3 col = mix(body, refl, fres);

    // Distance fog melts the sea into the horizon haze.
    float fogF = clamp(1.0 - exp(-pow(uFogDensity * dist, 2.0)), 0.0, 1.0);
    col = mix(col, uFogColor, fogF);

    // With mirror on, the sea is slightly transparent so the mirrored tower and
    // skyline underneath show through where the reflection is strongest.
    float alpha = mix(1.0, mix(0.97, 0.66, fres), uMirror);
    alpha = mix(alpha, 1.0, fogF);

    gl_FragColor = vec4(col, alpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export interface SeaProps {
  /** Show the mirrored tower / skyline through the water. */
  mirror?: boolean;
  /** Extra high-frequency ripples (high quality only). */
  detail?: boolean;
}

export function Sea({ mirror = true, detail = true }: SeaProps) {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uTop: { value: new Color() },
          uMid: { value: new Color() },
          uHorizon: { value: new Color() },
          uSunDir: { value: new Vector3(0, 1, 0) },
          uSunColor: { value: new Color() },
          uSunVis: { value: 0 },
          uDeep: { value: new Color() },
          uTint: { value: new Color() },
          uGlowColor: { value: new Color() },
          uCityGlow: { value: 0 },
          uFogColor: { value: new Color() },
          uFogDensity: { value: 0.003 },
          uMirror: { value: 1 },
          uDetail: { value: 1 },
        },
        vertexShader,
        fragmentShader,
        transparent: true,
        depthWrite: false,
      }),
    [],
  );

  useEffect(() => () => material.dispose(), [material]);

  useEffect(() => {
    material.uniforms.uMirror.value = mirror ? 1 : 0;
    material.uniforms.uDetail.value = detail ? 1 : 0;
  }, [material, mirror, detail]);

  useFrame((state) => {
    const u = material.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uTop.value.copy(atmosphere.skyTop);
    u.uMid.value.copy(atmosphere.skyMid);
    u.uHorizon.value.copy(atmosphere.skyHorizon);
    u.uSunDir.value.copy(atmosphere.sunDirection);
    u.uSunColor.value.copy(atmosphere.sunColor);
    u.uSunVis.value = atmosphere.sunVisibility;
    u.uDeep.value.copy(atmosphere.seaDeep);
    u.uTint.value.copy(atmosphere.seaTint);
    u.uGlowColor.value.copy(atmosphere.glowColor);
    u.uCityGlow.value = atmosphere.cityGlow;
    u.uFogColor.value.copy(atmosphere.fogColor);
    u.uFogDensity.value = atmosphere.fogDensity;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} frustumCulled={false}>
      <planeGeometry args={[2600, 2600]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

export default Sea;
