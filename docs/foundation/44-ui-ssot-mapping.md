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
따라서 아래 플랫폼 라우트는 모두 동일한 SSOT 파일을 공유하되, 각자 참조하는 섹션을 분리해서 관리한다.

- `/platform/overview`
- `/platform/tenants`
- `/platform/billing`
- `/platform/support`
- `/platform/monitoring`
- `/platform/security`
- `/platform/settings`

즉 플랫폼 화면은 `flowhr-ui/platform/console.html`을 화면 원본으로 보며, 코드에서는 섹션 단위로 분해 구현한다.

## 현재 적용 상태

- `flowhr-ui` 기준 관리자/직원 화면은 전부 코드 매핑이 있다.
- 플랫폼 화면도 코드 매핑은 있으나, 별도 원본 HTML이 아니라 `console.html` 섹션 기반으로 분해되어 있다.
- 이후 UI 변경은 반드시 [ui-ssot.ts](C:\Team-jane\FlowHR_V2\src\lib\ui-ssot.ts)와 함께 반영한다.

