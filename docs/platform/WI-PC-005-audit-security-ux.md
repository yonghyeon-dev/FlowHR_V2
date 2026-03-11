# WI-PC-005 감사 로그 및 보안 운영 UX 설계

## 작업 ID

- `WI-PC-005`

## 목적

`Platform Console`의 감사/보안 영역은 단순 로그 뷰어가 아니라,
민감 작업을 빠르게 검토하고 운영자 권한을 통제하며 정책 변경의 영향을
추적하는 운영 허브여야 한다.

## 대상 화면

- `PC-601` Operator Audit Log
- `PC-602` Access Control
- `PC-603` Security Policies

## 주요 사용자

### Platform Security / Auditor

- 운영자 행위 검색
- 민감 작업 검토
- 이상 로그인 및 접근 패턴 확인
- 정책 위반 여부 판단

### Platform Operator Lead

- 권한 요청 승인
- 긴급 권한 부여/회수
- 작업 승인 이력 확인

### Compliance Reviewer

- 감사 추적성 확인
- 승인 체계 준수 여부 검토
- 로그 보존 정책 확인

## 핵심 UX 원칙

- 로그 나열보다 `지금 검토해야 할 위험`이 먼저 보여야 한다.
- 민감 작업은 행 단위 기록을 넘어서 `누가, 언제, 무엇을, 왜` 했는지 읽혀야 한다.
- 권한 관리와 정책 관리는 별도 목적 화면으로 분리하되, 감사 맥락 안에서 이어져야 한다.
- 긴급 권한은 일반 권한과 다르게 시각적으로 더 강하게 구분한다.
- 검색, 필터, 타임라인, 상세 패널을 함께 써서 운영자가 빠르게 원인을 추적할 수 있어야 한다.

## 화면 구성

### 1. Security Control Tower

- 오늘의 보안 위험 KPI
- 민감 작업 검토 큐
- 이상 로그인 / 접근 패턴
- 긴급 권한 부여 현황
- 정책 변경 예정 / 최근 변경

### 2. Operator Audit Log

- 운영자 활동 검색 바
- 액션 타입 / 시간 / 대상 테넌트 / 위험도 필터
- 이벤트 리스트
- 선택 이벤트 상세 패널
- 관련 세션 / 관련 권한 변경 연결 보기

### 3. Access Control

- 운영자 역할 매트릭스
- 사용자별 직접 권한
- JIT(Just-in-time) 권한 요청 대기
- 긴급 권한 부여 기록
- 만료 예정 권한

### 4. Security Policies

- MFA 강제 여부
- IP allowlist / 지역 제한
- 세션 타임아웃
- 민감 액션 이중 승인
- 로그 보존 기간
- 알림 수신 정책

## 주요 상태

- `critical`: 긴급 권한 남용 가능성, 비정상 로그인 다수, 민감 정책 비활성화
- `high`: 검토 대기 로그 적체, 만료 예정 권한 다수, MFA 미적용 운영자 존재
- `medium`: 정책 변경 예정, 정기 검토 필요, 보존 기간 조정 예정
- `success`: 정책 준수, 승인 완료, 권한 회수 완료

## 주요 액션

- 감사 로그 검색
- 위험도별 필터링
- 이벤트 상세 열기
- 관련 운영자 / 테넌트 / 정책으로 drill-down
- 권한 요청 승인/거절
- 긴급 권한 회수
- 정책 변경 저장 및 배포

## 데이터 포인트

- 이벤트 시각
- 운영자 계정
- 액션 타입
- 대상 테넌트
- 영향 범위
- 승인 여부
- 세션 / IP / 위치
- 정책 버전

## 경고 설계 기준

- 동일 운영자에게 `critical` 이벤트가 연속 발생하면 요약 카드로 묶어 보여준다.
- 민감 작업은 완료 로그라도 최근 24시간 안에서는 별도 리뷰 큐에 남긴다.
- 권한 부여와 정책 변경은 로그 상세에서 서로 링크되어야 한다.

## 산출물

- 감사/보안 UX 문서
- 플랫폼 감사/보안 와이어: [audit-security-detailed.html](../../wireframes/platform/audit-security-detailed.html)
- 플랫폼 콘솔 개요 와이어: [platform-console.html](../../wireframes/platform/platform-console.html)

## 연결 문서

- Platform Console 개요: [WI-PC-004-platform-console.md](./WI-PC-004-platform-console.md)
- 화면 맵: [04-screen-map.md](../foundation/04-screen-map.md)
- 상태 색상 규칙: [WI-DS-005-status-color-visual-language.md](../design-system/WI-DS-005-status-color-visual-language.md)
