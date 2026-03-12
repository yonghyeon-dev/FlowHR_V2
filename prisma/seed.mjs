import { PrismaClient, TenantPack, UserRole, RequestStatus, DocumentStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const officeTenant = await prisma.tenant.upsert({
    where: { slug: "acme-corp" },
    update: {},
    create: {
      slug: "acme-corp",
      name: "Acme Corp",
      pack: TenantPack.OFFICE,
    },
  });

  const retailTenant = await prisma.tenant.upsert({
    where: { slug: "nova-team" },
    update: {},
    create: {
      slug: "nova-team",
      name: "Nova Team",
      pack: TenantPack.RETAIL,
    },
  });

  const officeAdmin = await prisma.user.upsert({
    where: { email: "admin@acme.flowhr.dev" },
    update: {},
    create: {
      email: "admin@acme.flowhr.dev",
      fullName: "박서준",
      role: UserRole.TENANT_ADMIN,
    },
  });

  const officeEmployee = await prisma.user.upsert({
    where: { email: "employee@acme.flowhr.dev" },
    update: {},
    create: {
      email: "employee@acme.flowhr.dev",
      fullName: "김민지",
      role: UserRole.TENANT_EMPLOYEE,
    },
  });

  const retailAdmin = await prisma.user.upsert({
    where: { email: "admin@nova.flowhr.dev" },
    update: {},
    create: {
      email: "admin@nova.flowhr.dev",
      fullName: "이도윤",
      role: UserRole.TENANT_ADMIN,
    },
  });

  await prisma.membership.upsert({
    where: {
      userId_tenantId: {
        userId: officeAdmin.id,
        tenantId: officeTenant.id,
      },
    },
    update: {},
    create: {
      userId: officeAdmin.id,
      tenantId: officeTenant.id,
      title: "HR 관리자",
    },
  });

  await prisma.membership.upsert({
    where: {
      userId_tenantId: {
        userId: officeEmployee.id,
        tenantId: officeTenant.id,
      },
    },
    update: {},
    create: {
      userId: officeEmployee.id,
      tenantId: officeTenant.id,
      title: "프로덕트 디자이너",
    },
  });

  await prisma.membership.upsert({
    where: {
      userId_tenantId: {
        userId: retailAdmin.id,
        tenantId: retailTenant.id,
      },
    },
    update: {},
    create: {
      userId: retailAdmin.id,
      tenantId: retailTenant.id,
      title: "매장 운영 관리자",
    },
  });

  await prisma.request.create({
    data: {
      tenantId: officeTenant.id,
      authorId: officeEmployee.id,
      category: "leave",
      title: "연차 요청",
      status: RequestStatus.SUBMITTED,
    },
  }).catch(() => {});

  await prisma.document.create({
    data: {
      tenantId: officeTenant.id,
      ownerId: officeEmployee.id,
      title: "2026 근로계약서 갱신",
      status: DocumentStatus.PENDING_SIGNATURE,
    },
  }).catch(() => {});
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
