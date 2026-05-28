export interface CurriculumTopic {
  id: string;
  subject: string;
  bigUnit: string;
  middleUnit: string;
  topicName: string;
  specificScope: string[];
  keyConcepts: string[];
  achievementStandard: string;
  keywords: string[];
  commonMisconceptions: string[];
}

export const sampleCurriculum: CurriculumTopic[] = [
  {
    id: "topic-015",
    subject: "공통수학 1",
    bigUnit: "I. 다항식",
    middleUnit: "1. 다항식의 연산",
    topicName: "다항식의 곱셈과 곱셈 공식",
    specificScope: ['다항식의 곱셈 원리', '곱셈공식(세제곱 꼴 등)의 전개', '곱셈공식의 변형을 이용한 값 구하기'],
    keyConcepts: ['다항식 곱셈 (polynomial multiplication)', '곱셈공식 (algebraic identities)', '곱셈공식 변형 (algebraic variations)'],
    achievementStandard: '[10공수1-01-01] 다항식의 사칙연산을 할 수 있다.',
    keywords: ['다항식 곱셈', '곱셈공식', '곱셈공식 변형', '전개', '계수'],
    commonMisconceptions: [
      '(a + b)³을 a³ + b³으로 잘못 전개하여 중간의 3a²b와 3ab² 항을 누락하는 오류',
      '곱셈공식의 변형식 a² + b² = (a + b)² - 2ab 에서 부호를 혼동해 +2ab로 적용하는 오류'
    ]
  },
  {
    id: "topic-001",
    subject: "공통수학 1",
    bigUnit: "I. 다항식",
    middleUnit: "2. 나머지정리와 인수정리",
    topicName: "나머지정리와 인수정리",
    specificScope: ['항등식의 성질', '나머지정리의 원리', '인수정리를 이용한 다항식의 인수분해'],
    keyConcepts: ['나머지정리 (remainder theorem)', '인수정리 (factor theorem)', '항등식 (identity)', '조립제법 (synthetic division)'],
    achievementStandard: '[10공수1-01-02] 나머지정리의 의미를 이해하고, 이를 활용하여 다항식을 인수분해할 수 있다.',
    keywords: ['나머지정리', '인수정리', '나눗셈 관계식', '조립제법', '목과 나머지'],
    commonMisconceptions: [
      '나누는 식의 차수보다 나머지의 차수가 낮아야 함을 망각하고, 2차식으로 나눌 때 나머지를 상수로만 두는 오류',
      '나머지정리 f(a)=r을 단순 공식으로 외워 나눗셈 관계식 f(x)=A(x)Q(x)+R(x)의 본질을 이해하지 못함'
    ]
  },
  {
    id: "topic-002",
    subject: "공통수학 1",
    bigUnit: "II. 방정식과 부등식",
    middleUnit: "3. 이차방정식과 이차함수",
    topicName: "이차함수의 최대와 최소",
    specificScope: ['꼭짓점 구하기', '대칭축의 성질', '완전제곱식 변형', '제한된 범위에서의 최댓값/최솟값'],
    keyConcepts: ['꼭짓점 (vertex)', '대칭축 (axis of symmetry)', '완전제곱식 (completing the square)', '최댓값 (maximum)', '최솟값 (minimum)'],
    achievementStandard: '[10공수1-02-04] 이차함수의 최대와 최소를 이해하고, 이를 활용하여 문제를 해결할 수 있다.',
    keywords: ['꼭짓점', '대칭축', '완전제곱식', '제한된 범위', '그래프 개형', '위로 볼록', '아래로 볼록'],
    commonMisconceptions: [
      '최댓값과 최솟값 자체를 꼭짓점의 x좌표로 혼동하는 경우',
      '완전제곱식으로 변형할 때 상수항의 부호나 계수 묶기에서 계산 실수가 잦음',
      '제한된 범위(정의역)가 주어졌을 때 대칭축의 위치를 고려하지 않고 양 끝값만 비교하는 오류',
      '최대/최소 값을 물을 때 y값이 아닌 x값을 구하고 끝내는 현상'
    ]
  },
  {
    id: "topic-003",
    subject: "공통수학 1",
    bigUnit: "II. 방정식과 부등식",
    middleUnit: "3. 이차방정식과 이차함수",
    topicName: "이차방정식과 이차함수의 관계",
    specificScope: ['이차함수의 그래프와 x축의 교점', '이차방정식의 실근의 개수', '판별식 D의 기하학적 의미'],
    keyConcepts: ['x축 교점 (x-intercepts)', '판별식 (discriminant)', '실근 (real roots)', '위치 관계 (positional relation)'],
    achievementStandard: '[10공수1-02-03] 이차함수의 그래프와 x축의 관계를 이해한다.',
    keywords: ['판별식', '교점', '실근', '위치 관계', 'x축', '서로 다른 두 점', '접한다', '만나지 않는다'],
    commonMisconceptions: [
      '이차방정식의 판별식이 0보다 작을 때, 그래프가 x축 아래에만 존재한다고 생각하는 오류 (실제로는 떠 있는 것임)',
      '교점의 개수와 실근의 개수가 같은 원리를 시각적으로 연결하지 못함'
    ]
  },
  {
    id: "topic-005",
    subject: "공통수학 1",
    bigUnit: "III. 경우의 수",
    middleUnit: "5. 순열과 조합",
    topicName: "순열과 조합의 뜻",
    specificScope: ['순열의 정의와 계산', '조합의 정의와 계산', '순열과 조합의 차이 및 실생활 적용'],
    keyConcepts: ['순열 (permutation)', '조합 (combination)', '팩토리얼 (factorial)', '경우의 수 (number of cases)'],
    achievementStandard: '[10공수1-03-02] 순열과 조합의 뜻을 알고, 경우의 수를 구할 수 있다.',
    keywords: ['순열', '조합', '순서 고려', '선택', '팩토리얼', 'nPr', 'nCr'],
    commonMisconceptions: [
      '대상을 선택하여 일렬로 배열하는 행위를 단순 선택으로 혼동해 조합을 사용하는 오류',
      '순서의 유무가 주는 수학적 가짓수의 확장/축소(나눗셈) 관계를 직관적으로 깨닫지 못하는 오류'
    ]
  },
  {
    id: "topic-004",
    subject: "공통수학 1",
    bigUnit: "IV. 행렬",
    middleUnit: "6. 행렬과 그 연산",
    topicName: "행렬의 연산",
    specificScope: ['행렬의 정의와 성분', '행렬의 덧셈과 뺄셈', '행렬의 실수배', '행렬의 곱셈과 그 성질'],
    keyConcepts: ['행렬 (matrix)', '성분 (entry)', '실수배 (scalar multiplication)', '행렬 곱셈 (matrix multiplication)', '교환법칙 (commutative law)'],
    achievementStandard: '[10공수1-04-02] 행렬의 덧셈, 뺄셈, 실수배, 곱셈을 할 수 있고, 그 성질을 이해한다.',
    keywords: ['행렬', '성분', '행렬의 합', '행렬의 차', '실수배', '곱셈 성질', '교환법칙 성립하지 않음'],
    commonMisconceptions: [
      '행렬 곱셈에서 교환법칙(AB = BA)이 일반적으로 성립하지 않음을 간과하고 실수 곱셈처럼 다루는 오류',
      '두 행렬의 곱이 영행렬(AB = O)일 때 A = O 또는 B = O라고 단정하는 오류',
      '성분끼리 그냥 곱하는 연산으로 곱셈을 혼동하는 오류'
    ]
  },
  {
    id: "topic-006",
    subject: "공통수학 2",
    bigUnit: "I. 도형의 방정식",
    middleUnit: "3. 원의 방정식",
    topicName: "원과 직선의 위치 관계",
    specificScope: ['원의 방정식 기본형과 표준형', '원과 직선의 교점의 개수', '판별식을 이용한 판별', '원의 중심과 직선 사이의 거리 d와 반지름 r의 비교'],
    keyConcepts: ['원의 방정식 (equation of a circle)', '위치 관계 (positional relation)', '반지름 (radius)', '점과 직선 사이의 거리 (distance between point and line)'],
    achievementStandard: '[10공수2-01-03] 좌표평면에서 원과 직선의 위치 관계를 이해하고, 이를 활용하여 문제를 해결할 수 있다.',
    keywords: ['원의 방정식', '점과 직선 사이의 거리', '반지름', '서로 다른 두 점', '접한다', '만나지 않는다', '판별식'],
    commonMisconceptions: [
      '원과 직선이 만날 조건을 판별식 D로만 풀려고 하여 계산이 불필요하게 길어지고 실수가 잦아지는 현상 (중심과 직선 사이의 거리 d와 반지름 r의 대소 관계를 쓰는 것이 훨씬 직관적임)',
      '접선의 방정식 공식만 외워서 원 외부의 한 점에서 그은 접선의 개수나 방정식을 구하지 못하는 오류'
    ]
  },
  {
    id: "topic-016",
    subject: "공통수학 2",
    bigUnit: "II. 집합과 명제",
    middleUnit: "1. 집합",
    topicName: "집합의 연산과 법칙",
    specificScope: ['교집합과 합집합의 정의', '여집합과 차집합의 정의', '드모르간의 법칙', '집합의 연산법칙'],
    keyConcepts: ['교집합 (intersection)', '합집합 (union)', '여집합 (complement)', '차집합 (difference of sets)', '드모르간 법칙 (De Morgan\'s laws)'],
    achievementStandard: '[10공수2-02-02] 집합의 연산을 할 수 있고, 그 성질을 이해한다.',
    keywords: ['교집합', '합집합', '여집합', '차집합', '드모르간의 법칙', '벤다이어그램', '분배법칙'],
    commonMisconceptions: [
      '여집합을 취할 때 교집합이 합집합으로(또는 그 반대로) 바뀌는 드모르간의 법칙 방향을 망각하고 분배만 해주는 오류',
      '차집합 A - B를 단순 나눗셈이나 숫자 뺄셈처럼 혼동하거나, 여집합과의 관계 A ∩ B^c 를 잘못 변형하는 경우'
    ]
  },
  {
    id: "topic-007",
    subject: "대수",
    bigUnit: "I. 지수함수와 로그함수",
    middleUnit: "1. 지수와 로그",
    topicName: "지수의 확장과 지수법칙",
    specificScope: ['거듭제곱근의 정의', '실수인 거듭제곱근의 개수', '지수가 유리수, 실수일 때의 지수법칙'],
    keyConcepts: ['거듭제곱근 (nth root)', '실수의 개수', '지수법칙 (laws of exponents)'],
    achievementStandard: '[12대수01-01] 거듭제곱과 거듭제곱근의 뜻을 알고, 그 성질을 이해한다.',
    keywords: ['거듭제곱근', '실근의 개수', '홀수 제곱근', '짝수 제곱근', '지수 확장'],
    commonMisconceptions: [
      'a의 n제곱근의 개수가 항상 실수 범위에서만 존재하는 것으로 착각하는 경우 (n개 중 실수는 조건에 따라 0, 1, 2개)',
      '음수의 짝수 거듭제곱근이 실수 범위에 존재하지 않음을 간과함'
    ]
  },
  {
    id: "topic-008",
    subject: "대수",
    bigUnit: "I. 지수함수와 로그함수",
    middleUnit: "1. 지수와 로그",
    topicName: "로그의 뜻과 성질",
    specificScope: ['로그의 정의와 밑 조건/진수 조건', '로그의 기본 성질', '밑 변환 공식'],
    keyConcepts: ['로그 (logarithm)', '밑 (base)', '진수 (argument)', '밑 변환 (change of base)'],
    achievementStandard: '[12대수01-02] 로그의 뜻을 알고, 그 성질을 이해한다.',
    keywords: ['로그의 정의', '밑 조건', '진수 조건', '로그의 성질', '밑 변환 공식'],
    commonMisconceptions: [
      '로그의 정의에서 밑 조건(a > 0, a ≠ 1)과 진수 조건(N > 0)을 체크하지 않아 엉뚱한 실근을 해로 판정하는 오류',
      'log(A + B)를 log A + log B 또는 log A * log B로 잘못 분해하는 공식 혼동 오류'
    ]
  },
  {
    id: "topic-009",
    subject: "대수",
    bigUnit: "II. 삼각함수",
    middleUnit: "1. 삼각함수",
    topicName: "삼각함수의 뜻",
    specificScope: ['호도법과 라디안', '일반각과 동경의 정의', '동경을 활용한 삼각함수(sin, cos, tan)의 정의와 부호'],
    keyConcepts: ['라디안 (radian)', '호도법 (circular measure)', '동경 (radius vector)', '일반각 (general angle)', '사분면 부호 (signs of quadrants)'],
    achievementStandard: '[12대수02-01] 호도법의 뜻을 알고, 삼각함수의 뜻을 이해한다.',
    keywords: ['호도법', '라디안', '일반각', '삼각함수 정의', '부호 결정', '올사탄코'],
    commonMisconceptions: [
      '삼각비를 직각삼각형에서만 정의해 θ > 90도 영역에서 삼각함수가 정의되는 기하적 원리와 좌표 상 부호 결정을 이해하지 못하는 것',
      '라디안과 도(degree) 단위 간의 변환 시 단순 산술 계산 오류'
    ]
  },
  {
    id: "topic-017",
    subject: "대수",
    bigUnit: "III. 수열",
    middleUnit: "1. 등차수열과 등비수열",
    topicName: "등차수열의 일반항과 합",
    specificScope: ['등차수열의 정의와 공차', '등차수열의 일반항 구하기', '등차중항의 성질', '등차수열의 첫째항부터 제n항까지의 합'],
    keyConcepts: ['등차수열 (arithmetic sequence)', '공차 (common difference)', '등차중항 (arithmetic mean)', '수열의 합 (sum of sequence)'],
    achievementStandard: '[12대수03-01] 등차수열의 뜻을 알고, 일반항과 첫째항부터 제n항까지의 합을 구할 수 있다.',
    keywords: ['등차수열', '공차', '등차중항', '일반항 공식', '등차수열의 합', '첫째항'],
    commonMisconceptions: [
      '등차수열의 합 공식 S_n = n{2a + (n-1)d}/2 에서 공차 d에 곱해지는 n-1을 n으로 잘못 대입하거나 n배 곱하기를 누락하는 연산 오류',
      '등차중항 성질 2b = a + c 를 b² = ac(등비중항)와 혼동하여 적용하는 오류'
    ]
  },
  {
    id: "topic-010",
    subject: "미적분 I",
    bigUnit: "I. 함수의 극한과 연속",
    middleUnit: "1. 함수의 극한",
    topicName: "함수의 극한과 수렴",
    specificScope: ['함수의 극한의 뜻과 수렴', '좌극한과 우극한의 정의', '함수의 극한에 관한 성질과 계산'],
    keyConcepts: ['극한 (limit)', '수렴 (convergence)', '발산 (divergence)', '우극한 (right-hand limit)', '좌극한 (left-hand limit)'],
    achievementStandard: '[12미적1-01-01] 함수의 극한의 뜻을 알고, 좌극한과 우극한의 뜻을 이해한다.',
    keywords: ['극한값', '수렴', '발산', '좌극한', '우극한', '존재 조건', '0/0 꼴 부정형'],
    commonMisconceptions: [
      '극한값 lim(x->a) f(x)가 항상 함숫값 f(a)와 같아야 존재한다고 오인하는 오류',
      '부정형(0/0 꼴)의 극한값을 연산할 때 약분 과정을 수식적으로 근거 짓지 못하는 경우'
    ]
  },
  {
    id: "topic-011",
    subject: "미적분 I",
    bigUnit: "II. 다항함수의 미분법",
    middleUnit: "2. 미분계수와 도함수",
    topicName: "미분계수의 기하학적 의미",
    specificScope: ['평균변화율의 뜻', '미분계수의 정의', '접선의 기울기로서의 기하학적 의미'],
    keyConcepts: ['평균변화율 (average rate of change)', '미분계수 (derivative coefficient)', '접선의 기울기 (slope of tangent line)', '극한 (limit)'],
    achievementStandard: '[12미적1-02-02] 미분계수의 기하학적 의미를 이해한다.',
    keywords: ['평균변화율', '미분계수', '접선의 기울기', '할선', '극한값', '기하학적 의미'],
    commonMisconceptions: [
      '미분계수 f\'(a)를 단순 계산 공식으로만 인지하여 기하학적으로 할선의 극한으로서 접선의 기울기가 되는 원리를 설명하지 못함',
      '함수가 연속이지만 뾰족한 점(첨점)에서 미분불가능한 기하학적 이유(좌우 미분계수가 다름)를 직관적으로 이해하지 못함'
    ]
  },
  {
    id: "topic-018",
    subject: "미적분 I",
    bigUnit: "III. 다항함수의 적분법",
    middleUnit: "2. 정적분",
    topicName: "정적분의 정의와 계산",
    specificScope: ['정적분의 정의', '미적분학의 기본 정리', '정적분의 성질과 구간 나누기 계산'],
    keyConcepts: ['정적분 (definite integral)', '미적분학의 기본 정리 (fundamental theorem of calculus)', '부정적분 (indefinite integral)', '위끝 and 아래끝 (limits of integration)'],
    achievementStandard: '[12미적1-03-03] 정적분의 뜻을 알고, 다항함수의 정적분을 구할 수 있다.',
    keywords: ['정적분', '부정적분', '미적분학의 기본 정리', '아래끝', '위끝', '정적분의 성질'],
    commonMisconceptions: [
      '정적분의 위끝과 아래끝이 같을 때 값이 0이 됨을 활용하지 못하거나, 위끝 아래끝 위치를 바꿀 때 부호가 음수로 바뀌는 성질을 빠뜨리는 경우',
      '부정적분을 구한 뒤 F(b) - F(a)를 계산할 때 단순 뺄셈 실수 및 계수 연산 부호 실수'
    ]
  },
  {
    id: "topic-019",
    subject: "미적분 II",
    bigUnit: "I. 수열의 극한",
    middleUnit: "1. 수열의 극한",
    topicName: "수열의 극한과 수렴",
    specificScope: ['수열의 수렴과 발산의 뜻', '수열의 극한에 대한 기본 성질', '무한대 분의 무한대(∞/∞) 및 무한대 빼기 무한대(∞-∞) 꼴의 계산'],
    keyConcepts: ['수열의 극한 (limit of a sequence)', '수렴 (convergence)', '발산 (divergence)', '부정형 극한 (indeterminate forms)'],
    achievementStandard: '[12미적2-01-01] 수열의 수렴, 발산의 뜻을 알고, 이를 판별할 수 있다.',
    keywords: ['수열의 극한', '수렴', '발산', '무한대', '최고차항 계수 비교', '유리화'],
    commonMisconceptions: [
      '무한대 분의 무한대(∞/∞) 꼴에서 분모와 분자의 차수가 같을 때 최고차항의 계수비로 수렴함을 모른 채 대입을 시도하는 경우',
      '무한대 빼기 무한대(∞-∞) 무리식 꼴에서 분자를 유리화하지 않고 직관적으로 발산한다고 판단하거나 0으로 계산해버리는 오류'
    ]
  },
  {
    id: "topic-012",
    subject: "미적분 II",
    bigUnit: "II. 여러 가지 함수의 미분법",
    middleUnit: "2. 여러 가지 함수의 미분법",
    topicName: "합성함수의 미분법",
    specificScope: ['합성함수의 정의', '합성함수의 미분법(연쇄법칙)', '음함수 및 역함수의 미분'],
    keyConcepts: ['합성함수 (composite function)', '연쇄법칙 (chain rule)', '속미분 (inner derivative)', '겉미분 (outer derivative)'],
    achievementStandard: '[12미적2-02-02] 합성함수를 미분할 수 있다.',
    keywords: ['합성함수 미분', '연쇄법칙', '겉미분속미분', '매개변수', '도함수'],
    commonMisconceptions: [
      '합성함수 f(g(x))를 미분할 때 속함수 g(x)를 미분한 g\'(x)를 곱하는 것(속미분)을 누락하고 겉미분 f\'(g(x))만 수행하는 다수의 실수',
      '연쇄법칙 dy/dx = (dy/du) * (du/dx)의 라이프니츠 표기법이 분수처럼 약분되는 원리의 수학적 한계를 인지하지 못함'
    ]
  },
  {
    id: "topic-013",
    subject: "확률과 통계",
    bigUnit: "I. 경우의 수",
    middleUnit: "2. 이항정리",
    topicName: "이항정리의 이해",
    specificScope: ['이항정리의 정의', '이항계수의 성질', '조합 기호를 활용한 계수 찾기'],
    keyConcepts: ['이항정리 (binomial theorem)', '이항계수 (binomial coefficient)', '파스칼의 삼각형 (Pascal\'s triangle)'],
    achievementStandard: '[12확통01-03] 이항정리를 이해하고 이를 활용하여 다양한 문제를 해결할 수 있다.',
    keywords: ['이항정리', '이항계수', '일반항', '조합', '계수 구하기', '이항계수의 성질'],
    commonMisconceptions: [
      '전개식 (a+b)^n의 계수가 b를 선택하는 조합의 개념(nCr)임을 잊어 단순 공식으로만 암기하는 오류',
      '부호가 음수인 항(예: -b)을 다룰 때 일반항 연산에서 부호를 고려하지 않아 오답을 내는 오류'
    ]
  },
  {
    id: "topic-020",
    subject: "확률과 통계",
    bigUnit: "II. 확률",
    middleUnit: "1. 확률의 뜻과 활용",
    topicName: "조건부확률",
    specificScope: ['조건부확률의 정의', '확률의 곱셈정리', '독립사건과 종속사건의 판별'],
    keyConcepts: ['조건부확률 (conditional probability)', '곱셈정리 (multiplication rule)', '독립사건 (independent events)', '종속사건 (dependent events)'],
    achievementStandard: '[12확통02-01] 조건부확률의 뜻을 알고, 이를 구할 수 있다.',
    keywords: ['조건부확률', '곱셈정리', '독립사건', 'P(B|A)', '교집합 확률'],
    commonMisconceptions: [
      '조건부확률 P(B|A)를 단순 교집합 확률 P(A ∩ B)와 동일한 것으로 혼동하여 표본공간의 축소(분모를 P(A)로 제한)를 누락하는 경우',
      '두 사건이 독립일 조건 P(A ∩ B) = P(A)P(B)를 배반사건 조건 P(A ∩ B) = 0 과 혼동하여 독립과 배반을 오인하는 오류'
    ]
  },
  {
    id: "topic-014",
    subject: "기하",
    bigUnit: "I. 이차곡선",
    middleUnit: "1. 포물선",
    topicName: "포물선의 정의와 방정식",
    specificScope: ['포물선의 기하학적 정의', '초점과 준선의 정의', '포물선의 방정식 유도 및 접선의 성질'],
    keyConcepts: ['포물선 (parabola)', '초점 (focus)', '준선 (directrix)', '축 (axis)', '꼭짓점 (vertex)'],
    achievementStandard: '[12기하01-01] 포물선의 뜻을 알고, 포물선의 방정식을 구할 수 있다.',
    keywords: ['포물선', '초점', '준선', '자취의 방정식', '접선', '거리 동일'],
    commonMisconceptions: [
      '초점 F와 준선 L에 이르는 거리가 같은 점들의 자취라는 기하학적 원리를 사용하지 않고 2차함수 대수식에만 얽매여 문제를 어렵게 푸는 오류',
      'y축에 대칭인 포물선(x²=4py)과 x축에 대칭인 포물선(y²=4px)의 수식 구조를 반대로 적용하는 오류'
    ]
  },
  {
    id: "topic-021",
    subject: "기하",
    bigUnit: "II. 평면벡터",
    middleUnit: "1. 벡터의 연산",
    topicName: "벡터의 덧셈과 뺄셈",
    specificScope: ['벡터의 정의와 표현', '벡터의 덧셈(삼각형법, 평행사변형법)', '벡터의 뺄셈과 시점 일치', '벡터의 실수배'],
    keyConcepts: ['벡터 (vector)', '시점과 종점 (initial and terminal points)', '벡터의 덧셈 (vector addition)', '벡터의 뺄셈 (vector subtraction)', '실수배 (scalar multiple)'],
    achievementStandard: '[12기하02-01] 벡터의 뜻을 알고, 벡터의 덧셈, 뺄셈, 실수배를 할 수 있다.',
    keywords: ['벡터', '벡터의 덧셈', '벡터의 뺄셈', '삼각형법', '평행사변형법', '시점 통일', '크기와 방향'],
    commonMisconceptions: [
      '벡터의 뺄셈 AB - AC를 계산할 때, 종점과 시점의 연결 방향을 혼동하여 BC가 아닌 CB로 잘못 적는 오류',
      '벡터의 합을 구할 때 방향을 고려하지 않고 단순 크기(스칼라 값)만 더해서 계산하는 물리적/기하학적 오류'
    ]
  }
];
