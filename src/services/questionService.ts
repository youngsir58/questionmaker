import type { Question, TeacherScope } from '../types';
import { sampleQuestions, generateWeeklyBridgeQuestion, generateMonthlyMasteryQuestion } from '../data/sampleQuestions';

export const questionService = {
  // Fetch questions for a daily topic
  getDailyQuestions(scope: TeacherScope): Question {
    // 1. First, check if we have pre-defined questions for this topic
    const found = sampleQuestions.find(
      q => q.topic.includes(scope.lessonTopic) || scope.lessonTopic.includes(q.topic)
    );

    if (found) {
      return found;
    }

    // 2. If not, generate high-fidelity custom questions based on the teacher's scope settings (Mock AI Generator!)
    return this.generateMockAIQuestions(scope);
  },

  // Generates Weekly Bridge cumulative questions based on scopes of the week
  getWeeklyQuestions(scopes: TeacherScope[]): Question {
    if (scopes.length === 0) {
      return {
        id: 'weekly_empty',
        testType: 'weekly',
        topic: '주간 연결체크',
        achievementStandard: '이번 주에 등록된 학습 범위가 없습니다.',
        sourcePriority: {
          primary: 'Korean high school math curriculum achievement standards',
          secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
        },
        levels: [
          {
            level: 'basic',
            question: '이번 주 교사 모드에서 일일 진단 범위를 1개 이상 생성하면 주간 연결 문제가 자동 합성됩니다. 기본 수학 학습법에 대해 설명해 보세요.',
            expectedKeywords: ['수학', '학습', '개념', '복습'],
            requiredConcepts: ['기본 학습 방법론'],
            commonMisconceptions: [],
            rubric: '수학 복습의 중요성을 언급하면 정답입니다.'
          },
          {
            level: 'standard',
            question: '수학 개념을 타인에게 설명하는 공부 방식의 장점을 인지주의 심리학 관점에서 설명해 보세요.',
            expectedKeywords: ['메타인지', '장기기억', '설명'],
            requiredConcepts: ['메타인지 학습법'],
            commonMisconceptions: [],
            rubric: '메타인지와 설명하기 공부 방식의 이점을 작성하세요.'
          },
          {
            level: 'advanced',
            question: '수학 문제를 만났을 때 공식 대입보다 개념 정의를 떠올리는 것이 중요한 이유를 서술해 보세요.',
            expectedKeywords: ['개념', '원리', '공식', '이해'],
            requiredConcepts: ['개념 기반 문제 해결'],
            commonMisconceptions: [],
            rubric: '단순 암기가 아닌 원리 기반의 해결 논리를 설명하면 정답입니다.'
          }
        ]
      };
    }
    return generateWeeklyBridgeQuestion(scopes);
  },

  // Generates Monthly Mastery cumulative questions based on scopes of the month
  getMonthlyQuestions(scopes: TeacherScope[]): Question {
    if (scopes.length === 0) {
      return {
        id: 'monthly_empty',
        testType: 'monthly',
        topic: '월간 마스터체크',
        achievementStandard: '이번 달에 등록된 학습 범위가 없습니다.',
        sourcePriority: {
          primary: 'Korean high school math curriculum achievement standards',
          secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
        },
        levels: [
          {
            level: 'basic',
            question: '이번 달 학습을 마무리하며, 수학의 기본 개념이 문제 해결의 핵심이 되는 이유를 서술해 보세요.',
            expectedKeywords: ['개념', '해결', '핵심'],
            requiredConcepts: ['수학 학습 성찰'],
            commonMisconceptions: [],
            rubric: '성실한 성찰 답변을 적으면 합격입니다.'
          },
          {
            level: 'standard',
            question: '수학 문제 풀이에서 자주 발생하는 본인만의 실수 유형과 이를 보완하기 위한 오답 정리 습관을 설명해 보세요.',
            expectedKeywords: ['실수', '보완', '오답'],
            requiredConcepts: ['자기 성찰 및 학습 계획'],
            commonMisconceptions: [],
            rubric: '자신의 부족한 점을 기술하면 정답입니다.'
          },
          {
            level: 'advanced',
            question: '수학적 의사소통 능력이 미래 기술 인재에게 미치는 융합적 가치에 대해 본인의 생각을 논리적으로 작성해 보세요.',
            expectedKeywords: ['의사소통', '융합', '논리'],
            requiredConcepts: ['수학적 의사소통'],
            commonMisconceptions: [],
            rubric: '수학적 논리력과 소통의 연계를 서술하세요.'
          }
        ]
      };
    }
    return generateMonthlyMasteryQuestion(scopes);
  },

  // Mock AI Generator that creates questions dynamically based on custom scopes
  generateMockAIQuestions(scope: TeacherScope): Question {
    const keyConceptsList = scope.keyConcepts.split(',').map(c => c.trim()).filter(Boolean);
    const keywordsList = scope.keywords.split(',').map(c => c.trim()).filter(Boolean);
    const misconceptionsList = scope.commonMisconceptions.split(',').map(c => c.trim()).filter(Boolean);

    const mainConcept = keyConceptsList[0] || '단원 핵심 개념';
    const subConcept = keyConceptsList[1] || '관련 공식 및 정리';
    const testTopic = scope.lessonTopic;
    const standard = scope.achievementStandard;

    return {
      id: `ai_${Date.now()}`,
      testType: 'daily',
      topic: `${testTopic} (AI 생성 문항)`,
      achievementStandard: standard || '[교사 지정 성취기준] 단원 학습 성취도를 다면적으로 진단한다.',
      sourcePriority: {
        primary: 'Korean high school math curriculum achievement standards',
        secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
      },
      levels: [
        {
          level: 'basic',
          question: `[개념 설명 문항] ${scope.grade} 과정의 [${testTopic}] 중 가장 핵심이 되는 개념인 [${mainConcept}]의 수학적 정의를 명확하게 제시하고, 이것이 실제 문제 풀이에서 왜 기초 토대가 되는지 그 가치를 서술해 보세요.`,
          expectedKeywords: keywordsList.slice(0, 3).length > 0 ? keywordsList.slice(0, 3) : ['정의', '개념', '이해'],
          requiredConcepts: [mainConcept],
          commonMisconceptions: misconceptionsList.slice(0, 1),
          rubric: `[${mainConcept}]의 올바른 수학적 정의가 언급되어야 하며, 필수 키워드가 최소 1개 이상 들어있어야 합니다.`
        },
        {
          level: 'standard',
          question: `[과정 설명 문항] 다음 개념인 [${subConcept}]을 실제 다수 문제에 적용하여 해결하기 위한 수학적 전개 단계를 순서대로 구체적 예시를 곁들여 설명해 보세요. 특히 이 과정에서 생길 수 있는 연산상의 유의점이나 풀이 순서를 강조해야 합니다.`,
          expectedKeywords: keywordsList.slice(2, 5).length > 0 ? keywordsList.slice(2, 5) : ['과정', '단계', '예시'],
          requiredConcepts: [subConcept],
          commonMisconceptions: misconceptionsList.slice(1, 2),
          rubric: `해결 단계가 1단계, 2단계 등으로 나뉘어 서술되고, [${subConcept}]을 적용하는 논증 전개가 완결되어야 합니다.`
        },
        {
          level: 'advanced',
          question: `[오류 탐지 및 응용] 일부 학생들이 [${testTopic}] 단원을 공부할 때 자주 저지르는 실수인 "${misconceptionsList[0] || '개념 혼동 및 연산 오류'}"에 대해 설명해 보세요. 왜 그런 오해가 생기는지 논리적 원인을 밝히고, 이를 예방하기 위한 올바른 접근 방안을 수학적 근거를 들어 서술해 보세요.`,
          expectedKeywords: [...keywordsList.slice(-2), '오류', '원인', '예방'],
          requiredConcepts: [mainConcept, subConcept],
          commonMisconceptions: misconceptionsList,
          rubric: `제시된 오개념("${misconceptionsList[0] || '개념 혼동'}")을 구체적으로 지목하며 비판하고, 수학적 참과 거짓의 기준을 정확하게 수식으로 대조하여 설명해야 합니다.`
        }
      ]
    };
  }
};
