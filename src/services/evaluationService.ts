import type { EvaluationLevel, Question, QuestionLevel } from '../types';

export interface EvaluationResult {
  evaluationLevel: EvaluationLevel;
  score: number;
  canProceed: boolean;
  missingConcepts: string[];
  misconceptions: string[];
  feedback: string;
  learningGuide?: string;
  retryQuestion?: string;
  recommendedStudyPlan: string[];
}

export const evaluationService = {
  evaluateAnswer(
    question: Question,
    level: QuestionLevel,
    answerText: string,
    attemptType: 'official' | 'reinforcement'
  ): EvaluationResult {
    const trimmed = answerText.trim();
    
    // 1. Check for blank or "don't know" answers
    const blankKeywords = ['모르', '패스', 'pass', '잘 모름', '모르겠다', '글쎄요', '아직 안 배웠', '생각이 안'];
    const isBlankOrUnknown = trimmed.length < 5 || blankKeywords.some(bk => trimmed.includes(bk));

    const levelConfig = question.levels.find(l => l.level === level);
    if (!levelConfig) {
      return {
        evaluationLevel: 'low',
        score: 10,
        canProceed: false,
        missingConcepts: ['개념 확인 필요'],
        misconceptions: ['답변 미비'],
        feedback: '답변을 확인할 수 없습니다. 개념 학습이 더 필요한 상태입니다.',
        recommendedStudyPlan: ['기본 동영상 강의 시청 및 교과서 기본 개념 복습'],
        learningGuide: '개념을 다시 복습해 주세요.'
      };
    }

    if (isBlankOrUnknown) {
      return {
        evaluationLevel: 'low',
        score: 15,
        canProceed: false,
        missingConcepts: levelConfig.requiredConcepts,
        misconceptions: ['무응답 혹은 개념 이해 부족'],
        feedback: '개념 키워드를 활용해 구체적으로 설명해야 정밀한 진단이 가능해요. 조금만 더 용기를 내서 알고 있는 내용을 서술해 볼까요?',
        recommendedStudyPlan: [`${levelConfig.requiredConcepts.join(', ')} 기본 내용 정리 노트를 작성하세요.`],
        learningGuide: this.getLearningGuide(question.id, level),
        retryQuestion: this.getRetryQuestion(question, level, attemptType)
      };
    }

    // 2. Keyword check
    const matchedKeywords = levelConfig.expectedKeywords.filter(kw => trimmed.includes(kw));
    const keywordRatio = matchedKeywords.length / levelConfig.expectedKeywords.length;

    // 3. Misconception check
    const detectedMisconceptions: string[] = [];
    levelConfig.commonMisconceptions.forEach(mc => {
      // Basic check: if student uses phrases typical of the misconception
      const mcTermsMap: Record<string, string[]> = {
        '최댓값과 최솟값 자체를 꼭짓점의 x좌표': ['최대값은 p', '최소값은 p', 'x좌표가 최대', 'x좌표가 최소'],
        '양 끝값만 비교': ['끝값만', '끝에만 대입', '양끝값만', '대칭축은 무시', '양 끝에만'],
        '부호나 계수': ['부호 실수', '계수 계산'],
        '기하학적 의미를 판별식과 연결하지 못함': ['판별식만 쓰고', '그림은 모름'],
        '상수로만 두는 오류': ['상수 R', '나머지는 R', '나머지를 상수'],
        '인수정리를 나머지정리와 별개': ['별개의 공식', '인수정리는 다른']
      };

      for (const [key, searchTerms] of Object.entries(mcTermsMap)) {
        if (mc.includes(key) && searchTerms.some(st => trimmed.includes(st))) {
          detectedMisconceptions.push(mc);
        }
      }
    });

    // Special custom rules for pre-defined questions
    // Let's add customized evaluation for high-fidelity responses
    let evaluationLevel: EvaluationLevel = 'low';
    let score = Math.round(keywordRatio * 100);
    let missingConcepts: string[] = [];
    let feedback = '';

    if (detectedMisconceptions.length > 0) {
      evaluationLevel = 'low';
      score = Math.min(score, 45); // Max score for major misconception is 49 (Low range)
      missingConcepts = [levelConfig.requiredConcepts[0] || '개념의 기하학적 적용'];
      feedback = `답변 중 심각한 개념 오류가 감지되었습니다: "${detectedMisconceptions[0]}". 대칭축과 그래프 개형을 대조하는 연습을 추천합니다.`;
    } else if (keywordRatio >= 0.7 && trimmed.length > 30) {
      evaluationLevel = 'high';
      score = Math.max(score, 90);
      feedback = '훌륭합니다! 필수 수학 용어를 적절히 활용하여 수학적 원리를 조리 있게 설명하였습니다. 개념을 완벽하게 이해하고 있습니다.';
    } else if (keywordRatio >= 0.35 && trimmed.length > 15) {
      evaluationLevel = 'medium';
      score = Math.max(score, 65);
      feedback = '중요 키워드는 포함되어 있으나 서술이 다소 투박하거나 수학적 엄밀성이 약간 부족합니다. 교정을 위한 가이드를 참고하세요.';
      missingConcepts = matchedKeywords.length < levelConfig.expectedKeywords.length 
        ? [levelConfig.requiredConcepts[levelConfig.requiredConcepts.length - 1]] 
        : [];
    } else {
      evaluationLevel = 'low';
      score = Math.max(score, 35);
      feedback = '답변에 필수적인 개념어가 많이 누락되어 있고 설명의 인과관계가 명확하지 않습니다. 기초적인 정의를 다시 짚어볼 필요가 있습니다.';
      missingConcepts = levelConfig.requiredConcepts.filter(c => !matchedKeywords.some(kw => c.includes(kw)));
    }

    // Ensure range limits
    if (evaluationLevel === 'high') {
      if (score < 80) score = 85;
      if (score > 100) score = 100;
    } else if (evaluationLevel === 'medium') {
      if (score < 50) score = 65;
      if (score > 79) score = 75;
    } else {
      if (score < 0) score = 20;
      if (score > 49) score = 45;
    }

    const canProceed = evaluationLevel === 'high' || evaluationLevel === 'medium';
    const recommendedStudyPlan: string[] = [];
    if (evaluationLevel !== 'high') {
      levelConfig.requiredConcepts.forEach(c => {
        recommendedStudyPlan.push(`${c} 관련 기본 예제 풀이 및 설명 필사`);
      });
    }

    const result: EvaluationResult = {
      evaluationLevel,
      score,
      canProceed,
      missingConcepts,
      misconceptions: detectedMisconceptions,
      feedback,
      recommendedStudyPlan
    };

    if (!canProceed) {
      result.learningGuide = this.getLearningGuide(question.id, level);
      result.retryQuestion = this.getRetryQuestion(question, level, attemptType);
    }

    return result;
  },

  getLearningGuide(questionId: string, level: QuestionLevel): string {
    const guides: Record<string, Record<QuestionLevel, string>> = {
      q_quad_maxmin: {
        basic: `💡 [개념 길잡이]
이차함수 y = a(x - p)² + q 에서 꼭짓점은 (p, q)입니다. 
a > 0 일 때 그래프는 '아래로 볼록'한 모양을 띱니다. 
이 그래프는 대칭축 x = p에서 가장 아래로 움푹 파인 지점(꼭짓점)을 지나므로, 이 꼭짓점에서의 y값인 q가 가장 작아질 수밖에 없습니다.
따라서, 임의의 실수 x에 대해 y >= q 이므로 최솟값은 q입니다.

📌 [간단한 예시]
y = 2(x - 3)² + 5 에서 최솟값은 x = 3 일 때 꼭짓점의 y좌표인 5입니다.

⚠️ [피해야 할 실수]
"최솟값은 3이다" 처럼 꼭짓점의 x좌표를 최솟값으로 답하면 안 됩니다. 최대/최솟값은 항상 y값입니다.`,
        standard: `💡 [개념 길잡이]
제한된 범위 [1, 4]에서 y = -(x - 2)² + 5 의 최대/최소를 구할 때는 다음 단계를 따릅니다.
1. 대칭축인 x = 2가 범위 안에 있는지 확인합니다. -> 네, 1과 4 사이에 존재합니다.
2. 위로 볼록(a < 0)하므로 대칭축(꼭짓점)에서 최댓값 5를 갖습니다.
3. 대칭축 2에서 1까지의 거리는 1이고, 4까지의 거리는 2입니다. 
축에서 멀어질수록 그래프는 아래로 많이 내려가므로, 더 먼 x = 4에서 최솟값이 됩니다.
최솟값 = f(4) = -(4 - 2)² + 5 = -4 + 5 = 1.

📌 [간단한 예시]
대칭축 x=2에서 거리가 먼 쪽의 함숫값이 최솟값이고, 꼭짓점이 최댓값입니다.

⚠️ [피해야 할 실수]
대칭축을 안 보고 범위 끝값인 1과 4만 대입해서 4와 1 중 최대/최소를 고르면 꼭짓점의 최댓값 5를 놓치게 됩니다.`,
        advanced: `💡 [개념 길잡이]
반례를 들 때는 양 끝값보다 더 큰 값이나 작은 값이 범위 안에 존재하는 이차함수를 찾아야 합니다.
예를 들어 y = (x - 2)² 이라는 아래로 볼록한 식에 범위 1 <= x <= 3 을 주면,
양 끝값은 f(1) = 1, f(3) = 1 입니다.
하지만 대칭축 x = 2가 범위 안에 있으므로 최솟값은 꼭짓점의 y좌표인 f(2) = 0이 됩니다.
즉, 최솟값 0은 양 끝값 f(1), f(3) 중 어디에도 포함되지 않는 범위 안의 꼭짓점 값입니다.

📌 [올바른 판별 기준]
대칭축이 제한 범위 내에 포함되어 있으면, 꼭짓점에서 반드시 최대 또는 최소 중 하나를 갖습니다. 대칭축이 범위 밖에 있을 때만 양 끝값에서 최대/최소가 결정됩니다.`
      },
      q_quad_relation: {
        basic: `💡 [개념 길잡이]
이차함수와 x축이 교점을 갖는다는 것은 y=0 일 때의 실근을 갖는다는 뜻입니다.
- 판별식 D > 0: 실근 2개 -> 서로 다른 두 점에서 만남
- 판별식 D = 0: 중근 1개 -> 접함
- 판별식 D < 0: 실근 없음 -> 만나지 않음(공중에 떠 있거나 물 밑에 가라앉음)

📌 [간단한 예시]
y = x² + x + 1 은 D = 1 - 4 = -3 < 0 이므로 x축과 만나지 않고 붕 떠있습니다.`,
        standard: `💡 [개념 길잡이]
교점의 거리가 6이라는 것은 두 실근의 차가 6이라는 뜻입니다 (|α - β| = 6).
연립식을 작성하면 (α - β)² = (α + β)² - 4αβ 식에 대입하게 됩니다.
y = x² - 2kx + k² - 4 의 경우,
α + β = 2k, αβ = k² - 4 이므로
(α - β)² = 4k² - 4(k² - 4) = 16 이 됩니다.
따라서, k가 어떤 값이든 두 근의 차의 제곱은 항상 16(즉, 거리는 항상 4)이 됩니다.
따라서 두 교점 사이 거리가 6이 되는 k는 절대로 존재할 수 없습니다.

⚠️ [피해야 할 실수]
조건을 꼼꼼하게 따져 식의 모순을 밝히는 것도 논증력의 중요 요소입니다.`,
        advanced: `💡 [개념 길잡이]
y = x² - 2x + 3과 y = mx - 1을 연립하여 x² - (m+2)x + 4 = 0을 구합니다.
이 2차방정식이 실근을 가져야(교점이 1개 이상 존재해야) 하므로,
판별식 D = (m+2)² - 16 >= 0 이어야 합니다.
이를 풀면 m >= 2 또는 m <= -6 입니다.

📌 [기하학적 해석]
m=2 또는 m=-6 일 때 직선이 포물선에 딱 한 점에서 스치듯 접하게 됩니다. 기울기가 그 경계보다 크거나 작아지면 직선이 포물선을 뚫고 지나가므로 항상 두 개의 교점을 가지게 됩니다.`
      },
      q_remainder_theorem: {
        basic: `💡 [개념 길잡이]
f(x)를 (x-a)로 나눌 때 몫을 Q(x), 나머지를 R이라 하면 f(x) = (x-a)Q(x) + R 입니다.
이 식에 x = a를 대입하면 f(a) = (a-a)Q(a) + R = R이 됩니다. 
이것이 나머지정리입니다.
f(x) = 2x³ - 4x + 1에 x = 2를 대입하면 f(2) = 2(8) - 4(2) + 1 = 16 - 8 + 1 = 9 입니다.`,
        standard: `💡 [개념 길잡이]
2차식으로 나눈 나머지는 항상 나누는 식보다 낮은 차수인 '1차 이하(ax+b)'로 세워야 합니다.
f(x) = (x-1)(x-2)Q(x) + ax+b
나머지정리 조건에 의해 f(1)=3, f(2)=5 이므로
a + b = 3, 2a + b = 5 입니다.
두 식을 빼면 a = 2, b = 1 이므로 R(x) = 2x+1 입니다.`,
        advanced: `💡 [개념 길잡이]
인수정리는 f(a) = 0 이면 다항식 f(x)가 일차식 (x-a)로 나누어 떨어진다는 정리입니다.
f(-1) = 0 이므로 f(x)는 x+1을 인수로 갖습니다.
조립제법을 이용해 f(x) = x³ - 3x² + 4를 x+1로 나누면 몫은 x²-4x+4 가 됩니다.
따라서 f(x) = (x+1)(x-2)² 으로 최종 인수분해됩니다.`
      }
    };

    return guides[questionId]?.[level] || '기본 개념 학습 가이드: 질문의 키워드 정의를 참고하여 수식을 전개하세요.';
  },

  getRetryQuestion(question: Question, level: QuestionLevel, attemptType: 'official' | 'reinforcement'): string {
    // If it's the first retry, ask the same concept in a different way.
    // If it's a second retry, ask the original question again.
    if (attemptType === 'reinforcement') {
      // Already reinforced once, fallback is to ask the original question
      const levelConfig = question.levels.find(l => l.level === level);
      return levelConfig ? `[다시 시도] 아래 질문에 다시 천천히 답변해 보세요:\n${levelConfig.question}` : '질문을 다시 드립니다.';
    }

    // Otherwise, first retry: Ask the same concept in a different way.
    const retryBank: Record<string, Record<QuestionLevel, string>> = {
      q_quad_maxmin: {
        basic: '이차함수 y = a(x - p)² + q 의 대칭축 x = p의 왼쪽(x < p)과 오른쪽(x > p)에서 x가 증가할 때 y값은 각각 어떻게 변화하는지, a > 0 일 때 꼭짓점과 연계하여 다른 말로 다시 설명해 보세요.',
        standard: '제한된 범위 0 ≤ x ≤ 3 에서 이차함수 y = -(x - 1)² + 4 의 대칭축은 x = 1 입니다. 이 범위 내에서 대칭축의 역할과 x = 0, x = 3 중 어떤 지점에서 최솟값이 발생하는지 구체적인 위치 판단 논리를 다른 예시로써 서술해 보세요.',
        advanced: '대칭축이 x = 4인 이차함수의 최솟값을 제한범위 1 ≤ x ≤ 3 에서 찾는다면, 이때 최솟값은 왜 꼭짓점에서 발생하지 않고 양 끝값인 x=3이나 x=1 중 하나에서 발생하는지 대칭축의 위치를 들어 설명해 보세요.'
      },
      q_quad_relation: {
        basic: '이차방정식 ax² + bx + c = 0 이 판별식 D = 0 을 가질 때, 이차함수 y = ax² + bx + c 의 그래프와 x축의 기하학적 형태(위치 관계)가 어떻게 접하는지 다른 말로 설명해 보세요.',
        standard: '이차함수 y = x² + 2ax + a² - 9 의 그래프가 x축과 만나는 두 교점 사이의 거리가 항상 일정한 값 6이 되는 이유를 판별식이나 두 실근의 차 공식을 활용하여 풀어서 설명해 보세요.',
        advanced: '포물선 y = x² 과 직선 y = 2x + k 가 만나지 않기 위한 판별식 D의 기하학적 범위 조건을 m과의 연계 관계식과 비교해 다른 관점에서 서술해 보세요.'
      },
      q_remainder_theorem: {
        basic: '다항식 f(x)를 x - 3으로 나눌 때, 나머지정리를 사용하지 않고 다항식 나눗셈 관계식을 사용해 그 나머지가 f(3)이 되는 구조적 대입 원리를 다른 표현으로 써 보세요.',
        standard: '다항식 P(x)를 2차식 (x-3)(x-4)로 나눌 때의 나머지 R(x)를 ax+b로 두어야 하는 이유를 몫 Q(x)와 나누는 식의 차수 개념을 들어 다시 한 번 설명해 보세요.',
        advanced: 'f(2) = 0 이라는 정보를 다항식 f(x)와 인수 (x-2)의 관계 관점에서 인수정리의 정의를 활용하여 설명하고, x³ - 8 을 인수분해하는 원리를 설명해 보세요.'
      }
    };

    return retryBank[question.id]?.[level] || '해당 개념에 대해 키워드를 조합하여 다른 예시로 답변을 써 주세요.';
  }
};
