import type { Class, Student, TeacherScope, Question, AnswerAttempt, ReviewReminder, AchievementRecord } from '../types';
import { sampleQuestions } from '../data/sampleQuestions';

const KEYS = {
  CLASSES: 'qm_classes',
  STUDENTS: 'qm_students',
  SCOPES: 'qm_scopes',
  QUESTIONS: 'qm_questions',
  ATTEMPTS: 'qm_attempts',
  REMINDERS: 'qm_reminders',
  ROLE: 'qm_active_role',
  ACTIVE_STUDENT: 'qm_active_student_id',
  ACTIVE_CLASS: 'qm_active_class_id'
};

export const storageService = {
  get<T>(key: string, defaultValue: T): T {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : defaultValue;
    } catch (e) {
      console.error(`Error reading key ${key} from localStorage`, e);
      return defaultValue;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error writing key ${key} to localStorage`, e);
    }
  },

  // Classes
  getClasses(): Class[] {
    return this.get<Class[]>(KEYS.CLASSES, []);
  },
  saveClasses(classes: Class[]): void {
    this.set(KEYS.CLASSES, classes);
  },

  // Students
  getStudents(): Student[] {
    return this.get<Student[]>(KEYS.STUDENTS, []);
  },
  saveStudents(students: Student[]): void {
    this.set(KEYS.STUDENTS, students);
  },

  // Scopes
  getScopes(): TeacherScope[] {
    return this.get<TeacherScope[]>(KEYS.SCOPES, []);
  },
  saveScopes(scopes: TeacherScope[]): void {
    this.set(KEYS.SCOPES, scopes);
  },

  // Questions
  getQuestions(): Question[] {
    return this.get<Question[]>(KEYS.QUESTIONS, []);
  },
  saveQuestions(questions: Question[]): void {
    this.set(KEYS.QUESTIONS, questions);
  },

  // Attempts
  getAttempts(): AnswerAttempt[] {
    return this.get<AnswerAttempt[]>(KEYS.ATTEMPTS, []);
  },
  saveAttempts(attempts: AnswerAttempt[]): void {
    this.set(KEYS.ATTEMPTS, attempts);
  },

  // Reminders
  getReminders(): ReviewReminder[] {
    return this.get<ReviewReminder[]>(KEYS.REMINDERS, []);
  },
  saveReminders(reminders: ReviewReminder[]): void {
    this.set(KEYS.REMINDERS, reminders);
  },

  // Active User Configuration
  getActiveRole(): 'teacher' | 'student' {
    return this.get<'teacher' | 'student'>(KEYS.ROLE, 'student');
  },
  saveActiveRole(role: 'teacher' | 'student'): void {
    this.set(KEYS.ROLE, role);
  },

  getActiveStudentId(): string {
    return this.get<string>(KEYS.ACTIVE_STUDENT, 'std_chulsoo');
  },
  saveActiveStudentId(id: string): void {
    this.set(KEYS.ACTIVE_STUDENT, id);
  },

  getActiveClassId(): string {
    return this.get<string>(KEYS.ACTIVE_CLASS, 'class_a');
  },
  saveActiveClassId(id: string): void {
    this.set(KEYS.ACTIVE_CLASS, id);
  },

  // Clear All
  clearAll(): void {
    localStorage.clear();
    this.initializeMockData(true);
  },

  // Initialize data if empty
  initializeMockData(force = false): void {
    if (!force && this.getClasses().length > 0) {
      return; // Already initialized
    }

    console.log('Initializing mock data for MathLog...');

    // 1. Classes
    const mockClasses: Class[] = [
      {
        id: 'class_a',
        name: '고1 공통수학1 - A반',
        grade: 'High School 1',
        subject: 'Common Mathematics 1',
        studentIds: ['std_chulsoo', 'std_younghee', 'std_minsu', 'std_jiwoo'],
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'class_b',
        name: '고2 수학I - B반',
        grade: 'High School 2',
        subject: 'Mathematics I',
        studentIds: ['std_woosung', 'std_jimin'],
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    ];
    this.saveClasses(mockClasses);

    // 2. Students
    const mockStudents: Student[] = [
      { id: 'std_chulsoo', name: '김철수', classId: 'class_a', createdAt: mockClasses[0].createdAt },
      { id: 'std_younghee', name: '이영희', classId: 'class_a', createdAt: mockClasses[0].createdAt },
      { id: 'std_minsu', name: '박민수', classId: 'class_a', createdAt: mockClasses[0].createdAt },
      { id: 'std_jiwoo', name: '최지우', classId: 'class_a', createdAt: mockClasses[0].createdAt },
      { id: 'std_woosung', name: '정우성', classId: 'class_b', createdAt: mockClasses[1].createdAt },
      { id: 'std_jimin', name: '한지민', classId: 'class_b', createdAt: mockClasses[1].createdAt }
    ];
    this.saveStudents(mockStudents);

    // 3. Scopes set by teacher
    const now = new Date();
    const formatDate = (daysAgo: number) => {
      const d = new Date();
      d.setDate(now.getDate() - daysAgo);
      return d.toISOString().split('T')[0];
    };

    const mockScopes: TeacherScope[] = [
      {
        id: 'scope_remainder',
        classId: 'class_a',
        grade: '고등학교 1학년 (High School 1)',
        subject: '공통수학 1 (Common Mathematics 1)',
        unit: '다항식 (Polynomials)',
        lessonTopic: '나머지정리와 인수정리 (Remainder Theorem and Factor Theorem)',
        specificScope: '항등식의 성질, 나머지정리의 원리, 인수정리를 이용한 다항식의 인수분해',
        keyConcepts: '나머지정리, 인수정리, 항등식, 조립제법',
        achievementStandard: '[10공수1-01-02] 나머지정리의 의미를 이해하고, 이를 활용하여 다항식을 인수분해할 수 있다.',
        keywords: '나머지정리, 인수정리, 나눗셈 관계식, 조립제법, 목과 나머지',
        commonMisconceptions: '나머지의 차수가 나누는 식보다 낮아야 함을 망각함, 관계식을 항등식으로 이해하지 못함',
        difficulty: 'medium',
        testDate: formatDate(7),
        createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'scope_quad_relation',
        classId: 'class_a',
        grade: '고등학교 1학년 (High School 1)',
        subject: '공통수학 1 (Common Mathematics 1)',
        unit: '이차방정식과 이차함수 (Quadratic Equations and Functions)',
        lessonTopic: '이차방정식과 이차함수의 관계 (Relation between Quadratic Equations and Functions)',
        specificScope: '이차함수의 그래프와 x축의 교점, 이차방정식의 실근의 개수, 판별식 D의 기하학적 의미',
        keyConcepts: 'x축 교점, 판별식, 실근, 위치 관계',
        achievementStandard: '[10공수1-02-03] 이차함수의 그래프와 직선의 위치 관계를 이해한다.',
        keywords: '판별식, 교점, 실근, 위치 관계, x축, 서로 다른 두 점, 접한다',
        commonMisconceptions: 'D < 0 일 때 그래프가 가라앉는다고 오해함, 교점의 개수와 실근 개수의 시각적 불일치',
        difficulty: 'medium',
        testDate: formatDate(3),
        createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'scope_quad_maxmin',
        classId: 'class_a',
        grade: '고등학교 1학년 (High School 1)',
        subject: '공통수학 1 (Common Mathematics 1)',
        unit: '이차방정식과 이차함수 (Quadratic Equations and Functions)',
        lessonTopic: '이차함수의 최대와 최소 (Maximum and Minimum of Quadratic Functions)',
        specificScope: '꼭짓점 구하기, 대칭축의 성질, 완전제곱식 변형, 제한된 범위에서의 최댓값/최솟값',
        keyConcepts: '꼭짓점, 대칭축, 완전제곱식, 최댓값, 최솟값',
        achievementStandard: '[10공수1-02-04] 이차함수의 최대와 최소를 이해하고, 이를 활용하여 문제를 해결할 수 있다.',
        keywords: '꼭짓점, 대칭축, 완전제곱식, 제한된 범위, 그래프 개형',
        commonMisconceptions: '최대/최소값을 꼭짓점의 x좌표로 혼동, 제한범위 내 대칭축의 위치를 무시하는 계산 실수',
        difficulty: 'hard',
        testDate: formatDate(0), // Today
        createdAt: new Date(now.getTime()).toISOString()
      }
    ];
    this.saveScopes(mockScopes);

    // 4. Base Questions
    this.saveQuestions(sampleQuestions);

    // 5. Attempts for Chulsoo to make the achievement graph look filled and beautiful
    // Chulsoo has completed remainder theorem (7 days ago), quadratic relation (3 days ago), and a weekly bridge.
    // Also, he has some mock attempts.
    const mockAttempts: AnswerAttempt[] = [
      // 1. Remainder Theorem - Basic (7 days ago) - HIGH
      {
        id: 'att_chulsoo_1_b',
        studentId: 'std_chulsoo',
        studentName: '김철수',
        classId: 'class_a',
        testType: 'daily',
        testDate: formatDate(7),
        grade: 'Common Mathematics 1',
        subject: 'Common Mathematics 1',
        unit: '다항식 (Polynomials)',
        lessonTopic: '나머지정리와 인수정리 (Remainder Theorem and Factor Theorem)',
        teacherDefinedScope: '항등식의 성질, 나머지정리의 원리, 인수정리를 이용한 다항식의 인수분해',
        achievementStandard: '[10공수1-01-02] 나머지정리의 의미를 이해하고, 이를 활용하여 다항식을 인수분해할 수 있다.',
        questionId: 'q_remainder_theorem',
        questionText: '다항식 f(x)를 일차식 x - a로 나눌 때의 나머지가 f(a)가 되는 이유를 다항식의 나눗셈 관계식 f(x) = (x - a)Q(x) + R을 적어 증명하고, 이를 활용해 f(x) = 2x³ - 4x + 1을 x - 2로 나눈 나머지를 구해 보세요.',
        level: 'basic',
        attemptType: 'official',
        answerText: '다항식 나눗셈 관계식에 의해 f(x) = (x - a)Q(x) + R입니다. 이것은 x에 대한 항등식이므로 양변에 x = a를 대입할 수 있습니다. 대입하면 f(a) = (a - a)Q(a) + R이 되는데, a - a = 0이므로 f(a) = R이 성립합니다. 따라서 나머지는 f(a)와 같습니다. f(x) = 2x^3 - 4x + 1을 x - 2로 나눈 나머지는 f(2) = 2(8) - 4(2) + 1 = 16 - 8 + 1 = 9입니다.',
        evaluationLevel: 'high',
        score: 95,
        canProceed: true,
        missingConcepts: [],
        misconceptions: [],
        feedback: '식과 대입법을 완벽히 제시하여 증명을 잘 마무리하였습니다. 나머지 계산 값인 9 또한 정확합니다.',
        recommendedStudyPlan: ['인수정리의 고급 응용 단계를 학습하세요.'],
        createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString()
      },
      // Remainder Theorem - Standard (7 days ago) - MEDIUM
      {
        id: 'att_chulsoo_1_s',
        studentId: 'std_chulsoo',
        studentName: '김철수',
        classId: 'class_a',
        testType: 'daily',
        testDate: formatDate(7),
        grade: 'Common Mathematics 1',
        subject: 'Common Mathematics 1',
        unit: '다항식 (Polynomials)',
        lessonTopic: '나머지정리와 인수정리 (Remainder Theorem and Factor Theorem)',
        teacherDefinedScope: '항등식의 성질, 나머지정리의 원리, 인수정리를 이용한 다항식의 인수분해',
        achievementStandard: '[10공수1-01-02] 나머지정리의 의미를 이해하고, 이를 활용하여 다항식을 인수분해할 수 있다.',
        questionId: 'q_remainder_theorem',
        questionText: '다항식 f(x)를 x - 1로 나눈 나머지는 3이고, x - 2로 나눈 나머지는 5입니다. f(x)를 이차식 (x - 1)(x - 2)로 나눈 나머지를 R(x)라고 할 때, R(x)를 ax + b 형태로 설정해야 하는 이유와 실제로 R(x)를 구하는 연립방정식 풀이를 설명해 보세요.',
        level: 'standard',
        attemptType: 'official',
        answerText: '나누는 다항식이 (x-1)(x-2)로 2차식이니까, 나머지는 나누는 식의 차수보다 항상 낮아야 해요. 그래서 1차식 형태인 ax+b로 설정해야 합니다. 관계식을 쓰면 f(x) = (x-1)(x-2)Q(x) + ax+b 입니다. x=1 대입하면 f(1) = a+b = 3이고, x=2 대입하면 f(2) = 2a+b = 5입니다. 이 두 식을 연립해 보면 a = 2, b = 1이 나옵니다. 따라서 R(x) = 2x+1 입니다.',
        evaluationLevel: 'high',
        score: 98,
        canProceed: true,
        missingConcepts: [],
        misconceptions: [],
        feedback: '나머지 다항식의 차수 한계를 정확하게 서술하였고 연립과정을 깔끔하게 작성하였습니다.',
        recommendedStudyPlan: [],
        createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000).toISOString()
      },
      // Remainder Theorem - Advanced (7 days ago) - LOW (Fail)
      {
        id: 'att_chulsoo_1_a1',
        studentId: 'std_chulsoo',
        studentName: '김철수',
        classId: 'class_a',
        testType: 'daily',
        testDate: formatDate(7),
        grade: 'Common Mathematics 1',
        subject: 'Common Mathematics 1',
        unit: '다항식 (Polynomials)',
        lessonTopic: '나머지정리와 인수정리 (Remainder Theorem and Factor Theorem)',
        teacherDefinedScope: '항등식의 성질, 나머지정리의 원리, 인수정리를 이용한 다항식의 인수분해',
        achievementStandard: '[10공수1-01-02] 나머지정리의 의미를 이해하고, 이를 활용하여 다항식을 인수분해할 수 있다.',
        questionId: 'q_remainder_theorem',
        questionText: '인수정리란 무엇인지 정의를 설명하고, 다항식 f(x) = x³ - 3x² + 4가 f(-1) = 0임을 이용하여 인수분해되는 과정을 조립제법이나 대수적 변형 과정을 담아 단계별로 서술해 보세요.',
        level: 'advanced',
        attemptType: 'official',
        answerText: '인수정리는 f(x)를 나누는 것인데 잘 모르겠습니다. 조립제법을 쓰는 법만 압니다.',
        evaluationLevel: 'low',
        score: 30,
        canProceed: false,
        missingConcepts: ['인수정리의 엄밀한 정의', 'f(a)=0과 인수의 대수적 관계'],
        misconceptions: ['조립제법을 단지 기계적 연산 도구로만 이해함'],
        feedback: '인수정리의 본질적인 정의와 인수분해 연결을 놓치고 있습니다. 피드백 가이드를 읽고 다시 도전해봅시다.',
        recommendedStudyPlan: ['인수정리의 뜻과 인수분해 연계성 재학습'],
        createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000 + 10 * 60 * 1000).toISOString()
      },
      // Remainder Theorem - Advanced (7 days ago) - Reinforcement Retry - HIGH (Pass)
      {
        id: 'att_chulsoo_1_a2',
        studentId: 'std_chulsoo',
        studentName: '김철수',
        classId: 'class_a',
        testType: 'daily',
        testDate: formatDate(7),
        grade: 'Common Mathematics 1',
        subject: 'Common Mathematics 1',
        unit: '다항식 (Polynomials)',
        lessonTopic: '나머지정리와 인수정리 (Remainder Theorem and Factor Theorem)',
        teacherDefinedScope: '항등식의 성질, 나머지정리의 원리, 인수정리를 이용한 다항식의 인수분해',
        achievementStandard: '[10공수1-01-02] 나머지정리의 의미를 이해하고, 이를 활용하여 다항식을 인수분해할 수 있다.',
        questionId: 'q_remainder_theorem',
        questionText: '인수정리의 정의를 다시 정립하고 f(x) = x³ - 3x² + 4를 (x+1)로 나눌 때 조립제법으로 몫을 구해 최종 인수분해해 보세요. (강화 문제)',
        level: 'advanced',
        attemptType: 'reinforcement',
        answerText: '인수정리는 다항식 f(x)에 x=a를 대입했을 때 f(a)=0 이면, f(x)가 일차식 (x-a)를 인수로 가져서 나누어 떨어진다는 정리입니다. f(-1)=0이므로 f(x)는 (x+1)로 나누어 떨어집니다. 조립제법 계수 1, -3, 0, 4 에 대해 -1로 수행하면 몫의 계수는 1, -4, 4가 됩니다. 즉 몫은 x²-4x+4입니다. 이것은 완전제곱식 (x-2)²이 되므로, 최종 인수분해 결과는 f(x) = (x+1)(x-2)² 입니다.',
        evaluationLevel: 'high',
        score: 92,
        canProceed: true,
        missingConcepts: [],
        misconceptions: [],
        feedback: '정의를 명확히 이해하고 조립제법과 최종 인수분해 식까지 정확하게 찾아내어 성공적으로 극복했습니다!',
        recommendedStudyPlan: [],
        createdAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000 + 15 * 60 * 1000).toISOString()
      },

      // 2. Quadratic relation (3 days ago) - Complete High (Basic->Standard->Advanced in one go)
      {
        id: 'att_chulsoo_2_b',
        studentId: 'std_chulsoo',
        studentName: '김철수',
        classId: 'class_a',
        testType: 'daily',
        testDate: formatDate(3),
        grade: 'Common Mathematics 1',
        subject: 'Common Mathematics 1',
        unit: '이차방정식과 이차함수 (Quadratic Equations and Functions)',
        lessonTopic: '이차방정식과 이차함수의 관계 (Relation between Quadratic Equations and Functions)',
        teacherDefinedScope: '이차함수의 그래프와 x축의 교점, 이차방정식의 실근의 개수, 판별식 D의 기하학적 의미',
        achievementStandard: '[10공수1-02-03] 이차함수의 그래프와 직선의 위치 관계를 이해한다.',
        questionId: 'q_quad_relation',
        questionText: '이차함수 y = ax² + bx + c의 그래프가 x축과 만나는 교점의 개수와 이차방정식 ax² + bx + c = 0의 판별식 D의 부호 사이에는 어떤 관계가 있는지 기하학적 의미를 담아 설명해 보세요.',
        level: 'basic',
        attemptType: 'official',
        answerText: '이차함수와 x축의 교점의 x좌표는 y=0일 때의 이차방정식 ax²+bx+c=0의 실근과 같습니다. 판별식 D는 방정식 실근의 성질을 구별해주는데, D>0 이면 실근 2개라 교점도 2개(그래프가 x축과 두 점에서 만남), D=0 이면 중근이라 교점 1개(접함), D<0 이면 실근이 없어 교점이 0개(안 만남)인 위치관계를 가집니다.',
        evaluationLevel: 'high',
        score: 94,
        canProceed: true,
        missingConcepts: [],
        misconceptions: [],
        feedback: '함수 교점의 x좌표가 방정식의 실근과 같다는 핵심을 정확하게 기하학적 의미와 매치했습니다.',
        recommendedStudyPlan: [],
        createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'att_chulsoo_2_s',
        studentId: 'std_chulsoo',
        studentName: '김철수',
        classId: 'class_a',
        testType: 'daily',
        testDate: formatDate(3),
        grade: 'Common Mathematics 1',
        subject: 'Common Mathematics 1',
        unit: '이차방정식과 이차함수 (Quadratic Equations and Functions)',
        lessonTopic: '이차방정식과 이차함수의 관계 (Relation between Quadratic Equations and Functions)',
        teacherDefinedScope: '이차함수의 그래프와 x축의 교점, 이차방정식의 실근의 개수, 판별식 D의 기하학적 의미',
        achievementStandard: '[10공수1-02-03] 이차함수의 그래프와 직선의 위치 관계를 이해한다.',
        questionId: 'q_quad_relation',
        questionText: '이차함수 y = x² - 2kx + k² - 4의 그래프가 x축과 만나는 두 교점 사이의 거리가 6일 때, 실수 k의 값을 구하는 논리적 과정을 설명해 보세요.',
        level: 'standard',
        attemptType: 'official',
        answerText: 'x축과의 교점 x² - 2kx + k² - 4 = 0의 두 실근을 a, b라 하면 두 근의 합 a+b = 2k이고 곱 ab = k²-4 입니다. 두 교점 사이의 거리는 두 근의 차인 |a-b| = 6 입니다. (a-b)² = (a+b)² - 4ab 이므로 대입하면 36 = (2k)² - 4(k²-4) = 4k² - 4k² + 16 = 16이 나옵니다. 그런데 36=16 이라는 말이 안 되는 식이 나옵니다. 이는 k값에 상관없이 항상 거리가 4라는 뜻입니다. 따라서 거리가 6이 되는 실수 k는 존재할 수 없습니다. 문제의 조건을 만족하는 k는 없습니다.',
        evaluationLevel: 'high',
        score: 100,
        canProceed: true,
        missingConcepts: [],
        misconceptions: [],
        feedback: '계산 과정에서 수식의 기하학적 모순을 잡아내어 k가 존재하지 않는다는 논리적 정답을 이끌어냈습니다. 대단합니다!',
        recommendedStudyPlan: [],
        createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 + 5 * 60 * 1000).toISOString()
      },
      {
        id: 'att_chulsoo_2_a',
        studentId: 'std_chulsoo',
        studentName: '김철수',
        classId: 'class_a',
        testType: 'daily',
        testDate: formatDate(3),
        grade: 'Common Mathematics 1',
        subject: 'Common Mathematics 1',
        unit: '이차방정식과 이차함수 (Quadratic Equations and Functions)',
        lessonTopic: '이차방정식과 이차함수의 관계 (Relation between Quadratic Equations and Functions)',
        teacherDefinedScope: '이차함수의 그래프와 x축의 교점, 이차방정식의 실근의 개수, 판별식 D의 기하학적 의미',
        achievementStandard: '[10공수1-02-03] 이차함수의 그래프와 직선의 위치 관계를 이해한다.',
        questionId: 'q_quad_relation',
        questionText: '이차함수 y = x² - 2x + 3의 그래프와 직선 y = mx - 1이 적어도 한 점에서 만나기 위한 실수 m의 값의 범위를 판별식 D를 사용하여 구하고, 판별식이 왜 이 범위를 보장하는지 기하학적으로 설명해 보세요.',
        level: 'advanced',
        attemptType: 'official',
        answerText: '두 식을 연립하면 x² - 2x + 3 = mx - 1 이므로 정리하면 x² - (m+2)x + 4 = 0 입니다. 이 방정식의 판별식 D = (m+2)² - 16 >= 0 이어야 교점이 생깁니다. (m+2)² >= 16 이므로 m+2 >= 4 또는 m+2 <= -4 입니다. 즉 m >= 2 또는 m <= -6 입니다. 기하학적으로 m=2, m=-6 일 때 직선이 포물선과 딱 접하는 상황(교점 1개)이 되고, m이 이 범위 바깥으로 벌어지면 기울기가 더 가팔라져서 포물선을 두 번 통과(교점 2개)하게 되므로 만나게 됩니다.',
        evaluationLevel: 'high',
        score: 95,
        canProceed: true,
        missingConcepts: [],
        misconceptions: [],
        feedback: '연립식 유도, 판별식 범위 설정, 그리고 접하는 경계면(m=-6, 2) 기준 기울기가 변할 때 생기는 교점의 기하학적 성질을 정확히 해설하였습니다.',
        recommendedStudyPlan: [],
        createdAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 + 12 * 60 * 1000).toISOString()
      }
    ];
    this.saveAttempts(mockAttempts);

    // 6. Reminders
    const mockReminders: ReviewReminder[] = [
      {
        id: 'rem_1',
        studentId: 'std_chulsoo',
        concept: '나머지정리와 인수정리 차수 구조',
        message: '😵 지금 안 보면 다음 주의 내가 울어요. (R(x) 차수 조건 복습)',
        scheduledDate: formatDate(1),
        completed: false
      },
      {
        id: 'rem_2',
        studentId: 'std_chulsoo',
        concept: '이차방정식과 판별식의 관계',
        message: '📌 수학 개념 잠깐 소환! D < 0 일때 포물선은 붕 떠있습니다!',
        scheduledDate: formatDate(-1), // Due in future
        completed: false
      }
    ];
    this.saveReminders(mockReminders);

    // Save Active configuration
    this.saveActiveRole('student');
    this.saveActiveStudentId('std_chulsoo');
    this.saveActiveClassId('class_a');

    console.log('Mock data successfully initialized.');
  }
};
