# WI-TA-005 Workflow 모듈 상세 설계

## 작업 ID

- `WI-TA-005`

## 목적

Workflow 모듈은 단순 결재함이 아니라 `인박스`, `상세 처리`, `규칙 설계`, `이력`까지
연결되는 운영 허브여야 한다.

## 화면 구성

- `TA-401` Approval Inbox
- `TA-402` Approval Detail
- `TA-403` Workflow Builder
- `TA-404` Approval History

## 핵심 UX

- Inbox는 긴급도와 마감 기준으로 정렬한다.
- Detail은 문서 맥락과 승인 액션을 같은 화면에 둔다.
- Builder는 HR 담당자가 읽을 수 있는 규칙 구조여야 한다.
- History는 감사 로그 성격을 일부 겸한다.

## 주요 액션

- 승인
- 반려
- 보류
- 재할당
- 재발송

## 산출물

- Workflow 와이어프레임: [workflow-module-detailed.html](../../wireframes/tenant-admin/workflow-module-detailed.html)
