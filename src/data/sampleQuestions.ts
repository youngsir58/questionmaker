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
  },
  {
    id: 'q_matrix_ops',
    testType: 'daily',
    topic: '행렬의 연산 (Operations on Matrices)',
    achievementStandard: '[10공수1-04-02] 행렬의 덧셈, 뺄셈, 실수배, 곱셈을 할 수 있고, 그 성질을 이해한다.',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: '두 행렬 A, B가 2x2 행렬일 때, 행렬의 덧셈 A + B와 실수배 kA의 성분별 연산 정의를 설명하고, 이것이 일반적인 실수의 연산(실수의 합과 곱)과 구조적으로 어떤 유사성(교환, 결합, 분배법칙 등)을 가지는지 설명해 보세요.',
        expectedKeywords: ['성분', '같은 위치', '실수배', '덧셈', '분배법칙', '교환법칙'],
        requiredConcepts: ['행렬의 기본 연산 정의', '연산 법칙의 유사성'],
        commonMisconceptions: ['실수배를 특정 성분에만 곱하는 오류', '두 행렬의 크기가 다를 때도 덧셈이 가능하다고 착각하는 오류'],
        rubric: '행렬의 덧셈은 대응하는 각 성분끼리 합산하고, 실수배 kA는 행렬의 모든 성분에 실수 k를 곱한다는 정의를 명확히 제시해야 합니다. 또한 실수의 덧셈과 실수배처럼 덧셈의 교환법칙, 결합법칙, 실수배의 분배법칙이 행렬 연산에서도 동등하게 성립함을 언급하여 연산의 구조적 유사성을 설명해야 합니다.'
      },
      {
        level: 'standard',
        question: '두 행렬 A = [[1, 2], [3, 4]], B = [[0, 1], [-1, 2]] 에 대하여 곱셈 AB와 BA를 각각 계산하고 그 결과를 비교해 보세요. 이를 통해 행렬의 곱셈에서는 실수의 곱셈과 달리 일반적으로 어떤 대수적 법칙이 성립하지 않는지 성분 계산에 따른 차이를 담아 설명해야 합니다.',
        expectedKeywords: ['행렬 곱셈', '교환법칙', 'AB', 'BA', '성립하지 않는다', '순서'],
        requiredConcepts: ['행렬 곱셈 연산 방식', '교환법칙의 예외성'],
        commonMisconceptions: ['곱하는 순서에 상관없이 결과가 같다고 생각하는 오류', '곱셈 시 각 성분끼리 단순히 대응해서 곱하는 오류'],
        rubric: '1) AB = [[-2, 5], [-4, 11]], BA = [[3, 4], [5, 6]] 임을 바르게 계산하여 제시. 2) 계산된 두 행렬이 다르므로(AB ≠ BA) 행렬 곱셈에서는 교환법칙이 성립하지 않음을 명시. 3) 행렬 곱셈은 앞 행렬의 행 벡터와 뒤 행렬의 열 벡터의 내적으로 결정되므로, 곱하는 순서가 바뀌면 계산에 결합하는 성분이 완전히 달라져 결과가 바뀜을 설명해야 합니다.'
      },
      {
        level: 'advanced',
        question: '두 2x2 행렬 A, B에 대하여 다음 주장이 거짓인 이유를 설명해 보세요: "AB = O (영행렬)이면, A = O 또는 B = O 이다." 이 주장이 성립하지 않음을 보이기 위해 영행렬이 아닌 두 행렬 A, B의 곱이 영행렬이 되는 구체적인 반례를 성분으로 제시하고, 왜 행렬에서는 실수와 달리 이러한 현상(영인자의 존재)이 발생하는지 내적의 관점에서 설명해 보세요.',
        expectedKeywords: ['영인자', '반례', '영행렬', '성분', '실수와 차이', '내적'],
        requiredConcepts: ['영인자의 정의 및 반례 제시', '행렬 곱셈의 구조적 원리'],
        commonMisconceptions: ['AB=O 일 때 반드시 둘 중 하나가 영행렬이어야 한다고 실수곱의 직관을 그대로 대입하는 오류', '반례로 제시한 행렬의 실제 곱 연산 결과가 영행렬이 되지 않는 실수'],
        rubric: '1) 두 행렬이 모두 영행렬이 아니더라도 곱셈 결과가 영행렬이 될 수 있음을 지적(영인자의 존재). 2) 구체적인 반례 제시 (예: A = [[1, 0], [0, 0]], B = [[0, 0], [0, 1]] 이고 AB = [[0, 0], [0, 0]] 임을 계산식으로 증명). 3) 행렬 곱셈은 행 벡터와 열 벡터의 내적들로 채워지는데, 영벡터가 아닌 수직하거나 직교하는 성분 배열에 의해 내적합이 0이 될 수 있기 때문에 영인자가 발생함을 논리적으로 기술해야 합니다.'
      }
    ]
  },
  {
    id: 'q_circle_line',
    testType: 'daily',
    topic: '원과 직선의 위치 관계 (Positional Relation between Circle and Line)',
    achievementStandard: '[10공수2-01-03] 좌표평면에서 원과 직선의 위치 관계를 이해하고, 이를 활용하여 문제를 해결할 수 있다.',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: '좌표평면에서 원의 중심 C(x₀, y₀)와 반지름 r, 그리고 직선 ax + by + c = 0 사이의 거리 d를 비교하여, 원과 직선이 만나는 교점의 개수가 어떻게 변화하는지 세 가지 케이스(d < r, d = r, d > r)로 나누어 기하학적인 그림을 연상하도록 설명해 보세요.',
        expectedKeywords: ['중심과 직선 사이의 거리', '반지름 r', '교점 개수', 'd와 r', '접한다', '서로 다른 두 점', '만나지 않는다'],
        requiredConcepts: ['점과 직선 사이의 거리 공식', '반지름과 최단거리 비교의 기하학적 의미'],
        commonMisconceptions: ['d가 반지름보다 클 때 원 내부를 뚫고 지나가 교점이 2개 생긴다고 반대로 생각하는 오류', 'd를 x축 또는 y축과의 거리로 오인하는 오류'],
        rubric: '1) d < r 이면 직선이 원의 내부를 지나므로 서로 다른 두 점에서 만남(교점 2개), 2) d = r 이면 원과 한 점에서 스치듯 만나므로 접함(교점 1개), 3) d > r 이면 직선이 원의 외부에 완전히 떨어져 있으므로 만나지 않음(교점 0개)이 됨을 최단거리 d와 반지름 r의 물리적 비교로 설명해야 합니다.'
      },
      {
        level: 'standard',
        question: '원 x² + y² = 5 와 직선 y = 2x + k 가 서로 다른 두 점에서 만나기 위한 실수 k의 값의 범위를 구하고자 합니다. 원의 중심 (0, 0)과 직선 사이의 거리 d와 반지름 r을 비교하는 방식을 사용하여 풀이 과정을 논리적으로 설명해 보세요.',
        expectedKeywords: ['원의 중심', '점과 직선 사이의 거리 d', '반지름 r', '루트 5', '-5 < k < 5', '대소 관계'],
        requiredConcepts: ['원과 직선의 위치 관계 판별법 (d vs r)', '절댓값 부등식 풀이'],
        commonMisconceptions: ['반지름 r을 5로 잘못 적용하는 오류 (실제 반지름은 √5)', '직선 방정식을 일반형(2x - y + k = 0)으로 정리하지 않고 공식을 대입하여 계산이 꼬이는 오류'],
        rubric: '1) 원의 중심 (0,0), 반지름 r = √5 확인. 2) 직선을 일반형 2x - y + k = 0으로 변형한 후 중심과 직선 사이 거리 d = |k| / √(2² + (-1)²) = |k| / √5 도출. 3) 서로 다른 두 점에서 만나려면 d < r 이어야 하므로 |k| / √5 < √5 가 성립해야 함을 명시. 4) 식을 풀어 |k| < 5 => -5 < k < 5 범위를 올바르게 도출하는 단계를 상세히 기재해야 합니다.'
      },
      {
        level: 'advanced',
        question: '점 P(2, 4)에서 원 x² + y² = 4에 그은 두 접선의 방정식을 구하려고 합니다. 먼저 점 P가 원 외부의 점임을 수식으로 확인하고, 접선의 기울기를 m으로 둔 뒤 원의 중심과 직선 사이의 거리 공식(d = r)을 적용하여 두 접선 식을 모두 구하는 논리적 과정을 설명해 보세요. 특히 하나는 기울기 m이 구해지지만, 다른 하나는 왜 대수적으로 구해지지 않고 기하학적으로 처리해야 하는지 접선의 기하학적 형태(y축에 평행)와 관련지어 설명해야 합니다.',
        expectedKeywords: ['원 밖의 점', '기울기 m', 'y - 4 = m(x - 2)', '거리 d = r', 'y축에 평행', '접선의 방정식', 'x = 2', 'm = 3/4'],
        requiredConcepts: ['원 밖의 한 점에서 그은 접선 구하기', '기울기가 존재하지 않는 직선(수직선)의 처리'],
        commonMisconceptions: ['기울기 m의 이차방정식을 풀었을 때 일차식으로 나와 근이 하나(m = 3/4)만 발견되면 나머지 한 접선을 누락하는 오류', '점 P가 원 위의 점인 줄 알고 공식 x₁x + y₁y = r²을 쓰는 계산 오류'],
        rubric: '1) P(2,4) 대입 시 2² + 4² = 20 > 4 이므로 원 외부 점 확인. 2) 접선 식 y - 4 = m(x - 2) => mx - y - 2m + 4 = 0 설정. 3) 중심 (0,0)과의 거리 d = |-2m + 4| / √(m² + 1) = 2(반지름)에서 양변 제곱 정리: 4m² - 16m + 16 = 4m² + 4 => 16m = 12 => m = 3/4 도출. 4) m이 하나만 얻어진 이유는 또 다른 접선이 y축에 평행하여 기울기가 정의되지 않는 수직선 x = 2이기 때문임을 명시하고, 최종 두 접선 y = (3/4)x + 5/2 와 x = 2를 완결성 있게 제시해야 합니다.'
      }
    ]
  },
  {
    id: 'q_log_properties',
    testType: 'daily',
    topic: '로그의 뜻과 성질 (Definition and Properties of Logarithms)',
    achievementStandard: '[12대수01-02] 로그의 뜻을 알고, 그 성질을 이해한다.',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: '지수식 a^x = N (a > 0, a ≠ 1, N > 0)과 동치인 로그식 x = log_a(N)의 정의를 토대로, 로그가 실수 범위에서 안정적으로 정의되기 위해 밑 a가 반드시 0보다 크고 1이 아니어야 하는 이유(밑 조건)와 진수 N이 0보다 커야 하는 이유(진수 조건)를 지수함수의 정의역/치역 성질과 연관지어 설명해 보세요.',
        expectedKeywords: ['밑 조건', '진수 조건', '실수 범위', '정의역', '일대일대응', '음수', '치역'],
        requiredConcepts: ['지수함수와 로그함수의 역관계', '로그의 정의가 성립할 대수적 조건'],
        commonMisconceptions: ['밑이 1이 되어도 로그값이 잘 정의된다고 오해하는 오류', '진수 조건이 양수여야 하는 이유를 단순히 "외운 공식"으로만 말하고 지수식의 치역(a^x > 0)과의 연관성을 말하지 못하는 오류'],
        rubric: '밑 a가 음수이면 실수 지수 확장이 불가능하고, a=0이나 a=1이면 함수가 일대일대응이 되지 않아 역함수(로그)를 정의할 수 없음을 명시해야 합니다. 또한 양수의 거듭제곱 a^x는 항상 양수이므로 역연산 결과인 진수 N 역시 항상 양수(N > 0)여야 함을 지수와 로그의 동치 변환 구조로 밝혀야 합니다.'
      },
      {
        level: 'standard',
        question: '로그의 유용한 성질인 log_a(XY) = log_a(X) + log_a(Y) 가 성립하는 증명 과정을, 지수법칙(a^p * a^q = a^(p+q))과 로그의 기본 정의(치환 방식)를 결합하여 단계별로 논리적으로 서술해 보세요. (단, a > 0, a ≠ 1, X > 0, Y > 0)',
        expectedKeywords: ['지수법칙', '치환', 'log_a(X) = p', 'log_a(Y) = q', '밑', '정의'],
        requiredConcepts: ['로그의 정의를 이용한 치환 증명', '지수법칙의 로그 환원'],
        commonMisconceptions: ['log_a(X + Y)를 log_a(X) + log_a(Y)와 혼동하는 대수적 조작 실수', '증명 과정에서 치환 후 지수 형태로 바꾸지 못해 증명이 막히는 경우'],
        rubric: '1) log_a(X) = p, log_a(Y) = q 로 치환하여 각각 X = a^p, Y = a^q 의 지수 형태로 표현. 2) 두 수의 곱 XY = a^p * a^q = a^(p+q)가 지수법칙에 의해 성립함을 기재. 3) 로그의 정의를 다시 적용하여 log_a(XY) = p + q 임을 유도. 4) p와 q 자리에 원래의 로그식을 대입하여 공식을 완성하는 과정을 체계적으로 설명해야 합니다.'
      },
      {
        level: 'advanced',
        question: '이차방정식을 이용한 로그방정식 문제인 log_2(x - 1) + log_2(x - 3) = 3 의 해를 구하는 과정에서, 많은 학생들이 진수 조건을 간과하여 발생시키는 대표적인 "가짜 해(무연근) 오류"를 지적해 보세요. 그리고 올바른 진수 범위를 구하고 이를 토대로 공통 해를 필터링하는 풀이 과정을 상세히 서술해야 합니다.',
        expectedKeywords: ['진수 조건', '공통 범위', 'x > 3', '이차방정식', '가짜 해', 'x = 5', 'x = -1'],
        requiredConcepts: ['로그방정식의 해법과 진수 조건의 공통 영역 필터링', '이차방정식 풀이'],
        commonMisconceptions: ['진수 조건(x > 1, x > 3)을 각각 독립적으로 구한 후 합집합을 취하는 오류', '방정식 계산에만 몰두하여 구한 두 해를 모두 참으로 판정하는 오류'],
        rubric: '1) 진수 조건 x-1 > 0 및 x-3 > 0 에서 공통 범위인 x > 3을 반드시 도출해야 합니다. 2) 로그 성질로 결합해 log_2((x-1)(x-3)) = 3 => (x-1)(x-3) = 2³ = 8 유도. 3) 방정식 x² - 4x - 5 = 0을 풀어 x = 5 또는 x = -1을 얻음. 4) x = -1은 진수 조건 x > 3을 만족하지 못해 해가 될 수 없는 가짜 해(무연근)임을 증명하고, 최종 유효한 해는 오직 x = 5 뿐임을 논리적으로 판정하는 과정이 포함되어야 합니다.'
      }
    ]
  },
  {
    id: 'q_deriv_geometric',
    testType: 'daily',
    topic: '미분계수의 기하학적 의미 (Geometric Meaning of Derivative)',
    achievementStandard: '[12미적1-02-02] 미분계수의 기하학적 의미를 이해한다.',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: '함수 y = f(x)의 그래프 상의 두 점 P(a, f(a))와 Q(a + Δx, f(a + Δx))를 잇는 할선의 기울기가 평균변화율입니다. 변수 Δx가 0으로 한없이 가까워질 때(Δx → 0), 평균변화율의 극한값으로 정의되는 미분계수 f\'(a)가 기하학적으로 왜 점 P에서의 "접선의 기울기"에 수렴하는지 그림을 상상하듯 상세히 설명해 보세요.',
        expectedKeywords: ['평균변화율', '극한', '할선', '접선', '기울기', '가까워질 때', 'f\'(a)'],
        requiredConcepts: ['평균변화율과 할선 기울기', '할선의 접선으로의 수렴성'],
        commonMisconceptions: ['미분계수를 기하학적 접선과 연결하지 못하고 단순히 "도함수의 대입값"으로만 인지하는 것', '할선의 기울기와 접선의 기울기 정의에서 기하학적 변환 과정을 건너뛰고 식만 나열하는 것'],
        rubric: '두 점을 지나는 할선의 기울기가 평균변화율임을 먼저 적고, Δx가 0에 접근함에 따라 점 Q가 곡선을 타고 점 P에 무한히 가까워진다는 점을 언급해야 합니다. 이로 인해 두 점을 연결하던 할선이 점 P 한 점에서의 접선과 완벽히 겹치게(기하학적으로 일치하게) 되므로, 평균변화율의 극한값 f\'(a)는 기하학적으로 접선의 기울기와 동치임을 논증해야 합니다.'
      },
      {
        level: 'standard',
        question: '곡선 y = x² - 3x + 2 위의 점 (3, 2)에서의 미분계수를 미분계수의 수학적 정의 식 f\'(3) = lim(h→0) [f(3+h) - f(3)] / h 를 사용하여 극한 연산으로 계산해 보세요. 그리고 이 기울기 결과를 이용해 접선의 방정식을 도출하는 전체 과정을 설명해야 합니다.',
        expectedKeywords: ['미분계수 정의', '기울기 3', '접선', 'y - 2 = 3(x - 3)', '극한 계산', 'y = 3x - 7'],
        requiredConcepts: ['미분계수 정의에 따른 극한값 계산', '접선의 방정식 작성'],
        commonMisconceptions: ['미분계수 정의를 쓰지 않고 도함수 공식(f\'(x)=2x-3)에 3을 바로 대입해서 끝내는 오류(정의를 사용하라는 조건 미준수)', '평균변화율 분자 식 [f(3+h)-f(3)] 대입 시 연산 실수'],
        rubric: '1) f(3) = 2 확인 및 f(3+h) = h² + 3h + 2 계산. 2) 정의에 따른 극한식 lim(h→0) [(h² + 3h + 2) - 2] / h = lim(h→0) [h(h + 3)] / h = lim(h→0) (h + 3) = 3 임을 계산하여 도출. 3) 접선의 기울기가 3이고 (3,2)를 지나므로 y - 2 = 3(x - 3) 식을 거쳐 최종 접선의 방정식 y = 3x - 7을 구하는 전 과정을 체계적으로 설명해야 합니다.'
      },
      {
        level: 'advanced',
        question: '함수 f(x) = |x - 1| 은 x = 1 에서 연속이지만 미분가능하지 않은 대표적인 함수입니다. 이 함수가 x = 1 에서 연속임을 보이고, 우미분계수와 좌미분계수의 정의를 이용한 극한 계산을 통해 미분이 불가능한 대수적 이유와 기하학적 이유(뾰족한 점, 즉 첨점의 기하학적 성질)를 함께 설명해 보세요.',
        expectedKeywords: ['우미분계수 1', '좌미분계수 -1', '기울기', '뾰족한 점', '첨점', '미분불가능', '좌우 극한'],
        requiredConcepts: ['함수의 연속성과 미분가능성 판별', '좌/우미분계수의 정의와 극한값'],
        commonMisconceptions: ['불연속이기 때문에 미분이 불가능하다고 단정하는 오류 (연속이지만 미분이 불가능한 예시임)', '좌우 미분계수의 한쪽 극한값만 계산해 미분가능성을 판정하는 태도'],
        rubric: '1) 함숫값 f(1)=0, 우극한/좌극한 모두 0이므로 연속임 확인. 2) 우미분계수 f\'_+(1) = lim(h→0+) [|h|/h] = 1, 좌미분계수 f\'_-(1) = lim(h→0-) [|h|/h] = -1 임을 보임. 3) 두 극한값이 서로 달라 x=1에서의 전체 미분계수(극한값)가 존재하지 않으므로 미분 불가능함을 대수적으로 증명. 4) 기하학적으로는 x=1에서 그래프가 뾰족한 점(첨점)을 이루어 유일한 접선 기울기를 결정할 수 없기 때문임을 논리적으로 서술해야 합니다.'
      }
    ]
  },
  {
    id: 'q_chain_rule',
    testType: 'daily',
    topic: '합성함수의 미분법 (Chain Rule)',
    achievementStandard: '[12미적2-02-02] 합성함수를 미분할 수 있다.',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: '합성함수 y = f(g(x))의 도함수를 구하는 공식인 dy/dx = f\'(g(x)) * g\'(x)에서, 왜 단순히 겉함수의 변화율인 f\'(g(x))만 곱하는 데 그치지 않고 속함수의 변화율인 g\'(x) (속미분)를 결합하여 곱해주어야 하는지 라이프니츠 표기법(dy/dx = dy/du * du/dx)과 미세 변화량의 곱 개념을 이용해 설명해 보세요.',
        expectedKeywords: ['연쇄법칙', '겉미분', '속미분', '변화율', '합성함수', '속함수', '겉함수'],
        requiredConcepts: ['연쇄법칙(Chain Rule)의 미시적 원리', '라이프니츠 표기법'],
        commonMisconceptions: ['dy/dx = dy/du * du/dx 식의 약분을 단순 분수의 기계적 약분으로만 이해하는 태도', '속함수의 변화가 전체 합성 변화율에 기여하는 바를 직관적으로 말하지 못하는 오류'],
        rubric: 'u = g(x)라 할 때, x의 미세 변화가 u의 변화를 유발하고(du/dx = g\'(x)), 다시 이 u의 변화가 y의 변화를 유발하므로(dy/du = f\'(u)), 전체 x에 대한 y의 변화율은 두 독립적인 변화 비율의 곱셈(dy/dx = dy/du * du/dx)으로 결합되어야 함을 증명하고, 이것이 곧 겉미분 f\'(g(x))에 속미분 g\'(x)를 곱하는 원리임을 논리적으로 설명해야 합니다.'
      },
      {
        level: 'standard',
        question: '합성함수 y = (3x² - 2x + 1)³ 의 도함수 dy/dx를 구하는 풀이 과정을 서술해 보세요. 겉함수와 속함수를 u로 치환하여 명확히 분리하고, 합성함수 미분법 공식을 사용하여 속미분이 최종 도함수 식에 어떻게 기여하는지 계산 단계를 나타내야 합니다.',
        expectedKeywords: ['겉미분', '속미분', '3(3x² - 2x + 1)²', '(6x - 2)', '도함수', 'u로 치환'],
        requiredConcepts: ['다항식의 합성 형태 미분', '치환을 통한 공식 대입 연산'],
        commonMisconceptions: ['겉에 있는 3제곱만 미분하고 속의 다항식 (3x²-2x+1)을 미분한 (6x-2)를 곱하지 않는 치명적인 속미분 누락 실수', '속미분을 곱할 때 괄호를 치지 않아 항의 분배가 틀리는 계산 실수'],
        rubric: '1) u = 3x² - 2x + 1 로 치환하여 y = u³ 정의. 2) dy/du = 3u² = 3(3x² - 2x + 1)² (겉미분) 계산. 3) du/dx = 6x - 2 (속미분) 계산. 4) dy/dx = dy/du * du/dx = 3(3x² - 2x + 1)² * (6x - 2) = (18x - 6)(3x² - 2x + 1)² 로 정확하게 겉미분과 속미분의 결합 및 최종 정리가 수행되는 풀이 과정을 서술해야 합니다.'
      },
      {
        level: 'advanced',
        question: '미분가능하고 역함수가 존재하는 함수 f(x)와 그 역함수 g(x) = f^(-1)(x)에 대하여, 역함수 도함수의 공식인 g\'(x) = 1 / f\'(g(x)) (단, f\'(g(x)) ≠ 0) 가 성립함을 역함수의 정의 항등식인 f(g(x)) = x 의 양변 미분과 합성함수의 미분법(연쇄법칙)을 활용하여 증명 및 설명해 보세요.',
        expectedKeywords: ['역함수 도함수', '항등식 f(g(x)) = x', '양변 미분', '연쇄법칙', 'g\'(x)', '나눗셈'],
        requiredConcepts: ['합성함수 미분법을 이용한 역함수의 미분공식 유도', '역함수 정의와 항등성'],
        commonMisconceptions: ['f(g(x)) = x 라는 항등식에서 출발하지 않고 단순 직관이나 공식만 나열하여 기하학적 접선 기울기 역수로만 퉁치는 설명', 'f\'(g(x)) ≠ 0 조건을 누락하고 증명하는 오류'],
        rubric: '1) f와 g가 역함수이므로 모든 정의 영역에 대해 f(g(x)) = x가 성립하는 항등식을 적을 것. 2) 이 항등식의 양변을 x에 대해 미분할 때 합성함수의 미분법을 적용해 f\'(g(x)) * g\'(x) = 1 임을 밝힘. 3) f\'(g(x))가 0이 아니라는 가정 하에 양변을 나누어 g\'(x) = 1 / f\'(g(x)) 공식을 깔끔하게 증명하고 유도 과정을 설명해야 합니다.'
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
