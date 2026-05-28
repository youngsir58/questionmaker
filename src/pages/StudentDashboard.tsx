import React, { useState, useEffect } from 'react';
import { Calendar, Award, CheckCircle2, Play, AlertCircle, Sparkles, BookOpen, Clock, Heart } from 'lucide-react';
import type { TeacherScope, AnswerAttempt, ReviewReminder } from '../types';
import { storageService } from '../services/storageService';
import { reminderService } from '../services/reminderService';
import { dateUtils } from '../utils/dateUtils';

interface StudentDashboardProps {
  scopes: TeacherScope[];
  attempts: AnswerAttempt[];
  onStartTest: (scopeId: string, testType: 'daily' | 'weekly' | 'monthly') => void;
  onNavigate: (view: string) => void;
  refreshTrigger: number;
  onRefresh: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  scopes,
  attempts,
  onStartTest,
  onNavigate,
  refreshTrigger,
  onRefresh
}) => {
  const [reminders, setReminders] = useState<ReviewReminder[]>([]);
  const studentId = storageService.getActiveStudentId();

  useEffect(() => {
    const list = reminderService.checkDueReminders(studentId);
    setReminders(list);
  }, [studentId, refreshTrigger]);

  const handleReminderSolve = (id: string) => {
    reminderService.completeReminder(id);
    onRefresh();
    alert('👍 복습을 완료하였습니다! 기억 소환 완료!');
  };

  // 1. Filter tests: Daily, Weekly, Monthly available
  // Daily: scopes created today or not taken yet
  const getAvailableTests = () => {
    const daily: TeacherScope[] = [];
    const weekly: TeacherScope[] = [];
    const monthly: TeacherScope[] = [];

    // Find taken tests
    const takenDailyScopeIds = new Set(
      attempts.filter(a => a.studentId === studentId && a.testType === 'daily').map(a => {
        // Find matching scope by lesson topic
        const matchedScope = scopes.find(s => s.lessonTopic.includes(a.lessonTopic) || a.lessonTopic.includes(s.lessonTopic));
        return matchedScope?.id;
      }).filter(Boolean)
    );

    scopes.forEach(scope => {
      // If student hasn't taken it, it's available!
      if (!takenDailyScopeIds.has(scope.id)) {
        daily.push(scope);
      }
    });

    // Weekly check: if there are daily scopes this week and student hasn't taken the weekly bridge this week
    const thisWeekStr = new Date().toISOString().split('T')[0];
    const takenWeeklyThisWeek = attempts.some(
      a => a.studentId === studentId && a.testType === 'weekly' && dateUtils.isSameWeek(a.testDate, thisWeekStr)
    );
    const hasDailyScopesThisWeek = scopes.some(s => dateUtils.isSameWeek(s.testDate, thisWeekStr));
    
    if (hasDailyScopesThisWeek && !takenWeeklyThisWeek) {
      weekly.push({
        id: 'weekly_bridge',
        classId: 'class_a',
        grade: '고1 공통수학1',
        subject: '공통수학 1',
        unit: '다항식 & 함수 누적',
        lessonTopic: '주간 연결체크 (Weekly Bridge)',
        specificScope: '이번 주 누적 개념 결합 진단',
        keyConcepts: '이번 주 전체 개념',
        achievementStandard: '개념 간 수식적/기하학적 연결 고리 파악',
        keywords: '',
        commonMisconceptions: '',
        difficulty: 'medium',
        testDate: thisWeekStr,
        createdAt: new Date().toISOString()
      });
    }

    // Monthly check: if there are daily scopes this month and student hasn't taken the monthly mastery this month
    const takenMonthlyThisMonth = attempts.some(
      a => a.studentId === studentId && a.testType === 'monthly' && dateUtils.isSameMonth(a.testDate, thisWeekStr)
    );
    const hasDailyScopesThisMonth = scopes.some(s => dateUtils.isSameMonth(s.testDate, thisWeekStr));

    if (hasDailyScopesThisMonth && !takenMonthlyThisMonth) {
      monthly.push({
        id: 'monthly_mastery',
        classId: 'class_a',
        grade: '고1 공통수학1',
        subject: '공통수학 1',
        unit: '단원 누적 융합',
        lessonTopic: '월간 마스터체크 (Monthly Mastery)',
        specificScope: '이번 달 누적 개념 융합 진단',
        keyConcepts: '이번 달 전체 개념',
        achievementStandard: '개념의 단원 간 전이 및 고난도 기출 유형 추론',
        keywords: '',
        commonMisconceptions: '',
        difficulty: 'hard',
        testDate: thisWeekStr,
        createdAt: new Date().toISOString()
      });
    }

    return { daily, weekly, monthly };
  };

  const { daily, weekly, monthly } = getAvailableTests();

  // Badges lists
  const getBadges = () => {
    const studentAttempts = attempts.filter(a => a.studentId === studentId);
    
    const badgeList = [
      {
        id: 'badge_first',
        name: '첫걸음 (First Step)',
        description: '개념 진단 테스트를 1회 이상 완료하였습니다.',
        unlocked: studentAttempts.length > 0,
        icon: '🌱'
      },
      {
        id: 'badge_perfect',
        name: '수학 마스터 (Math Master)',
        description: '어떤 난이도의 개념 진단에서든 100점을 기록하였습니다.',
        unlocked: studentAttempts.some(a => a.score === 100),
        icon: '👑'
      },
      {
        id: 'badge_expert',
        name: '설명 왕 (King of Explanation)',
        description: '심화(Advanced) 레벨 문항에서 우수(상) 판정을 획득했습니다.',
        unlocked: studentAttempts.some(a => a.level === 'advanced' && a.evaluationLevel === 'high'),
        icon: '🗣️'
      },
      {
        id: 'badge_meta',
        name: '메타인지 최강자 (Metacognition Expert)',
        description: '미흡(하) 판정 후, 강화 학습 가이드를 통해 재도전하여 상/중을 획득했습니다.',
        unlocked: studentAttempts.some(a => a.attemptType === 'reinforcement' && (a.evaluationLevel === 'high' || a.evaluationLevel === 'medium')),
        icon: '🧠'
      }
    ];

    return badgeList;
  };

  const badges = getBadges();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-8 animate-slide-up">
      {/* Welcome Banner */}
      <div className="card-glass p-6 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border-indigo-200 dark:border-indigo-900/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-black text-[var(--text-title)] flex items-center gap-2">
            반가워요, 김철수 학생!
            <Sparkles size={20} className="text-indigo-500 animate-spin" />
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed">
            오늘 배운 수학 topic의 개념 설명을 도전해 보세요. 기계적 암기가 아닌 메타인지를 키우는 학습을 응원합니다.
          </p>
        </div>
        <button
          onClick={() => onNavigate('charts')}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-md transition-colors"
        >
          실시간 성취 그래프 보기
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Columns: Available Tests */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div>
            <h3 className="text-base font-extrabold text-[var(--text-title)] flex items-center gap-1.5 mb-4">
              <BookOpen size={18} className="text-indigo-500" />
              오늘 수행 가능한 개념 진단 (Active Tests)
            </h3>

            {daily.length === 0 && weekly.length === 0 && monthly.length === 0 ? (
              <div className="card-glass p-8 text-center text-xs text-[var(--text-muted)]">
                🎉 와우! 지정된 모든 개념체크를 완료했습니다. 훌륭해요! <br />
                교사 대시보드에서 새로운 범위를 지정하거나, 이력에서 과거 진단을 복습해 보세요.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {/* Daily Checks */}
                {daily.map(test => (
                  <div
                    key={test.id}
                    className="card-glass p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-blue-500 hover:shadow-md transition-shadow"
                  >
                    <div>
                      <span className="text-[10px] bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                        오늘의 개념체크 (Daily Check)
                      </span>
                      <h4 className="text-base font-extrabold text-[var(--text-title)] mt-1">{test.lessonTopic}</h4>
                      <p className="text-xs text-[var(--text-muted)] mt-1">범위: {test.specificScope}</p>
                    </div>
                    <button
                      onClick={() => onStartTest(test.id, 'daily')}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 self-start sm:self-center transition-colors"
                    >
                      <Play size={12} fill="white" />
                      진단 시작
                    </button>
                  </div>
                ))}

                {/* Weekly Bridges */}
                {weekly.map(test => (
                  <div
                    key={test.id}
                    className="card-glass p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-amber-500 hover:shadow-md transition-shadow"
                  >
                    <div>
                      <span className="text-[10px] bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                        주간 연결체크 (Weekly Bridge)
                      </span>
                      <h4 className="text-base font-extrabold text-[var(--text-title)] mt-1">{test.lessonTopic}</h4>
                      <p className="text-xs text-[var(--text-muted)] mt-1">설명: 이번 주 범위 누적 개념 결합 설명 진단</p>
                    </div>
                    <button
                      onClick={() => onStartTest('weekly_bridge', 'weekly')}
                      className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 self-start sm:self-center transition-colors"
                    >
                      <Play size={12} fill="white" />
                      진단 시작
                    </button>
                  </div>
                ))}

                {/* Monthly Mastery */}
                {monthly.map(test => (
                  <div
                    key={test.id}
                    className="card-glass p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-l-4 border-l-red-500 hover:shadow-md transition-shadow"
                  >
                    <div>
                      <span className="text-[10px] bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                        월간 마스터체크 (Monthly Mastery)
                      </span>
                      <h4 className="text-base font-extrabold text-[var(--text-title)] mt-1">{test.lessonTopic}</h4>
                      <p className="text-xs text-[var(--text-muted)] mt-1">설명: 이번 달 누적 개념 통합 및 고난도 문항 추론 진단</p>
                    </div>
                    <button
                      onClick={() => onStartTest('monthly_mastery', 'monthly')}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl flex items-center gap-1 self-start sm:self-center transition-colors"
                    >
                      <Play size={12} fill="white" />
                      진단 시작
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Columns: Reminders & Badges */}
        <div className="flex flex-col gap-6">
          {/* Review Reminders Box */}
          <div className="card-glass p-5 flex flex-col gap-3">
            <h3 className="text-sm font-extrabold text-[var(--text-title)] flex items-center gap-1.5 m-0">
              <Clock size={16} className="text-amber-500" />
              오늘의 에빙하우스 복습 알림
            </h3>
            
            {reminders.length === 0 ? (
              <p className="text-xs text-[var(--text-muted)] leading-relaxed text-center py-4">
                현재 밀린 복습 개념이 없습니다. <br />
                아주 훌륭한 장기기억 유지 상태입니다!
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {reminders.map(rem => (
                  <div
                    key={rem.id}
                    className="p-3 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 rounded-xl flex flex-col gap-2 relative overflow-hidden"
                  >
                    <span className="text-[10px] text-amber-700 dark:text-amber-300 font-bold flex items-center gap-1">
                      <AlertCircle size={12} />
                      수학 복습 이슈 발생
                    </span>
                    <p className="text-xs text-[var(--text-title)] font-semibold leading-relaxed m-0">{rem.message}</p>
                    <button
                      type="button"
                      onClick={() => handleReminderSolve(rem.id)}
                      className="mt-1 px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white text-[10px] font-bold rounded-lg self-end shadow-sm transition-colors"
                    >
                      복습 복구 완료
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Badge Grid Showcase */}
          <div className="card-glass p-5 flex flex-col gap-4">
            <h3 className="text-sm font-extrabold text-[var(--text-title)] flex items-center gap-1.5 m-0">
              <Award size={16} className="text-indigo-500" />
              획득 성취 배지 (Badge Showcase)
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {badges.map(badge => (
                <div
                  key={badge.id}
                  className={`p-3 border rounded-xl flex flex-col items-center justify-center text-center gap-1 transition-all relative group ${
                    badge.unlocked
                      ? 'bg-indigo-50/30 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900/50 shadow-sm'
                      : 'bg-slate-50/20 dark:bg-slate-800/10 border-[var(--border-color)] opacity-40'
                  }`}
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <span className="text-[10px] font-black text-[var(--text-title)] truncate max-w-full">{badge.name}</span>
                  
                  {/* Tooltip on Hover */}
                  <div className="absolute bottom-16 hidden group-hover:block bg-slate-900 text-white text-[9px] p-2 rounded w-44 z-50 shadow-xl border border-slate-700 text-center leading-relaxed">
                    <strong>{badge.name}</strong>
                    <p className="mt-1 mb-0">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
