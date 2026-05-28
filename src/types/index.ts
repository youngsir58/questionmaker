export type TestType = 'daily' | 'weekly' | 'monthly';

export type QuestionLevel = 'basic' | 'standard' | 'advanced';

export type EvaluationLevel = 'high' | 'medium' | 'low';

export interface QuestionLevelConfig {
  level: QuestionLevel;
  question: string;
  expectedKeywords: string[];
  requiredConcepts: string[];
  commonMisconceptions: string[];
  rubric: string;
}

export interface Question {
  id: string;
  testType: TestType;
  topic: string;
  achievementStandard: string;
  sourcePriority: {
    primary: 'Korean high school math curriculum achievement standards';
    secondary: 'CSAT / KICE mock exam / EBS concept-type reference';
  };
  levels: QuestionLevelConfig[];
}

export interface AnswerAttempt {
  id: string;
  studentId: string;
  studentName: string;
  classId: string;
  testType: TestType;
  testDate: string;
  grade: string;
  subject: string;
  unit: string;
  lessonTopic: string;
  teacherDefinedScope: string;
  achievementStandard: string;
  questionId: string;
  questionText: string;
  level: QuestionLevel;
  attemptType: 'official' | 'reinforcement';
  answerText: string;
  voiceTranscript?: string;
  evaluationLevel: EvaluationLevel;
  score: number;
  canProceed: boolean;
  missingConcepts: string[];
  misconceptions: string[];
  feedback: string;
  learningGuide?: string;
  retryQuestion?: string;
  recommendedStudyPlan: string[];
  createdAt: string;
}

export interface AchievementRecord {
  id: string;
  studentId: string;
  classId: string;
  testType: 'daily' | 'weekly' | 'monthly';
  date: string;
  year: number;
  month: number;
  week: number;
  day: string; // e.g., "Monday" or "2026-05-28"
  grade: string;
  subject: string;
  unit: string;
  topic: string;
  scope: string;
  achievementStandard: string;
  reachedLevel: 'basic' | 'standard' | 'advanced';
  evaluationLevel: 'high' | 'medium' | 'low';
  canProceed: boolean;
  totalScore: number;
  conceptScore: number;
  explanationScore: number;
  applicationScore: number;
  reasoningScore: number;
  missingConcepts: string[];
  misconceptions: string[];
}

export interface Class {
  id: string;
  name: string;
  grade: string;
  subject: string;
  studentIds: string[];
  createdAt: string;
}

export interface Student {
  id: string;
  name: string;
  classId: string;
  createdAt: string;
}

export interface TeacherScope {
  id: string;
  classId: string;
  grade: string;
  subject: string;
  unit: string;
  lessonTopic: string;
  specificScope: string;
  keyConcepts: string; // comma separated
  achievementStandard: string;
  keywords: string; // comma separated
  commonMisconceptions: string; // comma separated
  difficulty: 'easy' | 'medium' | 'hard';
  testDate: string;
  createdAt: string;
}

export interface ReviewReminder {
  id: string;
  studentId: string;
  concept: string;
  message: string;
  scheduledDate: string;
  completed: boolean;
}
