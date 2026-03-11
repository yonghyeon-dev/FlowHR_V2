# FlowHR_V2 화면별 API 계약 초안

## 목적

와이어와 모듈 설계를 실제 구현으로 넘기기 위해, 우선순위가 높은 화면의
API 계약 단위를 정리한다. 이 문서는 최종 OpenAPI 문서가 아니라,
프론트엔드와 백엔드가 같은 화면 기준으로 대화하기 위한 설계 초안이다.

## 공통 규칙

- 모든 응답은 현재 `tenantId` 또는 `platformScope`를 메타로 포함할 수 있어야 한다.
- `summary`, `list`, `detail`, `action`을 분리한다.
- 접근 거부는 빈 데이터가 아니라 명시적 에러로 응답한다.

## 1. Employee Home

화면:

- `TE-001`
- `TE-002`

필요 계약:

- `GET /employee/home/summary`
- `GET /employee/home/tasks`
- `GET /employee/home/week`
- `POST /employee/attendance/check-in`
- `POST /employee/attendance/check-out`

응답 예시:

```json
{
  "data": {
    "todayStatus": {
      "state": "working",
      "checkedInAt": "2026-03-11T09:02:00+09:00",
      "scheduledCheckoutAt": "2026-03-11T18:00:00+09:00"
    },
    "tasks": [],
    "summary": {
      "leaveBalance": 8.5,
      "activeRequests": 2
    }
  }
}
```

## 2. Admin Home Dashboard

화면:

- `TA-001`

필요 계약:

- `GET /admin/home/summary`
- `GET /admin/home/today-queue`
- `GET /admin/home/org-snapshot`
- `GET /admin/home/exception-monitor`
- `GET /admin/home/documents-payroll-watch`

주의:

- KPI와 큐는 동일 시점 보장이 어렵다면 `generatedAt` 메타를 포함한다.

## 3. People Module

화면:

- `TA-101`
- `TA-102`
- `TA-105`

필요 계약:

- `GET /admin/people`
- `GET /admin/people/{employeeId}`
- `POST /admin/people/import`
- `GET /admin/people/import-jobs/{jobId}`

## 4. Attendance Module

화면:

- `TA-201`
- `TA-204`
- `TE-102`

필요 계약:

- `GET /admin/attendance/summary`
- `GET /admin/attendance/exceptions`
- `POST /employee/attendance/corrections`
- `POST /admin/attendance/close`

주의:

- 예외 큐는 `severity`, `policyCode`, `actionRequired` 필드를 포함한다.

## 5. Leave / Request Hub

화면:

- `TA-301`
- `TE-201`
- `TE-202`

필요 계약:

- `GET /employee/leave/balance`
- `POST /employee/leave/requests`
- `GET /admin/leave/summary`
- `GET /admin/leave/requests`
- `POST /admin/leave/requests/{requestId}/approve`

## 6. Approval Inbox

화면:

- `TA-401`
- `TA-402`

필요 계약:

- `GET /admin/approvals`
- `GET /admin/approvals/{approvalId}`
- `POST /admin/approvals/{approvalId}/approve`
- `POST /admin/approvals/{approvalId}/reject`

주의:

- 액션 응답에는 다음 단계 상태와 병목 여부를 포함한다.

## 7. Documents / Signature

화면:

- `TA-501`
- `TE-401`
- `TE-402`

필요 계약:

- `GET /admin/documents/summary`
- `POST /admin/documents/send`
- `GET /employee/signatures`
- `GET /employee/signatures/{documentId}`
- `POST /employee/signatures/{documentId}/sign`

## 8. Payroll

화면:

- `TA-601`
- `TA-603`

필요 계약:

- `GET /admin/payroll/summary`
- `GET /admin/payroll/closing/{closingId}`
- `POST /admin/payroll/closing/{closingId}/run`
- `POST /admin/payroll/closing/{closingId}/confirm`

주의:

- 파괴적 액션 응답에는 영향 범위와 재실행 가능 여부를 포함한다.

## 9. Platform Tenant / Billing / Security

화면:

- `PC-103`
- `PC-201`~`PC-205`
- `PC-601`~`PC-604`

필요 계약:

- `GET /platform/tenants`
- `GET /platform/tenants/{tenantId}`
- `POST /platform/tenants/{tenantId}/status`
- `GET /platform/billing/summary`
- `GET /platform/billing/accounts/{tenantId}`
- `POST /platform/billing/adjustments`
- `GET /platform/feature-flags`
- `POST /platform/feature-flags/{flagKey}/assignments`
- `GET /platform/security/summary`
- `GET /platform/security/audit-events`
- `POST /platform/security/step-up`

## 10. 공통 에러 envelope

```json
{
  "error": {
    "code": "ACCESS_DENIED",
    "message": "You do not have permission to access this resource."
  }
}
```

## 연결 문서

- 데이터 계약/상태관리: [10-data-contract-state-management.md](./10-data-contract-state-management.md)
- 프론트엔드 구조: [09-frontend-route-component-architecture.md](./09-frontend-route-component-architecture.md)
- 설계 진행 보고서: [08-design-progress-report.md](./08-design-progress-report.md)
