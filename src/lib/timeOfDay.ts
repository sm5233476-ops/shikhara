// src/lib/timeOfDay.ts
import { Color, Vector3 } from 'three';

/**
 * Single source of truth for everything that changes with the time of day.
 *
 * timeOfDay runs from 0 to 1:
 *   0.0 pre-dawn   0.3 day   0.6 golden hour   0.8 dusk   1.0 night
 *
 * Scene.tsx calls updateAtmosphere() once per frame. Sky, Sea, Skyline and Tower
 * only READ the shared `atmosphere` object, so nothing is allocated per frame.
 */

export interface Atmosphere {
  skyTop: Color;
  skyMid: Color;
  skyHorizon: Color;
  fogColor: Color;
  fogDensity: number;
  sunColor: Color;
  sunIntensity: number;
  sunDirection: Vector3;
  /** 0..1, glow of the sun (still > 0 slightly below the horizon, for dawn / dusk glow) */
  sunVisibility: number;
  moonDirection: Vector3;
  hemiSky: Color;
  hemiGround: Color;
  hemiIntensity: number;
  envIntensity: number;
  seaDeep: Color;
  seaTint: Color;
  silhouette: Color;
  glowColor: Color;
  /** 0..1, how night it is */
  night: number;
  /** 0..1, how many windows are lit */
  lights: number;
  /** 0..1, warm city glow near the horizon */
  cityGlow: number;
}

interface KeySource {
  t: number;
  top: string;
  mid: string;
  horizon: string;
  sun: string;
  sunIntensity: number;
  sunElevation: number;
  sunAzimuth: number;
  hemiSky: string;
  hemiGround: string;
  hemiIntensity: number;
  envIntensity: number;
  seaDeep: string;
  seaTint: string;
  silhouette: string;
  fogDensity: number;
}

interface Key {
  t: number;
  top: Color;
  mid: Color;
  horizon: Color;
  sun: Color;
  sunIntensity: number;
  sunElevation: number;
  sunAzimuth: number;
  hemiSky: Color;
  hemiGround: Color;
  hemiIntensity: number;
  envIntensity: number;
  seaDeep: Color;
  seaTint: Color;
  silhouette: Color;
  fogDensity: number;
}

/**
 * Azimuth is measured from the view direction (-Z): negative = left, positive = right.
 * The horizon colour doubles as the fog colour, so sea, skyline and sky melt together
 * with no visible seam. The warm sunrise / sunset glow is added in the sky shader.
 */
const SOURCES: readonly KeySource[] = [
  {
    t: 0.0,
    top: '#0A1322',
    mid: '#203A5E',
    horizon: '#8C93A5',
    sun: '#FFB07A',
    sunIntensity: 1.1,
    sunElevation: -1.0,
    sunAzimuth: -22,
    hemiSky: '#3A4D6E',
    hemiGround: '#14110F',
    hemiIntensity: 0.5,
    envIntensity: 0.5,
    seaDeep: '#06101A',
    seaTint: '#16314D',
    silhouette: '#0D1624',
    fogDensity: 0.0028, // पहले 0.0042 था (अब क्रिस्प दिखेगा)
  },
  {
    t: 0.3,
    top: '#1B3F66',
    mid: '#4C7CA6',
    horizon: '#A8BED0',
    sun: '#FFF6E8',
    sunIntensity: 3.4,
    sunElevation: 54,
    sunAzimuth: -8,
    hemiSky: '#8FB0CC',
    hemiGround: '#242322',
    hemiIntensity: 0.95,
    envIntensity: 0.95,
    seaDeep: '#08253D',
    seaTint: '#1B5B77',
    silhouette: '#243242',
    fogDensity: 0.0019, // पहले 0.0026 था (HD क्लैरिटी)
  },
  {
    t: 0.6,
    top: '#16233F',
    mid: '#3B4F74',
    horizon: '#BFA28F',
    sun: '#FFAA66',
    sunIntensity: 2.5,
    sunElevation: 9,
    sunAzimuth: 52,
    hemiSky: '#6F7FA0',
    hemiGround: '#2A1F17',
    hemiIntensity: 0.65,
    envIntensity: 0.75,
    seaDeep: '#0A1E33',
    seaTint: '#2B4A66',
    silhouette: '#2A2F3F',
    fogDensity: 0.0022, // पहले 0.0032 था
  },
  {
    t: 0.8,
    top: '#080C18',
    mid: '#1B2745',
    horizon: '#444E66',
    sun: '#FF8050',
    sunIntensity: 0.5,
    sunElevation: -4,
    sunAzimuth: 70,
    hemiSky: '#2E3B5A',
    hemiGround: '#120F0D',
    hemiIntensity: 0.35,
    envIntensity: 0.45,
    seaDeep: '#060F1B',
    seaTint: '#172A40',
    silhouette: '#11172A',
    fogDensity: 0.0025, // पहले 0.0036 था
  },
  {
    t: 1.0,
    top: '#03050A',
    mid: '#0B1224',
    horizon: '#141E32',
    sun: '#7080A0',
    sunIntensity: 0,
    sunElevation: -25,
    sunAzimuth: 85,
    hemiSky: '#1A2440',
    hemiGround: '#07080B',
    hemiIntensity: 0.2,
    envIntensity: 0.25,
    seaDeep: '#03070E',
    seaTint: '#0A1624',
    silhouette: '#060A14',
    fogDensity: 0.0022, // पहले 0.0031 था
  },
];

const KEYS: readonly Key[] = SOURCES.map((s) => ({
  t: s.t,
  top: new Color(s.top),
  mid: new Color(s.mid),
  horizon: new Color(s.horizon),
  sun: new Color(s.sun),
  sunIntensity: s.sunIntensity,
  sunElevation: s.sunElevation,
  sunAzimuth: s.sunAzimuth,
  hemiSky: new Color(s.hemiSky),
  hemiGround: new Color(s.hemiGround),
  hemiIntensity: s.hemiIntensity,
  envIntensity: s.envIntensity,
  seaDeep: new Color(s.seaDeep),
  seaTint: new Color(s.seaTint),
  silhouette: new Color(s.silhouette),
  fogDensity: s.fogDensity,
}));

const DEG = Math.PI / 180;

function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

function lerp(a: number, b: number, k: number): number {
  return a + (b - a) * k;
}

function ease(k: number): number {
  return k * k * (3 - 2 * k);
}

function smooth(edge0: number, edge1: number, x: number): number {
  return ease(clamp01((x - edge0) / (edge1 - edge0)));
}

function setDirection(target: Vector3, elevationDeg: number, azimuthDeg: number): Vector3 {
  const el = elevationDeg * DEG;
  const az = azimuthDeg * DEG;
  const c = Math.cos(el);
  return target.set(Math.sin(az) * c, Math.sin(el), -Math.cos(az) * c);
}

/** Allocates an Atmosphere object (do this once, then reuse it with computeAtmosphere). */
export function createAtmosphere(): Atmosphere {
  const out: Atmosphere = {
    skyTop: new Color(),
    skyMid: new Color(),
    skyHorizon: new Color(),
    fogColor: new Color(),
    fogDensity: 0.003,
    sunColor: new Color(),
    sunIntensity: 0,
    sunDirection: new Vector3(0, 1, 0),
    sunVisibility: 0,
    moonDirection: setDirection(new Vector3(), 34, -26),
    hemiSky: new Color(),
    hemiGround: new Color(),
    hemiIntensity: 0,
    envIntensity: 0,
    seaDeep: new Color(),
    seaTint: new Color(),
    silhouette: new Color(),
    glowColor: new Color('#FFB36B'),
    night: 0,
    lights: 0,
    cityGlow: 0,
  };
  return computeAtmosphere(0, out);
}

/** Writes the atmosphere for a given timeOfDay (0..1) into `out`. No allocations. */
export function computeAtmosphere(timeOfDay: number, out: Atmosphere): Atmosphere {
  const t = clamp01(Number.isFinite(timeOfDay) ? timeOfDay : 0);

  let i = 0;
  while (i < KEYS.length - 2 && t > KEYS[i + 1].t) {
    i += 1;
  }
  const a = KEYS[i];
  const b = KEYS[i + 1];
  const k = ease(clamp01((t - a.t) / (b.t - a.t)));

  out.skyTop.copy(a.top).lerp(b.top, k);
  out.skyMid.copy(a.mid).lerp(b.mid, k);
  out.skyHorizon.copy(a.horizon).lerp(b.horizon, k);
  out.fogColor.copy(out.skyHorizon);
  out.fogDensity = lerp(a.fogDensity, b.fogDensity, k);

  out.sunColor.copy(a.sun).lerp(b.sun, k);
  out.sunIntensity = lerp(a.sunIntensity, b.sunIntensity, k);
  setDirection(
    out.sunDirection,
    lerp(a.sunElevation, b.sunElevation, k),
    lerp(a.sunAzimuth, b.sunAzimuth, k),
  );
  out.sunVisibility = smooth(-0.3, -0.02, out.sunDirection.y);

  out.hemiSky.copy(a.hemiSky).lerp(b.hemiSky, k);
  out.hemiGround.copy(a.hemiGround).lerp(b.hemiGround, k);
  out.hemiIntensity = lerp(a.hemiIntensity, b.hemiIntensity, k);
  out.envIntensity = lerp(a.envIntensity, b.envIntensity, k);

  out.seaDeep.copy(a.seaDeep).lerp(b.seaDeep, k);
  out.seaTint.copy(a.seaTint).lerp(b.seaTint, k);
  out.silhouette.copy(a.silhouette).lerp(b.silhouette, k);

  out.night = smooth(0.62, 0.92, t);
  // Windows are already a little lit in the pre-dawn hero, fully lit from dusk on.
  out.lights = Math.max(smooth(0.56, 0.86, t), 0.3 * (1 - smooth(0, 0.12, t)));
  out.cityGlow = Math.max(smooth(0.6, 0.95, t), 0.5 * (1 - smooth(0, 0.1, t)));

  return out;
}

/** Convenience helper that allocates a fresh object. Do not call this every frame. */
export function getAtmosphere(timeOfDay: number): Atmosphere {
  return computeAtmosphere(timeOfDay, createAtmosphere());
}

/** Shared, mutable atmosphere that every canvas component reads from. */
export const atmosphere: Atmosphere = createAtmosphere();

/** Called once per frame by Scene.tsx. Returns the shared atmosphere. */
export function updateAtmosphere(timeOfDay: number): Atmosphere {
  return computeAtmosphere(timeOfDay, atmosphere);
}
