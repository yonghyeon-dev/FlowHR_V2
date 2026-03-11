# FlowHR_V2 구현 착수용 기술 선택안

## 작업 ID

- `WI-DM-012`

## 목적

설계 산출물을 실제 프론트엔드 구현으로 옮길 때 기준이 될 기술 선택안을 고정한다.
이 문서는 벤더 선정 문서가 아니라, 현재 설계와 가장 잘 맞는 구현 출발점을 정리한 문서다.

## 선택 원칙

- 다국어와 권한 레이어를 구조적으로 분리할 수 있어야 한다
- 관리자/직원/플랫폼 화면이 공통 컴포넌트를 공유할 수 있어야 한다
- 데이터 요약 카드, 큐, 테이블, 필터, 모바일 셀프서비스를 모두 무리 없이 표현할 수 있어야 한다
- 복잡한 상태와 권한 조건을 코드로 일관되게 유지할 수 있어야 한다

## 권장 스택

### 1. 프레임워크

- 권장: `Next.js App Router + React + TypeScript`
- 현재 상태: `적용 완료`
- 사유:
  - Pack 기반 라우트와 권한 레이어를 파일 시스템 라우트로 안정적으로 분리할 수 있다
  - Platform / Tenant Admin / Tenant Employee 흐름을 공통 shell과 route segment로 재사용하기 쉽다
  - 향후 API 연동 시 server component, route handler, dynamic rendering 전략을 같이 가져갈 수 있다

### 2. 라우팅

- 권장: `Next.js App Router`
- 현재 상태: `적용 완료`
- 사유:
  - `/platform/*`, `/admin/[pack]/[view]`, `/employee/[pack]/[view]` 구조를 직접 코드 구조로 고정할 수 있다
  - 승인된 Pack 단위 화면을 route param으로 통합 관리하기 쉽다

### 3. 상태관리 / 서버 상태

- 권장:
  - UI 상태: `client-local state + 최소 context`
  - 서버 상태: `Next fetch + 필요 시 @tanstack/react-query`
- 사유:
  - 현재 코어 베이스라인은 정적 승인 화면 중심이라 과도한 전역 store가 필요 없다
  - 실제 API 연결 이후 polling, refetch, optimistic refresh가 필요한 모듈부터 서버 상태 라이브러리를 점진 도입하는 편이 맞다

### 4. 폼

- 권장: `react-hook-form + zod`
- 사유:
  - 요청 허브, 정정, 설정, 역할 권한, 채용/온보딩 폼에 적합하다
  - 필드 validation과 타입 추론을 같이 가져가기 좋다

### 5. i18n

- 권장: `i18next + react-i18next`
- 사유:
  - 현재 `LID-*` 키 전략을 namespace 구조로 옮기기 쉽다
  - 언어 우선순위, fallback, interpolation 관리가 안정적이다

### 6. 스타일링

- 권장: `CSS variables + CSS modules`
- 사유:
  - 이미 디자인 토큰 문서가 CSS 변수 구조와 잘 맞는다
  - 와이어에서 확정한 카드/패널/배지 계층을 과도한 런타임 비용 없이 구현 가능하다

### 7. 테이블 / 차트

- 권장:
  - 테이블: `TanStack Table`
  - 차트: `Recharts`
- 사유:
  - 근태, 사람, 리포트 화면에서 표 밀도가 높다
  - KPI와 추세는 복잡한 BI 도구보다 경량 차트가 적합하다

### 8. 테스트

- 권장:
  - 단위/컴포넌트: `Testing Library`
  - E2E: `Playwright`
- 사유:
  - 현재 구현에서도 Playwright 기반 검증 루프를 그대로 사용 중이다
  - 권한/Pack/언어 전환/핵심 업무 플로우를 E2E로 묶기 쉽다

## 비권장 선택

- 무거운 UI 프레임워크를 바로 도입하는 선택
  - 사유: 현재 목표는 Shiftee/Flex 계열의 운영형 정보 밀도이며, 범용 프레임워크가 디자인 언어를 약하게 만들 수 있다
- 로컬 상태와 서버 상태를 하나의 전역 store로 합치는 선택
  - 사유: 근태, 승인, 급여, 리포트는 갱신 주기와 캐시 전략이 다르다

## 구현 시작 우선순위

1. 공통 shell과 route group
2. locale resolver와 언어 유지
3. 디자인 토큰 CSS 변수 파일
4. 승인된 코어 Pack 구현
5. 실제 API 연동과 서버 상태 도입

## 연결 문서

- [09-frontend-route-component-architecture.md](./09-frontend-route-component-architecture.md)
- [10-data-contract-state-management.md](./10-data-contract-state-management.md)
- [11-screen-api-contracts.md](./11-screen-api-contracts.md)
- [13-component-inventory.md](./13-component-inventory.md)
- [07-localization-resource-architecture.md](./07-localization-resource-architecture.md)
- [41-goal-convergence-status.md](./41-goal-convergence-status.md)
