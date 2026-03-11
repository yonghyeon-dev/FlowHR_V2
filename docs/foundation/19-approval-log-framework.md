# FlowHR_V2 승인 로그 체계

## 목적

승인 로그는 단순 메모가 아니라, 설계 진행 상태를 문서 기준으로 고정하는 기록이다.
앞으로는 `화면 단위 승인`만으로 다음 단계로 넘어가지 않고, 반드시 `Pack 번들 승인 -> 개별 화면 승인 -> 구현 준비도 승인` 순서로 관리한다.

## 승인 로그 범위

- 화면 승인: `APP-SCREEN-*`
- 번들 승인: `APP-BUNDLE-*`
- 구현 준비도 승인: `APP-READY-*`

## 승인 단위

### 1. Bundle Approval

- 대상: `Office Pack`, `Retail Pack`, `Platform Risk-first Console` 같은 검토 묶음
- 목적: 특정 업종/운영 맥락에서 화면 세트가 일관되게 동작하는지 확인
- 원칙: 번들 승인이 `approved` 되기 전에는 해당 묶음의 개별 화면을 최종 `approved`로 승격하지 않는다

### 2. Screen Approval

- 대상: 개별 화면
- 목적: 화면 구조, 정보 우선순위, 액션 연결, 상태/예외 노출이 충분한지 확인
- 원칙: 화면 승인 로그는 반드시 `packContext` 또는 `reviewBundle`을 명시한다

### 3. Readiness Approval

- 대상: 구현 진입 여부
- 목적: API 계약, i18n, 상태 패턴, 권한 노출 기준, 컴포넌트 연결이 구현 가능한 수준인지 확인

## 공통 필드

| 필드 | 설명 |
|---|---|
| `approvalId` | 승인 로그 ID |
| `targetType` | `screen`, `bundle`, `readiness` |
| `targetId` | 화면 ID, 번들 ID, 준비도 ID |
| `title` | 승인 대상 이름 |
| `requestedBy` | 요청자 |
| `reviewedAt` | 검토 일시 |
| `decision` | `approved`, `changes_requested`, `hold` |
| `reason` | 승인/보류/수정 요청 사유 |
| `followUp` | 다음 액션 |
| `evidence` | 관련 문서, 와이어, 규칙 문서 링크 |

## Pack 기반 추가 필드

| 필드 | 설명 |
|---|---|
| `packContext` | `office`, `retail`, `platform`, `shared` |
| `variant` | 같은 화면의 변형 이름. 예: `office_home`, `retail_home`, `risk_first_console` |
| `reviewBundle` | 어떤 번들 승인에 귀속되는지 명시. 예: `BUNDLE-OFFICE-CORE` |

## 승인 결정 규칙

- `approved`: 다음 단계 이동 가능
- `changes_requested`: 현재 단계 유지, 수정 후 재검토
- `hold`: 선행 조건이 부족하거나, 사용자 결정 전이라 보류

## 비관적 검토 체크

승인 후보로 올리기 전에 아래 질문을 먼저 통과해야 한다.

1. 이 화면은 왜 실무에서 외면될 수 있는가
2. 이 화면은 특정 업종에서 어디가 가장 먼저 깨지는가
3. 장식 요소나 의미 없는 카드가 남아 있는가
4. 첫 화면에서 사용자가 내려야 할 결정이 한 문장으로 설명되는가
5. 모든 핵심 정보가 다음 행동과 연결되는가

하나라도 명확히 답하지 못하면 `hold` 또는 `changes_requested`가 맞다.

## 상태 연결 규칙

- `changes_requested`이면 관련 WI는 `in_progress` 유지
- `bundle approved` 이전에는 관련 `APP-SCREEN-*`를 최종 `approved`로 올리지 않음
- `screen approved`가 누적되어도 `APP-READY-*`가 없으면 `구현 직전`으로 표기하지 않음

## 기록 예시

```md
- approvalId: `APP-BUNDLE-OFFICE-001`
- targetType: `bundle`
- targetId: `BUNDLE-OFFICE-CORE`
- title: `Office Pack Core Review Set`
- requestedBy: `codex`
- reviewedAt: `2026-03-12`
- decision: `hold`
- reason: `업종 팩 기준으로 묶음은 정리됐지만 사용자 승인 전이므로 보류`
- followUp: `Office Pack 핵심 화면 검토 후 approved 또는 changes_requested로 갱신`
- packContext: `office`
- variant: `office_core_bundle`
- reviewBundle: `BUNDLE-OFFICE-CORE`
- evidence:
  - /C:/Team-jane/FlowHR_V2/docs/foundation/29-approval-review-packet.md
  - /C:/Team-jane/FlowHR_V2/docs/foundation/35-pack-review-sequence.md
```

## 연결 문서

- [00-stage-gates.md](./00-stage-gates.md)
- [05-wi-backlog.md](./05-wi-backlog.md)
- [22-final-approval-pass-criteria.md](./22-final-approval-pass-criteria.md)
- [29-approval-review-packet.md](./29-approval-review-packet.md)
- [35-pack-review-sequence.md](./35-pack-review-sequence.md)
