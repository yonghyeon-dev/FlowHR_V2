# WI-TA-004 Leave 모듈 상세 설계

## 작업 ID

- `WI-TA-004`

## 변경 배경

기존 Leave 모듈은 정책, 캘린더, 요청, 촉진을 잘 묶었지만,
어떤 휴가 리스크를 먼저 봐야 하는지는 업종에 따라 다르다.

따라서 `WI-TA-004`는 범용 Leave Dashboard가 아니라
`업종 팩별 Leave Dashboard 변형`을 설계하는 작업으로 재정의한다.

## 현재 설계 범위

### Variant A. Office Pack Leave Dashboard

대상:

- 사무직 중심 조직

핵심 목적:

- 휴가 승인 적체
- 팀 캘린더 충돌
- 잔여/만료 리스크
- 촉진 대상

산출물:

- [leave-office.html](../../wireframes/tenant-admin/leave-office.html)

### Variant B. Retail Pack Leave Dashboard

대상:

- 매장형 / 다지점 운영 조직

핵심 목적:

- 휴가 승인으로 인한 매장 커버리지 공백
- 피크타임 휴가 충돌
- 대체 배치 필요 휴가

산출물:

- [leave-retail.html](../../wireframes/tenant-admin/leave-retail.html)

## 공통 설계 원칙

- Leave는 잔여 일수 조회가 아니라 운영 영향까지 보여야 한다
- 업종 팩에 따라 `충돌`의 의미가 달라져야 한다
