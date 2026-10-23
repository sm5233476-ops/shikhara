// src/components/canvas/TowerCore.tsx
import { useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, MathUtils, MeshStandardMaterial } from 'three';
import { atmosphere } from '../../lib/timeOfDay';

/** Shared tower maths. Tower.tsx uses the same functions for the slabs, so slabs and glass always line up. */
export const TOWER_FLOORS = 48;
export const TOWER_BASE_SIZE = 10;

/** Footprint scale along the height (t = 0 at the base, 1 at the crown): tapers to 62 percent. */
export function towerScaleAt(t: number): number {
  return 1 - 0.38 * MathUtils.smoothstep(t, 0, 1);
}

/** Twist angle in radians along the height: 90 degrees in total. */
export function towerTwistAt(t: number): number {
  return (Math.PI / 2) * t;
}

const commonVertex = /* glsl */ `
  #include <common>

  varying vec3 vFacePos;
  varying vec3 vFaceN;
  varying float vFloorY;

  float twScale(float t) {
    return 1.0 - 0.38 * smoothstep(0.0, 1.0, t);
  }

  float twAngle(float t) {
    return 1.5707963 * t;
  }

  vec2 twRot(vec2 p, float a) {
    float c = cos(a);
    float s = sin(a);
    return vec2(c * p.x - s * p.y, s * p.x + c * p.y);
  }
`;

const normalVertex = /* glsl */ `
  #include <beginnormal_vertex>
  float twT = clamp((position.y + 24.0) / 48.0, 0.0, 1.0);
  float twA = twAngle(twT);
  objectNormal.xz = twRot(objectNormal.xz, twA);
`;

const positionVertex = /* glsl */ `
  #include <begin_vertex>
  transformed.xz = twRot(transformed.xz * twScale(twT), twA);
  vFacePos = position;
  vFaceN = normal;
  vFloorY = position.y + 24.0;
`;

const commonFragment = /* glsl */ `
  #include <common>

  uniform float uLights;
  uniform float uHiMin;
  uniform float uHiMax;
  uniform float uDim;
  uniform vec3 uSkyTint;
  uniform float uSkyAmt;

  varying vec3 vFacePos;
  varying vec3 vFaceN;
  varying float vFloorY;

  float h31(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  // Soft lit windows: 6 per face, one ribbon row per floor, randomly lit.
  vec3 towerWindows() {
    vec3 an = abs(vFaceN);
    if (an.y > 0.5) {
      return vec3(0.0);
    }

    float along = an.x > an.z ? vFacePos.z : vFacePos.x;
    float face = an.x > an.z ? (vFaceN.x > 0.0 ? 0.0 : 1.0) : (vFaceN.z > 0.0 ? 2.0 : 3.0);
    float u = (along / 10.0 + 0.5) * 6.0;
    float row = floor(vFloorY);
    float col = floor(u);
    vec2 f = vec2(fract(u), fract(vFloorY));

    float wx = smoothstep(0.05, 0.12, f.x) * (1.0 - smoothstep(0.88, 0.95, f.x));
    float wy = smoothstep(0.30, 0.38, f.y) * (1.0 - smoothstep(0.88, 0.95, f.y));
    float win = wx * wy;

    float lit = smoothstep(0.34, 0.5, h31(vec3(col, row, face + 1.0)));
    float amount = mix(0.35, 1.0, h31(vec3(col + 13.1, row + 5.7, face)));
    float grade = mix(0.65, 1.0, f.y);
    vec3 warm = mix(
      vec3(1.0, 0.66, 0.38),
      vec3(1.0, 0.86, 0.68),
      h31(vec3(col + 7.7, row + 1.3, face + 2.0))
    );

    // Floors inside [uHiMin, uHiMax] (1-based levels) glow brighter.
    float level = row + 1.0;
    float band = 0.0;
    if (uHiMax > uHiMin + 0.5) {
      band = smoothstep(uHiMin - 0.5, uHiMin + 0.5, level) * (1.0 - smoothstep(uHiMax - 0.5, uHiMax + 0.5, level));
    }

    float base = win * lit * amount * grade * (0.04 + uLights);
    float boost = win * band * (0.6 + 0.65 * uLights);
    return warm * (base + boost);
  }
`;

const emissiveFragment = /* glsl */ `
  #include <emissivemap_fragment>
  totalEmissiveRadiance += towerWindows() * 1.2;

  // Sky sheen on the glass: brighter at grazing angles, fades away at night.
  float skyFresnel = pow(1.0 - saturate(dot(normalize(normal), normalize(vViewPosition))), 3.0);
  totalEmissiveRadiance += uSkyTint * (0.1 + 0.9 * skyFresnel) * uSkyAmt;
`;

const ditheringFragment = /* glsl */ `
  #include <dithering_fragment>
  gl_FragColor.rgb *= uDim;
`;

export interface TowerCoreProps {
  /** First highlighted level (1-based). Use 0 together with highlightMax 0 for "no highlight". */
  highlightMin: number;
  /** Last highlighted level (1-based). */
  highlightMax: number;
  /** Render as the dimmed reflection under the sea (the parent group flips it). */
  mirror?: boolean;
}

export function TowerCore({ highlightMin, highlightMax, mirror = false }: TowerCoreProps) {
  const uniforms = useMemo(
    () => ({
      uLights: { value: 0 },
      uHiMin: { value: 0 },
      uHiMax: { value: 0 },
      uDim: { value: mirror ? 0.45 : 1 },
      uSkyTint: { value: new Color() },
      uSkyAmt: { value: 0.3 },
    }),
    [mirror],
  );

  const material = useMemo(() => {
    const m = new MeshStandardMaterial({
      color: '#5E7488',
      metalness: 0.9,
      roughness: 0.12,
    });
    m.onBeforeCompile = (shader) => {
      Object.assign(shader.uniforms, uniforms);
      shader.vertexShader = shader.vertexShader
        .replace('#include <common>', commonVertex)
        .replace('#include <beginnormal_vertex>', normalVertex)
        .replace('#include <begin_vertex>', positionVertex);
      shader.fragmentShader = shader.fragmentShader
        .replace('#include <common>', commonFragment)
        .replace('#include <emissivemap_fragment>', emissiveFragment)
        .replace('#include <dithering_fragment>', ditheringFragment);
    };
    m.customProgramCacheKey = () => 'shikhara-tower-core-v2';
    return m;
  }, [uniforms]);

  useEffect(() => () => material.dispose(), [material]);

  useFrame((_state, delta) => {
    uniforms.uLights.value = atmosphere.lights;
    uniforms.uSkyTint.value.copy(atmosphere.skyMid);
    uniforms.uSkyAmt.value = 0.35 * (1 - atmosphere.night * 0.85);
    // Highlight band glides smoothly from one range to the next.
    uniforms.uHiMin.value = MathUtils.damp(uniforms.uHiMin.value, highlightMin, 4, delta);
    uniforms.uHiMax.value = MathUtils.damp(uniforms.uHiMax.value, highlightMax, 4, delta);
  });

  return (
    <mesh position={[0, 24, 0]} material={material} frustumCulled={false}>
      <boxGeometry args={[TOWER_BASE_SIZE, TOWER_FLOORS, TOWER_BASE_SIZE, 1, TOWER_FLOORS * 2, 1]} />
    </mesh>
  );
}

export default TowerCore;
