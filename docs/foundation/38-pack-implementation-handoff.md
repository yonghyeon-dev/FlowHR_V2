# FlowHR_V2 Pack 구현 핸드오프

## 목적

승인 직후 구현에 바로 들어갈 수 있도록, 각 Pack별 구현 단위를 한 번에 보는 핸드오프 문서다.

## Office Pack

### 라우트

- `app/admin/home`
- `app/admin/attendance`
- `app/admin/leave`
- `app/admin/workflow`
- `app/admin/documents`
- `app/employee/home`
- `app/employee/requests`
- `app/employee/signatures`

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

- `app/admin/home`
- `app/admin/attendance`
- `app/admin/leave`
- `app/admin/workflow`
- `app/admin/documents`
- `app/employee/home`
- `app/employee/requests`
- `app/employee/signatures`

### 주요 차이

- 관리자 홈은 `결원 / 커버리지 / 브레이크 / 오버타임` 우선
- 직원 홈은 `오늘 근무 / 체크인 / 시프트 응답` 우선
- 같은 라우트를 쓰더라도 Pack 설정으로 카드 배치와 우선순위가 바뀌어야 한다

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

- `app/platform/dashboard`

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

1. Sprint 0 공통 기반
2. Office Pack
3. Retail Pack
4. Shared Tenant Expansion
5. Platform 확장

## 연결 문서

- [09-frontend-route-component-architecture.md](./09-frontend-route-component-architecture.md)
- [13-component-inventory.md](./13-component-inventory.md)
- [20-module-api-contract-breakdown.md](./20-module-api-contract-breakdown.md)
- [23-implementation-sprint-breakdown.md](./23-implementation-sprint-breakdown.md)
