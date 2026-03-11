# FlowHR_V2 최종 승인 패스 기준

## 작업 ID

- `WI-DM-008`

## 목적

코어 화면과 설계 묶음을 어떤 기준으로 `approved`까지 올릴지 고정한다.
이 문서는 승인 로그의 decision을 바꿀 때 사용하는 체크리스트다.

## 승인 대상

- 화면 단위 승인
- 모듈 묶음 승인
- 구현 진입 승인

## 1. Screen Approval 기준

아래가 모두 충족되면 `APP-SCREEN-*`를 `approved`로 변경할 수 있다.

- 화면 목적이 한 줄로 명확하다
- 핵심 CTA가 1순위로 보인다
- 권한 노출이 올바르다
- `loading`, `empty`, `error`, `no-permission` 상태가 정의돼 있다
- 다국어 전환 기준이 있다
- 후속 상세 화면/행동으로의 연결이 자연스럽다

## 2. Bundle Approval 기준

아래가 모두 충족되면 `APP-BUNDLE-*`를 `approved`로 변경할 수 있다.

- 같은 모듈의 주요 화면이 모두 정의돼 있다
- 화면 사이의 데이터 흐름이 이어진다
- 공통 컴포넌트와 상태 패턴이 일관된다
- API 계약 초안이 화면 요구를 커버한다
- 승인 로그에서 치명적 `changes_requested`가 없다

## 3. Implementation Readiness Approval 기준

아래가 모두 충족되면 `APP-READY-*`를 `approved`로 변경할 수 있다.

- Stage 3 완료
- Stage 4 완료 수준의 핵심 화면 확보
- Stage 5 완료
- Stage 6의 핵심 산출물 확보
- 코어 화면 승인 로그 존재
- API / i18n / 상태 / 권한 기준이 서로 충돌하지 않는다

## 4. Decision Rule

### approved

- 즉시 다음 단계 이동 가능

### changes_requested

- 구조적 수정 필요
- 같은 단계 유지

### hold

- 사용자 명시 승인 또는 선행 문서가 없음
- 보류 상태 유지

## 5. Core Screen Pass Set

1차 코어 화면 승인 세트:

- `PC-001`
- `TA-001`
- `TE-001`
- `TE-002`
- `TA-201`
- `TE-201`

## 6. 운영 규칙

- `approved`는 사용자 명시 컨펌 또는 그에 준하는 결정 없이는 올리지 않는다.
- `hold`는 미완료가 아니라, 결정을 기다리는 상태다.
- `changes_requested`가 있으면 이유와 follow-up을 반드시 기록한다.

## 연결 문서

- 승인 로그 체계: [19-approval-log-framework.md](./19-approval-log-framework.md)
- 화면 준비도 매트릭스: [14-screen-readiness-matrix.md](./14-screen-readiness-matrix.md)
- 요구사항 추적: [16-requirement-traceability.md](./16-requirement-traceability.md)
