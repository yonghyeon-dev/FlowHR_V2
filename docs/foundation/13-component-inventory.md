# FlowHR_V2 컴포넌트 인벤토리

## 목적

와이어와 화면 설계를 실제 프론트엔드 구현 단위로 연결하기 위해,
공통 컴포넌트와 도메인 컴포넌트의 경계를 먼저 정리한다.

## 1. App Shell 컴포넌트

### Platform Shell

- GlobalSearch
- TenantContextBadge
- OperatorNoticeBar
- RiskQueueDock
- PlatformNavRail

### Tenant Admin Shell

- CompanySwitcher
- AdminGlobalSearch
- AdminNotificationTray
- ApprovalInboxShortcut
- AdminNavRail

### Tenant Employee Shell

- EmployeeStatusHeader
- MobileTabBar
- QuickActionDock
- EmployeeInboxShortcut
- LocaleProfileSwitcher

## 2. 공통 UI 컴포넌트

### Navigation

- `PageHeader`
- `SectionHeader`
- `TabSwitch`
- `FilterBar`
- `SearchInput`

### Data Display

- `KpiCard`
- `StatusBadge`
- `QueueList`
- `DataTable`
- `MetricTrend`
- `Timeline`

### Feedback / State

- `EmptyState`
- `LoadingState`
- `ErrorState`
- `NoPermissionState`
- `OfflineBanner`
- `ToastStack`

### Overlay / Action

- `ConfirmDialog`
- `ReasonDialog`
- `SidePanel`
- `DetailDrawer`
- `StepUpPrompt`

## 3. 권한 레이어 전용 컴포넌트

### Platform 전용

- `TenantHealthCard`
- `BillingRiskQueue`
- `FeatureFlagMatrix`
- `AuditEventStream`
- `AccessMatrixBoard`

### Tenant Admin 전용

- `EmployeeSummaryCard`
- `AttendanceExceptionQueue`
- `LeaveBalancePanel`
- `ApprovalStageRail`
- `PayrollClosingBoard`
- `ReportSnapshotGrid`

### Tenant Employee 전용

- `CheckInStatusCard`
- `RequestTypePicker`
- `SignatureTaskList`
- `MyBalanceSummary`
- `PerformanceSummaryCard`

## 4. Feature Block 기준

### Home

- `OrgSnapshotSection`
- `TodayQueueSection`
- `EmployeeTodayStatusSection`

### People

- `EmployeeDirectoryTable`
- `EmployeeProfilePanel`
- `ImportJobStatusList`

### Attendance

- `AttendanceSummaryHeader`
- `AttendanceExceptionTable`
- `ShiftBoardGrid`
- `CheckInActionPanel`

### Leave / Workflow

- `LeavePolicySummary`
- `LeaveRequestTable`
- `ApprovalInboxList`
- `ApprovalDetailPanel`

### Documents / Payroll / Reports

- `DocumentDeliveryQueue`
- `SignatureViewerPanel`
- `PayrollRunStepper`
- `ReportExportPanel`

## 5. i18n 소유 규칙

- 공통 컴포넌트의 라벨과 상태 문구는 `common.json`
- Platform 전용 문구는 `platform.json`
- 관리자 전용 문구는 `tenant-admin.json`
- 직원 전용 문구는 `tenant-employee.json`
- 정책/도메인 용어는 `domain.json`

## 6. 구현 진입 기준

- 하나의 컴포넌트는 하나의 권한 컨텍스트만 알아야 한다.
- 공통 컴포넌트는 HR 정책 규칙을 직접 포함하지 않는다.
- Feature Block은 API 계약과 직접 연결되고, App Shell은 화면 컨텍스트만 책임진다.
- 다국어 키는 컴포넌트 레벨에서 소유 namespace가 명확해야 한다.

## 연결 문서

- 라우트 및 구조: [09-frontend-route-component-architecture.md](./09-frontend-route-component-architecture.md)
- 데이터 계약: [10-data-contract-state-management.md](./10-data-contract-state-management.md)
- 구현 준비 체크리스트: [12-implementation-readiness-checklist.md](./12-implementation-readiness-checklist.md)
