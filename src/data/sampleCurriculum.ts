export interface CurriculumTopic {
  topic: string;
  specificScope: string[];
  keyConcepts: string[];
  achievementStandard: string;
  keywords: string[];
  commonMisconceptions: string[];
}

export interface CurriculumUnit {
  unitName: string;
  topics: CurriculumTopic[];
}

export interface CurriculumSubject {
  subjectName: string;
  units: CurriculumUnit[];
}

export interface CurriculumGrade {
  gradeName: string;
  subjects: CurriculumSubject[];
}

export const sampleCurriculum: CurriculumGrade[] = [
  {
    gradeName: '고등학교 1학년 (Grade 1 - 2022 Revised)',
    subjects: [
      {
        subjectName: '공통수학 1 (Common Mathematics 1)',
        units: [
          {
            unitName: '다항식 (Polynomials)',
            topics: [
              {
                topic: '나머지정리와 인수정리 (Remainder Theorem and Factor Theorem)',
                specificScope: ['항등식의 성질', '나머지정리의 원리', '인수정리를 이용한 다항식의 인수분해'],
                keyConcepts: ['나머지정리 (remainder theorem)', '인수정리 (factor theorem)', '항등식 (identity)', '조립제법 (synthetic division)'],
                achievementStandard: '[10공수1-01-02] 나머지정리의 의미를 이해하고, 이를 활용하여 다항식을 인수분해할 수 있다.',
                keywords: ['나머지정리', '인수정리', '나눗셈 관계식', '조립제법', '목과 나머지'],
                commonMisconceptions: [
                  '나누는 식의 차수보다 나머지의 차수가 낮아야 함을 망각하고, 2차식으로 나눌 때 나머지를 상수로만 두는 오류',
                  '나머지정리 f(a)=r을 단순 공식으로 외워 나눗셈 관계식 f(x)=A(x)Q(x)+R(x)의 본질을 이해하지 못함'
                ]
              }
            ]
          },
          {
            unitName: '이차방정식과 이차함수 (Quadratic Equations and Functions)',
            topics: [
              {
                topic: '이차함수의 최대와 최소 (Maximum and Minimum of Quadratic Functions)',
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
                topic: '이차방정식과 이차함수의 관계 (Relation between Quadratic Equations and Functions)',
                specificScope: ['이차함수의 그래프와 x축의 교점', '이차방정식의 실근의 개수', '판별식 D의 기하학적 의미'],
                keyConcepts: ['x축 교점 (x-intercepts)', '판별식 (discriminant)', '실근 (real roots)', '위치 관계 (positional relation)'],
                achievementStandard: '[10공수1-02-03] 이차함수의 그래프와 직선의 위치 관계를 이해한다.',
                keywords: ['판별식', '교점', '실근', '위치 관계', 'x축', '서로 다른 두 점', '접한다', '만나지 않는다'],
                commonMisconceptions: [
                  '이차방정식의 판별식이 0보다 작을 때, 그래프가 x축 아래에만 존재한다고 생각하는 오류 (실제로는 떠 있는 것임)',
                  '교점의 개수와 실근의 개수가 같은 원리를 시각적으로 연결하지 못함'
                ]
              }
            ]
          },
          {
            unitName: '행렬 (Matrices)',
            topics: [
              {
                topic: '행렬의 연산 (Operations on Matrices)',
                specificScope: ['행렬의 정의와 성분', '행렬의 덧셈과 뺄셈', '행렬의 실수배', '행렬의 곱셈과 그 성질'],
                keyConcepts: ['행렬 (matrix)', '성분 (entry)', '실수배 (scalar multiplication)', '행렬 곱셈 (matrix multiplication)', '교환법칙 (commutative law)'],
                achievementStandard: '[10공수1-04-02] 행렬의 덧셈, 뺄셈, 실수배, 곱셈을 할 수 있고, 그 성질을 이해한다.',
                keywords: ['행렬', '성분', '행렬의 합', '행렬의 차', '실수배', '곱셈 성질', '교환법칙 성립하지 않음'],
                commonMisconceptions: [
                  '행렬 곱셈에서 교환법칙(AB = BA)이 일반적으로 성립하지 않음을 간과하고 실수 곱셈처럼 다루는 오류',
                  '두 행렬의 곱이 영행렬(AB = O)일 때 A = O 또는 B = O라고 단정하는 오류',
                  '성분끼리 그냥 곱하는 연산으로 곱셈을 혼동하는 오류'
                ]
              }
            ]
          }
        ]
      },
      {
        subjectName: '공통수학 2 (Common Mathematics 2)',
        units: [
          {
            unitName: '도형의 방정식 (Equations of Figures)',
            topics: [
              {
                topic: '원과 직선의 위치 관계 (Positional Relation between Circle and Line)',
                specificScope: ['원의 방정식 기본형과 표준형', '원과 직선의 교점의 개수', '판별식을 이용한 판별', '원의 중심과 직선 사이의 거리 d와 반지름 r의 비교'],
                keyConcepts: ['원의 방정식 (equation of a circle)', '위치 관계 (positional relation)', '반지름 (radius)', '점과 직선 사이의 거리 (distance between point and line)'],
                achievementStandard: '[10공수2-01-03] 좌표평면에서 원과 직선의 위치 관계를 이해하고, 이를 활용하여 문제를 해결할 수 있다.',
                keywords: ['원의 방정식', '점과 직선 사이의 거리', '반지름', '서로 다른 두 점', '접한다', '만나지 않는다', '판별식'],
                commonMisconceptions: [
                  '원과 직선이 만날 조건을 판별식 D로만 풀려고 하여 계산이 불필요하게 길어지고 실수가 잦아지는 현상 (중심과 직선 사이의 거리 d와 반지름 r의 대소 관계를 쓰는 것이 훨씬 직관적임)',
                  '접선의 방정식 공식만 외워서 원 외부의 한 점에서 그은 접선의 개수나 방정식을 구하지 못하는 오류'
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    gradeName: '고등학교 2학년 (Grade 2 - 2022 Revised)',
    subjects: [
      {
        subjectName: '대수 (Algebra)',
        units: [
          {
            unitName: '지수함수와 로그함수 (Exponential and Logarithmic Functions)',
            topics: [
              {
                topic: '지수의 확장과 지수법칙 (Extension of Exponents and Laws)',
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
                topic: '로그의 뜻과 성질 (Definition and Properties of Logarithms)',
                specificScope: ['로그의 정의와 밑 조건/진수 조건', '로그의 기본 성질', '밑 변환 공식'],
                keyConcepts: ['로그 (logarithm)', '밑 (base)', '진수 (argument)', '밑 변환 (change of base)'],
                achievementStandard: '[12대수01-02] 로그의 뜻을 알고, 그 성질을 이해한다.',
                keywords: ['로그의 정의', '밑 조건', '진수 조건', '로그의 성질', '밑 변환 공식'],
                commonMisconceptions: [
                  '로그의 정의에서 밑 조건(a > 0, a ≠ 1)과 진수 조건(N > 0)을 체크하지 않아 엉뚱한 실근을 해로 판정하는 오류',
                  'log(A + B)를 log A + log B 또는 log A * log B로 잘못 분해하는 공식 혼동 오류'
                ]
              }
            ]
          }
        ]
      },
      {
        subjectName: '미적분 I (Calculus I)',
        units: [
          {
            unitName: '다항함수의 미분법 (Differentiation of Polynomial Functions)',
            topics: [
              {
                topic: '미분계수의 기하학적 의미 (Geometric Meaning of Derivative)',
                specificScope: ['평균변화율의 뜻', '미분계수의 정의', '접선의 기울기로서의 기하학적 의미'],
                keyConcepts: ['평균변화율 (average rate of change)', '미분계수 (derivative coefficient)', '접선의 기울기 (slope of tangent line)', '극한 (limit)'],
                achievementStandard: '[12미적1-02-02] 미분계수의 기하학적 의미를 이해한다.',
                keywords: ['평균변화율', '미분계수', '접선의 기울기', '할선', '극한값', '기하학적 의미'],
                commonMisconceptions: [
                  '미분계수 f\'(a)를 단순 계산 공식으로만 인지하여 기하학적으로 할선의 극한으로서 접선의 기울기가 되는 원리를 설명하지 못함',
                  '함수가 연속이지만 뾰족한 점(첨점)에서 미분불가능한 기하학적 이유(좌우 미분계수가 다름)를 직관적으로 이해하지 못함'
                ]
              }
            ]
          }
        ]
      },
      {
        subjectName: '미적분 II (Calculus II)',
        units: [
          {
            unitName: '여러 가지 함수의 미분법 (Differentiation of Various Functions)',
            topics: [
              {
                topic: '합성함수의 미분법 (Chain Rule)',
                specificScope: ['합성함수의 정의', '합성함수의 미분법(연쇄법칙)', '음함수 및 역함수의 미분'],
                keyConcepts: ['합성함수 (composite function)', '연쇄법칙 (chain rule)', '속미분 (inner derivative)', '겉미분 (outer derivative)'],
                achievementStandard: '[12미적2-02-02] 합성함수를 미분할 수 있다.',
                keywords: ['합성함수 미분', '연쇄법칙', '겉미분속미분', '매개변수', '도함수'],
                commonMisconceptions: [
                  '합성함수 f(g(x))를 미분할 때 속함수 g(x)를 미분한 g\'(x)를 곱하는 것(속미분)을 누락하고 겉미분 f\'(g(x))만 수행하는 다수의 실수',
                  '연쇄법칙 dy/dx = (dy/du) * (du/dx)의 라이프니츠 표기법이 분수처럼 약분되는 원리의 수학적 한계를 인지하지 못함'
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
