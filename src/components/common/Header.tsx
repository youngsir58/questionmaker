import React, { useState, useEffect } from 'react';
import { Sun, Moon, GraduationCap, Users, Bell, RotateCcw, BookOpen, AlertCircle } from 'lucide-react';
import { storageService } from '../../services/storageService';
import { reminderService } from '../../services/reminderService';
import type { ReviewReminder } from '../../types';

interface HeaderProps {
  activeRole: 'teacher' | 'student';
  onRoleChange: (role: 'teacher' | 'student') => void;
  activeView: string;
  onViewChange: (view: string) => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  activeStudentName: string;
  refreshTrigger: number;
  onResetDB: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeRole,
  onRoleChange,
  activeView,
  onViewChange,
  theme,
  onThemeToggle,
  activeStudentName,
  refreshTrigger,
  onResetDB
}) => {
  const [reminders, setReminders] = useState<ReviewReminder[]>([]);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);

  useEffect(() => {
    // Check reminders when activeRole is student and when refreshTrigger changes
    if (activeRole === 'student') {
      const studentId = storageService.getActiveStudentId();
      const list = reminderService.checkDueReminders(studentId);
      setReminders(list);
    } else {
      setReminders([]);
    }
  }, [activeRole, refreshTrigger]);

  const handleReminderClick = (id: string) => {
    reminderService.completeReminder(id);
    // Refresh reminders list
    if (activeRole === 'student') {
      const studentId = storageService.getActiveStudentId();
      setReminders(reminderService.checkDueReminders(studentId));
    }
    // Navigate student to dashboard or review tab
    onViewChange('dashboard');
    setShowNotificationDropdown(false);
  };

  const hasDueReminders = reminders.length > 0;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--border-color)] bg-[var(--bg-card)]/90 backdrop-blur-md px-4 py-3 md:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Title / Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onViewChange('landing')}>
          <div className="p-2 bg-indigo-500 text-white rounded-xl shadow-md">
            <BookOpen size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--text-title)] tracking-tight m-0 leading-none">
              MathLog
            </h1>
            <span className="text-xs text-[var(--text-muted)] font-medium">오늘의 수학 개념체크</span>
          </div>
        </div>

        {/* Dynamic Navigations based on Role */}
        <nav className="flex items-center gap-1 md:gap-2">
          {activeRole === 'student' ? (
            <>
              <button
                onClick={() => onViewChange('dashboard')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeView === 'dashboard'
                    ? 'bg-indigo-500 text-white shadow-sm'
                    : 'text-[var(--text-main)] hover:bg-[var(--bg-primary)]'
                }`}
              >
                진단 학습 홈
              </button>
              <button
                onClick={() => onViewChange('charts')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeView === 'charts'
                    ? 'bg-indigo-500 text-white shadow-sm'
                    : 'text-[var(--text-main)] hover:bg-[var(--bg-primary)]'
                }`}
              >
                성취도 리포트
              </button>
              <button
                onClick={() => onViewChange('history')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeView === 'history'
                    ? 'bg-indigo-500 text-white shadow-sm'
                    : 'text-[var(--text-main)] hover:bg-[var(--bg-primary)]'
                }`}
              >
                진단 이력
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => onViewChange('teacher-dashboard')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeView === 'teacher-dashboard'
                    ? 'bg-indigo-500 text-white shadow-sm'
                    : 'text-[var(--text-main)] hover:bg-[var(--bg-primary)]'
                }`}
              >
                학급 대시보드
              </button>
              <button
                onClick={() => onViewChange('create-scope')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeView === 'create-scope'
                    ? 'bg-indigo-500 text-white shadow-sm'
                    : 'text-[var(--text-main)] hover:bg-[var(--bg-primary)]'
                }`}
              >
                진단 출제 설정
              </button>
              <button
                onClick={() => onViewChange('history')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeView === 'history'
                    ? 'bg-indigo-500 text-white shadow-sm'
                    : 'text-[var(--text-main)] hover:bg-[var(--bg-primary)]'
                }`}
              >
                학생 답안 분석
              </button>
            </>
          )}
        </nav>

        {/* Global actions: Mode toggle, Notification, Reset, Theme */}
        <div className="flex items-center gap-3">
          {/* Active User Label */}
          {activeRole === 'student' && (
            <span className="hidden lg:inline text-xs bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-md font-semibold">
              학생: {activeStudentName}
            </span>
          )}

          {/* Role switcher toggle */}
          <div className="flex bg-[var(--bg-primary)] p-1 rounded-lg border border-[var(--border-color)]">
            <button
              onClick={() => {
                onRoleChange('student');
                onViewChange('dashboard');
              }}
              className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                activeRole === 'student'
                  ? 'bg-[var(--bg-card)] text-indigo-600 dark:text-indigo-400 shadow-sm border border-[var(--border-color)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <GraduationCap size={14} />
              학생
            </button>
            <button
              onClick={() => {
                onRoleChange('teacher');
                onViewChange('teacher-dashboard');
              }}
              className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                activeRole === 'teacher'
                  ? 'bg-[var(--bg-card)] text-indigo-600 dark:text-indigo-400 shadow-sm border border-[var(--border-color)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'
              }`}
            >
              <Users size={14} />
              교사
            </button>
          </div>

          {/* Notification Icon (Student Mode Only) */}
          {activeRole === 'student' && (
            <div className="relative">
              <button
                onClick={() => {
                  reminderService.requestPermission(); // request on click
                  setShowNotificationDropdown(!showNotificationDropdown);
                }}
                className={`p-2 rounded-lg border border-[var(--border-color)] transition-colors relative ${
                  hasDueReminders 
                    ? 'bg-amber-50 dark:bg-amber-950/20 text-amber-500 hover:bg-amber-100 border-amber-300 dark:border-amber-900/50' 
                    : 'text-[var(--text-main)] hover:bg-[var(--bg-primary)]'
                }`}
                title="복습 알림판"
              >
                <Bell size={18} className={hasDueReminders ? 'animate-bounce' : ''} />
                {hasDueReminders && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                    {reminders.length}
                  </span>
                )}
              </button>

              {showNotificationDropdown && (
                <div className="absolute right-0 mt-2 w-80 max-w-sm card-glass p-3 shadow-xl z-50 text-left border border-[var(--border-color)] bg-[var(--bg-card)]">
                  <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)] mb-2">
                    <span className="text-xs font-bold text-[var(--text-title)] flex items-center gap-1">
                      <AlertCircle size={14} className="text-amber-500" />
                      개념 복습 알림판
                    </span>
                    <span className="text-[10px] text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded font-bold">
                      망각 주기 극복
                    </span>
                  </div>

                  {reminders.length === 0 ? (
                    <div className="py-6 text-center text-xs text-[var(--text-muted)]">
                      🎉 현재 예정된 긴급 복습 개념이 없습니다. 아주 좋은 메타인지 상태예요!
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                      {reminders.map(rem => (
                        <div
                          key={rem.id}
                          onClick={() => handleReminderClick(rem.id)}
                          className="p-2 text-xs rounded-lg bg-amber-50/50 hover:bg-amber-50 dark:bg-amber-950/20 dark:hover:bg-amber-950/40 border border-amber-100 dark:border-amber-900/30 cursor-pointer transition-colors"
                        >
                          <p className="font-semibold text-amber-700 dark:text-amber-300 m-0 leading-snug">
                            {rem.message}
                          </p>
                          <span className="text-[9px] text-[var(--text-muted)] mt-1 block">
                            복습 예정일: {rem.scheduledDate} (클릭 시 완료)
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Reset database button */}
          <button
            onClick={onResetDB}
            className="p-2 rounded-lg border border-[var(--border-color)] text-[var(--text-main)] hover:bg-red-50 hover:text-red-500 hover:border-red-300 dark:hover:bg-red-950/20 dark:hover:text-red-400 dark:hover:border-red-900/50 transition-colors"
            title="학습 데이터 초기화 (Reset Database)"
          >
            <RotateCcw size={18} />
          </button>

          {/* Theme Switcher */}
          <button
            onClick={onThemeToggle}
            className="p-2 rounded-lg border border-[var(--border-color)] text-[var(--text-main)] hover:bg-[var(--bg-primary)] transition-colors"
            title={theme === 'light' ? '다크 모드로 전환' : '라이트 모드로 전환'}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};
