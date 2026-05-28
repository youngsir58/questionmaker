import React, { useState } from 'react';
import { TrendingUp, BarChart2, BookOpen, AlertTriangle, ArrowRight, Zap, Target } from 'lucide-react';
import type { AchievementRecord, AnswerAttempt, Class, Student } from '../types';
import { storageService } from '../services/storageService';
import { graphUtils } from '../utils/graphUtils';
import { DashboardCharts } from '../components/charts/DashboardCharts';

interface AchievementDashboardProps {
  attempts: AnswerAttempt[];
  classes: Class[];
  students: Student[];
  activeRole: 'teacher' | 'student';
}

export const AchievementDashboard: React.FC<AchievementDashboardProps> = ({
  attempts,
  classes,
  students,
  activeRole
}) => {
  const activeStudentId = storageService.getActiveStudentId();
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('weekly');
  const [selectedStudentId, setSelectedStudentId] = useState(activeStudentId);

  // If teacher role, let them select which student's dashboard to view
  const currentStudentId = activeRole === 'student' ? activeStudentId : selectedStudentId;

  // Retrieve attempts for the selected student
  const studentAttempts = attempts.filter(a => a.studentId === currentStudentId);

  // Compile attempts to achievement records
  const allScopes = storageService.getScopes();
  const records = graphUtils.compileAchievementRecords(studentAttempts, allScopes);

  // Filter records based on selected timeframe
  const filteredRecords = records.filter(r => {
    if (timeframe === 'daily') {
      return r.testType === 'daily';
    } else if (timeframe === 'weekly') {
      return r.testType === 'daily' || r.testType === 'weekly';
    } else if (timeframe === 'monthly') {
      return true; // All tests
    } else {
      // Yearly: show long-term
      return true;
    }
  });

  // Calculate stats for growth summary
  const getGrowthSummary = () => {
    if (filteredRecords.length === 0) {
      return {
        trend: '진단 데이터 부족',
        color: 'text-[var(--text-muted)]',
        advice: '학습 홈에서 오늘의 개념체크를 완료해 주시면 정밀 메타인지 피드백이 가동됩니다.'
      };
    }

    const firstScore = filteredRecords[0].totalScore;
    const lastScore = filteredRecords[filteredRecords.length - 1].totalScore;
    const diff = lastScore - firstScore;

    const weakConcepts = Array.from(new Set(filteredRecords.flatMap(r => r.missingConcepts))).filter(Boolean);
    const weakListStr = weakConcepts.length > 0 ? `보완이 긴급한 개념은 [${weakConcepts.slice(0, 2).join(', ')}] 입니다.` : '';

    if (diff > 5) {
      return {
        trend: `성취도 ${diff}점 상승세! (우수 성장군)`,
        color: 'text-emerald-500',
        advice: `최근 학습 이력 대조 결과 개념 인출 정확도가 상승하고 있습니다. ${weakListStr} 해당 부분을 노트 필사법으로 다듬으면 심화(Advanced) 단계를 완전히 지배할 수 있습니다.`
      };
    } else if (diff < -5) {
      return {
        trend: `성취도 ${Math.abs(diff)}점 하락세 (개념 재복습 긴급)`,
        color: 'text-red-500',
        advice: `꼭짓점이나 대칭축 부호 관련 단순 연산 오개념이 최근 문항에서 여러 차례 노출되었습니다. ${weakListStr} 2일 후 울릴 에빙하우스 복습 알림 카드를 반드시 확인하여 기본 개념을 백지에 서술하는 백지 복습을 실행해 보세요.`
      };
    } else {
      return {
        trend: '성취 안정세 유지 중 (보통 성장군)',
        color: 'text-indigo-500',
        advice: `평균 점수가 고르게 유지되고 있습니다. ${weakListStr} 개념을 아는 것과 설명하는 것의 일치를 위해 음성 설명 진단 횟수를 조금 더 늘려 메타인지를 완성해 보세요.`
      };
    }
  };

  const summary = getGrowthSummary();

  // Find student name
  const currentStudent = students.find(s => s.id === currentStudentId);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6 animate-slide-up">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[var(--text-title)] flex items-center gap-2">
            <BarChart2 className="text-indigo-500" size={24} />
            {activeRole === 'student' ? '내 수학 성취도 대시보드' : '학생 성취 종합 관리 분석기'}
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            {activeRole === 'student'
              ? '일일, 주간, 월간 진단 결과를 다각도로 시각화하여 개념 인출 취약점을 진단합니다.'
              : '학급 내 지정한 학생의 실시간 개념 인출 추이 및 오개념 분포를 점검합니다.'}
          </p>
        </div>

        {/* Timeframe Select toggles */}
        <div className="flex bg-[var(--bg-primary)] p-1 rounded-lg border border-[var(--border-color)] self-start sm:self-center">
          {(['daily', 'weekly', 'monthly', 'yearly'] as const).map(tf => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${
                timeframe === tf
                  ? 'bg-[var(--bg-card)] text-indigo-600 dark:text-indigo-400 shadow-sm border border-[var(--border-color)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              {tf === 'daily' ? '일간' : tf === 'weekly' ? '주간' : tf === 'monthly' ? '월간' : '연간'}
            </button>
          ))}
        </div>
      </div>

      {/* Teacher student selector dropdown */}
      {activeRole === 'teacher' && (
        <div className="card-glass p-4 flex items-center justify-between gap-4">
          <span className="text-xs font-bold text-[var(--text-title)] flex items-center gap-2">
            <Target size={16} className="text-indigo-500" />
            성취 그래프를 분석할 학생을 지정하세요:
          </span>
          <select
            value={selectedStudentId}
            onChange={(e) => setSelectedStudentId(e.target.value)}
            className="p-2 border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-title)] font-bold rounded-lg focus:outline-none"
          >
            {students.map(s => (
              <option key={s.id} value={s.id}>{s.name} ({s.id === 'std_chulsoo' ? '대표통계보유' : '기본 roster'})</option>
            ))}
          </select>
        </div>
      )}

      {/* 1. Growth Summary Banner Card */}
      <div className="card-glass p-6 border-l-8 border-l-indigo-500 bg-indigo-50/10 dark:bg-indigo-950/10 flex flex-col gap-3">
        <h3 className="text-xs font-extrabold text-[var(--text-title)] uppercase tracking-wider flex items-center gap-1.5 m-0">
          <Zap size={14} className="text-amber-500 animate-bounce" />
          {currentStudent?.name || '김철수'} 학생 종합 성장 분석 리포트 (Growth Analysis Summary)
        </h3>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[var(--border-color)] pt-3 mt-1">
          <div>
            <span className={`text-base font-black ${summary.color}`}>
              성장 트렌드: {summary.trend}
            </span>
            <p className="text-xs text-[var(--text-main)] leading-relaxed mt-2 font-medium">
              {summary.advice}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Recharts Dashboard charts visualization */}
      <DashboardCharts records={filteredRecords} />

      {/* 3. Detailed weakness listing table */}
      <div className="card-glass p-6">
        <h3 className="text-sm font-extrabold text-[var(--text-title)] uppercase tracking-wider mb-4 flex items-center gap-2">
          <AlertTriangle className="text-red-500" size={16} />
          진단 이력 상의 주요 오개념 & 취약 용어 목록 (Diagnosed Mistakes)
        </h3>

        {filteredRecords.flatMap(r => r.misconceptions).length === 0 ? (
          <p className="text-center text-xs text-[var(--text-muted)] py-6">
            현재 캡처된 중대 수학적 오개념이 없습니다. 아주 깔끔한 학습 상태입니다!
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border-color)] text-[var(--text-muted)] font-extrabold uppercase">
                  <th className="py-2.5 px-3">발생 단원 (Topic)</th>
                  <th className="py-2.5 px-3">검출된 오개념 설명 (Misconceptions)</th>
                  <th className="py-2.5 px-3 text-right">점검 일시</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-main)]">
                {filteredRecords.map((r) => {
                  if (r.misconceptions.length === 0) return null;
                  return (
                    <tr key={r.id} className="hover:bg-[var(--bg-primary)] transition-colors font-medium">
                      <td className="py-3 px-3 font-semibold text-[var(--text-title)]">{r.topic.split('(')[0]}</td>
                      <td className="py-3 px-3 text-red-600 dark:text-red-400 font-semibold">{r.misconceptions.join(', ')}</td>
                      <td className="py-3 px-3 text-right text-[10px] text-[var(--text-muted)]">{r.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
