# FlowHR_V2 문서 가이드

## 디렉토리 구조

`docs/foundation`
- 제품 방향, IA, PRD, 화면 맵, WI 백로그

`docs/platform`
- `Platform Operator`용 설계 문서

`docs/tenant-admin`
- 고객사 관리자용 설계 문서

`docs/tenant-employee`
- 고객사 직원용 설계 문서

`docs/design-system`
- 공통 UX 원칙, 패턴, 레이아웃 시스템

`docs/references`
- 참고 문서와 외부 가이드 요약

`wireframes/foundation`
- 제품 전체 방향을 설명하는 개요 화면

`wireframes/platform`
- Platform Console 와이어프레임

`wireframes/tenant-admin`
- Tenant Admin 와이어프레임

`wireframes/tenant-employee`
- Tenant Employee 와이어프레임

`wireframes/shared`
- 공통 와이어프레임 스타일

## WI 번호 체계

- `WI-PC-###`: Platform Console
- `WI-TA-###`: Tenant Admin
- `WI-TE-###`: Tenant Employee
- `WI-DS-###`: Design System
- `WI-DM-###`: Domain Model / 공통 업무 규칙

## 권장 진입 순서

1. [단계 게이트](./foundation/00-stage-gates.md)
2. [제품 방향](./foundation/01-product-direction.md)
3. [정보구조](./foundation/02-information-architecture.md)
4. [프로덕션 PRD 초안](./foundation/03-production-prd-draft.md)
5. [화면 맵](./foundation/04-screen-map.md)
6. [WI 백로그](./foundation/05-wi-backlog.md)
7. [로컬라이제이션 전략](./foundation/06-localization-strategy.md)
8. [로컬라이제이션 리소스 구조](./foundation/07-localization-resource-architecture.md)
9. [설계 진행 종합 보고서](./foundation/08-design-progress-report.md)
10. [프론트엔드 라우트/컴포넌트 구조](./foundation/09-frontend-route-component-architecture.md)
11. [데이터 계약/상태관리 설계](./foundation/10-data-contract-state-management.md)
12. [화면별 API 계약 초안](./foundation/11-screen-api-contracts.md)
13. [구현 준비 체크리스트](./foundation/12-implementation-readiness-checklist.md)
14. [컴포넌트 인벤토리](./foundation/13-component-inventory.md)
15. [화면 준비도 매트릭스](./foundation/14-screen-readiness-matrix.md)
16. [구현 전 종합 보고서](./foundation/15-pre-implementation-report.md)
17. [요구사항 추적 문서](./foundation/16-requirement-traceability.md)
18. [IA 계층표](./foundation/17-ia-hierarchy-breakdown.md)
19. [권한별 메뉴/기능/행동 매핑표](./foundation/18-role-menu-function-action-matrix.md)
20. [디자인 토큰](./design-system/WI-DS-007-design-tokens.md)
21. [공통 컴포넌트 규격서](./design-system/WI-DS-008-component-specifications.md)
22. [화면별 상태/예외 매핑표](./design-system/WI-DS-009-screen-state-exception-matrix.md)
23. [승인 로그 체계](./foundation/19-approval-log-framework.md)
24. [모듈별 API 계약 상세](./foundation/20-module-api-contract-breakdown.md)
25. [로컬라이제이션 전체 적용 계획](./foundation/21-localization-rollout-plan.md)
26. [코어 화면 승인 로그 예시 폴더](./foundation/approvals/)

## 운영 원칙

- 문서는 모두 UTF-8로 저장한다.
- 화면 ID와 WI ID는 분리하되, 권한 레이어 접두사는 동일하게 유지한다.
- 새 문서는 반드시 해당 도메인 폴더에 저장한다.
- 와이어프레임은 승인용 산출물이고, 정식 UI 구현 CSS와 동일시하지 않는다.
