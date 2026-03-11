# FlowHR_V2 와이어프레임 가이드

## 디렉토리 구조

`wireframes/foundation`
- 제품 방향과 전체 화면 세트를 설명하는 개요 와이어

`wireframes/platform`
- Platform Console 와이어

`wireframes/tenant-admin`
- 고객사 관리자용 와이어

`wireframes/tenant-employee`
- 고객사 직원용 와이어

`wireframes/shared`
- 공통 스타일

## 주요 진입점

- [제품 개요](./foundation/tenant-hr-app-overview.html)
- [Platform Console](./platform/platform-console.html)
- [Platform Audit & Security](./platform/audit-security-detailed.html)
- [Platform Plans / Billing / Feature Flags](./platform/plans-billing-feature-flags.html)
- [Platform Auth / Access Control](./platform/auth-access-control-detailed.html)
- [Admin Home](./tenant-admin/admin-home-detailed.html)
- [People](./tenant-admin/people-module-detailed.html)
- [Attendance](./tenant-admin/attendance-module-detailed.html)
- [Leave](./tenant-admin/leave-module-detailed.html)
- [Workflow](./tenant-admin/workflow-module-detailed.html)
- [Documents](./tenant-admin/documents-module-detailed.html)
- [Settings / Role & Permission](./tenant-admin/settings-role-permission-detailed.html)
- [Employee Home](./tenant-employee/employee-home-detailed.html)
- [Employee Mobile Layout System](./tenant-employee/mobile-layout-system.html)
- [Attendance Check Flow](./tenant-employee/attendance-check-flow.html)
- [Request Hub](./tenant-employee/request-hub-detailed.html)
- [Signature Inbox](./tenant-employee/signature-inbox-detailed.html)
- [Profile & Performance](./tenant-employee/profile-performance-detailed.html)
- [Performance Module](./tenant-admin/performance-module-detailed.html)
- [Recruiting Module](./tenant-admin/recruiting-module-detailed.html)
- [Payroll Module](./tenant-admin/payroll-module-detailed.html)
- [Reports & Insights](./tenant-admin/reports-insights-detailed.html)

## 운영 원칙

- 와이어프레임은 승인용 산출물이다.
- 정식 프로덕션 UI 스타일과 동일하지 않다.
- 새 화면은 권한 레이어에 맞는 폴더에만 추가한다.
- `LID-*`가 적용된 페이지는 `?lang=ko` 또는 `?lang=en`으로 언어를 강제할 수 있다.
- 현재 Platform 핵심 화면 4종과 `Admin Home`, `Employee Home`, `Attendance`, `Request Hub`, `Signature Inbox`는 `LID-*` 기반으로 동작한다.
