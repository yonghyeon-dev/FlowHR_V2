# FlowHR_V2 R5 대상 화면 재판정

## 작업 ID

- `WI-DM-011`

## 목적

[14-screen-readiness-matrix.md](./14-screen-readiness-matrix.md)의 `R5` 기준을 실제 화면에 적용했을 때,
어떤 화면이 `R5 candidate`이고 어떤 화면이 아직 `R4`에 머무는지 재판정한다.

## R5 판정 규칙

- 승인 로그가 존재해야 한다
- 승인 로그 decision이 `approved`여야 한다
- API, i18n, 상태 기준이 화면에 연결돼 있어야 한다
- 구현 진입 시 필요한 핵심 문서 링크가 있어야 한다

즉, `hold`는 `R5 candidate`이지 `R5 확정`이 아니다.

## 현재 판정

### R5 candidate

- `PC-001`
- `TA-001`
- `TA-101`
- `TA-201`
- `TA-301`
- `TA-401`
- `TA-501`
- `TA-601`
- `TA-701`
- `TA-1001`
- `TE-001`
- `TE-002`
- `TE-102`
- `TE-201`
- `TE-401`

사유:

- 승인 로그 존재
- 상태/예외 기준 존재
- API 또는 화면 기준 문서 존재
- 다만 사용자의 최종 decision이 아직 없음

### R5 확정 화면

- 현재 없음

사유:

- 모든 코어 화면 승인 로그가 아직 `hold` 상태다.

### R4 유지 화면

- 승인 로그가 없는 나머지 화면
- 또는 i18n / API / 상태 기준이 일부만 연결된 화면

## 다음 액션

1. 사용자 리뷰를 반영해 `hold` 화면의 decision을 갱신
2. `approved`로 전환된 화면을 `R5`로 승격
3. 구현 진입 세트와 비핵심 화면을 분리해 승인 패스 운영

## 연결 문서

- 화면 준비도 매트릭스: [14-screen-readiness-matrix.md](./14-screen-readiness-matrix.md)
- 승인 로그 체계: [19-approval-log-framework.md](./19-approval-log-framework.md)
- 최종 승인 패스 기준: [22-final-approval-pass-criteria.md](./22-final-approval-pass-criteria.md)
