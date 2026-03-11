# WI-TE-003 휴가 및 요청 허브 상세 설계

## 작업 ID

- `WI-TE-003`

## 목적

직원 요청 경험은 여러 폼을 흩어두는 방식이 아니라 `요청 허브`를 통해
유형 선택, 정책 확인, 입력, 상태 추적이 이어지는 구조여야 한다.

## 대상 화면

- `TE-201` New Request Hub
- `TE-202` Leave Request Form
- `TE-203` Attendance Correction Request
- `TE-204` Expense / General Workflow Request
- `TE-205` My Request History

## 핵심 UX

- 자주 쓰는 요청은 첫 화면에서 바로 선택 가능해야 한다.
- 요청 전 필요한 정책 요약을 짧게 보여준다.
- 작성 중 초안과 제출 후 상태 추적이 자연스럽게 이어져야 한다.
- 반려 사유와 재제출 진입점이 명확해야 한다.

## 요청 유형

- 연차 / 반차 / 시간 단위 휴가
- 출퇴근 정정
- 초과근무 요청
- 비용 / 일반 품의
- 문서 관련 요청

## 구성 원칙

- 상단: 요청 유형 선택
- 중단: 선택 유형별 핵심 입력 필드
- 하단: 최근 요청, 진행 상태, 반려 건 재진입

## 주요 액션

- 새 요청 생성
- 초안 저장
- 제출
- 취소
- 재제출
- 이력 조회

## 산출물

- 요청 허브 와이어프레임: [request-hub-detailed.html](../../wireframes/tenant-employee/request-hub-detailed.html)
