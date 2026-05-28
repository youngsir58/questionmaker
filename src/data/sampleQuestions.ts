import type { Question } from '../types';

export const sampleQuestions: Question[] = [
  {
    id: 'q_remainder_theorem',
    testType: 'daily',
    topic: '1) 나머지정리와 인수정리 (Remainder and Factor Theorems)',
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
    id: 'q_quad_maxmin',
    testType: 'daily',
    topic: '2) 이차함수의 최대와 최소 (Maximum/Minimum of Quadratic Functions)',
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
    topic: '3) 이차방정식과 이차함수의 관계 (Relation between Equations/Functions)',
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
    id: 'q_matrix_ops',
    testType: 'daily',
    topic: '4) 행렬의 연산 (Operations on Matrices)',
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
    id: 'q_perm_comb',
    testType: 'daily',
    topic: '5) 순열과 조합의 뜻 (Meaning of Permutations/Combinations)',
    achievementStandard: '[10공수1-03-02] 순열과 조합의 뜻을 알고, 경우의 수를 구할 수 있다.',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: '순열(Permutation)과 조합(Combination)의 개념적 차이를 실생활 사례(예: 동아리 임원 선출 vs 청소 당번 선출)를 들어 비교하고, 기호 nPr과 nCr의 수식적 정의와 관계를 설명해 보세요.',
        expectedKeywords: ['순서', '나열', '선택', '임원 선출', '당번 선출', 'nPr', 'nCr'],
        requiredConcepts: ['순열의 정의', '조합의 정의', '순열과 조합의 수식 관계'],
        commonMisconceptions: ['순열과 조합을 구분할 때 순서의 유무를 고려하지 않고 무작정 곱하거나 더하는 것', '팩토리얼 계산 기호에 대한 혼동'],
        rubric: '1) 순열은 순서를 고려해 나열하고 조합은 순서 없이 선택만 한다는 차이를 실생활 사례와 매칭해 설명. 2) nPr = n! / (n-r)!, nCr = n! / (r!(n-r)!) 정의 및 nPr = nCr * r! 의 관계를 유도 설명할 것.'
      },
      {
        level: 'standard',
        question: '서로 다른 7명의 학생 중에서 4명을 뽑아 일렬로 세우는 경우의 수(순열)와, 4명을 단순히 뽑는 경우의 수(조합)를 각각 계산하고, 그 차이를 설명해 보세요. 특히 조합의 경우의 수에 4!을 곱하면 왜 순열의 경우의 수와 같아지는지 경우의 수 분할 관점에서 논리적으로 설명해야 합니다.',
        expectedKeywords: ['7P4', '840', '7C4', '35', '4!', '경우의 수', '나열'],
        requiredConcepts: ['순열과 조합의 수치 계산', '조합을 통한 순열 유도 원리'],
        commonMisconceptions: ['7P4와 7C4의 연산 기호를 혼동해 곱이나 나누기 숫자를 실수하는 것', '경우의 수 연산의 단계적 곱의 법칙을 이해하지 못함'],
        rubric: '1) 7P4 = 840, 7C4 = 35 임을 계산. 2) 7명의 학생 중 4명을 뽑는 35가지 각각의 조합에 대해, 뽑힌 4명을 나열하는 방법이 4! = 24가지씩 존재하므로 전체 순열 수는 35 * 24 = 840이 됨을 설명해야 합니다.'
      },
      {
        level: 'advanced',
        question: '조합의 성질 중 nCr = n-1Cr-1 + n-1Cr 이 성립함을 대수적으로 증명하고, 이를 특정 학생 A를 포함하는 경우와 포함하지 않는 경우로 나누어 생각하는 기하학적/대수적 의미를 논리적으로 설명해 보세요.',
        expectedKeywords: ['대수적 증명', '팩토리얼', 'A를 포함하는 경우', 'A를 포함하지 않는 경우', '경우의 수 분할'],
        requiredConcepts: ['조합의 대수적 증명', '사건의 배반 분할(경우의 수 논증)'],
        commonMisconceptions: ['팩토리얼의 대수적 분모 통분을 할 줄 모르는 연산 에러', '논리적인 분할의 의미를 설명하지 못하고 공식 대입만 반복하는 현상'],
        rubric: '1) 팩토리얼 정의 nCr = n! / (r!(n-r)!)을 사용해 우변을 통분하여 좌변을 유도하는 대수적 과정 작성. 2) n명 중 r명을 선택할 때, 특정 1명을 반드시 포함하는 경우(n-1명 중 r-1명 선택)와 포함하지 않는 경우(n-1명 중 r명 선택)로 나뉘는 논리적 분할을 서술할 것.'
      }
    ]
  },
  {
    id: 'q_circle_line',
    testType: 'daily',
    topic: '6) 원과 직선의 위치 관계 (Relation between Circle and Line)',
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
    id: 'q_exponent_laws',
    testType: 'daily',
    topic: '7) 지수의 확장과 지수법칙 (Extension of Exponents/Laws)',
    achievementStandard: '[12대수01-01] 거듭제곱과 거듭제곱근의 뜻을 알고, 그 성질을 이해한다.',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: '양의 실수 a와 자연수 n에 대하여, a의 n제곱근의 정의와 실수인 것의 개수가 n이 홀수일 때와 짝수일 때 어떻게 결정되는지 y = x^n 그래프와 상수함수 y = a의 기하학적 교점 의미를 담아 설명해 보세요.',
        expectedKeywords: ['거듭제곱근', '실수 개수', '홀수 제곱근', '짝수 제곱근', '교점', 'y = x^n 그래프'],
        requiredConcepts: ['거듭제곱근의 대수적 정의', '실수 범위에서의 개수 판정 기하학'],
        commonMisconceptions: ['음수의 홀수 제곱근이 실수로 존재할 수 없다고 오해하는 것', 'a의 n제곱근의 개수가 실수 여부와 상관없이 항상 실수에서만 정의된다고 착각하는 것'],
        rubric: 'n이 홀수이면 y=x^n 그래프의 대칭적 개형에 의해 실수 a의 부호와 무관하게 교점이 1개이므로 실수 거듭제곱근이 1개 존재하고, n이 짝수이면 y=x^n 그래프가 y축 대칭(아래로 볼록)이므로 a > 0 일 때 2개, a = 0 일 때 1개, a < 0 일 때 0개 존재함을 그래프 교점의 수와 결합하여 설명해야 합니다.'
      },
      {
        level: 'standard',
        question: '지수의 범위가 정수에서 유리수로 확장될 때, 밑 조건이 왜 양수(a > 0)로 제한되어야 하는지 유리수 지수 (예: (-2)^(1/2))가 실수 범위 내에서 성립하지 못하거나 모순을 유발하는 원리를 들어 설명해 보세요.',
        expectedKeywords: ['밑 조건', '양수 제한', '유리수 지수', '짝수 제곱근', '허수', '모순'],
        requiredConcepts: ['지수의 실수 확장 조건', '거듭제곱근 연산의 정의적 한계'],
        commonMisconceptions: ['음수 밑의 분수 지수를 단순히 부호 실수가 발생하기 쉽기 때문이라고 가볍게 여기는 태도'],
        rubric: '유리수 지수 a^(p/q)는 q제곱근 a^p로 환원되는데, a < 0 이고 q가 짝수이면 실수 범위 내에 존재하지 않는 허수가 됨을 설명해야 합니다. 또한 지수법칙((-2)^(2 * 1/2) = ((-2)²)^(1/2) = 2)과 일반 연산 간에 음수 밑을 쓰면 모순이 유도되므로 수학적 일관성을 위해 밑 조건을 a > 0으로만 한정해야 함을 설명해야 합니다.'
      },
      {
        level: 'advanced',
        question: '실수 a에 대하여 a의 n제곱근 중 실수인 것의 개수를 f(a, n)이라 정의할 때, f(3, 3) + f(-3, 4) + f(-3, 5)의 최종 합산 값을 구하고, 각각의 값을 도출하는 기하학적 근거를 설명해 보세요.',
        expectedKeywords: ['실수 개수', 'f(3, 3) = 1', 'f(-3, 4) = 0', 'f(-3, 5) = 1', '합산 값 2', '기하학적 근거'],
        requiredConcepts: ['자취 개수 함수 적용', '짝수/홀수 제곱근의 실근 판정 조건화'],
        commonMisconceptions: ['f(-3, 4)를 4차식이므로 실수 개수가 2개라고 오산하거나 음수 제곱근은 무조건 존재하지 않는다고 치부하는 것'],
        rubric: '1) f(3,3)은 3이 홀수이므로 밑의 부호 상관없이 1개임 명시. 2) f(-3,4)는 4가 짝수이고 밑이 음수(-3)이므로 실수인 개수는 0개임 명시. 3) f(-3,5)는 5가 홀수이므로 1개임 명시. 4) 따라서 1 + 0 + 1 = 2 가 도출되는 수학적 근거를 명료하게 서술해야 합니다.'
      }
    ]
  },
  {
    id: 'q_log_properties',
    testType: 'daily',
    topic: '8) 로그의 뜻과 성질 (Definition and Properties of Logarithms)',
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
    id: 'q_trig_def',
    testType: 'daily',
    topic: '9) 삼각함수의 뜻 (Definition of Trigonometric Functions)',
    achievementStandard: '[12대수02-01] 호도법의 뜻을 알고, 삼각함수의 뜻을 이해한다.',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: '좌표평면에서 원점 O와 점 P(x, y)를 잇는 동경 OP가 x축의 양의 방향과 이루는 각을 θ, 선분 OP의 길이를 r이라 할 때, 일반각에 대한 삼각함수 sin θ, cos θ, tan θ의 정의를 부호를 포함하여 설명해 보세요.',
        expectedKeywords: ['동경', '반지름 r', 'y좌표', 'x좌표', '기울기', '일반각'],
        requiredConcepts: ['동경과 삼각함수의 정의', '좌표를 이용한 정의 확장'],
        commonMisconceptions: ['sin과 cos을 여전히 직각삼각형 내부에서만 정의해 부호를 가지는 것을 이해하지 못함'],
        rubric: 'sin θ = y/r, cos θ = x/r, tan θ = y/x 로 정의하고, 이때 x와 y는 점 P의 평면상 좌표이므로 θ의 사분면에 따라 삼각함수가 음수 또는 양수의 부호를 가지게 됨을 설명해야 합니다.'
      },
      {
        level: 'standard',
        question: '각 θ가 제3사분면의 각이고 tan θ = 4/3 일 때, sin θ와 cos θ의 값을 좌표 상의 동경 P의 위치를 이용해 부호를 고려하여 구하는 과정을 설명해 보세요.',
        expectedKeywords: ['제3사분면', 'x좌표 -3', 'y좌표 -4', '반지름 5', 'sin θ = -4/5', 'cos θ = -3/5'],
        requiredConcepts: ['사분면별 삼각함수의 부호', '정의를 이용한 삼각함수 값 계산'],
        commonMisconceptions: ['tan θ = 4/3이므로 단순히 x=3, y=4로 두어 sin θ = 4/5, cos θ = 3/5로 부호 오류를 범하는 경우'],
        rubric: '1) 3사분면에서는 x < 0, y < 0 이므로 P(-3, -4)로 동경 상의 점을 잡음. 2) 원점과 P 사이 거리 r = 5 계산. 3) 삼각함수 정의에 따라 sin θ = y/r = -4/5, cos θ = x/r = -3/5 가 됨을 부호 조건과 연계해 기재해야 합니다.'
      },
      {
        level: 'advanced',
        question: '동경의 회전을 이용하여 삼각함수의 음각 공식 sin(-θ) = -sin θ, cos(-θ) = cos θ 가 성립함을, 각 θ를 나타내는 동경 OP와 각 -θ를 나타내는 동경 OQ의 x축 대칭 관계를 이용하여 증명하고 기하학적 의미를 설명해 보세요.',
        expectedKeywords: ['x축 대칭', 'y좌표 부호 반대', 'x좌표 동일', '음각 공식', '기함수', '우함수'],
        requiredConcepts: ['대칭 이동과 삼각함수의 부호 변화', '동경의 기하학적 거동'],
        commonMisconceptions: ['공식을 그냥 암기하여 설명하고 동경의 x축 대칭성에 의한 좌표 변화를 기하학적으로 설명하지 못함'],
        rubric: '1) θ의 동경 종점 P(x, y)에 대해, -θ의 동경 종점 Q는 x축 대칭이므로 Q(x, -y)가 됨을 언급. 2) sin(-θ) = -y/r = -sin θ, cos(-θ) = x/r = cos θ 임을 삼각함수 정의식과 좌표 대입을 통해 수학적으로 도출 및 설명할 것.'
      }
    ]
  },
  {
    id: 'q_limit_convergence',
    testType: 'daily',
    topic: '10) 함수의 극한과 수렴 (Limits and Convergence of Functions)',
    achievementStandard: '[12미적1-01-01] 함수의 극한의 뜻을 알고, 좌극한과 우극한의 뜻을 이해한다.',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: '함수 f(x)에서 x의 값이 a가 아니면서 a에 한없이 가까워질 때, f(x)의 값이 일정한 값 L에 한없이 가까워지는 상태를 \'f(x)가 L에 수렴한다\'라고 하고 L을 극한값이라고 합니다. 이때 \'x가 a에 가까워진다\'는 말의 수학적 의미를 방향성(좌극한과 우극한)과 관련지어 설명해 보세요.',
        expectedKeywords: ['좌극한', '우극한', '일치', '방향', '극한값', '수렴'],
        requiredConcepts: ['함수의 극한과 수렴 정의', '좌우극한의 동치성'],
        commonMisconceptions: ['x=a에서의 함숫값 f(a)가 정의되어야만 극한값 L이 존재할 수 있다고 오해하는 오류', '한쪽 방향의 변화만 고려하고 좌우 방향 모두를 체크하지 않는 오류'],
        rubric: 'x가 a에 접근할 때 x < a 인 왼쪽에서 오는 좌극한과 x > a 인 오른쪽에서 오는 우극한이 모두 존재하고 그 값이 L로 일치할 때만 극한값 L이 존재하고 수렴한다고 설명해야 합니다.'
      },
      {
        level: 'standard',
        question: '극한식 lim(x→1) (x² - 1) / (x - 1) 의 값을 구하는 과정을 설명해 보세요. 특히 x → 1 일 때 분모가 0이 되는 부정형(0/0 꼴) 문제를 다항식의 약분과 극한의 성질을 이용해 어떻게 해결할 수 있는지 논리적 단계를 서술해야 합니다.',
        expectedKeywords: ['부정형', '0/0 꼴', '인수분해', '약분', 'x가 1이 아님', '극한값 2'],
        requiredConcepts: ['0/0 꼴 부정형의 극한 계산', '약분의 대수적 근거'],
        commonMisconceptions: ['분모 분자에 단순히 x=1을 대입해 0/0 이므로 값이 없다고 단정하는 오류', '약분 시 x-1이 0이 아님을 밝히지 않는 무결성 결여'],
        rubric: '1) x가 1에 가까워질 때 x ≠ 1 이므로 x - 1 ≠ 0 임을 명시. 2) 따라서 분자 x² - 1 = (x-1)(x+1)로 인수분해 후 x-1을 약분 가능. 3) lim(x→1) (x+1) = 2 가 됨을 극한 법칙으로 구하는 단계를 서술해야 합니다.'
      },
      {
        level: 'advanced',
        question: '함수 f(x)가 x = a 에서 극한값 lim(x→a) f(x) = L 을 갖는 것과 함숫값 f(a)가 정의되는 것, 그리고 x = a 에서 연속인 것(lim(x→a) f(x) = f(a))의 차이를 구체적인 그래프 유형(예: 구멍 뚫린 그래프, 끊어진 그래프 등)과 연결하여 설명해 보세요.',
        expectedKeywords: ['극한값 존재', '함숫값 정의', '연속', '구멍 뚫린', '일치', '함수 연속 조건'],
        requiredConcepts: ['극한값, 함숫값, 연속의 차이 및 정의', '기하학적 그래프 해석'],
        commonMisconceptions: ['극한값이 존재하면 항상 연속이라고 오해하는 오류', '연속 조건을 세분화하여 증명하지 못하는 오류'],
        rubric: '1) 극한값은 x가 a근처로 갈 때 목표값이며 f(a)의 유무와 상관없음(예: x=a에 구멍이 뚫려있어도 좌우 높이가 같으면 존재). 2) 연속은 극한값과 함숫값이 모두 존재하고 그 둘이 일치하여 그래프가 끊김 없이 이어지는 상태임을 기하학적으로 설명해야 합니다.'
      }
    ]
  },
  {
    id: 'q_deriv_geometric',
    testType: 'daily',
    topic: '11) 미분계수의 기하학적 의미 (Geometric Meaning of Derivative)',
    achievementStandard: '[12미적1-02-02] 미분계수의 기하학적 의미를 이해한다.',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: '함수 y = f(x)의 그래프 상의 두 점 P(a, f(a)) and Q(a + Δx, f(a + Δx))를 잇는 할선의 기울기가 평균변화율입니다. 변수 Δx가 0으로 한없이 가까워질 때(Δx → 0), 평균변화율의 극한값으로 정의되는 미분계수 f\'(a)가 기하학적으로 왜 점 P에서의 "접선의 기울기"에 수렴하는지 그림을 상상하듯 상세히 설명해 보세요.',
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
    topic: '12) 합성함수의 미분법 (Chain Rule)',
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
  },
  {
    id: 'q_binomial_theorem',
    testType: 'daily',
    topic: '13) 이항정리의 이해 (Binomial Theorem)',
    achievementStandard: '[12확통01-03] 이항정리를 이해하고 이를 활용하여 다양한 문제를 해결할 수 있다.',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: '다항식 (a + b)^n 을 전개했을 때 각 항의 계수가 조합(nCr)과 어떻게 연결되는지 이항정리 공식을 적어 설명하고, (a + b)³ 을 전개하여 각 항의 계수가 3C0, 3C1, 3C2, 3C3이 되는 원리를 곱의 법칙 관점에서 설명해 보세요.',
        expectedKeywords: ['이항정리', '이항계수', '조합 nCr', '선택', '곱의 법칙', '3C1', '3C2'],
        requiredConcepts: ['이항정리 정의', '전개식의 계수 형성 원리'],
        commonMisconceptions: ['공식을 그냥 대입해 암기하여 전개할 뿐, 여러 괄호 중 b를 선택하는 조합의 원리를 설명하지 못함'],
        rubric: '1) (a+b)^n의 전개식은 n개의 (a+b) 괄호 중에서 b를 r개 택하고 a를 n-r개 택하는 경우의 수 nCr이 각 항 a^(n-r)b^r의 계수가 됨을 설명. 2) (a+b)³ 전개 시 b가 1개인 항 ab²의 계수는 3개의 괄호 중 b를 택할 1개의 괄호를 결정하는 3C1 = 3이 됨을 설명할 것.'
      },
      {
        level: 'standard',
        question: '이항정리를 이용하여 다항식 (2x - 1)⁵ 의 전개식에서 x³ 의 계수를 구하는 상세한 과정을 서술해 보세요. 일반항 nCr * a^(n-r) * b^r 꼴을 사용해 식을 세우는 단계를 명확히 나타내야 합니다.',
        expectedKeywords: ['일반항', '5Cr', '(2x)^(5-r)', '(-1)^r', 'r = 2', '5C2 = 10', '계수 80'],
        requiredConcepts: ['이항정리 일반항 활용', '특정 항의 계수 계산'],
        commonMisconceptions: ['상수항의 부호 (-1)을 빠뜨려 계수의 부호를 틀리는 계산 실수', '2x의 거듭제곱 계산 시 2의 거듭제곱을 누락하고 x의 지수만 구하는 실수'],
        rubric: '1) 일반항 5Cr * (2x)^(5-r) * (-1)^r 작성. 2) x³의 계수를 구하기 위해 5-r = 3 => r = 2 대입. 3) 5C2 * (2)³ * (-1)² = 10 * 8 * 1 = 80 이 됨을 산출 과정을 거쳐 상세히 유도 설명해야 합니다.'
      },
      {
        level: 'advanced',
        question: '이항정리 공식을 이용하여 조합의 합 성질인 nC0 + nC1 + nC2 + ... + nCn = 2^n 이 성립함과, nC0 - nC1 + nC2 - ... + (-1)^n * nCn = 0 이 성립함을 다항식 (1 + x)^n 의 x값 대입을 통해 증명해 보세요.',
        expectedKeywords: ['(1+x)^n 전개식', 'x=1 대입', 'x=-1 대입', '조합의 합', '교대합', '2^n', '0'],
        requiredConcepts: ['이항계수의 성질 증명', '특정 값 대입법'],
        commonMisconceptions: ['증명 시 x=1, -1을 대입하는 유도를 하지 않고 단순히 암기한 식으로 서술하는 경우'],
        rubric: '1) (1+x)^n = nC0 + nC1*x + nC2*x² + ... + nCn*x^n 전개식 작성. 2) x=1 대입 시 좌변 2^n과 우변 조합의 합 일치 증명. 3) x=-1 대입 시 좌변 0과 우변 부호 교대합의 일치를 논리적으로 도출할 것.'
      }
    ]
  },
  {
    id: 'q_parabolas',
    testType: 'daily',
    topic: '14) 포물선의 정의와 방정식 (Parabolas)',
    achievementStandard: '[12기하01-01] 포물선의 뜻을 알고, 포물선의 방정식을 구할 수 있다.',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: '평면 위의 한 고정된 점 F(초점)와 이 점을 지나지 않는 한 고정된 직선 L(준선)에 이르는 거리가 같은 점들의 집합(자취)이 포물선입니다. 초점이 F(p, 0)이고 준선이 x = -p 일 때, 포물선의 방정식이 y² = 4px 가 유도되는 과정을 점과 점 사이 거리 공식 및 점과 직선 사이 거리 공식을 이용해 설명해 보세요.',
        expectedKeywords: ['초점 F', '준선 x=-p', '거리 공식', 'y² = 4px', '자취', '동일한 거리'],
        requiredConcepts: ['기하학적 포물선의 정의', '자취의 방정식 유도'],
        commonMisconceptions: ['포물선의 정의를 단지 "2차함수 그래프"로만 생각하고 기하학적 준선과 초점의 정의를 무시하는 것', '유도 연산 시 제곱 과정에서의 소거 실수'],
        rubric: '포물선 위의 점 P(x, y)에 대해 초점 F(p, 0)까지의 거리 PF = √((x-p)² + y²)와 준선 x = -p까지의 거리 |x+p|가 같음을 식(√((x-p)² + y²) = |x+p|)으로 세우고, 양변을 제곱해 정리하여 y² = 4px 가 됨을 유도하여 설명해야 합니다.'
      },
      {
        level: 'standard',
        question: '포물선 y² = 8x 의 초점 F의 좌표와 준선의 방정식을 구하고, 이 포물선 위의 한 점 P에서 초점 F까지의 거리가 5일 때 점 P의 x좌표를 포물선의 기하학적 정의(준선까지의 거리)를 활용해 구하는 논리적 풀이 과정을 서술해 보세요.',
        expectedKeywords: ['y² = 4px', '초점 (2, 0)', '준선 x = -2', '정의', '준선까지의 거리', 'x + 2 = 5', 'x = 3'],
        requiredConcepts: ['포물선 성분 분석(초점, 준선)', '기하적 정의의 실전 문제 적용'],
        commonMisconceptions: ['거리 공식에 점 좌표를 직접 대입해 연립방정식을 풀려고 하여 계산을 복잡하게 만드는 경우 (준선까지의 거리 = 초점까지의 거리 성질을 쓰면 훨씬 쉬움)'],
        rubric: '1) y² = 8x => 4px = 8x => p = 2 이므로 초점 F(2, 0), 준선 x = -2 유도. 2) 포물선 정의에 의해 점 P(x, y)에서 초점까지의 거리 5는 준선 x = -2까지의 거리인 |x - (-2)| = x + 2 와 같아야 함을 언급. 3) 따라서 x + 2 = 5이므로 점 P의 x좌표는 3이 됨을 논리적으로 기재해야 합니다.'
      },
      {
        level: 'advanced',
        question: '포물선 y² = 4px 위의 점 P(x₁, y₁)에서의 접선의 방정식이 y₁y = 2p(x + x₁) 임을, 미분(음함수 미분법) 또는 판별식 D = 0 을 활용하여 증명하고 유도 과정을 자세히 설명해 보세요. (단, y₁ ≠ 0)',
        expectedKeywords: ['음함수 미분법', '접선의 기울기', 'y₁y = 2p(x + x₁)', '판별식 D=0', '유도 과정'],
        requiredConcepts: ['포물선의 접선의 방정식 유도', '기울기와 접점 조건의 매치'],
        commonMisconceptions: ['공식을 그냥 외워 적고 판별식이나 미분 유도 과정을 건너뛰는 증명 오류', '음함수 미분 계산 시 dy/dx를 구하는 과정의 부호 실수'],
        rubric: '1) y² = 4px 양변을 x에 대해 음함수 미분하여 2y * (dy/dx) = 4p => dy/dx = 2p/y 임을 보임. 2) 점 (x₁, y₁)에서의 접선 기울기가 2p/y₁ 임을 언급. 3) 접선식 y - y₁ = (2p/y₁)(x - x₁) => y₁y - y₁² = 2px - 2px₁ 유도. 4) y₁² = 4px₁ 임을 대입해 y₁y - 4px₁ = 2px - 2px₁ => y₁y = 2p(x + x₁)를 유도하는 단계를 증명해야 합니다.'
      }
    ]
  },
  {
    id: 'q_poly_multiplication',
    testType: 'daily',
    topic: '15) 다항식의 곱셈과 곱셈 공식 (Multiplication and Formulas of Polynomials)',
    achievementStandard: '[10공수1-01-01] 다항식의 사칙연산을 할 수 있다.',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: '세 다항식의 곱셈 공식 중 세제곱 공식 (a + b)³ = a³ + 3a²b + 3ab² + b³ 이 성립함을 분배법칙 (a + b)(a + b)² 을 사용하여 전개 과정을 단계별로 유도하고 증명해 보세요.',
        expectedKeywords: ['분배법칙', '전개', '동류항 정리', 'a²+2ab+b²', '3a²b'],
        requiredConcepts: ['다항식 곱셈의 기본 원리', '동류항 정리'],
        commonMisconceptions: ['(a+b)³을 단순 분배하여 a³+b³으로만 작성하고 중간 항들을 빠뜨리는 오류'],
        rubric: '1) (a+b)² = a²+2ab+b² 임을 언급. 2) (a+b)(a²+2ab+b²)를 분배법칙으로 전개하여 a³ + 2a²b + ab² + a²b + 2ab² + b³ 식 기재. 3) 동류항끼리 정리하여 최종 식을 도출하는 전 과정을 빠짐없이 서술해야 함.'
      },
      {
        level: 'standard',
        question: '두 실수 x, y에 대하여 x + y = 4 이고 xy = 2 일 때, 곱셈공식 변형을 활용하여 x³ + y³ 의 값을 구하는 풀이 과정을 서술해 보세요. 특히 x³ + y³ = (x + y)³ - 3xy(x + y) 변형 공식이 어떻게 도출되는지도 간단히 설명해 주세요.',
        expectedKeywords: ['곱셈공식 변형', '합과 곱', '대입', '40', '이항'],
        requiredConcepts: ['곱셈공식 변형의 활용', '식의 값 구하기'],
        commonMisconceptions: ['변형 공식의 부호를 헷갈려 +3xy(x+y)로 적용하는 계산 실수', 'x³+y³을 단순히 각각 세제곱해서 더하려고 시도하다가 수치를 구하지 못하는 경우'],
        rubric: '1) (x+y)³ = x³+y³+3xy(x+y) 에서 x³+y³ 을 남기고 이항하여 변형 공식을 도출하는 원리 기재. 2) 합 4와 곱 2를 대입하여 4³ - 3*2*4 = 64 - 24 = 40 임을 정확히 유도할 것.'
      },
      {
        level: 'advanced',
        question: '세 실수 a, b, c에 대하여 a + b + c = 3, a² + b² + c² = 9 일 때, ab + bc + ca 의 값을 구하고, 이를 토대로 (a - b)² + (b - c)² + (c - a)² 의 값을 유도해 계산하는 수학적 과정을 서술해 보세요.',
        expectedKeywords: ['공식 활용', 'ab+bc+ca', '0', '제곱의 합', '곱셈공식의 변형', '18'],
        requiredConcepts: ['3변수 곱셈공식의 변형', '완전제곱식의 기하적 해석'],
        commonMisconceptions: ['ab+bc+ca의 값을 구하는 공식을 기억하지 못하는 경우', '식 전개 시 2배(2ab 등) 인자를 누락하는 오류'],
        rubric: '1) (a+b+c)² = a²+b²+c²+2(ab+bc+ca) 공식에 대입하여 9 = 9 + 2(ab+bc+ca) 이므로 ab+bc+ca = 0 임을 도출. 2) (a-b)²+(b-c)²+(c-a)² = 2(a²+b²+c²) - 2(ab+bc+ca) 임을 전개하여 유도. 3) 최종값인 2(9) - 0 = 18을 계산해 낼 것.'
      }
    ]
  },
  {
    id: 'q_set_operations',
    testType: 'daily',
    topic: '16) 집합의 연산과 법칙 (Operations and Laws of Sets)',
    achievementStandard: '[10공수2-02-02] 집합의 연산을 할 수 있고, 그 성질을 이해한다.',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: '두 집합 A, B에 대하여 차집합 A - B의 정의가 무엇인지 조건제시법을 활용하여 설명하고, 이것이 여집합을 사용하여 A ∩ B^c 와 수학적으로 같아지는 이유를 벤다이어그램의 기하적 겹침을 들어 설명해 보세요.',
        expectedKeywords: ['조건제시법', 'A에 속하고 B에는 속하지 않는', '여집합', '교집합', '벤다이어그램', '동치'],
        requiredConcepts: ['차집합의 대수적 정의', '벤다이어그램을 통한 표현'],
        commonMisconceptions: ['차집합을 집합 연산이 아닌 단순 뺄셈 연산으로 부호 차감하듯이 서술하는 오류', '여집합 기호의 영역을 벤다이어그램 상에서 잘못 구획하는 경우'],
        rubric: '1) A - B = {x | x ∈ A 그리고 x ∉ B} 라는 정의 조건제시법 기재. 2) B^c는 B를 제외한 전체 영역이고, A ∩ B^c는 A와 B^c의 공통 부분이므로 결국 A에서 B에 속한 부분을 떼어낸 차집합 영역과 완전히 포개어짐을 벤다이어그램 기준으로 설명할 것.'
      },
      {
        level: 'standard',
        question: '전체집합 U의 두 부분집합 A, B에 대하여 드모르간의 법칙 (A ∪ B)^c = A^c ∩ B^c 가 성립함을 벤다이어그램을 그려 설명하거나, 임의의 원소 x가 좌변에 속할 조건이 우변에 속할 조건과 논리적으로 동치임을 서술해 보세요.',
        expectedKeywords: ['드모르간', '여집합', '교집합', '합집합', '부정', '논리적 동치'],
        requiredConcepts: ['드모르간의 법칙 증명', '집합의 부정 논리'],
        commonMisconceptions: ['여집합을 분배할 때 가운데 합집합 ∪ 기호를 교집합 ∩ 으로 뒤집지 않고 그대로 두는 실수', '원소 수준의 동치 조건 논증에서 "그리고"와 "또는"을 혼동하여 적는 실수'],
        rubric: '1) 좌변 (A ∪ B)^c 에 속하는 원소 x는 A ∪ B에 속하지 않음을 서술. 2) 즉 x ∉ A 이고 x ∉ B 임을 밝힘. 3) 이는 x ∈ A^c 이고 x ∈ B^c 임과 같으므로 결국 x ∈ (A^c ∩ B^c) 가 됨을 논리적으로 연결해 설명할 것.'
      },
      {
        level: 'advanced',
        question: '세 부분집합 A, B, C에 대하여 집합의 분배법칙 A ∩ (B ∪ C) = (A ∩ B) ∪ (A ∩ C) 가 성립함을 증명해 보세요. 벤다이어그램을 이용해 좌변과 우변이 나타내는 기하학적 영역이 완벽히 동등함을 단계별로 서술해 보세요.',
        expectedKeywords: ['분배법칙', '벤다이어그램', '교집합', '합집합', '영역 일치', '동일 영역'],
        requiredConcepts: ['세 집합의 연산 법칙', '벤다이어그램의 다영역 매핑'],
        commonMisconceptions: ['연산자(교집합/합집합)를 단순 혼용하여 결합법칙과 혼동하는 오류', '3개 원형 벤다이어그램의 겹침 영역을 복잡하게 생각해 칠하는 영역을 실수하는 경우'],
        rubric: '1) 좌변인 A ∩ (B ∪ C)는 B와 C의 합집합 영역 중 A에 포함되는 부분을 칠한 것임을 서술. 2) 우변인 (A ∩ B) ∪ (A ∩ C)는 A와 B의 공통 부분과 A와 C의 공통 부분을 모두 합한 영역임을 서술. 3) 두 과정에서 색칠되는 3개 원의 겹침 영역이 정확히 일치함을 영역 번호나 구획을 통해 증명할 것.'
      }
    ]
  },
  {
    id: 'q_arithmetic_sequence',
    testType: 'daily',
    topic: '17) 등차수열의 일반항과 합 (Arithmetic Sequences)',
    achievementStandard: '[12대수03-01] 등차수열의 뜻을 알고, 일반항과 첫째항부터 제n항까지의 합을 구할 수 있다.',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: '첫째항이 a이고 공차가 d인 등차수열의 일반항 a_n 공식이 a_n = a + (n - 1)d 로 주어지는 이유를 수열의 귀납적 정의 a_1 = a, a_n+1 = a_n + d 를 활용해 단계적으로 대수적 나열을 하여 증명해 보세요.',
        expectedKeywords: ['일반항', '공차', '첫째항', 'n-1번', '귀납적', '더해진다'],
        requiredConcepts: ['등차수열의 귀납적 규칙', '일반항의 수학적 유도'],
        commonMisconceptions: ['공차 d를 n번 더한다고 오인하여 일반항을 a + nd 로 오기하는 경우', '규칙의 대수적 전개 과정을 보여주지 않고 공식만 기재하는 경우'],
        rubric: '1) a_1 = a, a_2 = a+d, a_3 = a_2+d = a+2d, a_4 = a+3d 와 같이 진행됨을 나열. 2) 제n항 a_n에 도달할 때까지 공차 d가 첫째항 뒤에 총 n-1번 더해지므로 일반항이 a + (n-1)d 가 됨을 논리적으로 이끌어 낼 것.'
      },
      {
        level: 'standard',
        question: '제3항이 8이고 제7항이 20인 등차수열에 대하여, 이 수열의 첫째항 a와 공차 d를 구하는 연립일차방정식을 세워 풀고, 이를 통해 이 수열의 첫째항부터 제10항까지의 합 S_10을 등차수열 합 공식을 사용해 구하는 과정을 설명해 보세요.',
        expectedKeywords: ['연립방정식', '공차 3', '첫째항 2', '합 공식', 'S_10', '155'],
        requiredConcepts: ['일반항 조건을 이용한 연립방정식', '등차수열의 합 연산'],
        commonMisconceptions: ['일반항 관계식에서 a + 3d = 8 (제3항인데 3d를 적는 오류)과 같이 첨자를 헷갈리는 오류', '합 공식 적용 시 n/2 에 10이 아닌 다른 값을 대입하거나 연산 부호 실수'],
        rubric: '1) a_3 = a + 2d = 8, a_7 = a + 6d = 20 연립하여 d = 3, a = 2 임을 명시. 2) 등차수열 합 공식 S_n = n{2a + (n-1)d}/2에 대입. 3) S_10 = 10{2(2) + 9(3)}/2 = 5 * (4 + 27) = 5 * 31 = 155 계산 과정을 완벽히 기술해야 함.'
      },
      {
        level: 'advanced',
        question: '가우스(Gauss)가 초등학생 시절 1부터 100까지의 자연수의 합을 대칭성을 이용하여 빠르게 구한 원리를 설명해 보세요. 이 아이디어가 등차수열의 첫째항 a와 제n항(끝항) l을 사용하는 합 공식 S_n = n(a + l)/2 에 어떻게 일반화되어 녹아 있는지 대칭 항들의 쌍(pair)의 성질을 중심으로 논리적으로 서술해 보세요.',
        expectedKeywords: ['가우스', '대칭성', '쌍의 합', '양 끝항', '역순으로 더하기', 'n(a+l)/2'],
        requiredConcepts: ['등차수열 합 공식의 기하적/가우스 유도 원리', '대칭적 항들의 합이 일정함'],
        commonMisconceptions: ['가우스의 에피소드만 적고 임의의 등차수열 합 공식 유도식 S_n = a + (a+d) + ... 과 역순 합 S_n = l + (l-d) + ... 을 더해 2S_n = n(a+l)을 이끌어내는 대수적 수식을 빠뜨리는 것'],
        rubric: '1) 1부터 100까지 합할 때 (1+100) + (2+99) + ... 처럼 합이 101로 일정한 쌍이 50개 생긴다는 가우스 원리 기재. 2) 이를 일반 등차수열로 확장하여 S_n을 쓰고, 그 밑에 역순으로 적어 두 식을 합하면 각 열의 합이 (a+l)로 항상 일정하여 n개 존재하게 됨을 서술. 3) 따라서 2S_n = n(a+l)이므로 S_n = n(a+l)/2 가 됨을 명확히 보일 것.'
      }
    ]
  },
  {
    id: 'q_definite_integral',
    testType: 'daily',
    topic: '18) 정적분의 정의와 계산 (Definite Integrals)',
    achievementStandard: '[12미적1-03-03] 정적분의 뜻을 알고, 다항함수의 정적분을 구할 수 있다.',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: '부정적분과 정적분의 가장 핵심적인 개념 차이가 무엇인지 결과물의 형태(상수 vs 식)와 기하학적 의미(함수군 vs 넓이/위치변화량)를 대비하여 설명하고, 미적분학의 기본 정리를 사용해 인테그랄 a부터 b까지 f(x) dx = F(b) - F(a) 가 됨을 수식과 함께 설명해 보세요.',
        expectedKeywords: ['부정적분', '정적분', '실수값', '적분상수 C', '미적분학의 기본 정리', 'F(b)-F(a)'],
        requiredConcepts: ['부정적분과 정적분의 구분', '미적분학의 기본 정리의 기본 정의'],
        commonMisconceptions: ['정적분 결과물에 적분상수 C를 불필요하게 남겨 두는 경우', '기하학적 면적과 정적분의 값(음수가 가능함)의 본질적 차이를 구분하지 못하는 경우'],
        rubric: '1) 부정적분은 미분의 역연산으로 함수군(적분상수 C 포함)이 되고, 정적분은 구간이 주어져 실수 상수가 됨을 설명. 2) F\'(x) = f(x)인 임의의 다항함수 F(x)에 대해 정적분 연산이 [F(x)]_a^b = F(b) - F(a)로 정의/계산됨을 밝힐 것.'
      },
      {
        level: 'standard',
        question: '정적분의 계산 성질을 활용하여, 인테그랄 1부터 3까지 (3x² - 2x + 1) dx 의 값을 구하는 세부적인 풀이 과정을 설명해 보세요. 부정적분을 구하는 단계와 위끝(3) 및 아래끝(1) 값을 대입하여 계산하는 과정을 자세히 포함해야 합니다.',
        expectedKeywords: ['부정적분 x³-x²+x', '위끝 대입', '아래끝 대입', '20'],
        requiredConcepts: ['다항함수 부정적분 공식', '정적분의 대수 연산'],
        commonMisconceptions: ['부정적분을 계산할 때 지수 증가와 분모 분할 실수', 'F(3) - F(1)을 뺄 때 괄호 분배 법칙 부호 실수'],
        rubric: '1) f(x) = 3x² - 2x + 1의 부정적분 F(x) = x³ - x² + x (+ C)를 구함. 2) F(3) = 27 - 9 + 3 = 21, F(1) = 1 - 1 + 1 = 1 임을 유도. 3) F(3) - F(1) = 21 - 1 = 20 임을 대수적으로 올바르게 풀이할 것.'
      },
      {
        level: 'advanced',
        question: '함수 f(x) = |x - 2| (절댓값 함수)가 주어져 있습니다. 구간 [0, 4]에서 정적분 인테그랄 0부터 4까지 f(x) dx 의 값을 구하고자 합니다. 절댓값 기호를 벗겨내기 위해 적분 구간을 어떻게 [0, 2]와 [2, 4]로 쪼개야 하는지 설명하고, 대수적 정적분 풀이와 기하학적 삼각형 면적 풀이를 모두 제시해 비교해 보세요.',
        expectedKeywords: ['절댓값', '구간 쪼개기', 'x-2의 부호', '대수적 적분', '삼각형 넓이', '4'],
        requiredConcepts: ['구간에 따라 다르게 정의된 함수의 정적분', '정적분과 넓이의 관계'],
        commonMisconceptions: ['절댓값을 고려하지 않고 단순히 x-2를 적분하여 0이 나오는 기하적 무시 오류', '구간을 나눌 때 음수 부호(-)를 함수 식 앞에 붙이지 않아 엉뚱한 적분값을 내는 오류'],
        rubric: '1) x < 2 이면 f(x) = -(x-2) = 2-x 이고, x >= 2 이면 f(x) = x-2 로 식을 분류. 2) ∫_0^4 |x-2|dx = ∫_0^2 (2-x)dx + ∫_2^4 (x-2)dx = [2x - x²/2]_0^2 + [x²/2 - 2x]_2^4 = (4-2) + (8-8 - (2-4)) = 2 + 2 = 4 가 됨을 연산. 3) y = |x-2|와 x축, x=0, x=4로 둘러싸인 도형은 밑변 2, 높이 2인 직각이등변삼각형 2개이므로 넓이 합이 2*(1/2 * 2 * 2) = 4 임을 기하적으로 증명.'
      }
    ]
  },
  {
    id: 'q_sequence_limit',
    testType: 'daily',
    topic: '19) 수열의 극한과 수렴 (Limits of Sequences)',
    achievementStandard: '[12미적2-01-01] 수열의 수렴, 발산의 뜻을 알고, 이를 판별할 수 있다.',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: '수열 a_n의 극한값 lim(n->∞) a_n = L 이 성립한다는 "수렴"의 수학적 의미를 n이 무한히 커질 때 일반항 a_n이 나타내는 값의 변화 추이를 설명하고, 반대로 양의 무한대로 "발산"하는 수열의 특징을 대표적인 예시(예: a_n = n²)와 함께 서술해 보세요.',
        expectedKeywords: ['수렴', '발산', '무한히 커질 때', '일정한 값 L에 한없이 가까워짐', '무한대', '예시 n²'],
        requiredConcepts: ['수열의 수렴과 발산의 정의', '직관적 극한 해석'],
        commonMisconceptions: ['발산은 오직 진동하는 수열에만 해당된다고 착각하거나, 무한대로 커지는 상태를 특정한 극한값을 갖는다고 수치로 오해하는 것'],
        rubric: '1) n이 한없이 커짐에 따라 일반항 a_n의 값이 일정한 실수 L에 제한적으로 근접하면 L에 수렴한다고 정의함을 서술. 2) 값이 한없이 커져 어떤 실수보다도 커지는 상태를 양의 무한대로 발산한다고 하며 a_n = n²을 예로 들어 설명할 것.'
      },
      {
        level: 'standard',
        question: '무한대 분의 무한대(∞/∞) 꼴인 수열의 극한 lim(n->∞) (6n² + 3n) / (2n² - 5) 의 값을 구하는 과정을 설명해 보세요. 특히 분모의 최고차항인 n²으로 분자, 분모를 나누어 극한의 기본 성질(lim 1/n = 0)을 적용하는 대수적 원리를 증명식으로 서술해야 합니다.',
        expectedKeywords: ['최고차항 나누기', '분모 분자 n²', '극한의 성질', '1/n은 0으로 수렴', '계수비 3'],
        requiredConcepts: ['부정형(∞/∞) 수열의 극한 해법', '수열의 극한 기본 성질'],
        commonMisconceptions: ['n이 무한대로 갈 때 분모 분자의 차수가 같은데도 분자만 무한대로 간다고 보아 발산 처리하는 오류', '최고차항 계수만 단순히 떼어 쓰고 그 수학적 대수 근거를 밝히지 않는 오류'],
        rubric: '1) 식의 분모 분자를 분모 최고차항인 n²으로 나눈 식 lim(n->∞) (6 + 3/n) / (2 - 5/n²) 을 기재. 2) lim 1/n = 0, lim 1/n² = 0 이므로 식은 (6 + 0)/(2 - 0) 이 됨을 극한 성질로 유도. 3) 따라서 최종 수렴값은 6/2 = 3 이 됨을 계산해 보여줄 것.'
      },
      {
        level: 'advanced',
        question: '무한대 빼기 무한대(∞-∞) 무리식 꼴인 수열의 극한 lim(n->∞) [√(n² + 4n) - n] 의 값을 구하는 대수적 과정을 서술해 보세요. 특히 분자를 유리화해야 하는 이유와 유리화한 식을 차수 비교를 거쳐 수렴값으로 도출해 내는 단계를 수식과 함께 설명해 보세요.',
        expectedKeywords: ['무한대 빼기 무한대', '유리화', '분모 분자에 합차 공식', '최고차항 비교', '수렴값 2'],
        requiredConcepts: ['무리식을 포함한 무한대 빼기 무한대 꼴의 계산', '식의 유리화의 필요성'],
        commonMisconceptions: ['√(n²+4n)이 약 n+2와 유사하므로 단순 차감하여 바로 답을 내버리고 유도 단계를 생략하는 경우', '유리화할 때 분자 식의 부호 변형(+n)을 분모에 곱하는 과정에서 덧셈 부호 실수를 범하는 경우'],
        rubric: '1) 분모를 1로 두고 분자의 켤레식인 √(n²+4n) + n 을 분모 분자에 곱해 유리화하는 이유 설명. 2) 분자는 (n²+4n) - n² = 4n 이 되고, 분모는 √(n²+4n) + n 이 됨을 서술. 3) 식 lim(n->∞) 4n / [√(n²+4n) + n] 의 분모 분자를 n으로 나누어 lim 4 / [√(1 + 4/n) + 1] = 4 / (1 + 1) = 2 임을 명확히 이끌어 낼 것.'
      }
    ]
  },
  {
    id: 'q_conditional_probability',
    testType: 'daily',
    topic: '20) 조건부확률 (Conditional Probability)',
    achievementStandard: '[12확통02-01] 조건부확률의 뜻을 알고, 이를 구할 수 있다.',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: '사건 A가 일어났을 때 사건 B의 조건부확률 P(B|A)의 정의 공식이 P(B|A) = P(A ∩ B) / P(A) (단, P(A) > 0)로 나타나는 원리를, 표본공간 S가 사건 A로 축소된다는 표본공간 변화 관점 및 벤다이어그램을 사용하여 초등적인 수학적 논리로 설명해 보세요.',
        expectedKeywords: ['조건부확률', '표본공간 축소', '분모 P(A)', '교집합 영역 P(A ∩ B)', '벤다이어그램'],
        requiredConcepts: ['조건부확률의 표본공간론적 정의', '사건의 비례적 확률'],
        commonMisconceptions: ['P(B|A)의 분모를 전체 표본공간의 확률인 1로 혼동하여 단순 교집합 확률 P(A ∩ B)로만 계산하는 경우'],
        rubric: '사건 A가 일어난 것이 전제되므로 새로운 표본공간은 A로 축소됨을 명시하고, 그 안에서 B가 발생할 부분은 오직 A와 B가 겹치는 부분(A ∩ B)뿐이므로, 축소된 공간 대비 겹치는 비율인 P(A ∩ B)/P(A)가 됨을 논리적으로 서술해야 합니다.'
      },
      {
        level: 'standard',
        question: '어느 학급 학생 중 안경을 쓴 학생은 전체의 40%이고, 안경을 쓴 학생이면서 남학생인 경우는 전체의 15%입니다. 이 학급에서 임의로 뽑은 한 학생이 안경을 썼을 때, 이 학생이 남학생일 조건부확률을 구하는 식과 과정을 설명하고 그 답을 소수나 백분율로 서술해 보세요.',
        expectedKeywords: ['안경 쓴 사건 A', '남학생 사건 B', '조건부확률 P(B|A)', '0.4 분의 0.15', '3/8', '0.375 또는 37.5%'],
        requiredConcepts: ['조건부확률의 실생활 데이터 적용', '확률의 비례 계산'],
        commonMisconceptions: ['남학생이면서 안경을 쓴 비율 15% 자체를 최종 답으로 오인하는 오류', '분모를 남학생 전체 비율로 두고 잘못 계산하는 경우'],
        rubric: '1) 안경 쓴 사건 A의 확률 P(A) = 0.40, 안경을 쓰고 남학생인 사건 A ∩ B의 확률 P(A ∩ B) = 0.15 임을 정의. 2) 구하고자 하는 확률 P(B|A) = P(A ∩ B)/P(A) 식 설계. 3) 0.15/0.40 = 15/40 = 3/8 = 0.375 (혹은 37.5%)가 됨을 유도 과정을 담아 계산 기재.'
      },
      {
        level: 'advanced',
        question: '두 사건 A, B에 대하여 독립사건의 정의 P(B|A) = P(B)가 의미하는 직관적 사실을 설명하고, 이것이 대수적으로 P(A ∩ B) = P(A)P(B) 와 완벽히 동치인 이유를 증명하세요. 아울러 독립사건과 배반사건(P(A ∩ B) = 0)의 개념 차이를 비교 설명해 보세요.',
        expectedKeywords: ['독립사건', '영향을 주지 않는다', 'P(A ∩ B) = P(A)P(B)', '배반사건', '교집합이 공집합', '확률이 0'],
        requiredConcepts: ['사건의 독립성과 종속성 판별식', '독립사건과 배반사건의 차이점'],
        commonMisconceptions: ['독립이라는 일상적 단어를 서로 만나지 않는다는 뜻으로 혼동하여 배반사건과 동의어로 해석해 버리는 치명적 오류'],
        rubric: '1) A가 일어나든 말든 B의 확률에 영향이 없다는 P(B|A) = P(B)의 직관적 뜻 기술. 2) P(B|A) = P(A ∩ B)/P(A) = P(B) 에서 양변에 P(A)를 곱해 P(A ∩ B) = P(A)P(B) 가 됨을 증명. 3) 배반사건은 동시에 일어날 수 없어 P(A ∩ B) = 0 인 반면, 독립사건은 동시에 일어날 수 있으나 단지 독립적 확률 분포를 따름을 비교하여 명시할 것.'
      }
    ]
  },
  {
    id: 'q_vector_operations',
    testType: 'daily',
    topic: '21) 벡터의 덧셈과 뺄셈 (Vector Addition and Subtraction)',
    achievementStandard: '[12기하02-01] 벡터의 뜻을 알고, 벡터의 덧셈, 뺄셈, 실수배를 할 수 있다.',
    sourcePriority: {
      primary: 'Korean high school math curriculum achievement standards',
      secondary: 'CSAT / KICE mock exam / EBS concept-type reference'
    },
    levels: [
      {
        level: 'basic',
        question: '벡터의 기하학적 정의인 "크기와 방향을 동시에 가지는 양"의 관점에서, 두 벡터 a와 b의 덧셈을 나타내는 기하학적 방법인 "삼각형법"과 "평행사변형법"의 작도 원리를 각각 설명하고, 두 방법이 나타내는 결과 벡터가 왜 서로 일치할 수밖에 없는지 설명해 보세요.',
        expectedKeywords: ['삼각형법', '평행사변형법', '꼬리물기', '시점과 종점', '대각선', '일치'],
        requiredConcepts: ['벡터의 정의', '벡터 합의 기하학적 정의'],
        commonMisconceptions: ['벡터를 단지 크기만 가진 선분으로 보아 합벡터의 크기를 a와 b의 단순 길이 합으로 더하는 오류'],
        rubric: '1) 삼각형법: a의 종점에 b의 시점을 일치시켜 a의 시점에서 b의 종점으로 가는 벡터를 구하는 원리 설명. 2) 평행사변형법: a와 b의 시점을 일치시켜 두 변으로 하는 평행사변형을 만들고 그 대각선 벡터를 구하는 원리 설명. 3) 평행사변형의 마주보는 변의 평행이동에 의해 b가 a의 종점으로 이동하므로 결국 삼각형법과 같은 결과가 됨을 논리적으로 설명할 것.'
      },
      {
        level: 'standard',
        question: '세 점 O, A, B가 좌표평면 위에 있습니다. 벡터 AB를 O를 시점으로 하는 두 위치벡터 OA와 OB의 뺄셈식으로 나타내면 AB = OB - OA 가 성립합니다. 이 뺄셈 공식이 성립하는 이유를 벡터의 덧셈 법칙(OA + AB = OB)과의 연계를 통해 대수적으로 증명하여 설명해 보세요.',
        expectedKeywords: ['시점 통일 OB-OA', '위치벡터', '꼬리물기 OA+AB=OB', '이항'],
        requiredConcepts: ['벡터의 뺄셈과 위치벡터', '벡터 방정식의 기본 변형'],
        commonMisconceptions: ['AB를 OA - OB 와 같이 시점과 종점의 벡터 순서를 반대로 뒤집어 기재하는 실수'],
        rubric: '1) 벡터의 덧셈 삼각형법에 의해 OA + AB = OB 가 성립함을 서술. 2) 이 식에서 위치벡터인 OA를 우변으로 이항하면 AB = OB - OA 가 됨을 대수적 논리로 명확하게 보여줄 것.'
      },
      {
        level: 'advanced',
        question: '한 평면 위의 삼각형 ABC에서, 선분 BC를 2:1로 내분하는 점을 D라고 할 때, 시점이 O인 위치벡터 OD를 두 벡터 OB와 OC를 활용하여 OD = (OB + 2OC) / 3 과 같이 나타낼 수 있습니다. 이 내분점 벡터 공식을 벡터의 덧셈과 실수배의 성질을 활용하여 선분 BD = 2/3 * BC 관계식을 바탕으로 완벽히 증명하고 과정을 설명해 보세요.',
        expectedKeywords: ['내분점 벡터', '실수배 2/3', 'BD = 2/3 BC', '시점 변환', 'OB+2OC', '분모 3'],
        requiredConcepts: ['벡터의 내분점 공식 유도', '위치벡터와 선분의 실수배'],
        commonMisconceptions: ['내분 비율의 계수를 크로스해서 곱하는 관계를 반대로 배치하는 암기 오류', '벡터의 뺄셈을 이용해 BC를 OC-OB로 전개하는 뺄셈 변형을 실수하는 경우'],
        rubric: '1) OD = OB + BD 임을 덧셈 법칙으로 설정. 2) D는 BC를 2:1로 내분하므로 BD = 2/3 * BC 이고, BC = OC - OB 이므로 BD = 2/3 * (OC - OB) 가 됨을 유도. 3) 이를 대입하여 OD = OB + 2/3 * OC - 2/3 * OB = 1/3 * OB + 2/3 * OC = (OB + 2OC)/3 임을 대수적으로 깨끗하게 증명해 낼 것.'
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
