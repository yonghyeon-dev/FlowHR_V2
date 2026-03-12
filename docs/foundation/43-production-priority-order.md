# FlowHR_V2 프로덕션 우선순위 기준

## 목적

이 문서는 이후 구현과 의사결정의 우선순위를 고정하기 위한 기준 문서다.  
사용자 요청이 들어와도 아래 우선순위를 먼저 적용하고, 충돌이 있으면 상위 우선순위를 먼저 처리한다.

## 고정 우선순위

1. 권한 SSOT 중앙화
- `role -> route -> menu -> action -> field visibility`를 한 정책 레이어로 통합한다.
- 라우트 접근과 API 접근만이 아니라 메뉴 노출과 버튼 액션까지 동일한 기준을 사용해야 한다.
- `platform_operator`, `tenant_admin`, `tenant_manager`, `tenant_employee`의 허용 범위를 문서와 코드에서 동일하게 유지한다.

2. UI SSOT 정렬
- 화면 기준 SSOT는 `flowhr-ui`로 본다.
- 코드가 화면 구조를 먼저 바꾸지 않는다.
- `flowhr-ui -> React 컴포넌트 -> 실제 동작` 순서를 유지한다.
- `flowhr-ui`에 없는 화면 확장은 코드가 아니라 먼저 화면 원본에 반영한 뒤 구현한다.

3. 실데이터 전환
- `Supabase Auth`, `Supabase Postgres`, `Prisma schema/migration`으로 전환한다.
- 로컬 dev store는 개발 보조 수단으로만 남기고, 프로덕션 기준 데이터 흐름은 실제 DB와 인증을 사용한다.

4. 코어 도메인 E2E 완성
- 아래 흐름은 end-to-end로 완성될 때까지 부분 완료로 보지 않는다.
- 로그인
- 테넌트 선택
- 요청 제출
- 승인
- 문서 서명
- 설정 저장
- 플랫폼 테넌트 운영
- 감사 로그

5. 모듈 완성
- `People`, `Attendance`, `Leave`, `Workflow`, `Documents`, `Payroll`, `Performance`, `Recruiting`, `Reports`, `Employee Schedule`, `Employee Profile`을 실제 CRUD와 상태 전이 기준으로 닫는다.

6. 운영 품질 마감
- 반응형
- 접근성
- validation
- 에러 처리
- 감사 로그 일관성
- 테스트
- 배포/환경변수/운영 모니터링

## 적용 규칙

- 새 요청이 들어와도 상위 우선순위가 비어 있으면 먼저 역제안한다.
- 하위 우선순위 작업은 상위 우선순위가 깨지는 경우 진행하지 않는다.
- 중간 구현이 있어도 `코어 E2E`, `권한 SSOT`, `UI SSOT`가 미완료면 프로덕션 준비로 판정하지 않는다.

## 현재 즉시 착수 항목

1. 권한 SSOT 중앙화
2. UI SSOT와 코드 차이 매핑
3. Supabase/Auth/Prisma 실연결

