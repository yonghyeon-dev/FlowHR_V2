# FlowHR_V2 구현 준비 체크리스트

## 현재 판정

- 현재 상태는 `구현 직전`
- 남은 블로커는 설계 기준으로 없다

## 체크 결과

### 제품 / UX

- [x] 권한 3축 구조
- [x] Pack 기반 화면 분리
- [x] 공통 상태 패턴
- [x] 민감 액션 패턴
- [x] Pack 번들 승인

### 정보구조

- [x] 화면 맵 최신화
- [x] WI 연결
- [x] IA 계층 정리

### 로컬라이제이션

- [x] `LID-*` 규칙
- [x] 리소스 구조
- [x] 핵심 와이어 적용
- [x] 언어 우선순위

### 프론트엔드 구조

- [x] 라우트 그룹
- [x] App Shell 기준
- [x] 컴포넌트 경계

### 데이터 계약

- [x] 코어 API 계약
- [x] Platform API 계약
- [x] 공통 에러 envelope

### 상태관리 / 보안

- [x] server state / UI state 분리
- [x] mutation / feedback 규칙
- [x] 멀티테넌시 / 권한 / 인증 / 감사 기준

## 구현 착수 조건

- [x] Office Pack 승인
- [x] Retail Pack 승인
- [x] Platform 승인
- [x] 코어 화면 승인 반영
- [x] 라우트 구조 확정
- [x] API 계약 초안 확정
- [x] i18n 구조 확정
- [x] 권한 / 테넌트 경계 기준 확정

## 구현 시작 순서

1. Sprint 0 공통 기반
2. Sprint 1 Office Pack
3. Sprint 2 Retail Pack
4. Sprint 3 Shared Expansion
5. Sprint 4 Platform Expansion
