# WI-TA-003 Attendance 모듈 상세 설계

## 작업 ID

- `WI-TA-003`

## 목적

Attendance 모듈은 기록 조회가 아니라 `실시간 운영`과 `마감 준비`를 함께 다뤄야 한다.
현황, 스케줄, 기록, 예외, 마감을 하나의 모듈 안에서 다뤄야 한다.

## 화면 구성

- `TA-201` Attendance Dashboard
- `TA-202` Shift Board
- `TA-203` Attendance Records
- `TA-204` Attendance Exceptions
- `TA-205` Attendance Closing

## 핵심 UX

- 대시보드는 오늘의 예외와 위험 신호를 우선 노출한다.
- Shift Board는 캘린더가 아니라 운영 보드처럼 보여야 한다.
- Records는 정정과 승인 흐름이 붙어 있어야 한다.
- Exceptions는 유형별 우선순위 정렬이 되어야 한다.

## 예외 유형

- 지각
- 조퇴
- 체크인 누락
- 체크아웃 누락
- 휴게 위반
- 연속 야간근무
- 초과근무 임박 / 초과

## 산출물

- Attendance 와이어프레임: [attendance-module-detailed.html](../../wireframes/tenant-admin/attendance-module-detailed.html)
