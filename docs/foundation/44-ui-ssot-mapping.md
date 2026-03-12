# FlowHR_V2 UI SSOT 매핑

## 목적

이 문서는 `flowhr-ui`를 화면 SSOT로 사용할 때, 실제 Next 구현이 어떤 파일을 기준으로 어떤 라우트에 매핑되는지 고정하기 위한 문서다.

## 규칙

1. 화면 구조와 시각 기준은 `flowhr-ui`를 먼저 본다.
2. 코드가 화면을 먼저 바꾸지 않는다.
3. `flowhr-ui`에 없는 새 화면은 코드가 아니라 먼저 화면 원본에 추가한다.
4. 하나의 라우트는 하나의 SSOT 소스 파일에 매핑된다.
5. 플랫폼처럼 한 원본 화면 안에 여러 섹션이 있는 경우 `sourceSection`까지 같이 기록한다.

## 현재 매핑 기준

코드 기준 단일 매핑 파일:
- [ui-ssot.ts](C:\Team-jane\FlowHR_V2\src\lib\ui-ssot.ts)

핵심 매핑 요약:
- `/` -> `flowhr-ui/landing.html`
- `/login` -> `flowhr-ui/login.html`
- `/platform/*` -> `flowhr-ui/platform/console.html`
- `/admin/*` -> `flowhr-ui/admin/*.html`
- `/employee/*` -> `flowhr-ui/employee/*.html`

## 플랫폼 화면 처리 원칙

현재 `flowhr-ui/platform`에는 `console.html` 하나만 있다.  
따라서 플랫폼 운영 화면은 `console.html` 하나를 SSOT로 고정한다.

- `/platform/console` -> 원본 직접 렌더링
- `/platform/*` 확장 경로 -> `console`로 리다이렉트

즉 플랫폼은 코드가 별도 화면으로 재해석하지 않는다.

## 현재 적용 상태

- `flowhr-ui` 기준 관리자/직원 화면은 전부 원본 HTML 직접 렌더링 경로가 있다.
- 플랫폼도 `console.html` 원본 직접 렌더링으로 고정되어 있다.
- 이후 UI 변경은 반드시 [ui-ssot.ts](C:\Team-jane\FlowHR_V2\src\lib\ui-ssot.ts)와 함께 반영한다.
