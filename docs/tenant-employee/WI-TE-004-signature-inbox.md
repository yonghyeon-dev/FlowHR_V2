# WI-TE-004 문서 서명 및 인박스 상세 설계

## 작업 ID

- `WI-TE-004`

## 변경 배경

기존 Signature Inbox는 우선순위 인박스 방향은 맞았지만,
업종별로 먼저 확인해야 할 문서 성격이 다르다.

따라서 `WI-TE-004`는 범용 Signature Inbox가 아니라
`업종 팩별 Signature Inbox 변형`을 설계하는 작업으로 재정의한다.

## 현재 설계 범위

### Variant A. Office Pack Signature Inbox

대상:

- 전자계약
- 정책 동의서
- 인사 문서

핵심 목적:

- 계약/정책 서명 우선 처리
- 승인 결과와 연결
- 완료 문서 보관

산출물:

- [signature-inbox-office.html](../../wireframes/tenant-employee/signature-inbox-office.html)

### Variant B. Retail Pack Signature Inbox

대상:

- 매장 운영 규정
- 현장 공지
- 입사/근무 관련 동의서

핵심 목적:

- 근무 현장 관련 문서 확인
- 매장별 공지/동의 우선 처리
- 운영 리마인드 처리

산출물:

- [signature-inbox-retail.html](../../wireframes/tenant-employee/signature-inbox-retail.html)

## 공통 설계 원칙

- 인박스는 일반 알림보다 행동이 필요한 문서를 먼저 보여야 한다
- 업종 팩에 따라 서명 우선순위와 문서 종류가 달라져야 한다
