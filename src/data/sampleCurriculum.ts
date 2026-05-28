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
    gradeName: '고등학교 1학년 (High School 1)',
    subjects: [
      {
        subjectName: '공통수학 1 (Common Mathematics 1)',
        units: [
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
          }
        ]
      }
    ]
  },
  {
    gradeName: '고등학교 2학년 (High School 2)',
    subjects: [
      {
        subjectName: '수학 I (Mathematics I)',
        units: [
          {
            unitName: '지수함수와 로그함수 (Exponential and Logarithmic Functions)',
            topics: [
              {
                topic: '지수의 확장과 지수법칙 (Extension of Exponents and Laws)',
                specificScope: ['거듭제곱근의 정의', '실수인 거듭제곱근의 개수', '지수가 유리수, 실수일 때의 지수법칙'],
                keyConcepts: ['거듭제곱근 (nth root)', '실수의 개수', '지수법칙 (laws of exponents)'],
                achievementStandard: '[12수1-01-01] 거듭제곱과 거듭제곱근의 뜻을 알고, 그 성질을 이해한다.',
                keywords: ['거듭제곱근', '실근의 개수', '홀수 제곱근', '짝수 제곱근', '지수 확장'],
                commonMisconceptions: [
                  'a의 n제곱근의 개수가 항상 실수 범위에서만 존재하는 것으로 착각하는 경우 (n개 중 실수는 조건에 따라 0, 1, 2개)',
                  '음수의 짝수 거듭제곱근이 실수 범위에 존재하지 않음을 간과함'
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
