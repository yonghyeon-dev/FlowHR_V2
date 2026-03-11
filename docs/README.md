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
27. [최종 승인 패스 기준](./foundation/22-final-approval-pass-criteria.md)
28. [구현 스프린트 분해](./foundation/23-implementation-sprint-breakdown.md)
29. [로컬라이제이션 적용 현황](./foundation/24-localization-status-matrix.md)
30. [R5 대상 화면 재판정](./foundation/25-r5-readiness-review.md)
31. [Stage 7 진입 게이트 재검토](./foundation/26-stage7-gate-review.md)
32. [구현 착수용 기술 선택안](./foundation/27-implementation-technology-decisions.md)
33. [설계 상태 체크리스트](./foundation/28-design-status-checklist.md)
34. [화면 승인 리뷰 패킷](./foundation/29-approval-review-packet.md)
35. [목표 수렴 탐색 프레임](./foundation/30-goal-convergence-exploration.md)
36. [업종 세분화 초안](./foundation/31-industry-segmentation.md)
37. [업종 팩 및 기능 선택 구조](./foundation/32-industry-pack-feature-selection.md)
38. [역할별 의사결정 시나리오 맵](./foundation/33-role-decision-scenario-map.md)
39. [승인 리셋 계획](./foundation/34-approval-reset-plan.md)
40. [Tenant Admin 홈 상세 설계](./tenant-admin/WI-TA-001-admin-home-dashboard.md)
41. [Tenant Employee 홈 상세 설계](./tenant-employee/WI-TE-001-employee-home.md)
42. [Tenant Admin 근태 상세 설계](./tenant-admin/WI-TA-003-attendance-module.md)
43. [Tenant Employee 요청 허브 상세 설계](./tenant-employee/WI-TE-003-request-hub.md)
44. [Pack 기반 리뷰 순서](./foundation/35-pack-review-sequence.md)
45. [Pack 승인 체크리스트](./foundation/36-pack-approval-checklists.md)

## 운영 원칙

- 문서는 모두 UTF-8로 저장한다.
- 화면 ID와 WI ID는 분리하되, 권한 레이어 접두사는 동일하게 유지한다.
- 새 문서는 반드시 해당 도메인 폴더에 저장한다.
- 와이어프레임은 승인용 산출물이고, 정식 UI 구현 CSS와 동일시하지 않는다.
