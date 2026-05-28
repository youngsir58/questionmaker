import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, XCircle, ArrowRight, BookOpen, AlertTriangle, Lightbulb, RefreshCw, CalendarCheck, Mic, Square } from 'lucide-react';
import type { AnswerAttempt } from '../../types';
import { scoreUtils } from '../../utils/scoreUtils';

const MATH_SPEECH_CORRECTIONS: Record<string, string> = {
  '택지점': '꼭짓점',
  '꼭지점': '꼭짓점',
  '꼬짓점': '꼭짓점',
  '미분개수': '미분계수',
  '한별식': '판별식',
  '반별식': '판별식',
  '발별식': '판별식',
  '이양정리': '이항정리',
  '이앙정리': '이항정리',
  '촛점': '초점',
  '영행열': '영행렬',
  '여행렬': '영행렬',
  '행열': '행렬',
  '오도법': '호도법',
  '나디안': '라디안',
  '여캄수': '역함수',
  '우칸': '우극한',
  '좌칸': '좌극한',
  '대칭성': '대칭성',
};

const correctSpeechText = (text: string): string => {
  let corrected = text;
  Object.entries(MATH_SPEECH_CORRECTIONS).forEach(([wrong, right]) => {
    const regex = new RegExp(wrong, 'g');
    corrected = corrected.replace(regex, right);
  });
  return corrected;
};

interface FeedbackReportProps {
  attempt: AnswerAttempt;
  onRetrySubmit: (retryAnswerText: string, voiceUsed: boolean) => void;
  onNextQuestion: () => void; // Proceed to next question or level
  onFinishTest: () => void; // Finish the entire session
  isEvaluating: boolean;
}

export const FeedbackReport: React.FC<FeedbackReportProps> = ({
  attempt,
  onRetrySubmit,
  onNextQuestion,
  onFinishTest,
  isEvaluating
}) => {
  const [retryText, setRetryText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [voiceUsed, setVoiceUsed] = useState(false);
  const recognitionRef = React.useRef<any>(null);

  const unitParts = attempt.unit ? attempt.unit.split(' ➔ ') : [];
  const largeUnit = unitParts[0] || attempt.unit || '';
  const mediumUnit = unitParts[1] || '';

  // Initialize Speech for Retry
  React.useEffect(() => {
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
        const correctedTranscript = correctSpeechText(transcript);
        setRetryText(prev => prev + (prev ? ' ' : '') + correctedTranscript);
        setIsRecording(false);
      };

      rec.onerror = () => {
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
      alert('음성 인식을 지원하지 않는 브라우저입니다.');
    }
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleRetrySubmit = () => {
    if (!retryText.trim()) {
      alert('강화 답변을 작성해 주세요!');
      return;
    }
    onRetrySubmit(retryText, voiceUsed);
    setRetryText('');
    setVoiceUsed(false);
  };

  // Get criteria scores
  const crit = scoreUtils.calculateCriteriaScores(attempt.evaluationLevel, attempt.level, attempt.score);

  // Status mapping
  const getStatusDisplay = () => {
    switch (attempt.evaluationLevel) {
      case 'high':
        return {
          icon: <CheckCircle2 className="text-emerald-500 w-12 h-12" />,
          title: '우수 (상)',
          color: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'
        };
      case 'medium':
        return {
          icon: <CheckCircle2 className="text-amber-500 w-12 h-12" />,
          title: '보통 (중)',
          color: 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900/50'
        };
      case 'low':
        return {
          icon: <XCircle className="text-red-500 w-12 h-12" />,
          title: '미흡 (하)',
          color: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900/50'
        };
    }
  };

  const status = getStatusDisplay();

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col gap-6 animate-slide-up">
      {/* 1. Score and Summary Card */}
      <div className={`card-glass p-6 border-t-8 border-t-indigo-500 flex flex-col md:flex-row items-center justify-between gap-6`}>
        <div className="flex items-center gap-4">
          {status.icon}
          <div>
            <span className="text-xs text-[var(--text-muted)] font-bold">진단 채점 결과 리포트</span>
            <h2 className="text-2xl font-black text-[var(--text-title)] mt-0.5">{status.title} 판정</h2>

            <p className="text-xs text-[var(--text-muted)] mt-2 m-0">
              문항 난이도: <strong>{attempt.level === 'basic' ? '기본' : attempt.level === 'standard' ? '표준' : '심화'}</strong> | 유형: {attempt.attemptType === 'reinforcement' ? '개념 강화형' : '일반 진단형'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-center">
            <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider block">진단 점수</span>
            <span className="text-4xl font-black text-indigo-500 block mt-1">{attempt.score}점</span>
          </div>

          <div className="h-12 w-[1px] bg-[var(--border-color)]"></div>

          <div className="text-center">
            <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider block">단계 진행 여부</span>
            {attempt.canProceed ? (
              <span className="inline-block mt-2 bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-900/30">
                돌파 성공 (진입 가능)
              </span>
            ) : (
              <span className="inline-block mt-2 bg-red-100 text-red-800 dark:bg-red-950/40 dark:text-red-400 text-xs font-bold px-3 py-1 rounded-full border border-red-200 dark:border-red-900/30">
                진행 일시 정지
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Main Content Layout: Breakdown & Detailed feedback */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Breakdown details */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Detailed Criteria Scores Bar */}
          <div className="card-glass p-5 flex flex-col gap-4">
            <h3 className="text-xs font-extrabold text-[var(--text-title)] uppercase tracking-wider mb-1">세부 진단 기준별 획득 점수</h3>
            <div className="flex flex-col gap-3.5">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>개념 이해도 (Concept)</span>
                  <span className="font-bold">{crit.conceptScore} / 100</span>
                </div>
                <div className="w-full bg-[var(--bg-primary)] h-1.5 rounded-full overflow-hidden border border-[var(--border-color)]">
                  <div className="bg-emerald-500 h-full" style={{ width: `${crit.conceptScore}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>서술 및 논증력 (Explanation)</span>
                  <span className="font-bold">{crit.explanationScore} / 100</span>
                </div>
                <div className="w-full bg-[var(--bg-primary)] h-1.5 rounded-full overflow-hidden border border-[var(--border-color)]">
                  <div className="bg-blue-500 h-full" style={{ width: `${crit.explanationScore}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>실전 응용성 (Application)</span>
                  <span className="font-bold">{crit.applicationScore} / 100</span>
                </div>
                <div className="w-full bg-[var(--bg-primary)] h-1.5 rounded-full overflow-hidden border border-[var(--border-color)]">
                  <div className="bg-amber-500 h-full" style={{ width: `${crit.applicationScore}%` }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span>수학적 추론력 (Reasoning)</span>
                  <span className="font-bold">{crit.reasoningScore} / 100</span>
                </div>
                <div className="w-full bg-[var(--bg-primary)] h-1.5 rounded-full overflow-hidden border border-[var(--border-color)]">
                  <div className="bg-purple-500 h-full" style={{ width: `${crit.reasoningScore}%` }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* User Submitted Answer */}
          <div className="card-glass p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-extrabold text-[var(--text-title)] uppercase tracking-wider">내가 제출한 설명 답안</h3>
              {attempt.voiceTranscript && (
                <span className="bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400 px-2 py-0.5 rounded text-[10px] font-bold">
                  🎤 음성 입력 완료
                </span>
              )}
            </div>
            <div className="bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border-color)] text-sm leading-relaxed text-[var(--text-main)] italic whitespace-pre-wrap">
              "{attempt.answerText}"
            </div>
          </div>

          {/* Custom Evaluation Analysis */}
          <div className="card-glass p-5 flex flex-col gap-4">
            <h3 className="text-xs font-extrabold text-[var(--text-title)] uppercase tracking-wider">상세 정밀 진단 및 피드백</h3>
            
            <div className="flex flex-col gap-3">
              <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-[var(--border-color)]">
                <span className="text-xs font-extrabold text-[var(--text-title)] flex items-center gap-1.5">
                  <Lightbulb size={14} className="text-indigo-500" />
                  교사 조언 및 핵심 총평
                </span>
                <p className="text-xs text-[var(--text-main)] mt-2 leading-relaxed font-medium whitespace-pre-wrap">
                  {attempt.feedback}
                </p>
              </div>

              {attempt.missingConcepts.length > 0 && (
                <div className="border border-red-200 dark:border-red-950/40 bg-red-50/30 dark:bg-red-950/10 p-4 rounded-xl">
                  <span className="text-xs font-extrabold text-red-600 dark:text-red-400 flex items-center gap-1.5">
                    <XCircle size={14} />
                    보완해야 할 핵심 수학 개념
                  </span>
                  <ul className="list-disc pl-4 mt-2 text-xs text-[var(--text-main)] space-y-1">
                    {attempt.missingConcepts.map((c, i) => <li key={i} className="font-medium">{c}</li>)}
                  </ul>
                </div>
              )}

              {attempt.misconceptions.length > 0 && (
                <div className="border border-amber-200 dark:border-amber-950/40 bg-amber-50/30 dark:bg-amber-950/10 p-4 rounded-xl">
                  <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                    <AlertTriangle size={14} />
                    진단된 주요 수학 오개념 (Common Misconception)
                  </span>
                  <ul className="list-disc pl-4 mt-2 text-xs text-[var(--text-main)] space-y-1">
                    {attempt.misconceptions.map((m, i) => <li key={i} className="font-semibold text-amber-700 dark:text-amber-300">{m}</li>)}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Study Plan Card */}
        <div className="flex flex-col gap-4">
          <div className="card-glass p-5 border-l-4 border-emerald-500">
            <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 text-xs font-black">
              <BookOpen size={16} />
              추천 맞춤형 학습 플랜
            </span>
            <ul className="list-decimal pl-4 mt-3 text-xs text-[var(--text-main)] space-y-2 font-medium">
              {attempt.recommendedStudyPlan.length > 0 ? (
                attempt.recommendedStudyPlan.map((step, idx) => <li key={idx} className="leading-relaxed">{step}</li>)
              ) : (
                <>
                  <li className="leading-relaxed">해당 난이도의 수학 개념 유도 과정을 노트에 직접 3회 필사해 보세요.</li>
                  <li className="leading-relaxed">EBS나 교과서의 기본/표준 문제 중 판별식과 꼭짓점이 결합된 문항 5개를 선정해 개념 설명식 풀이를 적어보세요.</li>
                </>
              )}
            </ul>
          </div>

          <div className="card-glass p-5 border-l-4 border-indigo-500">
            <span className="text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 text-xs font-black">
              <CalendarCheck size={16} />
              에빙하우스 복습 주기 알림
            </span>
            <p className="text-xs text-[var(--text-main)] mt-2 leading-relaxed">
              망각 주기를 극복하기 위해 본 문항에 대한 개념 복습 알림이 <strong>2~3일 후에</strong> 대시보드 알림판에 등록됩니다.
            </p>
            <span className="text-[10px] text-[var(--text-muted)] mt-1.5 block">
              💡 알림판에 알림이 울리면 meme-like 카드를 클릭해 복습하세요!
            </span>
          </div>
        </div>
      </div>

      {/* 3. LOW LEVEL REINFORCEMENT RETRY SECTION */}
      {!attempt.canProceed && attempt.retryQuestion && (
        <div className="card-glass p-6 border-2 border-red-500 bg-red-50/10 dark:bg-red-950/10 flex flex-col gap-5 mt-4">
          <div className="flex items-center gap-2 border-b border-red-200 dark:border-red-900/50 pb-3">
            <RefreshCw className="text-red-500 animate-spin w-6 h-6" />
            <div>
              <h3 className="text-sm font-extrabold text-red-600 dark:text-red-400">
                🚨 개념 보완 및 강화 진단 (Reinforcement Retry Flow)
              </h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">
                현재 답변은 ‘하’로 평가되었어요. 다음 단계로 넘어가기 전에 이 개념을 다시 확인해 볼게요.
              </p>
            </div>
          </div>

          {/* Learning Guide Box */}
          {attempt.learningGuide && (
            <div className="bg-[var(--bg-card)] p-5 rounded-xl border border-[var(--border-color)] text-xs leading-relaxed text-[var(--text-main)] shadow-sm">
              <h4 className="font-extrabold text-[var(--text-title)] mb-2 flex items-center gap-1.5 text-indigo-500">
                <Lightbulb size={14} />
                💡 개념 극복 길잡이 (Quick Learning Guide)
              </h4>
              <div className="whitespace-pre-wrap font-medium">{attempt.learningGuide}</div>
            </div>
          )}

          {/* Reinforcement Question */}
          <div className="bg-[var(--bg-primary)] p-4 rounded-xl border border-[var(--border-color)]">
            <h4 className="text-xs font-extrabold text-[var(--text-title)] uppercase tracking-wider mb-1">개념 강화 문제</h4>
            <p className="text-sm text-[var(--text-title)] font-bold leading-relaxed whitespace-pre-wrap">{attempt.retryQuestion}</p>
          </div>

          {/* Text and Voice Inputs */}
          <div className="flex flex-col gap-2 relative">
            <textarea
              value={retryText}
              onChange={(e) => setRetryText(e.target.value)}
              placeholder="강화 가이드를 참고하여 수학적 개념 정의와 수식을 다시 정리해서 설명해 보세요."
              className="w-full h-32 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-main)] text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
            />
            {/* Voice input */}
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
              {isRecording ? '음성 입력 중지' : '음성 설명'}
            </button>
          </div>

          {/* Submit retry */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleRetrySubmit}
              disabled={isEvaluating}
              className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center gap-1.5"
            >
              {isEvaluating ? '채점 중...' : '강화 답안 제출'}
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* 4. Action Buttons block (Next Question or Done) */}
      {(attempt.canProceed || !attempt.retryQuestion) && (
        <div className="flex justify-end gap-3 mt-4 border-t border-[var(--border-color)] pt-4">
          <button
            type="button"
            onClick={onNextQuestion}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center gap-1.5"
          >
            다음 단계 진행
            <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
};
