# FlowHR_V2 IA 계층표

## 목적

이 문서는 FlowHR_V2의 정보구조를 `대분류 > 중분류 > 소분류 > 상세분류`로 완전히 내리고,
각 상세분류가 어떤 화면 ID와 연결되는지 추적하기 위한 기준표다.

## 계층 규칙

- 대분류: 권한 레이어 안의 최상위 모듈
- 중분류: 1차 메뉴 또는 운영 허브
- 소분류: 사용자가 인지하는 업무 묶음
- 상세분류: 실제 화면 또는 세부 처리 단위
- 모든 상세분류는 최소 1개의 화면 ID와 연결된다

## 1. Platform Operator

| 대분류 | 중분류 | 소분류 | 상세분류 | 화면 ID |
|---|---|---|---|---|
| Dashboard | Overview | 운영 위험 요약 | Platform Overview Dashboard | `PC-001` |
| Tenants | Tenant Directory | 테넌트 검색/필터 | Tenant List | `PC-101` |
| Tenants | Tenant Onboarding | 신규 테넌트 생성 | Tenant Create | `PC-102` |
| Tenants | Tenant Detail | 계약/사용량/지원 맥락 조회 | Tenant Detail | `PC-103` |
| Tenants | Tenant Lifecycle | 정지/복구/유예 처리 | Tenant Lifecycle Actions | `PC-104` |
| Plans & Billing | Plan Catalog | 플랜 정의/모듈 범위 | Plan Catalog | `PC-201` |
| Plans & Billing | Billing Accounts | 결제 수단/청구 계정 관리 | Billing Accounts | `PC-202` |
| Plans & Billing | Invoice Ops | 송장/결제 이력 추적 | Invoices & Payment History | `PC-203` |
| Plans & Billing | Billing Adjustments | 할인/수동 조정 기록 | Billing Adjustments | `PC-204` |
| Plans & Billing | Feature Access | 기능 플래그/예외 부여 | Feature Flag Console | `PC-205` |
| Policy Templates | Work Policy | 근무 정책 템플릿 | Work Policy Templates | `PC-301` |
| Policy Templates | Leave Policy | 휴가 정책 템플릿 | Leave Policy Templates | `PC-302` |
| Policy Templates | Approval Workflow | 결재 흐름 템플릿 | Approval Workflow Templates | `PC-303` |
| Support Ops | Support Inbox | 지원 접수/우선순위 큐 | Support Inbox | `PC-401` |
| Support Ops | Issue Detail | 고객사 이슈 상세 추적 | Tenant Issue Detail | `PC-402` |
| Support Ops | Notice Ops | 공지/점검/장애 안내 발송 | Notices & Announcements | `PC-403` |
| Monitoring | Service Health | 서비스 상태 관제 | Service Monitoring Dashboard | `PC-501` |
| Monitoring | Usage Analytics | 사용량/활성 추이 분석 | Usage Analytics | `PC-502` |
| Audit & Security | Audit Events | 운영자 감사 로그 | Operator Audit Log | `PC-601` |
| Audit & Security | Access Governance | 역할/권한 매트릭스 | Access Control | `PC-602` |
| Audit & Security | Policy Governance | 보안 정책 조정 | Security Policies | `PC-603` |
| Audit & Security | Authentication Control | 세션/재인증/승격 인증 | Authentication & Session Control | `PC-604` |
| Platform Settings | Global Settings | 전역 설정 | Global Settings | `PC-701` |
| Platform Settings | Integration Management | 외부 연동 관리 | Integrations | `PC-702` |

## 2. Tenant Admin

| 대분류 | 중분류 | 소분류 | 상세분류 | 화면 ID |
|---|---|---|---|---|
| Home | Admin Home | 오늘 운영 큐 | Admin Home Dashboard | `TA-001` |
| Home | Manager Home | 팀 운영 우선순위 | Manager Home Dashboard | `TA-002` |
| People | Directory | 직원 목록/검색 | Employee Directory | `TA-101` |
| People | Profile | 직원 기본/인사 정보 | Employee Detail / Profile | `TA-102` |
| People | Organization | 조직도/리포팅 라인 | Organization Chart | `TA-103` |
| People | Change History | 인사 변경 이력 | HR Change History | `TA-104` |
| People | Import & Sync | 일괄 등록/동기화 작업 | Employee Import / Sync | `TA-105` |
| Attendance | Dashboard | 근태 요약/예외 모니터링 | Attendance Dashboard | `TA-201` |
| Attendance | Shift Planning | 스케줄 편성/교대 관리 | Shift Board | `TA-202` |
| Attendance | Records | 출퇴근 기록 조회 | Attendance Records | `TA-203` |
| Attendance | Exceptions | 예외 분류/조치 | Attendance Exceptions | `TA-204` |
| Attendance | Closing | 근태 마감/정산 연계 | Attendance Closing | `TA-205` |
| Leave | Dashboard | 휴가 현황 요약 | Leave Dashboard | `TA-301` |
| Leave | Policy Management | 휴가 규칙/부여 정책 | Leave Policy Management | `TA-302` |
| Leave | Calendar | 조직 휴가 캘린더 | Leave Calendar | `TA-303` |
| Leave | Request Processing | 휴가 요청 처리 | Leave Requests | `TA-304` |
| Workflow | Approval Inbox | 승인 대기 문서 처리 | Approval Inbox | `TA-401` |
| Workflow | Approval Detail | 결재 문서 상세 | Approval Detail | `TA-402` |
| Workflow | Workflow Builder | 결재선/단계 설계 | Workflow Builder | `TA-403` |
| Workflow | Approval History | 결재 이력 추적 | Approval History | `TA-404` |
| Documents | Document Dashboard | 문서 상태 요약 | Document Dashboard | `TA-501` |
| Documents | Template Management | 문서 템플릿 관리 | Template Manager | `TA-502` |
| Documents | Send Ops | 개별/일괄 발송 | Document Send / Bulk Send | `TA-503` |
| Documents | Archive | 보관 문서 조회 | Document Vault | `TA-504` |
| Payroll | Payroll Dashboard | 급여 상태 요약 | Payroll Dashboard | `TA-601` |
| Payroll | Payroll Rules | 계산/공제 규칙 관리 | Payroll Rules | `TA-602` |
| Payroll | Payroll Closing | 마감 실행/확정 | Payroll Closing | `TA-603` |
| Payroll | Payslip Delivery | 급여명세서 제공 | Payslip Center | `TA-604` |
| Performance | Goal Management | 목표 현황 요약 | Goal Dashboard | `TA-701` |
| Performance | Evaluation Setup | 평가 항목/주기 설정 | Evaluation Setup | `TA-702` |
| Performance | Evaluation Cycle | 평가 진행/회수 | Evaluation Cycle | `TA-703` |
| Performance | One-on-One | 1:1 기록/후속 조치 | One-on-One Hub | `TA-704` |
| Recruiting | Hiring Dashboard | 채용 파이프라인 요약 | Hiring Dashboard | `TA-801` |
| Recruiting | Job Posting | 공고 생성/게시 | Job Posting Manager | `TA-802` |
| Recruiting | Candidate Pipeline | 후보자 단계 관리 | Candidate Pipeline | `TA-803` |
| Recruiting | Onboarding | 입사 준비/체크리스트 | Onboarding Center | `TA-804` |
| Recruiting | Offboarding | 퇴사 처리/인수인계 | Offboarding Center | `TA-805` |
| Reports | Report Center | 리포트 허브 | Report Center | `TA-901` |
| Reports | People Analytics | 인사 지표 분석 | People Insights | `TA-902` |
| Reports | Attendance Analytics | 근태 지표 분석 | Attendance Insights | `TA-903` |
| Reports | Export Ops | 내보내기/예약 발송 | Export & Scheduled Reports | `TA-904` |
| Settings | Company Settings | 회사 기본값 관리 | Company Settings | `TA-1001` |
| Settings | Role & Permission | 역할/권한/범위 관리 | Role & Permission Settings | `TA-1002` |
| Settings | Notification Rules | 알림 정책 관리 | Notification Settings | `TA-1003` |
| Settings | Integrations | 외부 연동 설정 | Integration Settings | `TA-1004` |
| Settings | Admin Audit | 관리자 감사 로그 | Audit Log | `TA-1005` |

## 3. Tenant Employee

| 대분류 | 중분류 | 소분류 | 상세분류 | 화면 ID |
|---|---|---|---|---|
| Home | Employee Home | 오늘 상태/빠른 실행 | Employee Home | `TE-001` |
| Home | Mobile Home | 모바일 셀프서비스 시작점 | Employee Mobile Home | `TE-002` |
| Schedule | My Schedule | 개인 일정 확인 | My Schedule | `TE-101` |
| Schedule | Check In/Out | 출퇴근 기록 | Attendance Check In/Out | `TE-102` |
| Schedule | Attendance History | 개인 근태 이력 | My Attendance History | `TE-103` |
| Requests | Request Hub | 요청 유형 선택 허브 | New Request Hub | `TE-201` |
| Requests | Leave Request | 휴가 신청 작성 | Leave Request Form | `TE-202` |
| Requests | Attendance Correction | 출퇴근 정정 신청 | Attendance Correction Request | `TE-203` |
| Requests | General Workflow | 비용/일반 품의 요청 | Expense / General Workflow Request | `TE-204` |
| Requests | Request History | 내 요청 상태 추적 | My Request History | `TE-205` |
| Inbox | Inbox List | 알림/처리 요청 목록 | My Inbox | `TE-301` |
| Inbox | Notification Detail | 알림 세부 확인 | Notification Detail | `TE-302` |
| Documents | Signature Inbox | 서명 필요 문서 목록 | Signature Inbox | `TE-401` |
| Documents | Viewer & Sign | 문서 확인/서명 실행 | Document Viewer / Sign | `TE-402` |
| Documents | Archive | 개인 문서 보관함 | My Document Archive | `TE-403` |
| My Profile | Profile | 개인 정보 조회 | My Profile | `TE-501` |
| My Profile | Leave Balance | 개인 휴가 잔액 | My Leave Balance | `TE-502` |
| My Profile | Performance | 개인 성과 확인 | My Performance | `TE-503` |

## IA 검증 기준

- 모든 대분류는 권한별 1차 메뉴와 일치해야 한다.
- 모든 상세분류는 [화면 맵](/C:/Team-jane/FlowHR_V2/docs/foundation/04-screen-map.md)의 화면 ID와 연결되어야 한다.
- 같은 상세분류가 서로 다른 권한 레이어에 중복 배치되면 안 된다.
- 조회 화면과 처리 화면은 같은 소분류에 넣더라도 상세분류에서 분리한다.

## 연결 문서

- 제품 방향: [01-product-direction.md](./01-product-direction.md)
- 정보구조 초안: [02-information-architecture.md](./02-information-architecture.md)
- 화면 맵: [04-screen-map.md](./04-screen-map.md)
