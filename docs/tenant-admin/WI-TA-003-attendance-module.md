# WI-TA-003 Attendance 모듈 상세 설계

## 작업 ID

- `WI-TA-003`

## 변경 배경

기존 Attendance 모듈은 `실시간 운영`, `예외`, `마감`을 한 모듈로 엮는 방향 자체는 맞았지만,
업종별 운영 우선순위가 다르다는 점을 충분히 반영하지 못했다.

따라서 `WI-TA-003`은 이제 범용 근태 대시보드 1개가 아니라
`업종 팩별 Attendance Dashboard 변형`을 설계하는 작업으로 본다.

## 현재 설계 범위

### Variant A. Office Pack Attendance Dashboard

대상:

- 사무직 중심 조직
- 유연근무 / 휴가 / 승인 연계가 중요한 조직

핵심 목적:

- 누락 기록과 정정 요청
- 유연근무 / 원격근무 예외
- 휴가 승인과 팀 커버리지 충돌
- 마감 전 검토

핵심 결정:

- 어떤 근태 예외를 오늘 먼저 정리해야 하는가
- 어떤 팀이 재택/휴가로 운영 공백을 만들고 있는가
- 어떤 정정 요청이 마감을 지연시키는가

산출물:

- [attendance-office.html](../../wireframes/tenant-admin/attendance-office.html)

### Variant B. Retail Pack Attendance Dashboard

대상:

- 외식
- 리테일
- 매장형 운영 조직

핵심 목적:

- 결원 / 지점별 커버리지
- 브레이크 위반
- 오버타임 임박
- 체크인 누락과 정산 반영 전 예외

핵심 결정:

- 어느 매장에서 결원이 발생하고 있는가
- 어떤 시간대의 시프트 커버리지가 부족한가
- 어떤 예외가 급여 정산 위험으로 이어지는가

산출물:

- [attendance-retail.html](../../wireframes/tenant-admin/attendance-retail.html)

## 공통 설계 원칙

- Attendance는 기록 조회 화면이 아니라 운영 판단 화면이어야 한다
- 첫 줄은 단순 수치가 아니라 조치가 필요한 예외를 드러내야 한다
- `TA-204`, `TA-205`로 이어지는 액션이 명확해야 한다
- 업종 팩에 따라 예외의 우선순위와 Shift Board의 중요도가 달라진다

## Office Pack 초점

- 정정 요청
- 누락 기록
- 원격 / 유연근무 예외
- 휴가와 팀 커버리지 충돌
- 마감 전 정리 항목

## Retail Pack 초점

- 결원 매장
- 피크타임 부족 슬롯
- 브레이크 위반
- 오버타임 임박
- 체크인 누락
- 정산 전 확인 예외
