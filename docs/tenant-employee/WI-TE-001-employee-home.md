# WI-TE-001 Employee Home / Mobile Home 상세 설계

## 작업 ID

- `WI-TE-001`

## 변경 배경

기존 `TE-001`, `TE-002`는 범용 셀프서비스 홈이었다.
하지만 업종별 시나리오를 다시 정리한 결과,
직원 첫 화면은 `무엇을 확인하러 들어오는가`가 업종에 따라 크게 달라진다.

따라서 `WI-TE-001`은 이제 `공통 직원 홈`이 아니라
`업종 팩별 직원 홈 / 모바일 홈 변형`을 설계하는 작업으로 재정의한다.

## 현재 설계 범위

### Variant A. Office Pack Employee Home

대상:

- 사무직 중심 조직
- 유연근무 / 승인 / 문서 / 휴가 사용 빈도가 높은 조직

핵심 목적:

- 오늘 처리할 요청
- 서명 필요 문서
- 일정 확인
- 잔여 휴가 / 내 요청 추적

핵심 결정:

- 오늘 내가 바로 처리해야 할 요청은 무엇인가
- 어떤 문서에 바로 서명해야 하는가
- 휴가나 일정과 충돌하는 일이 있는가

산출물:

- [employee-home-office.html](../../wireframes/tenant-employee/employee-home-office.html)

### Variant B. Retail Pack Employee Home

대상:

- 매장형 / 교대형 현장 직원

핵심 목적:

- 오늘 내 근무 시작/종료 확인
- 매장 / 시프트 변경 확인
- 체크인 / 체크아웃
- 정정 요청

핵심 결정:

- 오늘 내 근무 시간과 장소는 무엇인가
- 변경된 시프트가 있는가
- 지금 바로 체크인해야 하는가

산출물:

- [employee-home-retail.html](../../wireframes/tenant-employee/employee-home-retail.html)

## 공통 설계 원칙

- 직원 홈은 메뉴 진입점이 아니라 `오늘 행동 허브`여야 한다
- 홈의 첫 카드에는 가장 자주 하는 행동이 와야 한다
- 모바일은 데스크톱 축소판이 아니라 별도 의사결정 흐름으로 설계한다
- 업종 팩에 따라 홈의 첫 질문이 달라져야 한다

## Office Pack 구성

### Desktop

- 오늘 처리할 요청
- 서명 대기 문서
- 이번 주 일정
- 개인 요약

### Mobile

- 오늘 해야 할 일
- 빠른 요청
- 서명 필요 문서
- 휴가/잔여 현황

## Retail Pack 구성

### Desktop

- 오늘 시프트
- 체크인 상태
- 매장 변경 / 대체 근무
- 정정 / 요청

### Mobile

- 지금 체크인 / 체크아웃
- 오늘 시프트와 매장
- 변경 알림
- 정정 요청

## 연결 문서

- 업종 세분화: [31-industry-segmentation.md](../foundation/31-industry-segmentation.md)
- 역할별 의사결정 시나리오: [33-role-decision-scenario-map.md](../foundation/33-role-decision-scenario-map.md)
