# FlowHR_V2 구현 준비 체크리스트

## 목적

설계 산출물을 실제 구현으로 넘기기 전에, 구현 착수 조건이 무엇인지 한 번에 확인하기 위한 체크리스트다.

## 현재 판정

- 구현 연결 설계 문서는 `충족`
- 남은 블로커는 `사용자 승인`
- 따라서 현재 상태는 `승인만 남은 구현 대기 상태`다

## 1. 제품 / UX

- [x] 권한 3축 구조가 정리돼 있다
- [x] Platform / Tenant Admin / Tenant Employee 구분이 정리돼 있다
- [x] 공통 상태 패턴이 정의돼 있다
- [x] 민감 액션 확인 패턴이 정의돼 있다
- [ ] 필요한 Pack 번들 승인이 완료됐다

## 2. 정보구조

- [x] 화면 맵과 화면 ID가 최신 상태다
- [x] WI 문서와 화면 맵이 연결돼 있다
- [x] 대분류 / 중분류 / 소분류 / 상세분류가 정리돼 있다

## 3. 로컬라이제이션

- [x] `LID-*` 네이밍 규칙이 고정돼 있다
- [x] 리소스 파일 구조가 정의돼 있다
- [x] 주요 와이어의 정적 텍스트가 `LID-*` 구조로 정리돼 있다
- [x] 언어 결정 우선순위가 정리돼 있다

## 4. 프론트엔드 구조

- [x] 라우트 그룹(`platform`, `admin`, `employee`, `auth`)이 정의돼 있다
- [x] App Shell 분리 기준이 있다
- [x] 공통 컴포넌트와 feature 컴포넌트 경계가 정의돼 있다

## 5. 데이터 계약

- [x] Home summary 계약이 정리돼 있다
- [x] People / Attendance / Leave / Approval / Document / Payroll 계약이 있다
- [x] Platform tenant / billing / security 계약이 있다
- [x] 공통 에러 envelope가 정의돼 있다

## 6. 상태관리

- [x] server state와 UI state 구분이 있다
- [x] mutation state와 feedback 규칙이 있다
- [x] invalidate / cache 운영 기준이 있다

## 7. 보안 / 권한

- [x] 멀티테넌시 경계 규칙이 있다
- [x] 권한 레이어와 role 모델이 있다
- [x] 인증 / 세션 / step-up 흐름이 정리돼 있다
- [x] 감사 로그 이벤트 기준이 있다

## 구현 착수 조건

아래가 모두 충족되면 구현에 바로 들어갈 수 있다.

- [ ] Office Pack 번들 승인
- [ ] Retail Pack 번들 승인
- [ ] 코어 화면 승인 반영
- [x] 라우트 구조 확정
- [x] API 계약 초안 확정
- [x] i18n 구조 확정
- [x] 권한 / 테넌트 경계 기준 확정

## 연결 문서

- [09-frontend-route-component-architecture.md](./09-frontend-route-component-architecture.md)
- [10-data-contract-state-management.md](./10-data-contract-state-management.md)
- [14-screen-readiness-matrix.md](./14-screen-readiness-matrix.md)
- [20-module-api-contract-breakdown.md](./20-module-api-contract-breakdown.md)
- [23-implementation-sprint-breakdown.md](./23-implementation-sprint-breakdown.md)
