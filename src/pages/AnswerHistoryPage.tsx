import React, { useState } from 'react';
import { Search, History, User } from 'lucide-react';
import type { AnswerAttempt, Class, Student } from '../types';
import { scoreUtils } from '../utils/scoreUtils';
import { storageService } from '../services/storageService';

interface AnswerHistoryPageProps {
  attempts: AnswerAttempt[];
  classes: Class[];
  students: Student[];
  activeRole: 'teacher' | 'student';
  onNavigate: (view: string) => void;
}

export const AnswerHistoryPage: React.FC<AnswerHistoryPageProps> = ({
  attempts,
  classes,
  students,
  activeRole,
  onNavigate
}) => {
  const activeStudentId = storageService.getActiveStudentId();

  // Filters State
  const [testTypeFilter, setTestTypeFilter] = useState<string>('all');
  const [evalFilter, setEvalFilter] = useState<string>('all');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [studentFilter, setStudentFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Determine attempts to display depending on role
  const roleAttempts = activeRole === 'student'
    ? attempts.filter(a => a.studentId === activeStudentId)
    : attempts; // Teachers see everyone

  // Filter attempts
  const filteredAttempts = roleAttempts.filter(att => {
    // 1. Test Type
    if (testTypeFilter !== 'all' && att.testType !== testTypeFilter) return false;
    
    // 2. Evaluation Level
    if (evalFilter !== 'all' && att.evaluationLevel !== evalFilter) return false;
    
    // 3. Question Level
    if (levelFilter !== 'all' && att.level !== levelFilter) return false;
    
    // 4. Student (Teacher only)
    if (activeRole === 'teacher' && studentFilter !== 'all' && att.studentId !== studentFilter) return false;
    
    // 5. Search Text (Topic, question, or answer text)
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      const matchTopic = att.lessonTopic.toLowerCase().includes(term);
      const matchQuestion = att.questionText.toLowerCase().includes(term);
      const matchAnswer = att.answerText.toLowerCase().includes(term);
      if (!matchTopic && !matchQuestion && !matchAnswer) return false;
    }

    return true;
  });

  const getEvaluationBadgeColor = (lvl: string) => {
    switch (lvl) {
      case 'high': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400';
      case 'medium': return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400';
      case 'low': return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  const getLevelBadgeColor = (lvl: string) => {
    switch (lvl) {
      case 'basic': return 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-400';
      case 'standard': return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-400';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-400';
      default: return 'bg-slate-100 text-slate-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-6 animate-slide-up">
      {/* Page Header */}
      <div>
        <h2 className="text-xl font-black text-[var(--text-title)] flex items-center gap-2">
          <History className="text-indigo-500" size={24} />
          {activeRole === 'student' ? '학습 진단 답안 이력 (Answer History Log)' : '학생 진단 답안 관리 분석 (Student Answers Manager)'}
        </h2>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          {activeRole === 'student' 
            ? '본인이 제출했던 서술형 개념 진단 내역과 교사 채점 가이드를 다시 봅니다.' 
            : '전체 학생 Roster의 메타인지 서술형 답안 및 오개념 진단 내역을 다차원 필터로 검색합니다.'}
        </p>
      </div>

      {/* Dynamic Filters Section */}
      <div className="card-glass p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
        {/* Search */}
        <div className="md:col-span-2 relative">
          <label className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">키워드 검색</label>
          <div className="relative">
            <input
              type="text"
              placeholder="주제, 문항, 답안 텍스트 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-title)] focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 text-[var(--text-muted)]" size={14} />
          </div>
        </div>

        {/* Test Type Filter */}
        <div>
          <label className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">진단 유형</label>
          <select
            value={testTypeFilter}
            onChange={(e) => setTestTypeFilter(e.target.value)}
            className="w-full p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-title)] font-semibold"
          >
            <option value="all">전체보기</option>
            <option value="daily">일일 개념체크</option>
            <option value="weekly">주간 연결체크</option>
            <option value="monthly">월간 마스터체크</option>
          </select>
        </div>

        {/* Evaluation Level Filter */}
        <div>
          <label className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">평가 등급</label>
          <select
            value={evalFilter}
            onChange={(e) => setEvalFilter(e.target.value)}
            className="w-full p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-title)] font-semibold"
          >
            <option value="all">전체보기</option>
            <option value="high">상 (High)</option>
            <option value="medium">중 (Medium)</option>
            <option value="low">하 (Low)</option>
          </select>
        </div>

        {/* Question Level Filter */}
        <div>
          <label className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">문항 단계</label>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="w-full p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-title)] font-semibold"
          >
            <option value="all">전체보기</option>
            <option value="basic">기본 (Basic)</option>
            <option value="standard">표준 (Standard)</option>
            <option value="advanced">심화 (Advanced)</option>
          </select>
        </div>

        {/* Student Filter (Teacher Only) */}
        {activeRole === 'teacher' && (
          <div>
            <label className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">학생 지정</label>
            <select
              value={studentFilter}
              onChange={(e) => setStudentFilter(e.target.value)}
              className="w-full p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-title)] font-semibold"
            >
              <option value="all">전체보기</option>
              {students.map(s => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Attempts log list grid */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-semibold px-1">
          <span>검색 매칭 건수: {filteredAttempts.length}건</span>
          <span>진단 이력 로그</span>
        </div>

        {filteredAttempts.length === 0 ? (
          <div className="card-glass p-12 text-center text-xs text-[var(--text-muted)]">
            🔍 지정하신 필터 조건에 매칭되는 제출 답안 이력이 존재하지 않습니다.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredAttempts.map(attempt => {
              const criteria = scoreUtils.calculateCriteriaScores(attempt.evaluationLevel, attempt.level, attempt.score);

              return (
                <div
                  key={attempt.id}
                  className="card-glass p-5 flex flex-col gap-4 hover:border-indigo-300 transition-colors"
                >
                  {/* Top info row */}
                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[9px] bg-slate-200 dark:bg-slate-700 text-[var(--text-title)] px-2.5 py-0.5 rounded font-black">
                        {attempt.testType === 'daily' ? '일일' : attempt.testType === 'weekly' ? '주간' : '월간'}
                      </span>
                      <h3 className="text-sm font-black text-[var(--text-title)] m-0 leading-none">{attempt.lessonTopic}</h3>
                      <span className="text-[10px] text-[var(--text-muted)] font-medium">| {attempt.testDate}</span>
                      
                      {activeRole === 'teacher' && (
                        <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded font-bold flex items-center gap-0.5">
                          <User size={10} />
                          학생: {attempt.studentName}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${getLevelBadgeColor(attempt.level)}`}>
                        {attempt.level === 'basic' ? '기본' : attempt.level === 'standard' ? '표준' : '심화'}
                      </span>
                      {attempt.attemptType === 'reinforcement' && (
                        <span className="bg-red-50 text-red-500 text-[9px] font-bold px-1.5 py-0.5 rounded border border-red-100">
                          개념 강화
                        </span>
                      )}
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getEvaluationBadgeColor(attempt.evaluationLevel)}`}>
                        {attempt.evaluationLevel === 'high' ? '상' : attempt.evaluationLevel === 'medium' ? '중' : '하'}
                      </span>
                      <span className="text-sm font-black text-indigo-500">{attempt.score}점</span>
                    </div>
                  </div>

                  {/* Question & Answer texts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-[var(--border-color)] pt-3">
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider block">진단 질문 내용</span>
                      <p className="text-xs text-[var(--text-title)] font-medium bg-[var(--bg-primary)] p-3 rounded-lg border border-[var(--border-color)] leading-relaxed m-0">
                        {attempt.questionText}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider block flex items-center justify-between">
                        제출 답변 내용
                        {attempt.voiceTranscript && <span className="text-[8px] bg-indigo-50 text-indigo-600 px-1 rounded">🎤 음성</span>}
                      </span>
                      <p className="text-xs text-[var(--text-main)] italic bg-[var(--bg-primary)] p-3 rounded-lg border border-[var(--border-color)] leading-relaxed m-0">
                        "{attempt.answerText}"
                      </p>
                    </div>
                  </div>

                  {/* Diagnostic details & recommendations */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-[var(--border-color)] pt-3 text-[10px] text-[var(--text-muted)]">
                    {/* Dimension scores */}
                    <div className="flex flex-col gap-1.5">
                      <span className="font-bold text-[var(--text-title)] block">세부 영역 점수</span>
                      <div className="grid grid-cols-2 gap-1.5">
                        <span>개념: <strong>{criteria.conceptScore}</strong></span>
                        <span>서술: <strong>{criteria.explanationScore}</strong></span>
                        <span>적용: <strong>{criteria.applicationScore}</strong></span>
                        <span>추론: <strong>{criteria.reasoningScore}</strong></span>
                      </div>
                    </div>

                    {/* Deficit flags */}
                    <div className="flex flex-col gap-1.5 md:col-span-2 bg-indigo-50/30 dark:bg-indigo-950/20 p-2.5 rounded-lg border border-indigo-100 dark:border-indigo-900/30">
                      <span className="font-bold text-[var(--text-title)] block">교사 평가 피드백 및 약점 파악</span>
                      <p className="text-[10px] text-[var(--text-main)] leading-relaxed m-0 mt-0.5">
                        {attempt.feedback}
                      </p>
                      {attempt.missingConcepts.length > 0 && (
                        <span className="text-red-500 font-bold block mt-1">⚠️ 부족한 개념: {attempt.missingConcepts.join(', ')}</span>
                      )}
                      {attempt.misconceptions.length > 0 && (
                        <span className="text-amber-500 font-bold block mt-1">⚠️ 감지 오개념: {attempt.misconceptions.join(', ')}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
