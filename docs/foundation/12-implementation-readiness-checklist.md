# FlowHR_V2 구현 준비 체크리스트

## 목적

설계 산출물을 실제 구현으로 넘기기 전에 필요한 조건을 한 장으로 점검하기 위한 체크리스트다.

## 1. 제품/UX

- [ ] 권한 레이어별 핵심 화면이 승인되었다
- [ ] 플랫폼 / 관리자 / 직원 셸 구분이 확정되었다
- [ ] 공통 상태 패턴이 합의되었다
- [ ] 민감 액션 확인 패턴이 정의되었다

## 2. 정보구조

- [ ] 화면 맵 ID가 최신 상태다
- [ ] WI 문서와 화면 맵이 서로 연결된다
- [ ] 신규 화면 추가 시 규칙이 정해져 있다

## 3. 로컬라이제이션

- [ ] `LID-*` 키 규칙이 확정되었다
- [ ] 리소스 파일 구조가 정의되었다
- [ ] 플랫폼 핵심 와이어의 잔여 정적 텍스트 정리 방침이 있다
- [ ] 언어 결정 우선순위가 구현 기준으로 정리되었다

## 4. 프론트엔드 구조

- [ ] 라우트 그룹(`platform`, `admin`, `employee`, `auth`)이 확정되었다
- [ ] App Shell 분리 기준이 있다
- [ ] 공통 컴포넌트와 feature 컴포넌트 경계가 정해졌다

## 5. 데이터 계약

- [ ] Home summary 계약이 정의되었다
- [ ] People / Attendance / Leave / Approval / Document / Payroll 계약이 초안 수준으로 정리되었다
- [ ] Platform tenant / billing / security 계약이 초안 수준으로 정리되었다
- [ ] 공통 에러 envelope가 정의되었다

## 6. 상태관리

- [ ] server state와 UI state를 분리한다
- [ ] mutation state와 success/error feedback 규칙이 있다
- [ ] invalidate 대상과 캐시 전략 기준이 있다

## 7. 보안/권한

- [ ] 멀티테넌시 경계 규칙이 있다
- [ ] 권한 레이어와 세부 role 모델이 있다
- [ ] 인증/세션/step-up 흐름이 설계되었다
- [ ] 감사 로그 대상 이벤트가 정리되었다

## 구현 착수 판단 기준

아래가 모두 충족되면 구현 착수 가능으로 본다.

- 핵심 와이어 승인
- 라우트 구조 확정
- API 계약 초안 확보
- i18n 구조 확정
- 권한/테넌트 경계 합의

## 연결 문서

- 설계 진행 보고서: [08-design-progress-report.md](./08-design-progress-report.md)
- 화면별 API 계약: [11-screen-api-contracts.md](./11-screen-api-contracts.md)
