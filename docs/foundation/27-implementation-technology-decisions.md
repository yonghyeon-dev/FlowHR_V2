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

- 권장: `React + TypeScript + Vite`
- 사유:
  - 현재 와이어와 컴포넌트 설계가 SPA형 정보 밀도에 맞춰져 있다
  - 관리자/플랫폼/직원 레이어를 라우트 그룹으로 나누기 쉽다
  - 반복적인 카드, 필터, 테이블, 인박스 패턴을 컴포넌트로 재사용하기 좋다

### 2. 라우팅

- 권장: `react-router`
- 사유:
  - 권한 레이어별 shell 구성이 명확하다
  - Platform / Tenant Admin / Tenant Employee를 route tree로 분리하기 쉽다

### 3. 상태관리 / 서버 상태

- 권장:
  - UI 상태: `zustand`
  - 서버 상태: `@tanstack/react-query`
- 사유:
  - 전역 UI 상태와 서버 캐시 성격이 명확히 다르다
  - 대시보드형 화면에서 polling, refetch, optimistic refresh를 다루기 쉽다

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
  - 단위/컴포넌트: `Vitest + Testing Library`
  - E2E: `Playwright`
- 사유:
  - 지금 설계 단계에서 이미 Playwright 기반 검증 루프를 사용 중이다
  - 권한/언어 전환/핵심 업무 플로우를 E2E로 묶기 쉽다

## 비권장 선택

- 무거운 UI 프레임워크를 바로 도입하는 선택
  - 사유: 현재 목표는 Shiftee/Flex 계열의 운영형 정보 밀도이며, 범용 프레임워크가 디자인 언어를 약하게 만들 수 있다
- 로컬 상태와 서버 상태를 하나의 전역 store로 합치는 선택
  - 사유: 근태, 승인, 급여, 리포트는 갱신 주기와 캐시 전략이 다르다

## 구현 시작 우선순위

1. 공통 shell과 route group
2. i18n 리소스 로더와 locale resolver
3. 디자인 토큰 CSS 변수 파일
4. 공통 컴포넌트 베이스
5. 코어 화면 6종 구현

## 연결 문서

- [09-frontend-route-component-architecture.md](./09-frontend-route-component-architecture.md)
- [10-data-contract-state-management.md](./10-data-contract-state-management.md)
- [11-screen-api-contracts.md](./11-screen-api-contracts.md)
- [13-component-inventory.md](./13-component-inventory.md)
- [07-localization-resource-architecture.md](./07-localization-resource-architecture.md)
