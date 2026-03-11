# FlowHR_V2 구현 스프린트 분해

## 작업 ID

- `WI-DM-009`

## 목적

현재까지 정리된 설계 산출물을 실제 구현 스프린트로 분해한다.
이 문서는 설계 문서와 구현 착수 사이의 작업 순서를 고정하기 위한 기준이다.

## 운영 원칙

- 스프린트는 권한 레이어와 공통 기반을 기준으로 나눈다.
- 각 스프린트는 `목표`, `범위`, `선행 조건`, `완료 기준`을 가진다.
- 이전 스프린트의 완료 기준이 충족되지 않으면 다음 스프린트로 넘기지 않는다.

## Sprint 0. App Foundation

### 목표

- 앱 골격과 공통 런타임 기반 확보

### 범위

- `src/app` 라우트 그룹 생성
- `platform`, `admin`, `employee`, `auth` shell 골격 생성
- `src/i18n/core/*` 로더/포맷터 골격 생성
- 공통 토큰 CSS 또는 theme object 연결

### 선행 조건

- [09-frontend-route-component-architecture.md](./09-frontend-route-component-architecture.md)
- [WI-DS-007-design-tokens.md](/C:/Team-jane/FlowHR_V2/docs/design-system/WI-DS-007-design-tokens.md)
- [07-localization-resource-architecture.md](./07-localization-resource-architecture.md)

### 완료 기준

- 각 shell이 독립 진입 가능
- 공통 locale 로더가 동작
- 토큰이 기본 레이아웃에 연결됨

## Sprint 1. Tenant Employee Core

### 목표

- 직원 셀프서비스 핵심 흐름 구현

### 범위

- `TE-001`, `TE-002`
- `TE-102`
- `TE-201`~`TE-205`
- `TE-401`, `TE-402`

### 관련 문서

- [WI-TE-001-employee-home.md](/C:/Team-jane/FlowHR_V2/docs/tenant-employee/WI-TE-001-employee-home.md)
- [WI-TE-002-attendance-check-flow.md](/C:/Team-jane/FlowHR_V2/docs/tenant-employee/WI-TE-002-attendance-check-flow.md)
- [WI-TE-003-request-hub.md](/C:/Team-jane/FlowHR_V2/docs/tenant-employee/WI-TE-003-request-hub.md)
- [WI-TE-004-signature-inbox.md](/C:/Team-jane/FlowHR_V2/docs/tenant-employee/WI-TE-004-signature-inbox.md)

### 완료 기준

- 출퇴근 기록 가능
- 요청 제출/이력 확인 가능
- 서명 인박스와 문서 확인 가능
- `loading`, `empty`, `error`, `no-permission` 상태 구현

## Sprint 2. Tenant Admin Operations Core

### 목표

- 운영형 관리자 허브와 코어 모듈 구현

### 범위

- `TA-001`
- `TA-101`~`TA-105`
- `TA-201`~`TA-205`
- `TA-301`~`TA-304`
- `TA-401`~`TA-404`

### 관련 문서

- [WI-TA-001-admin-home-dashboard.md](/C:/Team-jane/FlowHR_V2/docs/tenant-admin/WI-TA-001-admin-home-dashboard.md)
- [WI-TA-002-people-module.md](/C:/Team-jane/FlowHR_V2/docs/tenant-admin/WI-TA-002-people-module.md)
- [WI-TA-003-attendance-module.md](/C:/Team-jane/FlowHR_V2/docs/tenant-admin/WI-TA-003-attendance-module.md)
- [WI-TA-004-leave-module.md](/C:/Team-jane/FlowHR_V2/docs/tenant-admin/WI-TA-004-leave-module.md)
- [WI-TA-005-workflow-module.md](/C:/Team-jane/FlowHR_V2/docs/tenant-admin/WI-TA-005-workflow-module.md)

### 완료 기준

- 홈 큐와 KPI 동작
- 직원 목록/상세 조회 가능
- 근태 예외와 휴가 요청 처리 가능
- 결재 인박스 처리 가능

## Sprint 3. Documents / Payroll / Settings

### 목표

- 운영 마감과 조직 설정 축 구현

### 범위

- `TA-501`~`TA-504`
- `TA-601`~`TA-604`
- `TA-1001`~`TA-1005`

### 완료 기준

- 문서 발송/보관 흐름 연결
- 급여 마감 실행/확정 가능
- 역할/권한/회사 설정 관리 가능

## Sprint 4. Platform Operator Console

### 목표

- SaaS 운영 콘솔 구현

### 범위

- `PC-001`
- `PC-101`~`PC-205`
- `PC-601`~`PC-604`

### 완료 기준

- 테넌트 상세/상태 변경 가능
- 과금/플랜/플래그 운영 가능
- 감사/보안/승격 인증 흐름 확인 가능

## Sprint 5. Expansion Modules

### 목표

- 비핵심 확장 모듈과 인사이트 영역 구현

### 범위

- `TA-701`~`TA-704`
- `TA-801`~`TA-805`
- `TA-901`~`TA-904`

### 완료 기준

- 성과, 채용, 리포트 화면 진입 가능
- 코어 shell / token / i18n 구조를 재사용

## 스프린트 간 의존성

- Sprint 0 -> 모든 스프린트
- Sprint 1 -> Sprint 2의 일부 공통 패턴 검증
- Sprint 2 -> Sprint 3
- Sprint 0 + Sprint 2 -> Sprint 4
- Sprint 2 + Sprint 3 -> Sprint 5

## 구현 순서 요약

1. Sprint 0
2. Sprint 1
3. Sprint 2
4. Sprint 3
5. Sprint 4
6. Sprint 5

## 연결 문서

- 구현 준비 체크리스트: [12-implementation-readiness-checklist.md](./12-implementation-readiness-checklist.md)
- 모듈별 API 계약: [20-module-api-contract-breakdown.md](./20-module-api-contract-breakdown.md)
- 최종 승인 패스 기준: [22-final-approval-pass-criteria.md](./22-final-approval-pass-criteria.md)
