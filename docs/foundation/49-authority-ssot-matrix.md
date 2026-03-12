# FlowHR_V2 권한 SSOT 매트릭스

## 목적

이 문서는 현재 코드의 권한 기준을 `role -> area -> view -> action -> field` 순서로 고정한다.

코드 기준 파일:
- [access-policy.ts](C:\Team-jane\FlowHR_V2\src\lib\access-policy.ts)

## 역할

- `platform_operator`
- `tenant_admin`
- `tenant_manager`
- `tenant_employee`

## 역할별 허용 범위

### `platform_operator`

- area
  - `platform`
- view
  - `platform/console`
- action
  - `platform.tenants.manage`
- field
  - `tenant.pack`
  - `tenant.status`
  - `tenant.enabledFeatures`

### `tenant_admin`

- area
  - `admin`
- view
  - `home`
  - `people`
  - `attendance`
  - `leave`
  - `workflow`
  - `documents`
  - `payroll`
  - `performance`
  - `recruiting`
  - `reports`
  - `settings`
- action
  - `admin.workflow.approve`
  - `admin.settings.update`
- field
  - `settings.companyName`
  - `settings.businessNumber`
  - `settings.timezone`
  - `settings.workStart`
  - `settings.workEnd`

### `tenant_manager`

- area
  - `admin`
- view
  - `home`
  - `people`
  - `attendance`
  - `leave`
  - `workflow`
  - `documents`
  - `performance`
  - `reports`
- action
  - `admin.workflow.approve`
- field
  - 없음

### `tenant_employee`

- area
  - `employee`
- view
  - `home`
  - `schedule`
  - `requests`
  - `inbox`
  - `documents`
  - `profile`
- action
  - `employee.requests.submit`
  - `employee.documents.sign`
- field
  - `request.category`
  - `request.title`
  - `request.reason`
  - `document.signature`

## 적용 원칙

- 라우트 접근은 `area + view` 기준으로 막는다.
- API 접근은 `action` 기준으로 막는다.
- 필드 단위 편집은 `field` 기준으로 막는다.
- 역할별 기본 진입 경로는 `default route`를 따른다.
