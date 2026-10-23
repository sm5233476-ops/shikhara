// src/components/canvas/Sky.tsx
import { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { BackSide, Color, ShaderMaterial, Vector3, type Mesh } from 'three';
import { atmosphere } from '../../lib/timeOfDay';

const vertexShader = /* glsl */ `
  varying vec3 vDir;

  void main() {
    vDir = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uTop;
  uniform vec3 uMid;
  uniform vec3 uHorizon;
  uniform vec3 uSunColor;
  uniform vec3 uSunDir;
  uniform float uSunVis;
  uniform vec3 uMoonDir;
  uniform float uNight;
  uniform float uCityGlow;
  uniform vec3 uGlowColor;

  varying vec3 vDir;

  float hash31(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  float starLayer(vec3 d, float scale, float threshold, float radius) {
    vec3 p = d * scale;
    vec3 cell = floor(p);
    vec3 local = fract(p) - 0.5;
    float h = hash31(cell);
    vec3 offset = vec3(hash31(cell + 1.7), hash31(cell + 3.1), hash31(cell + 5.3)) - 0.5;
    float on = step(threshold, h);
    float twinkle = 0.65 + 0.35 * sin(uTime * 1.7 + h * 80.0);
    float dist = length(local - offset * 0.7);
    return on * twinkle * (1.0 - smoothstep(0.0, radius, dist));
  }

  vec3 skyGradient(float up) {
    vec3 c = mix(uHorizon, uMid, smoothstep(0.0, 0.18, up));
    return mix(c, uTop, smoothstep(0.12, 0.8, up));
  }

  void main() {
    vec3 d = normalize(vDir);
    float up = abs(d.y);
    vec3 col = skyGradient(up);

    // Soft sunrise / sunset glow, strongest at the horizon next to the sun.
    float sd = max(dot(d, uSunDir), 0.0);
    float horizonBand = exp(-up * 7.0);
    float glow = pow(sd, 4.0) * 0.38 * horizonBand + pow(sd, 14.0) * 0.2 + pow(sd, 120.0) * 0.55;
    col += uSunColor * glow * uSunVis;

    // Sun disc (hidden below the horizon).
    float disc = smoothstep(0.9997, 0.99992, sd) * smoothstep(-0.004, 0.012, d.y);
    col += uSunColor * disc * 4.0 * uSunVis;

    // Warm city glow hugging the horizon at night.
    col += uGlowColor * uCityGlow * exp(-up * 9.0) * 0.32;

    // Moon.
    float md = max(dot(d, uMoonDir), 0.0);
    float moon = smoothstep(0.99975, 0.99992, md);
    col += vec3(0.85, 0.9, 1.0) * (moon * 1.6 + pow(md, 220.0) * 0.35 + pow(md, 30.0) * 0.05) * uNight;

    // Stars.
    float stars = starLayer(d, 110.0, 0.985, 0.1) + starLayer(d, 260.0, 0.992, 0.12) * 0.7;
    stars *= smoothstep(0.03, 0.4, d.y) * uNight;
    col += vec3(0.9, 0.95, 1.0) * stars * 1.2;

    // Below the horizon the sky acts as a darker mirrored sky seen through the sea.
    col *= mix(0.72, 1.0, step(0.0, d.y));

    // Dither to avoid gradient banding.
    col += (hash31(d * 513.7) - 0.5) / 255.0;

    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

export function Sky() {
  const meshRef = useRef<Mesh>(null);

  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uTime: { value: 0 },
          uTop: { value: new Color() },
          uMid: { value: new Color() },
          uHorizon: { value: new Color() },
          uSunColor: { value: new Color() },
          uSunDir: { value: new Vector3(0, 1, 0) },
          uSunVis: { value: 0 },
          uMoonDir: { value: new Vector3(0, 1, 0) },
          uNight: { value: 0 },
          uCityGlow: { value: 0 },
          uGlowColor: { value: new Color() },
        },
        vertexShader,
        fragmentShader,
        side: BackSide,
        depthWrite: false,
        depthTest: false,
      }),
    [],
  );

  useEffect(() => () => material.dispose(), [material]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (mesh) {
      mesh.position.copy(state.camera.position);
    }

    const u = material.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uTop.value.copy(atmosphere.skyTop);
    u.uMid.value.copy(atmosphere.skyMid);
    u.uHorizon.value.copy(atmosphere.skyHorizon);
    u.uSunColor.value.copy(atmosphere.sunColor);
    u.uSunDir.value.copy(atmosphere.sunDirection);
    u.uSunVis.value = atmosphere.sunVisibility;
    u.uMoonDir.value.copy(atmosphere.moonDirection);
    u.uNight.value = atmosphere.night;
    u.uCityGlow.value = atmosphere.cityGlow;
    u.uGlowColor.value.copy(atmosphere.glowColor);
  });

  return (
    <mesh ref={meshRef} renderOrder={-100} frustumCulled={false}>
      <sphereGeometry args={[500, 48, 32]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

export default Sky;
