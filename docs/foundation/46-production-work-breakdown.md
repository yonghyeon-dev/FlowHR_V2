# FlowHR_V2 프로덕션 작업 분류

## 목적

이 문서는 프로덕션 완료까지의 작업을 `대분류 > 중분류 > 소분류 > 세부 분류`로 정리한 기준 문서다.

## 대분류 A. Foundation

### 중분류 A1. SSOT 정렬

#### 소분류 A1-1. 문서 기준 정렬

- 세부 분류:
  - 프로덕션 SSOT 마스터
  - 작업 분류 체계
  - 실행 순서
  - 와이어 제어 항목 분류
  - 권한 SSOT 매트릭스

#### 소분류 A1-2. UI SSOT 정렬

- 세부 분류:
  - `flowhr-ui -> route` 매핑
  - `flowhr-ui -> implementation` 매핑
  - 원본 화면 구조 보존
  - 와이어프레임 전용 동작 제거

### 중분류 A2. 플랫폼 기반

#### 소분류 A2-1. 인증/인가

- 세부 분류:
  - Supabase Auth 연동
  - 세션 관리
  - 권한 중앙 정책
  - 역할별 접근 차단

#### 소분류 A2-2. 데이터 기반

- 세부 분류:
  - Prisma 스키마 정렬
  - Supabase Postgres 연결
  - 시드 데이터
  - 마이그레이션 전략

## 대분류 B. Platform Operator

### 중분류 B1. 콘솔 운영

#### 소분류 B1-1. 테넌트 운영

- 세부 분류:
  - 테넌트 목록
  - pack 변경
  - 상태 변경
  - 기능 활성화

#### 소분류 B1-2. 운영 모니터링

- 세부 분류:
  - 운영 큐
  - 지원 상태
  - 모니터링 신호
  - 감사 로그

## 대분류 C. Tenant Admin

### 중분류 C1. 코어 운영

#### 소분류 C1-1. 홈

- 세부 분류:
  - home KPI
  - 대기열
  - 예외 모니터링
  - 빠른 이동

#### 소분류 C1-2. 인사/근태/휴가

- 세부 분류:
  - people
  - attendance
  - leave

#### 소분류 C1-3. 승인/문서/설정

- 세부 분류:
  - workflow
  - documents
  - settings

### 중분류 C2. 확장 운영

#### 소분류 C2-1. 정산/성과/채용

- 세부 분류:
  - payroll
  - performance
  - recruiting

#### 소분류 C2-2. 분석

- 세부 분류:
  - reports

## 대분류 D. Tenant Employee

### 중분류 D1. 셀프서비스

#### 소분류 D1-1. 홈/일정

- 세부 분류:
  - home
  - schedule

#### 소분류 D1-2. 요청/인박스

- 세부 분류:
  - requests
  - inbox

#### 소분류 D1-3. 문서/프로필

- 세부 분류:
  - documents
  - profile

## 대분류 E. Cross-Cutting

### 중분류 E1. 품질

#### 소분류 E1-1. 공통 품질

- 세부 분류:
  - validation
  - error state
  - loading state
  - 접근성
  - 반응형

### 중분류 E2. 출시

#### 소분류 E2-1. 운영 준비

- 세부 분류:
  - 테스트
  - 환경 변수
  - Vercel 배포
  - 운영 모니터링
