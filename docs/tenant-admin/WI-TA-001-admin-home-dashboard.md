# WI-TA-001 Admin Home Dashboard 상세 설계

## 작업 ID

- `WI-TA-001`

## 목적

`Tenant Admin`의 첫 화면은 단순 통계판이 아니라 `전사 운영 관제 화면`이어야 한다.
사용자는 이 화면 하나만으로 오늘 처리해야 할 승인, 근태 예외, 문서 병목,
마감 리스크를 파악하고 바로 행동해야 한다.

## 주요 사용자

### Tenant Admin

- 전사 운영 상태 확인
- 리스크 우선 처리
- People / Attendance / Workflow / Documents / Payroll 진입

### Tenant Manager

- 담당 조직 단위 축소 버전 사용
- 팀 출근 상태, 휴가 일정, 승인 병목 확인

## 성공 기준

- 첫 진입 10초 안에 오늘의 우선 처리 항목이 읽힌다.
- 예외 상세 화면으로 1클릭 안에 이동할 수 있다.
- 승인/정정/재발송 같은 즉시 액션이 카드 단위로 제공된다.

## 화면 구역

### Zone A. Top Summary Bar

- 오늘 승인 필요 건수
- 체크아웃 누락 인원
- 초과근무 위험 인원
- 서명 대기 건수
- 마감 병목 건수

### Zone B. Today Queue

- 우선순위가 높은 작업 목록
- 예시:
  - 초과근무 한도 초과 예상
  - 체크아웃 누락
  - 휴가 승인 적체
  - 전자계약 미서명

정렬 기준:

1. 법규/정산 리스크
2. 당일 마감
3. 승인 병목
4. 일반 알림

### Zone C. Org Snapshot

- 부서별 출근율
- 부서별 위험 신호
- 부서별 승인 병목

### Zone D. Approval Funnel

- Draft
- Pending
- Escalated
- Done

### Zone E. Exception Monitor

- 지각
- 체크인 누락
- 체크아웃 누락
- 휴게 위반
- 초과근무 위험/초과

### Zone F. Documents & Payroll Watch

- 서명 대기
- 만료 예정 계약
- 정산 전 확인 필요
- 급여 마감 병목

## UI 원칙

- 첫 줄은 숫자 KPI보다 `행동 유도 KPI`여야 한다.
- 두 번째 줄은 `Today Queue`를 메인으로 둔다.
- 아래 영역에서 예외, 승인, 문서/급여 감시가 이어져야 한다.
- 모바일 축소판이 아니라 데스크톱 운영 화면으로 설계한다.

## 연결 화면

- Attendance Exceptions
- Approval Inbox
- Employee Directory
- Document Dashboard
- Payroll Closing

## 산출물

- 상세 와이어프레임: [admin-home-detailed.html](../../wireframes/tenant-admin/admin-home-detailed.html)
