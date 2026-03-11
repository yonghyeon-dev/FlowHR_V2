# FlowHR_V2 요구사항 추적 문서

## 목적

이 문서는 지금까지의 대화에서 나온 사용자 지시와 그에 대한 산출물,
현재 충족 여부, 남은 간극을 한 번에 추적하기 위한 기준 문서다.
대화 원문 전체를 그대로 옮긴 기록이 아니라,
실행 가능한 요구사항 기준으로 정규화한 추적 문서다.

## 운영 원칙

- 이 문서는 `사용자 지시 -> 합의 해석 -> 근거 파일 -> 상태 -> 미충족` 순서로 관리한다.
- 상태는 `완료`, `진행 중`, `미충족`, `대체/보류`만 사용한다.
- 이후 보고는 이 문서와 [단계 게이트](./00-stage-gates.md)를 같이 기준으로 삼는다.
- `완료`는 부분 충족이 아니라, 현재 지시 기준에서 실질적으로 닫힌 경우에만 사용한다.

## 상태 요약

- 완료: 13
- 진행 중: 7
- 미충족: 0
- 대체/보류: 1

## 요구사항 목록

| ID | 사용자 지시 요약 | 합의된 해석 | 상태 | 근거 파일 | 미충족 / 메모 |
|---|---|---|---|---|---|
| `REQ-001` | 한글로 안내 | 이후 모든 진행/보고를 한국어로 수행 | 완료 | [문서 인덱스](/C:/Team-jane/FlowHR_V2/docs/README.md) | 현재 대화 기준 충족 |
| `REQ-002` | OpenAI Prompt guidance 기반 지침 작성 | 프로젝트용 프롬프트 지침 문서 생성 | 완료 | [prompt-guidelines.md](/C:/Team-jane/FlowHR_V2/docs/references/prompt-guidelines.md) | 후속 메인 트랙은 아님 |
| `REQ-003` | HR SaaS를 만들되 UI/UX 중심, Shiftee/Flex 목표 | 벤치마크 기반의 HR SaaS 방향 문서와 화면 설계 진행 | 진행 중 | [01-product-direction.md](/C:/Team-jane/FlowHR_V2/docs/foundation/01-product-direction.md) | 경쟁 제품의 세부 UX 비교표는 추가 여지 있음 |
| `REQ-004` | MVP가 아니라 프로덕션 기준으로 상세하게 작성 | 범위를 운영/권한/플랫폼/관리자/직원/확장 모듈까지 확장 | 진행 중 | [03-production-prd-draft.md](/C:/Team-jane/FlowHR_V2/docs/foundation/03-production-prd-draft.md) | 프로덕션 수준의 상세 IA와 디자인 스펙은 아직 부족 |
| `REQ-005` | 와이어프레임 먼저 만들고 컨펌 후 대/중/소/상세 분류와 WI 진행 | 화면 중심 와이어를 먼저 만들고, 승인 기준 아래 상세 분해 진행 | 진행 중 | [wireframes/README.md](/C:/Team-jane/FlowHR_V2/wireframes/README.md), [05-wi-backlog.md](/C:/Team-jane/FlowHR_V2/docs/foundation/05-wi-backlog.md) | 화면별 승인 로그와 IA 계층 완료본이 아직 없음 |
| `REQ-006` | 권한을 SaaS 운영 / 고객사 관리자 / 고객사 직원으로 분리 | Platform Operator / Tenant Admin / Tenant Employee 3축으로 설계 | 완료 | [02-information-architecture.md](/C:/Team-jane/FlowHR_V2/docs/foundation/02-information-architecture.md), [04-screen-map.md](/C:/Team-jane/FlowHR_V2/docs/foundation/04-screen-map.md) | 세부 역할은 하위 role로 정리됨 |
| `REQ-007` | 작업 전 필요한 MCP/스킬을 검색해 설치 진행 | Playwright 계열과 관련 스킬/전제 조건을 점검하고 반영 | 완료 | [package.json](/C:/Team-jane/FlowHR_V2/package.json) | 설치/설정 자체는 충족 |
| `REQ-008` | Playwright는 `playwright-interactive` 스킬 사용 | 브라우저 기반 검증을 해당 스킬 흐름에 맞춰 수행 | 완료 | [playwright-interactive SKILL](/C:/Users/User/.codex/skills/playwright-interactive/SKILL.md) | 최근 플랫폼 검증에 실제 사용 |
| `REQ-009` | WI 번호 체계가 이상하니 재정리 | `WI-PC / WI-TA / WI-TE / WI-DS / WI-DM` 체계로 통일 | 완료 | [05-wi-backlog.md](/C:/Team-jane/FlowHR_V2/docs/foundation/05-wi-backlog.md) | 신규 문서도 이 체계 유지 |
| `REQ-010` | 디렉토리 구조가 이상하니 정리 | 문서/와이어를 권한과 목적 기준으로 재배치 | 완료 | [문서 인덱스](/C:/Team-jane/FlowHR_V2/docs/README.md), [와이어 인덱스](/C:/Team-jane/FlowHR_V2/wireframes/README.md) | 현재 구조상 큰 문제 없음 |
| `REQ-011` | UTF-8 적용해서 작업 진행 | 모든 신규/수정 문서를 UTF-8 기준으로 유지 | 완료 | [문서 인덱스](/C:/Team-jane/FlowHR_V2/docs/README.md) | 이후도 지속 규칙으로 유지 |
| `REQ-012` | 브라우저 언어 ko/en에 따라 동적으로 동작, `LID-*` 방식 검토 | `LID-{ROLE}-{MODULE}-{SEMANTIC_KEY}`와 locale 우선순위 적용 | 진행 중 | [06-localization-strategy.md](/C:/Team-jane/FlowHR_V2/docs/foundation/06-localization-strategy.md), [07-localization-resource-architecture.md](/C:/Team-jane/FlowHR_V2/docs/foundation/07-localization-resource-architecture.md), [21-localization-rollout-plan.md](/C:/Team-jane/FlowHR_V2/docs/foundation/21-localization-rollout-plan.md), [i18n.js](/C:/Team-jane/FlowHR_V2/wireframes/shared/i18n.js) | 전략과 적용 계획은 있음. 전체 화면 마이그레이션은 아직 남음 |
| `REQ-013` | 기존 방향을 끊지 말고 계속 진행 | 설계를 중간에 닫지 않고 누적 확장 방식으로 진행 | 진행 중 | [08-design-progress-report.md](/C:/Team-jane/FlowHR_V2/docs/foundation/08-design-progress-report.md) | 과거에 잘못 `설계 종료`로 표현한 이력이 있어, 현재는 게이트로 고정 |
| `REQ-014` | 구현 전 단계까지 이어서 진행 | 구현 이전에 필요한 설계 산출물을 계속 채우되, 과장 없이 상태 보고 | 진행 중 | [00-stage-gates.md](/C:/Team-jane/FlowHR_V2/docs/foundation/00-stage-gates.md), [15-pre-implementation-report.md](/C:/Team-jane/FlowHR_V2/docs/foundation/15-pre-implementation-report.md) | 현재는 `구현 전`이 아니라 `상세 설계 진행 단계` |
| `REQ-015` | 대분류, 중분류, 소분류, 상세분류까지 설계 | 권한별 IA를 완전한 계층표로 문서화 | 완료 | [17-ia-hierarchy-breakdown.md](/C:/Team-jane/FlowHR_V2/docs/foundation/17-ia-hierarchy-breakdown.md), [18-role-menu-function-action-matrix.md](/C:/Team-jane/FlowHR_V2/docs/foundation/18-role-menu-function-action-matrix.md) | Stage 3 기준 충족 |
| `REQ-016` | 와이어 컨펌 후 세부 분해 | 화면 승인 기준과 이후 작업 분해를 명확히 연결 | 진행 중 | [19-approval-log-framework.md](/C:/Team-jane/FlowHR_V2/docs/foundation/19-approval-log-framework.md), [14-screen-readiness-matrix.md](/C:/Team-jane/FlowHR_V2/docs/foundation/14-screen-readiness-matrix.md), [APP-SCREEN-TA-001-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-SCREEN-TA-001-001.md) | 코어 화면 초기 로그는 작성됐고, 사용자 결정 반영이 남음 |
| `REQ-017` | 디자인은 아직 정식 CSS가 아니냐는 질문 후, 기존 방향 유지 | 와이어 스타일과 정식 프로덕션 UI를 분리하고 설계는 계속 진행 | 완료 | [wireframes/README.md](/C:/Team-jane/FlowHR_V2/wireframes/README.md) | 현재 와이어는 승인용 저해상도 산출물로 정의됨 |
| `REQ-018` | 디자인 설계가 충분히 상세해야 함 | 토큰, 상태, 컴포넌트 규격까지 포함하는 상세 디자인 시스템 필요 | 완료 | [WI-DS-007-design-tokens.md](/C:/Team-jane/FlowHR_V2/docs/design-system/WI-DS-007-design-tokens.md), [WI-DS-008-component-specifications.md](/C:/Team-jane/FlowHR_V2/docs/design-system/WI-DS-008-component-specifications.md), [00-stage-gates.md](/C:/Team-jane/FlowHR_V2/docs/foundation/00-stage-gates.md) | Stage 5 기준 충족 |
| `REQ-019` | 루프 돌릴 수 있게 번복 없는 기준 필요 | 단계 판정 기준과 요구사항 추적 기준을 고정 문서로 유지 | 완료 | [00-stage-gates.md](/C:/Team-jane/FlowHR_V2/docs/foundation/00-stage-gates.md), [16-requirement-traceability.md](/C:/Team-jane/FlowHR_V2/docs/foundation/16-requirement-traceability.md) | 이후부터는 이 두 문서를 기준점으로 사용 |
| `REQ-020` | 지금까지 대화한 내용 전부 종합한 문서 필요 | 지시, 합의, 증빙, 미충족 상태를 한 장으로 추적 | 완료 | [16-requirement-traceability.md](/C:/Team-jane/FlowHR_V2/docs/foundation/16-requirement-traceability.md) | 이후 변경 시 이 문서를 갱신해야 함 |
| `REQ-021` | 프롬프트 지침 작업이 HR SaaS 맞춤인지 확인 | 일반론이 아니라 HR SaaS 맞춤으로 가드레일 필요 | 대체/보류 | [prompt-guidelines.md](/C:/Team-jane/FlowHR_V2/docs/references/prompt-guidelines.md) | 현재 메인 트랙은 제품/UX 설계이며, AI 가드레일 문서는 후순위 보강 가능 |

## 핵심 미충족 항목

### 1. IA 계층 설계

- 권한별 완전 계층표와 매핑표는 생성됨.
- 이후 화면 추가 시 [17-ia-hierarchy-breakdown.md](/C:/Team-jane/FlowHR_V2/docs/foundation/17-ia-hierarchy-breakdown.md)와 함께 유지보수해야 한다.

### 2. 승인 추적

- 승인 기준과 기록 체계는 [19-approval-log-framework.md](/C:/Team-jane/FlowHR_V2/docs/foundation/19-approval-log-framework.md)로 정의되었다.
- 코어 화면 6종의 초기 승인 로그는 작성되었다.
- 실제 `approved` 또는 `changes_requested` 결정은 사용자 검토 후 반영해야 한다.

### 3. 로컬라이제이션 전체 적용

- 전략, 리소스 구조, 적용 계획은 정의되었다.
- 전체 와이어/향후 앱 화면 마이그레이션은 아직 남아 있다.

## 현재 공식 판정

- 현재 상태는 `구현 직전`이 아니다.
- 현재 상태는 `상세 설계 진행 단계`다.
- 가장 먼저 닫아야 할 것은 `실제 승인 로그 작성`과 `API 계약 세분화`다.

## 다음 작업

1. Stage 7 진입 가능성 재검토
2. 남은 코어 화면 `LID-*` 마이그레이션
3. 구현 착수용 기술 선택안 확정
4. 비코어 화면 승인 로그 확대
5. 코어 화면 user decision 반영

## 연결 문서

- 단계 게이트: [00-stage-gates.md](./00-stage-gates.md)
- 화면 맵: [04-screen-map.md](./04-screen-map.md)
- WI 백로그: [05-wi-backlog.md](./05-wi-backlog.md)
- 구현 전 보고서: [15-pre-implementation-report.md](./15-pre-implementation-report.md)
