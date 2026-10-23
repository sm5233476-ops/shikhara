// src/components/canvas/TowerSlabs.tsx
import React, { useMemo, useRef, useLayoutEffect } from 'react';
import type { InstancedMesh } from 'three';
import { Object3D } from 'three';

const TOTAL_FLOORS = 48;
const SLAB_WIDTH = 11.4;
const SLAB_DEPTH = 11.4;
const SLAB_THICKNESS = 0.22;

export const TowerSlabs: React.FC = () => {
  const slabsRef = useRef<InstancedMesh>(null);
  const gardenTrimsRef = useRef<InstancedMesh>(null);

  // Compute instance transformations matching the exact core twisting mathematics
  const { slabMatrices, skyGardenMatrices, skyGardenCount } = useMemo(() => {
    const dummy = new Object3D();
    const slabMats: Float32Array = new Float32Array(TOTAL_FLOORS * 16);
    const gardenMats: Float32Array[] = [];

    for (let i = 0; i < TOTAL_FLOORS; i++) {
      // Floor height: -24 + (i + 0.5) * (48 / 48)
      const y = -24 + (i + 0.5) * (48.0 / TOTAL_FLOORS);
      const t = (y + 24.0) / 48.0;

      // Exact taper: s(t) = 1.0 - 0.38 * smoothstep(0.0, 1.0, t)
      const s = 1.0 - 0.38 * (t * t * (3.0 - 2.0 * t));

      // Exact 90-degree twist
      const angle = (Math.PI / 2.0) * t;

      const isSkyGarden = (i + 1) % 6 === 0;
      const gardenScale = isSkyGarden ? 1.075 : 1.0;

      dummy.position.set(0, y, 0);
      dummy.rotation.set(0, angle, 0);
      dummy.scale.set(s * gardenScale, 1.0, s * gardenScale);
      dummy.updateMatrix();

      dummy.matrix.toArray(slabMats, i * 16);

      if (isSkyGarden) {
        // Record matrix for the warm emissive edge trim
        const trimDummy = new Object3D();
        trimDummy.position.set(0, y, 0);
        trimDummy.rotation.set(0, angle, 0);
        trimDummy.scale.set(s * gardenScale, 1.0, s * gardenScale);
        trimDummy.updateMatrix();
        gardenMats.push(new Float32Array(trimDummy.matrix.elements));
      }
    }

    return {
      slabMatrices: slabMats,
      skyGardenMatrices: gardenMats,
      skyGardenCount: gardenMats.length,
    };
  }, []);

  useLayoutEffect(() => {
    if (slabsRef.current) {
      for (let i = 0; i < TOTAL_FLOORS; i++) {
        slabsRef.current.setMatrixAt(
          i,
          new Object3D().matrix.fromArray(slabMatrices, i * 16)
        );
      }
      slabsRef.current.instanceMatrix.needsUpdate = true;
    }

    if (gardenTrimsRef.current) {
      for (let j = 0; j < skyGardenCount; j++) {
        gardenTrimsRef.current.setMatrixAt(
          j,
          new Object3D().matrix.fromArray(skyGardenMatrices[j])
        );
      }
      gardenTrimsRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [slabMatrices, skyGardenMatrices, skyGardenCount]);

  return (
    <group>
      {/* 48 Instanced Structural Concrete Slabs */}
      <instancedMesh
        ref={slabsRef}
        args={[undefined, undefined, TOTAL_FLOORS]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[SLAB_WIDTH, SLAB_THICKNESS, SLAB_DEPTH]} />
        <meshStandardMaterial
          color="#E9E3D8"
          roughness={0.72}
          metalness={0.08}
        />
      </instancedMesh>

      {/* Sky-Garden Warm Emissive Edge Trims (Floors 6, 12, 18, 24, 30, 36, 42, 48) */}
      <instancedMesh
        ref={gardenTrimsRef}
        args={[undefined, undefined, skyGardenCount]}
      >
        <boxGeometry args={[SLAB_WIDTH * 1.002, 0.08, SLAB_DEPTH * 1.002]} />
        <meshStandardMaterial
          color="#C9A96A"
          emissive="#C9A96A"
          emissiveIntensity={1.4}
          roughness={0.3}
          metalness={0.8}
        />
      </instancedMesh>
    </group>
  );
};