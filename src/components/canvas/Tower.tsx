// src/components/canvas/Tower.tsx
import { useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, ExtrudeGeometry, InstancedMesh, MeshStandardMaterial, Object3D, Shape } from 'three';
import { atmosphere } from '../../lib/timeOfDay';
import { useStore } from '../../store/useStore';
import { TOWER_FLOORS, TowerCore, towerScaleAt, towerTwistAt } from './TowerCore';

const PODIUM_HEIGHT = 2.4;
const SLAB_SIZE = 11.2;
const SLAB_THICKNESS = 0.24;
const GARDEN_EVERY = 6;

type LevelRange = readonly [number, number];

const NO_HIGHLIGHT: LevelRange = [0, 0];
const SKY_HOME: LevelRange = [8, 30];
const SKY_VILLA: LevelRange = [31, 42];
const CROWN_PENTHOUSE: LevelRange = [46, 48];

function residenceKey(value: unknown): string {
  if (typeof value === 'string') return value.toLowerCase();
  if (value !== null && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const candidate = record.id ?? record.type ?? record.key ?? record.slug ?? record.name;
    return typeof candidate === 'string' ? candidate.toLowerCase() : '';
  }
  return '';
}

function residenceToRange(value: unknown): LevelRange {
  const key = residenceKey(value);
  if (key.includes('penthouse') || key.includes('crown')) return CROWN_PENTHOUSE;
  if (key.includes('villa')) return SKY_VILLA;
  if (key.includes('home')) return SKY_HOME;
  return NO_HIGHLIGHT;
}

function createSlabGeometry(): ExtrudeGeometry {
  const h = SLAB_SIZE / 2;
  const r = 0.55;
  const shape = new Shape();
  shape.moveTo(-h + r, -h);
  shape.lineTo(h - r, -h);
  shape.quadraticCurveTo(h, -h, h, -h + r);
  shape.lineTo(h, h - r);
  shape.quadraticCurveTo(h, h, h - r, h);
  shape.lineTo(-h + r, h);
  shape.quadraticCurveTo(-h, h, -h, h - r);
  shape.lineTo(-h, -h + r);
  shape.quadraticCurveTo(-h, -h, -h + r, -h);
  const geometry = new ExtrudeGeometry(shape, {
    depth: SLAB_THICKNESS,
    bevelEnabled: false,
    curveSegments: 6,
  });
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

function buildSlabs(
  geometry: ExtrudeGeometry,
  material: MeshStandardMaterial,
  floors: readonly number[],
  widen: number,
): InstancedMesh {
  const mesh = new InstancedMesh(geometry, material, floors.length);
  const dummy = new Object3D();
  floors.forEach((floor, index) => {
    const t = Math.min(1, (floor + 0.13) / TOWER_FLOORS);
    const s = towerScaleAt(t) * widen;
    dummy.position.set(0, floor, 0);
    dummy.rotation.set(0, -towerTwistAt(t), 0);
    dummy.scale.set(s, 1, s);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
  });
  mesh.instanceMatrix.needsUpdate = true;
  mesh.frustumCulled = false;
  return mesh;
}

export function Tower() {
  const selected = useStore((s) => s.selectedResidence);
  const range = residenceToRange(selected);

  const slabGeometry = useMemo(() => createSlabGeometry(), []);

  // Premium Architectural Honed Stone - No cheap cardboard look
  const slabMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new Color('#DDD6C9'),
        roughness: 0.68,
        metalness: 0.08,
      }),
    [],
  );

  const gardenMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: new Color('#E8E1D3'),
        roughness: 0.62,
        metalness: 0.1,
      }),
    [],
  );

  const glowMaterial = useMemo(
    () =>
      new MeshStandardMaterial({
        color: '#2A1F14',
        roughness: 0.45,
        metalness: 0.3,
        emissive: '#FFB36B',
        emissiveIntensity: 0,
      }),
    [],
  );

  const crownMaterial = useMemo(
    () => new MeshStandardMaterial({ color: '#4B6275', metalness: 0.92, roughness: 0.12 }),
    [],
  );

  const spireMaterial = useMemo(
    () => new MeshStandardMaterial({ color: '#C9A96A', metalness: 0.95, roughness: 0.25 }),
    [],
  );

  const { regularSlabs, gardenSlabs } = useMemo(() => {
    const regular: number[] = [];
    const garden: number[] = [];
    for (let floor = 0; floor <= TOWER_FLOORS; floor += 1) {
      if (floor % GARDEN_EVERY === GARDEN_EVERY - 1) {
        garden.push(floor);
      } else {
        regular.push(floor);
      }
    }
    return {
      regularSlabs: buildSlabs(slabGeometry, slabMaterial, regular, 1),
      gardenSlabs: buildSlabs(slabGeometry, gardenMaterial, garden, 1.1),
    };
  }, [slabGeometry, slabMaterial, gardenMaterial]);

  useEffect(
    () => () => {
      regularSlabs.dispose();
      gardenSlabs.dispose();
      slabGeometry.dispose();
      slabMaterial.dispose();
      gardenMaterial.dispose();
      glowMaterial.dispose();
      crownMaterial.dispose();
      spireMaterial.dispose();
    },
    [regularSlabs, gardenSlabs, slabGeometry, slabMaterial, gardenMaterial, glowMaterial, crownMaterial, spireMaterial],
  );

  useFrame(() => {
    const lights = atmosphere.lights;
    glowMaterial.emissiveIntensity = 0.2 + 1.8 * lights;
  });

  const crownBase = TOWER_FLOORS;

  return (
    <group>
      <group position={[0, PODIUM_HEIGHT, 0]}>
        <TowerCore highlightMin={range[0]} highlightMax={range[1]} />
        <primitive object={regularSlabs} />
        <primitive object={gardenSlabs} />

        {/* Crown Pavilion */}
        <mesh position={[0, crownBase + 0.8, 0]} material={crownMaterial}>
          <boxGeometry args={[5.2, 1.6, 5.2]} />
        </mesh>
        <mesh position={[0, crownBase + 1.68, 0]} material={glowMaterial}>
          <boxGeometry args={[5.5, 0.1, 5.5]} />
        </mesh>
        <mesh position={[0, crownBase + 5.35, 0]} material={spireMaterial}>
          <cylinderGeometry args={[0.06, 0.16, 7.5, 12]} />
        </mesh>
        <mesh position={[0, crownBase + 9.2, 0]} material={glowMaterial}>
          <sphereGeometry args={[0.22, 12, 12]} />
        </mesh>
      </group>

      {/* Solid Coastal Foundation Pier: Grounded into Mumbai bay (No floating toy look) */}
      <mesh position={[0, -2.5, 0]}>
        <boxGeometry args={[34, 5.2, 34]} />
        <meshStandardMaterial color="#0E1217" roughness={0.7} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[26, 1.4, 26]} />
        <meshStandardMaterial color="#161B22" roughness={0.6} metalness={0.25} />
      </mesh>
      <mesh position={[0, 1.4, 0]}>
        <boxGeometry args={[18, 1.0, 18]} />
        <meshStandardMaterial color="#212730" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Warm champagne perimeter lighting bands */}
      <mesh position={[0, 1.0, 0]} material={glowMaterial}>
        <boxGeometry args={[26.1, 0.08, 26.1]} />
      </mesh>
      <mesh position={[0, 1.95, 0]} material={glowMaterial}>
        <boxGeometry args={[18.1, 0.08, 18.1]} />
      </mesh>
    </group>
  );
}

export default Tower;