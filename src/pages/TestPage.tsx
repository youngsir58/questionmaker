import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import type { TestType, Question, QuestionLevel, AnswerAttempt, TeacherScope } from '../types';
import { questionService } from '../services/questionService';
import { evaluationService } from '../services/evaluationService';
import type { EvaluationResult } from '../services/evaluationService';
import { storageService } from '../services/storageService';
import { reminderService } from '../services/reminderService';
import { TestInterface } from '../components/test/TestInterface';
import { FeedbackReport } from '../components/test/FeedbackReport';

interface TestPageProps {
  scopeId: string;
  testType: TestType;
  onFinishTest: (lastAttemptId: string) => void;
  onQuit: () => void;
}

export const TestPage: React.FC<TestPageProps> = ({
  scopeId,
  testType,
  onFinishTest,
  onQuit
}) => {
  const [scope, setScope] = useState<TeacherScope | null>(null);
  const [questions, setQuestions] = useState<Question | null>(null);

  // Test State Machine
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 0 to 2
  const [currentLevel, setCurrentLevel] = useState<QuestionLevel>('basic'); // basic, standard, advanced
  const [currentAttempt, setCurrentAttempt] = useState<AnswerAttempt | null>(null);
  
  // Reinforcement/Show Feedback State
  const [showFeedback, setShowFeedback] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);

  // Initialize and load scope & question details
  useEffect(() => {
    const allScopes = storageService.getScopes();
    let currentScope: TeacherScope | null = null;
    let questionsData: Question | null = null;

    if (testType === 'daily') {
      currentScope = allScopes.find(s => s.id === scopeId) || null;
      if (currentScope) {
        setScope(currentScope);
        questionsData = questionService.getDailyQuestions(currentScope);
      }
    } else if (testType === 'weekly') {
      // Get all scopes from this week
      const weeklyScopes = allScopes; // Simplify for prototype - use all scopes
      questionsData = questionService.getWeeklyQuestions(weeklyScopes);
      
      currentScope = {
        id: 'weekly_bridge',
        classId: 'class_a',
        grade: '고1 공통수학1',
        subject: '공통수학 1',
        unit: '주간 누적 개념',
        lessonTopic: '주간 연결체크 (Weekly Bridge)',
        specificScope: '이번 주 누적 학습 범위 개념 통합 진단',
        keyConcepts: '이번 주 개념 전체',
        achievementStandard: '누적 개념의 종합적 해석 및 수식-기하 연계',
        keywords: '',
        commonMisconceptions: '',
        difficulty: 'medium',
        testDate: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
      };
      setScope(currentScope);
    } else if (testType === 'monthly') {
      const monthlyScopes = allScopes; // Simplify for prototype - use all scopes
      questionsData = questionService.getMonthlyQuestions(monthlyScopes);
      
      currentScope = {
        id: 'monthly_mastery',
        classId: 'class_a',
        grade: '고1 공통수학1',
        subject: '공통수학 1',
        unit: '월간 누적 범위',
        lessonTopic: '월간 마스터체크 (Monthly Mastery)',
        specificScope: '이번 달 누적 학습 범위 융합 및 신유형 추론',
        keyConcepts: '이번 달 개념 전체',
        achievementStandard: '단원 통합형 개념 전이 적용 및 추론',
        keywords: '',
        commonMisconceptions: '',
        difficulty: 'hard',
        testDate: new Date().toISOString().split('T')[0],
        createdAt: new Date().toISOString()
      };
      setScope(currentScope);
    }

    setQuestions(questionsData);
    setCurrentQuestionIndex(0);
    setCurrentLevel('basic');
    setShowFeedback(false);
  }, [scopeId, testType]);

  if (!scope || !questions) {
    return (
      <div className="flex-grow flex items-center justify-center p-8">
        <div className="text-center text-xs text-[var(--text-muted)]">
          진단 문항을 로딩하고 있습니다...
        </div>
      </div>
    );
  }

  // Handle student submitting their main/official answer
  const handleSubmitAnswer = (answerText: string, voiceUsed: boolean) => {
    if (!questions) return;
    setIsEvaluating(true);

    // Simulated evaluation delay for realistic feel!
    setTimeout(() => {
      const studentId = storageService.getActiveStudentId();
      const studentName = '김철수'; // Hardcoded prototype student
      const classId = storageService.getActiveClassId();

      // Core evaluation
      const evalResult: EvaluationResult = evaluationService.evaluateAnswer(
        questions,
        currentLevel,
        answerText,
        'official'
      );

      // Create new answer attempt object
      const attemptId = `att_${Date.now()}`;
      const newAttempt: AnswerAttempt = {
        id: attemptId,
        studentId,
        studentName,
        classId,
        testType,
        testDate: scope.testDate,
        grade: scope.grade,
        subject: scope.subject,
        unit: scope.unit,
        lessonTopic: scope.lessonTopic,
        teacherDefinedScope: scope.specificScope,
        achievementStandard: questions.achievementStandard,
        questionId: questions.id,
        questionText: questions.levels.find(l => l.level === currentLevel)?.question || '',
        level: currentLevel,
        attemptType: 'official',
        answerText,
        voiceTranscript: voiceUsed ? answerText : undefined,
        evaluationLevel: evalResult.evaluationLevel,
        score: evalResult.score,
        canProceed: evalResult.canProceed,
        missingConcepts: evalResult.missingConcepts,
        misconceptions: evalResult.misconceptions,
        feedback: evalResult.feedback,
        learningGuide: evalResult.learningGuide,
        retryQuestion: evalResult.retryQuestion,
        recommendedStudyPlan: evalResult.recommendedStudyPlan,
        createdAt: new Date().toISOString()
      };

      // Save to localStorage
      const allAttempts = storageService.getAttempts();
      allAttempts.push(newAttempt);
      storageService.saveAttempts(allAttempts);

      // Schedule review reminder 2-3 days later in all cases (even correct ones need review!)
      if (evalResult.canProceed) {
        reminderService.scheduleReminder(studentId, `${scope.lessonTopic} - ${currentLevel}`, 3);
      }

      setCurrentAttempt(newAttempt);
      setShowFeedback(true);
      setIsEvaluating(false);
    }, 1200);
  };

  // Handle student submitting their reinforcement/retry answer
  const handleRetrySubmit = (retryAnswerText: string, voiceUsed: boolean) => {
    if (!questions || !currentAttempt) return;
    setIsEvaluating(true);

    setTimeout(() => {
      const studentId = storageService.getActiveStudentId();
      const studentName = '김철수';
      const classId = storageService.getActiveClassId();

      // Evaluate the retry answer
      const evalResult: EvaluationResult = evaluationService.evaluateAnswer(
        questions,
        currentLevel,
        retryAnswerText,
        'reinforcement'
      );

      const attemptId = `att_retry_${Date.now()}`;
      const newAttempt: AnswerAttempt = {
        id: attemptId,
        studentId,
        studentName,
        classId,
        testType,
        testDate: scope.testDate,
        grade: scope.grade,
        subject: scope.subject,
        unit: scope.unit,
        lessonTopic: scope.lessonTopic,
        teacherDefinedScope: scope.specificScope,
        achievementStandard: questions.achievementStandard,
        questionId: questions.id,
        questionText: currentAttempt.retryQuestion || '',
        level: currentLevel,
        attemptType: 'reinforcement',
        answerText: retryAnswerText,
        voiceTranscript: voiceUsed ? retryAnswerText : undefined,
        evaluationLevel: evalResult.evaluationLevel,
        score: evalResult.score,
        canProceed: evalResult.canProceed, // High or Medium allows proceeding
        missingConcepts: evalResult.missingConcepts,
        misconceptions: evalResult.misconceptions,
        feedback: evalResult.feedback,
        // No further retry questions on second failure in this prototype
        recommendedStudyPlan: evalResult.recommendedStudyPlan,
        createdAt: new Date().toISOString()
      };

      // Save attempts
      const allAttempts = storageService.getAttempts();
      allAttempts.push(newAttempt);
      storageService.saveAttempts(allAttempts);

      // If retry failed (still Low), register weak concepts and schedule reminder
      if (!evalResult.canProceed) {
        reminderService.scheduleReminder(studentId, `${scope.lessonTopic} - ${currentLevel} (약점 재복습)`, 2);
      } else {
        // Success on retry! Schedule regular reminder
        reminderService.scheduleReminder(studentId, `${scope.lessonTopic} - ${currentLevel}`, 3);
      }

      setCurrentAttempt(newAttempt);
      setShowFeedback(true);
      setIsEvaluating(false);
    }, 1200);
  };

  // Move to next question or level based on current state
  const handleNextStep = () => {
    if (!currentAttempt) return;

    setShowFeedback(false);

    // If passed or no more retry available, determine next level/question
    if (currentAttempt.canProceed) {
      // Progress to next level of same question
      if (currentLevel === 'basic') {
        setCurrentLevel('standard');
        setCurrentAttempt(null);
      } else if (currentLevel === 'standard') {
        setCurrentLevel('advanced');
        setCurrentAttempt(null);
      } else {
        // Reached end of advanced. Move to next question!
        advanceToNextQuestion();
      }
    } else {
      // If retry failed again, we STOP normal progression for this question
      // Move directly to next main question, resetting level to Basic
      advanceToNextQuestion();
    }
  };

  const advanceToNextQuestion = () => {
    const nextQIndex = currentQuestionIndex + 1;
    // We have 3 questions total (index 0, 1, 2)
    if (nextQIndex < 3) {
      setCurrentQuestionIndex(nextQIndex);
      setCurrentLevel('basic');
      setCurrentAttempt(null);
    } else {
      // Completed all 3 questions! Complete test and go to final result page
      onFinishTest(currentAttempt?.id || '');
    }
  };

  const activeLevelConfig = questions.levels.find(l => l.level === currentLevel);

  return (
    <div className="flex-grow bg-[var(--bg-primary)] py-8">
      {!showFeedback ? (
        <TestInterface
          testType={testType}
          topic={scope.lessonTopic}
          scopeText={scope.specificScope}
          achievementStandard={scope.achievementStandard}
          currentQuestionIndex={currentQuestionIndex}
          totalQuestions={3}
          currentLevel={currentLevel}
          questionText={activeLevelConfig?.question || ''}
          onSubmitAnswer={handleSubmitAnswer}
          onQuit={onQuit}
        />
      ) : (
        currentAttempt && (
          <FeedbackReport
            attempt={currentAttempt}
            onRetrySubmit={handleRetrySubmit}
            onNextQuestion={handleNextStep}
            onFinishTest={() => onFinishTest(currentAttempt.id)}
            isEvaluating={isEvaluating}
          />
        )
      )}

      {/* Evaluation loader overlay */}
      {isEvaluating && (
        <div className="fixed inset-0 bg-black/45 backdrop-blur-sm z-50 flex items-center justify-center flex-col gap-4 text-white">
          <div className="p-4 bg-indigo-600 rounded-full animate-bounce shadow-xl">
            <RefreshCw size={36} className="animate-spin text-white" />
          </div>
          <span className="text-sm font-bold tracking-wide">
            수학 개념 답변을 정밀 진단 채점하는 중입니다...
          </span>
          <p className="text-xs text-slate-300">
            성취 기준 및 오개념 여부를 매핑하고 있습니다. 잠시만 기다려 주세요.
          </p>
        </div>
      )}
    </div>
  );
};
