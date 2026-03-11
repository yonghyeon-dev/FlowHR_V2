# FlowHR_V2 프론트엔드 라우트 및 컴포넌트 구조 설계

## 목적

현재까지 만든 와이어와 권한 레이어를 실제 프론트엔드 앱 구조에 매핑하기 위한
기준을 정의한다. 이 문서는 디자인 산출물을 구현 단위로 연결하는 브리지 역할을 한다.

## 라우트 최상위 그룹

```text
/
  platform/*
  admin/*
  employee/*
  auth/*
```

## 라우트 그룹 원칙

- `platform/*`: SaaS 운영 조직 전용
- `admin/*`: 고객사 관리자 전용
- `employee/*`: 고객사 직원 셀프서비스 전용
- `auth/*`: 로그인, 초대, MFA, 세션 재인증

권한 레이어가 다르면 App Shell도 분리한다.

## 권장 디렉토리 구조

```text
src/
  app/
    platform/
    admin/
    employee/
    auth/
  components/
    common/
    platform/
    admin/
    employee/
  features/
    people/
    attendance/
    leave/
    workflow/
    documents/
    payroll/
    performance/
    recruiting/
    reports/
    platform-tenants/
    platform-billing/
    platform-security/
  shells/
    platform-shell/
    admin-shell/
    employee-shell/
```

## App Shell 기준

### Platform Shell

- 테넌트 메타 정보
- 운영 검색
- 경고/리뷰 큐 진입
- 보안/과금/지원 전용 내비게이션

### Admin Shell

- 회사 선택 / 법인 컨텍스트
- 조직 운영 탐색
- 인박스 / 알림 / 글로벌 검색

### Employee Shell

- 모바일 우선 탭 구조
- 상태 중심 홈 진입
- 요청 / 일정 / 인박스 빠른 접근

## 공통 컴포넌트와 기능 컴포넌트 구분

### `components/common`

- Button
- Badge
- EmptyState
- ErrorState
- ConfirmDialog
- FilterBar
- DataTable
- SidePanel

### `features/*`

- 도메인별 화면 로직
- 서버 상태 바인딩
- 폼과 테이블 조합
- 페이지별 액션 규칙

공통 컴포넌트는 도메인 정책을 몰라야 하고,
기능 컴포넌트는 도메인 규칙과 권한 판단을 안다.

## 페이지 조합 원칙

- `route = shell + page module + feature blocks`
- KPI, 큐, 인박스, 상세 패널은 page-level composition에서 조합한다.
- 데이터 패칭은 page entry 또는 feature boundary에서 시작한다.
- 모달과 드로어는 전역 상태보다 route-local 제어를 우선한다.

## 권한 가드 설계

- 라우트 진입 전 권한 레이어 검사
- 페이지 내부 액션은 세부 scope 재검사
- `no-permission` 상태는 라우트 레벨과 컴포넌트 레벨 모두 필요

## 와이어 매핑 예시

- `wireframes/platform/platform-console.html` -> `app/platform/dashboard`
- `wireframes/platform/audit-security-detailed.html` -> `app/platform/security`
- `wireframes/tenant-admin/admin-home-detailed.html` -> `app/admin/home`
- `wireframes/tenant-employee/employee-home-detailed.html` -> `app/employee/home`

## 연결 문서

- 화면 맵: [04-screen-map.md](./04-screen-map.md)
- 설계 진행 종합 보고서: [08-design-progress-report.md](./08-design-progress-report.md)
