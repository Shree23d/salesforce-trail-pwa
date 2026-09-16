'use client';

import { Cloud, Sparkles, ShieldCheck } from 'lucide-react';

export default function Header({ currentTopic, currentDifficulty, isQuizActive }) {
  return (
    <header className="sticky top-0 z-30 w-full bg-[#0B0F17]/90 backdrop-blur-md border-b border-[#243049] px-4 py-3 flex items-center justify-between">
      {/* Brand Identity */}
      <div className="flex items-center space-x-2.5">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0284C7] to-sky-400 flex items-center justify-center shadow-lg shadow-sky-500/20 border border-sky-300/30">
          <Cloud className="w-5 h-5 text-white fill-white/20" />
        </div>
        <div>
          <div className="flex items-center space-x-1.5">
            <span className="text-sm font-bold tracking-tight text-white">SF Trail Mastery</span>
            <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-sky-950/80 text-sky-400 border border-sky-800/50">
              PWA
            </span>
          </div>
          <p className="text-[11px] text-slate-400 truncate max-w-[180px]">
            {isQuizActive && currentTopic ? `${currentTopic} • ${currentDifficulty}` : "Architect & Admin Prep"}
          </p>
        </div>
      </div>

      {/* Powered by Gemini Badge */}
      <div className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-[#161F30] border border-[#243049] text-[11px] font-medium text-slate-300">
        <Sparkles className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
        <span>Gemini AI</span>
      </div>
    </header>
  );
}
