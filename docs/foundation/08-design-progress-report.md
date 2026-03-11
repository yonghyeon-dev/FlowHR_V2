# FlowHR_V2 설계 진행 종합 보고서

## 상태 요약

현재 FlowHR_V2는 `구현 시작 가능한 설계 패키지에 근접한 상태`까지 정리되었다.
핵심 권한 레이어, 화면 체계, 주요 모듈 와이어, 공통 도메인 규칙,
플랫폼 운영 설계, 디자인 시스템 방향, 로컬라이제이션 전략이 모두 문서화된 상태다.

## 완료된 설계 범위

### 1. 제품 방향과 정보구조

- 제품 방향
- 권한 모델
- 프로덕션 PRD 초안
- 화면 맵
- WI 백로그

관련 문서:

- [01-product-direction.md](./01-product-direction.md)
- [02-information-architecture.md](./02-information-architecture.md)
- [03-production-prd-draft.md](./03-production-prd-draft.md)
- [04-screen-map.md](./04-screen-map.md)
- [05-wi-backlog.md](./05-wi-backlog.md)

### 2. 권한 레이어 설계

- Platform Operator
- Tenant Admin
- Tenant Employee

Platform 기반 문서:

- [WI-PC-001-multitenancy-tenant-boundaries.md](../platform/WI-PC-001-multitenancy-tenant-boundaries.md)
- [WI-PC-002-role-layer-access-model.md](../platform/WI-PC-002-role-layer-access-model.md)
- [WI-PC-003-authentication-access-control.md](../platform/WI-PC-003-authentication-access-control.md)
- [WI-PC-004-platform-console.md](../platform/WI-PC-004-platform-console.md)
- [WI-PC-005-audit-security-ux.md](../platform/WI-PC-005-audit-security-ux.md)
- [WI-PC-006-plans-billing-feature-flags.md](../platform/WI-PC-006-plans-billing-feature-flags.md)

### 3. Tenant Admin / Tenant Employee 모듈 설계

관리자 모듈:

- Home
- People
- Attendance
- Leave
- Workflow
- Documents
- Settings / Role & Permission
- Performance
- Recruiting / Onboarding / Offboarding
- Payroll
- Reports

직원 모듈:

- Home
- Attendance Check Flow
- Request Hub
- Signature Inbox
- Profile / Performance

### 4. 공통 도메인 규칙

- 근태 예외
- 휴가 정책
- 결재 문서 규칙
- 급여 마감 규칙

### 5. 디자인 시스템과 공통 UX

- 시각 방향
- UI 패턴
- 관리자 레이아웃
- 직원 모바일 레이아웃
- 상태 색상 체계
- 공통 상태/예외 UX

관련 문서:

- [WI-DS-001-design-system-direction.md](../design-system/WI-DS-001-design-system-direction.md)
- [WI-DS-002-ui-patterns.md](../design-system/WI-DS-002-ui-patterns.md)
- [WI-DS-003-admin-layout-system.md](../design-system/WI-DS-003-admin-layout-system.md)
- [WI-DS-004-employee-mobile-layout-system.md](../design-system/WI-DS-004-employee-mobile-layout-system.md)
- [WI-DS-005-status-color-visual-language.md](../design-system/WI-DS-005-status-color-visual-language.md)
- [WI-DS-006-common-state-patterns.md](../design-system/WI-DS-006-common-state-patterns.md)

### 6. 로컬라이제이션

- 번역 전략
- `LID-*` 키 규칙
- 공유 i18n 스크립트
- 구현용 리소스 구조

관련 문서:

- [06-localization-strategy.md](./06-localization-strategy.md)
- [07-localization-resource-architecture.md](./07-localization-resource-architecture.md)

### 7. 구현 연결 설계

- 프론트엔드 라우트 구조
- 컴포넌트 / feature 경계
- 서버 상태 / UI 상태 / mutation 상태 분리
- 공통 데이터 계약 단위
- 화면별 API 계약 초안
- 모듈별 API 계약 상세
- 구현 준비 체크리스트
- 컴포넌트 인벤토리
- 화면 준비도 매트릭스
- 구현용 i18n 시드 카탈로그

관련 문서:

- [09-frontend-route-component-architecture.md](./09-frontend-route-component-architecture.md)
- [10-data-contract-state-management.md](./10-data-contract-state-management.md)
- [11-screen-api-contracts.md](./11-screen-api-contracts.md)
- [20-module-api-contract-breakdown.md](./20-module-api-contract-breakdown.md)
- [12-implementation-readiness-checklist.md](./12-implementation-readiness-checklist.md)
- [13-component-inventory.md](./13-component-inventory.md)
- [14-screen-readiness-matrix.md](./14-screen-readiness-matrix.md)
- [15-pre-implementation-report.md](./15-pre-implementation-report.md)

## 구현 전 기준에서 충족된 항목

- 권한 레이어가 분리되어 있다
- 각 권한 레이어별 핵심 화면이 정의되어 있다
- 주요 운영 화면은 와이어프레임으로 승인 가능한 수준이다
- 공통 도메인 규칙이 문서화되어 있다
- 다국어 키 전략이 정의되어 있다
- 구현용 locale 파일 구조와 시드 카탈로그가 생성되어 있다
- 플랫폼 운영 화면이 고객사 화면과 분리되어 있다

## 다음 상세 설계 작업

이 항목들은 설계를 더 세밀하게 이어가는 다음 단계다.

- 최종 승인용 화면 리뷰 패스
- 실제 앱 라우트와 상태관리 선택안 확정

## 구현 권장 순서

1. 공통 프론트엔드 셸과 i18n 인프라
2. Tenant Employee 핵심 플로우
3. Tenant Admin 코어 모듈
4. Platform Console
5. 확장 모듈과 리포트

## 현재 판단

FlowHR_V2는 현재 설계가 충분히 깊게 진행된 상태이며 계속 확장 중이다.
앞에서 진행해 온 방향을 유지한다면, 다음 설계 패스는
`화면별 API 계약 세분화`, `Platform LID 마감`, `최종 승인 리뷰` 쪽으로 이어지는 것이 맞다.
