import React, { useState, useEffect, useRef } from 'react';
import { Play, Square, Mic, AlertTriangle, ArrowRight, HelpCircle, Hourglass, HelpCircle as HelpIcon } from 'lucide-react';
import type { Question, QuestionLevel, TestType } from '../../types';

interface TestInterfaceProps {
  testType: TestType;
  topic: string;
  scopeText: string;
  achievementStandard: string;
  currentQuestionIndex: number; // 0 to 2
  totalQuestions: number; // 3
  currentLevel: QuestionLevel; // 'basic' | 'standard' | 'advanced'
  questionText: string;
  onSubmitAnswer: (answerText: string, voiceUsed: boolean) => void;
  onQuit: () => void;
}

export const TestInterface: React.FC<TestInterfaceProps> = ({
  testType,
  topic,
  scopeText,
  achievementStandard,
  currentQuestionIndex,
  totalQuestions,
  currentLevel,
  questionText,
  onSubmitAnswer,
  onQuit
}) => {
  const [answer, setAnswer] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [voiceUsed, setVoiceUsed] = useState(false);
  const [timer, setTimer] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  // 1. Timer countdown/up
  useEffect(() => {
    setTimer(0);
    timerRef.current = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentQuestionIndex, currentLevel]);

  // 2. Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.lang = 'ko-KR';
      rec.interimResults = false;

      rec.onstart = () => {
        setIsRecording(true);
        setVoiceUsed(true);
      };

      rec.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setAnswer(prev => prev + (prev ? ' ' : '') + transcript);
        setIsRecording(false);
      };

      rec.onerror = (event: any) => {
        console.error('Speech recognition error', event);
        setIsRecording(false);
      };

      rec.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = rec;
    }
  }, []);

  const startSpeechRecognition = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error(e);
      }
    } else {
      alert('이 브라우저는 음성 인식을 지원하지 않습니다. 크롬 브라우저 등을 권장합니다.');
    }
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handlePreSubmit = () => {
    if (!answer.trim()) {
      alert('답변을 작성해 주세요!');
      return;
    }
    setShowConfirmModal(true);
  };

  const handleFinalSubmit = () => {
    setShowConfirmModal(false);
    onSubmitAnswer(answer, voiceUsed);
    setAnswer('');
    setVoiceUsed(false);
  };

  // Format timer
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Level badge details
  const getLevelBadge = (lvl: QuestionLevel) => {
    switch (lvl) {
      case 'basic':
        return <span className="bg-blue-100 text-blue-700 dark:bg-blue-950/40 dark:text-blue-400 px-3 py-1 rounded-full text-xs font-bold">기본 (Basic)</span>;
      case 'standard':
        return <span className="bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400 px-3 py-1 rounded-full text-xs font-bold">표준 (Standard)</span>;
      case 'advanced':
        return <span className="bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400 px-3 py-1 rounded-full text-xs font-bold">심화 (Advanced)</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6 animate-wave">
      {/* Scope Header */}
      <div className="card-glass p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[var(--text-muted)] text-xs font-semibold uppercase tracking-wider block">
            {testType === 'daily' ? '오늘의 개념체크 (Daily Check)' : testType === 'weekly' ? '주간 연결체크 (Weekly Bridge)' : '월간 마스터체크 (Monthly Mastery)'}
          </span>
          <h2 className="text-lg font-extrabold text-[var(--text-title)] block mt-1 leading-snug">{topic}</h2>
          <span className="text-xs text-[var(--text-muted)] mt-1.5 block leading-relaxed max-w-2xl bg-[var(--bg-primary)] p-2 rounded-lg border border-[var(--border-color)]">
            🎯 <strong>성취 기준:</strong> {achievementStandard}
          </span>
        </div>
        <div className="flex items-center gap-2 bg-[var(--bg-primary)] border border-[var(--border-color)] px-4 py-2.5 rounded-xl self-start md:self-center">
          <Hourglass size={16} className="text-indigo-500 animate-pulse" />
          <span className="text-sm font-black text-[var(--text-title)] font-mono">{formatTime(timer)}</span>
        </div>
      </div>

      {/* Progress & Rule Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progress Grid */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="card-glass p-6 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[var(--text-muted)] font-bold">
                문항 {currentQuestionIndex + 1} / {totalQuestions}
              </span>
              {getLevelBadge(currentLevel)}
            </div>

            {/* Micro Progress Bar */}
            <div className="w-full bg-[var(--bg-primary)] h-2 rounded-full overflow-hidden border border-[var(--border-color)]">
              <div 
                className="bg-indigo-500 h-full transition-all duration-500" 
                style={{ width: `${((currentQuestionIndex) / totalQuestions + (currentLevel === 'basic' ? 0.1 : currentLevel === 'standard' ? 0.2 : 0.3)) * 100}%` }}
              ></div>
            </div>

            {/* Question Text Box */}
            <div className="bg-[var(--bg-primary)] p-5 rounded-2xl border border-[var(--border-color)]">
              <h3 className="text-base font-extrabold text-[var(--text-title)] flex items-start gap-2 leading-relaxed">
                <span className="w-6 h-6 shrink-0 bg-indigo-500 text-white rounded-full flex items-center justify-center text-xs font-black">Q</span>
                {questionText}
              </h3>
            </div>

            {/* Audio waveform / voice transcription helper */}
            {isRecording && (
              <div className="flex flex-col items-center justify-center py-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/30 rounded-xl gap-2">
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-bold flex items-center gap-1.5">
                  <Mic size={14} className="animate-bounce" />
                  실시간 음성을 텍스트로 받아 적는 중입니다...
                </span>
                {/* Custom animated waves */}
                <div className="flex gap-1 items-end h-8">
                  <div className="w-1 bg-indigo-500 rounded animate-wave h-full" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 bg-indigo-500 rounded animate-wave h-full" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-1 bg-indigo-500 rounded animate-wave h-full" style={{ animationDelay: '0.5s' }}></div>
                  <div className="w-1 bg-indigo-500 rounded animate-wave h-full" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 bg-indigo-500 rounded animate-wave h-full" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}

            {/* Student Response Inputs */}
            <div className="flex flex-col gap-2">
              <div className="relative">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="위의 수학 개념 질문에 대해 상세히 소리 내어 말하듯이 텍스트로 설명해 주세요. (수식이나 정의가 포함되면 훨씬 좋습니다.)"
                  className="w-full h-44 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                />
                
                {/* Voice button positioned on top of textarea */}
                <button
                  type="button"
                  onClick={isRecording ? stopSpeechRecognition : startSpeechRecognition}
                  className={`absolute bottom-3 right-3 p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all shadow-sm ${
                    isRecording
                      ? 'bg-red-500 border-red-500 text-white animate-pulse'
                      : 'bg-[var(--bg-primary)] border-[var(--border-color)] text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20'
                  }`}
                >
                  {isRecording ? <Square size={14} /> : <Mic size={14} />}
                  {isRecording ? '음성 녹음 중지' : '음성 설명 입력'}
                </button>
              </div>
            </div>

            {/* Submit Block */}
            <div className="flex justify-between items-center gap-4 mt-2">
              <button
                type="button"
                onClick={onQuit}
                className="px-4 py-2 border border-[var(--border-color)] rounded-xl text-xs font-bold text-[var(--text-muted)] hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-colors"
              >
                진단 그만두기
              </button>
              <button
                type="button"
                onClick={handlePreSubmit}
                className="px-6 py-2.5 bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 dark:shadow-none font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
              >
                진단 답안 제출
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic side warnings & progression tips */}
        <div className="flex flex-col gap-4">
          <div className="card-glass p-5 border-l-4 border-amber-500">
            <span className="text-amber-600 dark:text-amber-400 flex items-center gap-1.5 text-xs font-black">
              <AlertTriangle size={16} />
              제출 전 필수 유의 사항
            </span>
            <p className="text-xs text-[var(--text-main)] mt-2 leading-relaxed font-medium">
              “답변 기회는 한 번뿐이에요. 제출 후에는 수정할 수 없어요.”
            </p>
            <p className="text-[10px] text-[var(--text-muted)] mt-1 leading-relaxed">
              본 웹 진단은 기계식 오지선다가 아닌, 메타인지 인출식 평가입니다. 교과서에 쓰인 핵심 원리를 떠올리며 직접 서술하는 것이 좋습니다.
            </p>
          </div>

          <div className="card-glass p-5 border-l-4 border-indigo-500">
            <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 text-xs font-black">
              <HelpIcon size={16} />
              단계 돌파 (Progression) 규칙
            </span>
            <p className="text-xs text-[var(--text-main)] mt-2 leading-relaxed font-medium">
              “상 또는 중이면 다음 단계로 넘어가고, 하이면 개념을 다시 확인해요.”
            </p>
            <p className="text-[10px] text-[var(--text-muted)] mt-1 leading-relaxed">
              기본(Basic) 문항을 성공해야 표준(Standard)으로 진입합니다. 만약 '하' 판정을 받으면 즉각 강화 가이드와 연계 문제가 출제됩니다.
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="card-glass p-6 max-w-md w-full bg-[var(--bg-card)] flex flex-col gap-4 text-center">
            <div className="p-3 bg-amber-50 dark:bg-amber-950/20 text-amber-500 rounded-full w-fit mx-auto">
              <AlertTriangle size={32} />
            </div>
            <h3 className="text-base font-extrabold text-[var(--text-title)]">정말 답안을 제출하시겠습니까?</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              제출하신 후에는 채점이 진행되며, 동일 문항에 대한 수정이나 취소는 절대 불가능합니다.
            </p>
            <div className="flex gap-2 justify-center mt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 border border-[var(--border-color)] rounded-lg text-xs font-bold text-[var(--text-main)] hover:bg-[var(--bg-primary)] transition-colors"
              >
                돌아가서 수정하기
              </button>
              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-100 dark:shadow-none"
              >
                네, 제출할게요
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
