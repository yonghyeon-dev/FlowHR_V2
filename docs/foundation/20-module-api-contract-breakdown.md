# FlowHR_V2 모듈별 API 계약 상세

## 작업 ID

- `WI-DM-005`

## 목적

[11-screen-api-contracts.md](./11-screen-api-contracts.md)가 화면 기준 계약 초안이라면,
이 문서는 실제 구현에 가까운 모듈 단위 계약으로 세분화한 상세판이다.

## 공통 규칙

### Query 파라미터

- `page`, `pageSize`
- `sort`, `order`
- `query`
- `status`
- `from`, `to`

### Meta 규칙

```json
{
  "meta": {
    "tenantId": "t_001",
    "generatedAt": "2026-03-11T10:00:00+09:00",
    "page": 1,
    "pageSize": 20,
    "total": 124
  }
}
```

### Mutation 응답 규칙

```json
{
  "data": {
    "result": "success",
    "resourceId": "req_001",
    "impactSummary": {
      "affectedCount": 1
    }
  }
}
```

## 1. Tenant Employee

### 1-1. Employee Home

| 계약 유형 | Endpoint | 설명 |
|---|---|---|
| summary | `GET /employee/home/summary` | 오늘 상태, 잔액, 요청 수 |
| list | `GET /employee/home/tasks` | 오늘 처리할 작업 |
| list | `GET /employee/home/week` | 주간 일정/근무 요약 |
| action | `POST /employee/attendance/check-in` | 출근 기록 |
| action | `POST /employee/attendance/check-out` | 퇴근 기록 |

필드 기준:

- `todayStatus.state`
- `checkedInAt`
- `scheduledCheckoutAt`
- `activeRequests`
- `pendingSignatureCount`

### 1-2. Requests

| 계약 유형 | Endpoint | 설명 |
|---|---|---|
| summary | `GET /employee/requests/summary` | 요청 허브 요약 |
| detail | `GET /employee/leave/balance` | 휴가 잔액 |
| action | `POST /employee/leave/requests` | 휴가 요청 제출 |
| action | `POST /employee/attendance/corrections` | 출퇴근 정정 제출 |
| action | `POST /employee/workflow/requests` | 일반 품의/비용 요청 제출 |
| list | `GET /employee/requests/history` | 내 요청 이력 |
| detail | `GET /employee/requests/{requestId}` | 요청 상세 |

폼 규칙:

- draft 가능 시 `POST /employee/requests/drafts`
- 제출 시 `fieldErrors`, `actionError` 분리

### 1-3. Signature / Inbox

| 계약 유형 | Endpoint | 설명 |
|---|---|---|
| list | `GET /employee/inbox` | 인박스 목록 |
| detail | `GET /employee/inbox/{itemId}` | 인박스 상세 |
| list | `GET /employee/signatures` | 서명 필요 문서 |
| detail | `GET /employee/signatures/{documentId}` | 문서 상세 |
| action | `POST /employee/signatures/{documentId}/sign` | 서명 실행 |

필드 기준:

- `dueAt`
- `documentType`
- `requiresSignature`
- `status`

## 2. Tenant Admin

### 2-1. Admin Home

| 계약 유형 | Endpoint | 설명 |
|---|---|---|
| summary | `GET /admin/home/summary` | KPI 요약 |
| list | `GET /admin/home/today-queue` | 오늘 운영 큐 |
| detail | `GET /admin/home/org-snapshot` | 조직 상태 |
| list | `GET /admin/home/exception-monitor` | 예외 모니터링 |
| detail | `GET /admin/home/documents-payroll-watch` | 문서/급여 주시 |

필드 기준:

- `pendingApprovals`
- `attendanceExceptions`
- `signatureOverdueCount`
- `payrollClosingState`

### 2-2. People

| 계약 유형 | Endpoint | 설명 |
|---|---|---|
| list | `GET /admin/people` | 직원 목록 |
| detail | `GET /admin/people/{employeeId}` | 직원 상세 |
| list | `GET /admin/people/{employeeId}/history` | 인사 이력 |
| list | `GET /admin/org-chart` | 조직도 |
| action | `POST /admin/people/import` | 일괄 등록 시작 |
| detail | `GET /admin/people/import-jobs/{jobId}` | import 작업 상태 |

목록 필드:

- `employeeId`
- `employmentStatus`
- `department`
- `position`
- `managerName`

### 2-3. Attendance

| 계약 유형 | Endpoint | 설명 |
|---|---|---|
| summary | `GET /admin/attendance/summary` | 근태 대시보드 요약 |
| list | `GET /admin/attendance/records` | 근태 기록 |
| list | `GET /admin/attendance/exceptions` | 예외 큐 |
| detail | `GET /admin/attendance/exceptions/{exceptionId}` | 예외 상세 |
| action | `POST /admin/attendance/exceptions/{exceptionId}/resolve` | 예외 처리 |
| action | `POST /admin/attendance/close` | 근태 마감 |

예외 필드:

- `severity`
- `policyCode`
- `employeeId`
- `actionRequired`
- `blockingClosing`

### 2-4. Leave

| 계약 유형 | Endpoint | 설명 |
|---|---|---|
| summary | `GET /admin/leave/summary` | 휴가 현황 요약 |
| list | `GET /admin/leave/requests` | 휴가 요청 목록 |
| detail | `GET /admin/leave/requests/{requestId}` | 요청 상세 |
| detail | `GET /admin/leave/policies` | 정책 목록 |
| action | `POST /admin/leave/requests/{requestId}/approve` | 승인 |
| action | `POST /admin/leave/requests/{requestId}/reject` | 반려 |

### 2-5. Workflow / Documents

| 계약 유형 | Endpoint | 설명 |
|---|---|---|
| list | `GET /admin/approvals` | 결재 인박스 |
| detail | `GET /admin/approvals/{approvalId}` | 결재 상세 |
| action | `POST /admin/approvals/{approvalId}/approve` | 결재 승인 |
| action | `POST /admin/approvals/{approvalId}/reject` | 결재 반려 |
| summary | `GET /admin/documents/summary` | 문서 요약 |
| list | `GET /admin/documents` | 문서 목록 |
| action | `POST /admin/documents/send` | 문서 발송 |
| detail | `GET /admin/documents/jobs/{jobId}` | 발송 작업 상태 |

### 2-6. Payroll / Reports

| 계약 유형 | Endpoint | 설명 |
|---|---|---|
| summary | `GET /admin/payroll/summary` | 급여 요약 |
| detail | `GET /admin/payroll/closing/{closingId}` | 마감 상세 |
| action | `POST /admin/payroll/closing/{closingId}/run` | 마감 실행 |
| action | `POST /admin/payroll/closing/{closingId}/confirm` | 마감 확정 |
| summary | `GET /admin/reports/summary` | 리포트 요약 |
| list | `GET /admin/reports/exports` | 내보내기 이력 |
| action | `POST /admin/reports/exports` | 내보내기 요청 |

## 3. Platform Operator

### 3-1. Tenant / Billing

| 계약 유형 | Endpoint | 설명 |
|---|---|---|
| list | `GET /platform/tenants` | 테넌트 목록 |
| detail | `GET /platform/tenants/{tenantId}` | 테넌트 상세 |
| action | `POST /platform/tenants/{tenantId}/status` | 상태 변경 |
| summary | `GET /platform/billing/summary` | 과금 요약 |
| detail | `GET /platform/billing/accounts/{tenantId}` | 과금 계정 상세 |
| action | `POST /platform/billing/adjustments` | 수동 조정 |
| list | `GET /platform/invoices` | 송장 목록 |

필드 기준:

- `planCode`
- `seatCount`
- `paymentStatus`
- `graceState`
- `riskLevel`

### 3-2. Feature Flags / Security

| 계약 유형 | Endpoint | 설명 |
|---|---|---|
| list | `GET /platform/feature-flags` | 플래그 목록 |
| detail | `GET /platform/feature-flags/{flagKey}` | 플래그 상세 |
| action | `POST /platform/feature-flags/{flagKey}/assignments` | 예외 부여 |
| summary | `GET /platform/security/summary` | 보안 요약 |
| list | `GET /platform/security/audit-events` | 감사 이벤트 |
| detail | `GET /platform/security/audit-events/{eventId}` | 감사 상세 |
| action | `POST /platform/security/step-up` | 승격 인증 |
| action | `POST /platform/security/sessions/{sessionId}/revoke` | 세션 회수 |

## 4. 공통 에러 / 권한 응답

### 접근 거부

```json
{
  "error": {
    "code": "ACCESS_DENIED",
    "message": "You do not have permission to access this resource.",
    "requestScope": "admin.payroll.closing"
  }
}
```

### 필드 에러

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "fieldErrors": {
      "startDate": "Required"
    }
  }
}
```

## 5. 구현 연결 기준

- `summary`는 대시보드/상단 카드용
- `list`는 테이블/인박스/큐용
- `detail`은 drawer 또는 detail page용
- `action`은 mutation용
- destructive action은 `impactSummary`와 `retriable` 여부를 포함한다

## 연결 문서

- 화면별 초안: [11-screen-api-contracts.md](./11-screen-api-contracts.md)
- 데이터 계약/상태관리: [10-data-contract-state-management.md](./10-data-contract-state-management.md)
- 화면 준비도 매트릭스: [14-screen-readiness-matrix.md](./14-screen-readiness-matrix.md)
