# FlowHR_V2 화면 맵 v1

## 목적

이 문서는 FlowHR_V2의 화면 체계를 `Platform Operator`, `Tenant Admin`,
`Tenant Employee` 3개 권한 축으로 정리한다.

---

## 1. Platform Console

### 1-1. 1차 메뉴

- Dashboard
- Tenants
- Plans & Billing
- Policy Templates
- Support Ops
- Monitoring
- Audit & Security
- Platform Settings

### 1-2. 화면 목록

- `PC-001` Platform Overview Dashboard
- `PC-101` Tenant List
- `PC-102` Tenant Create
- `PC-103` Tenant Detail
- `PC-104` Tenant Lifecycle Actions
- `PC-201` Plan Catalog
- `PC-202` Billing Accounts
- `PC-203` Invoices & Payment History
- `PC-204` Billing Adjustments
- `PC-205` Feature Flag Console
- `PC-301` Work Policy Templates
- `PC-302` Leave Policy Templates
- `PC-303` Approval Workflow Templates
- `PC-401` Support Inbox
- `PC-402` Tenant Issue Detail
- `PC-403` Notices & Announcements
- `PC-501` Service Monitoring Dashboard
- `PC-502` Usage Analytics
- `PC-601` Operator Audit Log
- `PC-602` Access Control
- `PC-603` Security Policies
- `PC-604` Authentication & Session Control
- `PC-701` Global Settings
- `PC-702` Integrations

---

## 2. Tenant Admin

### 2-1. 1차 메뉴

- Home
- People
- Attendance
- Leave
- Workflow
- Documents
- Payroll
- Performance
- Recruiting
- Reports
- Settings

### 2-2. 화면 목록

- `TA-001` Admin Home Dashboard
- `TA-002` Manager Home Dashboard
- `TA-101` Employee Directory
- `TA-102` Employee Detail / Profile
- `TA-103` Organization Chart
- `TA-104` HR Change History
- `TA-105` Employee Import / Sync
- `TA-201` Attendance Dashboard
- `TA-202` Shift Board
- `TA-203` Attendance Records
- `TA-204` Attendance Exceptions
- `TA-205` Attendance Closing
- `TA-301` Leave Dashboard
- `TA-302` Leave Policy Management
- `TA-303` Leave Calendar
- `TA-304` Leave Requests
- `TA-401` Approval Inbox
- `TA-402` Approval Detail
- `TA-403` Workflow Builder
- `TA-404` Approval History
- `TA-501` Document Dashboard
- `TA-502` Template Manager
- `TA-503` Document Send / Bulk Send
- `TA-504` Document Vault
- `TA-601` Payroll Dashboard
- `TA-602` Payroll Rules
- `TA-603` Payroll Closing
- `TA-604` Payslip Center
- `TA-701` Goal Dashboard
- `TA-702` Evaluation Setup
- `TA-703` Evaluation Cycle
- `TA-704` One-on-One Hub
- `TA-801` Hiring Dashboard
- `TA-802` Job Posting Manager
- `TA-803` Candidate Pipeline
- `TA-804` Onboarding Center
- `TA-805` Offboarding Center
- `TA-901` Report Center
- `TA-902` People Insights
- `TA-903` Attendance Insights
- `TA-904` Export & Scheduled Reports
- `TA-1001` Company Settings
- `TA-1002` Role & Permission Settings
- `TA-1003` Notification Settings
- `TA-1004` Integration Settings
- `TA-1005` Audit Log

---

## 3. Tenant Employee

### 3-1. 1차 메뉴

- Home
- Schedule
- Requests
- Inbox
- Documents
- My Profile

### 3-2. 화면 목록

- `TE-001` Employee Home
- `TE-002` Employee Mobile Home
- `TE-101` My Schedule
- `TE-102` Attendance Check In/Out
- `TE-103` My Attendance History
- `TE-201` New Request Hub
- `TE-202` Leave Request Form
- `TE-203` Attendance Correction Request
- `TE-204` Expense / General Workflow Request
- `TE-205` My Request History
- `TE-301` My Inbox
- `TE-302` Notification Detail
- `TE-401` Signature Inbox
- `TE-402` Document Viewer / Sign
- `TE-403` My Document Archive
- `TE-501` My Profile
- `TE-502` My Leave Balance
- `TE-503` My Performance

## 연결 원칙

- 화면 ID는 제품 정보구조용 식별자다.
- WI ID는 설계/구현 작업 식별자다.
- 같은 권한 레이어에서는 접두사를 공유한다.
