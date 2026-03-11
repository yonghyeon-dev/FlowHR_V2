# FlowHR_V2 업종 팩 및 기능 선택 구조

## 목적

이 문서는 FlowHR_V2를 `모든 기능이 항상 보이는 범용 제품`으로 설계하지 않고,
`공통 코어 + 업종 팩 + 기능 팩`으로 분리하기 위한 기준 문서다.

이 구조의 목적은 세 가지다.

- 업종별 첫 화면과 운영 우선순위를 다르게 만든다
- 고객사 도입 시 기능 선택을 명확하게 만든다
- 제품 오염 없이 확장 가능한 구조를 만든다

## 구조 원칙

### 1. 공통 코어

모든 고객사가 공통으로 가져가는 기본 영역이다.

- 조직/직원 정보
- 권한/역할
- 기본 워크플로
- 기본 문서
- 감사 로그
- 알림
- 기본 모바일 셀프서비스

### 2. 업종 팩

업종에 따라 기본 홈, 기본 메뉴 순서, 기본 KPI, 기본 정책을 바꾸는 레이어다.

- Office Pack
- Retail Pack
- Manufacturing Pack

### 3. 기능 팩

실제 사용 범위를 결정하는 모듈 단위 선택 레이어다.

- Attendance Pack
- Shift Pack
- Leave Pack
- Workflow Pack
- Document Pack
- Payroll Pack
- Performance Pack
- Recruiting Pack
- Reports Pack

## 도입 플로우 제안

고객사 온보딩 시 설정 순서는 아래가 맞다.

1. 회사 기본 정보 입력
2. 업종 팩 선택
3. 운영 형태 선택
4. 기능 팩 선택
5. 정책 프리셋 적용
6. 권한 및 역할 설정
7. 홈 화면 우선순위 확인

## 업종 팩 정의

### 1. Office Pack

대상:

- IT / SaaS / 스타트업
- 사무직 중심 조직

기본 홈 우선순위:

1. 승인 적체
2. 문서/전자계약 병목
3. 유연근무 예외
4. 휴가 현황
5. 성과/원온원 후속 작업

기본 메뉴 순서:

- Home
- People
- Workflow
- Documents
- Attendance
- Leave
- Performance
- Reports
- Settings

기본 정책 프리셋:

- 유연근무
- 재택/원격
- 승인형 요청
- 전자문서/전자서명

### 2. Retail Pack

대상:

- 매장 운영
- 외식
- 프랜차이즈
- 다지점 서비스업

기본 홈 우선순위:

1. 결원/대체 배치
2. 매장별 커버리지
3. 브레이크/오버타임 리스크
4. 출퇴근 예외
5. 급여 반영 전 예외

기본 메뉴 순서:

- Home
- Attendance
- Shift
- Leave
- Workflow
- People
- Documents
- Payroll
- Reports
- Settings

기본 정책 프리셋:

- 다지점 근무
- 시프트 스케줄
- 브레이크/오버타임 경고
- 현장형 출퇴근 검증

### 3. Manufacturing Pack

대상:

- 생산/공장
- 물류/현장
- 교대 중심 조직

기본 홈 우선순위:

1. 교대 커버리지
2. 연속근무/야간 리스크
3. 휴게 위반
4. 현장별 인력 공백
5. 수당/정산 위험 예외

기본 메뉴 순서:

- Home
- Attendance
- Shift
- People
- Workflow
- Payroll
- Leave
- Documents
- Reports
- Settings

기본 정책 프리셋:

- 교대근무
- 야간/연속근무 제한
- 현장 배치
- 현장 출퇴근 검증

## 기능 팩 정의

### Attendance Pack

포함:

- 출퇴근 기록
- 예외 분류
- 정정 요청
- 마감 전 검토

모든 우선 업종에 기본 포함.

### Shift Pack

포함:

- 스케줄 보드
- 교대/대체 배치
- 커버리지 뷰

Retail, Manufacturing에는 기본 포함.
Office에는 옵션 포함.

### Leave Pack

포함:

- 휴가 정책
- 잔액
- 캘린더
- 요청 처리

모든 우선 업종에 기본 포함.

### Workflow Pack

포함:

- 결재선
- 승인 인박스
- 일반 요청
- 승인 이력

모든 우선 업종에 기본 포함.

### Document Pack

포함:

- 전자문서
- 템플릿
- 발송
- 서명
- 보관함

Office에는 기본 포함.
Retail에는 기본 포함 권장.
Manufacturing에는 옵션 포함.

### Payroll Pack

포함:

- 급여 마감
- 급여 규칙
- 명세서 배포
- 정산 리스크 검토

Retail, Manufacturing에는 기본 포함 권장.
Office에는 선택형 포함 가능.

### Performance Pack

포함:

- 목표
- 평가
- 원온원

Office에는 기본 포함 권장.
Retail, Manufacturing에는 선택형 포함.

### Recruiting Pack

포함:

- 채용
- 온보딩
- 오프보딩

Office, Retail에 선택형 포함.
Manufacturing에는 후순위.

### Reports Pack

포함:

- 운영 리포트
- 내보내기
- 예약 발송

모든 업종에 기본 포함 가능하되,
업종별 기본 리포트 셋은 달라져야 한다.

## 기능 선택 매트릭스

| 기능 팩 | Office | Retail | Manufacturing |
|---|---|---|---|
| Attendance | 기본 | 기본 | 기본 |
| Shift | 선택 | 기본 | 기본 |
| Leave | 기본 | 기본 | 기본 |
| Workflow | 기본 | 기본 | 기본 |
| Documents | 기본 | 기본 권장 | 선택 |
| Payroll | 선택 | 기본 권장 | 기본 권장 |
| Performance | 기본 권장 | 선택 | 선택 |
| Recruiting | 선택 | 선택 | 후순위 |
| Reports | 기본 | 기본 | 기본 |

## 화면 설계 반영 원칙

### 홈 화면

- 홈은 업종 팩에서 먼저 결정한다
- 기능 팩은 홈 안의 카드와 진입점을 바꾼다
- 따라서 홈은 `권한별 1개`가 아니라 `권한 x 업종 팩` 조합으로 다시 설계해야 한다

### 메뉴

- 메뉴 순서는 업종 팩이 결정한다
- 메뉴 노출 여부는 기능 팩이 결정한다

### KPI

- KPI는 공통 숫자 세트로 고정하지 않는다
- 업종 팩에서 `우선 위험 신호`를 정의하고 기능 팩이 수치를 공급한다

## 현재 권장 결론

다음 설계부터는 아래 구조를 기준으로 가는 것이 맞다.

1. `Office Pack`
2. `Retail Pack`
3. `Manufacturing Pack`

그리고 우선 제품은
`Office Pack + Retail Pack`을 먼저 강하게 만들고,
`Manufacturing Pack`은 구조를 열어두는 방식으로 진행한다.

## 연결 문서

- 업종 세분화: [31-industry-segmentation.md](./31-industry-segmentation.md)
- 목표 수렴 탐색 프레임: [30-goal-convergence-exploration.md](./30-goal-convergence-exploration.md)
