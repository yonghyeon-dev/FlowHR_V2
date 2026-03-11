# FlowHR_V2 화면 준비도 매트릭스

## 목적

화면별로 `와이어`, `WI`, `API`, `i18n`, `승인 상태`를 한 번에 확인하기 위한 매트릭스다.
업종 팩이 필요한 화면은 `기본 화면 ID`와 `Pack 변형`을 함께 기록한다.

## 준비도 기준

- `R1`: 화면 목적과 권한만 정의
- `R2`: 와이어와 WI 문서 존재
- `R3`: API 계약과 상태 기준 연결
- `R4`: i18n 구조와 구현 연결 조건 정리
- `R5 candidate`: 승인 로그는 있으나 `approved` 전
- `R5`: 필요한 승인 로그가 `approved`

## Bundle 준비도

| 번들 ID | 화면 범위 | 승인 로그 | 상태 |
|---|---|---|---|
| `BUNDLE-OFFICE-CORE` | `TA-001`, `TA-201`, `TA-301`, `TA-401`, `TA-501`, `TE-001/002`, `TE-201`, `TE-401` | `APP-BUNDLE-OFFICE-001` | `R5 candidate` |
| `BUNDLE-RETAIL-CORE` | `TA-001`, `TA-201`, `TA-301`, `TA-401`, `TA-501`, `TE-001/002`, `TE-201`, `TE-401` | `APP-BUNDLE-RETAIL-001` | `R5 candidate` |
| `BUNDLE-PLATFORM-RISK-FIRST` | `PC-001` | `APP-BUNDLE-PLATFORM-001` | `R5 candidate` |

## Platform

| 화면 ID | Pack 변형 | WI | 와이어 | API | i18n | 승인 로그 | 준비도 |
|---|---|---|---|---|---|---|---|
| `PC-001` | `risk_first_console` | `WI-PC-004` | 있음 | 요약/상세 | 적용 | `hold` | `R5 candidate` |
| `PC-103` | `shared` | `WI-PC-001`, `WI-PC-004` | 있음 | 목록/상세 | 적용 | 없음 | `R4` |
| `PC-201`~`PC-205` | `shared` | `WI-PC-006` | 있음 | 요약/액션 | 적용 | 없음 | `R4` |
| `PC-601`~`PC-603` | `shared` | `WI-PC-005` | 있음 | 목록/상세 | 적용 | 없음 | `R4` |
| `PC-604` | `shared` | `WI-PC-003` | 있음 | 요약/액션 | 적용 | 없음 | `R4` |

## Tenant Admin

| 화면 ID | Pack 변형 | WI | 와이어 | API | i18n | 승인 로그 | 준비도 |
|---|---|---|---|---|---|---|---|
| `TA-001` | `office_home`, `retail_home` | `WI-TA-001` | 있음 | 요약/큐 | 적용 | `hold` | `R5 candidate` |
| `TA-101` | `shared` | `WI-TA-002` | 있음 | 목록/상세 | 적용 | `hold` | `R5 candidate` |
| `TA-102`~`TA-105` | `shared` | `WI-TA-002` | 있음 | 목록/상세 | 적용 | 없음 | `R4` |
| `TA-201` | `office_attendance`, `retail_attendance` | `WI-TA-003` | 있음 | 요약/예외/액션 | 적용 | `hold` | `R5 candidate` |
| `TA-202`~`TA-205` | `shared` | `WI-TA-003` | 있음 | 요약/예외/액션 | 적용 | 없음 | `R4` |
| `TA-301` | `office_leave`, `retail_leave` | `WI-TA-004` | 있음 | 목록/액션 | 적용 | `hold` | `R5 candidate` |
| `TA-302`~`TA-304` | `shared` | `WI-TA-004` | 있음 | 목록/액션 | 적용 | 없음 | `R4` |
| `TA-401` | `office_workflow`, `retail_workflow` | `WI-TA-005` | 있음 | 목록/상세/액션 | 적용 | `hold` | `R5 candidate` |
| `TA-402`~`TA-404` | `shared` | `WI-TA-005` | 있음 | 목록/상세/액션 | 적용 | 없음 | `R4` |
| `TA-501` | `office_documents`, `retail_documents` | `WI-TA-006` | 있음 | 목록/액션 | 적용 | `hold` | `R5 candidate` |
| `TA-502`~`TA-504` | `shared` | `WI-TA-006` | 있음 | 목록/액션 | 적용 | 없음 | `R4` |
| `TA-601` | `shared` | `WI-TA-010` | 있음 | 요약/실행 | 적용 | `hold` | `R5 candidate` |
| `TA-602`~`TA-604` | `shared` | `WI-TA-010` | 있음 | 요약/실행 | 적용 | 없음 | `R4` |
| `TA-701` | `shared` | `WI-TA-008` | 있음 | 요약/상세 | 적용 | `hold` | `R5 candidate` |
| `TA-702`~`TA-704` | `shared` | `WI-TA-008` | 있음 | 요약/상세 | 적용 | 없음 | `R4` |
| `TA-801`~`TA-805` | `shared` | `WI-TA-009` | 있음 | 목록/상세 | 적용 | 없음 | `R4` |
| `TA-901`~`TA-904` | `shared` | `WI-TA-011` | 있음 | 요약/탐색 | 적용 | 없음 | `R4` |
| `TA-1001` | `shared` | `WI-TA-007` | 있음 | 상세/액션 | 적용 | `hold` | `R5 candidate` |
| `TA-1002`~`TA-1005` | `shared` | `WI-TA-007` | 있음 | 상세/액션 | 적용 | 없음 | `R4` |

## Tenant Employee

| 화면 ID | Pack 변형 | WI | 와이어 | API | i18n | 승인 로그 | 준비도 |
|---|---|---|---|---|---|---|---|
| `TE-001` | `office_employee_home`, `retail_employee_home` | `WI-TE-001` | 있음 | 요약/액션 | 적용 | `hold` | `R5 candidate` |
| `TE-002` | `office_employee_home`, `retail_employee_home` | `WI-TE-001` | 있음 | 요약/액션 | 적용 | `hold` | `R5 candidate` |
| `TE-102` | `shared` | `WI-TE-002` | 있음 | 액션형 | 적용 | `hold` | `R5 candidate` |
| `TE-201` | `office_request_hub`, `retail_request_hub` | `WI-TE-003` | 있음 | 목록/요청 | 적용 | `hold` | `R5 candidate` |
| `TE-202`~`TE-205` | `shared` | `WI-TE-003` | 있음 | 목록/요청 | 적용 | 없음 | `R4` |
| `TE-401` | `office_signature_inbox`, `retail_signature_inbox` | `WI-TE-004` | 있음 | 목록/상세/실행 | 적용 | `hold` | `R5 candidate` |
| `TE-402` | `shared` | `WI-TE-004` | 있음 | 목록/상세/실행 | 적용 | 없음 | `R4` |
| `TE-501`~`TE-503` | `shared` | `WI-TE-005` | 있음 | 요약/상세 | 적용 | 없음 | `R4` |

## 해석 규칙

- `hold` 상태의 코어 화면은 `R5 candidate`다.
- `approved`로 갱신되기 전에는 `R5`로 올리지 않는다.
- Pack 변형이 필요한 화면은 변형이 분리되지 않으면 `R4` 이상으로 보지 않는다.

## 연결 문서

- [04-screen-map.md](./04-screen-map.md)
- [11-screen-api-contracts.md](./11-screen-api-contracts.md)
- [19-approval-log-framework.md](./19-approval-log-framework.md)
- [29-approval-review-packet.md](./29-approval-review-packet.md)
