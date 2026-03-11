# WI-DS-009 화면별 상태/예외 매핑표

## 작업 ID

- `WI-DS-009`

## 목적

공통 상태 패턴을 실제 주요 화면에 어떻게 적용할지 매핑한다.
이 문서는 구현 시 `loading`, `empty`, `error`, `no-permission`, `confirm`,
`success`를 화면 단위로 빠짐없이 적용하기 위한 기준이다.

## 상태 분류

- `loading`: 최초 로드, 부분 로드, mutation 진행
- `empty`: 데이터 없음, 필터 결과 없음, 기능 미활성
- `error`: 네트워크 실패, 처리 실패, 외부 연동 실패
- `no-permission`: URL 직접 접근 또는 액션 권한 부족
- `confirm`: 파괴적/민감 액션 전 확인
- `success`: 저장/발송/승인/마감 완료 피드백

## 1. Platform

| 화면 ID | loading | empty | error | no-permission | confirm | success |
|---|---|---|---|---|---|---|
| `PC-001` | KPI skeleton, queue skeleton | 오늘 처리할 항목 없음 | 플랫폼 요약 로드 실패 | 운영 범위 없음 안내 | 해당 없음 | 필터 적용 완료 |
| `PC-103` | tenant meta panel skeleton | 검색 결과 없음 | 테넌트 상세 로드 실패 | 접근 가능한 tenant 아님 | 상태 변경 전 확인 | 상태 변경 완료 |
| `PC-204` | adjustment list skeleton | 조정 이력 없음 | 조정 등록 실패 | Billing scope 없음 | 수동 조정 전 확인 | 조정 등록 완료 |
| `PC-205` | flag matrix skeleton | 예외 플래그 없음 | 플래그 로드 실패 | Flag edit 권한 없음 | 플래그 비활성화 전 확인 | 플래그 변경 완료 |
| `PC-601` | audit stream skeleton | 최근 이벤트 없음 | 로그 조회 실패 | Audit scope 없음 | 해당 없음 | 필터 저장 완료 |
| `PC-604` | auth risk board skeleton | 검토 항목 없음 | 세션 정책 로드 실패 | Security admin 아님 | Step-up 인증 | 세션 회수 완료 |

## 2. Tenant Admin

| 화면 ID | loading | empty | error | no-permission | confirm | success |
|---|---|---|---|---|---|---|
| `TA-001` | KPI + queue skeleton | 오늘 처리 항목 없음 | 홈 요약 실패 | 관리자 권한 없음 | 해당 없음 | 빠른 승인 완료 |
| `TA-101` | table skeleton | 직원 없음 / 필터 결과 없음 | 직원 목록 로드 실패 | People 접근 권한 없음 | 일괄 비활성화 전 확인 | 등록 완료 |
| `TA-204` | exception queue skeleton | 예외 없음 | 예외 로드 실패 | Attendance 예외 권한 없음 | 예외 일괄 확정 전 확인 | 예외 처리 완료 |
| `TA-304` | request list skeleton | 요청 없음 | 요청 로드 실패 | Leave 승인 권한 없음 | 반려/승인 전 확인 | 승인 완료 |
| `TA-503` | send job skeleton | 발송 대상 없음 | 발송 실패 | Documents send 권한 없음 | 일괄 발송 전 확인 | 발송 완료 |
| `TA-603` | closing step skeleton | 마감 대상 없음 | 마감 실행 실패 | Payroll closing 권한 없음 | 급여 마감 전 확인 | 마감 완료 |
| `TA-1002` | role matrix skeleton | 역할 없음 | 권한 로드 실패 | Role admin 권한 없음 | 권한 회수 전 확인 | 권한 저장 완료 |

## 3. Tenant Employee

| 화면 ID | loading | empty | error | no-permission | confirm | success |
|---|---|---|---|---|---|---|
| `TE-001` | 오늘 상태 skeleton | 오늘 할 일 없음 | 홈 로드 실패 | 직원 계정 미연결 | 해당 없음 | 출근 기록 완료 |
| `TE-102` | check state loading | 기록 없음 | 체크인/체크아웃 실패 | 위치/정책 미충족 | 정정 제출 전 확인 | 출근/퇴근 완료 |
| `TE-201` | request type loading | 사용 가능한 요청 없음 | 요청 허브 로드 실패 | 요청 권한 없음 | 제출 전 확인 | 요청 제출 완료 |
| `TE-205` | history list skeleton | 요청 이력 없음 | 이력 로드 실패 | Self scope 아님 | 취소 전 확인 | 요청 취소 완료 |
| `TE-401` | inbox list skeleton | 서명 필요 문서 없음 | 서명 목록 실패 | 문서 접근 권한 없음 | 서명 실행 전 확인 | 서명 완료 |
| `TE-503` | performance summary skeleton | 성과 데이터 없음 | 성과 로드 실패 | 공개 범위 제한 | 해당 없음 | 목표 코멘트 저장 완료 |

## 4. 상태 적용 규칙

- `loading`은 전체 페이지 블로킹보다 영역 단위 skeleton을 우선한다.
- `empty`는 이유별로 문구를 분리한다.
- `error`는 재시도 경로를 제공한다.
- `no-permission`은 빈 화면으로 대체하지 않는다.
- `confirm`은 영향 범위와 되돌릴 수 있는지 여부를 먼저 보여준다.
- `success`는 토스트만으로 끝내지 않고, 필요한 경우 inline summary를 함께 갱신한다.

## 5. 구현 연결

- 각 화면의 상태 컴포넌트는 [WI-DS-008-component-specifications.md](./WI-DS-008-component-specifications.md) 규격을 따른다.
- 상태 라벨은 `LID-COMMON-*` 또는 해당 role namespace를 사용한다.
- `R3` 이상 화면은 최소 `loading`, `empty`, `error`, `no-permission` 상태를 구현 전 반드시 매핑한다.

## 연결 문서

- 공통 상태 패턴: [WI-DS-006-common-state-patterns.md](./WI-DS-006-common-state-patterns.md)
- 공통 컴포넌트 규격서: [WI-DS-008-component-specifications.md](./WI-DS-008-component-specifications.md)
- 화면 준비도 매트릭스: [14-screen-readiness-matrix.md](../foundation/14-screen-readiness-matrix.md)
