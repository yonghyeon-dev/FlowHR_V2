# FlowHR_V2 R5 대상 화면 재판정

## 작업 ID

- `WI-DM-011`

## 목적

[14-screen-readiness-matrix.md](./14-screen-readiness-matrix.md)를 기준으로
어떤 화면과 번들이 `R5 candidate`인지, 무엇이 `R5` 확정인지 재판정한다.

## R5 판정 규칙

- Bundle 로그 또는 Screen 로그가 존재해야 한다
- 필요한 승인 로그의 `decision`이 `approved`여야 `R5`다
- Screen이 `approved`여도 관련 Bundle이 `hold`면 `R5 candidate`다
- Pack 변형이 필요한 화면은 해당 변형이 존재해야 한다

## 현재 판정

### Bundle: R5

- `BUNDLE-PLATFORM-RISK-FIRST`

### Bundle: R5 candidate

- `BUNDLE-OFFICE-CORE`
- `BUNDLE-RETAIL-CORE`

사유:

- 번들 승인 로그는 존재
- 사용자 최종 결정은 아직 없음

### Screen: R5

- `PC-001`

사유:

- Screen 승인 완료
- 관련 Bundle 승인 완료

### Screen: R5 candidate

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
- API, i18n, 상태 기준 존재
- 일부는 Screen 승인 완료지만 관련 Bundle이 아직 `hold`

## 다음 액션

1. Office Pack 번들 검토
2. Retail Pack 번들 검토
3. 승인 결과에 맞춰 `TA-001` 외 코어 화면도 승격 검토

## 연결 문서

- [14-screen-readiness-matrix.md](./14-screen-readiness-matrix.md)
- [22-final-approval-pass-criteria.md](./22-final-approval-pass-criteria.md)
- [29-approval-review-packet.md](./29-approval-review-packet.md)
