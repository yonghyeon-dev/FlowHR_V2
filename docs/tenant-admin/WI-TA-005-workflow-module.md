# WI-TA-005 Workflow 모듈 상세 설계

## 작업 ID

- `WI-TA-005`

## 변경 배경

기존 Workflow 모듈은 결재 인박스와 상세 문맥을 잘 묶었지만,
어떤 문서와 요청이 주로 몰리는지는 업종에 따라 다르다.

따라서 `WI-TA-005`는 범용 결재 인박스가 아니라
`업종 팩별 Approval Inbox 변형`을 설계하는 작업으로 재정의한다.

## 현재 설계 범위

### Variant A. Office Pack Approval Inbox

대상:

- 휴가
- 일반 품의
- 문서 승인
- 비용 승인

핵심 목적:

- 승인 적체
- SLA 지연
- 문서/계약 승인
- 반려 / 재지정

핵심 결정:

- 어떤 승인 병목을 오늘 먼저 풀어야 하는가
- 어떤 문서/품의가 법적 또는 운영 리스크를 만드는가

산출물:

- [workflow-office.html](../../wireframes/tenant-admin/workflow-office.html)

### Variant B. Retail Pack Approval Inbox

대상:

- 출퇴근 정정
- 시프트 변경 승인
- 초과근무 승인
- 현장 예외 승인

핵심 목적:

- 근무 관련 승인 우선 처리
- 당일 운영 영향이 큰 요청 우선
- 정산 전 승인 병목 제거

핵심 결정:

- 어떤 근무 승인 건이 오늘 운영과 정산을 막고 있는가
- 어떤 요청은 즉시 조치가 필요한가

산출물:

- [workflow-retail.html](../../wireframes/tenant-admin/workflow-retail.html)

## 공통 설계 원칙

- 인박스는 단순 리스트가 아니라 우선순위 보드여야 한다
- 상세 문맥은 승인자가 바로 결론을 내릴 수 있게 충분해야 한다
- 업종 팩에 따라 요청 유형과 위험 기준이 달라져야 한다
