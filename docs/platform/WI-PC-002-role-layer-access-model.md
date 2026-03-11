# WI-PC-002 권한 레이어와 접근 제어 모델

## 작업 ID

- `WI-PC-002`

## 목적

FlowHR_V2의 권한 모델은 메뉴 표시 수준이 아니라 데이터 접근, 액션 허용,
승인 흐름, 감사 추적까지 포함하는 제품 제어 레이어여야 한다.

## 최상위 권한 레이어

### 1. Platform Operator

- 우리 SaaS 운영 조직 사용자
- 테넌트 생성, 상태 변경, 플랜 운영, 지원 처리, 플랫폼 보안 운영 담당
- 고객사 업무 데이터 원문 접근은 기본 권한이 아님

### 2. Tenant Admin

- 고객사 관리자
- 조직 설정, 직원 관리, 근태/휴가/문서/급여/리포트 운영 담당
- 같은 테넌트 안에서만 관리 권한을 가진다

### 3. Tenant Employee

- 고객사 일반 직원
- 출퇴근, 요청, 서명, 내 정보 확인 등 셀프서비스 중심
- 관리자 기능이나 조직 전체 데이터 접근은 불가

## 하위 역할 모델

`Tenant Admin` 아래의 역할 예시:

- HR Admin
- Manager
- Payroll Admin
- Recruiter
- Approver
- Document Operator

`Platform Operator` 아래의 역할 예시:

- Platform Operator
- Billing Admin
- Support Operator
- Security Auditor

## 접근 제어 원칙

- 권한은 `role`만으로 끝내지 않고 `scope`를 함께 가져야 한다.
- 같은 역할이라도 대상 조직, 부서, 법인, 문서 유형, 승인 단계에 따라 범위가 달라질 수 있다.
- 읽기/수정/승인/배포/다운로드/원문 열람은 별도 액션 권한으로 나눈다.
- 민감 액션은 단일 권한이 아니라 승인 또는 이중 확인이 필요할 수 있다.

## 권한 판단 축

### 1. Subject

- 누가 요청했는가
- 예: Tenant Admin, Manager, Payroll Admin

### 2. Resource

- 무엇에 접근하는가
- 예: Employee Profile, Payroll Closing, Audit Log

### 3. Action

- 어떤 행동을 하는가
- 예: read, update, approve, export, close, revoke

### 4. Scope

- 어디까지 허용되는가
- 예: tenant-wide, company, division, team, self

## 대표 권한 예시

### Tenant Employee

- `self.attendance.check`
- `self.request.create`
- `self.document.sign`
- `self.profile.read`

### Tenant Admin

- `tenant.people.read`
- `tenant.attendance.manage`
- `tenant.leave.policy.manage`
- `tenant.workflow.approve`
- `tenant.payroll.close`
- `tenant.report.export`

### Platform Operator

- `platform.tenant.create`
- `platform.tenant.suspend`
- `platform.plan.assign`
- `platform.support.manage`
- `platform.security.review`

## 민감 액션 분류

- 급여 마감
- 문서 원문 다운로드
- 관리자 권한 부여
- 운영자 긴급 권한 승인
- 정책 비활성화
- 테넌트 중지/복구

이 항목들은 공통적으로:

- 별도 경고 UI
- 사유 입력
- 감사 로그
- 필요 시 이중 승인

## UX 설계 원칙

- 권한이 없으면 메뉴를 단순 숨김 처리하는 것만으로 끝내지 않는다.
- 접근 불가 이유를 사용자가 이해할 수 있어야 한다.
- 같은 화면 안에서도 read 권한과 action 권한은 분리해서 보여준다.
- 권한 부여/회수는 조직이 추적할 수 있게 히스토리 중심으로 설계한다.

## 연결 문서

- 멀티테넌시 경계: [WI-PC-001-multitenancy-tenant-boundaries.md](./WI-PC-001-multitenancy-tenant-boundaries.md)
- 감사/보안 운영: [WI-PC-005-audit-security-ux.md](./WI-PC-005-audit-security-ux.md)
- Tenant 권한 상세: [WI-TA-007-settings-role-permission.md](../tenant-admin/WI-TA-007-settings-role-permission.md)
