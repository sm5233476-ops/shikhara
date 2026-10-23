// src/components/canvas/Scene.tsx
import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, type CSSProperties } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer } from '@react-three/drei';
import {
  FogExp2,
  MathUtils,
  Vector2,
  Vector3,
  type DirectionalLight,
  type HemisphereLight,
  type PerspectiveCamera,
} from 'three';
import { updateAtmosphere } from '../../lib/timeOfDay';
import { useStore } from '../../store/useStore';
import { Sea } from './Sea';
import { Sky } from './Sky';
import { Skyline } from './Skyline';
import { Tower } from './Tower';

const WRAPPER_STYLE: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 0,
  pointerEvents: 'none',
};

function AtmosphereDriver() {
  const scene = useThree((s) => s.scene);
  const hemi = useRef<HemisphereLight>(null);
  const sun = useRef<DirectionalLight>(null);
  const moon = useRef<DirectionalLight>(null);
  const fog = useMemo(() => new FogExp2('#8C93A5', 0.0022), []);

  useLayoutEffect(() => {
    scene.fog = fog;
    return () => {
      scene.fog = null;
    };
  }, [scene, fog]);

  useFrame(() => {
    const a = updateAtmosphere(useStore.getState().timeOfDay);

    fog.color.copy(a.fogColor);
    fog.density = a.fogDensity;
    scene.environmentIntensity = a.envIntensity;

    if (hemi.current) {
      hemi.current.color.copy(a.hemiSky);
      hemi.current.groundColor.copy(a.hemiGround);
      hemi.current.intensity = a.hemiIntensity;
    }

    if (sun.current) {
      sun.current.position.copy(a.sunDirection).multiplyScalar(300);
      sun.current.color.copy(a.sunColor);
      const aboveHorizon = MathUtils.clamp((a.sunDirection.y + 0.05) / 0.13, 0, 1);
      sun.current.intensity = a.sunIntensity * aboveHorizon;
    }

    if (moon.current) {
      moon.current.position.copy(a.moonDirection).multiplyScalar(300);
      moon.current.intensity = 0.55 * a.night;
    }
  }, -10);

  return (
    <>
      <hemisphereLight ref={hemi} />
      <directionalLight ref={sun} />
      <directionalLight ref={moon} color="#9FB4DC" />
    </>
  );
}

const LOOK_AT = new Vector3(2, 20.5, 0);

function HeroCamera() {
  const camera = useThree((s) => s.camera) as PerspectiveCamera;
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);
  const pointer = useRef(new Vector2());
  const mobile = width < 768;

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -((event.clientY / window.innerHeight) * 2 - 1),
      );
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useLayoutEffect(() => {
    camera.fov = 34;
    camera.near = 0.5;
    camera.far = 2400;
    camera.setViewOffset(
      width,
      height,
      mobile ? 0 : -width * 0.2,
      mobile ? height * 0.16 : 0,
      width,
      height,
    );
    return () => {
      camera.clearViewOffset();
    };
  }, [camera, width, height, mobile]);

  useFrame((_state, delta) => {
    const targetX = -14 + pointer.current.x * 2.4;
    const targetY = 5 + pointer.current.y * 0.9;
    const targetZ = mobile ? 100 : 74;
    camera.position.x = MathUtils.damp(camera.position.x, targetX, 2.2, delta);
    camera.position.y = MathUtils.damp(camera.position.y, targetY, 2.2, delta);
    camera.position.z = MathUtils.damp(camera.position.z, targetZ, 2.2, delta);
    camera.lookAt(LOOK_AT);
  });

  return null;
}

export function Scene() {
  const quality = useStore((s) => s.quality);
  // Ensure crisp Retina resolution on desktop
  const dpr: [number, number] = quality === 'low' ? [1, 1] : [1, 1.75];
  const skylineCount = quality === 'low' ? 90 : quality === 'medium' ? 180 : 280;

  return (
    <div style={WRAPPER_STYLE} aria-hidden="true">
      <Canvas
        dpr={dpr}
        camera={{ fov: 34, near: 0.5, far: 2400, position: [-14, 5, 74] }}
        gl={{ antialias: true, powerPreference: 'high-performance', alpha: false }}
      >
        <color attach="background" args={['#05070C']} />
        <AtmosphereDriver />
        <HeroCamera />

        <Suspense fallback={null}>
          <Environment resolution={256} frames={1}>
            <Lightformer form="rect" intensity={2.6} color="#FFE6C4" position={[-9, 14, 8]} scale={[16, 7, 1]} />
            <Lightformer
              form="rect"
              intensity={1.6}
              color="#BCD2F0"
              position={[12, 6, -6]}
              rotation={[0, -Math.PI / 2.5, 0]}
              scale={[14, 3, 1]}
            />
            <Lightformer form="rect" intensity={1.2} color="#FFB36B" position={[0, 3, -14]} scale={[22, 3, 1]} />
          </Environment>
        </Suspense>

        <Sky />
        {/* Real ocean surface: clean, reflective, no submerged ghost meshes */}
        <Sea mirror={false} detail={quality === 'high'} />
        <Skyline count={skylineCount} />
        <Tower />
      </Canvas>
    </div>
  );
}

export default Scene;