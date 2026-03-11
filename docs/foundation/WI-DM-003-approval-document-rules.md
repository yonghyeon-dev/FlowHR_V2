# WI-DM-003 결재 문서 유형과 승인 규칙 상세화

## 작업 ID

- `WI-DM-003`

## 목적

결재 규칙은 단순 승인 단계 수가 아니라, 요청 유형별 문서 구조, 승인자 범위,
병목 처리, 반려/재제출 상태를 함께 정의하는 업무 규칙이다.

## 문서 유형 분류

### A. 근태 계열

- 출퇴근 정정
- 초과근무 요청
- 스케줄 조정 요청

### B. 휴가 계열

- 연차 신청
- 반차 신청
- 시간 단위 휴가

### C. 비용/품의 계열

- 비용 정산
- 일반 품의
- 구매 요청

### D. 문서 계열

- 전자계약 서명
- 정책 동의
- 인사 안내문 확인

## 승인 규칙 요소

- 기본 승인자
- 조직장 추가 승인
- 금액/시간/리스크 기준 추가 단계
- 문서 열람 필수 여부
- 서명 필수 여부

## 상태 흐름

- Draft
- Submitted
- Pending
- Escalated
- Approved
- Rejected
- Returned for Revision
- Completed

## 병목 처리 원칙

- 마감 임박 건은 인박스 상단으로 올린다.
- 장기 대기 건은 리마인더와 에스컬레이션 대상이 된다.
- 반려 시 재제출 진입점을 유지한다.

## 사용자 노출 방식

### Tenant Admin

- Approval Inbox
- Approval Detail
- Workflow Builder

### Tenant Employee

- Request Hub 상태 추적
- My Inbox 승인 결과
- Signature Inbox 문서 처리

## 연결 작업

- `WI-TA-005` Workflow 모듈
- `WI-TE-003` 요청 허브
- `WI-TE-004` 문서 서명 및 인박스
