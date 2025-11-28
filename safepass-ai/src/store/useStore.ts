import { create } from 'zustand';

interface SimulationState {
    cameraMode: 'orbit' | 'director';
    setCameraMode: (mode: 'orbit' | 'director') => void;
    isPlaying: boolean;
    setIsPlaying: (isPlaying: boolean) => void;
    safetyScore: number;
    setSafetyScore: (score: number) => void;
    schoolData: any | null;
    setSchoolData: (data: any) => void;
    optimizations: { type: string; count: number }[];
    addOptimization: (type: string) => void;
}

export const useStore = create<SimulationState>((set) => ({
    cameraMode: 'orbit',
    setCameraMode: (mode) => set({ cameraMode: mode }),
    isPlaying: false,
    setIsPlaying: (isPlaying) => set({ isPlaying }),
    safetyScore: 72,
    setSafetyScore: (score) => set({ safetyScore: score }),
    schoolData: null,
    setSchoolData: (data) => set({ schoolData: data }),
    optimizations: [],
    addOptimization: (type) => set((state) => {
        const existing = state.optimizations.find(o => o.type === type);
        if (existing) {
            return {
                optimizations: state.optimizations.map(o =>
                    o.type === type ? { ...o, count: o.count + 1 } : o
                )
            };
        }
        return { optimizations: [...state.optimizations, { type, count: 1 }] };
    }),
}));
