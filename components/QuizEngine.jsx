'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, Award, AlertCircle, HelpCircle, X } from 'lucide-react';

export default function QuizEngine({
  questions,
  currentIndex,
  answers, // Map of { [questionIndex]: selectedOptionIndex }
  onSelectOption,
  onNextQuestion,
  onFinishQuiz,
  onExitQuiz,
  topic,
  difficulty,
}) {
  const [confirmExit, setConfirmExit] = useState(false);

  const currentQ = questions[currentIndex] || {};
  const selectedOptionIndex = answers[currentIndex];
  const hasAnswered = selectedOptionIndex !== undefined;

  const isCorrect = hasAnswered && selectedOptionIndex === currentQ.correct_index;
  const isLastQuestion = currentIndex === questions.length - 1;

  const progressPercentage = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="flex-1 flex flex-col px-4 pt-3 pb-24 space-y-4">
      {/* Top Controls: Progress Bar & Exit Button */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-medium text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded-md bg-[#161F30] border border-[#243049] text-sky-400 font-bold">
              Q{currentIndex + 1} of {questions.length}
            </span>
            <span className="text-slate-400 truncate max-w-[130px]">{difficulty}</span>
          </div>
          <button
            type="button"
            onClick={() => setConfirmExit(true)}
            className="flex items-center space-x-1 text-slate-400 hover:text-rose-400 p-1 rounded-lg transition"
            title="Exit Quiz"
          >
            <span className="text-[11px]">Exit</span>
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full h-1.5 bg-[#161F30] rounded-full overflow-hidden border border-[#243049]">
          <div
            className="h-full bg-gradient-to-r from-[#0284C7] to-sky-400 transition-all duration-300 ease-out shadow-[0_0_8px_#0284C7]"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="p-4 rounded-2xl bg-[#161F30] border border-[#243049] shadow-xl space-y-3">
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-sky-950/60 text-sky-300 border border-sky-800/40">
            {topic}
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {currentQ.id ? `ID #${currentQ.id}` : ''}
          </span>
        </div>
        <p className="text-sm font-semibold text-slate-100 leading-relaxed">
          {currentQ.question}
        </p>
      </div>

      {/* 4 Multiple Choice Options */}
      <div className="space-y-2.5">
        {currentQ.options?.map((optionText, optionIdx) => {
          const letter = String.fromCharCode(65 + optionIdx); // A, B, C, D
          const isSelected = selectedOptionIndex === optionIdx;
          const isThisCorrect = optionIdx === currentQ.correct_index;

          let optionStyle =
            'bg-[#161F30]/80 hover:bg-[#161F30] border-[#243049] text-slate-200 hover:border-slate-600';
          let badgeStyle = 'bg-[#0B0F17] text-slate-400 border-[#243049]';

          if (hasAnswered) {
            if (isThisCorrect) {
              // Highlight the correct answer in Emerald (#059669)
              optionStyle =
                'bg-emerald-950/40 border-[#059669] text-emerald-100 shadow-[0_0_15px_rgba(5,150,105,0.25)] ring-1 ring-[#059669]';
              badgeStyle = 'bg-[#059669] text-white border-emerald-400';
            } else if (isSelected && !isThisCorrect) {
              // Highlight user's wrong pick in Warm Rose (#E11D48)
              optionStyle =
                'bg-rose-950/40 border-[#E11D48] text-rose-100 shadow-[0_0_15px_rgba(225,29,72,0.25)] ring-1 ring-[#E11D48]';
              badgeStyle = 'bg-[#E11D48] text-white border-rose-400';
            } else {
              // Other unselected neutral options
              optionStyle = 'bg-[#161F30]/40 border-[#243049]/60 text-slate-400 opacity-60';
            }
          }

          return (
            <button
              key={optionIdx}
              type="button"
              disabled={hasAnswered}
              onClick={() => onSelectOption(currentIndex, optionIdx)}
              className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-start space-x-3 active:scale-[0.99] disabled:cursor-default ${optionStyle}`}
            >
              {/* Option Letter / Status Icon */}
              <div
                className={`w-6 h-6 rounded-lg border flex items-center justify-center shrink-0 font-bold text-xs mt-0.5 transition-colors ${badgeStyle}`}
              >
                {hasAnswered ? (
                  isThisCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-white" />
                  ) : isSelected ? (
                    <XCircle className="w-4 h-4 text-white" />
                  ) : (
                    letter
                  )
                ) : (
                  letter
                )}
              </div>

              {/* Option Text */}
              <span className="text-xs font-medium leading-snug flex-1 pt-0.5">
                {optionText}
              </span>
            </button>
          );
        })}
      </div>

      {/* Immediate Feedback Card (When Answered) */}
      {hasAnswered && (
        <div
          className={`p-4 rounded-2xl border space-y-2.5 transition-all duration-300 animate-in fade-in-50 slide-in-from-bottom-2 ${
            isCorrect
              ? 'bg-emerald-950/30 border-emerald-500/40 shadow-lg'
              : 'bg-[#161F30] border-amber-500/50 shadow-xl'
          }`}
        >
          {/* Feedback Header */}
          <div className="flex items-center space-x-2">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-emerald-400 tracking-wide uppercase">
                  Correct Answer!
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-400 tracking-wide uppercase">
                  Insight & Analysis
                </span>
              </>
            )}
          </div>

          {/* 2-Line Punchy Explanation Content */}
          <div className="text-xs space-y-2 text-slate-200 leading-relaxed font-normal">
            {isCorrect ? (
              <div className="bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/20 whitespace-pre-line">
                {currentQ.explanation_correct}
              </div>
            ) : (
              <>
                {/* Why choice failed */}
                <div className="bg-rose-950/30 p-2.5 rounded-xl border border-rose-500/20 text-rose-200">
                  <span className="font-semibold text-rose-300 block mb-0.5">
                    Why your selection failed:
                  </span>
                  <p className="whitespace-pre-line">{currentQ.explanation_wrong}</p>
                </div>

                {/* Why correct is valid */}
                <div className="bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-500/20 text-emerald-200">
                  <span className="font-semibold text-emerald-300 block mb-0.5">
                    Why option {String.fromCharCode(65 + currentQ.correct_index)} is correct:
                  </span>
                  <p className="whitespace-pre-line">{currentQ.explanation_correct}</p>
                </div>
              </>
            )}
          </div>

          {/* Advance Action Button */}
          <div className="pt-2">
            {isLastQuestion ? (
              <button
                type="button"
                onClick={onFinishQuiz}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#0284C7] to-sky-500 hover:from-sky-600 hover:to-sky-400 text-white font-bold text-xs shadow-lg flex items-center justify-center space-x-2 active:scale-95 transition"
              >
                <span>View Results & Breakdown</span>
                <Award className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onNextQuestion}
                className="w-full py-3 px-4 rounded-xl bg-[#0284C7] hover:bg-sky-500 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2 active:scale-95 transition"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Confirm Exit Modal Dialog */}
      {confirmExit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in-50">
          <div className="w-full max-w-xs bg-[#161F30] border border-[#243049] rounded-2xl p-5 shadow-2xl space-y-4">
            <h4 className="text-sm font-bold text-white">Exit Active Quiz?</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your answered questions will be cleared from progress. You can start a fresh quiz anytime.
            </p>
            <div className="flex space-x-2 pt-1">
              <button
                type="button"
                onClick={() => setConfirmExit(false)}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs hover:bg-slate-700 active:scale-95 transition"
              >
                Keep Going
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmExit(false);
                  onExitQuiz();
                }}
                className="flex-1 py-2 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs active:scale-95 transition"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
