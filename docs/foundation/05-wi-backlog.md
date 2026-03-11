# FlowHR_V2 WI 백로그 v1

## 목적

이 문서는 현재까지 정리된 제품 방향, 화면 맵, 권한 모델을 기준으로
설계 작업을 `WI-*` 단위로 분해한 작업 백로그다.

## 상태 정의

- `todo`: 아직 시작 전
- `next`: 다음 우선순위
- `in_progress`: 현재 상세 설계 또는 와이어 작업 중
- `completed`: 현재 기준으로 설계 완료
- `later`: 선행 작업 이후 진행

---

## Epic A. Platform 기반

| ID | 상태 | 영역 | 작업 |
|---|---|---|---|
| WI-PC-001 | in_progress | Platform | 멀티테넌시 아키텍처와 테넌트 경계 정의 |
| WI-PC-002 | in_progress | Platform | 권한 레이어 정의: Platform / Tenant Admin / Tenant Employee |
| WI-PC-003 | in_progress | Platform | 인증과 접근 제어 구조 정리 |
| WI-PC-004 | in_progress | Platform | Platform Console 화면 구조와 와이어 상세 설계 |
| WI-PC-005 | in_progress | Platform | 감사 로그 및 보안 운영 UX 설계 |
| WI-PC-006 | in_progress | Platform | 플랜, 과금, 기능 플래그 운영 설계 |

## Epic B. Tenant Admin 코어

| ID | 상태 | 영역 | 작업 |
|---|---|---|---|
| WI-TA-001 | in_progress | Tenant Admin | Admin Home Dashboard 상세 와이어 및 PRD |
| WI-TA-002 | in_progress | Tenant Admin | People 모듈 화면 체계 상세화 |
| WI-TA-003 | in_progress | Tenant Admin | Attendance 모듈 화면 체계 상세화 |
| WI-TA-004 | in_progress | Tenant Admin | Leave 모듈 화면 체계 상세화 |
| WI-TA-005 | in_progress | Tenant Admin | Workflow 모듈 화면 체계 상세화 |
| WI-TA-006 | in_progress | Tenant Admin | Documents 모듈 상세 설계 |
| WI-TA-007 | in_progress | Tenant Admin | Settings / Role & Permission 상세 설계 |

## Epic C. Tenant Employee 코어

| ID | 상태 | 영역 | 작업 |
|---|---|---|---|
| WI-TE-001 | in_progress | Tenant Employee | Employee Home / Mobile Home 상세 와이어 및 PRD |
| WI-TE-002 | in_progress | Tenant Employee | 출퇴근 플로우 상세 설계 |
| WI-TE-003 | in_progress | Tenant Employee | 휴가 및 요청 허브 상세 설계 |
| WI-TE-004 | in_progress | Tenant Employee | 문서 서명 및 인박스 상세 설계 |
| WI-TE-005 | in_progress | Tenant Employee | 내 프로필 / 내 성과 상세 설계 |

## Epic D. 공통 도메인 규칙

| ID | 상태 | 영역 | 작업 |
|---|---|---|---|
| WI-DM-001 | in_progress | Domain | 근태 예외 유형 정의 |
| WI-DM-002 | in_progress | Domain | 휴가 정책과 차감 규칙 상세화 |
| WI-DM-003 | in_progress | Domain | 결재 문서 유형과 승인 규칙 상세화 |
| WI-DM-004 | in_progress | Domain | 급여 정산 기준과 마감 플로우 상세화 |
| WI-DM-005 | completed | Domain | 모듈별 API 계약 상세화 |
| WI-DM-006 | completed | Domain | 로컬라이제이션 전체 적용 계획 수립 |
| WI-DM-007 | completed | Domain | 코어 화면 승인 로그 초기 작성 |
| WI-DM-008 | completed | Domain | 최종 승인 패스 기준 정의 |
| WI-DM-009 | completed | Domain | 구현 스프린트 분해 |
| WI-DM-010 | completed | Domain | 로컬라이제이션 적용 현황 정리 |

## Epic E. 확장 모듈

| ID | 상태 | 영역 | 작업 |
|---|---|---|---|
| WI-TA-008 | in_progress | Expansion | Performance 모듈 상세 설계 |
| WI-TA-009 | in_progress | Expansion | Recruiting / Onboarding / Offboarding 설계 |
| WI-TA-010 | in_progress | Expansion | Payroll Dashboard / Closing 설계 |
| WI-TA-011 | in_progress | Expansion | Reports / Insights 상세 설계 |

## Epic F. 디자인 시스템

| ID | 상태 | 영역 | 작업 |
|---|---|---|---|
| WI-DS-001 | in_progress | Design System | 시각 방향과 톤 정의 |
| WI-DS-002 | in_progress | Design System | 카드, 테이블, 필터, 인박스 패턴 설계 |
| WI-DS-003 | in_progress | Design System | 관리자 레이아웃 시스템 설계 |
| WI-DS-004 | in_progress | Design System | 직원 모바일 레이아웃 시스템 설계 |
| WI-DS-005 | in_progress | Design System | 상태 색상과 시각 언어 규칙 정리 |
| WI-DS-006 | in_progress | Design System | 공통 상태 및 예외 UX 패턴 정리 |
| WI-DS-007 | completed | Design System | 디자인 토큰 정의 |
| WI-DS-008 | completed | Design System | 공통 컴포넌트 규격서 작성 |
| WI-DS-009 | completed | Design System | 화면별 상태/예외 매핑표 작성 |

## 다음 우선순위

1. 비코어 화면 승인 로그 확대
2. 남은 비코어 화면 `LID-*` 마이그레이션
3. 사용자 decision 반영
4. `approved` 화면 R5 승격
