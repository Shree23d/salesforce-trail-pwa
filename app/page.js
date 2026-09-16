'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import TopicSelector from '@/components/TopicSelector';
import ApexCurriculumView from '@/components/ApexCurriculumView';
import QuizEngine from '@/components/QuizEngine';
import ResultsView from '@/components/ResultsView';
import HistoryView from '@/components/HistoryView';
import { saveQuizAttempt, fetchQuizHistory, isSupabaseConfigured } from '@/lib/supabaseClient';
import { calculateStreakStats } from '@/lib/streakUtils';

const STORAGE_KEY_ACTIVE = 'salesforce_pwa_active_quiz';
const STORAGE_KEY_HISTORY = 'salesforce_pwa_quiz_history';

export default function Home() {
  // Navigation tabs: 'quiz' | 'history'
  const [activeTab, setActiveTab] = useState('quiz');

  // Quiz phase: 'selector' | 'apex_curriculum' | 'taking' | 'results'
  const [quizState, setQuizState] = useState('selector');

  // Topic, subtopic and challenge selection
  const [selectedTopic, setSelectedTopic] = useState('Security & Access');
  const [selectedSubtopic, setSelectedSubtopic] = useState(null); // e.g. "Section 3: Primitive Data Types"
  const [selectedDifficulty, setSelectedDifficulty] = useState('Beginner');

  // Active quiz session data
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [questionIndex]: optionIndex }
  const [isLoading, setIsLoading] = useState(false);

  // Stored in-flight quiz (for resume detection)
  const [savedQuizState, setSavedQuizState] = useState(null);
  const [isSavedToCloud, setIsSavedToCloud] = useState(false);

  // Global quiz history & streak tracking
  const [quizHistory, setQuizHistory] = useState([]);

  // Compute live streak stats
  const streakStats = useMemo(() => calculateStreakStats(quizHistory), [quizHistory]);

  // Load history from Supabase and LocalStorage on mount (merging both)
  const loadHistoryData = useCallback(async () => {
    let cloudItems = [];
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await fetchQuizHistory(100);
        if (!error && Array.isArray(data)) {
          cloudItems = data;
        }
      } catch (err) {
        console.warn('[Supabase] History fetch error:', err);
      }
    }

    let localItems = [];
    try {
      const local = localStorage.getItem(STORAGE_KEY_HISTORY);
      if (local) localItems = JSON.parse(local);
    } catch (e) {
      console.error('Failed reading local history for streak:', e);
    }

    // Merge cloud and local items without duplicates
    const combined = [...cloudItems];
    const existingIds = new Set(cloudItems.map((item) => item.id).filter(Boolean));

    localItems.forEach((local) => {
      if (!local.id || !existingIds.has(local.id)) {
        combined.push(local);
      }
    });

    // Sort by latest first
    combined.sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));

    setQuizHistory(combined);
  }, []);

  // 1. On Mount: Check LocalStorage for active quiz + load history
  useEffect(() => {
    loadHistoryData();

    try {
      const stored = localStorage.getItem(STORAGE_KEY_ACTIVE);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.questions && parsed.questions.length > 0) {
          setSavedQuizState(parsed);
        }
      }
    } catch (e) {
      console.error('Failed reading saved quiz from storage:', e);
    }
  }, [loadHistoryData]);

  // 2. Persist active quiz progress to LocalStorage whenever state updates
  useEffect(() => {
    if (quizState === 'taking' && questions.length > 0) {
      const stateToSave = {
        topic: selectedTopic,
        subtopic: selectedSubtopic,
        difficulty: selectedDifficulty,
        questions,
        currentIndex,
        answers,
        timestamp: Date.now(),
      };
      try {
        localStorage.setItem(STORAGE_KEY_ACTIVE, JSON.stringify(stateToSave));
        setSavedQuizState(stateToSave);
      } catch (e) {
        console.error('Failed caching active quiz:', e);
      }
    }
  }, [quizState, questions, currentIndex, answers, selectedTopic, selectedSubtopic, selectedDifficulty]);

  // Start fresh domain quiz by fetching from Gemini API route
  const handleStartQuiz = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: selectedTopic,
          difficulty: selectedDifficulty,
        }),
      });

      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();

      const loadedQuestions = data.questions || [];
      if (loadedQuestions.length === 0) {
        throw new Error('No questions returned');
      }

      setQuestions(loadedQuestions);
      setSelectedSubtopic(null);
      setCurrentIndex(0);
      setAnswers({});
      setQuizState('taking');
      setSavedQuizState(null);
    } catch (err) {
      console.error('Error starting quiz:', err);
      alert('Unable to load questions. Please check your connection or try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Start targeted Subtopic quiz (e.g. from Apex Curriculum)
  const handleStartSubtopicQuiz = async (section, difficulty) => {
    setIsLoading(true);
    const subtopicLabel = `Section ${section.sectionNumber}: ${section.title}`;
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: 'Apex & Architecture',
          subtopic: subtopicLabel,
          subtopicId: section.id,
          difficulty,
        }),
      });

      if (!res.ok) throw new Error('API request failed');
      const data = await res.json();

      const loadedQuestions = data.questions || [];
      if (loadedQuestions.length === 0) {
        throw new Error('No questions returned');
      }

      setSelectedTopic('Apex & Architecture');
      setSelectedSubtopic(subtopicLabel);
      setSelectedDifficulty(difficulty);
      setQuestions(loadedQuestions);
      setCurrentIndex(0);
      setAnswers({});
      setQuizState('taking');
      setSavedQuizState(null);
    } catch (err) {
      console.error('Error starting subtopic quiz:', err);
      alert('Unable to load section questions. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Resume an interrupted quiz from localStorage
  const handleResumeQuiz = () => {
    if (!savedQuizState) return;
    setSelectedTopic(savedQuizState.topic);
    setSelectedSubtopic(savedQuizState.subtopic || null);
    setSelectedDifficulty(savedQuizState.difficulty);
    setQuestions(savedQuizState.questions);
    setCurrentIndex(savedQuizState.currentIndex || 0);
    setAnswers(savedQuizState.answers || {});
    setQuizState('taking');
  };

  // Discard saved quiz
  const handleDiscardSavedQuiz = () => {
    localStorage.removeItem(STORAGE_KEY_ACTIVE);
    setSavedQuizState(null);
  };

  // Exit in-flight quiz back to selector
  const handleExitQuiz = () => {
    localStorage.removeItem(STORAGE_KEY_ACTIVE);
    setSavedQuizState(null);
    setQuizState(selectedSubtopic ? 'apex_curriculum' : 'selector');
    setQuestions([]);
    setAnswers({});
    setCurrentIndex(0);
  };

  // Record an answer selection
  const handleSelectOption = (qIdx, optIdx) => {
    setAnswers((prev) => ({
      ...prev,
      [qIdx]: optIdx,
    }));
  };

  // Move to next question
  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Calculate final score
  const calculateScore = useCallback(() => {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correct_index) {
        correctCount += 1;
      }
    });
    return correctCount;
  }, [questions, answers]);

  // Finish quiz & persist to Supabase + LocalStorage history + update streak
  const handleFinishQuiz = async () => {
    const finalScore = calculateScore();
    setQuizState('results');

    // Build complete attempt payload
    const fullQuestionsData = questions.map((q, idx) => ({
      ...q,
      user_selected_index: answers[idx],
    }));

    const attemptTopic = selectedSubtopic
      ? `Apex: ${selectedSubtopic}`
      : selectedTopic;

    const attemptPayload = {
      id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      created_at: new Date().toISOString(),
      topic: attemptTopic,
      difficulty: selectedDifficulty,
      score: finalScore,
      total_questions: questions.length,
      questions_data: fullQuestionsData,
    };

    // 1. Update In-Memory History & Streak Instantly
    setQuizHistory((prev) => [attemptPayload, ...prev]);

    // 2. Save to LocalStorage History (Instant offline persistence)
    try {
      const existingHistory = JSON.parse(localStorage.getItem(STORAGE_KEY_HISTORY) || '[]');
      const updatedHistory = [attemptPayload, ...existingHistory].slice(0, 100);
      localStorage.setItem(STORAGE_KEY_HISTORY, JSON.stringify(updatedHistory));
      // Remove in-flight quiz record
      localStorage.removeItem(STORAGE_KEY_ACTIVE);
      setSavedQuizState(null);
    } catch (e) {
      console.error('Failed writing local history:', e);
    }

    // 3. Save to Supabase Cloud
    const { error } = await saveQuizAttempt({
      topic: attemptTopic,
      difficulty: selectedDifficulty,
      score: finalScore,
      totalQuestions: questions.length,
      questionsData: fullQuestionsData,
    });

    if (!error) {
      setIsSavedToCloud(true);
    } else {
      setIsSavedToCloud(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* Header with Streak Flame */}
      <Header
        currentTopic={selectedSubtopic || selectedTopic}
        currentDifficulty={selectedDifficulty}
        isQuizActive={quizState === 'taking'}
        currentStreak={streakStats.currentStreak}
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'history' ? (
          <HistoryView
            onStartNewQuiz={() => {
              setActiveTab('quiz');
              setQuizState('selector');
            }}
          />
        ) : quizState === 'taking' ? (
          <QuizEngine
            questions={questions}
            currentIndex={currentIndex}
            answers={answers}
            onSelectOption={handleSelectOption}
            onNextQuestion={handleNextQuestion}
            onFinishQuiz={handleFinishQuiz}
            onExitQuiz={handleExitQuiz}
            topic={selectedSubtopic || selectedTopic}
            difficulty={selectedDifficulty}
          />
        ) : quizState === 'results' ? (
          <ResultsView
            score={calculateScore()}
            totalQuestions={questions.length}
            topic={selectedSubtopic || selectedTopic}
            difficulty={selectedDifficulty}
            questions={questions}
            answers={answers}
            currentStreak={streakStats.currentStreak}
            onRetake={() => {
              if (selectedSubtopic) {
                const secNum = parseInt(selectedSubtopic.match(/\d+/)?.[0] || '1', 10);
                handleStartSubtopicQuiz({ sectionNumber: secNum, title: selectedSubtopic, id: `section-${secNum}` }, selectedDifficulty);
              } else {
                handleStartQuiz();
              }
            }}
            onNewQuiz={() => {
              setQuizState(selectedSubtopic ? 'apex_curriculum' : 'selector');
              setQuestions([]);
              setAnswers({});
              setCurrentIndex(0);
            }}
            onGoToHistory={() => setActiveTab('history')}
            isSavedToCloud={isSavedToCloud}
          />
        ) : quizState === 'apex_curriculum' ? (
          <ApexCurriculumView
            onBack={() => setQuizState('selector')}
            onStartSubtopicQuiz={handleStartSubtopicQuiz}
            isLoading={isLoading}
            currentStreak={streakStats.currentStreak}
          />
        ) : (
          <TopicSelector
            selectedTopic={selectedTopic}
            setSelectedTopic={setSelectedTopic}
            selectedDifficulty={selectedDifficulty}
            setSelectedDifficulty={setSelectedDifficulty}
            onStartQuiz={handleStartQuiz}
            isLoading={isLoading}
            savedQuizState={savedQuizState}
            onResumeQuiz={handleResumeQuiz}
            onDiscardSavedQuiz={handleDiscardSavedQuiz}
            onOpenApexCurriculum={() => setQuizState('apex_curriculum')}
            quizHistory={quizHistory}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
        }}
        hasActiveQuiz={quizState === 'taking'}
      />
    </div>
  );
}
