# FlowHR_V2 구현 스프린트 분해

## 작업 ID

- `WI-DM-009`

## 목적

현재까지 정리한 설계 산출물을 실제 구현 스프린트로 분해한다.
이제 구현 순서는 권한 축보다 `Pack 우선순위`를 더 많이 반영한다.

## 스프린트 원칙

- Sprint 0은 공통 기반
- Sprint 1~2는 우선 공략 업종 기준
- Platform은 Pack과 병렬이 아니라 핵심 앱 기반 이후 진행

## Sprint 0. App Foundation

### 목표

- 앱 공통 구조와 공통 토큰, i18n 기반 확보

### 범위

- `src/app` 라우트 그룹 생성
- `platform`, `admin`, `employee`, `auth` shell 구조 생성
- locale 로더와 fallback 구조 연결
- 공통 토큰 CSS 또는 theme object 연결

## Sprint 1. Office Pack Core

### 목표

- Office Pack 관리자/직원 코어 흐름 구현

### 범위

- `TA-001` Office Home
- `TA-201` Office Attendance
- `TA-301` Office Leave
- `TA-401` Office Workflow
- `TA-501` Office Documents
- `TE-001/002` Office Employee Home
- `TE-201` Office Request Hub
- `TE-401` Office Signature Inbox

## Sprint 2. Retail Pack Core

### 목표

- Retail Pack 관리자/직원 코어 흐름 구현

### 범위

- `TA-001` Retail Home
- `TA-201` Retail Attendance
- `TA-301` Retail Leave
- `TA-401` Retail Workflow
- `TA-501` Retail Documents
- `TE-001/002` Retail Employee Home
- `TE-201` Retail Request Hub
- `TE-401` Retail Signature Inbox

## Sprint 3. Shared Tenant Expansion

### 목표

- 업종 공통 확장 모듈 구현

### 범위

- `TA-101`~`TA-105`
- `TA-601`~`TA-604`
- `TA-701`~`TA-704`
- `TA-801`~`TA-805`
- `TA-901`~`TA-904`
- `TA-1001`~`TA-1005`
- `TE-102`
- `TE-402`
- `TE-501`~`TE-503`

## Sprint 4. Platform Operator Console

### 목표

- Platform 운영 콘솔 구현

### 범위

- `PC-001`
- `PC-103`
- `PC-201`~`PC-205`
- `PC-601`~`PC-604`

## 스프린트 게이트

- Sprint 0 완료 후 Sprint 1 진입
- Office Pack 검증 후 Retail Pack 진입
- Shared Tenant Expansion은 Office / Retail 핵심 흐름 이후
- Platform은 Pack 코어 흐름이 안정된 뒤 진행

## 연결 문서

- [12-implementation-readiness-checklist.md](./12-implementation-readiness-checklist.md)
- [20-module-api-contract-breakdown.md](./20-module-api-contract-breakdown.md)
- [32-industry-pack-feature-selection.md](./32-industry-pack-feature-selection.md)
