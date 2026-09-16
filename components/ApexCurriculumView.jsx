'use client';

import { useState } from 'react';
import { ArrowLeft, Search, ChevronDown, ChevronUp, Sparkles, BookOpen, Layers, CheckCircle2, Code2, Zap } from 'lucide-react';
import { APEX_SECTIONS, APEX_MODULES } from '@/lib/apexCurriculum';
import { DIFFICULTIES } from './TopicSelector';

export default function ApexCurriculumView({
  onBack,
  onStartSubtopicQuiz,
  isLoading,
}) {
  const [selectedModule, setSelectedModule] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState(null); // id of expanded card
  const [selectedDifficulty, setSelectedDifficulty] = useState('Beginner');

  // Filter sections by module and search query
  const filteredSections = APEX_SECTIONS.filter((section) => {
    // Module filter
    if (selectedModule !== 'all') {
      const mod = APEX_MODULES.find((m) => m.id === selectedModule);
      if (mod && !mod.sections.includes(section.sectionNumber)) {
        return false;
      }
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = section.title.toLowerCase().includes(q);
      const matchSubtitle = section.subtitle.toLowerCase().includes(q);
      const matchSummary = section.summary.toLowerCase().includes(q);
      const matchTopics = section.topics.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchSubtitle || matchSummary || matchTopics;
    }

    return true;
  });

  const toggleExpand = (secId) => {
    setExpandedSection((prev) => (prev === secId ? null : secId));
  };

  return (
    <div className="flex-1 px-4 pt-3 pb-28 space-y-4">
      {/* Top Bar with Back Button */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center space-x-1.5 py-1.5 px-3 rounded-xl bg-[#161F30] border border-[#243049] text-xs font-semibold text-slate-300 hover:text-white active:scale-95 transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>All Domains</span>
        </button>

        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-purple-950/70 text-purple-300 border border-purple-800/40 flex items-center space-x-1">
          <Code2 className="w-3 h-3 text-purple-400" />
          <span>Apex Track</span>
        </span>
      </div>

      {/* Hero Title */}
      <div className="space-y-1">
        <h1 className="text-xl font-extrabold text-white tracking-tight">
          Apex Developer Roadmap
        </h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          27 structured sections from day-one syntax to enterprise REST APIs & SOLID patterns. Pick any section to generate targeted 7-question practice quizzes.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search topics (e.g. wrapper, list, trigger, SOQL)..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#161F30] border border-[#243049] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 transition"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Module Filter Chips */}
      <div className="flex space-x-1.5 overflow-x-auto pb-1 scrollbar-none text-[11px]">
        <button
          type="button"
          onClick={() => setSelectedModule('all')}
          className={`px-3 py-1.5 rounded-xl shrink-0 font-medium transition ${
            selectedModule === 'all'
              ? 'bg-[#0284C7] text-white shadow-sm'
              : 'bg-[#161F30] text-slate-400 hover:text-slate-200 border border-[#243049]'
          }`}
        >
          All (27)
        </button>
        {APEX_MODULES.map((mod) => {
          const isSelected = selectedModule === mod.id;
          return (
            <button
              key={mod.id}
              type="button"
              onClick={() => setSelectedModule(mod.id)}
              className={`px-3 py-1.5 rounded-xl shrink-0 font-medium transition ${
                isSelected
                  ? 'bg-[#0284C7] text-white shadow-sm'
                  : 'bg-[#161F30] text-slate-400 hover:text-slate-200 border border-[#243049]'
              }`}
            >
              {mod.name.split(':')[1]?.trim() || mod.name}
            </button>
          );
        })}
      </div>

      {/* Difficulty Selector for Practice */}
      <div className="p-3 rounded-2xl bg-[#161F30] border border-[#243049] space-y-2">
        <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 flex items-center justify-between">
          <span>Quiz Challenge Level</span>
          <span className="text-sky-400">{selectedDifficulty}</span>
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {DIFFICULTIES.map((diff) => {
            const isSelected = selectedDifficulty === diff.id;
            return (
              <button
                key={diff.id}
                type="button"
                onClick={() => setSelectedDifficulty(diff.id)}
                className={`py-1.5 px-2 rounded-lg border text-center transition active:scale-95 ${
                  isSelected
                    ? `${diff.accent} shadow-sm ring-1 ring-inset`
                    : 'bg-[#0B0F17] border-[#243049] text-slate-400 hover:text-slate-300'
                }`}
              >
                <span className="text-[10px] font-bold block">{diff.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sections List */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-400 px-1">
          <span>Showing {filteredSections.length} Sections</span>
          <span>Tap to expand concepts</span>
        </div>

        {filteredSections.map((sec) => {
          const isExpanded = expandedSection === sec.id;

          return (
            <div
              key={sec.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-[#161F30] border-sky-500/60 shadow-lg'
                  : 'bg-[#161F30]/70 hover:bg-[#161F30] border-[#243049]'
              }`}
            >
              {/* Card Header (clickable to expand) */}
              <button
                type="button"
                onClick={() => toggleExpand(sec.id)}
                className="w-full p-3.5 text-left flex items-start justify-between space-x-3 active:bg-slate-800/40"
              >
                <div className="flex items-start space-x-3 min-w-0">
                  {/* Number Badge */}
                  <div className="w-8 h-8 rounded-xl bg-[#0B0F17] border border-[#243049] flex items-center justify-center shrink-0 text-xs font-black text-sky-400">
                    {String(sec.sectionNumber).padStart(2, '0')}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-white tracking-tight leading-snug">
                      Section {sec.sectionNumber}: {sec.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                      {sec.subtitle}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 pt-1 text-slate-400">
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-sky-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </button>

              {/* Expanded Lesson Drawer */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-1 border-t border-[#243049]/60 space-y-3 animate-in fade-in-50">
                  {/* Summary */}
                  <p className="text-xs text-slate-300 leading-relaxed bg-[#0B0F17]/60 p-2.5 rounded-xl border border-[#243049]/50">
                    {sec.summary}
                  </p>

                  {/* Bullet Topics */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                      Core Topics Covered:
                    </span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {sec.topics.map((t, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <span className="text-sky-400 font-bold text-xs shrink-0">•</span>
                          <span className="text-[11px] text-slate-300 leading-snug">{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Practice CTA for this exact section */}
                  <div className="pt-2">
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={() => onStartSubtopicQuiz(sec, selectedDifficulty)}
                      className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#0284C7] to-sky-500 hover:from-sky-600 hover:to-sky-400 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2 active:scale-95 transition disabled:opacity-60"
                    >
                      {isLoading ? (
                        <>
                          <Sparkles className="w-3.5 h-3.5 animate-spin" />
                          <span>Generating Section Questions...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-sky-200" />
                          <span>Practice Section {sec.sectionNumber} ({selectedDifficulty})</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
