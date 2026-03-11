# WI-TE-004 문서 서명 및 인박스 상세 설계

## 작업 ID

- `WI-TE-004`

## 목적

직원 인박스는 단순 알림 목록이 아니라 `확인`, `서명`, `승인 결과`, `공지`를
우선순위에 따라 처리하는 개인 작업 허브여야 한다.

## 대상 화면

- `TE-301` My Inbox
- `TE-302` Notification Detail
- `TE-401` Signature Inbox
- `TE-402` Document Viewer / Sign
- `TE-403` My Document Archive

## 핵심 UX

- 가장 먼저 처리해야 할 항목이 상단에 모여야 한다.
- 서명 요청은 일반 알림보다 높은 우선순위로 보여야 한다.
- 문서 상세 화면에서 내용 확인과 서명이 한 흐름으로 이어져야 한다.
- 완료 문서는 기록 보관과 재열람이 쉬워야 한다.

## 콘텐츠 분류

- 서명 요청
- 승인 결과
- 정책/공지 확인
- 리마인더
- 완료 문서 아카이브

## 주요 액션

- 열람
- 서명
- 보류 후 나중에 보기
- 다운로드
- 완료 문서 재확인

## 산출물

- 인박스/서명 와이어프레임: [signature-inbox-detailed.html](../../wireframes/tenant-employee/signature-inbox-detailed.html)
