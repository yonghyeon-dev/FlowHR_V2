# FlowHR_V2 UI SSOT 매핑

## 목적

이 문서는 `flowhr-ui`를 화면 SSOT로 사용하면서, 실제 Next 구현이 어떤 파일과 어떤 라우트로 연결되는지 고정하기 위한 문서다.

## 규칙

1. 화면 구조와 시각 기준은 `flowhr-ui`를 먼저 본다.
2. 코드는 화면을 먼저 바꾸지 않는다.
3. `flowhr-ui`에 없는 새 화면은 코드가 아니라 먼저 `flowhr-ui`에 추가한다.
4. 하나의 라우트는 하나의 SSOT 소스 파일과 매핑한다.

## 현재 매핑 기준

코드 기준 매핑 파일:
- [ui-ssot.ts](C:\Team-jane\FlowHR_V2\src\lib\ui-ssot.ts)

라우트 매핑 요약:
- `/` -> `flowhr-ui/landing.html`
- `/login` -> `flowhr-ui/login.html`
- `/platform/console` -> `flowhr-ui/platform/console.html`
- `/admin/*` -> `flowhr-ui/admin/*.html`
- `/employee/*` -> `flowhr-ui/employee/*.html`

## 플랫폼 화면 처리 규칙

현재 `flowhr-ui/platform`에는 `console.html` 하나만 있다.

- `/platform/console` -> 원본 직접 렌더링
- `/platform/*` 확장 경로 -> `console`로 정렬

즉 플랫폼은 코드가 별도 화면을 해석해서 만들지 않는다.

## 현재 적용 상태

- 관리자/직원 화면은 각 원본 HTML을 직접 렌더링한다.
- 플랫폼도 `console.html` 원본을 직접 렌더링한다.
- 이후 UI 변경은 [ui-ssot.ts](C:\Team-jane\FlowHR_V2\src\lib\ui-ssot.ts)와 함께 반영한다.
