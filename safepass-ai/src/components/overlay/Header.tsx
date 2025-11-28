"use client";

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-white/20 flex items-center px-6 justify-between z-50 relative mx-4 mt-2">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-xl font-bold tracking-tight text-foreground">
            SafePass <span className="text-primary">AI</span>
          </h1>
          <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
            Presidential AI Challenge 2025
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block">
          <p className="text-xs text-muted-foreground">Current School</p>
          <p className="text-sm font-medium text-foreground">Cascade View Elementary</p>
        </div>
        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
          <span className="text-xs font-bold text-primary">US</span>
        </div>
      </div>
    </header>
  );
}
