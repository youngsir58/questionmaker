import React from 'react';
import { BookOpen, GraduationCap, Users, ArrowRight, ShieldCheck, Zap, BarChart2 } from 'lucide-react';

interface LandingPageProps {
  onSelectRole: (role: 'teacher' | 'student') => void;
  onNavigate: (view: string) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onSelectRole, onNavigate }) => {
  const handleRoleSelection = (role: 'teacher' | 'student') => {
    onSelectRole(role);
    if (role === 'teacher') {
      onNavigate('teacher-dashboard');
    } else {
      onNavigate('dashboard');
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center max-w-6xl mx-auto px-4 py-12 gap-12 text-center">
      {/* Hero section */}
      <div className="flex flex-col items-center gap-4 max-w-3xl animate-slide-up">
        <span className="text-xs bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 px-3 py-1.5 rounded-full font-bold uppercase tracking-wider">
          고등학교 수학 메타인지 진단 플랫폼
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-[var(--text-title)] tracking-tight leading-tight m-0">
          개념을 직접 설명하며 완성하는 <br />
          <span className="text-indigo-500 bg-clip-text">수학 진단 웹앱, MathLog</span>
        </h1>
        <p className="text-sm md:text-base text-[var(--text-muted)] mt-2 leading-relaxed">
          수학 문제를 기계적으로 풀기만 하나요? 개념을 타인에게 말이나 텍스트로 설명할 수 있을 때 진짜 내 지식이 됩니다. 
          교과과정 성취 기준에 맞춘 정밀 AI 진단과 망각 곡선 극복 주간/월간 평가 시스템을 만나보세요.
        </p>
      </div>

      {/* Role Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Student Card */}
        <div className="card-glass p-8 flex flex-col items-center text-center gap-4 hover:border-indigo-400 hover:shadow-lg transition-all group">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-500 rounded-2xl group-hover:scale-110 transition-transform">
            <GraduationCap size={48} />
          </div>
          <h2 className="text-xl font-bold text-[var(--text-title)]">👨‍🎓 학생 모드 (Student)</h2>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-xs">
            오늘 배운 수학 개념을 설명하는 진단을 치르고, 세부 성취도를 분석받아 2~3일 주기의 에빙하우스 복습 코칭을 제공받습니다.
          </p>
          <button
            onClick={() => handleRoleSelection('student')}
            className="mt-4 px-6 py-2.5 bg-indigo-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 hover:bg-indigo-700 transition-colors shadow-md shadow-indigo-100 dark:shadow-none"
          >
            학생 대시보드 입장
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Teacher Card */}
        <div className="card-glass p-8 flex flex-col items-center text-center gap-4 hover:border-cyan-400 hover:shadow-lg transition-all group">
          <div className="p-4 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-500 rounded-2xl group-hover:scale-110 transition-transform">
            <Users size={48} />
          </div>
          <h2 className="text-xl font-bold text-[var(--text-title)]">👩‍🏫 교사 모드 (Teacher)</h2>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed max-w-xs">
            학급 Roster를 관리하고 단원/성취기준을 지정해 3단계(기본, 표준, 심화) 서술형 문제를 출제 및 학생들의 답안 분석 데이터를 봅니다.
          </p>
          <button
            onClick={() => handleRoleSelection('teacher')}
            className="mt-4 px-6 py-2.5 bg-cyan-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 hover:bg-cyan-700 transition-colors shadow-md shadow-cyan-100 dark:shadow-none"
          >
            교사 대시보드 입장
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Feature explanations */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-6 border-t border-[var(--border-color)] pt-12">
        <div className="flex flex-col items-center text-center p-4 gap-2">
          <div className="p-2.5 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 rounded-xl">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-sm font-bold text-[var(--text-title)]">교육과정 성취 기준 검증</h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            교육부 고시 한국 고등학교 수학 교육과정 성취기준을 기반으로 한 개념 검증 및 학습 진단 설계를 충실히 따릅니다.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-4 gap-2">
          <div className="p-2.5 bg-amber-50 dark:bg-amber-950/30 text-amber-500 rounded-xl">
            <Zap size={24} />
          </div>
          <h3 className="text-sm font-bold text-[var(--text-title)]">망각 주기 연계 (3단계 체크)</h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            오늘 배운 'Daily Check', 주말의 'Weekly Bridge', 기말 누적 'Monthly Mastery'의 체계적인 복습 루프를 구성합니다.
          </p>
        </div>

        <div className="flex flex-col items-center text-center p-4 gap-2">
          <div className="p-2.5 bg-purple-50 dark:bg-purple-950/30 text-purple-500 rounded-xl">
            <BarChart2 size={24} />
          </div>
          <h3 className="text-sm font-bold text-[var(--text-title)]">다차원 진단 대시보드</h3>
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            단순 점수가 아닌 개념 이해, 서술 논증, 실전 적용, 추론 능력을 방사형 차트와 성취도 캘린더 등으로 다각도로 가시화합니다.
          </p>
        </div>
      </div>
    </div>
  );
};
