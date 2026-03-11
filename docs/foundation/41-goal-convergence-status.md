# FlowHR_V2 목표 수렴 상태

## 목적

이 문서는 현재 제품 방향, 승인 범위, 구현 스택, 화면 구조가 어디까지 하나로 수렴됐는지
한 번에 확인하기 위한 기준 문서다.

## 현재 수렴된 축

### 1. 우선 공략 업종

- 1순위: `오피스형 조직`
- 2순위: `리테일/매장형 조직`
- 후순위: `제조/현장형 조직`

### 2. 제품 구조

- `Platform Console`
- `Tenant Admin`
- `Tenant Employee`

권한 레이어는 유지하되, 실제 첫 화면과 우선순위는 `Pack` 기준으로 분기한다.

### 3. 제품 운영 방식

- 공통 코어 + 업종 팩 + 기능 팩 구조
- Home, Attendance, Leave, Workflow, Documents는 업종별로 우선순위가 달라진다
- Employee는 Home, Request Hub, Signature Inbox를 코어 허브로 본다

### 4. 승인 범위

현재 구현과 승인 범위는 아래 코어 Pack으로 수렴했다.

- `Platform Console`
- `Office Pack Core`
- `Retail Pack Core`

### 5. 기술 스택

- `Next.js App Router`
- `React`
- `TypeScript`
- `Playwright` 검증 루프

## 현재 구현 상태

다음 코어 라우트는 실제 코드로 구현돼 있다.

- `/platform/overview`
- `/admin/office/*`
- `/admin/retail/*`
- `/employee/office/*`
- `/employee/retail/*`
- `/setup`

다음 mock API 엔드포인트도 구현돼 있다.

- `/api/platform/overview`
- `/api/admin/[pack]/[view]`
- `/api/employee/[pack]/[view]`
- `/api/setup/packs`
- `/api/actions/simulate`

다음 구현 연결도 실제 동작 기준으로 붙어 있다.

- `/setup`에서 `Pack 선택 + 기능 선택 + 저장` 가능
- 저장된 선택 상태가 `관리자 settings` 화면에 반영됨
- 코어 화면에서 성공/실패 상태를 API 응답 기반으로 검증 가능

## 현재 합의된 비목표

아래 항목은 아직 목표 범위에 넣지 않는다.

- 제조/현장형 특수 규칙의 깊은 자동화
- 복잡한 글로벌 멀티국가 규정 처리
- 고급 분석 빌더
- 범용 보고서 생성기

## 남은 수렴 과제

목표 수렴이 완전히 끝났다고 보기 위해 남은 과제는 아래다.

1. 실제 API 계약을 Next 구조에 맞게 연결
2. mock 기반 코어 화면을 live data 기반으로 전환
3. mock 저장 상태를 실제 백엔드 저장소와 권한 모델로 전환
4. 관리자/직원 핵심 액션을 도메인별 전용 엔드포인트로 분리

## 현재 결론

지금 상태는 `방향 탐색 중`이 아니라,
`우선 공략 업종 + 코어 Pack + 구현 스택`이 하나로 수렴된 상태다.

즉, 다음 단계는 방향 재논의가 아니라
`수렴된 기준 위에서 실제 기능 구현을 깊게 들어가는 단계`로 보는 것이 맞다.
