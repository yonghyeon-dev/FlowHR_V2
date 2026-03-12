# FlowHR_V2 와이어프레임 제어 항목 분류

## 목적

이 문서는 `flowhr-ui` 화면의 제어 항목을 프로덕션 전환 관점에서 분류하는 1차 기준이다.

분류는 아래 세 가지다.

- `real_navigation`
  - 실제 라우트 이동으로 연결해야 하는 항목
- `real_operation`
  - 실제 서버 동작이나 CRUD로 치환해야 하는 항목
- `remove_wireframe_behavior`
  - 와이어프레임 단계에서만 의미가 있었고 프로덕션에서는 제거해야 하는 항목

## 공통 규칙

- 필터 칩, 탭, 페이지네이션은 시각 반응만 주는 가짜 동작으로 구현하지 않는다.
- `상세`, `보기`, `편집` 버튼은 임시 드로어나 임시 토스트로 처리하지 않는다.
- `추가`, `생성`, `발송`, `대기`, `확인`, `반려`, `종료` 버튼은 모두 실제 operation으로 연결한다.
- 설명용 앵커 링크나 데모용 버튼은 프로덕션에서 제거하거나 실제 navigation으로 대체한다.

## Platform

### `platform/console.html`

- 사이드 메뉴
  - 분류: `real_navigation`
- 리포트 보기 / CSV 내보내기 / 감사 로그 내보내기
  - 분류: `real_operation`
- 테넌트 추가 / 플랜 변경 / 일시 중지 / 관리자 콘솔 접속
  - 분류: `real_operation`
- 즉시 확인 / 조치 / 검토 / 배정 / 응답
  - 분류: `real_operation`
- 필터 칩
  - 분류: `real_operation`
- 탭 전환
  - 분류: `remove_wireframe_behavior`
  - 이유: 현재는 같은 화면 안 데모용 전환이므로 실제 섹션 또는 라우트로 재정의되기 전까지 임시 동작을 두지 않는다.

## Tenant Admin

### `admin/home.html`

- 사이드 메뉴
  - 분류: `real_navigation`
- 내보내기 / 빠른 등록
  - 분류: `real_operation`
- 대기열 카드 액션
  - 분류: `real_operation`
- 예외 모니터링 상세 / 문서함 / 급여 관리
  - 분류: `real_navigation`

### `admin/people.html`

- 검색 / 필터 / 페이지네이션
  - 분류: `real_operation`
- 직원 상세
  - 분류: `real_navigation`
- 근태 기록 / 휴가 이력 / 급여 명세 / 1:1 예약
  - 분류: `real_navigation` 또는 `real_operation`

### `admin/attendance.html`

- 주간 이동 / 필터 / 내보내기
  - 분류: `real_operation`
- 기록 수정 / 보정 / 알림
  - 분류: `real_operation`

### `admin/leave.html`

- 휴가 부여 / 정책 추가 / 정책 편집
  - 분류: `real_operation`
- 승인 / 반려
  - 분류: `real_operation`

### `admin/workflow.html`

- 상태 필터
  - 분류: `real_operation`
- 승인 / 반려 / 상향 결재
  - 분류: `real_operation`

### `admin/documents.html`

- 템플릿 관리
  - 분류: `real_navigation`
- 문서 발송 / 템플릿 편집 / 다운로드 / 리마인드 / 재발송
  - 분류: `real_operation`

### `admin/payroll.html`

- 급여 데이터 내보내기 / 마감 시작 / 규칙 추가 / 명세서 발송
  - 분류: `real_operation`

### `admin/performance.html`

- 평가 리포트 / 평가 주기 생성 / 미리보기 / 리마인드 / 1:1 예약
  - 분류: `real_operation`

### `admin/recruiting.html`

- 공고 생성 / 파이프라인 이동 / 후보자 상세 / 오퍼 발송
  - 분류: `real_operation`

### `admin/reports.html`

- 필터 / 기간 변경 / export
  - 분류: `real_operation`

### `admin/settings.html`

- 설정 탭
  - 분류: `real_navigation`
- 저장 / 취소
  - 분류: `real_operation`

## Tenant Employee

### `employee/home.html`

- 사이드 메뉴
  - 분류: `real_navigation`
- 출근 / 퇴근 / 휴가 요청 / 정정 요청
  - 분류: `real_operation`
- 문서 카드의 서명하기 / 작성 / 확인
  - 분류: `real_navigation` 또는 `real_operation`

### `employee/schedule.html`

- 출근 / 퇴근 / 필터 / 전체 보기
  - 분류: `real_operation`, `real_navigation`

### `employee/requests.html`

- 요청 유형 카드
  - 분류: `real_operation`
- 요청하기 / 임시 저장 / 취소
  - 분류: `real_operation`
- 요청 이력 필터 / 취소 / 재신청 / 상세
  - 분류: `real_operation`

### `employee/inbox.html`

- 읽음 / 상세 / 바로가기
  - 분류: `real_operation`, `real_navigation`

### `employee/documents.html`

- 서명 / 보기 / 다운로드
  - 분류: `real_operation`

### `employee/profile.html`

- 개인정보 편집 / 저장 / 취소
  - 분류: `real_operation`

## 다음 즉시 작업

1. `wireframe-screen.tsx`에 남아 있는 와이어프레임 전용 임시 상호작용 제거
2. `real_navigation`만 실제 라우트 이동으로 유지
3. `real_operation`을 화면별 실제 서버 액션으로 치환
