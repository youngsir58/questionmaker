import React, { useState, useEffect } from 'react';
import { Users, PlusCircle, UserCheck, ChevronRight } from 'lucide-react';
import type { Class, Student, TeacherScope, AnswerAttempt } from '../types';
import { questionService } from '../services/questionService';
import { DashboardCharts } from '../components/charts/DashboardCharts';
import { scoreUtils } from '../utils/scoreUtils';
import { graphUtils } from '../utils/graphUtils';

interface TeacherDashboardProps {
  classes: Class[];
  students: Student[];
  scopes: TeacherScope[];
  attempts: AnswerAttempt[];
  onNavigate: (view: string) => void;
  onSelectScopeForEdit: (scopeId: string) => void;
  onRefresh: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({
  classes,
  students,
  scopes,
  attempts,
  onNavigate,
  onSelectScopeForEdit
}) => {
  const [selectedClassId, setSelectedClassId] = useState('class_a');
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [weeklyPreview, setWeeklyPreview] = useState<any | null>(null);
  const [monthlyPreview, setMonthlyPreview] = useState<any | null>(null);

  const activeClass = classes.find(c => c.id === selectedClassId);
  const classStudents = students.filter(s => s.classId === selectedClassId);
  const classScopes = scopes.filter(s => s.classId === selectedClassId);

  // Compile mock weekly/monthly questions from active daily scopes
  useEffect(() => {
    if (classScopes.length > 0) {
      setWeeklyPreview(questionService.getWeeklyQuestions(classScopes));
      setMonthlyPreview(questionService.getMonthlyQuestions(classScopes));
    } else {
      setWeeklyPreview(null);
      setMonthlyPreview(null);
    }
  }, [selectedClassId, scopes]);

  // Individual student data
  const handleStudentSelect = (studentId: string) => {
    setSelectedStudentId(studentId);
  };

  const selectedStudent = students.find(s => s.id === selectedStudentId);
  const studentAttempts = attempts.filter(a => a.studentId === selectedStudentId);

  // Compute student stats
  const studentStats = () => {
    if (studentAttempts.length === 0) return { avgScore: 0, testCount: 0, highCount: 0 };
    const avgScore = Math.round(studentAttempts.reduce((sum, a) => sum + a.score, 0) / studentAttempts.length);
    const testCount = Array.from(new Set(studentAttempts.map(a => a.testDate))).length;
    const highCount = studentAttempts.filter(a => a.evaluationLevel === 'high').length;
    return { avgScore, testCount, highCount };
  };

  const stats = studentStats();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-8 animate-slide-up">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[var(--text-title)]">👩‍🏫 교원 관리 대시보드 (Teacher Control Panel)</h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">학급별 학생들의 메타인지 개념 설명 진단 내역 및 성취 통계를 파악하세요.</p>
        </div>
        <button
          onClick={() => onNavigate('create-scope')}
          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-100 dark:shadow-none flex items-center gap-1.5 self-start sm:self-center transition-colors"
        >
          <PlusCircle size={16} />
          새 일일 개념체크 출제
        </button>
      </div>

      {/* Roster & Classes layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Side: Classes & Rosters */}
        <div className="flex flex-col gap-6">
          {/* Class Select Card */}
          <div className="card-glass p-5 flex flex-col gap-3">
            <h3 className="text-xs font-extrabold text-[var(--text-title)] uppercase tracking-wider">담당 학급 선택</h3>
            <select
              value={selectedClassId}
              onChange={(e) => {
                setSelectedClassId(e.target.value);
                setSelectedStudentId(null);
              }}
              className="w-full p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-sm font-semibold text-[var(--text-title)] focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {classes.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Student Rosters List */}
          <div className="card-glass p-5 flex flex-col gap-3">
            <h3 className="text-xs font-extrabold text-[var(--text-title)] uppercase tracking-wider flex items-center justify-between">
              학급 학생 목록 ({classStudents.length}명)
            </h3>
            <div className="flex flex-col gap-1 max-h-80 overflow-y-auto">
              {classStudents.map(student => {
                const isSelected = selectedStudentId === student.id;
                const studAttempts = attempts.filter(a => a.studentId === student.id);
                const avg = studAttempts.length > 0
                  ? Math.round(studAttempts.reduce((sum, a) => sum + a.score, 0) / studAttempts.length)
                  : 0;

                return (
                  <button
                    key={student.id}
                    onClick={() => handleStudentSelect(student.id)}
                    className={`p-3 rounded-xl border text-left text-xs font-bold transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                        : 'bg-[var(--bg-card)] text-[var(--text-title)] border-[var(--border-color)] hover:bg-[var(--bg-primary)]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <UserCheck size={14} />
                      {student.name}
                    </span>
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-md ${
                      isSelected 
                        ? 'bg-indigo-600 text-indigo-100' 
                        : 'bg-indigo-50 dark:bg-indigo-950 text-indigo-500 dark:text-indigo-400'
                    }`}>
                      평균 {avg}점
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Dynamic Main Content (Inspection or Class overview) */}
        <div className="lg:col-span-3 flex flex-col gap-6">
          {selectedStudentId && selectedStudent ? (
            /* INDIVIDUAL STUDENT INSPECTION MODE */
            <div className="flex flex-col gap-6 animate-slide-up">
              {/* Student header card */}
              <div className="card-glass p-6 border-l-8 border-indigo-500 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    개별 학습 진단 리포트 (Student Diagnosis Profile)
                  </span>
                  <h3 className="text-xl font-black text-[var(--text-title)] mt-1.5">{selectedStudent.name} 학생 프로필</h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1">소속: {activeClass?.name} | 진단 응시 횟수: {stats.testCount}회</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <span className="text-[9px] text-[var(--text-muted)] font-bold">평균 점수</span>
                    <span className="text-2xl font-black text-indigo-500 block mt-0.5">{stats.avgScore}점</span>
                  </div>
                  <div className="text-center">
                    <span className="text-[9px] text-[var(--text-muted)] font-bold">우수 판정(상)</span>
                    <span className="text-2xl font-black text-emerald-500 block mt-0.5">{stats.highCount}회</span>
                  </div>
                  <button
                    onClick={() => setSelectedStudentId(null)}
                    className="text-xs font-bold text-red-500 border border-red-200 dark:border-red-950 px-3 py-1 rounded-lg hover:bg-red-50 transition-colors self-center"
                  >
                    프로필 닫기
                  </button>
                </div>
              </div>

              {/* Student charts */}
              <div>
                <h4 className="text-xs font-extrabold text-[var(--text-title)] uppercase tracking-wider mb-3">개별 성취 지표 통계</h4>
                {studentAttempts.length === 0 ? (
                  <div className="card-glass p-8 text-center text-xs text-[var(--text-muted)]">
                    제출된 진단 답안이 없어 통계 그래프를 그릴 수 없습니다.
                  </div>
                ) : (
                  <div className="w-full">
                    <DashboardCharts 
                      records={graphUtils.compileAchievementRecords(
                        attempts.filter(a => a.studentId === selectedStudentId),
                        scopes
                      )}
                    />
                  </div>
                )}
              </div>

              {/* Student Past Attempts Log list */}
              <div className="card-glass p-6">
                <h4 className="text-xs font-extrabold text-[var(--text-title)] uppercase tracking-wider mb-4">제출 답안 및 피드백 이력</h4>
                {studentAttempts.length === 0 ? (
                  <div className="text-center text-xs text-[var(--text-muted)] py-6">
                    제출된 답안 이력이 없습니다.
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    {studentAttempts.map(attempt => {
                      const crit = scoreUtils.calculateCriteriaScores(attempt.evaluationLevel, attempt.level, attempt.score);

                      return (
                        <div
                          key={attempt.id}
                          className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl flex flex-col gap-3"
                        >
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <div>
                              <span className="text-[9px] bg-slate-200 dark:bg-slate-700 text-[var(--text-title)] px-2 py-0.5 rounded font-black mr-2">
                                {attempt.testType === 'daily' ? '일일' : attempt.testType === 'weekly' ? '주간' : '월간'}
                              </span>
                              <span className="text-xs font-black text-[var(--text-title)]">{attempt.lessonTopic}</span>
                              <span className="text-[10px] text-[var(--text-muted)] block mt-0.5">난이도: {attempt.level} | 날짜: {attempt.testDate}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                                attempt.evaluationLevel === 'high'
                                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400'
                                  : attempt.evaluationLevel === 'medium'
                                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400'
                                    : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400'
                              }`}>
                                {attempt.evaluationLevel === 'high' ? '상' : attempt.evaluationLevel === 'medium' ? '중' : '하'}
                              </span>
                              <span className="text-sm font-black text-indigo-500">{attempt.score}점</span>
                            </div>
                          </div>

                          <div className="bg-[var(--bg-card)] p-3 rounded-lg border border-[var(--border-color)] text-xs text-[var(--text-main)] italic leading-relaxed">
                            "{attempt.answerText}"
                          </div>

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px] border-t border-[var(--border-color)] pt-2">
                            <span>개념: <strong>{crit.conceptScore}</strong></span>
                            <span>설명: <strong>{crit.explanationScore}</strong></span>
                            <span>적용: <strong>{crit.applicationScore}</strong></span>
                            <span>추론: <strong>{crit.reasoningScore}</strong></span>
                          </div>

                          <div className="text-[10px] bg-indigo-50/50 dark:bg-indigo-950/20 p-2.5 rounded border border-indigo-100 dark:border-indigo-900/30 text-[var(--text-main)] leading-relaxed">
                            💡 <strong>교사 피드백:</strong> {attempt.feedback}
                            {attempt.missingConcepts.length > 0 && (
                              <span className="block mt-1 text-red-600 dark:text-red-400 font-semibold">
                                ⚠️ 미흡 개념: {attempt.missingConcepts.join(', ')}
                              </span>
                            )}
                            {attempt.misconceptions.length > 0 && (
                              <span className="block mt-1 text-amber-600 dark:text-amber-400 font-semibold">
                                ⚠️ 오개념 감지: {attempt.misconceptions.join(', ')}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* CLASS OVERVIEW MODE */
            <div className="flex flex-col gap-6 animate-slide-up">
              {/* Class Scopes List */}
              <div className="card-glass p-6">
                <h3 className="text-sm font-extrabold text-[var(--text-title)] uppercase tracking-wider mb-4 flex items-center justify-between">
                  출제 및 누적 학습 범위 목록 (Teacher Scopes)
                  <span className="text-xs bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded font-bold">
                    총 {classScopes.length}개 범위
                  </span>
                </h3>

                {classScopes.length === 0 ? (
                  <div className="text-center text-xs text-[var(--text-muted)] py-8">
                    출제된 학습 범위가 없습니다. 우측 상단의 '새 일일 개념체크 출제' 버튼을 눌러 첫 시험을 만드세요!
                  </div>
                ) : (
                  <div className="flex flex-col gap-4">
                    {classScopes.map(scope => (
                      <div
                        key={scope.id}
                        className="p-4 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-indigo-300 transition-colors"
                      >
                        <div>
                          <span className="text-[9px] bg-slate-200 dark:bg-slate-700 text-[var(--text-title)] px-2.5 py-0.5 rounded font-black mr-2">
                            {scope.grade.split('(')[0]}
                          </span>
                          <span className="text-xs font-black text-[var(--text-title)]">{scope.lessonTopic}</span>
                          <p className="text-[10px] text-[var(--text-muted)] mt-1.5 mb-0">
                            <strong>세부 범위:</strong> {scope.specificScope} | <strong>시험일자:</strong> {scope.testDate}
                          </p>
                        </div>
                        <button
                          onClick={() => onSelectScopeForEdit(scope.id)}
                          className="text-xs font-bold text-indigo-600 hover:text-indigo-700 hover:underline flex items-center gap-0.5 self-start sm:self-center"
                        >
                          출제 보기/수정
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Weekly/Monthly Cumulative test previews */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Weekly preview card */}
                <div className="card-glass p-5 border-t-4 border-t-amber-500">
                  <span className="text-[10px] bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    주간 연결체크 출제 문항 (Weekly Bridge)
                  </span>
                  <h4 className="text-base font-extrabold text-[var(--text-title)] mt-2">개념 연결식 자동 합성</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed">
                    이번 주 범위의 Daily Check 기록을 참조하여 자동으로 개념 간 수식/기하 연계형 문항이 결합 출제됩니다.
                  </p>
                  
                  {weeklyPreview ? (
                    <div className="bg-[var(--bg-primary)] p-3 rounded-lg border border-[var(--border-color)] text-xs mt-3">
                      <strong className="text-[var(--text-title)] block mb-1">🔍 대표 문항 미리보기 (Standard):</strong>
                      <p className="text-[var(--text-muted)] leading-relaxed m-0">{weeklyPreview.levels[1]?.question}</p>
                    </div>
                  ) : (
                    <p className="text-[10px] text-red-500 mt-2">일일 범위가 없으면 출제할 수 없습니다.</p>
                  )}
                </div>

                {/* Monthly preview card */}
                <div className="card-glass p-5 border-t-4 border-t-red-500">
                  <span className="text-[10px] bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                    월간 마스터체크 출제 문항 (Monthly Mastery)
                  </span>
                  <h4 className="text-base font-extrabold text-[var(--text-title)] mt-2">단원 통합식 융합형 추론</h4>
                  <p className="text-xs text-[var(--text-muted)] mt-1.5 leading-relaxed">
                    이번 달 범위의 Daily Check를 대단원 통합적으로 전이 적용하는 모의고사 4점 신유형 스타일이 출제됩니다.
                  </p>

                  {monthlyPreview ? (
                    <div className="bg-[var(--bg-primary)] p-3 rounded-lg border border-[var(--border-color)] text-xs mt-3">
                      <strong className="text-[var(--text-title)] block mb-1">🔍 대표 문항 미리보기 (Standard):</strong>
                      <p className="text-[var(--text-muted)] leading-relaxed m-0">{monthlyPreview.levels[1]?.question}</p>
                    </div>
                  ) : (
                    <p className="text-[10px] text-red-500 mt-2">일일 범위가 없으면 출제할 수 없습니다.</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
