# WI-DS-008 공통 컴포넌트 규격서

## 작업 ID

- `WI-DS-008`

## 목적

FlowHR_V2의 공통 컴포넌트를 실제 구현 가능한 규격으로 정의한다.
이 문서는 variant, state, 구조, 사용 금지 규칙까지 포함한다.

## 1. Button

### Variant

- `primary`
- `secondary`
- `ghost`
- `danger`

### Size

- `sm`
- `md`
- `lg`

### State

- `default`
- `hover`
- `focus`
- `disabled`
- `loading`

### 규칙

- 한 화면의 주 행동은 `primary` 1개만 둔다.
- 파괴적 행동은 `danger`와 확인 패턴을 함께 사용한다.
- `loading` 상태에서는 라벨을 숨기지 않고 스피너와 같이 노출한다.

## 2. Status Badge

### Variant

- `critical`
- `high`
- `medium`
- `neutral`
- `success`

### Size

- `sm`
- `md`

### 규칙

- 상태 의미는 [WI-DS-005-status-color-visual-language.md](./WI-DS-005-status-color-visual-language.md)와 일치해야 한다.
- 배지 수는 카드당 최대 2개다.
- 라벨은 모두 `LID-*` 키를 사용한다.

## 3. KPI Card

### 구조

- eyebrow
- value
- label
- delta optional
- action optional

### Variant

- `default`
- `emphasis`
- `status-linked`

### 규칙

- 값보다 라벨과 의미가 먼저 읽혀야 한다.
- delta는 상승/하락 방향만 표현하고 과한 색상 경쟁을 피한다.
- `status-linked`는 위험도 1개만 대표로 연결한다.

## 4. Queue Card / Inbox Item

### 구조

- priority badge
- title
- meta line
- due / SLA
- action

### State

- `unread`
- `active`
- `resolved`
- `overdue`

### 규칙

- 큐 항목은 `제목 -> 메타 -> 행동` 순으로 읽혀야 한다.
- overdue는 `critical` 또는 `high` 상태와 연결한다.
- 하나의 카드에는 대표 CTA 1개만 둔다.

## 5. Data Table

### Type

- `reference`
- `operational`

### 공통 구조

- column header
- row
- selection optional
- row action optional
- pagination optional

### State

- `loading`
- `empty`
- `error`
- `selected`

### 규칙

- `reference` 테이블은 색상 강조를 최소화한다.
- `operational` 테이블은 행 강조와 상태 배지를 허용한다.
- bulk action은 선택 개수와 영향 범위를 항상 같이 보여준다.

## 6. Filter Bar

### 구성

- search input
- quick filter chips
- advanced filter trigger
- reset action

### 규칙

- 기본 필터는 3개 이내로 유지한다.
- 선택된 필터는 명시적으로 해제 가능해야 한다.
- 모바일에서는 drawer 방식으로 전환 가능해야 한다.

## 7. Side Panel / Detail Drawer

### 구조

- panel header
- summary block
- detail sections
- footer actions

### Size

- `md`
- `lg`

### 규칙

- 목록 화면에서 문맥을 잃지 않도록 우선 drawer를 쓴다.
- 파괴적 액션은 footer 우측 끝이 아니라 별도 확인 단계 뒤에 둔다.

## 8. Empty / Error / No Permission State

### Empty State 구성

- title
- description
- primary action optional

### Error State 구성

- title
- cause hint
- retry action

### No Permission 구성

- title
- 현재 제한 이유
- 요청 경로 또는 대체 경로

### 규칙

- 빈 상태와 권한 부족 상태를 같은 문구로 처리하지 않는다.
- 에러 상태는 단순 실패 문구가 아니라 다음 행동을 제시해야 한다.

## 9. Confirm Dialog / Step-Up Prompt

### Confirm Dialog

- 대상 이름
- 영향 범위
- 취소/확인

### Step-Up Prompt

- 사유 입력
- 재인증
- 승인자 지정 optional
- 최종 실행

### 규칙

- `danger` 액션은 Confirm Dialog 없이 즉시 실행하지 않는다.
- Platform의 민감 액션은 Step-Up Prompt와 함께 간다.

## 10. Responsive Rules

- Desktop: 다중 패널과 밀도 높은 테이블 허용
- Tablet: 2열 레이아웃까지 허용
- Mobile: 카드 스택과 하단 탭 우선
- Drawer와 table은 `breakpoint.tablet` 아래에서 재구성 가능해야 한다

## 11. 접근성 규칙

- 모든 액션 컴포넌트는 focus ring을 가진다.
- 상태 전달은 색상 외에 텍스트/아이콘을 함께 사용한다.
- 모달/드로어는 키보드 포커스 트랩을 가져야 한다.

## 연결 문서

- 디자인 토큰: [WI-DS-007-design-tokens.md](./WI-DS-007-design-tokens.md)
- UI 패턴: [WI-DS-002-ui-patterns.md](./WI-DS-002-ui-patterns.md)
- 공통 상태 패턴: [WI-DS-006-common-state-patterns.md](./WI-DS-006-common-state-patterns.md)
