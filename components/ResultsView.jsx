'use client';

import { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, BookOpen, Sparkles, CloudCheck } from 'lucide-react';

export default function ResultsView({
  score,
  totalQuestions = 7,
  topic,
  difficulty,
  questions,
  answers,
  onRetake,
  onNewQuiz,
  onGoToHistory,
  isSavedToCloud,
}) {
  const [filterTab, setFilterTab] = useState('incorrect'); // 'incorrect' | 'correct' | 'all'

  const percentage = Math.round((score / totalQuestions) * 100);

  // Performance tier badge
  const getBadge = () => {
    if (score === 7) return { label: 'CTA Trailblazer', color: 'text-amber-400 bg-amber-950/40 border-amber-500/40' };
    if (score >= 5) return { label: 'Certified Specialist', color: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/40' };
    if (score >= 4) return { label: 'Passing Grade', color: 'text-sky-400 bg-sky-950/40 border-sky-500/40' };
    return { label: 'Needs Revision', color: 'text-rose-400 bg-rose-950/40 border-rose-500/40' };
  };

  const badge = getBadge();

  const incorrectList = questions.filter((q, idx) => answers[idx] !== q.correct_index);
  const correctList = questions.filter((q, idx) => answers[idx] === q.correct_index);

  const displayList =
    filterTab === 'incorrect'
      ? incorrectList
      : filterTab === 'correct'
      ? correctList
      : questions;

  return (
    <div className="flex-1 px-4 pt-4 pb-28 space-y-5">
      {/* Score Hero Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-b from-[#161F30] to-[#0B0F17] border border-[#243049] shadow-2xl text-center space-y-4 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-sky-500/10 blur-2xl pointer-events-none" />

        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider mx-auto shadow-sm">
          <span className={`px-2.5 py-0.5 rounded-full border ${badge.color}`}>
            {badge.label}
          </span>
        </div>

        {/* Circular / Large Score Counter */}
        <div className="space-y-1">
          <div className="flex items-baseline justify-center space-x-1.5">
            <span className="text-5xl font-black text-white tracking-tight">{score}</span>
            <span className="text-2xl font-bold text-slate-500">/ {totalQuestions}</span>
          </div>
          <p className="text-xs font-semibold text-sky-400">
            {percentage}% Score • {topic}
          </p>
        </div>

        {/* Cloud Sync Status */}
        <div className="pt-1 flex items-center justify-center space-x-1 text-[11px] text-slate-400">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Session saved to Supabase & local cache</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={onRetake}
          className="py-3 px-3 rounded-xl bg-[#161F30] hover:bg-slate-800 border border-[#243049] text-white font-semibold text-xs flex items-center justify-center space-x-1.5 active:scale-95 transition"
        >
          <RotateCcw className="w-4 h-4 text-sky-400" />
          <span>Retake Quiz</span>
        </button>
        <button
          type="button"
          onClick={onNewQuiz}
          className="py-3 px-3 rounded-xl bg-[#0284C7] hover:bg-sky-500 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md active:scale-95 transition"
        >
          <span>Choose Topic</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Review Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Question Review
          </h3>
          <button
            onClick={onGoToHistory}
            className="text-[11px] text-sky-400 hover:text-sky-300 font-medium"
          >
            All History →
          </button>
        </div>

        {/* Segmented Filter Control */}
        <div className="grid grid-cols-3 p-1 rounded-xl bg-[#161F30] border border-[#243049] text-xs">
          <button
            type="button"
            onClick={() => setFilterTab('incorrect')}
            className={`py-1.5 rounded-lg font-semibold transition ${
              filterTab === 'incorrect'
                ? 'bg-rose-950/60 text-rose-300 shadow-sm border border-rose-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Incorrect ({incorrectList.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab('correct')}
            className={`py-1.5 rounded-lg font-semibold transition ${
              filterTab === 'correct'
                ? 'bg-emerald-950/60 text-emerald-300 shadow-sm border border-emerald-500/30'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Correct ({correctList.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterTab('all')}
            className={`py-1.5 rounded-lg font-semibold transition ${
              filterTab === 'all'
                ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All (7)
          </button>
        </div>

        {/* Questions List */}
        <div className="space-y-3">
          {displayList.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#161F30]/60 border border-[#243049] text-center space-y-1">
              <Award className="w-8 h-8 text-amber-400 mx-auto" />
              <p className="text-xs font-bold text-slate-200">Flawless Section!</p>
              <p className="text-[11px] text-slate-400">
                You did not miss any questions in this category.
              </p>
            </div>
          ) : (
            displayList.map((q) => {
              const originalIndex = questions.findIndex((orig) => orig.id === q.id);
              const userPick = answers[originalIndex];
              const isUserCorrect = userPick === q.correct_index;

              return (
                <div
                  key={q.id || originalIndex}
                  className="p-4 rounded-2xl bg-[#161F30] border border-[#243049] space-y-2.5 text-left"
                >
                  <div className="flex items-start justify-between space-x-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                      Q{originalIndex + 1}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isUserCorrect
                          ? 'text-emerald-400 bg-emerald-950/40 border-emerald-500/40'
                          : 'text-rose-400 bg-rose-950/40 border-rose-500/40'
                      }`}
                    >
                      {isUserCorrect ? 'Correct' : 'Missed'}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-100 leading-snug">
                    {q.question}
                  </p>

                  <div className="space-y-1.5 pt-1 text-[11px]">
                    {/* User Selection */}
                    {!isUserCorrect && userPick !== undefined && (
                      <div className="p-2 rounded-lg bg-rose-950/30 border border-rose-500/30 text-rose-200">
                        <span className="font-bold text-rose-300 block">Your Answer:</span>
                        {q.options[userPick]}
                      </div>
                    )}

                    {/* Correct Option */}
                    <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-200">
                      <span className="font-bold text-emerald-300 block">
                        Correct Answer ({String.fromCharCode(65 + q.correct_index)}):
                      </span>
                      {q.options[q.correct_index]}
                    </div>

                    {/* Explanation */}
                    <div className="p-2.5 rounded-lg bg-[#0B0F17] border border-[#243049] text-slate-300 text-[11px] leading-relaxed">
                      <span className="font-bold text-amber-400 block mb-0.5">
                        Architect Analysis:
                      </span>
                      <p className="whitespace-pre-line">{q.explanation_correct}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
