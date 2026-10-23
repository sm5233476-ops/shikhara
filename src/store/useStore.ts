// src/store/useStore.ts
import { create } from 'zustand';

export type QualityTier = 'high' | 'medium' | 'low';
export type ResidenceType = 'sky-home' | 'sky-villa' | 'penthouse' | null;

export interface AppState {
  scrollProgress: number;
  timeOfDay: number;
  quality: QualityTier;
  activeSection: number;
  selectedResidence: ResidenceType;
  isLoaded: boolean;
  setScrollProgress: (progress: number) => void;
  setTimeOfDay: (time: number) => void;
  setQuality: (quality: QualityTier) => void;
  setActiveSection: (index: number) => void;
  setSelectedResidence: (residence: ResidenceType) => void;
  setIsLoaded: (loaded: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  scrollProgress: 0,
  timeOfDay: 0.18,
  quality: 'high',
  activeSection: 0,
  selectedResidence: 'sky-villa',
  isLoaded: false,
  setScrollProgress: (scrollProgress) => set({ scrollProgress }),
  setTimeOfDay: (timeOfDay) => set({ timeOfDay: Math.max(0, Math.min(1, timeOfDay)) }),
  setQuality: (quality) => set({ quality }),
  setActiveSection: (activeSection) => set({ activeSection }),
  setSelectedResidence: (selectedResidence) => set({ selectedResidence }),
  setIsLoaded: (isLoaded) => set({ isLoaded }),
}));