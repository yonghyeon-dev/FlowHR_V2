# FlowHR_V2 권한별 메뉴/기능/행동 매핑표

## 목적

이 문서는 권한별 메뉴가 어떤 기능 묶음을 갖고,
실제 사용자는 어떤 대표 행동을 수행하는지 연결하기 위한 매핑표다.

## 1. Platform Operator

| 권한 | 메뉴 | 기능 묶음 | 대표 행동 | 관련 화면 | 관련 WI |
|---|---|---|---|---|---|
| Platform Operator | Dashboard | 운영 위험 관제 | 위험 확인, 우선순위 판단, 후속 화면 진입 | `PC-001` | `WI-PC-004` |
| Platform Operator | Tenants | 테넌트 운영 | 검색, 생성, 상태 변경, 상세 조회, 복구 | `PC-101`~`PC-104` | `WI-PC-001`, `WI-PC-004` |
| Platform Operator | Plans & Billing | 플랜/청구 운영 | 플랜 조회, 청구 확인, 수동 조정, 기능 예외 부여 | `PC-201`~`PC-205` | `WI-PC-006` |
| Platform Operator | Policy Templates | 정책 템플릿 운영 | 근무/휴가/결재 템플릿 조회, 수정, 배포 | `PC-301`~`PC-303` | `WI-PC-001`, `WI-PC-002` |
| Platform Operator | Support Ops | 지원 처리 | 티켓 확인, 이슈 상세 확인, 공지 발송 | `PC-401`~`PC-403` | `WI-PC-004` |
| Platform Operator | Monitoring | 서비스 모니터링 | 상태 점검, 이상 징후 추적, 사용량 분석 | `PC-501`, `PC-502` | `WI-PC-004`, `WI-PC-005` |
| Platform Operator | Audit & Security | 보안 통제 | 감사 조회, 권한 검토, 보안 정책 변경, 세션 재검증 | `PC-601`~`PC-604` | `WI-PC-003`, `WI-PC-005` |
| Platform Operator | Platform Settings | 전역 설정 | 전역값 수정, 연동 관리 | `PC-701`, `PC-702` | `WI-PC-002` |

## 2. Tenant Admin

| 권한 | 메뉴 | 기능 묶음 | 대표 행동 | 관련 화면 | 관련 WI |
|---|---|---|---|---|---|
| Tenant Admin | Home | 운영 시작 허브 | 예외 확인, 승인 진입, 조직 상태 확인 | `TA-001`, `TA-002` | `WI-TA-001` |
| Tenant Admin | People | 인사 정보 운영 | 직원 조회, 프로필 수정, 조직도 확인, 일괄 등록 | `TA-101`~`TA-105` | `WI-TA-002` |
| Tenant Admin | Attendance | 근태 운영 | 근태 확인, 스케줄 편성, 예외 처리, 마감 실행 | `TA-201`~`TA-205` | `WI-TA-003` |
| Tenant Admin | Leave | 휴가 운영 | 현황 확인, 정책 수정, 캘린더 조회, 요청 승인 | `TA-301`~`TA-304` | `WI-TA-004` |
| Tenant Admin | Workflow | 결재 운영 | 인박스 처리, 상세 검토, 결재선 설계, 이력 조회 | `TA-401`~`TA-404` | `WI-TA-005` |
| Tenant Admin | Documents | 전자문서 운영 | 현황 확인, 템플릿 관리, 발송, 보관 문서 조회 | `TA-501`~`TA-504` | `WI-TA-006` |
| Tenant Admin | Payroll | 급여 운영 | 요약 확인, 규칙 관리, 마감 실행, 명세서 배포 | `TA-601`~`TA-604` | `WI-TA-010` |
| Tenant Admin | Performance | 성과 운영 | 목표 확인, 평가 설정, 평가 진행, 1:1 기록 | `TA-701`~`TA-704` | `WI-TA-008` |
| Tenant Admin | Recruiting | 채용/입퇴사 운영 | 공고 관리, 후보자 이동, 온보딩/오프보딩 처리 | `TA-801`~`TA-805` | `WI-TA-009` |
| Tenant Admin | Reports | 리포트 운영 | 지표 확인, 인사이트 조회, 내보내기, 예약 발송 | `TA-901`~`TA-904` | `WI-TA-011` |
| Tenant Admin | Settings | 조직 설정 | 회사 설정, 권한 설정, 알림 설정, 연동 관리, 감사 조회 | `TA-1001`~`TA-1005` | `WI-TA-007` |

## 3. Tenant Employee

| 권한 | 메뉴 | 기능 묶음 | 대표 행동 | 관련 화면 | 관련 WI |
|---|---|---|---|---|---|
| Tenant Employee | Home | 셀프서비스 시작 허브 | 오늘 상태 확인, 빠른 실행, 처리할 항목 이동 | `TE-001`, `TE-002` | `WI-TE-001` |
| Tenant Employee | Schedule | 일정/근태 확인 | 일정 조회, 출퇴근 기록, 내 근태 확인 | `TE-101`~`TE-103` | `WI-TE-002` |
| Tenant Employee | Requests | 요청 처리 | 요청 유형 선택, 휴가 신청, 정정 신청, 요청 이력 확인 | `TE-201`~`TE-205` | `WI-TE-003` |
| Tenant Employee | Inbox | 알림 확인 | 인박스 확인, 알림 상세 확인 | `TE-301`, `TE-302` | `WI-TE-004` |
| Tenant Employee | Documents | 문서 서명 | 서명 필요 문서 확인, 문서 검토, 서명 실행, 보관 문서 조회 | `TE-401`~`TE-403` | `WI-TE-004` |
| Tenant Employee | My Profile | 개인 정보/현황 | 프로필 확인, 잔액 확인, 성과 조회 | `TE-501`~`TE-503` | `WI-TE-005` |

## 행동 단위 원칙

- 하나의 메뉴는 `조회 행동`과 `처리 행동`을 동시에 가질 수 있다.
- 처리 행동이 파괴적이거나 민감하면 별도 확인 패턴과 권한 검사를 전제한다.
- 같은 기능 묶음이라도 권한 레이어가 다르면 대표 행동이 달라질 수 있다.
- 매핑표는 화면 추가 시 같이 갱신한다.

## Stage 3 완료 기준 연결

- 이 문서는 [IA 계층표](/C:/Team-jane/FlowHR_V2/docs/foundation/17-ia-hierarchy-breakdown.md)와 함께
  Stage 3의 `권한별 메뉴/기능/행동 매핑표` 기준을 충족한다.

## 연결 문서

- 단계 게이트: [00-stage-gates.md](./00-stage-gates.md)
- IA 계층표: [17-ia-hierarchy-breakdown.md](./17-ia-hierarchy-breakdown.md)
- 화면 맵: [04-screen-map.md](./04-screen-map.md)
