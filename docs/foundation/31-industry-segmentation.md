# FlowHR_V2 업종 세분화 초안

## 목적

이 문서는 FlowHR_V2가 처음부터 모든 업종을 동일하게 커버하려는 접근을 버리고,
우선 공략 업종과 후순위 업종을 외부 근거 기반으로 좁히기 위한 문서다.

기준은 아래 네 가지다.

- 한국 HR SaaS 시장에서 실제 수요가 큰가
- `근태/시프트/휴가/승인/문서/급여 연계`의 밀도가 높은가
- 제품 첫 화면이 업종별로 분명하게 달라지는가
- Shiftee / flex와 경쟁 또는 차별화 설계가 가능한가

## 외부 근거 요약

### 1. 한국형 코어 HR 제품은 `구성원/근태/워크플로/문서/성과`를 기본 축으로 묶는다

- flex는 `구성원·조직 관리`, `근태 관리`, `전자계약서`, `워크플로우`, `인사이트`를 코어로 제시한다.
- 가격 페이지에서도 `Core HR`, `성과관리`, `급여정산`, `전자계약`, `채용`을 모듈로 분리해 선택형 구조를 보여준다.

해석:

- 한국 시장에서 `오피스형 조직`과 `성장형 스타트업/중견기업`은
  `인사정보 + 근태 + 결재 + 문서 + 성과` 조합을 기본 기대값으로 본다.

### 2. Shiftee는 `스케줄/출퇴근/휴가/워크플로/전자서명/리포트`를 한 흐름으로 묶는다

- Shiftee는 `Schedule`, `Attendance`, `Leave`, `Workflow`, `Electronic Signature`, `Report`, `Integration`을 전면에 둔다.
- 일정 관리와 출퇴근 기록, 휴가, 승인, 전자서명을 한 운영 흐름으로 연결한다.

해석:

- `시프트/현장/다지점` 밀도가 있는 조직은
  단순 HRIS보다 `근무계획 + 출퇴근 + 예외 처리 + 문서`가 강하게 결합된 제품을 선호한다.

### 3. 글로벌 WFM 자료는 리테일/현장형 조직에서 `예측 스케줄 + 규정 준수 + 결원 대응`을 핵심으로 본다

- UKG의 retail/fair workweek 자료는 posted schedule, deviations, break compliance, audit trail을 핵심으로 설명한다.
- Legion은 retail/hospitality에서 Fair Workweek, meal/rest break, overtime, location-based rule 관리 필요성을 강조한다.

해석:

- `리테일/매장형`은 화면 구조 자체가
  `출근률 요약`보다 `매장 커버리지`, `브레이크 위반`, `예상 결원`, `대체 배치` 중심이어야 한다.

### 4. 제조/현장형 조직은 `복잡한 근무 규정`, `교대`, `노무/단협/현장 규칙`이 훨씬 무겁다

- WorkForce Software는 compliance를 법규뿐 아니라 trade union policy, pay rule complexity, multi-location workforce 운영까지 포함해 설명한다.
- 제조 산업 자료도 distributed operations, shift compliance, complex pay rule 처리에 초점을 둔다.

해석:

- `제조/현장형`은 분명 유망하지만,
  초기 제품이 커버해야 할 규칙 복잡도와 예외 모델이 급격히 상승한다.

### 5. 구매 기준은 여전히 `시간관리 + 급여연계 + 셀프서비스 + 리포팅 + 통합`이 반복된다

- ADP의 WFM/HCM buyer guide는 business size, industry, workforce attributes, locations, goals를 기준으로 요구사항을 정리해야 한다고 설명한다.
- PayrollOrg의 Workforce Management Buyer’s Guide 목록과 PDF 요약에서도
  mobile time collection, workflow routing, pay statements, payroll 연계가 반복된다.

해석:

- 어떤 업종을 먼저 공략하든,
  `근태/승인/문서/급여연계/모바일 셀프서비스`는 공통 코어로 유지해야 한다.

## 우선 공략 업종 제안

### 우선 1순위: 오피스형 / 지식근로 조직

대상 예:

- IT / SaaS / 스타트업
- 전문서비스
- 본사 중심 사무직 조직

선정 이유:

- flex가 강하게 공략하는 시장 축과 직접 맞닿아 있다.
- `구성원 정보`, `유연근무`, `휴가`, `워크플로`, `전자문서`, `성과`의 조합이 설계상 자연스럽다.
- 초기 제품의 권한 구조와 문서/승인/성과 설계를 그대로 살리기 쉽다.

핵심 운영 질문:

- 오늘 승인 적체 중 무엇을 먼저 처리할 것인가
- 어떤 문서/계약/평가가 병목인가
- 유연근무와 휴가 예외가 어떤 리스크를 만드는가

### 우선 2순위: 리테일 / 매장형 / 다지점 서비스 조직

대상 예:

- 외식
- 리테일
- 프랜차이즈
- 매장 운영 조직

선정 이유:

- Shiftee가 강한 축과 직접 맞닿아 있다.
- `시프트`, `출퇴근`, `매장별 결원`, `브레이크`, `초과근무`, `대체 배치`가 분명한 차별 축을 만든다.
- UI/UX 관점에서 업종별 홈 차이를 가장 명확하게 만들 수 있다.

핵심 운영 질문:

- 오늘 어느 매장에서 결원이 생기는가
- 피크타임 커버리지는 충분한가
- 브레이크/오버타임 위반이 발생하는가
- 대체 근무와 승인 병목을 어떻게 줄일 것인가

### 후순위 3순위: 제조 / 현장형 / 교대 조직

대상 예:

- 공장
- 생산 라인
- 물류센터
- 현장 운영 조직

선정 이유:

- 근태/교대/규정 준수 밀도가 높아 제품 가치가 크다.
- 다만 교대 패턴, 연속근무, 휴게 규칙, 노무/수당 규칙까지 들어오면 초기 복잡도가 빠르게 상승한다.

핵심 운영 질문:

- 교대 인수인계 공백이 있는가
- 연속근무/야간근무 리스크가 있는가
- 현장별 인력 커버리지가 유지되는가
- 수당/정산 오류를 만드는 예외가 무엇인가

## 제외 또는 보류 업종

### 1. 병원 / 케어 / 자격기반 전문직

보류 이유:

- 면허/자격 검증
- 위험도 기반 배치
- 인수인계와 환자 안전 맥락

이 세 가지가 초기 제품 범위를 크게 벗어난다.

### 2. 복잡한 글로벌 멀티국가 조직

보류 이유:

- 국가별 급여/노무/문서 규칙이 급격히 늘어난다.
- 현재 설계는 한국 시장 기준에 가깝다.

## 권장 제품 포지셔닝

현재 단계에서 가장 합당한 포지셔닝은 아래다.

- 1차 포지셔닝:
  - `오피스형 한국 HR 운영 SaaS`
  - `리테일/매장형 운영까지 확장 가능한 구조`
- 2차 확장 포지셔닝:
  - `시프트/현장 운영 밀도가 높은 조직을 위한 운영형 HR SaaS`

즉, 처음부터 제조/병원까지 동일 깊이로 설계하기보다
`오피스형 + 리테일형`을 우선 공략하고
`제조/현장형`을 구조적으로 수용할 수 있게 열어두는 편이 맞다.

## 설계 반영 원칙

### 공통 코어로 유지할 것

- 조직/구성원 정보
- 권한
- 근태
- 휴가
- 워크플로
- 전자문서
- 감사 로그
- 모바일 셀프서비스

### 업종별로 분기할 것

- 홈 화면 우선순위
- KPI 정의
- 위험 신호 정의
- 메뉴 순서
- 용어
- 기본 정책 프리셋
- 첫 설정 플로우

## 현재 권장 결론

다음 설계는 아래 기준으로 진행하는 것이 맞다.

1. 우선 공략 업종: `오피스형`, `리테일/매장형`
2. 후순위 업종: `제조/현장형`
3. 보류 업종: `병원/케어/자격기반 전문직`, `복잡한 글로벌 멀티국가 조직`

## 참고 출처

- Shiftee Overview: https://worker.shiftee.io/
- Shiftee Electronic Signature: https://shiftee.io/en/e-signature
- flex 메인: https://flex.team/
- flex 가격: https://flex.team/pricing
- UKG Fair Workweek Guide: https://www.ukg.com/sites/default/files/2025-09/FY25_RT0402v3_A%20Guide%20to%20Fair%20Work%20Week%20Laws_WP_ResourcePDF.pdf
- Legion retail/hospitality compliance: https://legion.co/blog/2024/03/04/automatically-manage-compliance-risk-hospitality-retail/
- WorkForce Software compliance: https://workforcesoftware.com/workforce-suite/compliance/
- WorkForce Software manufacturing info: https://workforcesoftware.com/wp-content/uploads/SAP-Industry-Mfg-Info-Sheet-091522.pdf
- ADP Workforce Management Buyer’s Guide: https://www.adp.com/resources/articles-and-insights/articles/w/workforce-management-buyers-guide.aspx
- PayrollOrg Workforce Management Buyer’s Guide: https://payroll.org/docs/default-source/buyers-guides/24j-Workforce-Mgmt-bg.pdf
