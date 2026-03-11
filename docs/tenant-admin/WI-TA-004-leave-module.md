# WI-TA-004 Leave 모듈 상세 설계

## 작업 ID

- `WI-TA-004`

## 목적

Leave 모듈은 잔여 일수 조회가 아니라 `정책`, `캘린더`, `요청`, `승인`이 연결된 운영 모듈이어야 한다.

## 화면 구성

- `TA-301` Leave Dashboard
- `TA-302` Leave Policy Management
- `TA-303` Leave Calendar
- `TA-304` Leave Requests

## 핵심 UX

- Dashboard에서 잔여, 만료 예정, 승인 대기, 집중 사용 부서를 함께 본다.
- Policy 화면은 유형, 차감 규칙, 발생 규칙을 한눈에 비교하게 한다.
- Calendar는 개인/팀/조직 레벨 전환이 쉬워야 한다.
- Requests는 상태와 승인 병목을 기준으로 정렬한다.

## 관리 포인트

- 연차, 반차, 시간 단위 휴가
- 자동 발생 규칙
- 만료 예정 안내
- 휴가 집중 구간 경고

## 산출물

- Leave 와이어프레임: [leave-module-detailed.html](../../wireframes/tenant-admin/leave-module-detailed.html)
