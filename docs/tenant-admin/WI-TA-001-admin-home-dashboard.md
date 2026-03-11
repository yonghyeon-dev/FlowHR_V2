# WI-TA-001 Admin Home Dashboard 상세 설계

## 작업 ID

- `WI-TA-001`

## 변경 배경

기존 `TA-001`은 모든 업종을 하나의 관리자 홈으로 수용하려는 범용 대시보드였다.
하지만 목표 수렴 재검토 결과, `Tenant Admin`의 첫 화면은 업종 팩에 따라
우선순위와 행동이 크게 달라지므로 단일 와이어로 유지하면 품질이 떨어진다.

따라서 `WI-TA-001`은 이제 `공통 관리자 홈`이 아니라
`업종 팩별 관리자 홈 변형`을 설계하는 작업으로 재정의한다.

## 현재 설계 범위

### Variant A. Office Pack Admin Home

대상:

- IT / SaaS / 스타트업
- 본사형 사무직 조직

핵심 목적:

- 승인 적체
- 문서/계약 병목
- 유연근무 예외
- 휴가/성과 후속 작업

핵심 결정:

- 오늘 어떤 승인과 문서를 먼저 처리할 것인가
- 어떤 예외가 운영 병목을 만들고 있는가
- 어떤 팀이 유연근무/휴가로 결원 리스크를 안고 있는가

산출물:

- [admin-home-office.html](../../wireframes/tenant-admin/admin-home-office.html)

### Variant B. Retail Pack Admin Home

대상:

- 외식
- 리테일
- 프랜차이즈
- 다지점 서비스업

핵심 목적:

- 매장별 결원
- 피크타임 커버리지
- 브레이크/오버타임 위반
- 대체 배치와 급여 반영 전 예외

핵심 결정:

- 오늘 어느 매장에서 결원이 생기는가
- 어느 시간대의 커버리지가 부족한가
- 어떤 근태 예외가 정산 오류를 만들 수 있는가

산출물:

- [admin-home-retail.html](../../wireframes/tenant-admin/admin-home-retail.html)

## 공통 설계 원칙

- 관리자 홈은 `숫자 요약`이 아니라 `즉시 처리할 운영 대기열`이어야 한다
- 모든 핵심 구역은 다음 액션과 연결되어야 한다
- 업종 팩에 따라 `첫 줄 KPI`, `우선 큐`, `메뉴 순서`가 달라져야 한다
- 공통 구조를 억지로 맞추기보다, 업종별로 더 자주 하는 결정을 먼저 노출해야 한다

## Office Pack 화면 구역

### Zone A. Action KPI

- 오늘 승인 필요
- SLA 지연 승인
- 서명 대기
- 만료 임박 계약
- 정정 요청

### Zone B. Decision Queue

- 법적/문서 리스크
- 승인 적체
- 유연근무 예외
- 팀 결원 신호

### Zone C. Approval / Document Split

- 승인 유형별 병목
- 문서 유형별 병목
- 재발송/재지정 필요 항목

### Zone D. Team Risk Snapshot

- 팀별 결원
- 원격/휴가 집중
- 승인 대기 과다 팀

## Retail Pack 화면 구역

### Zone A. Coverage KPI

- 오늘 결원 매장
- 피크타임 부족 슬롯
- 브레이크 위반 위험
- 오버타임 임박
- 정산 전 확인 예외

### Zone B. Store Action Queue

- 결원 발생 매장
- 대체 배치 필요
- 출근 누락
- 피크타임 공백

### Zone C. Coverage Board

- 매장별 커버리지
- 시간대별 부족 인원
- 매장별 위험 레벨

### Zone D. Compliance / Payroll Watch

- 브레이크 위반
- 오버타임 위험
- 급여 반영 전 예외
- 현장 승인 병목

## 연결 문서

- 업종 세분화: [31-industry-segmentation.md](../foundation/31-industry-segmentation.md)
- 업종 팩 및 기능 선택: [32-industry-pack-feature-selection.md](../foundation/32-industry-pack-feature-selection.md)
- 역할별 의사결정 시나리오: [33-role-decision-scenario-map.md](../foundation/33-role-decision-scenario-map.md)
