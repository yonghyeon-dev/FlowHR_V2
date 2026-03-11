import { tx } from "./appCopy";

export const PLATFORM_PAGE = {
  eyebrow: tx("WI-PC-004 / Platform Console", "WI-PC-004 / Platform Console"),
  title: tx(
    "우리 SaaS 운영조직을 위한 Platform Console",
    "Platform Console for SaaS operations teams",
  ),
  description: tx(
    "고객사 HR 운영 화면과 분리된 백오피스입니다. 운영 리스크, 과금, 지원, 보안, 감사를 한 흐름에서 처리합니다.",
    "A back office separated from tenant HR operations, built to manage risk, billing, support, security, and audit in one flow.",
  ),
  questions: [
    tx("오늘 어떤 운영 리스크를 먼저 처리해야 하는가", "Which operational risks need action first today"),
    tx("지원, 과금, 보안 이슈가 어떤 테넌트에 영향을 주는가", "Which tenants are impacted by support, billing, or security issues"),
    tx("지금 조치가 필요한 시스템 신호가 있는가", "Which system signals require action now"),
  ],
  kpis: [
    { value: "124", label: tx("활성 테넌트", "Active tenants") },
    { value: "7", label: tx("유예 고객", "Grace accounts") },
    { value: "3", label: tx("결제 실패", "Payment failures") },
    { value: "12", label: tx("미해결 지원 이슈", "Open support issues") },
  ],
  columns: [
    {
      title: tx("Operations Queue", "Operations Queue"),
      eyebrow: tx("지금 처리할 항목", "Needs action now"),
      tone: "primary",
      items: [
        { title: tx("결제 실패 고객사 3건", "3 tenants with payment failures"), meta: tx("과금", "Billing"), tone: "critical" },
        { title: tx("오늘 만료 예정 플랜 5건", "5 plans expiring today"), meta: tx("갱신", "Renewal"), tone: "watch" },
        { title: tx("지원 영향 추적 테넌트 2건", "2 tenants under incident watch"), meta: tx("지원", "Support"), tone: "watch" },
        { title: tx("보안 검토 대기 4건", "4 security reviews pending"), meta: tx("보안", "Security"), tone: "critical" },
      ],
    },
    {
      title: tx("Platform Health Signals", "Platform Health Signals"),
      eyebrow: tx("지표 + 상태 + 액션", "Metric + status + action"),
      items: [
        { title: tx("API 성공률 99.92%", "API success rate 99.92%"), meta: tx("정상 / 장애 조치 불필요", "Healthy / No action needed"), tone: "healthy" },
        { title: tx("Webhook 전달 성공률 94.10%", "Webhook delivery 94.10%"), meta: tx("주의 / 재시도 큐 확인", "Watch / Review retry queue"), tone: "watch" },
        { title: tx("SSO 로그인 오류 18건", "18 SSO login errors"), meta: tx("주의 / 테넌트 영향 확인", "Watch / Check tenant impact"), tone: "watch" },
        { title: tx("동기화 지연 12분", "Sync delay 12 min"), meta: tx("조치 / 지원 공지 검토", "Act / Review support notice"), tone: "critical" },
      ],
    },
    {
      title: tx("Recent Tenant Changes", "Recent Tenant Changes"),
      eyebrow: tx("상태 변경", "Status changes"),
      items: [
        { title: tx("Acme Corp / 체험판 → 활성", "Acme Corp / Trial → Active"), meta: tx("플랜 전환", "Plan transition") },
        { title: tx("Nova Team / 활성 → 유예", "Nova Team / Active → Grace"), meta: tx("결제 추적", "Billing follow-up") },
        { title: tx("DeepField / 플랜 업그레이드", "DeepField / Plan upgraded"), meta: tx("좌석 확장", "Seat expansion") },
      ],
    },
    {
      title: tx("Security Signals", "Security Signals"),
      eyebrow: tx("운영자 기준", "Operator scope"),
      items: [
        { title: tx("민감 권한 변경 2건", "2 sensitive permission changes"), meta: tx("감사 필요", "Audit needed"), tone: "critical" },
        { title: tx("비정상 로그인 시도 4건", "4 suspicious login attempts"), meta: tx("IP 검토", "Review IPs"), tone: "watch" },
        { title: tx("감사 검토 필요 1건", "1 audit review required"), meta: tx("오늘 처리", "Handle today"), tone: "critical" },
      ],
    },
  ],
};
