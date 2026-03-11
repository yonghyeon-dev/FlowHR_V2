# FlowHR_V2 로컬라이제이션 리소스 구조

## 목적

[06-localization-strategy.md](./06-localization-strategy.md)가 번역 원칙을 정의했다면,
이 문서는 실제 구현 단계에서 번역 리소스를 어떤 구조로 저장하고 불러올지 정리한다.

## 권장 구조

```text
src/i18n/
  core/
    locale.ts
    formatter.ts
    catalog-loader.ts
  locales/
    ko/
      common.json
      platform.json
      tenant-admin.json
      tenant-employee.json
      domain.json
    en/
      common.json
      platform.json
      tenant-admin.json
      tenant-employee.json
      domain.json
```

## 파일 분리 원칙

- `common.json`: 공통 버튼, 상태 배지, 에러, 확인 문구
- `platform.json`: `WI-PC-*` 화면과 운영자 전용 문구
- `tenant-admin.json`: `WI-TA-*` 관리자 문구
- `tenant-employee.json`: `WI-TE-*` 직원 문구
- `domain.json`: 정책 규칙, 시스템 메시지, 공통 도메인 용어

## 키 소유 규칙

- 공통 컴포넌트가 반복 사용하는 키는 `common` 소유로 올린다.
- 특정 권한 레이어에서만 쓰는 키는 해당 namespace에 둔다.
- 하나의 키를 여러 namespace에 중복 생성하지 않는다.
- 같은 의미를 다른 문맥에서 재사용할 때도 번역 차이가 크면 별도 키로 분리한다.

## 예시 구조

### `common.json`

```json
{
  "LID-COMMON-STATE-EMPTY_TITLE": "표시할 항목이 없습니다",
  "LID-COMMON-ACTION-RETRY": "다시 시도",
  "LID-COMMON-STATUS-CRITICAL": "긴급"
}
```

### `platform.json`

```json
{
  "LID-PC-BILL-QUEUE_TITLE": "Billing Risk Queue",
  "LID-PC-SEC-NOTE_TITLE": "핵심 확인 포인트"
}
```

## 런타임 로딩 방식

- 앱 시작 시 `common`은 항상 로드한다.
- 권한 레이어 진입 시 해당 namespace를 추가 로드한다.
- 페이지 코드 분할이 있다면 라우트 단위 lazy load를 허용한다.
- fallback은 `ko/en` 간 직접 fallback이 아니라 `common -> role -> page` 순 구조를 우선한다.

## 번역 누락 처리

- 개발 환경에서는 누락 키를 즉시 노출한다.
- 운영 환경에서는 fallback locale과 누락 로그 수집을 함께 사용한다.
- 누락 키를 빈 문자열로 삼키지 않는다.

## 변수와 포맷팅

- 숫자, 날짜, 시간, 통화는 런타임 formatter에서 처리한다.
- 번역 리소스에는 원시 포맷 문자열만 둔다.

예:

```json
{
  "LID-COMMON-COUNT-PENDING": "{count} pending items"
}
```

## 구현 연결 기준

- 와이어에서는 inline catalog를 허용했지만, 실제 앱 구현에서는 inline catalog를 사용하지 않는다.
- 실제 앱은 namespace 분리와 lazy load가 가능한 JSON 또는 typed resource 구조를 사용한다.
- lint 규칙이나 테스트로 중복 키, 누락 키, 미사용 키를 점검한다.

## 연결 문서

- 번역 원칙: [06-localization-strategy.md](./06-localization-strategy.md)
- 공통 상태 패턴: [WI-DS-006-common-state-patterns.md](../design-system/WI-DS-006-common-state-patterns.md)
