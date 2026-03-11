import { useEffect, useState } from "react";
import { Link, NavLink, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { ADMIN_PAGES } from "./adminContent";
import { APP_COPY, SUPPORTED_LANGUAGES, tx } from "./appCopy";
import { EMPLOYEE_PAGES } from "./employeeContent";
import { PLATFORM_PAGE } from "./platformContent";

function resolveText(language, value) {
  if (typeof value === "string") return value;
  if (!value) return "";
  return value[language] ?? value.ko ?? value.en ?? "";
}

function pickInitialLanguage() {
  const saved = window.localStorage.getItem("flowhr.lang");
  if (SUPPORTED_LANGUAGES.includes(saved)) return saved;
  return navigator.language?.toLowerCase().startsWith("ko") ? "ko" : "en";
}

function useLanguage() {
  const [language, setLanguage] = useState(() => pickInitialLanguage());

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("flowhr.lang", language);
  }, [language]);

  return [language, setLanguage];
}

function LocaleSwitch({ language, onChange }) {
  return (
    <div className="locale-switch">
      {SUPPORTED_LANGUAGES.map((item) => (
        <button
          key={item}
          className={item === language ? "is-active" : ""}
          type="button"
          onClick={() => onChange(item)}
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function GlobalHeader({ language, setLanguage }) {
  const copy = APP_COPY[language];

  return (
    <header className="global-header">
      <Link className="brand-lockup" to="/">
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

function HeroBlock({ language, eyebrow, title, description, questions }) {
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

function KpiRow({ language, items }) {
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

function toneClass(tone) {
  if (tone === "critical") return "tone-critical";
  if (tone === "watch") return "tone-watch";
  if (tone === "healthy") return "tone-healthy";
  return "";
}

function ContentSection({ language, section }) {
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

function DashboardPage({ language, page, eyebrow }) {
  return (
    <div className="page-stack">
      <HeroBlock
        language={language}
        eyebrow={eyebrow}
        title={page.title}
        description={page.description}
        questions={page.questions}
      />
      {page.kpis ? <KpiRow language={language} items={page.kpis} /> : null}
      <section className="content-grid">
        {page.columns.map((section) => (
          <ContentSection key={resolveText(language, section.title)} language={language} section={section} />
        ))}
      </section>
    </div>
  );
}

function EmployeeHomePage({ language, page, pack }) {
  const copy = APP_COPY[language];

  return (
    <div className="page-stack">
      <HeroBlock
        language={language}
        eyebrow={tx(
          `WI-TE-001 / ${pack === "office" ? "Office" : "Retail"} Pack`,
          `WI-TE-001 / ${pack === "office" ? "Office" : "Retail"} Pack`,
        )}
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
  );
}

function EmployeeFlowPage({ language, page, eyebrow, detailTitle, detailMeta }) {
  return (
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
    </div>
  );
}

function EmployeeSignaturePage({ language, page, eyebrow }) {
  return (
    <div className="page-stack">
      <HeroBlock
        language={language}
        eyebrow={eyebrow}
        title={page.title}
        description={page.description}
        questions={[page.priority[0], page.alerts[0], page.detail[1]]}
      />
      <section className="dual-grid">
        <article className="content-card content-card-primary">
          <div className="card-head">
            <div>
              <h3>{resolveText(language, tx("Priority", "Priority"))}</h3>
            </div>
          </div>
          <div className="item-list">
            {page.priority.map((item) => (
              <div key={resolveText(language, item)} className="item-row tone-critical">
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
              <h3>{resolveText(language, tx("Work Alerts", "Work Alerts"))}</h3>
            </div>
          </div>
          <div className="item-list">
            {page.alerts.map((item) => (
              <div key={resolveText(language, item)} className="item-row">
                <div>
                  <strong>{resolveText(language, item)}</strong>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
      <article className="content-card">
        <div className="card-head">
          <div>
            <h3>{resolveText(language, tx("Document Viewer", "Document Viewer"))}</h3>
          </div>
        </div>
        <div className="chip-grid">
          {page.detail.map((item) => (
            <span key={resolveText(language, item)} className="chip">
              {resolveText(language, item)}
            </span>
          ))}
        </div>
      </article>
    </div>
  );
}

function LandingPage({ language }) {
  const copy = APP_COPY[language];
  const links = ["/platform/overview", "/admin/office/home", "/admin/retail/home"];

  return (
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
            <Link to={links[index]}>{item.cta}</Link>
          </article>
        ))}
      </section>
    </div>
  );
}

function AppShell({ shellKey, language, title, subtitle, navigation, children }) {
  const location = useLocation();
  const shell = APP_COPY[language][shellKey];

  return (
    <div className="app-shell">
      <aside className="shell-sidebar">
        <div className="shell-brand">
          <span className="brand-mark subtle">{shellKey === "platformShell" ? "P" : shellKey === "adminShell" ? "A" : "E"}</span>
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
            <NavLink
              key={item.to}
              className={({ isActive }) =>
                `nav-link${isActive || location.pathname === item.to ? " is-active" : ""}`
              }
              to={item.to}
            >
              <span>{resolveText(language, item.label)}</span>
            </NavLink>
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

function PlatformRoutes({ language }) {
  return (
    <AppShell
      shellKey="platformShell"
      language={language}
      title={resolveText(language, PLATFORM_PAGE.eyebrow)}
      subtitle={resolveText(language, PLATFORM_PAGE.title)}
      navigation={[{ to: "/platform/overview", label: tx("Overview", "Overview") }]}
    >
      <Routes>
        <Route path="overview" element={<DashboardPage language={language} page={PLATFORM_PAGE} eyebrow={PLATFORM_PAGE.eyebrow} />} />
        <Route path="*" element={<Navigate to="overview" replace />} />
      </Routes>
    </AppShell>
  );
}

function AdminRoutes({ language, pack }) {
  const shellCopy = APP_COPY[language].adminShell;
  const pages = ADMIN_PAGES[pack];
  const location = useLocation();
  const currentKey = location.pathname.split("/").pop() || "home";
  const currentPage = pages[currentKey] ?? pages.home;

  return (
    <AppShell
      shellKey="adminShell"
      language={language}
      title={pack === "office" ? shellCopy.office : shellCopy.retail}
      subtitle={resolveText(language, currentPage.title)}
      navigation={[
        { to: `/admin/${pack}/home`, label: tx("Home", "Home") },
        { to: `/admin/${pack}/attendance`, label: tx("Attendance", "Attendance") },
        { to: `/admin/${pack}/leave`, label: tx("Leave", "Leave") },
        { to: `/admin/${pack}/workflow`, label: tx("Workflow", "Workflow") },
        { to: `/admin/${pack}/documents`, label: tx("Documents", "Documents") },
      ]}
    >
      <Routes>
        <Route path="home" element={<DashboardPage language={language} page={pages.home} eyebrow={tx(`WI-TA-001 / ${pack === "office" ? "Office" : "Retail"} Pack`, `WI-TA-001 / ${pack === "office" ? "Office" : "Retail"} Pack`)} />} />
        <Route path="attendance" element={<DashboardPage language={language} page={pages.attendance} eyebrow={tx(`WI-TA-003 / ${pack === "office" ? "Office" : "Retail"} Pack`, `WI-TA-003 / ${pack === "office" ? "Office" : "Retail"} Pack`)} />} />
        <Route path="leave" element={<DashboardPage language={language} page={pages.leave} eyebrow={tx(`WI-TA-004 / ${pack === "office" ? "Office" : "Retail"} Pack`, `WI-TA-004 / ${pack === "office" ? "Office" : "Retail"} Pack`)} />} />
        <Route path="workflow" element={<DashboardPage language={language} page={pages.workflow} eyebrow={tx(`WI-TA-005 / ${pack === "office" ? "Office" : "Retail"} Pack`, `WI-TA-005 / ${pack === "office" ? "Office" : "Retail"} Pack`)} />} />
        <Route path="documents" element={<DashboardPage language={language} page={pages.documents} eyebrow={tx(`WI-TA-006 / ${pack === "office" ? "Office" : "Retail"} Pack`, `WI-TA-006 / ${pack === "office" ? "Office" : "Retail"} Pack`)} />} />
        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
    </AppShell>
  );
}

function EmployeeRoutes({ language, pack }) {
  const shellCopy = APP_COPY[language].employeeShell;
  const pages = EMPLOYEE_PAGES[pack];
  const location = useLocation();
  const currentKey = location.pathname.split("/").pop() || "home";
  const currentPage = pages[currentKey] ?? pages.home;

  return (
    <AppShell
      shellKey="employeeShell"
      language={language}
      title={pack === "office" ? shellCopy.office : shellCopy.retail}
      subtitle={resolveText(language, currentPage.title)}
      navigation={[
        { to: `/employee/${pack}/home`, label: tx("Home", "Home") },
        { to: `/employee/${pack}/requests`, label: tx("Request Hub", "Request Hub") },
        { to: `/employee/${pack}/signatures`, label: tx("Signature Inbox", "Signature Inbox") },
      ]}
    >
      <Routes>
        <Route path="home" element={<EmployeeHomePage language={language} page={pages.home} pack={pack} />} />
        <Route
          path="requests"
          element={
            <EmployeeFlowPage
              language={language}
              page={pages.requests}
              eyebrow={tx(`WI-TE-003 / ${pack === "office" ? "Office" : "Retail"} Pack`, `WI-TE-003 / ${pack === "office" ? "Office" : "Retail"} Pack`)}
              detailTitle={tx("Request Form", "Request Form")}
              detailMeta={tx("초안 저장부터 제출, 재제출까지 한 흐름으로 처리", "One flow from draft to submit to resubmit")}
            />
          }
        />
        <Route
          path="signatures"
          element={
            <EmployeeSignaturePage
              language={language}
              page={pages.signatures}
              eyebrow={tx(`WI-TE-004 / ${pack === "office" ? "Office" : "Retail"} Pack`, `WI-TE-004 / ${pack === "office" ? "Office" : "Retail"} Pack`)}
            />
          }
        />
        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
    </AppShell>
  );
}

export function App() {
  const [language, setLanguage] = useLanguage();
  const location = useLocation();

  const toneClassName = location.pathname.startsWith("/platform")
    ? "platform-tone"
    : location.pathname.includes("/retail/")
      ? "retail-tone"
      : location.pathname.includes("/employee/")
        ? "employee-tone"
        : "office-tone";

  return (
    <div className={`app-root ${toneClassName}`}>
      <GlobalHeader language={language} setLanguage={setLanguage} />
      <Routes>
        <Route path="/" element={<LandingPage language={language} />} />
        <Route path="/platform/*" element={<PlatformRoutes language={language} />} />
        <Route path="/admin/office/*" element={<AdminRoutes language={language} pack="office" />} />
        <Route path="/admin/retail/*" element={<AdminRoutes language={language} pack="retail" />} />
        <Route path="/employee/office/*" element={<EmployeeRoutes language={language} pack="office" />} />
        <Route path="/employee/retail/*" element={<EmployeeRoutes language={language} pack="retail" />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
