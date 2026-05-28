import React from 'react';
import { Award, CheckCircle2, BookOpen, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import type { AnswerAttempt } from '../types';
import { storageService } from '../services/storageService';

interface ResultPageProps {
  lastAttemptId: string;
  onReturnToDashboard: () => void;
}

export const ResultPage: React.FC<ResultPageProps> = ({ lastAttemptId, onReturnToDashboard }) => {
  // Let's retrieve attempts from the same test session
  // Since all attempts in a test session share the same studentId, testDate, and testType:
  const allAttempts = storageService.getAttempts();
  const lastAttempt = allAttempts.find(a => a.id === lastAttemptId);
  
  if (!lastAttempt) {
    return (
      <div className="flex-grow flex items-center justify-center p-8">
        <div className="text-center text-xs text-[var(--text-muted)]">
          진단 데이터를 찾을 수 없습니다.
        </div>
      </div>
    );
  }

  // Filter attempts belonging to this specific test session
  const sessionAttempts = allAttempts.filter(
    a => a.studentId === lastAttempt.studentId && 
         a.testDate === lastAttempt.testDate && 
         a.testType === lastAttempt.testType
  );

  // Group by question level to display final states (excluding duplicate retries - keep latest attempt for each level)
  const levelAttemptsMap: Record<string, AnswerAttempt> = {};
  sessionAttempts.forEach(a => {
    const key = `${a.level}_${a.attemptType}`;
    const existing = levelAttemptsMap[key];
    if (!existing || new Date(a.createdAt) > new Date(existing.createdAt)) {
      levelAttemptsMap[key] = a;
    }
  });

  const finalAttemptsList = Object.values(levelAttemptsMap).sort((a, b) => {
    const levelsOrder = { basic: 1, standard: 2, advanced: 3 };
    return levelsOrder[a.level] - levelsOrder[b.level];
  });

  // Calculate session average
  const avgScore = Math.round(
    finalAttemptsList.reduce((sum, a) => sum + a.score, 0) / (finalAttemptsList.length || 1)
  );

  // Determine highest completed level
  let highestLevel = '기본 (Basic)';
  const passedLevels = finalAttemptsList
    .filter(a => a.evaluationLevel === 'high' || a.evaluationLevel === 'medium')
    .map(a => a.level);

  if (passedLevels.includes('advanced')) {
    highestLevel = '심화 (Advanced)';
  } else if (passedLevels.includes('standard')) {
    highestLevel = '표준 (Standard)';
  }

  // Gather all study recommendations
  const allRecommendations = Array.from(
    new Set(finalAttemptsList.flatMap(a => a.recommendedStudyPlan))
  ).filter(Boolean);

  const getEvaluationBadgeColor = (lvl: string) => {
    switch (lvl) {
      case 'high': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400';
      case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400';
      case 'low': return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 flex flex-col gap-8 animate-slide-up">
      {/* Main congrats card */}
      <div className="card-glass p-8 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-indigo-500/10 border-indigo-200 dark:border-indigo-900/40 text-center flex flex-col items-center gap-4">
        <div className="p-4 bg-indigo-500 text-white rounded-full shadow-lg shadow-indigo-200 dark:shadow-none animate-pulse">
          <Award size={48} />
        </div>
        <h2 className="text-2xl font-black text-[var(--text-title)] m-0">수학 개념 진단 학습 완료!</h2>
        <p className="text-xs text-[var(--text-muted)] max-w-lg leading-relaxed">
          오늘의 학습 범위 문제들의 핵심 개념을 직접 인출하는 진단을 마치셨습니다. 
          채점된 평가 등급을 확인하고 복습 루틴에 돌입해 장기기억으로 고착시키세요.
        </p>

        {/* Aggregate Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-md border-t border-[var(--border-color)] pt-6 mt-2">
          <div className="text-center">
            <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider block">종합 평균 점수</span>
            <span className="text-3xl font-black text-indigo-500 block mt-1">{avgScore}점</span>
          </div>

          <div className="text-center border-x border-[var(--border-color)]">
            <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider block">최종 돌파 단계</span>
            <span className="text-sm font-black text-[var(--text-title)] block mt-2">{highestLevel}</span>
          </div>

          <div className="text-center col-span-2 md:col-span-1">
            <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider block">수행 문항 개수</span>
            <span className="text-3xl font-black text-emerald-500 block mt-1">{finalAttemptsList.length}문항</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Side: Question Log Cards */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <h3 className="text-sm font-extrabold text-[var(--text-title)] uppercase tracking-wider m-0">각 문항별 평가 결과 이력</h3>
          
          <div className="flex flex-col gap-4">
            {finalAttemptsList.map((att, idx) => (
              <div
                key={att.id}
                className="card-glass p-5 flex flex-col gap-3 hover:border-indigo-300 transition-colors"
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 bg-indigo-500 text-white rounded-full flex items-center justify-center text-[10px] font-black">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-black text-[var(--text-title)] uppercase tracking-wider">
                      {att.level === 'basic' ? '기본' : att.level === 'standard' ? '표준' : '심화'} 단계 진단
                    </span>
                    {att.attemptType === 'reinforcement' && (
                      <span className="bg-red-50 text-red-500 dark:bg-red-950/40 text-[9px] font-bold px-1.5 py-0.5 rounded border border-red-100 dark:border-red-900/30">
                        개념 강화 문항
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getEvaluationBadgeColor(att.evaluationLevel)}`}>
                      {att.evaluationLevel === 'high' ? '상' : att.evaluationLevel === 'medium' ? '중' : '하'}
                    </span>
                    <span className="text-sm font-black text-indigo-500">{att.score}점</span>
                  </div>
                </div>

                <p className="text-xs font-bold text-[var(--text-title)] bg-[var(--bg-primary)] p-3 rounded-lg border border-[var(--border-color)] leading-relaxed m-0">
                  {att.questionText}
                </p>

                <div className="text-xs text-[var(--text-main)] italic pl-2 border-l-2 border-[var(--border-color)]">
                  "{att.answerText}"
                </div>

                <div className="text-[10px] bg-slate-50 dark:bg-slate-800/40 p-2.5 rounded border border-[var(--border-color)] text-[var(--text-main)] leading-relaxed">
                  💡 <strong>평가 피드백:</strong> {att.feedback}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Overall Study Recommendations */}
        <div className="flex flex-col gap-6">
          {/* Study Plan recommendations */}
          <div className="card-glass p-5 border-l-4 border-l-emerald-500 flex flex-col gap-3">
            <h3 className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5 m-0">
              <BookOpen size={16} />
              이번 단원 추천 학습 계획
            </h3>
            
            {allRecommendations.length === 0 ? (
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold leading-relaxed m-0">
                🎉 모든 진단을 완벽히 통과하였습니다! 별도의 기초 보완 플랜 없이 다음 단원으로 바로 진급해도 좋은 우수한 상태입니다.
              </p>
            ) : (
              <ul className="list-disc pl-4 text-xs text-[var(--text-main)] space-y-2 font-medium leading-relaxed">
                {allRecommendations.map((rec, i) => <li key={i}>{rec}</li>)}
              </ul>
            )}
          </div>

          {/* Ebbinghaus alarm banner */}
          <div className="card-glass p-5 border-l-4 border-l-amber-500 flex flex-col gap-2">
            <h3 className="text-xs font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5 m-0">
              <Clock size={16} />
              에빙하우스 2-3일 복습
            </h3>
            <p className="text-xs text-[var(--text-main)] leading-relaxed">
              인출된 개념의 뇌 연결을 고착화하기 위해 <strong>2일 후</strong>에 대시보드 알림판에 개념 요약 복습 meme-like 카드가 활성화됩니다.
            </p>
            <span className="text-[10px] text-[var(--text-muted)] font-medium leading-relaxed mt-1 block">
              ⚠️ 알림판 알람을 무시하지 않고 클릭하여 내용을 회수하세요!
            </span>
          </div>

          {/* Navigation Button */}
          <button
            onClick={onReturnToDashboard}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg transition-colors flex items-center justify-center gap-1.5"
          >
            학습 홈으로 돌아가기
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
