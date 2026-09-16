'use client';

import { BookOpen, History, Sparkles } from 'lucide-react';

export default function BottomNav({ activeTab, setActiveTab, hasActiveQuiz }) {
  const tabs = [
    {
      id: 'quiz',
      label: hasActiveQuiz ? 'Active Quiz' : 'Topics & Quiz',
      icon: BookOpen,
      badge: hasActiveQuiz ? 'In Progress' : null,
    },
    {
      id: 'history',
      label: 'History',
      icon: History,
      badge: null,
    },
  ];

  return (
    <nav
      className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-40 bg-[#161F30]/95 backdrop-blur-lg border-t border-[#243049] px-6 pt-2.5 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-2xl"
      aria-label="Mobile Navigation"
    >
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center py-1 px-4 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-sky-400 font-semibold scale-105'
                  : 'text-slate-400 hover:text-slate-200 active:scale-95'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-2.5 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                  </span>
                )}
              </div>
              <span className="text-[11px] mt-1 tracking-tight">{tab.label}</span>

              {/* Active sky blue indicator dot */}
              {isActive && (
                <span className="absolute -bottom-1 w-6 h-0.5 bg-[#0284C7] rounded-full shadow-[0_0_8px_#0284C7]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
