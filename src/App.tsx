import { useState, useEffect } from 'react';
import { Header } from './components/common/Header';
import { LandingPage } from './pages/LandingPage';
import { StudentDashboard } from './pages/StudentDashboard';
import { TeacherDashboard } from './pages/TeacherDashboard';
import { DailyScopePage } from './pages/DailyScopePage';
import { TestPage } from './pages/TestPage';
import { ResultPage } from './pages/ResultPage';
import { AnswerHistoryPage } from './pages/AnswerHistoryPage';
import { AchievementDashboard } from './pages/AchievementDashboard';

import { storageService } from './services/storageService';
import type { Class, Student, TeacherScope, AnswerAttempt, Question } from './types';

function App() {
  // 1. Initialize mock data on startup
  useEffect(() => {
    storageService.initializeMockData(false);
    onRefreshState();
  }, []);

  // 2. Global State Definitions
  const [activeRole, setActiveRole] = useState<'teacher' | 'student'>(storageService.getActiveRole());
  const [activeView, setActiveView] = useState<string>('landing');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  
  // Storage synced states
  const [classes, setClasses] = useState<Class[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [scopes, setScopes] = useState<TeacherScope[]>([]);
  const [attempts, setAttempts] = useState<AnswerAttempt[]>([]);
  
  // Navigation contextual values
  const [activeScopeId, setActiveScopeId] = useState<string>('');
  const [activeAttemptId, setActiveAttemptId] = useState<string>('');
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);

  // Sync state values on trigger/refresh
  const onRefreshState = () => {
    setClasses(storageService.getClasses());
    setStudents(storageService.getStudents());
    setScopes(storageService.getScopes());
    setAttempts(storageService.getAttempts());
    setRefreshTrigger(prev => prev + 1);
  };

  // 3. Theme application
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // 4. Role handler
  const handleRoleChange = (role: 'teacher' | 'student') => {
    setActiveRole(role);
    storageService.saveActiveRole(role);
    onRefreshState();
  };

  // 5. Database resets (re-initialization)
  const handleResetDB = () => {
    const check = window.confirm(
      '정말로 전체 진단 데이터를 초기화하시겠습니까?\n이 작업을 완료하면 모든 복습 알림 및 제출 답안이 제거되고 기본 데모 Roster와 진단 내역으로 복원됩니다.'
    );
    if (check) {
      storageService.clearAll();
      onRefreshState();
      setActiveView('landing');
      alert('데이터베이스가 성공적으로 복원되었습니다.');
    }
  };

  // 6. Teacher creates/updates a Daily Check scope
  const handleSaveScope = (newScope: TeacherScope, generatedQuestions: Question) => {
    const currentScopes = storageService.getScopes();
    const existingIdx = currentScopes.findIndex(s => s.id === newScope.id);
    
    if (existingIdx >= 0) {
      currentScopes[existingIdx] = newScope;
    } else {
      currentScopes.push(newScope);
    }
    
    storageService.saveScopes(currentScopes);

    // Save generated questions to mock bank
    const currentQuestions = storageService.getQuestions();
    const qIdx = currentQuestions.findIndex(q => q.id === generatedQuestions.id);
    if (qIdx >= 0) {
      currentQuestions[qIdx] = generatedQuestions;
    } else {
      currentQuestions.push(generatedQuestions);
    }
    storageService.saveQuestions(currentQuestions);

    onRefreshState();
    setActiveView('teacher-dashboard');
    alert(`성공적으로 "${newScope.lessonTopic}" 진단 범위를 출제 및 발행하였습니다!`);
  };

  const handleSelectScopeForEdit = (scopeId: string) => {
    setActiveScopeId(scopeId);
    setActiveView('create-scope');
  };

  // 7. Student launches a test
  const handleStartTest = (scopeId: string, testType: 'daily' | 'weekly' | 'monthly') => {
    setActiveScopeId(scopeId);
    // testType is passed to route state
    setActiveView(`test_${testType}`);
  };

  // Student completes 3-question test session
  const handleTestFinished = (lastAttemptId: string) => {
    setActiveAttemptId(lastAttemptId);
    onRefreshState();
    setActiveView('test-result-summary');
  };

  // 8. Renders Active Page Content
  const renderActiveView = () => {
    if (activeView === 'landing') {
      return (
        <LandingPage
          onSelectRole={handleRoleChange}
          onNavigate={(view) => {
            setActiveView(view);
            setActiveScopeId(''); // reset scope context
          }}
        />
      );
    }

    if (activeView === 'dashboard' && activeRole === 'student') {
      return (
        <StudentDashboard
          scopes={scopes}
          attempts={attempts}
          onStartTest={handleStartTest}
          onNavigate={setActiveView}
          refreshTrigger={refreshTrigger}
          onRefresh={onRefreshState}
        />
      );
    }

    if (activeView === 'teacher-dashboard' && activeRole === 'teacher') {
      return (
        <TeacherDashboard
          classes={classes}
          students={students}
          scopes={scopes}
          attempts={attempts}
          onNavigate={setActiveView}
          onSelectScopeForEdit={handleSelectScopeForEdit}
          onRefresh={onRefreshState}
        />
      );
    }

    if (activeView === 'create-scope' && activeRole === 'teacher') {
      return (
        <DailyScopePage
          scopes={scopes}
          onSaveScope={handleSaveScope}
          onCancel={() => {
            setActiveView('teacher-dashboard');
            setActiveScopeId('');
          }}
          editingScopeId={activeScopeId || null}
        />
      );
    }

    // Testing views: Daily, Weekly, Monthly
    if (activeView.startsWith('test_') && activeRole === 'student') {
      const type = activeView.split('_')[1] as 'daily' | 'weekly' | 'monthly';
      return (
        <TestPage
          scopeId={activeScopeId}
          testType={type}
          onFinishTest={handleTestFinished}
          onQuit={() => {
            setActiveView('dashboard');
            setActiveScopeId('');
          }}
        />
      );
    }

    if (activeView === 'test-result-summary' && activeRole === 'student') {
      return (
        <ResultPage
          lastAttemptId={activeAttemptId}
          onReturnToDashboard={() => {
            setActiveView('dashboard');
            setActiveAttemptId('');
          }}
        />
      );
    }

    if (activeView === 'history') {
      return (
        <AnswerHistoryPage
          attempts={attempts}
          classes={classes}
          students={students}
          activeRole={activeRole}
          onNavigate={setActiveView}
        />
      );
    }

    if (activeView === 'charts') {
      return (
        <AchievementDashboard
          attempts={attempts}
          classes={classes}
          students={students}
          activeRole={activeRole}
        />
      );
    }

    // Fallback
    return (
      <div className="flex-grow flex items-center justify-center p-8">
        <div className="text-center text-xs text-[var(--text-muted)]">
          존재하지 않는 페이지입니다. 랜드 페이지로 이동합니다.
          <button
            onClick={() => setActiveView('landing')}
            className="mt-4 block mx-auto px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs"
          >
            홈으로 이동
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)]">
      <Header
        activeRole={activeRole}
        onRoleChange={handleRoleChange}
        activeView={activeView}
        onViewChange={(view) => {
          setActiveView(view);
          setActiveScopeId('');
        }}
        theme={theme}
        onThemeToggle={handleThemeToggle}
        activeStudentName="김철수"
        refreshTrigger={refreshTrigger}
        onResetDB={handleResetDB}
      />
      
      <main className="flex-grow flex flex-col justify-start">
        {renderActiveView()}
      </main>

      <footer className="py-6 border-t border-[var(--border-color)] bg-[var(--bg-card)] text-center text-[10px] text-[var(--text-muted)] font-semibold mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          © 2026 MathLog. 한국 고등학교 수학 교육과정 성취수준 검증 엔진 탑재.
        </div>
      </footer>
    </div>
  );
}

export default App;
