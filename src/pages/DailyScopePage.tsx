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
  
  const initialUnitParts = existingScope?.unit ? existingScope.unit.split(' ➔ ') : ['II. 방정식과 부등식', '3. 이차방정식과 이차함수'];
  const [largeUnit, setLargeUnit] = useState(initialUnitParts[0] || '');
  const [mediumUnit, setMediumUnit] = useState(initialUnitParts[1] || '');

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
  const [activeGradeFilter, setActiveGradeFilter] = useState<'all' | 'high1' | 'high2' | 'high3'>('all');
  const [activeSubjectFilter, setActiveSubjectFilter] = useState<string>('all');

  // Filter curriculum topics based on selected grade and subject, and sort them numerically by topic number
  const filteredCurriculum = sampleCurriculum
    .filter(t => {
      // 1. Grade filter
      if (activeGradeFilter === 'high1') {
        const isHigh1 = t.subject === '공통수학 1' || t.subject === '공통수학 2';
        if (!isHigh1) return false;
      } else if (activeGradeFilter === 'high2') {
        const isHigh2 = t.subject === '대수' || t.subject === '미적분 I' || t.subject === '확률과 통계' || t.subject === '기하';
        if (!isHigh2) return false;
      } else if (activeGradeFilter === 'high3') {
        const isHigh3 = t.subject === '미적분' || t.subject === '확률과 통계' || t.subject === '기하';
        if (!isHigh3) return false;
      }

      // 2. Subject filter
      if (activeSubjectFilter !== 'all') {
        if (t.subject !== activeSubjectFilter) return false;
      }

      return true;
    })
    .sort((a, b) => {
      const numA = parseInt(a.id.split('-')[1]) || 0;
      const numB = parseInt(b.id.split('-')[1]) || 0;
      return numA - numB;
    });

  // Group filtered topics by Large Unit (bigUnit)
  const groupedTopics: Record<string, CurriculumTopic[]> = {};
  filteredCurriculum.forEach(t => {
    if (!groupedTopics[t.bigUnit]) {
      groupedTopics[t.bigUnit] = [];
    }
    groupedTopics[t.bigUnit].push(t);
  });

  const getSubjectsForGrade = () => {
    if (activeGradeFilter === 'high1') {
      return [
        { id: '공통수학 1', label: '1학년 1학기 (공통수학 1) [2022]' },
        { id: '공통수학 2', label: '1학년 2학기 (공통수학 2) [2022]' }
      ];
    }
    if (activeGradeFilter === 'high2') {
      return [
        { id: '대수', label: '2학년 1학기 (대수) [2022]' },
        { id: '미적분 I', label: '2학년 2학기 (미적분 I) [2022]' },
        { id: '확률과 통계', label: '선택과목 (확률과 통계) [2022]' },
        { id: '기하', label: '선택과목 (기하) [2022]' }
      ];
    }
    if (activeGradeFilter === 'high3') {
      return [
        { id: '미적분', label: '선택과목 (미적분) [2015]' },
        { id: '확률과 통계', label: '선택과목 (확률과 통계) [2015]' },
        { id: '기하', label: '선택과목 (기하) [2015]' }
      ];
    }
    return [
      { id: '공통수학 1', label: '공통수학 1 [2022]' },
      { id: '공통수학 2', label: '공통수학 2 [2022]' },
      { id: '대수', label: '대수 [2022]' },
      { id: '미적분 I', label: '미적분 I [2022]' },
      { id: '미적분', label: '미적분 [2015]' },
      { id: '확률과 통계', label: '확률과 통계' },
      { id: '기하', label: '기하' }
    ];
  };

  // Handle auto fill based on curriculum topic choice
  const handleCurriculumTopicSelect = (topicId: string) => {
    setSelectedCurricTopic(topicId);
    
    // Search topic details in curriculum database
    const foundTopic = sampleCurriculum.find(t => t.id === topicId);

    if (foundTopic) {
      // Determine grade and curriculum label dynamically
      let determinedGrade = '고등학교 2학년 (High School 2)';
      let curriculumLabel = ' [2022 개정]';

      if (activeGradeFilter === 'high1') {
        determinedGrade = '고등학교 1학년 (High School 1)';
        curriculumLabel = ' [2022 개정]';
      } else if (activeGradeFilter === 'high2') {
        determinedGrade = '고등학교 2학년 (High School 2)';
        curriculumLabel = ' [2022 개정]';
      } else if (activeGradeFilter === 'high3') {
        determinedGrade = '고등학교 3학년 (High School 3)';
        curriculumLabel = ' [2015 개정]';
      } else {
        // Fallback for activeGradeFilter === 'all'
        if (foundTopic.subject.includes('공통수학')) {
          determinedGrade = '고등학교 1학년 (High School 1)';
          curriculumLabel = ' [2022 개정]';
        } else if (foundTopic.subject === '대수' || foundTopic.subject === '미적분 I') {
          determinedGrade = '고등학교 2학년 (High School 2)';
          curriculumLabel = ' [2022 개정]';
        } else if (foundTopic.subject === '미적분') {
          determinedGrade = '고등학교 3학년 (High School 3)';
          curriculumLabel = ' [2015 개정]';
        } else {
          // 확률과 통계 or 기하
          determinedGrade = '고등학교 2학년 (High School 2)';
          curriculumLabel = ' [2022 개정]';
        }
      }
        
      setGrade(determinedGrade);
      
      const SUBJECT_MAP: Record<string, string> = {
        '공통수학 1': '공통수학 1 (Common Mathematics 1)',
        '공통수학 2': '공통수학 2 (Common Mathematics 2)',
        '대수': '대수 (Algebra)',
        '미적분 I': '미적분 I (Calculus I)',
        '미적분': '미적분 (Calculus)',
        '확률과 통계': '확률과 통계 (Probability and Statistics)',
        '기하': '기하 (Geometry)'
      };
      
      const subjectBase = SUBJECT_MAP[foundTopic.subject] || foundTopic.subject;
      setSubject(`${subjectBase}${curriculumLabel}`);
      setLargeUnit(foundTopic.bigUnit);
      setMediumUnit(foundTopic.middleUnit);

      // Parse ID for dynamic topic prefix (e.g. "topic-015" -> 15 -> "15)")
      const numPrefix = parseInt(foundTopic.id.split('-')[1]);
      const formattedTopicName = isNaN(numPrefix) 
        ? foundTopic.topicName 
        : `${numPrefix}) ${foundTopic.topicName}`;
      
      setLessonTopic(formattedTopicName);
      setSpecificScope(foundTopic.specificScope.join(', '));
      setKeyConcepts(foundTopic.keyConcepts.join(', '));
      setAchievementStandard(foundTopic.achievementStandard);
      setKeywords(foundTopic.keywords.join(', '));
      setCommonMisconceptions(foundTopic.commonMisconceptions.join(', '));
    }
  };

  const handleGenerateQuestions = () => {
    if (!lessonTopic.trim()) {
      alert('진단 질문을 만들 단원 주제(Lesson Topic)를 설정해야 합니다!');
      return;
    }

    const combinedUnit = mediumUnit.trim() ? `${largeUnit.trim()} ➔ ${mediumUnit.trim()}` : largeUnit.trim();

    const tempScope: TeacherScope = {
      id: existingScope?.id || `scope_${Date.now()}`,
      classId,
      grade,
      subject,
      unit: combinedUnit,
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

    const combinedUnit = mediumUnit.trim() ? `${largeUnit.trim()} ➔ ${mediumUnit.trim()}` : largeUnit.trim();

    const finalScope: TeacherScope = {
      id: existingScope?.id || `scope_${Date.now()}`,
      classId,
      grade,
      subject,
      unit: combinedUnit,
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
            {/* 3-Step Curriculum Filtering Buttons */}
            <div className="flex flex-col gap-4 mt-1 border-t border-[var(--border-color)] pt-3">
              {/* Step 1: Grade Selection */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                  1단계: 학년 선택
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: '전체 학년' },
                    { id: 'high1', label: '고1 (2022 개정)' },
                    { id: 'high2', label: '고2 (2022 개정)' },
                    { id: 'high3', label: '고3 (2015 개정)' }
                  ].map(btn => {
                    const isActive = activeGradeFilter === btn.id;
                    return (
                      <button
                        key={btn.id}
                        type="button"
                        onClick={() => {
                          setActiveGradeFilter(btn.id as any);
                          setActiveSubjectFilter('all');
                        }}
                        className={`px-3.5 py-2 text-xs font-bold rounded-xl border cursor-pointer transition-all ${
                          isActive
                            ? 'bg-purple-600 text-white border-purple-600 shadow-md shadow-purple-100 dark:shadow-none font-extrabold'
                            : 'border-[var(--border-color)] text-[var(--text-main)] bg-[var(--bg-card)] hover:bg-[var(--bg-primary)] hover:border-purple-300'
                        }`}
                      >
                        {btn.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Semester / Subject Selection */}
              <div className="flex flex-col gap-1.5">
                <span className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  2단계: 학기/과목 선택
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveSubjectFilter('all')}
                    className={`px-3.5 py-2 text-xs font-bold rounded-xl border cursor-pointer transition-all ${
                      activeSubjectFilter === 'all'
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100 dark:shadow-none font-extrabold'
                        : 'border-[var(--border-color)] text-[var(--text-main)] bg-[var(--bg-card)] hover:bg-[var(--bg-primary)] hover:border-indigo-300'
                    }`}
                  >
                    전체 과목
                  </button>
                  {getSubjectsForGrade().map(sub => {
                    const isActive = activeSubjectFilter === sub.id;
                    return (
                      <button
                        key={sub.id}
                        type="button"
                        onClick={() => setActiveSubjectFilter(sub.id)}
                        className={`px-3.5 py-2 text-xs font-bold rounded-xl border cursor-pointer transition-all ${
                          isActive
                            ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100 dark:shadow-none font-extrabold'
                            : 'border-[var(--border-color)] text-[var(--text-main)] bg-[var(--bg-card)] hover:bg-[var(--bg-primary)] hover:border-indigo-300'
                        }`}
                      >
                        {sub.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Large/Medium Unit & Topic Buttons */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                  3단계: 단원/학습 주제 선택 (단일 클릭 시 하단 개념설정 자동완성)
                </span>
                {Object.keys(groupedTopics).length === 0 ? (
                  <div className="text-center text-xs text-[var(--text-muted)] py-6 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-color)] border-dashed">
                    선택한 조건에 부합하는 교육과정 단원이 없습니다.
                  </div>
                ) : (
                  <div className="flex flex-col gap-4 max-h-[280px] overflow-y-auto pr-1 bg-[var(--bg-primary)] p-3.5 rounded-xl border border-[var(--border-color)]">
                    {Object.entries(groupedTopics).map(([bigUnit, topics]) => (
                      <div key={bigUnit} className="flex flex-col gap-2">
                        <div className="text-[10px] font-black text-indigo-600 dark:text-indigo-400 border-b border-[var(--border-color)] pb-1">
                          {bigUnit}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {topics.map(t => {
                            const numPrefix = parseInt(t.id.split('-')[1]);
                            const formattedName = isNaN(numPrefix) ? t.topicName : `${numPrefix}) ${t.topicName}`;
                            const isSelected = selectedCurricTopic === t.id;
                            return (
                              <button
                                key={t.id}
                                type="button"
                                onClick={() => handleCurriculumTopicSelect(t.id)}
                                className={`text-left p-3 rounded-xl border text-xs cursor-pointer transition-all flex flex-col gap-1 relative ${
                                  isSelected
                                    ? 'bg-purple-600/10 border-purple-500 text-[var(--text-title)] shadow-sm ring-1 ring-purple-500/30'
                                    : 'border-[var(--border-color)] text-[var(--text-main)] bg-[var(--bg-card)] hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50/5'
                                }`}
                              >
                                <span className="text-[9px] text-[var(--text-muted)] font-bold">
                                  {t.subject} ➔ {t.middleUnit}
                                </span>
                                <span className={`font-semibold text-xs leading-snug ${isSelected ? 'text-purple-600 dark:text-purple-400 font-extrabold' : ''}`}>
                                  {formattedName}
                                </span>
                                {isSelected && (
                                  <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping" />
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
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

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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
                  value={largeUnit}
                  onChange={(e) => setLargeUnit(e.target.value)}
                  className="w-full p-2 rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] text-xs text-[var(--text-title)]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider block mb-1">중단원명</label>
                <input
                  type="text"
                  value={mediumUnit}
                  onChange={(e) => setMediumUnit(e.target.value)}
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
