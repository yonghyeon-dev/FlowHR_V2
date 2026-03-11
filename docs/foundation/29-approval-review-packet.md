# FlowHR_V2 화면 승인 리뷰 패킷

## 목적

사용자가 화면 승인을 빠르게 내릴 수 있도록,
현재 `hold` 상태인 승인 대상을 한 장에서 검토할 수 있게 정리한 패킷이다.

## 사용 방법

각 화면은 아래 셋 중 하나로 판정한다.

- `approved`
- `changes_requested`
- `hold`

결정 기준:
- [19-approval-log-framework.md](./19-approval-log-framework.md)
- [22-final-approval-pass-criteria.md](./22-final-approval-pass-criteria.md)

## 1차 구현 진입 후보 세트

이 세트는 먼저 `approved` 여부를 결정하면 바로 `R5` 승격 검토에 쓸 수 있다.

| 화면 ID | 화면명 | 와이어 | 승인 로그 | 현재 상태 |
|---|---|---|---|---|
| `PC-001` | Platform Console | [platform-console.html](/C:/Team-jane/FlowHR_V2/wireframes/platform/platform-console.html) | [APP-SCREEN-PC-001-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-PC-001-001.md) | `hold` |
| `TA-001` | Admin Home Dashboard | [admin-home-detailed.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/admin-home-detailed.html) | [APP-SCREEN-TA-001-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-001-001.md) | `hold` |
| `TA-201` | Attendance Dashboard | [attendance-module-detailed.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/attendance-module-detailed.html) | [APP-SCREEN-TA-201-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-201-001.md) | `hold` |
| `TE-001` | Employee Home | [employee-home-detailed.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-employee/employee-home-detailed.html) | [APP-SCREEN-TE-001-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TE-001-001.md) | `hold` |
| `TE-002` | Employee Mobile Home | [employee-home-detailed.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-employee/employee-home-detailed.html) | [APP-SCREEN-TE-002-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TE-002-001.md) | `hold` |
| `TE-201` | Request Hub | [request-hub-detailed.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-employee/request-hub-detailed.html) | [APP-SCREEN-TE-201-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TE-201-001.md) | `hold` |

## 2차 확장 승인 세트

이 세트는 핵심 구조 승인 후 바로 이어서 볼 수 있는 운영형 화면들이다.

| 화면 ID | 화면명 | 와이어 | 승인 로그 | 현재 상태 |
|---|---|---|---|---|
| `TA-101` | Employee Directory | [people-module-detailed.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/people-module-detailed.html) | [APP-SCREEN-TA-101-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-101-001.md) | `hold` |
| `TA-301` | Leave Dashboard | [leave-module-detailed.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/leave-module-detailed.html) | [APP-SCREEN-TA-301-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-301-001.md) | `hold` |
| `TA-401` | Approval Inbox | [workflow-module-detailed.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/workflow-module-detailed.html) | [APP-SCREEN-TA-401-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-401-001.md) | `hold` |
| `TA-501` | Documents Dashboard | [documents-module-detailed.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/documents-module-detailed.html) | [APP-SCREEN-TA-501-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-501-001.md) | `hold` |
| `TA-601` | Payroll Dashboard | [payroll-module-detailed.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/payroll-module-detailed.html) | [APP-SCREEN-TA-601-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-601-001.md) | `hold` |
| `TA-701` | Performance Overview | [performance-module-detailed.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/performance-module-detailed.html) | [APP-SCREEN-TA-701-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-701-001.md) | `hold` |
| `TA-1001` | Role Matrix | [settings-role-permission-detailed.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/settings-role-permission-detailed.html) | [APP-SCREEN-TA-1001-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-1001-001.md) | `hold` |
| `TE-102` | Attendance Check Flow | [attendance-check-flow.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-employee/attendance-check-flow.html) | [APP-SCREEN-TE-102-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TE-102-001.md) | `hold` |
| `TE-401` | Signature Inbox | [signature-inbox-detailed.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-employee/signature-inbox-detailed.html) | [APP-SCREEN-TE-401-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TE-401-001.md) | `hold` |

## 결정 후 반영 규칙

### `approved`

- 해당 `APP-SCREEN-*`의 `decision`을 `approved`로 변경
- [14-screen-readiness-matrix.md](./14-screen-readiness-matrix.md)에서 대상 화면을 `R5`로 승격 검토
- [25-r5-readiness-review.md](./25-r5-readiness-review.md) 갱신

### `changes_requested`

- 해당 `APP-SCREEN-*`의 `decision`을 `changes_requested`로 변경
- 수정 사유와 follow-up 기록
- 관련 WI는 `in_progress` 유지

### `hold`

- 현재 상태 유지
- 다음 리뷰 세션으로 이월

## 현재 리뷰 목표

1. 1차 구현 진입 후보 세트 6화면 결정
2. 이후 2차 확장 승인 세트 결정
3. `approved`가 나온 화면부터 `R5` 승격

## 연결 문서

- [25-r5-readiness-review.md](./25-r5-readiness-review.md)
- [28-design-status-checklist.md](./28-design-status-checklist.md)
- [approvals/README.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/README.md)
