export type UserRole =
  | "platform_operator"
  | "tenant_admin"
  | "tenant_manager"
  | "tenant_employee";

export type TenantPack = "office" | "retail";
export type TenantStatus = "active" | "trial" | "grace";
export type RequestStatus = "draft" | "submitted" | "approved" | "rejected";
export type DocumentStatus = "pending_signature" | "signed";
export type ApprovalAction = "approve" | "reject";

export type AppUser = {
  id: string;
  email: string;
  password: string;
  fullName: string;
  role: UserRole;
};

export type Tenant = {
  id: string;
  slug: string;
  name: string;
  pack: TenantPack;
  status: TenantStatus;
  enabledFeatures: string[];
};

export type Membership = {
  id: string;
  userId: string;
  tenantId: string;
  title: string;
};

export type RequestRecord = {
  id: string;
  tenantId: string;
  authorId: string;
  category: string;
  title: string;
  reason: string;
  status: RequestStatus;
  createdAt: string;
  updatedAt: string;
};

export type DocumentRecord = {
  id: string;
  tenantId: string;
  ownerId: string;
  title: string;
  status: DocumentStatus;
  createdAt: string;
  updatedAt: string;
};

export type ApprovalRecord = {
  id: string;
  tenantId: string;
  requestId: string;
  actorId: string;
  action: ApprovalAction;
  createdAt: string;
};

export type SettingsSnapshot = {
  id: string;
  tenantId: string;
  companyName: string;
  businessNumber: string;
  timezone: string;
  workStart: string;
  workEnd: string;
  updatedBy: string;
  updatedAt: string;
};

export type AuditLogRecord = {
  id: string;
  tenantId: string | null;
  actorId: string;
  actorRole: UserRole;
  eventType:
    | "login"
    | "tenant_update"
    | "request_submit"
    | "approval_approve"
    | "approval_reject"
    | "document_sign"
    | "settings_update";
  message: string;
  createdAt: string;
};

export type SessionPayload = {
  userId: string;
  tenantId: string;
  role: UserRole;
};

export type DevStore = {
  users: AppUser[];
  tenants: Tenant[];
  memberships: Membership[];
  requests: RequestRecord[];
  documents: DocumentRecord[];
  approvals: ApprovalRecord[];
  settings: SettingsSnapshot[];
  auditLogs: AuditLogRecord[];
};
