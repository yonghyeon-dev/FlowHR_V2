# FlowHR_V2 정보구조 v1

## 최상위 구조

### A. Platform Console

- Dashboard
- Tenants
- Plans & Billing
- Policy Templates
- Support Ops
- Monitoring
- Audit & Security
- Platform Settings

### B. Tenant Admin

- Home
- People
- Attendance
- Leave
- Workflow
- Documents
- Payroll
- Performance
- Recruiting
- Reports
- Settings

### C. Tenant Employee

- Home
- Schedule
- Requests
- Inbox
- Documents
- My Profile

## 상세 분류 원칙

- 대분류: 제품 모듈
- 중분류: 사용자가 접근하는 1차 메뉴/허브
- 소분류: 화면 묶음
- 상세분류: 실제 화면 또는 세부 기능

## 예시

### Tenant Admin > Attendance

- 대분류: Attendance
- 중분류: Dashboard / Shift Board / Records / Exceptions / Closing
- 소분류: 일별 현황, 주간 스케줄, 정정 요청, 예외 분류, 마감 큐
- 상세분류: 부서별 출근율, 누락 체크아웃 목록, 초과근무 경고, 정산 연계 검토

### Tenant Employee > Requests

- 대분류: Requests
- 중분류: New Request / Leave / Correction / Expense / History
- 소분류: 요청 유형 선택, 입력 폼, 결재 상태 조회
- 상세분류: 연차 신청, 출근 누락 정정, 일반 품의, 요청 취소

## 공통 IA 원칙

- `Platform`과 `Tenant`는 같은 정보구조 트리에 섞지 않는다.
- `Tenant Admin`과 `Tenant Employee`는 목적이 다르므로 메뉴 체계를 공유하지 않는다.
- 같은 모듈 안에서도 조회 화면과 처리 화면을 구분한다.
- 설정은 마지막에 두되, 운영 중 자주 쓰는 권한/정책/알림은 깊게 숨기지 않는다.
