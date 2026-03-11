# WI-PC-003 인증과 접근 제어 구조 정리

## 작업 ID

- `WI-PC-003`

## 목적

FlowHR_V2의 인증과 접근 제어는 단순 로그인 기능이 아니라,
권한 레이어, 테넌트 경계, 민감 액션 승인, 세션 안전성까지 포함하는
제품 보안 구조여야 한다.

## 인증 구조 원칙

- 인증은 `누구인지`를 증명하고, 접근 제어는 `무엇을 할 수 있는지`를 판단한다.
- `Platform`과 `Tenant`는 같은 로그인 경험처럼 보여도 내부적으로 다른 컨텍스트를 가진다.
- 사용자는 로그인 이후 반드시 하나의 권한 레이어와 하나의 활성 컨텍스트를 가진다.
- 인증 성공만으로 민감 작업이 허용되면 안 되고, 추가 검증이 필요한 작업이 분리되어야 한다.

## 로그인 유형

### 1. Platform Login

- 우리 SaaS 운영 조직 사용자용
- 별도 보안 정책을 적용한다
- MFA를 기본값으로 강제한다

### 2. Tenant Login

- 고객사 관리자 / 직원용
- 이메일/비밀번호, SSO, 초대 링크 기반 초기 등록을 지원할 수 있다
- 고객사별 인증 수단 정책이 달라질 수 있다

## 세션 컨텍스트

- 세션은 `subject_id`, `role_layer`, `tenant_id(optional)`, `scopes`를 가진다.
- `Platform` 세션은 tenant scoped session과 분리한다.
- `Tenant Admin`은 여러 회사/법인 전환이 가능해도 한 시점에는 단일 활성 컨텍스트만 허용한다.
- 민감 화면 진입 시 현재 컨텍스트를 반복 노출한다.

## 접근 제어 판단 흐름

1. 인증 여부 확인
2. 계정 상태 확인
3. 권한 레이어 확인
4. 테넌트 컨텍스트 확인
5. 액션 권한 확인
6. 리소스 scope 확인
7. 민감 액션이면 추가 검증 수행

## 추가 검증이 필요한 액션

- 급여 마감
- 운영자 긴급 권한 부여
- 정책 비활성화
- 테넌트 중지 / 복구
- 문서 원문 대량 다운로드
- 기능 플래그 예외 활성화

추가 검증 방식 예시:

- 비밀번호 재확인
- MFA 재검증
- 승인자 지정
- 사유 입력
- 세션 승격 제한 시간 부여

## 계정 상태 모델

- `active`
- `invited`
- `suspended`
- `locked`
- `pending_mfa`
- `deactivated`

상태는 메뉴 표시뿐 아니라 로그인 성공 여부, 액션 수행 가능 여부, 관리자 인박스 알림에 연결된다.

## SSO / 도메인 연계 원칙

- 테넌트 단위로 SSO 여부와 허용 도메인을 관리한다.
- 이메일 도메인만 같다고 자동으로 테넌트에 연결하지 않는다.
- SSO 실패 시 fallback 정책과 감사 로그를 남겨야 한다.

## 감사 추적 원칙

- 로그인 성공/실패
- 세션 만료
- MFA 검증
- 권한 상승
- 테넌트 전환
- 접근 거부

이 항목은 모두 감사 로그 대상이다.

## UX 설계 원칙

- 권한 부족과 인증 만료는 다른 메시지로 안내한다.
- 세션이 만료되었을 때 draft 손실을 최소화하는 구조가 필요하다.
- 접근 거부는 숨김 처리와 별도로, 필요한 경우 요청 경로를 제시해야 한다.
- 민감 액션 전에는 현재 테넌트와 대상 리소스를 다시 확인시키는 패턴이 필요하다.

## 승인용 화면

- `PC-604` Authentication & Session Control

## 산출물

- 인증/접근 제어 구조 문서
- 승인용 와이어: [auth-access-control-detailed.html](../../wireframes/platform/auth-access-control-detailed.html)

## 연결 문서

- 멀티테넌시 경계: [WI-PC-001-multitenancy-tenant-boundaries.md](./WI-PC-001-multitenancy-tenant-boundaries.md)
- 권한 레이어: [WI-PC-002-role-layer-access-model.md](./WI-PC-002-role-layer-access-model.md)
- 감사/보안 운영: [WI-PC-005-audit-security-ux.md](./WI-PC-005-audit-security-ux.md)
