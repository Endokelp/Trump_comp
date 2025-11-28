"use client";

import React from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function SchoolSearch() {
    return (
        <Card className="absolute top-4 left-4 z-40 w-96 bg-white/80 backdrop-blur-md border-white/20 shadow-lg rounded-3xl p-2">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search WA Elementary Schools..."
                        className="pl-9 bg-background/50 border-border focus-visible:ring-primary"
                    />
                </div>
                <Button size="icon" variant="secondary">
                    <MapPin className="h-4 w-4" />
                </Button>
            </div>
        </Card>
    );
}
