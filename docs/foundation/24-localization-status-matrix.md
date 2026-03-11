# FlowHR_V2 로컬라이제이션 적용 현황

## 작업 ID

- `WI-DM-010`

## 목적

`LID-*` 적용 상태를 화면 단위로 추적한다.
이 문서는 로컬라이제이션 마이그레이션의 현재 위치와 다음 적용 대상을 명확히 하기 위한 기준표다.

## 상태 정의

- `applied`: 핵심 가시 텍스트가 `LID-*`로 적용됨
- `partial`: 일부 제목/핵심 문구만 적용됨
- `planned`: 적용 계획만 있고 아직 마이그레이션 전

## Platform

| 화면 | 경로 | 상태 | 메모 |
|---|---|---|---|
| `PC-001` / Console | `wireframes/platform/platform-console.html` | `applied` | `ko/en` 전환 검증 완료 |
| `PC-601`~`PC-603` | `wireframes/platform/audit-security-detailed.html` | `applied` | 보안/감사 화면 적용 완료 |
| `PC-201`~`PC-205` | `wireframes/platform/plans-billing-feature-flags.html` | `applied` | 플래그/과금 화면 적용 완료 |
| `PC-604` | `wireframes/platform/auth-access-control-detailed.html` | `applied` | 세션/재인증 화면 적용 완료 |

## Tenant Admin

| 화면 | 경로 | 상태 | 메모 |
|---|---|---|---|
| `TA-001` | `wireframes/tenant-admin/admin-home-detailed.html` | `applied` | 홈 핵심 문구 적용 |
| `TA-101`~`TA-105` | `wireframes/tenant-admin/people-module-detailed.html` | `planned` | 목록/상세/상태 문구 전환 필요 |
| `TA-201`~`TA-205` | `wireframes/tenant-admin/attendance-module-detailed.html` | `planned` | 테이블 헤더/예외 라벨 전환 필요 |
| `TA-301`~`TA-304` | `wireframes/tenant-admin/leave-module-detailed.html` | `planned` | 휴가 상태/필터/요청 라벨 전환 필요 |
| `TA-401`~`TA-404` | `wireframes/tenant-admin/workflow-module-detailed.html` | `planned` | 인박스/결재 단계 문구 전환 필요 |
| `TA-501`~`TA-504` | `wireframes/tenant-admin/documents-module-detailed.html` | `planned` | 문서 발송/상태 배지 전환 필요 |
| `TA-601`~`TA-604` | `wireframes/tenant-admin/payroll-module-detailed.html` | `applied` | 핵심 문구 적용 완료 |
| `TA-701`~`TA-704` | `wireframes/tenant-admin/performance-module-detailed.html` | `applied` | `?lang=ko/en` 검증 완료 |
| `TA-801`~`TA-805` | `wireframes/tenant-admin/recruiting-module-detailed.html` | `applied` | 핵심 흐름 적용 완료 |
| `TA-901`~`TA-904` | `wireframes/tenant-admin/reports-insights-detailed.html` | `applied` | 주요 제목/패널 적용 완료 |
| `TA-1001`~`TA-1005` | `wireframes/tenant-admin/settings-role-permission-detailed.html` | `planned` | 권한 라벨/정책 문구 전환 필요 |

## Tenant Employee

| 화면 | 경로 | 상태 | 메모 |
|---|---|---|---|
| `TE-001`, `TE-002` | `wireframes/tenant-employee/employee-home-detailed.html` | `applied` | 홈 핵심 문구 적용 완료 |
| `TE-102` | `wireframes/tenant-employee/attendance-check-flow.html` | `planned` | 출퇴근 상태/에러 문구 전환 필요 |
| `TE-201`~`TE-205` | `wireframes/tenant-employee/request-hub-detailed.html` | `planned` | 요청 유형/상태/필터 라벨 전환 필요 |
| `TE-401`, `TE-402` | `wireframes/tenant-employee/signature-inbox-detailed.html` | `planned` | 서명 상태/기한 문구 전환 필요 |
| `TE-501`~`TE-503` | `wireframes/tenant-employee/profile-performance-detailed.html` | `applied` | `?lang=ko/en` 검증 완료 |

## 우선순위

1. `TA-101`~`TA-504`
2. `TE-102`~`TE-402`
3. `TA-1001`~`TA-1005`

## 완료 기준

- 코어 화면은 모두 `applied`
- 상태 라벨/배지/필터/empty/error 문구까지 `LID-*` 적용
- 시드 리소스와 namespace 연결 완료

## 연결 문서

- 로컬라이제이션 전략: [06-localization-strategy.md](./06-localization-strategy.md)
- 로컬라이제이션 적용 계획: [21-localization-rollout-plan.md](./21-localization-rollout-plan.md)
- 화면 준비도 매트릭스: [14-screen-readiness-matrix.md](./14-screen-readiness-matrix.md)
