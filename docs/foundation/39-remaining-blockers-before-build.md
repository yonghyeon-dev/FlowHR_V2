# FlowHR_V2 구현 전 남은 블로커

## 목적

지금 시점에서 구현을 막는 요소가 무엇인지 한 장으로 고정하기 위한 문서다.

## 결론

현재 남은 핵심 블로커는 `사용자 승인`이다.
설계 문서, 라우트 구조, 컴포넌트 인벤토리, API 계약, i18n 구조는 구현 연결 기준으로 정리돼 있다.

## 남은 블로커

### 1. Office Pack 번들 승인

- 로그: [APP-BUNDLE-OFFICE-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-BUNDLE-OFFICE-001.md)
- 영향 범위: `Sprint 1`

### 2. Retail Pack 번들 승인

- 로그: [APP-BUNDLE-RETAIL-001.md](/C:/Team-jane/FlowHR_V2/docs/foundation/approvals/APP-BUNDLE-RETAIL-001.md)
- 영향 범위: `Sprint 2`

### 3. Office / Retail 코어 화면 승인 반영

- 대상:
  - `TA-201`
  - `TA-301`
  - `TA-401`
  - `TA-501`
  - `TE-001/002`
  - `TE-201`
  - `TE-401`

## 이미 해소된 블로커

- Platform Console 승인
- Platform Risk-first 번들 승인
- Pack 기반 승인 체계 정리
- 구현 스프린트 재정렬
- i18n 핵심 와이어 적용

## 승인 완료 후 바로 하는 일

1. `Office Pack` 구현 착수
2. `Retail Pack` 구현 착수
3. 승인 반영 내용을 readiness 문서에 갱신

## 연결 문서

- [12-implementation-readiness-checklist.md](./12-implementation-readiness-checklist.md)
- [37-one-shot-approval-matrix.md](./37-one-shot-approval-matrix.md)
- [38-pack-implementation-handoff.md](./38-pack-implementation-handoff.md)
