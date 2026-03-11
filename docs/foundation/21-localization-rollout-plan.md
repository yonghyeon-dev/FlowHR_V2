# FlowHR_V2 로컬라이제이션 전체 적용 계획

## 작업 ID

- `WI-DM-006`

## 목적

현재 정의된 `LID-*` 전략과 리소스 구조를 실제 와이어와 앱 구현에
어떤 순서로 적용할지 정리한다.

## 현재 상태

### 완료된 항목

- `LID-{ROLE}-{MODULE}-{SEMANTIC_KEY}` 규칙 정의
- `wireframes/shared/i18n.js` 추가
- `src/i18n/locales/ko`, `src/i18n/locales/en` 시드 리소스 생성
- Platform 핵심 화면 4종과 일부 코어 화면에 `LID-*` 적용

### 남은 항목

- Tenant Admin 상세 화면 전체 적용
- Tenant Employee 상세 화면 전체 적용
- 공통 상태 문구의 `common.json` 이관
- 실제 앱 라우트 기준 lazy load 구조 연결

## 적용 범위

### 1차 적용

- `Platform` 핵심 4화면
- `Tenant Admin Home`
- `Tenant Employee Home`

### 2차 적용

- `People`
- `Attendance`
- `Leave`
- `Workflow`
- `Documents`

### 3차 적용

- `Payroll`
- `Performance`
- `Recruiting`
- `Reports`
- `Settings`

## 마이그레이션 순서

### Step 1. Wireframe Catalog 정리

- inline catalog에 있는 키를 namespace 기준으로 분류
- 중복 키 제거
- `common`, `platform`, `tenant-admin`, `tenant-employee`, `domain`로 재배치

### Step 2. Admin / Employee 상세 화면 전환

- 정적 텍스트를 `data-lid`로 치환
- 배지, 필터, 테이블 헤더, empty/error 문구까지 포함
- `?lang=ko`, `?lang=en`으로 검증

### Step 3. Shared Resource화

- 와이어용 inline catalog를 최종적으로 shared JSON 기반으로 옮길 수 있게 키 카탈로그 정리
- 실제 앱은 inline catalog를 사용하지 않음

### Step 4. App Integration

- `src/i18n/core/locale.ts`
- `src/i18n/core/formatter.ts`
- `src/i18n/core/catalog-loader.ts`
- route 진입 시 role namespace lazy load

## 화면별 적용 우선순위

| 우선순위 | 화면/모듈 | 이유 |
|---|---|---|
| P0 | `PC-*`, `TA-001`, `TE-001`, `TE-002` | 코어 진입 화면 |
| P1 | `TA-101`~`TA-304`, `TE-201`~`TE-402` | 일상 운영/셀프서비스 핵심 |
| P2 | `TA-501`~`TA-1005`, `TA-701`~`TA-904` | 확장 모듈 |

## 검증 기준

- 모든 사용자 가시 텍스트는 `data-lid` 또는 리소스 키로 연결
- `ko/en` 전환 시 핵심 제목, 버튼, 배지, empty/error 문구가 바뀜
- 숫자/날짜/통화는 하드코딩이 아니라 formatter를 사용
- 누락 키는 개발 환경에서 바로 드러남

## 완료 판정 기준

- P0, P1 화면이 `LID-*` 기반으로 동작
- 시드 리소스가 화면별 namespace로 정리됨
- 실제 앱용 로더 구조가 정의됨
- 공통 상태 문구가 `common.json`으로 이동

## 다음 단계

1. 코어 화면 승인 로그 작성
2. 최종 승인 패스 기준 정의
3. 로컬라이제이션 적용 현황을 화면 준비도 매트릭스에 반영

## 연결 문서

- 전략: [06-localization-strategy.md](./06-localization-strategy.md)
- 리소스 구조: [07-localization-resource-architecture.md](./07-localization-resource-architecture.md)
- 요구사항 추적: [16-requirement-traceability.md](./16-requirement-traceability.md)
