'use client';

import { useState, useMemo } from 'react';
import { Flame, Trophy, Zap, Calendar, Sparkles, CheckCircle2 } from 'lucide-react';
import { calculateStreakStats, generateHeatmapWeeks } from '@/lib/streakUtils';

export default function StreakHeatmap({ quizHistory = [] }) {
  const [selectedCell, setSelectedCell] = useState(null);

  // Compute streak stats and contribution matrix
  const stats = useMemo(() => calculateStreakStats(quizHistory), [quizHistory]);
  const heatmapWeeks = useMemo(
    () => generateHeatmapWeeks(stats.activeDatesMap, 11),
    [stats.activeDatesMap]
  );

  // GitHub level color tokens
  const getLevelClasses = (level, isFuture, isToday) => {
    if (isFuture) {
      return 'bg-[#0B0F17]/40 border-slate-800/30 opacity-30 cursor-not-allowed';
    }

    const todayRing = isToday ? 'ring-1 ring-sky-400 ring-offset-1 ring-offset-[#0B0F17]' : '';

    switch (level) {
      case 3:
        return `bg-[#10B981] border-[#34D399] shadow-[0_0_8px_rgba(16,185,129,0.5)] ${todayRing}`;
      case 2:
        return `bg-[#059669] border-[#10B981]/50 shadow-[0_0_4px_rgba(5,150,105,0.3)] ${todayRing}`;
      case 1:
        return `bg-[#064E3B] border-[#047857]/40 ${todayRing}`;
      case 0:
      default:
        return `bg-[#161F30] border-[#243049] hover:border-slate-500 ${todayRing}`;
    }
  };

  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="p-4 rounded-3xl bg-[#161F30] border border-[#243049] shadow-xl space-y-3.5 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl pointer-events-none" />

      {/* Header & Streak Counter */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center shadow-md shadow-orange-500/20">
            <Flame className="w-4 h-4 text-white fill-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h2 className="text-xs font-bold text-white tracking-tight">Study Streak</h2>
              <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-amber-950/60 text-amber-400 border border-amber-800/40">
                {stats.currentStreak} {stats.currentStreak === 1 ? 'Day' : 'Days'}
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              {stats.isPracticedToday
                ? `Practiced today (${stats.todayCount} ${stats.todayCount === 1 ? 'quiz' : 'quizzes'})`
                : 'Take 1 quiz today to maintain streak!'}
            </p>
          </div>
        </div>

        {/* Milestone Trophy */}
        <div className="flex items-center space-x-1 text-[11px] font-bold text-slate-300 bg-[#0B0F17] px-2.5 py-1 rounded-xl border border-[#243049]">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>Best: {stats.longestStreak}d</span>
        </div>
      </div>

      {/* GitHub-Style Contribution Grid */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-[10px] text-slate-400 px-0.5">
          <span className="flex items-center space-x-1">
            <Calendar className="w-3 h-3 text-slate-500" />
            <span>Activity (Past 11 Weeks)</span>
          </span>
          {selectedCell ? (
            <span className="text-sky-400 font-semibold animate-in fade-in-50">
              {selectedCell.label}: {selectedCell.count} {selectedCell.count === 1 ? 'quiz' : 'quizzes'}
            </span>
          ) : (
            <span>Tap any box</span>
          )}
        </div>

        <div className="flex items-start space-x-1.5 p-2.5 rounded-2xl bg-[#0B0F17] border border-[#243049]/80 overflow-x-auto scrollbar-none">
          {/* Day of Week Labels (Mon, Wed, Fri) */}
          <div className="flex flex-col justify-between h-[84px] text-[8px] font-mono text-slate-500 pr-1 select-none pt-0.5">
            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
          </div>

          {/* 11 Weeks Matrix Columns */}
          <div className="flex space-x-1">
            {heatmapWeeks.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col space-y-1">
                {week.map((day, dIdx) => (
                  <button
                    key={dIdx}
                    type="button"
                    disabled={day.isFuture}
                    onClick={() => setSelectedCell(day)}
                    className={`w-2.5 h-2.5 rounded-[3px] border transition-all duration-150 ${getLevelClasses(
                      day.level,
                      day.isFuture,
                      day.isToday
                    )}`}
                    title={`${day.label}: ${day.count} quizzes`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Heatmap Legend */}
        <div className="flex items-center justify-between text-[9px] text-slate-400 px-1 pt-0.5">
          <span className="font-mono">
            Total: {stats.totalQuizzes} {stats.totalQuizzes === 1 ? 'attempt' : 'attempts'}
          </span>
          <div className="flex items-center space-x-1 font-mono">
            <span>Less</span>
            <span className="w-2 h-2 rounded-[2px] bg-[#161F30] border border-[#243049]" />
            <span className="w-2 h-2 rounded-[2px] bg-[#064E3B] border border-[#047857]/40" />
            <span className="w-2 h-2 rounded-[2px] bg-[#059669] border border-[#10B981]/50" />
            <span className="w-2 h-2 rounded-[2px] bg-[#10B981] border-[#34D399]" />
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
