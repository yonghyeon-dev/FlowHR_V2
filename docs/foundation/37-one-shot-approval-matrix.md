# FlowHR_V2 일괄 승인 매트릭스

## 목적

남은 승인 대상을 한 번에 확인하고, 승인 시 어떤 구현 단위가 즉시 열리는지 보기 위한 매트릭스다.

## 승인 원칙

- `Platform`은 이미 승인 반영 완료
- 남은 핵심은 `Office Pack`, `Retail Pack`
- 번들 승인이 완료되면 귀속된 코어 화면 구현을 바로 시작할 수 있다

## 현재 승인 상태

| 대상 | 승인 로그 | 현재 상태 | 승인 시 열리는 구현 범위 |
|---|---|---|---|
| `BUNDLE-OFFICE-CORE` | [APP-BUNDLE-OFFICE-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-BUNDLE-OFFICE-001.md) | `hold` | `Sprint 1` 전체 |
| `BUNDLE-RETAIL-CORE` | [APP-BUNDLE-RETAIL-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-BUNDLE-RETAIL-001.md) | `hold` | `Sprint 2` 전체 |
| `BUNDLE-PLATFORM-RISK-FIRST` | [APP-BUNDLE-PLATFORM-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-BUNDLE-PLATFORM-001.md) | `approved` | `Sprint 4`의 `PC-001` |

## Office Pack 일괄 승인 대상

| 화면 ID | 와이어 | 화면 승인 로그 | 현재 상태 |
|---|---|---|---|
| `TA-001` | [admin-home-office.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/admin-home-office.html) | [APP-SCREEN-TA-001-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-001-001.md) | `approved` |
| `TA-201` | [attendance-office.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/attendance-office.html) | [APP-SCREEN-TA-201-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-201-001.md) | `hold` |
| `TA-301` | [leave-office.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/leave-office.html) | [APP-SCREEN-TA-301-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-301-001.md) | `hold` |
| `TA-401` | [workflow-office.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/workflow-office.html) | [APP-SCREEN-TA-401-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-401-001.md) | `hold` |
| `TA-501` | [documents-office.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/documents-office.html) | [APP-SCREEN-TA-501-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-501-001.md) | `hold` |
| `TE-001/002` | [employee-home-office.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-employee/employee-home-office.html) | [APP-SCREEN-TE-001-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TE-001-001.md), [APP-SCREEN-TE-002-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TE-002-001.md) | `hold` |
| `TE-201` | [request-hub-office.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-employee/request-hub-office.html) | [APP-SCREEN-TE-201-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TE-201-001.md) | `hold` |
| `TE-401` | [signature-inbox-office.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-employee/signature-inbox-office.html) | [APP-SCREEN-TE-401-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TE-401-001.md) | `hold` |

## Retail Pack 일괄 승인 대상

| 화면 ID | 와이어 | 화면 승인 로그 | 현재 상태 |
|---|---|---|---|
| `TA-001` | [admin-home-retail.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/admin-home-retail.html) | [APP-SCREEN-TA-001-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-001-001.md) | `approved` |
| `TA-201` | [attendance-retail.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/attendance-retail.html) | [APP-SCREEN-TA-201-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-201-001.md) | `hold` |
| `TA-301` | [leave-retail.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/leave-retail.html) | [APP-SCREEN-TA-301-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-301-001.md) | `hold` |
| `TA-401` | [workflow-retail.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/workflow-retail.html) | [APP-SCREEN-TA-401-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-401-001.md) | `hold` |
| `TA-501` | [documents-retail.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/documents-retail.html) | [APP-SCREEN-TA-501-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-501-001.md) | `hold` |
| `TE-001/002` | [employee-home-retail.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-employee/employee-home-retail.html) | [APP-SCREEN-TE-001-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TE-001-001.md), [APP-SCREEN-TE-002-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TE-002-001.md) | `hold` |
| `TE-201` | [request-hub-retail.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-employee/request-hub-retail.html) | [APP-SCREEN-TE-201-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TE-201-001.md) | `hold` |
| `TE-401` | [signature-inbox-retail.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-employee/signature-inbox-retail.html) | [APP-SCREEN-TE-401-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TE-401-001.md) | `hold` |

## 승인 후 즉시 실행 규칙

- `Office Pack approved` -> `Sprint 1` 구현 시작
- `Retail Pack approved` -> `Sprint 2` 구현 시작
- `Platform approved` -> `PC-001` 구현 시작 가능

## 연결 문서

- [29-approval-review-packet.md](./29-approval-review-packet.md)
- [23-implementation-sprint-breakdown.md](./23-implementation-sprint-breakdown.md)
