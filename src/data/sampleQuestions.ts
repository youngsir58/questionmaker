import type { Question } from '../types';

export const sampleQuestions: Question[] = [
  {
    id: 'q_quad_maxmin',
    testType: 'daily',
    topic: '이차함수의 최대와 최소 (Maximum and Minimum of Quadratic Functions)',
    achievementStandard: '[10공수1-02-04] 이차함수의 최대와 최소를 이해하고, 이를 활용하여 문제를 해결할 수 있다.',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: '이차함수 y = a(x - p)² + q (단, a > 0)의 그래프에서 꼭짓점의 좌표가 (p, q)일 때, 이 함수의 최솟값이 q가 되는 이유를 그래프의 모양(볼록성)과 대칭축을 연결하여 설명해 보세요.',
        expectedKeywords: ['아래로 볼록', '꼭짓점', '대칭축', '가장 낮은', 'y값', '이상'],
        requiredConcepts: ['이차함수의 기본형', '꼭짓점의 정의', '대칭축의 대칭성'],
        commonMisconceptions: ['최솟값을 x좌표인 p로 적는 것', 'a의 부호와 볼록성의 관계를 혼동하는 것'],
        rubric: '아래로 볼록(a > 0)한 그래프 개형을 언급하고, 대칭축 x = p에서 함수가 가장 낮은 위치에 도달하므로 그때의 y값인 q가 최솟값임을 논리적으로 설명해야 합니다.'
      },
      {
        level: 'standard',
        question: '제한된 범위 1 ≤ x ≤ 4에서 이차함수 y = -(x - 2)² + 5의 최댓값과 최솟값을 구하는 과정을 설명해 보세요. 특히, 대칭축 x = 2의 위치와 제한된 범위의 양 끝값(x = 1, x = 4)에서 대칭축까지의 거리 차이가 최댓값과 최솟값 결정에 어떤 영향을 미치는지 설명해야 합니다.',
        expectedKeywords: ['위로 볼록', '대칭축', '꼭짓점', '거리', '멀어질수록', '양 끝값'],
        requiredConcepts: ['제한된 범위에서의 최대/최소', '축으로부터의 거리와 y값의 변화'],
        commonMisconceptions: ['대칭축의 위치를 고려하지 않고 양 끝값인 x=1, 4만 대입하는 것', '위로 볼록한데 꼭짓점에서 최솟값을 갖는다고 오인하는 것'],
        rubric: '1) 그래프가 위로 볼록하고 대칭축 x = 2가 범위 [1, 4] 내에 포함되므로 꼭짓점에서 최댓값 5를 가짐을 언급. 2) 대칭축 x = 2에서 더 멀리 떨어진 x = 4에서 함수가 더 많이 내려가므로 최솟값 1을 가짐을 거리 개념을 통해 설명해야 합니다.'
      },
      {
        level: 'advanced',
        question: '어느 고등학생이 "제한된 범위 α ≤ x ≤ β에서 이차함수의 최대, 최소는 항상 양 끝값인 f(α)와 f(β) 중 하나이다."라고 주장했습니다. 이 주장이 틀린 이유를 밝히고, 오류를 지적하기 위한 구체적인 반례(이차함수 식과 제한된 범위)를 하나 제시한 뒤, 올바른 판별 기준을 대칭축을 기준으로 설명해 보세요.',
        expectedKeywords: ['대칭축', '꼭짓점', '범위 내부', '반례', '위로 볼록', '아래로 볼록'],
        requiredConcepts: ['반례 제시를 통한 반박', '대칭축의 포함 여부에 따른 판단 조건화'],
        commonMisconceptions: ['반례를 제시하되 대칭축이 범위 밖에 있는 엉뚱한 예시를 드는 것', '설명이 너무 추상적이어서 수식적 예시가 누락되는 것'],
        rubric: '1) 대칭축이 제한된 범위 내부에 존재할 경우 꼭짓점에서 최댓값 또는 최솟값을 갖기 때문에 양 끝값만으로는 결정되지 않음을 설명. 2) 적절한 반례 제시 (예: y = (x-2)², 범위 1 ≤ x ≤ 3 이면 양 끝값 f(1)=1, f(3)=1 이지만 최솟값은 f(2)=0임). 3) 대칭축이 범위 안에 있을 때와 없을 때를 구분하는 기준 설명.'
      }
    ]
  },
  {
    id: 'q_quad_relation',
    testType: 'daily',
    topic: '이차방정식과 이차함수의 관계 (Relation between Quadratic Equations and Functions)',
    achievementStandard: '[10공수1-02-03] 이차함수의 그래프와 직선의 위치 관계를 이해한다.',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: '이차함수 y = ax² + bx + c의 그래프가 x축과 만나는 교점의 개수와 이차방정식 ax² + bx + c = 0의 판별식 D의 부호 사이에는 어떤 관계가 있는지 기하학적 의미를 담아 설명해 보세요.',
        expectedKeywords: ['교점', '실근', '판별식', '만난다', '접한다', '허근'],
        requiredConcepts: ['판별식의 성질', '방정식의 실근과 함수의 교점 일치'],
        commonMisconceptions: ['D < 0 일 때 그래프가 아래로 처진다고 생각하거나, 교점이 없다는 것과 근이 없다는 것을 혼동(실근은 없으나 허근은 존재함)'],
        rubric: 'x축과의 교점의 x좌표는 y=0을 대입한 이차방정식의 실근과 같음을 언급하고, D > 0 이면 서로 다른 두 실근(교점 2개), D = 0 이면 중근(교점 1개 - 접함), D < 0 이면 실근 없음(교점 0개)임을 매칭하여 설명해야 합니다.'
      },
      {
        level: 'standard',
        question: '이차함수 y = x² - 2kx + k² - 4의 그래프가 x축과 만나는 두 교점 사이의 거리가 6일 때, 실수 k의 값을 구하는 논리적 과정을 설명해 보세요. (두 근을 α, β라고 두고 근과 계수의 관계를 사용하거나 꼭짓점의 성질을 활용하세요.)',
        expectedKeywords: ['근과 계수의 관계', '두 근의 차', '대칭축', '곱셈공식 변형', '합과 곱'],
        requiredConcepts: ['이차방정식 근과 계수의 관계', '두 근의 차 공식 또는 대칭 이동'],
        commonMisconceptions: ['두 근의 차 |α - β| = 6 임을 활용하지 못하고 연립 방정식에서 계산 실수를 범함', 'k의 부호 조건을 잘못 판단함'],
        rubric: 'x축과의 교점 식 x² - 2kx + k² - 4 = 0의 두 실근을 α, β로 정의. α+β=2k, αβ=k²-4. 두 교점 사이의 거리인 |α-β| = 6이므로 (α-β)² = (α+β)² - 4αβ = 4k² - 4(k²-4) = 16. 그러나 이 값은 k에 상관없이 항상 16이 되므로, 거리 공식과 조건의 논리적 모순성 또는 계산을 풀어 k의 존재 여부를 설명.'
      },
      {
        level: 'advanced',
        question: '이차함수 y = x² - 2x + 3의 그래프와 직선 y = mx - 1이 적어도 한 점에서 만나기 위한 실수 m의 값의 범위를 판별식 D를 사용하여 구하고, 판별식이 왜 이 범위를 보장하는지 기하학적으로(그래프상 접하는 순간과 비교하여) 설명해 보세요.',
        expectedKeywords: ['판별식', '연립', '접할 때', '실근', '기하학적', '위치 관계'],
        requiredConcepts: ['함수와 직선의 연립방정식', '교점의 유무와 실근 조건'],
        commonMisconceptions: ['연립을 하지 않고 각각의 판별식을 따로 구하는 오류', '적어도 한 점이므로 D ≥ 0 인데 D > 0 으로만 범위를 구하는 실수'],
        rubric: '1) 두 식을 연립하여 x² - (m+2)x + 4 = 0을 유도. 2) 적어도 한 점에서 만나려면 이 방정식이 실근을 가져야 하므로 D = (m+2)² - 16 ≥ 0 임을 언급. 3) m ≤ -6 또는 m ≥ 2가 도출되는 과정 기술. 4) m이 접하는 기준인 -6 또는 2보다 바깥 범위에 있을 때 직선이 회전하면서 포물선을 뚫고 지나가거나 만나게 됨을 설명.'
      }
    ]
  },
  {
    id: 'q_remainder_theorem',
    testType: 'daily',
    topic: '나머지정리와 인수정리 (Remainder Theorem and Factor Theorem)',
    achievementStandard: '[10공수1-01-02] 나머지정리의 의미를 이해하고, 이를 활용하여 다항식을 인수분해할 수 있다.',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: '다항식 f(x)를 일차식 x - a로 나눌 때의 나머지가 f(a)가 되는 이유를 다항식의 나눗셈 관계식 f(x) = (x - a)Q(x) + R을 적어 증명하고, 이를 활용해 f(x) = 2x³ - 4x + 1을 x - 2로 나눈 나머지를 구해 보세요.',
        expectedKeywords: ['나눗셈 관계식', '나머지정리', 'x에 a 대입', '항등식', '나머지 9'],
        requiredConcepts: ['항등식의 대입', '나머지정리의 원리'],
        commonMisconceptions: ['Q(x)의 차수를 몰라 나머지를 구하지 못한다고 생각하는 것', '대입 연산 시 단순 부호/거듭제곱 실수'],
        rubric: '1) f(x) = (x - a)Q(x) + R 에서 x는 모든 실수에 대해 성립하는 항등식이므로 x = a를 대입하면 f(a) = 0·Q(a) + R = R이 됨을 적을 것. 2) f(2) = 2(8) - 4(2) + 1 = 9를 구하는 과정 기재.'
      },
      {
        level: 'standard',
        question: '다항식 f(x)를 x - 1로 나눈 나머지는 3이고, x - 2로 나눈 나머지는 5입니다. f(x)를 이차식 (x - 1)(x - 2)로 나눈 나머지를 R(x)라고 할 때, R(x)를 ax + b 형태로 설정해야 하는 이유와 실제로 R(x)를 구하는 연립방정식 풀이를 설명해 보세요.',
        expectedKeywords: ['차수', '나머지 ax+b', '연립방정식', '대입', '일차 이하', '2x+1'],
        requiredConcepts: ['나누는 식과 나머지 차수의 관계', '미정계수 결정'],
        commonMisconceptions: ['이차식으로 나누었는데 나머지를 상수 R로만 두고 푸는 오류', '나머지 식 R(x)에 f(1), f(2) 값을 대입할 때 조건과 수치를 매칭하지 못함'],
        rubric: '1) 나누는 식이 2차식이므로 나머지는 1차 이하의 다항식이어야 함(ax+b). 2) f(x) = (x-1)(x-2)Q(x) + ax+b 로 설정. 3) f(1) = a+b = 3, f(2) = 2a+b = 5 연립하여 a=2, b=1을 얻어 R(x) = 2x+1 임을 유도하는 설명.'
      },
      {
        level: 'advanced',
        question: '인수정리란 무엇인지 정의를 설명하고, 다항식 f(x) = x³ - 3x² + 4가 f(-1) = 0임을 이용하여 인수분해되는 과정을 조립제법이나 대수적 변형 과정을 담아 단계별로 서술해 보세요.',
        expectedKeywords: ['인수정리', 'f(a)=0', '나누어 떨어진다', '인수 x-a', '조립제법', '(x+1)(x-2)²'],
        requiredConcepts: ['인수정리의 정의', '고차식의 인수분해'],
        commonMisconceptions: ['인수정리를 나머지정리와 별개의 법칙으로만 인식하는 오류', '조립제법 과정에서의 몫의 계수 배치 실수'],
        rubric: '1) f(a)=0 이면 f(x)가 일차식 x-a로 나누어 떨어지고 f(x)=(x-a)Q(x) 꼴로 나타내어진다는 인수정리의 뜻 작성. 2) f(-1)=0이므로 x+1을 인수로 가짐 확인. 3) 조립제법을 통해 x³-3x²+4 = (x+1)(x²-4x+4) = (x+1)(x-2)² 로 완전히 인수분해하는 과정 설명.'
      }
    ]
  }
];

// Helper to generate a dynamic Weekly Bridge question
export function generateWeeklyBridgeQuestion(dailyScopes: any[]): Question {
  const topicsStr = dailyScopes.map(s => s.lessonTopic).join(', ');
  
  return {
    id: `weekly_${Date.now()}`,
    testType: 'weekly',
    topic: '주간 개념 연결 진단 (Weekly Concept Connection)',
    achievementStandard: '주간 성취 기준 누적 및 개념 간 연계성 평가',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: `이번 주에 배운 [${topicsStr}] 개념들의 핵심 정의를 각각 적고, 이 개념들이 서로 수학적으로 어떻게 연결되는지 간단히 설명해 보세요.`,
        expectedKeywords: ['정의', '연결', '공통점', '수학적', '적용'],
        requiredConcepts: ['각 단원 핵심 개념'],
        commonMisconceptions: ['개념들을 완전히 무관한 개별 공식으로만 외우는 태도'],
        rubric: '이번 주 범위의 키워드가 최소 2개 이상 등장하며 두 개념 간의 공통 기하학적 요소나 수식적 연관성을 언급해야 합니다.'
      },
      {
        level: 'standard',
        question: `이차함수와 나머지정리를 연계해 보겠습니다. 다항식 f(x)를 x - 1로 나눈 나머지가 3이고 f(x)가 x의 이차식일 때, 이 식의 이차항 계수가 양수라면 f(x)가 최솟값 3을 갖기 위해 대칭축 x의 위치가 꼭짓점 x좌표와 어떻게 연결되는지 그래프의 꼭짓점 개념과 나머지정리의 식을 종합하여 설명해 보세요.`,
        expectedKeywords: ['나머지정리', '꼭짓점', '최솟값', 'f(1)=3', '대칭축 x=1'],
        requiredConcepts: ['나머지정리 f(1)=3', '이차함수의 꼭짓점과 최솟값'],
        commonMisconceptions: ['f(1)=3의 뜻이 그래프의 한 점 (1, 3)을 지난다는 점을 이해하지 못함', '이차항 계수가 양수일 때 최솟값이 존재함을 망각함'],
        rubric: 'f(1)=3은 포물선이 점 (1,3)을 지난다는 뜻이며, 최솟값 3이 나오려면 아래로 볼록한 이차함수의 꼭짓점이 바로 (1, 3)이어야 하고 대칭축은 x = 1이어야 함을 두 단원의 원리를 종합하여 설명해야 합니다.'
      },
      {
        level: 'advanced',
        question: `실생활 맥락의 문제입니다. 매장에 상품 A를 판매하여 얻는 매출 다항식을 f(x)라고 합시다. f(x)는 x에 대한 3차식이며, x - 2로 나눈 나머지가 10이고 x - 4로 나눈 나머지가 10입니다. 이 매출 식 f(x)가 2 ≤ x ≤ 4 범위에서 이차함수의 최대/최소 논리처럼 극적인 매출 저점(최소)을 형성할 수 있는지, 인수정리를 이용해 f(x) = (x-2)(x-4)Q(x) + 10 꼴로 나타낸 식의 개형을 토대로 분석하여 설명해 보세요.`,
        expectedKeywords: ['인수정리', '공통 나머지', 'x-2', 'x-4', '대칭축 x=3', '그래프'],
        requiredConcepts: ['인수정리의 응용', '고차다항식의 그래프적 유추', '이차식의 대칭축 대입'],
        commonMisconceptions: ['나머지가 같을 때 인수정리 꼴인 f(x)-10 = (x-2)(x-4)(ax+b) 구조를 유도하지 못하는 것', '대칭축 위치를 찾지 못하는 것'],
        rubric: 'f(x) - 10은 x-2와 x-4를 인수로 가지므로 f(x) = (x-2)(x-4)(ax+b) + 10 으로 표현 가능. 2와 4 사이에서 (x-2)(x-4)의 부분은 x = 3 대칭축에서 음수 최솟값을 가지므로 전체 매출이 x = 3 근방에서 최소를 이룰 수 있음을 수학적으로 논증해야 합니다.'
      }
    ]
  };
}

// Helper to generate a dynamic Monthly Mastery question
export function generateMonthlyMasteryQuestion(dailyScopes: any[]): Question {
  const topicsStr = dailyScopes.map(s => s.lessonTopic).join(', ');

  return {
    id: `monthly_${Date.now()}`,
    testType: 'monthly',
    topic: '월간 성취 마스터 진단 (Monthly Integrated Mastery)',
    achievementStandard: '월간 누적 범위 개념의 융합 및 신유형 추론 능력 진단',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: `한 달 동안 학습한 [${topicsStr}] 중 본인이 가장 이해가 깊다고 생각하는 개념 하나와 가장 보완이 필요하다고 느꼈던 개념 하나를 선택하고, 각각의 핵심 정리와 공식 유도 과정을 직접 설명해 보세요.`,
        expectedKeywords: ['유도 과정', '개념', '보완', '정리', '증명'],
        requiredConcepts: ['학습 개념 전반'],
        commonMisconceptions: ['공식 암기 위주로 설명하고 유도 원리를 누락하는 습관'],
        rubric: '선택한 두 개념의 단순 선언이 아니라, 하나 이상의 성질이나 공식을 대수적/기하학적으로 올바르게 유도 혹은 증명하는 내용이 포함되어야 합니다.'
      },
      {
        level: 'standard',
        question: `이차방정식 ax² + bx + c = 0의 두 실근이 모두 양수일 조건(판별식 D ≥ 0, 두 근의 합 > 0, 두 근의 곱 > 0)을 이차함수 y = ax² + bx + c의 그래프 개형(축의 위치, x=0에서의 함숫값)과 기하학적으로 어떻게 대응되는지 수학적 동치성을 증명하듯 설명해 보세요.`,
        expectedKeywords: ['판별식', '대칭축', 'y절편', '함숫값 f(0)', '근과 계수의 관계', '동치'],
        requiredConcepts: ['이차방정식의 실근 조건', '이차함수의 기하학적 조건 (근의 분리)'],
        commonMisconceptions: ['수식적 조건과 그래프적 조건을 별개로 생각하는 것', 'a의 부호에 따른 f(0) 조건의 대소 관계를 혼동하는 것'],
        rubric: '1) 대수적 조건(D, 합, 곱)을 열거하고, 2) 이를 그래프(대칭축 -b/2a > 0, 판별식 교점 존재, y절편 c > 0)로 그려서 동일한 수학적 성질임을 보여주는 구조적인 1:1 매칭 설명을 완성해야 합니다.'
      },
      {
        level: 'advanced',
        question: `최근 모의고사 4점 기출 유형의 융합 추론 문제입니다. 임의의 다항식 P(x)에 대하여 P(x)를 (x-a)²으로 나눈 나머지를 R(x)라고 할 때, 이차함수 y = P(x)가 x = a를 대칭축으로 갖고 꼭짓점의 y좌표가 b라면, P(a) = b 이고 P'(a) = 0 (고교 수학 II 미분 개념 연계 혹은 다항식 계산 연계) 임을 R(x)의 식 R(x) = p(x-a) + q를 활용해 R(x)가 완전한 상수 b가 되는 기하학적 접선의 관계를 논리적으로 설명해 보세요.`,
        expectedKeywords: ['나눗셈 관계식', '꼭짓점', '대칭축 x=a', '접한다', '상수 b', '나머지'],
        requiredConcepts: ['(x-a)²으로 나누는 나눗셈 식의 특성', '포물선의 꼭짓점에서의 접선 기하학'],
        commonMisconceptions: ['미분 개념이 섞였을 때 다항식 나눗셈 구조로 환원하지 못하는 오류', '대칭축에서 포물선의 기울기가 0임을 기하학적으로 파악하지 못함'],
        rubric: '1) P(x) = (x-a)²Q(x) + p(x-a) + q로 설정. 2) 대칭축 x=a이고 꼭짓점 y좌표 b이므로 P(x)의 식과 기하학적으로 x=a 부근에서 접선이 수평(기울기 p=0)이 됨을 언급. 3) 따라서 p=0이 되어 나머지가 일차식이 아닌 상수 q=b가 됨을 논리적으로 연결하여 설명해야 합니다.'
      }
    ]
  };
}
