# FlowHR_V2 Pack 기반 리뷰 순서

## 목적

업종 팩 기준으로 재설계한 화면들을 어떤 순서로 검토할지 고정하기 위한 문서다.

## 리뷰 원칙

- 화면 단위가 아니라 `Pack + 사용자 흐름` 단위로 본다.
- 같은 Pack 안에서 관리자와 직원 흐름이 연결되는지 먼저 본다.
- 한 Pack이 정리되기 전에는 다른 Pack 승인을 확정하지 않는다.

## 1. Office Pack

### Tenant Admin

1. `TA-001` Office Home
2. `TA-201` Office Attendance
3. `TA-401` Office Workflow
4. `TA-501` Office Documents
5. `TA-301` Office Leave

검토 질문:

- 승인, 문서, 근태 예외, 휴가 흐름이 하나의 운영 시나리오로 이어지는가
- 오피스형 조직에서 먼저 처리해야 할 일의 우선순위가 맞는가

### Tenant Employee

1. `TE-001/002` Office Employee Home
2. `TE-201` Office Request Hub
3. `TE-401` Office Signature Inbox

검토 질문:

- 요청, 서명, 일정 확인이 하나의 직원 셀프서비스 흐름으로 이어지는가
- 관리자 흐름과 충돌 없이 연결되는가

## 2. Retail Pack

### Tenant Admin

1. `TA-001` Retail Home
2. `TA-201` Retail Attendance
3. `TA-401` Retail Workflow
4. `TA-501` Retail Documents
5. `TA-301` Retail Leave

검토 질문:

- 결원, 커버리지, 브레이크, 오버타임, 정산 전 예외가 우선순위대로 보이는가
- 매장형 운영자가 즉시 조치할 수 있는 구조인가

### Tenant Employee

1. `TE-001/002` Retail Employee Home
2. `TE-201` Retail Request Hub
3. `TE-401` Retail Signature Inbox

검토 질문:

- 오늘 근무, 체크인, 시프트 변경 응답, 필수 서명 확인이 자연스럽게 이어지는가

## 3. Platform

1. `PC-001` Risk-first Platform Console

검토 질문:

- 운영 리스크가 우선순위대로 읽히는가
- 모든 신호가 상태와 액션으로 연결되는가

## 권장 리뷰 순서

1. `BUNDLE-OFFICE-CORE`
2. `BUNDLE-RETAIL-CORE`
3. `BUNDLE-PLATFORM-RISK-FIRST`

## 연결 문서

- [29-approval-review-packet.md](./29-approval-review-packet.md)
- [34-approval-reset-plan.md](./34-approval-reset-plan.md)
