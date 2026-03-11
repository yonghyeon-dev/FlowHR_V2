# FlowHR_V2 최종 승인 패스 기준

## 작업 ID

- `WI-DM-008`

## 목적

어떤 조건이 충족되어야 `approved`로 올릴 수 있는지 고정하는 체크리스트다.
이제 승인 기준은 `개별 화면 단독`이 아니라 `Pack 번들 -> Screen -> Readiness` 순서다.

## 승인 대상

- Screen Approval
- Bundle Approval
- Implementation Readiness Approval

## 1. Bundle Approval 기준

아래가 모두 충족되면 `APP-BUNDLE-*`를 `approved`로 변경할 수 있다.

- 같은 Pack 안의 핵심 화면이 모두 존재한다
- 관리자 흐름과 직원 흐름이 하나의 운영 시나리오로 이어진다
- Pack의 우선 KPI와 위험 신호가 업종 특성에 맞다
- 장식 요소 없이 의사결정에 필요한 정보만 남아 있다
- 각 핵심 카드가 다음 액션과 연결된다
- 관련 Screen 로그에 치명적인 `changes_requested`가 없다

## 2. Screen Approval 기준

아래가 모두 충족되면 `APP-SCREEN-*`를 `approved`로 변경할 수 있다.

- 화면 목적이 한 문장으로 설명된다
- 사용자가 내려야 할 핵심 결정이 분명하다
- 첫 화면의 CTA와 우선순위가 자연스럽다
- 권한 노출 기준이 맞다
- `loading`, `empty`, `error`, `no-permission` 상태가 정의돼 있다
- Pack 변형이 필요한 화면이면 해당 변형 기준이 문서와 와이어에 반영돼 있다
- 연계 화면이나 다음 행동으로 자연스럽게 이어진다

## 3. Implementation Readiness Approval 기준

아래가 모두 충족되면 `APP-READY-*`를 `approved`로 변경할 수 있다.

- Stage 3 완료
- Stage 4 완료
- Stage 5 완료
- Stage 6 완료
- 필요한 Bundle 승인 로그가 `approved`
- 코어 Screen 승인 로그가 `approved`
- API / i18n / 상태 / 권한 기준이 서로 충돌하지 않는다

## 4. Decision Rule

### `approved`

- 즉시 다음 단계 이동 가능

### `changes_requested`

- 구조나 우선순위 수정 필요
- 같은 단계 유지

### `hold`

- 사용자 결정 대기
- 선행 검토 문서가 부족
- 다음 라운드로 이월

## 5. 현재 코어 승인 세트

### Office Pack

- `TA-001`
- `TA-201`
- `TA-301`
- `TA-401`
- `TA-501`
- `TE-001/002`
- `TE-201`
- `TE-401`

### Retail Pack

- `TA-001`
- `TA-201`
- `TA-301`
- `TA-401`
- `TA-501`
- `TE-001/002`
- `TE-201`
- `TE-401`

### Platform

- `PC-001`

## 6. 운영 규칙

- 사용자 명시 결정 없이는 `approved`로 올리지 않는다.
- `hold`는 미완료가 아니라 `결정 대기 상태`다.
- Bundle 승인이 없으면 Screen 승인만으로 최종 확정하지 않는다.

## 연결 문서

- [19-approval-log-framework.md](./19-approval-log-framework.md)
- [29-approval-review-packet.md](./29-approval-review-packet.md)
- [35-pack-review-sequence.md](./35-pack-review-sequence.md)
