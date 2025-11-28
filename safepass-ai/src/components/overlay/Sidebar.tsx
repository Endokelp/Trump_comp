"use client";

import React from 'react';
import { Car, Footprints, Cone, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export function Sidebar() {
    return (
        <aside className="w-64 bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 flex flex-col z-50 relative">
            <div className="p-4">
                <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                    Optimizations
                </h2>
                <div className="space-y-2">
                    <DraggableItem icon={<Cone className="w-4 h-4" />} label="Speed Bump" type="speed_bump" />
                    <DraggableItem icon={<Footprints className="w-4 h-4" />} label="Crosswalk" type="crosswalk" />
                    <DraggableItem icon={<Clock className="w-4 h-4" />} label="Staggered Time" type="staggered_time" />
                    <DraggableItem icon={<Car className="w-4 h-4" />} label="Drop-off Lane" type="drop_off_lane" />
                </div>
            </div>

            <Separator className="my-2" />

            <div className="p-4">
                <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                    Simulation Control
                </h2>
                <div className="space-y-2">
                    <Button className="w-full justify-start" variant="outline">
                        <Zap className="w-4 h-4 mr-2 text-primary" />
                        Run Simulation
                    </Button>
                </div>
            </div>

            <div className="mt-auto p-4 border-t border-border">
                <div className="bg-primary/10 p-3 rounded-md border border-primary/20">
                    <p className="text-xs text-primary font-semibold mb-1">AI INSIGHT</p>
                    <p className="text-xs text-muted-foreground">
                        Congestion predicted to peak at 8:15 AM. Suggest adding 2 drop-off lanes.
                    </p>
                </div>
            </div>
        </aside>
    );
}

function DraggableItem({ icon, label, type }: { icon: React.ReactNode; label: string; type: string }) {
    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('optimizationType', type);
    };

    return (
        <div
            className="flex items-center gap-3 p-3 rounded-md border border-border bg-background hover:border-primary/50 cursor-grab active:cursor-grabbing transition-colors"
            draggable
            onDragStart={handleDragStart}
        >
            <div className="text-muted-foreground">{icon}</div>
            <span className="text-sm font-medium">{label}</span>
        </div>
    );
}
