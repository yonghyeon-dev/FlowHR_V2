# FlowHR_V2 WI 실행 카드

## 목적

이 문서는 `WI-1217 ~ WI-1245`를 실제 착수 가능한 작업 카드 수준으로 고정한다.  
각 WI는 아래 항목을 반드시 가진다.

- 목적
- 선행 WI
- 포함 범위
- 완료 기준
- 검증 항목
- 주요 산출물

완료 기준을 만족하지 못하면 해당 WI는 `진행 중`으로 간주한다.

## Foundation

### WI-1217: 프로덕션 SSOT와 작업 분류 체계 정렬

- 목적
  - 전체 작업의 기준점을 하나로 고정한다.
- 선행 WI
  - 없음
- 포함 범위
  - SSOT 마스터
  - 대/중/소/세부 분류
  - 실행 순서
  - 문서 인덱스
- 완료 기준
  - 최상위 기준 문서가 존재한다.
  - 문서 인덱스가 기준 문서를 가리킨다.
  - 이후 작업이 참조할 우선순위가 명시된다.
- 검증 항목
  - 문서 링크 유효성
  - UTF-8 한글 정상 표시
- 주요 산출물
  - `45-production-ssot-master.md`
  - `46-production-work-breakdown.md`
  - `47-production-execution-order.md`
  - `docs/README.md`

### WI-1218: 화면별 제어 항목 분류

- 목적
  - 버튼, 탭, 필터, 링크를 프로덕션 기준으로 분류한다.
- 선행 WI
  - `WI-1217`
- 포함 범위
  - Platform console
  - Admin 전 화면
  - Employee 전 화면
- 완료 기준
  - 각 제어 항목이 `real_navigation`, `real_operation`, `remove_wireframe_behavior` 중 하나로 분류된다.
  - 임시 동작 허용 범위가 문서에서 금지된다.
- 검증 항목
  - `flowhr-ui` 화면 전수 확인
  - 분류 누락 없음
- 주요 산출물
  - `48-wireframe-control-inventory.md`

### WI-1219: 와이어프레임 전용 임시 동작 제거

- 목적
  - 데모용 상호작용을 제거하고 실제 기능 또는 정적 화면만 남긴다.
- 선행 WI
  - `WI-1218`
- 포함 범위
  - 임시 토스트
  - 임시 드로어
  - 가짜 이력 추가
  - 가짜 필터/탭 상태
- 완료 기준
  - wireframe 렌더러에 임시 상호작용 코드가 없다.
  - 링크는 실제 라우트만 유지된다.
- 검증 항목
  - `wireframe-screen.tsx`에 상태 시뮬레이션 코드 없음
  - 화면 클릭 시 가짜 동작 없음
- 주요 산출물
  - `src/components/wireframe-screen.tsx`

### WI-1220: 권한 SSOT와 API 필드 정책 통합

- 목적
  - 역할별 접근 규칙을 한 파일에서 관리한다.
- 선행 WI
  - `WI-1217`
- 포함 범위
  - `role -> area`
  - `role -> view`
  - `role -> action`
  - `role -> field`
  - `default route`
  - API 권한 검증
- 완료 기준
  - 권한 정책이 `src/lib/access-policy.ts`에서 단일 관리된다.
  - Admin/Employee/Platform route가 동일 정책을 참조한다.
  - API가 액션 및 필드 권한을 공통 정책으로 검증한다.
- 검증 항목
  - 관리자/매니저/직원/플랫폼 운영자 직접 URL 차단
  - API 403/401 정상 반환
- 주요 산출물
  - `src/lib/access-policy.ts`
  - `src/lib/server/auth.ts`
  - 각 API route
  - `49-authority-ssot-matrix.md`

### WI-1221: Supabase SSR 인증 클라이언트 기반 추가

- 목적
  - mock 세션이 아닌 Supabase 기반 인증으로 전환할 토대를 만든다.
- 선행 WI
  - `WI-1220`
- 포함 범위
  - browser client
  - server client
  - proxy session refresh
  - 환경 변수 예시
- 완료 기준
  - `@supabase/ssr` 기반 client/server helper가 존재한다.
  - `proxy.ts`가 세션 갱신 루프를 가진다.
  - build가 통과한다.
- 검증 항목
  - env 미설정 시 안전하게 동작
  - build 통과
- 주요 산출물
  - `src/lib/supabase/client.ts`
  - `src/lib/supabase/server.ts`
  - `src/lib/supabase/proxy.ts`
  - `proxy.ts`
  - `.env.example`

### WI-1222: Prisma schema 정렬

- 목적
  - 현재 권한/도메인 구조와 DB 모델을 일치시킨다.
- 선행 WI
  - `WI-1220`
  - `WI-1221`
- 포함 범위
  - user
  - tenant
  - membership
  - request
  - approval
  - document
  - settings
  - audit log
  - pack/feature 상태
- 완료 기준
  - schema가 현재 화면/권한/도메인 흐름을 커버한다.
  - enum/관계/제약조건이 현재 정책과 맞다.
  - seed 전략이 schema를 기준으로 설명 가능하다.
- 검증 항목
  - `prisma validate`
  - `prisma generate`
- 주요 산출물
  - `prisma/schema.prisma`
  - `prisma/seed.mjs`

### WI-1223: Supabase Postgres 실연결

- 목적
  - 로컬 dev store를 실제 Postgres 연결 구조로 치환할 준비를 완료한다.
- 선행 WI
  - `WI-1222`
- 포함 범위
  - `DATABASE_URL`
  - `DIRECT_URL`
  - Prisma client
  - migration 전략
- 완료 기준
  - Prisma client가 실제 DB 기준으로 동작한다.
  - 로컬 persistence 의존이 제거 가능한 상태가 된다.
- 검증 항목
  - `prisma db push` 또는 migration 실행
  - 기본 시드 반영
- 주요 산출물
  - `src/lib/prisma.ts`
  - Prisma 설정 파일

## Core E2E

### WI-1224: 로그인 E2E

- 목적
  - 실제 인증 후 역할별 홈으로 진입한다.
- 선행 WI
  - `WI-1221`
  - `WI-1223`
- 포함 범위
  - 로그인 폼
  - 세션 생성
  - 역할별 redirect
  - 로그아웃
- 완료 기준
  - 플랫폼/관리자/직원 로그인 성공
  - 세션 유지 및 로그아웃 동작
- 검증 항목
  - 잘못된 자격 증명 처리
  - 보호된 라우트 접근 차단
- 주요 산출물
  - `src/components/login-client.tsx`
  - auth API/routes

### WI-1225: 테넌트 설정 E2E

- 목적
  - 관리자 설정 저장이 실제 DB에 반영된다.
- 선행 WI
  - `WI-1223`
  - `WI-1224`
- 포함 범위
  - 회사 기본정보
  - 시간대
  - 근무 시간
- 완료 기준
  - 관리자만 설정 변경 가능
  - 저장 후 재조회 시 반영
  - 감사 로그 기록
- 검증 항목
  - 권한 없는 역할 403
  - validation 오류 처리
- 주요 산출물
  - settings API
  - settings data access layer

### WI-1226: 요청 제출 E2E

- 목적
  - 직원 요청이 실제 데이터로 저장된다.
- 선행 WI
  - `WI-1223`
  - `WI-1224`
- 포함 범위
  - 요청 유형
  - 제목
  - 사유
  - 요청 목록
- 완료 기준
  - 직원만 제출 가능
  - 제출 후 목록에 반영
  - 감사 로그 기록
- 검증 항목
  - 필수값 검증
  - 권한 차단
- 주요 산출물
  - requests API
  - employee requests 화면 연결

### WI-1227: 결재 처리 E2E

- 목적
  - 관리자/매니저가 요청을 승인 또는 반려한다.
- 선행 WI
  - `WI-1226`
- 포함 범위
  - 요청 목록
  - 승인
  - 반려
  - 상태 전이
- 완료 기준
  - 관리자/매니저만 결재 가능
  - 결재 후 요청 상태 변경
  - 감사 로그 기록
- 검증 항목
  - 중복 승인 방지
  - 잘못된 requestId 처리
- 주요 산출물
  - approvals API
  - admin workflow 연결

### WI-1228: 문서 서명 E2E

- 목적
  - 직원이 문서에 실제 서명 처리한다.
- 선행 WI
  - `WI-1223`
  - `WI-1224`
- 포함 범위
  - 문서 목록
  - 서명 액션
  - 상태 변경
- 완료 기준
  - 직원만 서명 가능
  - 서명 후 상태가 `signed`로 변경
  - 감사 로그 기록
- 검증 항목
  - 이미 서명된 문서 처리
  - 권한 차단
- 주요 산출물
  - documents sign API
  - employee documents 연결

### WI-1229: 플랫폼 테넌트 운영 E2E

- 목적
  - 플랫폼 운영자가 테넌트 상태와 팩을 운영한다.
- 선행 WI
  - `WI-1223`
  - `WI-1224`
- 포함 범위
  - tenant list
  - pack 변경
  - status 변경
  - feature toggle
- 완료 기준
  - 플랫폼 운영자만 수정 가능
  - 수정 후 목록과 상세에 반영
  - 감사 로그 기록
- 검증 항목
  - 권한 차단
  - 필드별 수정 제한
- 주요 산출물
  - platform tenants API
  - platform console 연결

## Tenant Admin Modules

### WI-1230: People 모듈

- 목적
  - 직원 목록과 기본 인사 정보 관리를 실제 데이터로 전환한다.
- 선행 WI
  - `WI-1225`
- 포함 범위
  - 목록
  - 검색
  - 필터
  - 상세 진입
- 완료 기준
  - 실제 직원 데이터 조회
  - 검색/필터 동작
  - 상세 라우트 또는 상세 패널 기준 확정
- 검증 항목
  - 빈 상태
  - 결과 없음
- 주요 산출물
  - people data layer
  - admin people 화면

### WI-1231: Attendance 모듈

- 목적
  - 근태 기록과 예외 조치를 실제 데이터로 연결한다.
- 선행 WI
  - `WI-1225`
  - `WI-1226`
- 포함 범위
  - 근태 목록
  - 기간 이동
  - 예외 상태
  - 보정 액션
- 완료 기준
  - 실제 근태 레코드 조회
  - 예외 처리 액션 연결
- 검증 항목
  - 기간 필터
  - 예외 없는 상태
- 주요 산출물
  - attendance schema/service
  - admin attendance 화면

### WI-1232: Leave 모듈

- 목적
  - 휴가 잔액, 정책, 승인 흐름을 실제 데이터로 전환한다.
- 선행 WI
  - `WI-1226`
  - `WI-1227`
- 포함 범위
  - 잔액
  - 정책
  - 승인 대기
- 완료 기준
  - 휴가 요청과 잔액이 연결된다.
  - 승인/반려 시 잔액 반영 규칙이 정의된다.
- 검증 항목
  - 잔액 부족 처리
  - 정책 미설정 상태
- 주요 산출물
  - leave data layer
  - admin leave 화면

### WI-1233: Workflow 모듈

- 목적
  - 결재 인박스를 운영 가능한 형태로 완성한다.
- 선행 WI
  - `WI-1227`
- 포함 범위
  - 상태별 필터
  - 목록
  - 상세
  - 승인/반려
- 완료 기준
  - 결재 대상 필터링 가능
  - 상세와 액션이 연결
- 검증 항목
  - 상태 전이
  - 잘못된 중복 액션
- 주요 산출물
  - workflow view model
  - admin workflow 화면

### WI-1234: Documents 모듈

- 목적
  - 문서 템플릿/발송/상태 관리 기능을 완성한다.
- 선행 WI
  - `WI-1228`
- 포함 범위
  - 템플릿 목록
  - 발송
  - 상태 조회
  - 리마인드
- 완료 기준
  - 문서 상태가 실제 데이터로 표시된다.
  - 발송/리마인드가 동작한다.
- 검증 항목
  - 수신자 없음
  - 중복 발송
- 주요 산출물
  - documents service
  - admin documents 화면

### WI-1235: Settings 모듈 마감

- 목적
  - 설정 화면을 프로덕션 품질로 마감한다.
- 선행 WI
  - `WI-1225`
- 포함 범위
  - 저장
  - 취소
  - 섹션 구분
  - 권한 차단
- 완료 기준
  - 실제 저장/재조회
  - dirty state 처리
- 검증 항목
  - 변경 없음 저장
  - validation 오류
- 주요 산출물
  - admin settings 화면 보강

## Admin Expansion

### WI-1236: Payroll 모듈

- 목적
  - 급여 계산/마감/명세서 발행 구조를 연결한다.
- 선행 WI
  - `WI-1225`
  - `WI-1231`
  - `WI-1232`
- 포함 범위
  - 계산 목록
  - 마감
  - 명세서 발행
- 완료 기준
  - 급여 대상 데이터 집계
  - 마감 상태 기록
- 검증 항목
  - 마감 중복 방지
- 주요 산출물
  - payroll schema/service

### WI-1237: Performance 모듈

- 목적
  - 평가 사이클과 상태 관리를 연결한다.
- 선행 WI
  - `WI-1225`
- 포함 범위
  - 평가 주기
  - 대상자
  - 상태
- 완료 기준
  - 평가 cycle 생성/조회 가능
- 검증 항목
  - 대상자 없음
- 주요 산출물
  - performance service

### WI-1238: Recruiting 모듈

- 목적
  - 채용 공고와 파이프라인 흐름을 연결한다.
- 선행 WI
  - `WI-1225`
- 포함 범위
  - 공고
  - 후보자
  - 단계 이동
- 완료 기준
  - 단계 전이와 상태 저장 가능
- 검증 항목
  - 단계 중복 이동 방지
- 주요 산출물
  - recruiting service

### WI-1239: Reports 모듈

- 목적
  - 리포트 필터와 export를 실제 데이터 기반으로 마감한다.
- 선행 WI
  - `WI-1230`
  - `WI-1231`
  - `WI-1232`
- 포함 범위
  - 기간 필터
  - 집계
  - export
- 완료 기준
  - 최소 1종 이상 실제 집계 리포트 제공
- 검증 항목
  - 빈 데이터 export
- 주요 산출물
  - reports service

## Tenant Employee Modules

### WI-1240: Schedule 모듈

- 목적
  - 일정 조회와 출퇴근 액션을 연결한다.
- 선행 WI
  - `WI-1231`
- 포함 범위
  - 일정 조회
  - 출근
  - 퇴근
- 완료 기준
  - 출퇴근이 실제 근태 레코드에 반영
- 검증 항목
  - 중복 출근/퇴근 처리
- 주요 산출물
  - employee schedule 화면

### WI-1241: Inbox 모듈

- 목적
  - 알림과 바로가기 흐름을 연결한다.
- 선행 WI
  - `WI-1226`
  - `WI-1227`
  - `WI-1228`
- 포함 범위
  - 알림 목록
  - 읽음 처리
  - 상세 이동
- 완료 기준
  - 주요 도메인 이벤트가 인박스에 반영
- 검증 항목
  - 읽지 않음/읽음 상태
- 주요 산출물
  - employee inbox 화면

### WI-1242: Profile 모듈

- 목적
  - 직원 개인정보 조회/수정을 연결한다.
- 선행 WI
  - `WI-1224`
  - `WI-1225`
- 포함 범위
  - 프로필 조회
  - 수정
  - 저장
- 완료 기준
  - 실제 사용자 정보 저장/재조회 가능
- 검증 항목
  - 필수값 검증
- 주요 산출물
  - employee profile 화면

## Quality and Release

### WI-1243: 공통 상태 품질

- 목적
  - validation/error/loading/no data 상태를 모듈별로 마감한다.
- 선행 WI
  - `WI-1224 ~ WI-1242`
- 포함 범위
  - 폼 오류
  - API 오류
  - 로딩
  - 빈 상태
- 완료 기준
  - 코어 화면에 공통 상태 처리 적용
- 검증 항목
  - 에러 응답 주입
- 주요 산출물
  - 공통 상태 UI/handler

### WI-1244: 접근성 및 반응형

- 목적
  - 프로덕션 사용성을 보장한다.
- 선행 WI
  - `WI-1243`
- 포함 범위
  - 키보드 접근
  - 포커스 상태
  - 모바일 레이아웃
- 완료 기준
  - 주요 화면이 모바일/데스크톱에서 깨지지 않는다.
  - 기본 접근성 속성이 들어간다.
- 검증 항목
  - 좁은 뷰포트
  - 키보드 tab 흐름
- 주요 산출물
  - 반응형/접근성 수정

### WI-1245: 테스트, 배포, 출시 준비

- 목적
  - 프로덕션 릴리스 가능한 상태로 마감한다.
- 선행 WI
  - `WI-1244`
- 포함 범위
  - 환경 변수 정리
  - 테스트 스크립트
  - Vercel 배포 설정
  - 운영 체크리스트
- 완료 기준
  - 배포 가능한 설정 완료
  - 최소 회귀 검증 절차 존재
- 검증 항목
  - build
  - 배포 미리보기
  - 필수 환경 변수 검증
- 주요 산출물
  - 배포 문서
  - 운영 체크리스트
