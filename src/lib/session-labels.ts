import type { UserRole } from "@/lib/domain/types";

export function roleLabel(role: UserRole) {
  if (role === "platform_operator") return "플랫폼 운영자";
  if (role === "tenant_admin") return "고객사 관리자";
  if (role === "tenant_manager") return "팀 매니저";
  return "직원";
}
