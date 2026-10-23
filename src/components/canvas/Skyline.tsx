// src/components/canvas/Skyline.tsx
import { useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  BoxGeometry,
  Color,
  InstancedBufferAttribute,
  InstancedMesh,
  Object3D,
  ShaderMaterial,
  Vector3,
} from 'three';
import { atmosphere } from '../../lib/timeOfDay';

const vertexShader = /* glsl */ `
  // x: seed, y: width, z: height, w: depth (all in metres)
  attribute vec4 aInfo;

  varying vec3 vLocal;
  varying vec3 vFaceN;
  varying vec3 vNormalW;
  varying vec3 vWorld;
  varying float vSeed;

  void main() {
    vLocal = position * vec3(aInfo.y, aInfo.z, aInfo.w);
    vFaceN = normal;
    vSeed = aInfo.x;
    vNormalW = normalize(mat3(modelMatrix) * mat3(instanceMatrix) * normal);
    vec4 wp = modelMatrix * instanceMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uSilhouette;
  uniform vec3 uFogColor;
  uniform float uFogDensity;
  uniform float uLights;
  uniform vec3 uSunDir;
  uniform float uSunInt;
  uniform float uDim;

  varying vec3 vLocal;
  varying vec3 vFaceN;
  varying vec3 vNormalW;
  varying vec3 vWorld;
  varying float vSeed;

  float hash31(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.71, 0.113, 0.419));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }

  void main() {
    vec3 an = abs(vFaceN);
    float dist = length(vWorld - cameraPosition);

    // Flat silhouette colour with a hint of sun on the lit faces and the roofs.
    float sunLit = max(dot(normalize(vNormalW), uSunDir), 0.0);
    float roof = an.y > 0.5 ? 0.15 : 0.0;
    vec3 col = uSilhouette * (0.75 + 0.35 * sunLit * min(uSunInt, 3.0) / 3.0 + roof);

    // Windows: 2.4 m wide, 3.4 m tall cells, randomly lit.
    vec3 emit = vec3(0.0);
    if (an.y < 0.5) {
      float along = an.x > an.z ? vLocal.z : vLocal.x;
      vec2 cell = vec2(along / 2.4, vLocal.y / 3.4);
      vec2 id = floor(cell);
      vec2 f = fract(cell);
      float win = step(0.22, f.x) * step(f.x, 0.78) * step(0.28, f.y) * step(f.y, 0.78);
      float lit = step(0.52, hash31(vec3(id, vSeed * 91.7)));
      float amount = 0.25 + 0.75 * hash31(vec3(id + 3.7, vSeed));
      vec3 warm = mix(vec3(1.0, 0.68, 0.40), vec3(0.95, 0.9, 0.78), hash31(vec3(id + 7.3, vSeed * 13.1)));
      emit = warm * win * lit * amount * (uLights + 0.03);
    }

    // Atmospheric perspective: far buildings dissolve into the haze,
    // and the bottom of every building sinks into low sea mist.
    float fogF = 1.0 - exp(-pow(uFogDensity * dist, 2.0));
    float lowMist = (1.0 - smoothstep(0.0, 36.0, abs(vWorld.y))) * 0.28;
    fogF = clamp(fogF + lowMist, 0.0, 1.0);

    vec3 outCol = mix(col, uFogColor, fogF) + emit * (1.0 - fogF * 0.6);
    outCol *= uDim;

    gl_FragColor = vec4(outCol, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

const DEG = Math.PI / 180;

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Deterministic layout: buildings sit on a wide arc across the bay,
 * 240-540 m away, mostly low with a few taller clusters.
 * The same seed is used for the real and the mirrored skyline.
 */
function buildSkyline(count: number, material: ShaderMaterial): InstancedMesh {
  const geometry = new BoxGeometry(1, 1, 1);
  geometry.translate(0, 0.5, 0);

  const info = new Float32Array(count * 4);
  const mesh = new InstancedMesh(geometry, material, count);
  const dummy = new Object3D();
  const rand = mulberry32(20261021);

  for (let i = 0; i < count; i += 1) {
    const az = (rand() + rand() - 1) * 82 * DEG;
    const radius = 240 + rand() * 300;
    const cluster = 0.5 + 0.5 * Math.sin(az * 6 + 1.3) * (0.6 + 0.4 * Math.sin(az * 2.3));
    const tall = Math.pow(rand(), 2.6);
    const height = Math.min(54, Math.max(5, (5 + tall * 46) * (0.45 + 0.9 * cluster)));
    const width = 3.5 + rand() * 7;
    const depth = 3.5 + rand() * 7;

    dummy.position.set(Math.sin(az) * radius, 0, -Math.cos(az) * radius);
    dummy.rotation.set(0, az * 0.6 + (rand() - 0.5) * 0.3, 0);
    dummy.scale.set(width, height, depth);
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);

    info[i * 4] = rand();
    info[i * 4 + 1] = width;
    info[i * 4 + 2] = height;
    info[i * 4 + 3] = depth;
  }

  mesh.instanceMatrix.needsUpdate = true;
  geometry.setAttribute('aInfo', new InstancedBufferAttribute(info, 4));
  mesh.frustumCulled = false;
  return mesh;
}

export interface SkylineProps {
  /** Number of buildings (high 420, medium 220, low 90). */
  count: number;
  /** Render as the dimmed, upside-down reflection under the sea. */
  mirror?: boolean;
}

export function Skyline({ count, mirror = false }: SkylineProps) {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: {
          uSilhouette: { value: new Color() },
          uFogColor: { value: new Color() },
          uFogDensity: { value: 0.003 },
          uLights: { value: 0 },
          uSunDir: { value: new Vector3(0, 1, 0) },
          uSunInt: { value: 0 },
          uDim: { value: 1 },
        },
        vertexShader,
        fragmentShader,
      }),
    [],
  );

  const mesh = useMemo(() => buildSkyline(count, material), [count, material]);

  useEffect(
    () => () => {
      mesh.geometry.dispose();
      mesh.dispose();
    },
    [mesh],
  );

  useEffect(() => () => material.dispose(), [material]);

  useEffect(() => {
    material.uniforms.uDim.value = mirror ? 0.5 : 1;
  }, [material, mirror]);

  useFrame(() => {
    const u = material.uniforms;
    u.uSilhouette.value.copy(atmosphere.silhouette);
    u.uFogColor.value.copy(atmosphere.fogColor);
    u.uFogDensity.value = atmosphere.fogDensity;
    u.uLights.value = atmosphere.lights;
    u.uSunDir.value.copy(atmosphere.sunDirection);
    u.uSunInt.value = atmosphere.sunIntensity;
  });

  const flip: [number, number, number] = mirror ? [1, -1, 1] : [1, 1, 1];

  return (
    <group scale={flip}>
      <primitive object={mesh} />
    </group>
  );
}

export default Skyline;
