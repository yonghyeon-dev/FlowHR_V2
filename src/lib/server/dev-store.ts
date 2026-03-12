import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

import type {
  AppUser,
  ApprovalAction,
  ApprovalRecord,
  AuditLogRecord,
  DevStore,
  DocumentRecord,
  Membership,
  RequestRecord,
  SessionPayload,
  SettingsSnapshot,
  Tenant,
  TenantPack,
  UserRole,
} from "@/lib/domain/types";

const storePath = path.join(process.cwd(), ".flowhr-dev-store.json");

function now() {
  return new Date().toISOString();
}

function createId(prefix: string) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

function seedUsers(): AppUser[] {
  return [
    {
      id: "usr_platform_001",
      email: "platform@flowhr.dev",
      password: "flowhr123!",
      fullName: "플랫폼 운영자",
      role: "platform_operator",
    },
    {
      id: "usr_office_admin_001",
      email: "admin@acme.flowhr.dev",
      password: "flowhr123!",
      fullName: "박서준",
      role: "tenant_admin",
    },
    {
      id: "usr_office_manager_001",
      email: "manager@acme.flowhr.dev",
      password: "flowhr123!",
      fullName: "김하늘",
      role: "tenant_manager",
    },
    {
      id: "usr_office_employee_001",
      email: "employee@acme.flowhr.dev",
      password: "flowhr123!",
      fullName: "김민지",
      role: "tenant_employee",
    },
    {
      id: "usr_retail_admin_001",
      email: "admin@nova.flowhr.dev",
      password: "flowhr123!",
      fullName: "이도윤",
      role: "tenant_admin",
    },
    {
      id: "usr_retail_employee_001",
      email: "employee@nova.flowhr.dev",
      password: "flowhr123!",
      fullName: "최수아",
      role: "tenant_employee",
    },
  ];
}

function seedTenants(): Tenant[] {
  return [
    {
      id: "ten_office_001",
      slug: "acme-corp",
      name: "Acme Corp",
      pack: "office",
      status: "active",
      enabledFeatures: ["attendance", "workflow", "documents", "settings"],
    },
    {
      id: "ten_retail_001",
      slug: "nova-team",
      name: "Nova Team",
      pack: "retail",
      status: "trial",
      enabledFeatures: ["attendance", "schedule", "requests", "documents"],
    },
  ];
}

function seedMemberships(): Membership[] {
  return [
    {
      id: "mem_001",
      userId: "usr_office_admin_001",
      tenantId: "ten_office_001",
      title: "HR 관리자",
    },
    {
      id: "mem_002",
      userId: "usr_office_manager_001",
      tenantId: "ten_office_001",
      title: "팀장",
    },
    {
      id: "mem_003",
      userId: "usr_office_employee_001",
      tenantId: "ten_office_001",
      title: "프로덕트 디자이너",
    },
    {
      id: "mem_004",
      userId: "usr_retail_admin_001",
      tenantId: "ten_retail_001",
      title: "매장 운영 관리자",
    },
    {
      id: "mem_005",
      userId: "usr_retail_employee_001",
      tenantId: "ten_retail_001",
      title: "매장 스태프",
    },
  ];
}

function seedRequests(): RequestRecord[] {
  const createdAt = now();
  return [
    {
      id: "req_001",
      tenantId: "ten_office_001",
      authorId: "usr_office_employee_001",
      category: "leave",
      title: "연차 요청",
      reason: "개인 일정",
      status: "submitted",
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "req_002",
      tenantId: "ten_retail_001",
      authorId: "usr_retail_employee_001",
      category: "shift_change",
      title: "시프트 변경 요청",
      reason: "개인 사정",
      status: "submitted",
      createdAt,
      updatedAt: createdAt,
    },
  ];
}

function seedDocuments(): DocumentRecord[] {
  const createdAt = now();
  return [
    {
      id: "doc_001",
      tenantId: "ten_office_001",
      ownerId: "usr_office_employee_001",
      title: "2026 근로계약서 갱신",
      status: "pending_signature",
      createdAt,
      updatedAt: createdAt,
    },
    {
      id: "doc_002",
      tenantId: "ten_retail_001",
      ownerId: "usr_retail_employee_001",
      title: "매장 안전 서약서",
      status: "pending_signature",
      createdAt,
      updatedAt: createdAt,
    },
  ];
}

function seedSettings(): SettingsSnapshot[] {
  return [
    {
      id: "set_001",
      tenantId: "ten_office_001",
      companyName: "Acme Corp",
      businessNumber: "123-45-67890",
      timezone: "Asia/Seoul",
      workStart: "09:00",
      workEnd: "18:00",
      updatedBy: "usr_office_admin_001",
      updatedAt: now(),
    },
    {
      id: "set_002",
      tenantId: "ten_retail_001",
      companyName: "Nova Team",
      businessNumber: "234-56-78901",
      timezone: "Asia/Seoul",
      workStart: "10:00",
      workEnd: "19:00",
      updatedBy: "usr_retail_admin_001",
      updatedAt: now(),
    },
  ];
}

function seedAuditLogs(): AuditLogRecord[] {
  return [
    {
      id: "log_001",
      tenantId: null,
      actorId: "usr_platform_001",
      actorRole: "platform_operator",
      eventType: "login",
      message: "플랫폼 운영자가 콘솔에 로그인했습니다.",
      createdAt: now(),
    },
  ];
}

function defaultStore(): DevStore {
  return {
    users: seedUsers(),
    tenants: seedTenants(),
    memberships: seedMemberships(),
    requests: seedRequests(),
    documents: seedDocuments(),
    approvals: [],
    settings: seedSettings(),
    auditLogs: seedAuditLogs(),
  };
}

function readStore(): DevStore {
  if (!existsSync(storePath)) {
    const seeded = defaultStore();
    writeStore(seeded);
    return seeded;
  }

  return JSON.parse(readFileSync(storePath, "utf8")) as DevStore;
}

function writeStore(store: DevStore) {
  writeFileSync(storePath, JSON.stringify(store, null, 2), "utf8");
}

export function getStore() {
  return readStore();
}

export function authenticateUser(email: string, password: string) {
  const store = readStore();
  return store.users.find((user) => user.email === email && user.password === password) ?? null;
}

export function getUserById(userId: string) {
  return readStore().users.find((user) => user.id === userId) ?? null;
}

export function getTenantById(tenantId: string) {
  return readStore().tenants.find((tenant) => tenant.id === tenantId) ?? null;
}

export function getUserTenants(userId: string) {
  const store = readStore();
  const tenantIds = store.memberships
    .filter((membership) => membership.userId === userId)
    .map((membership) => membership.tenantId);

  return store.tenants.filter((tenant) => tenantIds.includes(tenant.id));
}

export function getDefaultSessionForUser(user: AppUser): SessionPayload {
  const firstTenant = getUserTenants(user.id)[0] ?? readStore().tenants[0];
  return {
    userId: user.id,
    tenantId: firstTenant.id,
    role: user.role,
  };
}

export function listTenants() {
  return readStore().tenants;
}

export function updateTenantConfig(tenantId: string, input: Partial<Pick<Tenant, "pack" | "status" | "enabledFeatures">>, actor: AppUser) {
  const store = readStore();
  const tenant = store.tenants.find((item) => item.id === tenantId);
  if (!tenant) {
    return null;
  }

  if (input.pack) tenant.pack = input.pack;
  if (input.status) tenant.status = input.status;
  if (input.enabledFeatures) tenant.enabledFeatures = input.enabledFeatures;

  store.auditLogs.unshift({
    id: createId("log"),
    tenantId,
    actorId: actor.id,
    actorRole: actor.role,
    eventType: "tenant_update",
    message: `${tenant.name} 설정이 변경되었습니다.`,
    createdAt: now(),
  });

  writeStore(store);
  return tenant;
}

export function listAuditLogs(limit = 20) {
  return readStore().auditLogs.slice(0, limit);
}

export function getLatestSettings(tenantId: string) {
  return (
    readStore()
      .settings
      .filter((item) => item.tenantId === tenantId)
      .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))[0] ?? null
  );
}

export function saveSettings(
  tenantId: string,
  input: Omit<SettingsSnapshot, "id" | "tenantId" | "updatedAt">,
  actor: AppUser,
) {
  const store = readStore();
  const record: SettingsSnapshot = {
    id: createId("set"),
    tenantId,
    companyName: input.companyName,
    businessNumber: input.businessNumber,
    timezone: input.timezone,
    workStart: input.workStart,
    workEnd: input.workEnd,
    updatedBy: input.updatedBy,
    updatedAt: now(),
  };

  store.settings.push(record);
  store.auditLogs.unshift({
    id: createId("log"),
    tenantId,
    actorId: actor.id,
    actorRole: actor.role,
    eventType: "settings_update",
    message: `${record.companyName} 설정이 저장되었습니다.`,
    createdAt: record.updatedAt,
  });
  writeStore(store);
  return record;
}

export function listRequests(tenantId: string) {
  return readStore()
    .requests
    .filter((request) => request.tenantId === tenantId)
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export function createRequest(
  tenantId: string,
  author: AppUser,
  input: Pick<RequestRecord, "category" | "title" | "reason">,
) {
  const store = readStore();
  const timestamp = now();
  const record: RequestRecord = {
    id: createId("req"),
    tenantId,
    authorId: author.id,
    category: input.category,
    title: input.title,
    reason: input.reason,
    status: "submitted",
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  store.requests.unshift(record);
  store.auditLogs.unshift({
    id: createId("log"),
    tenantId,
    actorId: author.id,
    actorRole: author.role,
    eventType: "request_submit",
    message: `${author.fullName} 님이 ${record.title} 요청을 제출했습니다.`,
    createdAt: timestamp,
  });
  writeStore(store);
  return record;
}

export function approveRequest(
  requestId: string,
  action: ApprovalAction,
  actor: AppUser,
) {
  const store = readStore();
  const request = store.requests.find((item) => item.id === requestId);
  if (!request) {
    return null;
  }

  request.status = action === "approve" ? "approved" : "rejected";
  request.updatedAt = now();

  const approval: ApprovalRecord = {
    id: createId("apr"),
    tenantId: request.tenantId,
    requestId: request.id,
    actorId: actor.id,
    action,
    createdAt: request.updatedAt,
  };

  store.approvals.unshift(approval);
  store.auditLogs.unshift({
    id: createId("log"),
    tenantId: request.tenantId,
    actorId: actor.id,
    actorRole: actor.role,
    eventType: action === "approve" ? "approval_approve" : "approval_reject",
    message: `${actor.fullName} 님이 ${request.title} 요청을 ${
      action === "approve" ? "승인" : "반려"
    }했습니다.`,
    createdAt: approval.createdAt,
  });
  writeStore(store);
  return request;
}

export function listApprovals(tenantId: string) {
  return readStore()
    .approvals
    .filter((approval) => approval.tenantId === tenantId)
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function listDocuments(tenantId: string) {
  return readStore()
    .documents
    .filter((document) => document.tenantId === tenantId)
    .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export function signDocument(documentId: string, actor: AppUser) {
  const store = readStore();
  const document = store.documents.find((item) => item.id === documentId);
  if (!document) {
    return null;
  }

  document.status = "signed";
  document.updatedAt = now();

  store.auditLogs.unshift({
    id: createId("log"),
    tenantId: document.tenantId,
    actorId: actor.id,
    actorRole: actor.role,
    eventType: "document_sign",
    message: `${actor.fullName} 님이 ${document.title} 문서에 서명했습니다.`,
    createdAt: document.updatedAt,
  });
  writeStore(store);
  return document;
}

export function getTenantMembers(tenantId: string) {
  const store = readStore();
  const memberIds = store.memberships
    .filter((membership) => membership.tenantId === tenantId)
    .map((membership) => membership.userId);

  return store.users.filter((user) => memberIds.includes(user.id));
}

export function getTenantPackFeatures(tenantId: string) {
  return getTenantById(tenantId)?.enabledFeatures ?? [];
}

export function getTenantFeatureSummary(tenantId: string) {
  const tenant = getTenantById(tenantId);
  if (!tenant) return [];
  return tenant.enabledFeatures.map((feature) => ({
    id: feature,
    label: feature.replace(/_/g, " "),
  }));
}

export function getPackKpis(pack: TenantPack) {
  if (pack === "office") {
    return [
      { label: "승인 대기", value: "17", tone: "critical" },
      { label: "문서 서명 대기", value: "12", tone: "warning" },
      { label: "근태 예외", value: "9", tone: "neutral" },
      { label: "설정 변경", value: "3", tone: "success" },
    ];
  }

  return [
    { label: "결원 매장", value: "4", tone: "critical" },
    { label: "브레이크 위험", value: "6", tone: "warning" },
    { label: "출근 미체크", value: "5", tone: "neutral" },
    { label: "시프트 변경 요청", value: "8", tone: "success" },
  ];
}

export function getUsersForSeed() {
  return readStore().users;
}
