# FlowHR_V2 로컬라이제이션 적용 현황

## 작업 ID

- `WI-DM-010`

## 목적

`LID-*` 적용 상태를 화면 단위로 추적한다.
이 문서는 로컬라이제이션 마이그레이션의 현재 위치와 다음 적용 대상을 명확히 하기 위한 기준 문서다.

## 상태 정의

- `applied`: 해당 페이지의 정적 텍스트가 `LID-*`로 연결됨
- `partial`: 일부 제목, 라벨, 설명만 연결됨
- `planned`: 전략만 정리되었고 실제 마이그레이션은 아직 안 됨

## Platform

| 화면 | 경로 | 상태 | 메모 |
|---|---|---|---|
| `PC-001` / Console | `wireframes/platform/platform-console.html` | `applied` | `ko/en` 전환 검증 완료 |
| `PC-601`~`PC-603` | `wireframes/platform/audit-security-detailed.html` | `applied` | 감사/보안 화면 적용 완료 |
| `PC-201`~`PC-205` | `wireframes/platform/plans-billing-feature-flags.html` | `applied` | 플랜/과금/플래그 화면 적용 완료 |
| `PC-604` | `wireframes/platform/auth-access-control-detailed.html` | `applied` | 인증/세션 화면 적용 완료 |

## Tenant Admin

| 화면 | 경로 | 상태 | 메모 |
|---|---|---|---|
| `TA-001` | `wireframes/tenant-admin/admin-home-detailed.html` | `applied` | 홈 핵심 텍스트 적용 완료 |
| `TA-101`~`TA-105` | `wireframes/tenant-admin/people-module-detailed.html` | `applied` | 목록, 프로필, 연결 액션 문구 전환 완료 |
| `TA-201`~`TA-205` | `wireframes/tenant-admin/attendance-module-detailed.html` | `applied` | 근태 대시보드, 예외 큐, 마감 영역 적용 완료 |
| `TA-301`~`TA-304` | `wireframes/tenant-admin/leave-module-detailed.html` | `applied` | 정책, 큐, 캘린더 문구 전환 완료 |
| `TA-401`~`TA-404` | `wireframes/tenant-admin/workflow-module-detailed.html` | `applied` | 인박스, 문맥, 처리 액션 문구 전환 완료 |
| `TA-501`~`TA-504` | `wireframes/tenant-admin/documents-module-detailed.html` | `applied` | 템플릿, 큐, 보관함 문구 전환 완료 |
| `TA-601`~`TA-604` | `wireframes/tenant-admin/payroll-module-detailed.html` | `applied` | 정산/마감 화면 적용 완료 |
| `TA-701`~`TA-704` | `wireframes/tenant-admin/performance-module-detailed.html` | `applied` | `?lang=ko/en` 검증 완료 |
| `TA-801`~`TA-805` | `wireframes/tenant-admin/recruiting-module-detailed.html` | `applied` | 채용 모듈 적용 완료 |
| `TA-901`~`TA-904` | `wireframes/tenant-admin/reports-insights-detailed.html` | `applied` | 리포트 핵심 텍스트 적용 완료 |
| `TA-1001`~`TA-1005` | `wireframes/tenant-admin/settings-role-permission-detailed.html` | `applied` | 역할 매트릭스, 설정, 감사 이력 문구 전환 완료 |

## Tenant Employee

| 화면 | 경로 | 상태 | 메모 |
|---|---|---|---|
| `TE-001`, `TE-002` | `wireframes/tenant-employee/employee-home-detailed.html` | `applied` | 홈 핵심 텍스트 적용 완료 |
| `TE-102` | `wireframes/tenant-employee/attendance-check-flow.html` | `applied` | 출퇴근 상태, 예외, 액션 문구 전환 완료 |
| `TE-201`~`TE-205` | `wireframes/tenant-employee/request-hub-detailed.html` | `applied` | 요청 유형, 정책 힌트, 이력 상태 전환 완료 |
| `TE-401`, `TE-402` | `wireframes/tenant-employee/signature-inbox-detailed.html` | `applied` | 서명 상태, 기한, 아카이브 문구 전환 완료 |
| `TE-501`~`TE-503` | `wireframes/tenant-employee/profile-performance-detailed.html` | `applied` | `?lang=ko/en` 검증 완료 |

## 우선순위

1. 승인 로그 확대
2. 사용자 decision 반영
3. `approved` 승격 패스 정리

## 완료 기준

- 현재 문서에 등록된 핵심 와이어가 모두 `applied`
- 상태 라벨, 배지, 필터, empty, error 문구까지 `LID-*` 연결
- 시드 리소스와 namespace 구조 연결 완료

## 연결 문서

- 로컬라이제이션 전략: [06-localization-strategy.md](./06-localization-strategy.md)
- 로컬라이제이션 적용 계획: [21-localization-rollout-plan.md](./21-localization-rollout-plan.md)
- 화면 준비도 매트릭스: [14-screen-readiness-matrix.md](./14-screen-readiness-matrix.md)
