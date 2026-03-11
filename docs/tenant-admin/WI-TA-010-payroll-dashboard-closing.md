# WI-TA-010 Payroll Dashboard / Closing 상세 설계

## 작업 ID

- `WI-TA-010`

## 목적

급여 모듈은 숫자 계산 화면이 아니라 마감 리스크를 관리하는 운영 보드여야 한다.
확정 근태, 휴가 차감, 승인 결과, 문서 상태가 급여 마감 큐 안에서 연결되어야 한다.

## 화면 구성

- `TA-601` Payroll Dashboard
- `TA-602` Payroll Rules
- `TA-603` Payroll Closing
- `TA-604` Payslip Center

## 핵심 UX

- 마감 준비 상태를 첫 화면에서 읽을 수 있어야 한다.
- 예외 항목은 조직/직원 단위로 drill-down 가능해야 한다.
- 정산 규칙 수정과 마감 실행은 같은 화면에서 섞지 않는다.
- 명세서 발행 전 검토 흐름이 별도로 보여야 한다.

## 운영 포인트

- 미확정 근태
- 미승인 초과근무
- 휴가 차감 불일치
- 수당/공제 규칙 충돌
- 명세서 발행 대기

## 주요 액션

- 예외 항목 검토
- 수동 보정
- 마감 준비 완료 처리
- 마감 실행
- 명세서 발행

## 산출물

- Payroll 와이어프레임: [payroll-module-detailed.html](../../wireframes/tenant-admin/payroll-module-detailed.html)
