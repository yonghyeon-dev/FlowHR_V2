# FlowHR_V2 프로덕션 실행 순서

## 목적

이 문서는 실제 작업 착수 순서를 고정한다.  
이 순서보다 뒤에 있는 항목은, 앞선 항목이 닫히기 전까지 완료로 간주하지 않는다.

## 실행 순서

### 1. SSOT 정렬

- `WI-1217`
  - 프로덕션 SSOT 마스터
  - 대/중/소/세부 분류 작성
  - 실행 순서 문서화

### 2. 제어 항목 분류

- `WI-1218`
  - 화면별 버튼/탭/필터/테이블 액션 분류
  - `real_navigation`
  - `real_operation`
  - `remove_wireframe_behavior`

### 3. 와이어프레임 전용 동작 제거

- `WI-1219`
  - 임시 토스트 제거
  - 임시 상세 드로어 제거
  - 가짜 이력 추가 제거
  - 가짜 필터/탭 상태 제거

### 4. 권한 SSOT 완성

- `WI-1220`
  - `role -> area`
  - `role -> view`
  - `role -> action`
  - `role -> field`
  - `role -> default route`
  - 실제 route/API에서 공통 정책 사용

### 5. 실제 인증/데이터 연결

- `WI-1221`
  - Supabase Auth 연결
- `WI-1222`
  - Prisma schema 정렬
- `WI-1223`
  - Supabase Postgres 연결

### 6. 코어 도메인 E2E

- `WI-1224`
  - 로그인
- `WI-1225`
  - 테넌트 설정
- `WI-1226`
  - 요청 제출
- `WI-1227`
  - 결재 처리
- `WI-1228`
  - 문서 서명
- `WI-1229`
  - 플랫폼 테넌트 운영

### 7. 관리자 핵심 모듈

- `WI-1230`
  - people
- `WI-1231`
  - attendance
- `WI-1232`
  - leave
- `WI-1233`
  - workflow
- `WI-1234`
  - documents
- `WI-1235`
  - settings

### 8. 확장 모듈

- `WI-1236`
  - payroll
- `WI-1237`
  - performance
- `WI-1238`
  - recruiting
- `WI-1239`
  - reports

### 9. 직원 모듈 마감

- `WI-1240`
  - schedule
- `WI-1241`
  - inbox
- `WI-1242`
  - profile

### 10. 품질/출시

- `WI-1243`
  - validation / error / loading
- `WI-1244`
  - 접근성 / 반응형
- `WI-1245`
  - 테스트 / 배포 / 운영 준비

## 현재 즉시 실행 항목

1. `WI-1218` 화면별 제어 항목 분류
2. `WI-1219` 와이어프레임 전용 동작 제거
3. `WI-1220` 권한 SSOT 완성
