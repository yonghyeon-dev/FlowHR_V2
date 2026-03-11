# WI-PC-004 Platform Console 상세 설계

## 작업 ID

- `WI-PC-004`

## 목적

`Platform Console`은 고객사 HR 운영 화면이 아니라, 우리 SaaS 운영 조직이 사용하는
백오피스다. 따라서 고객사 정보 조회보다 `테넌트 상태`, `과금`, `지원`, `보안`,
`감사` 흐름이 중심이 되어야 한다.

현재 재설계 기준은 `장식형 대시보드`가 아니라
`운영 리스크를 즉시 판단하고 조치할 수 있는 콘솔`이다.

## 주요 사용자

### Platform Operator

- 테넌트 생성, 정지, 복구
- 상태 변경과 운영 메모 기록
- 지원 이슈 처리

### Platform Billing Admin

- 플랜 변경
- 청구 상태 확인
- 결제 이슈 대응

### Platform Security / Auditor

- 운영자 행위 감사
- 민감 권한 검토
- 보안 정책 확인

## 모듈 구성

### 1. Platform Overview Dashboard

- 활성 테넌트 수
- 유예/중지 고객 수
- 결제 실패 건수
- 미해결 지원 이슈
- 운영 우선 큐
- 라벨이 있는 상태 지표
- 최근 상태 변경
- 보안/감사 신호

재설계 원칙:

- 라벨 없는 막대그래프를 두지 않는다
- 모든 지표는 `지표명 / 현재값 / 상태 / 임계치 의미 / 다음 액션` 중 최소 4개를 가져야 한다
- `Platform Health`는 장식이 아니라 운영 판단 패널이어야 한다

### 2. Tenant Operations

- Tenant List
- Tenant Create
- Tenant Detail
- Lifecycle Actions

핵심 액션:

- 생성
- 검색
- 상태 변경
- 플랜 변경
- 운영 메모

### 3. Plans & Billing

- 플랜 카탈로그
- 청구 계정
- 결제 및 청구 이력

핵심 액션:

- 플랜 할당
- 업그레이드 / 다운그레이드
- 결제 상태 확인
- 수동 조정

### 4. Support Ops

- 지원 인박스
- 고객사 이슈 상세
- 공지 / 장애 게시

핵심 액션:

- 이슈 상태 변경
- 담당자 지정
- 고객사 컨텍스트 확인
- 공지 발행

### 5. Audit & Security

- 운영자 감사 로그
- 운영자 권한 관리
- 보안 정책 설정

핵심 액션:

- 행위 검색
- 권한 범위 조정
- 민감 작업 추적

## UX 원칙

- `플랫폼 운영` 중심이어야 하며 고객사 HR 운영 화면과 혼동되면 안 된다.
- 숫자 자체보다 `즉시 처리할 운영 리스크`가 먼저 보여야 한다.
- Tenant Detail은 단순 상세 페이지가 아니라 `운영 메타 뷰`여야 한다.
- 지원, 과금, 보안 이슈는 한 콘솔 안에서 연결되되 한 화면에 뒤섞이지 않게 분리한다.
- 의미가 불분명한 시각 요소는 넣지 않는다.
- `Platform Health`는 추상적인 차트가 아니라 `상태 카드`와 `조치 트리거`로 표현한다.

## 산출물

1. Platform Console 화면 체계
2. Platform Console 와이어프레임
3. Platform Console 모듈별 상세 PRD 초안

## 연결 문서

- 화면 맵: [04-screen-map.md](../foundation/04-screen-map.md)
- 와이어프레임: [platform-console.html](../../wireframes/platform/platform-console.html)
