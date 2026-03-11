"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ActionSimulator } from "@/components/action-simulator";
import { APP_COPY, SUPPORTED_LANGUAGES, tx } from "@/lib/content/appCopy";
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
      <LocaleSwitch language={language} onChange={setLanguage} />
    </header>
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
  children: React.ReactNode;
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
        navigation={[{ href: "/platform/overview", label: tx("Overview", "Overview") }]}
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
}: {
  packTitle: LocalizedText;
  subtitle: LocalizedText;
  navigation: NavItem[];
  page: DashboardPage;
  eyebrow: LocalizedText;
  tone: "office-tone" | "retail-tone";
  actionPanel?: ActionPanelConfig;
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
                  <h3>{resolveText(language, tx("Today Must-Do", "Today Must-Do"))}</h3>
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
                  <h3>{resolveText(language, tx("Quick Actions", "Quick Actions"))}</h3>
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
                  <h3>{resolveText(language, tx("This Week", "This Week"))}</h3>
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
                  <h3>{resolveText(language, tx("My Summary", "My Summary"))}</h3>
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
                  <h3>{resolveText(language, tx("Quick Requests", "Quick Requests"))}</h3>
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
                  <h3>{resolveText(language, tx("Policy Hints", "Policy Hints"))}</h3>
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
                  <h3>{resolveText(language, tx("Recent Requests", "Recent Requests"))}</h3>
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
            />
          ) : null}
        </div>
      </AppShell>
    </div>
  );
}
