import React, { useState } from 'react';
import { BookOpen, Sparkles, Save, ArrowLeft, RefreshCw, Layers } from 'lucide-react';
import type { TeacherScope, Question, QuestionLevel } from '../types';
import { sampleCurriculum } from '../data/sampleCurriculum';
import type { CurriculumTopic } from '../data/sampleCurriculum';
import { questionService } from '../services/questionService';
import { storageService } from '../services/storageService';

interface DailyScopePageProps {
  scopes: TeacherScope[];
  onSaveScope: (newScope: TeacherScope, generatedQuestions: Question) => void;
  onCancel: () => void;
  editingScopeId: string | null;
}

export const DailyScopePage: React.FC<DailyScopePageProps> = ({
  scopes,
  onSaveScope,
  onCancel,
  editingScopeId
}) => {
  const existingScope = editingScopeId ? scopes.find(s => s.id === editingScopeId) : null;

  // Form State
  const [classId, setClassId] = useState(existingScope?.classId || 'class_a');
  const [grade, setGrade] = useState(existingScope?.grade || '고등학교 1학년 (High School 1)');
  const [subject, setSubject] = useState(existingScope?.subject || '공통수학 1 (Common Mathematics 1)');
  const [unit, setUnit] = useState(existingScope?.unit || '이차방정식과 이차함수 (Quadratic Equations and Functions)');
  const [lessonTopic, setLessonTopic] = useState(existingScope?.lessonTopic || '');
  const [specificScope, setSpecificScope] = useState(existingScope?.specificScope || '');
  const [keyConcepts, setKeyConcepts] = useState(existingScope?.keyConcepts || '');
  const [achievementStandard, setAchievementStandard] = useState(existingScope?.achievementStandard || '');
  const [keywords, setKeywords] = useState(existingScope?.keywords || '');
  const [commonMisconceptions, setCommonMisconceptions] = useState(existingScope?.commonMisconceptions || '');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(existingScope?.difficulty || 'medium');
  const [testDate, setTestDate] = useState(existingScope?.testDate || new Date().toISOString().split('T')[0]);

  // AI Generated questions preview
  const [generatedQuestions, setGeneratedQuestions] = useState<Question | null>(null);

  // Curriculum Navigation helper states
  const [selectedCurricTopic, setSelectedCurricTopic] = useState('');

  // Handle auto fill based on curriculum topic choice
  const handleCurriculumTopicSelect = (topicName: string) => {
    setSelectedCurricTopic(topicName);
    
    // Search topic details in curriculum database
    let foundTopic: CurriculumTopic | null = null;
    sampleCurriculum.forEach(g => {
      g.subjects.forEach(s => {
        s.units.forEach(u => {
          u.topics.forEach(t => {
            if (t.topic === topicName) {
              foundTopic = t;
              // Also update grade, subject, unit automatically
              setGrade(g.gradeName);
              setSubject(s.subjectName);
              setUnit(u.unitName);
            }
          });
        });
      });
    });

    if (foundTopic) {
      const ft: CurriculumTopic = foundTopic;
      setLessonTopic(ft.topic);
      setSpecificScope(ft.specificScope.join(', '));
      setKeyConcepts(ft.keyConcepts.join(', '));
      setAchievementStandard(ft.achievementStandard);
      setKeywords(ft.keywords.join(', '));
      setCommonMisconceptions(ft.commonMisconceptions.join(', '));
    }
  };

  const handleGenerateQuestions = () => {
    if (!lessonTopic.trim()) {
      alert('진단 질문을 만들 단원 주제(Lesson Topic)를 설정해야 합니다!');
      return;
    }

    const tempScope: TeacherScope = {
      id: existingScope?.id || `scope_${Date.now()}`,
      classId,
      grade,
      subject,
      unit,
      lessonTopic,
      specificScope,
      keyConcepts,
      achievementStandard,
      keywords,
      commonMisconceptions,
      difficulty,
      testDate,
      createdAt: existingScope?.createdAt || new Date().toISOString()
    };

    const questions = questionService.getDailyQuestions(tempScope);
    setGeneratedQuestions(questions);
  };

  const handleSave = () => {
    if (!lessonTopic.trim()) {
      alert('단원 주제를 작성해 주세요!');
      return;
    }

    const finalScope: TeacherScope = {
      id: existingScope?.id || `scope_${Date.now()}`,
      classId,
      grade,
      subject,
      unit,
      lessonTopic,
      specificScope,
      keyConcepts,
      achievementStandard,
      keywords,
      commonMisconceptions,
      difficulty,
      testDate,
      createdAt: existingScope?.createdAt || new Date().toISOString()
    };

    // Auto-generate if not generated already
    const questions = generatedQuestions || questionService.getDailyQuestions(finalScope);
    onSaveScope(finalScope, questions);
  };

  const getLevelColor = (level: QuestionLevel) => {
    switch (level) {
      case 'basic': return 'text-blue-500 bg-blue-50 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/50';
      case 'standard': return 'text-amber-500 bg-amber-50 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50';
      case 'advanced': return 'text-red-500 bg-red-50 border-red-200 dark:bg-red-950/40 dark:text-red-400 dark:border-red-900/50';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6 animate-slide-up">
      {/* Scope header banner */}
      <div className="flex items-center gap-3">
        <button
          onClick={onCancel}
          className="p-2.5 rounded-xl border border-[var(--border-color)] text-[var(--text-main)] hover:bg-[var(--bg-primary)] transition-colors"
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h2 className="text-xl font-black text-[var(--text-title)]">
            {editingScopeId ? '일일 진단 범위 수정 (Edit Scope)' : '새 일일 개념체크 출제 (Create Daily Scope)'}
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">교육과정 매핑을 활용해 개념 서술 문제를 자동으로 가공하고 배포합니다.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Form controls */}
        <div className="lg:col-span-2 flex flex-col gap-5">
          {/* CURRICULUM SELECT AUTO-FILL BOX */}
          <div className="card-glass p-5 border-l-4 border-l-purple-500 bg-purple-50/10 dark:bg-purple-950/10 flex flex-col gap-3">
            <h3 className="text-xs font-extrabold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1">
              <Layers size={14} />
              수학 교육과정 템플릿 불러오기 (Curriculum Autofill)
            </h3>
            <p className="text-[10px] text-[var(--text-muted)] leading-relaxed m-0">
              학습 단원을 선택하시면 성취기준, 오개념, 핵심 용어와 문제 가이드가 즉각 자동 완성됩니다.
            </p>
            <select
              value={selectedCurricTopic}
              onChange={(e) => handleCurriculumTopicSelect(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-xs font-semibold text-[var(--text-title)] focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">-- 교육과정 단원을 선택하세요 (Select a Topic) --</option>
              {sampleCurriculum.flatMap(g => 
                g.subjects.flatMap(s => 
                  s.units.flatMap(u => 
                    u.topics.map(t => (
                      <option key={t.topic} value={t.topic}>
                        [{s.subjectName.split(' ')[0]}] {t.topic.split('(')[0]}
                      </option>
                    ))
                  )
                )
              )}
            </select>
          </div>

          {/* Core Settings fields */}
          <div className="card-glass p-6 flex flex-col gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">진단 배포 반</label>
                <select
                  value={classId}
                  onChange={(e) => setClassId(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-title)] font-semibold"
                >
                  <option value="class_a">고1 공통수학1 - A반</option>
                  <option value="class_b">고2 수학I - B반</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">진단 배포 일자</label>
                <input
                  type="date"
                  value={testDate}
                  onChange={(e) => setTestDate(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-title)] font-semibold"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">대상 학년</label>
                <input
                  type="text"
                  value={grade}
                  onChange={(e) => setGrade(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-title)]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">과목명</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-title)]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">대단원명</label>
                <input
                  type="text"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-title)]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">소단원 및 학습 주제 (Topic)</label>
              <input
                type="text"
                value={lessonTopic}
                onChange={(e) => setLessonTopic(e.target.value)}
                placeholder="예: 이차함수의 최대와 최소"
                className="w-full p-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-title)] font-bold focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">출제 세부 범위 (Scope)</label>
              <input
                type="text"
                value={specificScope}
                onChange={(e) => setSpecificScope(e.target.value)}
                placeholder="꼭짓점 구하기, 대칭축의 성질, 완전제곱식 변형"
                className="w-full p-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-title)] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">핵심 수학 개념 (Key Concepts)</label>
              <input
                type="text"
                value={keyConcepts}
                onChange={(e) => setKeyConcepts(e.target.value)}
                placeholder="꼭짓점, 대칭축, 완전제곱식"
                className="w-full p-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-title)] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">관련 성취 기준 (Achievement Standard)</label>
              <textarea
                value={achievementStandard}
                onChange={(e) => setAchievementStandard(e.target.value)}
                placeholder="[10공수1-02-04] 이차함수의 최대와 최소를 이해하고, 이를 활용하여 문제를 해결할 수 있다."
                className="w-full h-16 p-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-title)] leading-relaxed resize-none focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">검증 키워드 (Keywords)</label>
                <input
                  type="text"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  placeholder="대칭축, 꼭짓점, 제한된 범위"
                  className="w-full p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-title)]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">출제 권장 난이도</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value as any)}
                  className="w-full p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-title)] font-semibold"
                >
                  <option value="easy">Easy (하)</option>
                  <option value="medium">Medium (중)</option>
                  <option value="hard">Hard (상)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">감지할 오개념 (Common Misconceptions)</label>
              <textarea
                value={commonMisconceptions}
                onChange={(e) => setCommonMisconceptions(e.target.value)}
                placeholder="최댓값과 최솟값 자체를 꼭짓점의 x좌표로 혼동, 대칭축 범위를 무시하는 오류"
                className="w-full h-16 p-2.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-title)] leading-relaxed resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center border-t border-[var(--border-color)] pt-4 gap-4 mt-2">
              <button
                type="button"
                onClick={handleGenerateQuestions}
                className="px-4 py-2 border border-indigo-200 text-indigo-600 dark:border-indigo-900/50 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/20 text-xs font-bold rounded-lg flex items-center gap-1 transition-colors"
              >
                <Sparkles size={14} />
                진단 문항 3단계 미리 생성
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-lg flex items-center gap-1 transition-colors shadow-md shadow-indigo-100 dark:shadow-none"
              >
                <Save size={14} />
                배포 범위 저장 및 발행
              </button>
            </div>
          </div>
        </div>

        {/* Right Preview column */}
        <div className="flex flex-col gap-6">
          <div className="card-glass p-5 flex flex-col gap-4">
            <h3 className="text-xs font-extrabold text-[var(--text-title)] uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="text-indigo-500 animate-spin" size={14} />
              생성 문항 미리보기 (Question Preview)
            </h3>
            
            {!generatedQuestions ? (
              <div className="text-center text-xs text-[var(--text-muted)] py-12 leading-relaxed bg-[var(--bg-primary)] rounded-xl border border-[var(--border-color)] border-dashed">
                좌측 폼을 기입하고 <br />
                '진단 문항 3단계 미리 생성' 버튼을 <br />
                누르면 생성 결과가 미리보기됩니다.
              </div>
            ) : (
              <div className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-1">
                {generatedQuestions.levels.map((lvl, index) => (
                  <div
                    key={index}
                    className={`p-4 border rounded-xl flex flex-col gap-2 bg-[var(--bg-card)]`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${getLevelColor(lvl.level)}`}>
                        {lvl.level === 'basic' ? '기본' : lvl.level === 'standard' ? '표준' : '심화'} 단계
                      </span>
                      <span className="text-[9px] text-[var(--text-muted)] font-medium">검증 문항 {index + 1}</span>
                    </div>

                    <p className="text-xs text-[var(--text-title)] font-bold leading-relaxed m-0">
                      {lvl.question}
                    </p>

                    <div className="text-[10px] text-[var(--text-muted)] border-t border-[var(--border-color)] pt-2 leading-relaxed">
                      <strong>채점 기준 (Rubric):</strong> {lvl.rubric}
                    </div>

                    <div className="flex flex-wrap gap-1 mt-1">
                      {lvl.expectedKeywords.map((kw, i) => (
                        <span
                          key={i}
                          className="text-[9px] bg-slate-100 dark:bg-slate-800 text-[var(--text-title)] px-1.5 py-0.5 rounded"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
