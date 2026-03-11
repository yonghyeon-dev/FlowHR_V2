# FlowHR_V2 화면 승인 리뷰 패킷

## 목적

사용자와 함께 `무엇을 먼저 승인할지` 빠르게 검토하기 위한 패킷이다.
이제 승인 기준은 범용 화면이 아니라 `Pack 기반 흐름`이다.

## 핵심 원칙

- `Office Pack`, `Retail Pack`, `Platform`을 따로 본다.
- 번들 승인 없이 개별 화면 승인만 먼저 확정하지 않는다.
- `approved`는 사용자 확인 이후에만 반영한다.
- 설계자가 스스로 판단해 올리는 상태는 기본적으로 `hold`다.

## 검토 순서

1. `Office Pack` 전체 흐름
2. `Retail Pack` 전체 흐름
3. `Platform Risk-first Console`

상세 순서는 [35-pack-review-sequence.md](./35-pack-review-sequence.md)를 따른다.

## 1차 승인 대상: Bundle Review

| 번들 ID | 이름 | 승인 로그 | 현재 상태 |
|---|---|---|---|
| `BUNDLE-OFFICE-CORE` | Office Pack Core Review Set | [APP-BUNDLE-OFFICE-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-BUNDLE-OFFICE-001.md) | `hold` |
| `BUNDLE-RETAIL-CORE` | Retail Pack Core Review Set | [APP-BUNDLE-RETAIL-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-BUNDLE-RETAIL-001.md) | `hold` |
| `BUNDLE-PLATFORM-RISK-FIRST` | Platform Risk-first Console Review Set | [APP-BUNDLE-PLATFORM-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-BUNDLE-PLATFORM-001.md) | `approved` |

## Office Pack 리뷰 세트

| 화면 ID | 변형 | 와이어 | 화면 승인 로그 |
|---|---|---|---|
| `TA-001` | Office Home | [admin-home-office.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/admin-home-office.html) | [APP-SCREEN-TA-001-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-001-001.md) |
| `TA-201` | Office Attendance | [attendance-office.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/attendance-office.html) | [APP-SCREEN-TA-201-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-201-001.md) |
| `TA-401` | Office Workflow | [workflow-office.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/workflow-office.html) | [APP-SCREEN-TA-401-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-401-001.md) |
| `TA-501` | Office Documents | [documents-office.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/documents-office.html) | [APP-SCREEN-TA-501-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-501-001.md) |
| `TA-301` | Office Leave | [leave-office.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/leave-office.html) | [APP-SCREEN-TA-301-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-301-001.md) |
| `TE-001/002` | Office Employee Home | [employee-home-office.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-employee/employee-home-office.html) | [APP-SCREEN-TE-001-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TE-001-001.md), [APP-SCREEN-TE-002-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TE-002-001.md) |
| `TE-201` | Office Request Hub | [request-hub-office.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-employee/request-hub-office.html) | [APP-SCREEN-TE-201-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TE-201-001.md) |
| `TE-401` | Office Signature Inbox | [signature-inbox-office.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-employee/signature-inbox-office.html) | [APP-SCREEN-TE-401-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TE-401-001.md) |

## Retail Pack 리뷰 세트

| 화면 ID | 변형 | 와이어 | 화면 승인 로그 |
|---|---|---|---|
| `TA-001` | Retail Home | [admin-home-retail.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/admin-home-retail.html) | [APP-SCREEN-TA-001-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-001-001.md) |
| `TA-201` | Retail Attendance | [attendance-retail.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/attendance-retail.html) | [APP-SCREEN-TA-201-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-201-001.md) |
| `TA-401` | Retail Workflow | [workflow-retail.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/workflow-retail.html) | [APP-SCREEN-TA-401-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-401-001.md) |
| `TA-501` | Retail Documents | [documents-retail.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/documents-retail.html) | [APP-SCREEN-TA-501-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-501-001.md) |
| `TA-301` | Retail Leave | [leave-retail.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-admin/leave-retail.html) | [APP-SCREEN-TA-301-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-301-001.md) |
| `TE-001/002` | Retail Employee Home | [employee-home-retail.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-employee/employee-home-retail.html) | [APP-SCREEN-TE-001-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TE-001-001.md), [APP-SCREEN-TE-002-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TE-002-001.md) |
| `TE-201` | Retail Request Hub | [request-hub-retail.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-employee/request-hub-retail.html) | [APP-SCREEN-TE-201-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TE-201-001.md) |
| `TE-401` | Retail Signature Inbox | [signature-inbox-retail.html](/C:/Team-jane/FlowHR_V2/wireframes/tenant-employee/signature-inbox-retail.html) | [APP-SCREEN-TE-401-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TE-401-001.md) |

## Platform 리뷰 세트

| 화면 ID | 변형 | 와이어 | 화면 승인 로그 |
|---|---|---|---|
| `PC-001` | Risk-first Console | [platform-console.html](/C:/Team-jane/FlowHR_V2/wireframes/platform/platform-console.html) | [APP-SCREEN-PC-001-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-PC-001-001.md) |

## 검토 질문

### Office Pack

- 승인, 문서, 휴가, 요청이 하나의 운영 흐름으로 읽히는가
- 오피스형 조직에서 관리자가 실제로 먼저 보고 싶은 큐가 맞는가
- 직원 입장에서 요청, 서명, 일정 확인이 자연스럽게 이어지는가

### Retail Pack

- 결원, 커버리지, 브레이크, 정산 전 예외가 바로 판단 가능한가
- 매장 운영자가 당장 조치해야 할 항목이 첫 화면에 올라오는가
- 직원이 오늘 근무, 체크인, 시프트 변경 응답을 빠르게 처리할 수 있는가

### Platform

- 지표가 모두 의미를 갖고 있는가
- 각 운영 신호가 액션과 연결되는가
- 장식 요소 없이 운영 리스크가 우선순위대로 읽히는가

## 승인 반영 규칙

### `approved`

- 먼저 `APP-BUNDLE-*`를 `approved`로 갱신한다
- 그 다음 귀속된 `APP-SCREEN-*`의 `decision` 갱신 검토
- 필요하면 [14-screen-readiness-matrix.md](./14-screen-readiness-matrix.md)에서 대상 화면을 `R5` 후보로 승격 검토

### `changes_requested`

- 번들 또는 화면 로그의 `decision`을 `changes_requested`로 갱신
- 수정 사유와 follow-up을 남긴다
- 관련 WI는 `in_progress` 유지

### `hold`

- 현재 상태 유지
- 다음 검토 라운드로 이월

## 연결 문서

- [19-approval-log-framework.md](./19-approval-log-framework.md)
- [22-final-approval-pass-criteria.md](./22-final-approval-pass-criteria.md)
- [34-approval-reset-plan.md](./34-approval-reset-plan.md)
- [35-pack-review-sequence.md](./35-pack-review-sequence.md)
