import {
  ApprovalAction,
  AuditEventType,
  DocumentStatus,
  PrismaClient,
  RequestStatus,
  TenantPack,
  TenantStatus,
  UserRole,
} from "@prisma/client";

const prisma = new PrismaClient();

async function upsertTenant({ slug, name, pack, status, enabledFeatures }) {
  return prisma.tenant.upsert({
    where: { slug },
    update: { name, pack, status, enabledFeatures },
    create: { slug, name, pack, status, enabledFeatures },
  });
}

async function upsertUser({ email, fullName, role }) {
  return prisma.user.upsert({
    where: { email },
    update: { fullName, role },
    create: { email, fullName, role },
  });
}

async function upsertMembership({ userId, tenantId, title }) {
  return prisma.membership.upsert({
    where: {
      userId_tenantId: {
        userId,
        tenantId,
      },
    },
    update: { title },
    create: { userId, tenantId, title },
  });
}

async function main() {
  const officeTenant = await upsertTenant({
    slug: "acme-corp",
    name: "Acme Corp",
    pack: TenantPack.OFFICE,
    status: TenantStatus.ACTIVE,
    enabledFeatures: ["attendance", "workflow", "documents", "settings", "reports"],
  });

  const retailTenant = await upsertTenant({
    slug: "nova-team",
    name: "Nova Team",
    pack: TenantPack.RETAIL,
    status: TenantStatus.TRIAL,
    enabledFeatures: ["attendance", "schedule", "requests", "documents"],
  });

  const platformOperator = await upsertUser({
    email: "platform@flowhr.dev",
    fullName: "플랫폼 운영자",
    role: UserRole.PLATFORM_OPERATOR,
  });

  const officeAdmin = await upsertUser({
    email: "admin@acme.flowhr.dev",
    fullName: "박서준",
    role: UserRole.TENANT_ADMIN,
  });

  const officeManager = await upsertUser({
    email: "manager@acme.flowhr.dev",
    fullName: "김하늘",
    role: UserRole.TENANT_MANAGER,
  });

  const officeEmployee = await upsertUser({
    email: "employee@acme.flowhr.dev",
    fullName: "김민지",
    role: UserRole.TENANT_EMPLOYEE,
  });

  const retailAdmin = await upsertUser({
    email: "admin@nova.flowhr.dev",
    fullName: "이도윤",
    role: UserRole.TENANT_ADMIN,
  });

  const retailEmployee = await upsertUser({
    email: "employee@nova.flowhr.dev",
    fullName: "최수진",
    role: UserRole.TENANT_EMPLOYEE,
  });

  await upsertMembership({
    userId: officeAdmin.id,
    tenantId: officeTenant.id,
    title: "HR 관리자",
  });

  await upsertMembership({
    userId: officeManager.id,
    tenantId: officeTenant.id,
    title: "팀장",
  });

  await upsertMembership({
    userId: officeEmployee.id,
    tenantId: officeTenant.id,
    title: "프로덕트 디자이너",
  });

  await upsertMembership({
    userId: retailAdmin.id,
    tenantId: retailTenant.id,
    title: "매장 운영 관리자",
  });

  await upsertMembership({
    userId: retailEmployee.id,
    tenantId: retailTenant.id,
    title: "매장 스태프",
  });

  await prisma.approval.deleteMany({
    where: {
      tenantId: {
        in: [officeTenant.id, retailTenant.id],
      },
    },
  });

  await prisma.request.deleteMany({
    where: {
      tenantId: {
        in: [officeTenant.id, retailTenant.id],
      },
    },
  });

  await prisma.document.deleteMany({
    where: {
      tenantId: {
        in: [officeTenant.id, retailTenant.id],
      },
    },
  });

  await prisma.settingsSnapshot.deleteMany({
    where: {
      tenantId: {
        in: [officeTenant.id, retailTenant.id],
      },
    },
  });

  await prisma.auditLog.deleteMany({
    where: {
      OR: [
        {
          tenantId: {
            in: [officeTenant.id, retailTenant.id],
          },
        },
        {
          tenantId: null,
          actorId: platformOperator.id,
        },
      ],
    },
  });

  await prisma.settingsSnapshot.createMany({
    data: [
      {
        tenantId: officeTenant.id,
        companyName: "Acme Corp",
        businessNumber: "123-45-67890",
        timezone: "Asia/Seoul",
        workStart: "09:00",
        workEnd: "18:00",
        updatedById: officeAdmin.id,
      },
      {
        tenantId: retailTenant.id,
        companyName: "Nova Team",
        businessNumber: "234-56-78901",
        timezone: "Asia/Seoul",
        workStart: "10:00",
        workEnd: "19:00",
        updatedById: retailAdmin.id,
      },
    ],
  });

  const officeRequest = await prisma.request.create({
    data: {
      tenantId: officeTenant.id,
      authorId: officeEmployee.id,
      category: "leave",
      title: "연차 요청",
      reason: "개인 일정",
      status: RequestStatus.SUBMITTED,
      submittedAt: new Date(),
    },
  });

  await prisma.request.create({
    data: {
      tenantId: retailTenant.id,
      authorId: retailEmployee.id,
      category: "shift_change",
      title: "시프트 변경 요청",
      reason: "개인 사정",
      status: RequestStatus.SUBMITTED,
      submittedAt: new Date(),
    },
  });

  await prisma.document.create({
    data: {
      tenantId: officeTenant.id,
      ownerId: officeEmployee.id,
      title: "2026 근로계약서 갱신",
      status: DocumentStatus.PENDING_SIGNATURE,
    },
  });

  await prisma.document.create({
    data: {
      tenantId: retailTenant.id,
      ownerId: retailEmployee.id,
      title: "매장 안전 서약서",
      status: DocumentStatus.PENDING_SIGNATURE,
    },
  });

  if (officeRequest) {
    await prisma.approval.create({
      data: {
        tenantId: officeTenant.id,
        requestId: officeRequest.id,
        actorId: officeManager.id,
        action: ApprovalAction.APPROVE,
      },
    });
  }

  await prisma.auditLog.createMany({
    data: [
      {
        actorId: platformOperator.id,
        actorRole: UserRole.PLATFORM_OPERATOR,
        eventType: AuditEventType.LOGIN,
        message: "플랫폼 운영자가 콘솔에 로그인했습니다.",
      },
      {
        tenantId: officeTenant.id,
        actorId: officeAdmin.id,
        actorRole: UserRole.TENANT_ADMIN,
        eventType: AuditEventType.SETTINGS_UPDATE,
        message: "Acme Corp 설정을 업데이트했습니다.",
      },
      {
        tenantId: retailTenant.id,
        actorId: retailEmployee.id,
        actorRole: UserRole.TENANT_EMPLOYEE,
        eventType: AuditEventType.REQUEST_SUBMIT,
        message: "시프트 변경 요청을 제출했습니다.",
      },
    ],
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
