'use client';

import { Shield, Database, Workflow, Code2, Sparkles, Flame, Zap, Compass, RotateCcw } from 'lucide-react';

export const TOPICS = [
  {
    id: 'Security & Access',
    title: 'Security & Access',
    desc: 'OWD, Profiles, Permission Set Groups, Sharing Rules & Role Hierarchy',
    icon: Shield,
    color: 'from-blue-600 to-indigo-600',
    border: 'border-blue-500/30',
    badge: 'Core Admin & App Builder',
  },
  {
    id: 'Data Modeling',
    title: 'Data Modeling',
    desc: 'Master-Detail, Junction Objects, Roll-ups, Lookups & Schema Design',
    icon: Database,
    color: 'from-emerald-600 to-teal-600',
    border: 'border-emerald-500/30',
    badge: 'Admin & Platform Dev I',
  },
  {
    id: 'Process Automation',
    title: 'Process Automation',
    desc: 'Record-Triggered Flows, Order of Execution, Scheduled Paths & Approvals',
    icon: Workflow,
    color: 'from-amber-600 to-orange-600',
    border: 'border-amber-500/30',
    badge: 'Flow Specialist',
  },
  {
    id: 'Apex & Architecture',
    title: 'Apex & Architecture',
    desc: 'Trigger Frameworks, Governor Limits, Asynchronous Apex & Testing Patterns',
    icon: Code2,
    color: 'from-purple-600 to-sky-600',
    border: 'border-purple-500/30',
    badge: 'Platform Dev I & II / CTA',
  },
];

export const DIFFICULTIES = [
  {
    id: 'Beginner',
    label: 'Beginner',
    icon: Compass,
    summary: 'Core concepts & definitions',
    accent: 'border-emerald-500/40 text-emerald-400 bg-emerald-950/30',
  },
  {
    id: 'Intermediate',
    label: 'Intermediate',
    icon: Zap,
    summary: 'Realistic business scenarios',
    accent: 'border-sky-500/40 text-sky-400 bg-sky-950/30',
  },
  {
    id: 'Tricky Scenario',
    label: 'Tricky Scenario',
    icon: Flame,
    summary: 'Exam traps & governor limits',
    accent: 'border-rose-500/40 text-rose-400 bg-rose-950/30',
  },
];

export default function TopicSelector({
  selectedTopic,
  setSelectedTopic,
  selectedDifficulty,
  setSelectedDifficulty,
  onStartQuiz,
  isLoading,
  savedQuizState,
  onResumeQuiz,
  onDiscardSavedQuiz,
  onOpenApexCurriculum,
}) {
  return (
    <div className="flex-1 px-4 pt-4 pb-28 space-y-6">
      {/* Resume Banner (if mid-quiz saved in localStorage) */}
      {savedQuizState && (
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-sky-950/80 to-[#161F30] border border-sky-500/40 shadow-lg flex items-center justify-between">
          <div className="space-y-0.5">
            <div className="flex items-center space-x-1.5">
              <RotateCcw className="w-4 h-4 text-sky-400 animate-spin" style={{ animationDuration: '6s' }} />
              <span className="text-xs font-bold text-sky-300">Active Quiz Detected</span>
            </div>
            <p className="text-[11px] text-slate-300">
              {savedQuizState.topic} • Question {(savedQuizState.currentIndex || 0) + 1} of {savedQuizState.questions?.length || 7}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onDiscardSavedQuiz}
              className="text-[11px] px-2.5 py-1.5 rounded-lg text-slate-400 hover:text-rose-300 active:scale-95 transition"
            >
              Discard
            </button>
            <button
              onClick={onResumeQuiz}
              className="text-xs font-semibold px-3.5 py-1.5 rounded-xl bg-[#0284C7] hover:bg-sky-500 text-white shadow-md active:scale-95 transition"
            >
              Resume
            </button>
          </div>
        </div>
      )}

      {/* Hero Welcome */}
      <div className="space-y-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400">
          Targeted Exam Preparation
        </span>
        <h1 className="text-xl font-extrabold text-white tracking-tight">
          Select Your Challenge
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          Sharpen your architectural reasoning with 7 targeted questions and instant line-by-line feedback.
        </p>
      </div>

      {/* Topics Grid */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
          <span>1. Choose Domain</span>
          <span className="text-[11px] font-normal text-slate-400">4 Categories</span>
        </label>

        <div className="space-y-2.5">
          {TOPICS.map((topic) => {
            const Icon = topic.icon;
            const isSelected = selectedTopic === topic.id;

            return (
              <button
                key={topic.id}
                type="button"
                onClick={() => setSelectedTopic(topic.id)}
                className={`w-full text-left p-3.5 rounded-2xl transition-all duration-200 border relative overflow-hidden active:scale-[0.99] ${
                  isSelected
                    ? 'bg-[#161F30] border-sky-500 shadow-[0_0_20px_rgba(2,132,199,0.2)] ring-1 ring-sky-500/50'
                    : 'bg-[#161F30]/70 hover:bg-[#161F30] border-[#243049] hover:border-slate-700'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center shrink-0 shadow-md`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white tracking-tight truncate">
                        {topic.title}
                      </h3>
                      {isSelected && (
                        <span className="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2 leading-relaxed">
                      {topic.desc}
                    </p>
                    <div className="flex items-center justify-between mt-1.5">
                      <span className="inline-block text-[9px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-900/60 text-slate-400 border border-[#243049]">
                        {topic.badge}
                      </span>
                      {topic.id === 'Apex & Architecture' && onOpenApexCurriculum && (
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenApexCurriculum();
                          }}
                          className="text-[10px] font-bold text-sky-400 hover:text-sky-300 underline underline-offset-2 flex items-center space-x-0.5 cursor-pointer"
                        >
                          <span>27 Sections Roadmap →</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Difficulty Selector Chips */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
          2. Difficulty Level
        </label>
        <div className="grid grid-cols-3 gap-2">
          {DIFFICULTIES.map((diff) => {
            const Icon = diff.icon;
            const isSelected = selectedDifficulty === diff.id;

            return (
              <button
                key={diff.id}
                type="button"
                onClick={() => setSelectedDifficulty(diff.id)}
                className={`p-2.5 rounded-xl border flex flex-col items-center text-center transition-all duration-200 active:scale-95 ${
                  isSelected
                    ? `${diff.accent} shadow-md ring-1 ring-inset`
                    : 'bg-[#161F30]/60 border-[#243049] text-slate-400 hover:text-slate-300 hover:bg-[#161F30]'
                }`}
              >
                <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? 'scale-110' : ''}`} />
                <span className="text-[11px] font-bold leading-tight">{diff.label}</span>
                <span className="text-[9px] opacity-75 mt-0.5 line-clamp-1">{diff.summary}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Launch CTA Button */}
      <div className="pt-2">
        <button
          type="button"
          disabled={isLoading}
          onClick={onStartQuiz}
          className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#0284C7] to-sky-500 hover:from-sky-600 hover:to-sky-400 text-white font-bold text-sm shadow-[0_4px_20px_rgba(2,132,199,0.35)] active:scale-[0.98] transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Crafting Scenario Quiz...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-sky-200" />
              <span>Start 7-Question Challenge</span>
            </>
          )}
        </button>
        <p className="text-[11px] text-center text-slate-400 mt-2">
          Instant answers • Explanations on every choice • Offline safe
        </p>
      </div>
    </div>
  );
}
