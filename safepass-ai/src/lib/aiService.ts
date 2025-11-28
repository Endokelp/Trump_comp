import { SchoolData } from './mapService';

export interface SimulationMetrics {
    safetyScore: number;
    congestionLevel: 'low' | 'medium' | 'high';
    avgWaitTime: number; // minutes
    nearMisses: number;
}

export interface Optimization {
    type: 'speed_bump' | 'crosswalk' | 'drop_off_lane';
    count: number;
}

export function calculateSafetyScore(
    schoolData: SchoolData,
    optimizations: Optimization[],
    timeOfDay: number // 0-24
): SimulationMetrics {
    // Heuristic model for demo purposes
    // In a real app, this would run an ONNX model

    let baseScore = 60; // Baseline

    // Optimizations improve score
    const speedBumps = optimizations.find(o => o.type === 'speed_bump')?.count || 0;
    const crosswalks = optimizations.find(o => o.type === 'crosswalk')?.count || 0;
    const dropOffLanes = optimizations.find(o => o.type === 'drop_off_lane')?.count || 0;

    baseScore += speedBumps * 5;
    baseScore += crosswalks * 8;
    baseScore += dropOffLanes * 3;

    // Time of day penalty (morning rush)
    if (timeOfDay >= 7.5 && timeOfDay <= 8.5) {
        baseScore -= 15;
    }

    // Clamp score
    const finalScore = Math.min(100, Math.max(0, baseScore));

    return {
        safetyScore: finalScore,
        congestionLevel: finalScore > 80 ? 'low' : finalScore > 50 ? 'medium' : 'high',
        avgWaitTime: Math.max(2, 15 - (finalScore / 10)),
        nearMisses: Math.max(0, Math.floor((100 - finalScore) / 10))
    };
}
