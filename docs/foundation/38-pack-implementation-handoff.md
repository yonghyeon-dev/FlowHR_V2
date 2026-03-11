# FlowHR_V2 Pack 구현 핸드오프

## 목적

승인 직후 구현에 바로 들어갈 수 있도록, 각 Pack별 구현 단위를 한 번에 보는 핸드오프 문서다.

현재 기준 구현 스택은 `Next.js App Router + TypeScript`다.
현재 코어 화면 데이터는 `typed mock API + fetcher` 구조를 통해 주입된다.

## Office Pack

### 라우트

- `/admin/office/home`
- `/admin/office/attendance`
- `/admin/office/leave`
- `/admin/office/workflow`
- `/admin/office/documents`
- `/employee/office/home`
- `/employee/office/requests`
- `/employee/office/signatures`

### 주요 컴포넌트

- `AdminNavRail`
- `KpiCard`
- `AttendanceExceptionQueue`
- `LeavePolicySummary`
- `ApprovalInboxList`
- `DocumentDeliveryQueue`
- `EmployeeStatusHeader`
- `RequestTypePicker`
- `SignatureTaskList`

### API 묶음

- `/admin/home/*`
- `/admin/attendance/*`
- `/admin/leave/*`
- `/admin/approvals/*`
- `/admin/documents/*`
- `/employee/home/*`
- `/employee/requests/*`
- `/employee/signatures/*`

### locale namespace

- `tenant-admin.json`
- `tenant-employee.json`
- `domain.json`
- `common.json`

## Retail Pack

### 라우트

- `/admin/retail/home`
- `/admin/retail/attendance`
- `/admin/retail/leave`
- `/admin/retail/workflow`
- `/admin/retail/documents`
- `/employee/retail/home`
- `/employee/retail/requests`
- `/employee/retail/signatures`

### 주요 차이

- 관리자 홈은 `결원 / 커버리지 / 브레이크 / 오버타임` 우선
- 직원 홈은 `오늘 근무 / 체크인 / 시프트 응답` 우선
- 같은 라우트를 쓰더라도 Pack 설정으로 카드 배치와 우선순위가 바뀌어야 한다

### 현재 구현 상태

- 승인된 코어 라우트 구현 완료
- 언어 토글과 locale persistence 검증 완료
- 실제 API 연결 전의 baseline UI 상태 확보

### API 추가 필드

- attendance 계열:
  - `coverageGap`
  - `breakRisk`
  - `peakSlot`
  - `blockingClosing`
- employee 계열:
  - `todayShift`
  - `requiresShiftResponse`

## Platform

### 라우트

- `/platform/overview`

### 주요 컴포넌트

- `TenantHealthCard`
- `BillingRiskQueue`
- `AuditEventStream`
- `StepUpPrompt`

### API 묶음

- `/platform/tenants/*`
- `/platform/billing/*`
- `/platform/security/*`

## 구현 순서

1. 공통 기반 전환
2. Office Pack 코어 구현
3. Retail Pack 코어 구현
4. Platform 코어 구현
5. mock API / fetch 계층 추가
6. Pack 선택 및 도입 진입점 구현
7. 실제 데이터 연동 및 확장

## 연결 문서

- [09-frontend-route-component-architecture.md](./09-frontend-route-component-architecture.md)
- [13-component-inventory.md](./13-component-inventory.md)
- [20-module-api-contract-breakdown.md](./20-module-api-contract-breakdown.md)
- [23-implementation-sprint-breakdown.md](./23-implementation-sprint-breakdown.md)
- [41-goal-convergence-status.md](./41-goal-convergence-status.md)
