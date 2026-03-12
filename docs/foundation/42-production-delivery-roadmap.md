# FlowHR V2 Production Delivery Roadmap

기준 시작점: `WI-1187` 완료 상태  
현재 상태: `flowhr-ui` 기반 Next.js 이식 완료, 프로덕션 완성 전 단계

## 목표

이 문서는 `flowhr-ui` 기반 정적 화면을 출발점으로 해서, `React + Next.js + TypeScript + Supabase + Prisma + Vercel` 스택 위에서 실제 운영 가능한 HR SaaS까지 가는 구현 단계를 `WI-####` 형식으로 미리 고정한 로드맵이다.

## 원칙

- `flowhr-ui`를 현재 프론트엔드의 시각 기준으로 유지한다.
- 먼저 `HTML 화면 -> React 컴포넌트`로 분해한다.
- 그 다음 `인증`, `권한`, `DB`, `실데이터`, `운영/배포`를 연결한다.
- 새 기능 확장은 코어 흐름이 닫힌 뒤에만 진행한다.

## Stage A. 프론트엔드 구조화

### WI-1188: [frontend] 공통 앱 셸 컴포넌트 분해
- 범위: `Header`, `Sidebar`, `Breadcrumb`, `PageHeader`, `MainContent`
- 산출물:
  - 공통 레이아웃 컴포넌트
  - 플랫폼/관리자/직원 공통 셸
  - 현재 `wireframe-screen` 의존 제거 시작
- 완료 기준:
  - `/platform/console`
  - `/admin/home`
  - `/employee/home`
  세 화면이 공통 셸로 렌더링됨

### WI-1189: [design-system] 기초 UI 컴포넌트 구현
- 범위: `Button`, `Badge`, `Card`, `StatRow`, `QueueItem`, `Tabs`, `Input`, `Select`, `Textarea`, `Table`
- 산출물:
  - 재사용 컴포넌트 라이브러리
  - `flowhr-ui/css/design-system.css`를 기준으로 한 토큰/스타일 분해
- 완료 기준:
  - 관리자 설정, 직원 요청, 플랫폼 콘솔 일부가 공통 UI 컴포넌트만으로 렌더링됨

### WI-1190: [frontend] 핵심 화면 컴포넌트화 1차
- 범위:
  - `landing`
  - `login`
  - `platform/console`
  - `admin/home`
  - `employee/home`
- 완료 기준:
  - 위 5개 화면이 더 이상 HTML 문자열 주입 없이 React 컴포넌트로 렌더링됨

### WI-1191: [frontend] 핵심 화면 컴포넌트화 2차
- 범위:
  - `admin/settings`
  - `admin/attendance`
  - `admin/workflow`
  - `employee/requests`
  - `employee/documents`
  - `employee/inbox`
- 완료 기준:
  - 코어 업무 플로우 화면이 전부 React 컴포넌트 기반으로 전환됨

## Stage B. 인증/권한/테넌시

### WI-1192: [auth] Supabase Auth 도입
- 범위:
  - 이메일 로그인
  - 세션 유지
  - 로그아웃
  - 역할별 기본 진입 경로
- 완료 기준:
  - `/login`이 실제 Supabase Auth와 연결됨

### WI-1193: [auth] 역할 기반 접근 제어 구현
- 범위:
  - `platform_operator`
  - `tenant_admin`
  - `tenant_manager`
  - `tenant_employee`
- 완료 기준:
  - 라우트 가드
  - API 가드
  - 권한 없음 화면
  - 역할별 네비게이션 필터링

### WI-1194: [platform] 테넌트 컨텍스트와 Pack 선택 연결
- 범위:
  - `office`
  - `retail`
  - 활성 tenant 전환
  - tenant별 pack 설정
- 완료 기준:
  - 로그인 후 현재 tenant 기준으로 관리자/직원 화면이 자동 결정됨

## Stage C. 데이터 모델과 백엔드 기초

### WI-1195: [backend] Prisma 스키마 고정
- 범위:
  - `User`
  - `Tenant`
  - `Membership`
  - `Request`
  - `Approval`
  - `Document`
  - `AttendanceRecord`
  - `LeaveBalance`
- 완료 기준:
  - Prisma schema 확정
  - migration 생성 가능 상태

### WI-1196: [backend] Supabase Postgres 연결과 Prisma 마이그레이션
- 범위:
  - `DATABASE_URL`
  - `DIRECT_URL`
  - migration 실행
  - seed 구조 생성
- 완료 기준:
  - 로컬/개발 환경에서 실제 Postgres 기반으로 구동됨

### WI-1197: [backend] 시드 데이터와 개발용 팩 데이터 구성
- 범위:
  - 플랫폼 운영자 1명
  - Office tenant 1개
  - Retail tenant 1개
  - 관리자/매니저/직원 샘플 계정
- 완료 기준:
  - 데모/QA에 필요한 실제 로그인 계정과 샘플 데이터가 준비됨

## Stage D. 코어 도메인 구현

### WI-1198: [tenant-employee] 요청 도메인 CRUD
- 범위:
  - 휴가 요청
  - 출퇴근 정정
  - 일반 요청
- 완료 기준:
  - 작성, 제출, 취소, 목록, 상세 조회 가능

### WI-1199: [tenant-admin] 승인 도메인 구현
- 범위:
  - 관리자/매니저 승인
  - 반려
  - 승인 이력
- 완료 기준:
  - 직원 요청이 실제 승인 플로우로 상태 전이됨

### WI-1200: [tenant-employee] 문서 및 서명 도메인 구현
- 범위:
  - 문서 목록
  - 서명 대기
  - 서명 완료
- 완료 기준:
  - 직원이 문서를 열고 서명 상태를 변경할 수 있음

### WI-1201: [tenant-admin] 설정 도메인 구현
- 범위:
  - 회사 정보
  - 역할/권한
  - 알림
  - 연동 기본 설정
- 완료 기준:
  - 관리자 설정 변경이 DB에 저장되고 다시 화면에 반영됨

### WI-1202: [tenant-admin] 근태 대시보드 구현
- 범위:
  - 근태 이상 목록
  - 지각/누락/초과근무
  - 관리자 액션
- 완료 기준:
  - Office/Retail 기준 코어 근태 흐름이 실데이터로 동작함

## Stage E. Pack별 운영 완성

### WI-1203: [tenant-admin] Office Pack 운영 완성
- 범위:
  - 관리자 홈
  - 요청/결재
  - 문서
  - 설정
- 완료 기준:
  - Office tenant에서 관리자 기준 end-to-end 업무가 닫힘

### WI-1204: [tenant-employee] Office Pack 셀프서비스 완성
- 범위:
  - 직원 홈
  - 요청
  - 문서
  - 인박스
- 완료 기준:
  - Office 직원 기준 end-to-end 흐름 닫힘

### WI-1205: [tenant-admin] Retail Pack 운영 완성
- 범위:
  - 관리자 홈
  - 근태
  - 스케줄/예외
  - 결원/커버리지 신호
- 완료 기준:
  - Retail 운영자가 하루 운영을 실제로 관리할 수 있는 수준에 도달

### WI-1206: [tenant-employee] Retail Pack 셀프서비스 완성
- 범위:
  - 직원 홈
  - 일정
  - 요청
  - 문서
- 완료 기준:
  - Retail 직원 기준 출근/요청/확인 플로우가 닫힘

## Stage F. 플랫폼 운영 기능

### WI-1207: [platform] 테넌트 운영 콘솔 구현
- 범위:
  - tenant 목록
  - 상태 변경
  - pack 변경
  - 플랜/기능 토글
- 완료 기준:
  - 플랫폼 운영자가 tenant 설정을 실제로 조정 가능

### WI-1208: [platform] 감사 로그 및 운영 이벤트 구현
- 범위:
  - 로그인
  - 권한 변경
  - 승인/반려
  - 설정 변경
- 완료 기준:
  - 주요 이벤트가 감사 로그에 기록되고 조회 가능

## Stage G. 품질과 운영 준비

### WI-1209: [qa] 반응형/접근성/상태 화면 정리
- 범위:
  - desktop
  - tablet
  - mobile
  - loading
  - empty
  - error
  - access denied
- 완료 기준:
  - 주요 화면에서 상태별 UI가 빠지지 않음

### WI-1210: [qa] E2E 테스트 구축
- 범위:
  - 로그인
  - 요청 제출
  - 승인 처리
  - 서명 처리
  - 설정 저장
  - tenant 전환
- 완료 기준:
  - Playwright E2E가 코어 플로우를 커버함

### WI-1211: [ops] 운영 환경 설정
- 범위:
  - 환경변수
  - Supabase 프로젝트 연결
  - Prisma migration 배포 플로우
  - Vercel preview/production 구성
- 완료 기준:
  - 프리뷰와 프로덕션 배포 파이프라인이 준비됨

### WI-1212: [release] 프로덕션 출시 패스
- 범위:
  - 최종 QA
  - 운영 체크리스트
  - seed 제거/정리
  - 기본 tenant 온보딩 검증
- 완료 기준:
  - 실사용 가능한 첫 프로덕션 릴리스 완료

## 최종 해석

프로덕션 완료까지의 실제 순서는 아래와 같다.

1. `WI-1188 ~ WI-1191`: 프론트엔드 컴포넌트화
2. `WI-1192 ~ WI-1194`: 인증/권한/테넌시
3. `WI-1195 ~ WI-1197`: DB/백엔드 기초
4. `WI-1198 ~ WI-1202`: 코어 도메인 구현
5. `WI-1203 ~ WI-1208`: Pack 및 플랫폼 운영 완성
6. `WI-1209 ~ WI-1212`: QA, 배포, 출시

즉, 지금 다음 우선순위는 `WI-1188 공통 앱 셸 컴포넌트 분해`다.
