"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { ActionSimulator } from "@/components/action-simulator";
import { APP_COPY, SUPPORTED_LANGUAGES, tx } from "@/lib/content/appCopy";
import type { ActionActor, SessionRole, SupportedPack } from "@/lib/api/types";
import type {
  DashboardPage,
  DashboardSection,
  EmployeeFlowPage,
  EmployeeHomePage,
  LocalizedText,
} from "@/lib/content/types";

type Language = "ko" | "en";

type NavItem = {
  href: string;
  label: LocalizedText;
};

type ActionPanelConfig = {
  title: LocalizedText;
  description: LocalizedText;
  endpoint: string;
  primaryLabel: LocalizedText;
  actor?: ActionActor;
};

type SessionPayload = {
  data: {
    session: { role: SessionRole; tenantId: string };
    activeTenant?: { id: string; pack: SupportedPack };
    tenants: Array<{ id: string; name: string; pack: SupportedPack; status: string }>;
  };
};

function resolveText(language: Language, value: LocalizedText | string | undefined): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[language] ?? value.ko ?? value.en ?? "";
}

function pickInitialLanguage(): Language {
  if (typeof window === "undefined") return "ko";
  const saved = window.localStorage.getItem("flowhr.lang");
  if (saved === "ko" || saved === "en") return saved;
  return navigator.language?.toLowerCase().startsWith("ko") ? "ko" : "en";
}

function useLanguage(): [Language, (value: Language) => void] {
  const [language, setLanguage] = useState<Language>(() => pickInitialLanguage());

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("flowhr.lang", language);
  }, [language]);

  return [language, setLanguage];
}

function LocaleSwitch({
  language,
  onChange,
}: {
  language: Language;
  onChange: (value: Language) => void;
}) {
  return (
    <div className="locale-switch">
      {SUPPORTED_LANGUAGES.map((item) => (
        <button
          key={item}
          className={item === language ? "is-active" : ""}
          type="button"
          onClick={() => onChange(item as Language)}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function SessionSwitch({ language }: { language: Language }) {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState<SessionRole>("tenant_admin");
  const [tenantId, setTenantId] = useState("");
  const [tenants, setTenants] = useState<Array<{ id: string; name: string; pack: SupportedPack; status: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadSession() {
      const response = await fetch("/api/session");
      const json = (await response.json()) as SessionPayload;

      if (!active) return;
      setRole(json.data.session.role);
      setTenantId(json.data.session.tenantId);
      setTenants(json.data.tenants);
      setLoading(false);
    }

    void loadSession();

    return () => {
      active = false;
    };
  }, []);

  async function handleSessionChange(next: { role?: SessionRole; tenantId?: string }) {
    const nextRole = next.role ?? role;
    const nextTenantId = next.tenantId ?? tenantId;

    setRole(nextRole);
    setTenantId(nextTenantId);
    setLoading(true);

    const response = await fetch("/api/session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(next),
    });

    const json = (await response.json()) as SessionPayload;
    setRole(json.data.session.role);
    setTenantId(json.data.session.tenantId);
    setTenants(json.data.tenants);

    const parts = pathname.split("/").filter(Boolean);
    const activeTenantPack = json.data.activeTenant?.pack;

    if ((parts[0] === "admin" || parts[0] === "employee") && parts[2] && activeTenantPack) {
      if (parts[1] !== activeTenantPack) {
        router.push(`/${parts[0]}/${activeTenantPack}/${parts[2]}`);
      } else {
        router.refresh();
      }
    } else {
      router.refresh();
    }

    setLoading(false);
  }

  return (
    <div className="session-switch-group">
      <label className="session-switch">
        <span>{resolveText(language, tx("세션 역할", "Session role"))}</span>
        <select
          value={role}
          disabled={loading}
          onChange={(event) => handleSessionChange({ role: event.target.value as SessionRole })}
        >
          <option value="platform_operator">{resolveText(language, tx("플랫폼 운영자", "Platform Operator"))}</option>
          <option value="tenant_admin">{resolveText(language, tx("고객사 관리자", "Tenant Admin"))}</option>
          <option value="tenant_manager">{resolveText(language, tx("팀 매니저", "Tenant Manager"))}</option>
          <option value="tenant_employee">{resolveText(language, tx("직원", "Employee"))}</option>
        </select>
      </label>
      <label className="session-switch">
        <span>{resolveText(language, tx("활성 tenant", "Active tenant"))}</span>
        <select
          value={tenantId}
          disabled={loading}
          onChange={(event) => handleSessionChange({ tenantId: event.target.value })}
        >
          {tenants.map((tenant) => (
            <option key={tenant.id} value={tenant.id}>
              {`${tenant.name} / ${tenant.pack === "office" ? "Office" : "Retail"}`}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

function GlobalHeader({
  language,
  setLanguage,
}: {
  language: Language;
  setLanguage: (value: Language) => void;
}) {
  const copy = APP_COPY[language];

  return (
    <header className="global-header">
      <Link className="brand-lockup" href="/">
        <span className="brand-mark">F</span>
        <div>
          <strong>{copy.appName}</strong>
          <span>{copy.landingEyebrow}</span>
        </div>
      </Link>
      <div className="header-controls">
        <SessionSwitch language={language} />
        <LocaleSwitch language={language} onChange={setLanguage} />
      </div>
    </header>
  );
}

function PlatformTenantManager({ language }: { language: Language }) {
  const router = useRouter();
  const [tenants, setTenants] = useState<Array<{
    id: string;
    name: string;
    pack: SupportedPack;
    status: "trial" | "active" | "grace";
    seatCount: number;
  }>>([]);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadTenants() {
      const response = await fetch("/api/platform/tenants");
      const json = (await response.json()) as {
        data: {
          tenants: Array<{
            id: string;
            name: string;
            pack: SupportedPack;
            status: "trial" | "active" | "grace";
            seatCount: number;
          }>;
        };
      };

      if (!active || !json.data) return;
      setTenants(json.data.tenants);
    }

    void loadTenants();

    return () => {
      active = false;
    };
  }, []);

  function updateLocalTenant(
    tenantId: string,
    key: "pack" | "status",
    value: SupportedPack | "trial" | "active" | "grace",
  ) {
    setTenants((current) =>
      current.map((tenant) =>
        tenant.id === tenantId
          ? {
              ...tenant,
              [key]: value,
            }
          : tenant,
      ),
    );
  }

  async function saveTenant(tenantId: string) {
    const tenant = tenants.find((item) => item.id === tenantId);
    if (!tenant) return;

    setSavingId(tenantId);
    setMessage("");

    const response = await fetch("/api/platform/tenants", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tenantId: tenant.id,
        pack: tenant.pack,
        status: tenant.status,
      }),
    });

    const json = (await response.json()) as {
      data?: {
        tenant: {
          id: string;
          name: string;
          pack: SupportedPack;
          status: "trial" | "active" | "grace";
          seatCount: number;
        };
        message: string;
      };
      error?: {
        message: string;
      };
    };

    if (!response.ok || !json.data) {
      setMessage(json.error?.message ?? "Failed to update tenant.");
      setSavingId(null);
      return;
    }

    setTenants((current) =>
      current.map((item) => (item.id === tenantId ? { ...item, ...json.data!.tenant } : item)),
    );
    setMessage(json.data.message);
    setSavingId(null);
    router.refresh();
  }

  return (
    <article className="content-card action-panel">
      <div className="card-head">
        <div>
          <h3>{resolveText(language, tx("Tenant 운영 패널", "Tenant operations panel"))}</h3>
          <p>{resolveText(language, tx("Platform Operator가 고객사 pack과 상태를 직접 관리합니다.", "Platform operators can directly manage tenant pack and status."))}</p>
        </div>
      </div>
      <div className="tenant-console-grid">
        {tenants.map((tenant) => (
          <div key={tenant.id} className="tenant-console-card">
            <div>
              <strong>{tenant.name}</strong>
              <span>{resolveText(language, tx(`좌석 ${tenant.seatCount}`, `${tenant.seatCount} seats`))}</span>
            </div>
            <label className="action-select">
              <span>{resolveText(language, tx("Pack", "Pack"))}</span>
              <select
                value={tenant.pack}
                onChange={(event) => updateLocalTenant(tenant.id, "pack", event.target.value as SupportedPack)}
              >
                <option value="office">Office</option>
                <option value="retail">Retail</option>
              </select>
            </label>
            <label className="action-select">
              <span>{resolveText(language, tx("상태", "Status"))}</span>
              <select
                value={tenant.status}
                onChange={(event) => updateLocalTenant(tenant.id, "status", event.target.value as "trial" | "active" | "grace")}
              >
                <option value="trial">{resolveText(language, tx("체험", "Trial"))}</option>
                <option value="active">{resolveText(language, tx("활성", "Active"))}</option>
                <option value="grace">{resolveText(language, tx("유예", "Grace"))}</option>
              </select>
            </label>
            <div className="action-controls">
              <button
                className="action-button"
                type="button"
                disabled={savingId === tenant.id}
                onClick={() => saveTenant(tenant.id)}
              >
                {savingId === tenant.id
                  ? resolveText(language, tx("저장 중...", "Saving..."))
                  : resolveText(language, tx("Tenant 저장", "Save tenant"))}
              </button>
              <Link className="inline-link-button" href={`/admin/${tenant.pack}/settings`}>
                {resolveText(language, tx("설정 보기", "Open settings"))}
              </Link>
            </div>
          </div>
        ))}
      </div>
      {message ? <div className="item-row tone-healthy"><div><strong>{message}</strong></div></div> : null}
    </article>
  );
}

function HeroBlock({
  language,
  eyebrow,
  title,
  description,
  questions,
}: {
  language: Language;
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  questions: LocalizedText[];
}) {
  const copy = APP_COPY[language];

  return (
    <section className="hero-panel">
      <div>
        <p className="eyebrow">{resolveText(language, eyebrow)}</p>
        <h2>{resolveText(language, title)}</h2>
        <p className="hero-copy">{resolveText(language, description)}</p>
      </div>
      <div className="hero-questions">
        <strong>{copy.decisionQuestions}</strong>
        <ul>
          {questions.map((item) => (
            <li key={resolveText(language, item)}>{resolveText(language, item)}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function KpiRow({ language, items }: { language: Language; items: DashboardPage["kpis"] }) {
  if (!items) return null;

  return (
    <section className="kpi-grid">
      {items.map((item) => (
        <article key={`${item.value}-${resolveText(language, item.label)}`} className="kpi-card">
          <strong>{item.value}</strong>
          <span>{resolveText(language, item.label)}</span>
        </article>
      ))}
    </section>
  );
}

function toneClass(tone?: string) {
  if (tone === "critical") return "tone-critical";
  if (tone === "watch") return "tone-watch";
  if (tone === "healthy") return "tone-healthy";
  return "";
}

function ContentSection({
  language,
  section,
}: {
  language: Language;
  section: DashboardSection;
}) {
  return (
    <article className={`content-card ${section.tone === "primary" ? "content-card-primary" : ""}`}>
      <div className="card-head">
        <div>
          <h3>{resolveText(language, section.title)}</h3>
          {section.eyebrow ? <p>{resolveText(language, section.eyebrow)}</p> : null}
        </div>
      </div>

      {section.items ? (
        <div className="item-list">
          {section.items.map((item) => (
            <div
              key={`${resolveText(language, item.title)}-${resolveText(language, item.meta)}`}
              className={`item-row ${toneClass(item.tone)}`}
            >
              <div>
                <strong>{resolveText(language, item.title)}</strong>
                {item.meta ? <span>{resolveText(language, item.meta)}</span> : null}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {section.stats ? (
        <div className="chip-grid">
          {section.stats.map((item) => (
            <span key={resolveText(language, item)} className="chip">
              {resolveText(language, item)}
            </span>
          ))}
        </div>
      ) : null}

      {section.timeline ? (
        <div className="timeline-list">
          {section.timeline.map((item) => (
            <div key={`${item.lead}-${resolveText(language, item.text)}`} className="timeline-row">
              <strong>{item.lead}</strong>
              <span>{resolveText(language, item.text)}</span>
              <small>{resolveText(language, item.badge)}</small>
            </div>
          ))}
        </div>
      ) : null}
    </article>
  );
}

function AppShell({
  shellKey,
  language,
  title,
  subtitle,
  navigation,
  children,
}: {
  shellKey: "platformShell" | "adminShell" | "employeeShell";
  language: Language;
  title: string;
  subtitle: string;
  navigation: NavItem[];
  children: ReactNode;
}) {
  const pathname = usePathname();
  const shell = APP_COPY[language][shellKey];

  return (
    <div className="app-shell">
      <aside className="shell-sidebar">
        <div className="shell-brand">
          <span className="brand-mark subtle">
            {shellKey === "platformShell" ? "P" : shellKey === "adminShell" ? "A" : "E"}
          </span>
          <div>
            <strong>{shell.title}</strong>
            <span>{shell.subtitle}</span>
          </div>
        </div>
        <div className="pack-pill">
          <span>{title}</span>
        </div>
        <nav className="shell-nav">
          {navigation.map((item) => (
            <Link
              key={item.href}
              className={`nav-link${pathname === item.href ? " is-active" : ""}`}
              href={item.href}
            >
              <span>{resolveText(language, item.label)}</span>
            </Link>
          ))}
        </nav>
      </aside>
      <div className="shell-main">
        <div className="shell-toolbar">
          <div>
            <p className="eyebrow">{title}</p>
            <h1>{subtitle}</h1>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export function LandingClient() {
  const [language, setLanguage] = useLanguage();
  const copy = APP_COPY[language];
  const links = ["/platform/overview", "/admin/office/home", "/admin/retail/home"];

  return (
    <div className="app-root office-tone">
      <GlobalHeader language={language} setLanguage={setLanguage} />
      <div className="landing-page">
        <section className="landing-hero">
          <p className="eyebrow">{copy.landingEyebrow}</p>
          <h1>{copy.landingTitle}</h1>
          <p>{copy.landingText}</p>
        </section>
        <section className="landing-grid">
          {copy.roleCards.map((item, index) => (
            <article key={item.title} className="landing-card">
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <Link href={links[index]}>{item.cta}</Link>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}

export function PlatformClient({
  page,
}: {
  page: DashboardPage & { eyebrow: LocalizedText };
}) {
  const [language, setLanguage] = useLanguage();

  return (
    <div className="app-root platform-tone">
      <GlobalHeader language={language} setLanguage={setLanguage} />
      <AppShell
        shellKey="platformShell"
        language={language}
        title={resolveText(language, page.eyebrow)}
        subtitle={resolveText(language, page.title)}
        navigation={[{ href: "/platform/overview", label: tx("개요", "Overview") }]}
      >
        <div className="page-stack">
          <HeroBlock
            language={language}
            eyebrow={page.eyebrow}
            title={page.title}
            description={page.description}
            questions={page.questions}
          />
          <KpiRow language={language} items={page.kpis} />
          <PlatformTenantManager language={language} />
          <section className="content-grid">
            {page.columns.map((section) => (
              <ContentSection key={resolveText(language, section.title)} language={language} section={section} />
            ))}
          </section>
        </div>
      </AppShell>
    </div>
  );
}

export function AdminClient({
  packTitle,
  subtitle,
  navigation,
  page,
  eyebrow,
  tone,
  actionPanel,
  pack,
}: {
  packTitle: LocalizedText;
  subtitle: LocalizedText;
  navigation: NavItem[];
  page: DashboardPage;
  eyebrow: LocalizedText;
  tone: "office-tone" | "retail-tone";
  actionPanel?: ActionPanelConfig;
  pack: SupportedPack;
}) {
  const [language, setLanguage] = useLanguage();

  return (
    <div className={`app-root ${tone}`}>
      <GlobalHeader language={language} setLanguage={setLanguage} />
      <AppShell
        shellKey="adminShell"
        language={language}
        title={resolveText(language, packTitle)}
        subtitle={resolveText(language, subtitle)}
        navigation={navigation}
      >
        <div className="page-stack">
          {page.contextSummary ? (
            <article className="content-card content-card-primary">
              <div className="card-head">
                <div>
                  <h3>{resolveText(language, page.contextSummary.title)}</h3>
                  {page.contextSummary.description ? (
                    <p>{resolveText(language, page.contextSummary.description)}</p>
                  ) : null}
                </div>
              </div>
              <div className="chip-grid">
                {page.contextSummary.items.map((item) => (
                  <span key={resolveText(language, item)} className="chip">
                    {resolveText(language, item)}
                  </span>
                ))}
              </div>
            </article>
          ) : null}
          <HeroBlock
            language={language}
            eyebrow={eyebrow}
            title={page.title}
            description={page.description}
            questions={page.questions}
          />
          <KpiRow language={language} items={page.kpis} />
          <section className="content-grid">
            {page.columns.map((section) => (
              <ContentSection key={resolveText(language, section.title)} language={language} section={section} />
            ))}
          </section>
          {actionPanel ? (
            <ActionSimulator
              language={language}
              title={actionPanel.title}
              description={actionPanel.description}
              endpoint={actionPanel.endpoint}
              primaryLabel={actionPanel.primaryLabel}
              actor={actionPanel.actor}
              pack={pack}
            />
          ) : null}
        </div>
      </AppShell>
    </div>
  );
}

export function EmployeeHomeClient({
  packTitle,
  subtitle,
  navigation,
  page,
  eyebrow,
  tone,
  pack,
}: {
  packTitle: LocalizedText;
  subtitle: LocalizedText;
  navigation: NavItem[];
  page: EmployeeHomePage;
  eyebrow: LocalizedText;
  tone: "employee-tone" | "retail-tone";
  pack: "office" | "retail";
}) {
  const [language, setLanguage] = useLanguage();
  const copy = APP_COPY[language];

  return (
    <div className={`app-root ${tone}`}>
      <GlobalHeader language={language} setLanguage={setLanguage} />
      <AppShell
        shellKey="employeeShell"
        language={language}
        title={resolveText(language, packTitle)}
        subtitle={resolveText(language, subtitle)}
        navigation={navigation}
      >
        <div className="page-stack">
          <HeroBlock
            language={language}
            eyebrow={eyebrow}
            title={page.title}
            description={page.description}
            questions={page.questions}
          />

          <section className="dual-grid">
            <article className="content-card content-card-primary">
              <div className="card-head">
                <div>
                  <h3>{resolveText(language, tx("오늘 꼭 할 일", "Today Must-Do"))}</h3>
                  <p>{copy.nowLabel}</p>
                </div>
              </div>
              <div className="item-list">
                {page.mustDo.map((item) => (
                  <div key={resolveText(language, item)} className="item-row">
                    <div>
                      <strong>{resolveText(language, item)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </article>
            <article className="content-card">
              <div className="card-head">
                <div>
                  <h3>{resolveText(language, tx("빠른 실행", "Quick Actions"))}</h3>
                </div>
              </div>
              <div className="chip-grid">
                {page.quickActions.map((item) => (
                  <span key={resolveText(language, item)} className="chip">
                    {resolveText(language, item)}
                  </span>
                ))}
              </div>
            </article>
          </section>

          <section className="dual-grid">
            <article className="content-card">
              <div className="card-head">
                <div>
                  <h3>{resolveText(language, tx("이번 주", "This Week"))}</h3>
                </div>
              </div>
              <div className="item-list">
                {page.weekly.map((item) => (
                  <div key={resolveText(language, item)} className="item-row">
                    <div>
                      <strong>{resolveText(language, item)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </article>
            <article className="content-card">
              <div className="card-head">
                <div>
                  <h3>{resolveText(language, tx("내 요약", "My Summary"))}</h3>
                </div>
              </div>
              <div className="chip-grid">
                {page.summary.map((item) => (
                  <span key={resolveText(language, item)} className="chip">
                    {resolveText(language, item)}
                  </span>
                ))}
              </div>
            </article>
          </section>

          <article className="mobile-preview">
            <div className="mobile-device">
              <div className="mobile-screen">
                <div className="mobile-hero">
                  <strong>{resolveText(language, page.mobileHero.title)}</strong>
                  <p>{resolveText(language, page.mobileHero.text)}</p>
                </div>
                <div className="mobile-chip-grid">
                  {page.quickActions.map((item) => (
                    <span key={resolveText(language, item)} className="chip">
                      {resolveText(language, item)}
                    </span>
                  ))}
                </div>
                <div className="mobile-tabbar">
                  <span className="is-active">{copy.tabs.home}</span>
                  <span>{pack === "retail" ? copy.tabs.shift : copy.tabs.requests}</span>
                  <span>{pack === "retail" ? copy.tabs.inbox : copy.tabs.documents}</span>
                  <span>{copy.tabs.me}</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </AppShell>
    </div>
  );
}

export function EmployeeFlowClient({
  packTitle,
  subtitle,
  navigation,
  page,
  eyebrow,
  tone,
  detailTitle,
  detailMeta,
  actionPanel,
  pack,
}: {
  packTitle: LocalizedText;
  subtitle: LocalizedText;
  navigation: NavItem[];
  page: EmployeeFlowPage;
  eyebrow: LocalizedText;
  tone: "employee-tone" | "retail-tone";
  detailTitle: LocalizedText;
  detailMeta: LocalizedText;
  actionPanel?: ActionPanelConfig;
  pack: SupportedPack;
}) {
  const [language, setLanguage] = useLanguage();

  return (
    <div className={`app-root ${tone}`}>
      <GlobalHeader language={language} setLanguage={setLanguage} />
      <AppShell
        shellKey="employeeShell"
        language={language}
        title={resolveText(language, packTitle)}
        subtitle={resolveText(language, subtitle)}
        navigation={navigation}
      >
        <div className="page-stack">
          <HeroBlock
            language={language}
            eyebrow={eyebrow}
            title={page.title}
            description={page.description}
            questions={[page.quickActions[0], page.hints[0], page.history[1]]}
          />
          <section className="dual-grid">
            <article className="content-card content-card-primary">
              <div className="card-head">
                <div>
                  <h3>{resolveText(language, tx("빠른 요청", "Quick Requests"))}</h3>
                </div>
              </div>
              <div className="chip-grid">
                {page.quickActions.map((item) => (
                  <span key={resolveText(language, item)} className="chip">
                    {resolveText(language, item)}
                  </span>
                ))}
              </div>
            </article>
            <article className="content-card">
              <div className="card-head">
                <div>
                  <h3>{resolveText(language, tx("정책 힌트", "Policy Hints"))}</h3>
                </div>
              </div>
              <div className="item-list">
                {page.hints.map((item) => (
                  <div key={resolveText(language, item)} className="item-row">
                    <div>
                      <strong>{resolveText(language, item)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>
          <section className="dual-grid">
            <article className="content-card">
              <div className="card-head">
                <div>
                  <h3>{resolveText(language, tx("최근 요청", "Recent Requests"))}</h3>
                </div>
              </div>
              <div className="item-list">
                {page.history.map((item) => (
                  <div key={resolveText(language, item)} className="item-row">
                    <div>
                      <strong>{resolveText(language, item)}</strong>
                    </div>
                  </div>
                ))}
              </div>
            </article>
            <article className="content-card">
              <div className="card-head">
                <div>
                  <h3>{resolveText(language, detailTitle)}</h3>
                </div>
              </div>
              <div className="item-list">
                {page.history.map((item) => (
                  <div key={`${resolveText(language, item)}-detail`} className="item-row">
                    <div>
                      <strong>{resolveText(language, item)}</strong>
                      <span>{resolveText(language, detailMeta)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </section>
          {actionPanel ? (
            <ActionSimulator
              language={language}
              title={actionPanel.title}
              description={actionPanel.description}
              endpoint={actionPanel.endpoint}
              primaryLabel={actionPanel.primaryLabel}
              actor={actionPanel.actor}
              pack={pack}
            />
          ) : null}
        </div>
      </AppShell>
    </div>
  );
}
