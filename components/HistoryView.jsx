'use client';

import { useState, useEffect } from 'react';
import { History, Calendar, Award, ChevronRight, RotateCw, X, CheckCircle2, XCircle, Database, AlertTriangle } from 'lucide-react';
import { fetchQuizHistory, isSupabaseConfigured } from '@/lib/supabaseClient';

export default function HistoryView({ onStartNewQuiz }) {
  const [historyItems, setHistoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAttempt, setSelectedAttempt] = useState(null);
  const [isLiveConnected, setIsLiveConnected] = useState(false);

  const loadHistory = async () => {
    setLoading(true);

    // 1. Check Supabase first
    if (isSupabaseConfigured) {
      const { data, error } = await fetchQuizHistory(30);
      if (!error && data && data.length > 0) {
        setHistoryItems(data);
        setIsLiveConnected(true);
        setLoading(false);
        return;
      }
    }

    // 2. Fallback to LocalStorage history
    try {
      const localData = localStorage.getItem('salesforce_pwa_quiz_history');
      if (localData) {
        const parsed = JSON.parse(localData);
        setHistoryItems(parsed);
      } else {
        setHistoryItems([]);
      }
    } catch (e) {
      console.error('Failed reading local history:', e);
      setHistoryItems([]);
    }

    setIsLiveConnected(isSupabaseConfigured);
    setLoading(false);
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const formatDate = (isoString) => {
    if (!isoString) return 'Just now';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return 'Recent';
    }
  };

  return (
    <div className="flex-1 px-4 pt-4 pb-28 space-y-4">
      {/* Header & Sync Status */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-white tracking-tight">Quiz History</h2>
          <p className="text-xs text-slate-400">Past attempts and review logs</p>
        </div>
        <button
          onClick={loadHistory}
          disabled={loading}
          className="p-2 rounded-xl bg-[#161F30] border border-[#243049] text-slate-400 hover:text-white active:scale-95 transition"
          title="Refresh History"
        >
          <RotateCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {/* Database Connection Pill */}
      <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#161F30]/70 border border-[#243049] text-[11px]">
        <div className="flex items-center space-x-2">
          <Database className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-slate-300">
            {isLiveConnected ? 'Synced with Supabase Cloud' : 'Local Storage Mode'}
          </span>
        </div>
        <span
          className={`w-2 h-2 rounded-full ${
            isLiveConnected ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-amber-400'
          }`}
        />
      </div>

      {/* History List */}
      {loading ? (
        <div className="p-12 text-center space-y-3">
          <RotateCw className="w-6 h-6 text-sky-400 animate-spin mx-auto" />
          <p className="text-xs text-slate-400">Loading your past attempts...</p>
        </div>
      ) : historyItems.length === 0 ? (
        <div className="p-10 rounded-3xl bg-[#161F30]/60 border border-[#243049] text-center space-y-3">
          <History className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-sm font-bold text-slate-200">No Quizzes Completed Yet</h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Take your first 7-question challenge to generate your progress timeline.
          </p>
          <button
            onClick={onStartNewQuiz}
            className="mt-2 py-2 px-4 rounded-xl bg-[#0284C7] hover:bg-sky-500 text-white font-semibold text-xs shadow-md active:scale-95 transition"
          >
            Start a Quiz
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {historyItems.map((item, idx) => {
            const score = item.score ?? 0;
            const total = item.total_questions || 7;
            const pct = Math.round((score / total) * 100);

            return (
              <button
                key={item.id || idx}
                onClick={() => setSelectedAttempt(item)}
                className="w-full text-left p-3.5 rounded-2xl bg-[#161F30] hover:bg-[#1D2A42] border border-[#243049] hover:border-slate-600 transition-all flex items-center justify-between active:scale-[0.99] group shadow-sm"
              >
                <div className="space-y-1 min-w-0 pr-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-white tracking-tight truncate">
                      {item.topic}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-900/80 text-slate-400 border border-slate-800">
                      {item.difficulty}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-400">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    <span>{formatDate(item.created_at)}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2.5 shrink-0">
                  <div className="text-right">
                    <span className="text-sm font-black text-white">{score}/{total}</span>
                    <span className="block text-[10px] font-semibold text-sky-400">{pct}%</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 transition-transform group-hover:translate-x-0.5" />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Review Modal Dialog for Past Attempt */}
      {selectedAttempt && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in-50">
          <div className="w-full max-w-md max-h-[85vh] bg-[#161F30] border border-[#243049] rounded-t-3xl sm:rounded-3xl flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 border-b border-[#243049] flex items-center justify-between bg-[#0B0F17]/80">
              <div>
                <h3 className="text-sm font-bold text-white">{selectedAttempt.topic}</h3>
                <p className="text-[11px] text-slate-400">
                  {selectedAttempt.difficulty} • Score: {selectedAttempt.score}/{selectedAttempt.total_questions || 7}
                </p>
              </div>
              <button
                onClick={() => setSelectedAttempt(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white bg-[#161F30] border border-[#243049]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Questions Scrollable List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {Array.isArray(selectedAttempt.questions_data) && selectedAttempt.questions_data.length > 0 ? (
                selectedAttempt.questions_data.map((q, qIndex) => {
                  const userChoice = q.user_selected_index;
                  const isCorrectChoice = userChoice === q.correct_index;

                  return (
                    <div
                      key={q.id || qIndex}
                      className="p-3.5 rounded-2xl bg-[#0B0F17] border border-[#243049] space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-300">Question {qIndex + 1}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isCorrectChoice
                              ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30'
                              : 'bg-rose-950/40 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {isCorrectChoice ? 'Correct' : 'Missed'}
                        </span>
                      </div>

                      <p className="font-semibold text-slate-100">{q.question}</p>

                      {/* Your pick vs Correct pick */}
                      <div className="space-y-1 pt-1 text-[11px]">
                        {!isCorrectChoice && userChoice !== undefined && (
                          <div className="p-2 rounded-lg bg-rose-950/30 border border-rose-500/20 text-rose-300">
                            <strong>Your Answer:</strong> {q.options?.[userChoice] || 'None'}
                          </div>
                        )}
                        <div className="p-2 rounded-lg bg-emerald-950/30 border border-emerald-500/20 text-emerald-300">
                          <strong>Correct:</strong> {q.options?.[q.correct_index]}
                        </div>
                        <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                          <strong className="text-amber-400 block">Analysis:</strong>
                          <p className="whitespace-pre-line">{q.explanation_correct}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-xs text-center text-slate-400 py-6">
                  Detailed question breakdown is not available for this legacy entry.
                </p>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-[#0B0F17]/90 border-t border-[#243049]">
              <button
                onClick={() => setSelectedAttempt(null)}
                className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-200 font-semibold text-xs active:scale-95 transition"
              >
                Close Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
