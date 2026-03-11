# FlowHR_V2 요구사항 추적 문서

## 목적

지금까지의 사용자 지시를 `실행 가능한 요구사항`으로 정규화해서,
무엇이 충족됐고 무엇이 남았는지 추적하기 위한 기준 문서다.

## 운영 원칙

- 형식: `사용자 지시 -> 합의된 해석 -> 상태 -> 근거 파일 -> 미충족 메모`
- 상태는 `완료`, `진행 중`, `미충족`, `대체·보류`만 사용한다
- 상태 판정은 [00-stage-gates.md](./00-stage-gates.md)와 같이 본다

## 상태 요약

- 완료: `15`
- 진행 중: `9`
- 미충족: `0`
- 대체·보류: `1`

## 요구사항 목록

| ID | 사용자 지시 요약 | 합의된 해석 | 상태 | 근거 파일 | 미충족 메모 |
|---|---|---|---|---|---|
| `REQ-001` | 한글로 안내 | 이후 모든 진행과 보고를 한국어로 수행 | 완료 | [docs/README.md](/C:/Team-jane/FlowHR_V2/docs/README.md) | 현재 유지 중 |
| `REQ-002` | Prompt guidance 기반 지침 작성 | 프롬프트 지침 문서 생성 | 완료 | [prompt-guidelines.md](/C:/Team-jane/FlowHR_V2/docs/references/prompt-guidelines.md) | 메인 트랙은 아님 |
| `REQ-003` | HR SaaS를 UI/UX 중심으로 설계, Shiftee/Flex 목표 | 벤치마크 기반 제품 방향과 화면 설계 진행 | 진행 중 | [01-product-direction.md](/C:/Team-jane/FlowHR_V2/docs/foundation/01-product-direction.md) | 경쟁 제품 대비 UX 비교는 계속 보강 가능 |
| `REQ-004` | MVP가 아니라 프로덕션 기준으로 상세 설계 | 권한, 운영, 관리자, 직원, 확장 모듈까지 포함 | 진행 중 | [03-production-prd-draft.md](/C:/Team-jane/FlowHR_V2/docs/foundation/03-production-prd-draft.md) | 구현 직전 상태는 아직 아님 |
| `REQ-005` | 와이어 확인 후 대분류/중분류/소분류/상세분류와 WI 진행 | 와이어 중심 설계 후 IA와 WI로 분해 | 진행 중 | [17-ia-hierarchy-breakdown.md](/C:/Team-jane/FlowHR_V2/docs/foundation/17-ia-hierarchy-breakdown.md), [05-wi-backlog.md](/C:/Team-jane/FlowHR_V2/docs/foundation/05-wi-backlog.md) | 사용자 승인 반영은 계속 필요 |
| `REQ-006` | 권한은 SaaS 운영 / 업체 관리자 / 업체 직원으로 분리 | Platform Operator / Tenant Admin / Tenant Employee 3축 구조 | 완료 | [02-information-architecture.md](/C:/Team-jane/FlowHR_V2/docs/foundation/02-information-architecture.md), [04-screen-map.md](/C:/Team-jane/FlowHR_V2/docs/foundation/04-screen-map.md) | 하위 role은 tenant 내부 role로 유지 |
| `REQ-007` | 필요한 MCP나 스킬부터 점검/설치 | Playwright 계열 준비와 브라우저 검증 환경 반영 | 완료 | [package.json](/C:/Team-jane/FlowHR_V2/package.json) | 현재 충족 |
| `REQ-008` | Playwright는 `playwright-interactive` 중심 사용 | 브라우저 검증 루프를 해당 스킬 흐름에 맞춰 수행 | 완료 | [playwright-interactive SKILL](/C:/Users/User/.codex/skills/playwright-interactive/SKILL.md) | 최근 와이어 검증에 사용 |
| `REQ-009` | WI 번호 체계 수정 | `WI-PC / WI-TA / WI-TE / WI-DS / WI-DM` 유지 | 완료 | [05-wi-backlog.md](/C:/Team-jane/FlowHR_V2/docs/foundation/05-wi-backlog.md) | 문서 체계 고정 |
| `REQ-010` | 디렉토리 구조 정리 | 문서와 와이어를 역할/용도 기준으로 정리 | 완료 | [docs/README.md](/C:/Team-jane/FlowHR_V2/docs/README.md), [wireframes/README.md](/C:/Team-jane/FlowHR_V2/wireframes/README.md) | 현재 구조 유지 중 |
| `REQ-011` | UTF-8 적용 | 신규/수정 문서를 UTF-8 기준으로 유지 | 완료 | [docs/README.md](/C:/Team-jane/FlowHR_V2/docs/README.md) | 현재 유지 중 |
| `REQ-012` | `LID-*` 기반 다국어 구조 적용 | `LID-{ROLE}-{MODULE}-{SEMANTIC_KEY}` 체계 적용 | 진행 중 | [06-localization-strategy.md](/C:/Team-jane/FlowHR_V2/docs/foundation/06-localization-strategy.md), [24-localization-status-matrix.md](/C:/Team-jane/FlowHR_V2/docs/foundation/24-localization-status-matrix.md) | 핵심 와이어는 반영, 실제 앱 리소스 운영은 계속 필요 |
| `REQ-013` | 기존 방향대로 계속 진행 | 설계를 중간에 닫지 않고 누적 확장 | 진행 중 | [08-design-progress-report.md](/C:/Team-jane/FlowHR_V2/docs/foundation/08-design-progress-report.md) | 승인 루프는 계속 남음 |
| `REQ-014` | 구현 전 단계까지 이어서 진행 | 설계 산출물을 계속 채우되 단계 과장 금지 | 진행 중 | [00-stage-gates.md](/C:/Team-jane/FlowHR_V2/docs/foundation/00-stage-gates.md) | 현재는 상세 설계 진행 단계 |
| `REQ-015` | 대분류/중분류/소분류/상세분류 설계 | IA 계층표와 역할별 매핑 작성 | 완료 | [17-ia-hierarchy-breakdown.md](/C:/Team-jane/FlowHR_V2/docs/foundation/17-ia-hierarchy-breakdown.md), [18-role-menu-function-action-matrix.md](/C:/Team-jane/FlowHR_V2/docs/foundation/18-role-menu-function-action-matrix.md) | Stage 3 충족 |
| `REQ-016` | 승인 추적이 가능한 구조 필요 | 승인 로그, 리뷰 패킷, readiness 연결 | 진행 중 | [19-approval-log-framework.md](/C:/Team-jane/FlowHR_V2/docs/foundation/19-approval-log-framework.md), [29-approval-review-packet.md](/C:/Team-jane/FlowHR_V2/docs/foundation/29-approval-review-packet.md) | 사용자 승인 반영 전 |
| `REQ-017` | 와이어는 정식 CSS와 별개로 유지 | 와이어 산출물과 정식 UI 구현 분리 | 완료 | [wireframes/README.md](/C:/Team-jane/FlowHR_V2/wireframes/README.md) | 현재 유지 중 |
| `REQ-018` | 디자인 시스템을 구현 가능한 수준으로 상세화 | 토큰, 상태, 컴포넌트 규격 포함 | 완료 | [WI-DS-007-design-tokens.md](/C:/Team-jane/FlowHR_V2/docs/design-system/WI-DS-007-design-tokens.md), [WI-DS-008-component-specifications.md](/C:/Team-jane/FlowHR_V2/docs/design-system/WI-DS-008-component-specifications.md) | Stage 5 충족 |
| `REQ-019` | 루프를 돌려도 흔들리지 않을 기준 필요 | Stage Gate와 Requirement Traceability를 기준 문서로 고정 | 완료 | [00-stage-gates.md](/C:/Team-jane/FlowHR_V2/docs/foundation/00-stage-gates.md), [16-requirement-traceability.md](/C:/Team-jane/FlowHR_V2/docs/foundation/16-requirement-traceability.md) | 현재 유지 중 |
| `REQ-020` | 대화 내용을 전부 종합하는 추적표 필요 | 요구사항 추적 문서 작성 | 완료 | [16-requirement-traceability.md](/C:/Team-jane/FlowHR_V2/docs/foundation/16-requirement-traceability.md) | 현재 문서가 기준점 |
| `REQ-021` | Git 저장소 연결 | 원격 origin 설정과 git 관리 시작 | 완료 | [.gitignore](/C:/Team-jane/FlowHR_V2/.gitignore) | 현재 origin 연결됨 |
| `REQ-022` | 커밋명은 `WI-####: [type] 한국어 작업명` 형식 | 저장소 커밋 규칙 고정 | 완료 | [git log](/C:/Team-jane/FlowHR_V2/.git) | 최근 커밋에 적용 중 |
| `REQ-023` | 비관적 시점의 검토 장치 필요 | 승인 전 실패 기준과 장식 제거 기준을 먼저 본다 | 진행 중 | [19-approval-log-framework.md](/C:/Team-jane/FlowHR_V2/docs/foundation/19-approval-log-framework.md), [34-approval-reset-plan.md](/C:/Team-jane/FlowHR_V2/docs/foundation/34-approval-reset-plan.md) | 실제 사용자 검토 결과 반영은 앞으로 진행 |
| `REQ-024` | 업종별 기능 선택 구조 필요 | 공통 코어 + 업종 팩 + 기능 팩 구조 채택 | 진행 중 | [32-industry-pack-feature-selection.md](/C:/Team-jane/FlowHR_V2/docs/foundation/32-industry-pack-feature-selection.md) | Manufacturing 등 후순위 팩은 더 남음 |
| `REQ-025` | 웹 리서치로 목표 수렴 | 외부 근거 기반으로 우선 공략 업종을 압축 | 완료 | [30-goal-convergence-exploration.md](/C:/Team-jane/FlowHR_V2/docs/foundation/30-goal-convergence-exploration.md), [31-industry-segmentation.md](/C:/Team-jane/FlowHR_V2/docs/foundation/31-industry-segmentation.md) | Office / Retail 우선안 정리 완료 |
| `REQ-026` | 업종별로 승인건 전부 재검토 | 범용 승인 세트를 리셋하고 Pack 기반 리뷰로 전환 | 진행 중 | [34-approval-reset-plan.md](/C:/Team-jane/FlowHR_V2/docs/foundation/34-approval-reset-plan.md), [35-pack-review-sequence.md](/C:/Team-jane/FlowHR_V2/docs/foundation/35-pack-review-sequence.md) | Bundle 승인 로그는 생성됐지만 아직 모두 hold |

## 공식 판정

- 현재 상태는 `전체 완료`가 아니다
- 현재 공식 단계는 `Stage 4, Stage 6 진행 중`
- 정확한 표현은 `상세 설계 진행 단계`

## 다음 작업

1. Pack 단위 사용자 검토 반영
2. Bundle 승인 로그 decision 갱신
3. Screen 승인 로그 decision 갱신
4. 승인 결과를 구현 연결 문서에 반영

## 연결 문서

- [00-stage-gates.md](./00-stage-gates.md)
- [05-wi-backlog.md](./05-wi-backlog.md)
- [29-approval-review-packet.md](./29-approval-review-packet.md)
- [35-pack-review-sequence.md](./35-pack-review-sequence.md)
