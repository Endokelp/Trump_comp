"use client";

import React from 'react';
import { Activity, AlertTriangle, Users, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useStore } from '@/store/useStore';
import { calculateSafetyScore, Optimization } from '@/lib/aiService';

export function Dashboard() {
    const { optimizations, schoolData } = useStore();

    // Cast optimizations to the expected type
    const typedOptimizations = optimizations as Optimization[];

    // Calculate real-time metrics based on store state
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const metrics = calculateSafetyScore(schoolData || { buildings: [], roads: [] } as any, typedOptimizations, 8.0);

    return (
        <div className="absolute top-4 right-4 z-40 w-80 flex flex-col gap-4">
            {/* Safety Score Card */}
            <Card className="bg-white/80 backdrop-blur-md border-white/20 shadow-lg rounded-3xl">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider flex justify-between items-center">
                        Safety Score
                        <Activity className="w-4 h-4 text-primary" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-end gap-2 mb-2">
                        <span className="text-4xl font-bold text-foreground">{metrics.safetyScore}</span>
                        <span className="text-sm text-muted-foreground mb-1">/ 100</span>
                    </div>
                    <Progress value={metrics.safetyScore} className="h-2 bg-secondary" />
                    <p className="text-xs text-muted-foreground mt-2">
                        {metrics.congestionLevel === 'high' ? 'High congestion detected.' : 'Traffic flow is stable.'}
                    </p>
                </CardContent>
            </Card>

            {/* Real-time Metrics */}
            <div className="grid grid-cols-2 gap-2">
                <MetricCard
                    icon={<Clock className="w-4 h-4 text-orange-400" />}
                    label="Avg Wait"
                    value={`${metrics.avgWaitTime.toFixed(1)}m`}
                    trend="-0.5m"
                    trendUp={false}
                />
                <MetricCard
                    icon={<AlertTriangle className="w-4 h-4 text-red-500" />}
                    label="Near Misses"
                    value={`${metrics.nearMisses}`}
                    trend={metrics.nearMisses > 0 ? "+1" : "0"}
                    trendUp={metrics.nearMisses > 0}
                />
                <MetricCard
                    icon={<Users className="w-4 h-4 text-blue-400" />}
                    label="Students"
                    value="450"
                />
                <MetricCard
                    icon={<Activity className="w-4 h-4 text-green-400" />}
                    label="Flow Rate"
                    value={metrics.congestionLevel === 'high' ? 'Low' : 'High'}
                />
            </div>
        </div>
    );
}

function MetricCard({ icon, label, value, trend, trendUp }: { icon: React.ReactNode, label: string, value: string, trend?: string, trendUp?: boolean }) {
    return (
        <Card className="bg-white/80 backdrop-blur-md border-white/20 shadow-sm rounded-2xl">
            <CardContent className="p-3">
                <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] text-muted-foreground uppercase">{label}</span>
                    {icon}
                </div>
                <div className="flex items-end justify-between">
                    <span className="text-lg font-bold">{value}</span>
                    {trend && (
                        <span className={`text-xs ${trendUp ? 'text-red-400' : 'text-green-400'}`}>
                            {trend}
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
