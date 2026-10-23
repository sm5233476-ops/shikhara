// src/components/canvas/TowerCrownAndPodium.tsx
import React from 'react';

export const TowerCrownAndPodium: React.FC = () => {
  // At Level 48 (y = 24), t = 1.0:
  // s(1.0) = 1.0 - 0.38 = 0.62.
  // 90-degree twist angle = Math.PI / 2
  const crownRotation: [number, number, number] = [0, Math.PI / 2, 0];
  const crownScale = 0.62;

  return (
    <group>
      {/* ========================================================= */}
      {/* 1. STEPPED 3-TIER PODIUM AT BASE (y = -24)                */}
      {/* ========================================================= */}
      <group position={[0, -24, 0]}>
        {/* Tier 1: Grand Plaza Footprint */}
        <mesh position={[0, -1.2, 0]} receiveShadow>
          <boxGeometry args={[22, 1.4, 22]} />
          <meshStandardMaterial color="#D6CEBE" roughness={0.8} metalness={0.05} />
        </mesh>

        {/* Tier 2: Colonnade & Motor-Court Level */}
        <mesh position={[0, 0.0, 0]} receiveShadow>
          <boxGeometry args={[17, 1.2, 17]} />
          <meshStandardMaterial color="#E9E3D8" roughness={0.75} metalness={0.08} />
        </mesh>

        {/* Tier 3: Grand Entrance Galleria */}
        <mesh position={[0, 1.1, 0]} receiveShadow>
          <boxGeometry args={[13.5, 1.0, 13.5]} />
          <meshStandardMaterial color="#E9E3D8" roughness={0.7} metalness={0.1} />
        </mesh>

        {/* Illuminated Grand Porte-Cochère Entrance Glass Bands */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[13.6, 0.7, 13.6]} />
          <meshStandardMaterial
            color="#FFB36B"
            emissive="#FFB36B"
            emissiveIntensity={1.2}
            roughness={0.2}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Basal Architectural Plinth Perimeter Trim */}
        <mesh position={[0, -0.45, 0]}>
          <boxGeometry args={[17.2, 0.12, 17.2]} />
          <meshStandardMaterial
            color="#C9A96A"
            emissive="#C9A96A"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.25}
          />
        </mesh>
      </group>

      {/* ========================================================= */}
      {/* 2. CROWN PAVILION AT PEAK (y = 24)                         */}
      {/* Follows exact 90° twist rotation and 0.62 taper scale     */}
      {/* ========================================================= */}
      <group position={[0, 24, 0]} rotation={crownRotation}>
        {/* Duplex Penthouse Glass Conservatory */}
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[10 * crownScale * 0.94, 2.0, 10 * crownScale * 0.94]} />
          <meshStandardMaterial
            color="#080C10"
            emissive="#FFB36B"
            emissiveIntensity={0.75}
            roughness={0.15}
            metalness={0.92}
          />
        </mesh>

        {/* Penthouse Perimeter Balustrade */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[11.4 * crownScale * 1.02, 0.5, 11.4 * crownScale * 1.02]} />
          <meshStandardMaterial
            color="#E9E3D8"
            roughness={0.4}
            metalness={0.3}
            transparent
            opacity={0.7}
          />
        </mesh>

        {/* Cantilevered Glowing Champagne Crown Roof */}
        <mesh position={[0, 2.2, 0]}>
          {/* Overhanging canopy slab */}
          <boxGeometry args={[11.4 * crownScale * 1.25, 0.35, 11.4 * crownScale * 1.25]} />
          <meshStandardMaterial
            color="#C9A96A"
            emissive="#C9A96A"
            emissiveIntensity={0.6}
            roughness={0.25}
            metalness={0.85}
          />
        </mesh>

        {/* Champagne Halo Underside Accent Strip */}
        <mesh position={[0, 2.0, 0]}>
          <boxGeometry args={[11.4 * crownScale * 1.28, 0.08, 11.4 * crownScale * 1.28]} />
          <meshStandardMaterial
            color="#FFB36B"
            emissive="#FFB36B"
            emissiveIntensity={2.2}
            roughness={0.2}
          />
        </mesh>

        {/* Sky Promenade / Helipad Core Plinth */}
        <mesh position={[0, 2.5, 0]}>
          <cylinderGeometry args={[1.8, 2.0, 0.3, 32]} />
          <meshStandardMaterial color="#0E1218" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Architectural Spire Beacon (Elevation 212m Peak Indicator) */}
        <mesh position={[0, 4.2, 0]}>
          <cylinderGeometry args={[0.04, 0.12, 3.2, 16]} />
          <meshStandardMaterial
            color="#C9A96A"
            metalness={0.95}
            roughness={0.15}
          />
        </mesh>

        {/* Aviation Warning Light Beacon */}
        <mesh position={[0, 5.85, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshStandardMaterial
            color="#FF4B4B"
            emissive="#FF2020"
            emissiveIntensity={3.0}
            roughness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
};