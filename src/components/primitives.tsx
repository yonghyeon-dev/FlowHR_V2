import type { ReactNode } from "react";

export type Tone = "critical" | "warning" | "success" | "neutral";

function badgeClass(tone: Tone) {
  switch (tone) {
    case "critical":
      return "badge danger";
    case "warning":
      return "badge warning";
    case "success":
      return "badge success";
    default:
      return "badge";
  }
}

export function BrandMark({ label = "FlowHR" }: { label?: string }) {
  return (
    <div className="header-brand">
      <span className="brand-dot" />
      {label}
    </div>
  );
}

export function PageHeader({
  breadcrumb,
  title,
  subtitle,
  actions,
}: {
  breadcrumb?: string[];
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="page-header">
      {breadcrumb ? (
        <div className="page-breadcrumb">
          {breadcrumb.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      ) : null}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">{title}</h1>
          {subtitle ? <p className="page-subtitle">{subtitle}</p> : null}
        </div>
        {actions ? <div className="page-actions">{actions}</div> : null}
      </div>
    </div>
  );
}

export function Card({
  title,
  right,
  children,
  footer,
}: {
  title?: string;
  right?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  return (
    <div className="card">
      {title || right ? (
        <div className="card-header">
          <div className="card-title">{title}</div>
          {right}
        </div>
      ) : null}
      <div className="card-body">{children}</div>
      {footer ? <div className="card-footer">{footer}</div> : null}
    </div>
  );
}

export function KpiRow({
  items,
}: {
  items: Array<{
    label: string;
    value: string;
    eyebrow?: string;
    tone?: Tone;
    delta?: string;
  }>;
}) {
  return (
    <div className={`kpi-grid cols-${Math.min(items.length, 4)}`}>
      {items.map((item) => (
        <div key={`${item.label}-${item.value}`} className={`kpi-card${item.tone === "critical" ? " emphasis" : ""}`}>
          {item.eyebrow ? <div className="kpi-eyebrow">{item.eyebrow}</div> : null}
          <div className="kpi-value">{item.value}</div>
          <div className="kpi-label">{item.label}</div>
          {item.delta ? <div className="kpi-delta neutral">{item.delta}</div> : null}
        </div>
      ))}
    </div>
  );
}

export function QueueList({
  items,
}: {
  items: Array<{
    tone: Tone;
    title: string;
    meta: string;
    action?: ReactNode;
  }>;
}) {
  return (
    <div className="queue-list">
      {items.map((item) => (
        <div key={`${item.title}-${item.meta}`} className="queue-item">
          <div className={`q-priority ${item.tone === "critical" ? "critical" : item.tone === "warning" ? "high" : item.tone === "success" ? "medium" : "low"}`} />
          <div className="q-content">
            <div className="q-title">{item.title}</div>
            <div className="q-meta">{item.meta}</div>
          </div>
          {item.action ? <div className="q-action">{item.action}</div> : null}
        </div>
      ))}
    </div>
  );
}

export function StatRows({
  rows,
}: {
  rows: Array<{
    label: string;
    value: string;
    tone?: Tone;
  }>;
}) {
  return (
    <>
      {rows.map((row) => (
        <div key={row.label} className="stat-row">
          <span className="stat-label">{row.label}</span>
          <span className="stat-value">
            {row.tone ? <span className={badgeClass(row.tone)}>{row.value}</span> : row.value}
          </span>
        </div>
      ))}
    </>
  );
}

export function DataTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: ReactNode[][];
}) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={`${index}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AppButton({
  children,
  type = "button",
  tone = "primary",
  onClick,
  disabled,
}: {
  children: ReactNode;
  type?: "button" | "submit";
  tone?: "primary" | "secondary" | "ghost" | "danger";
  onClick?: () => void;
  disabled?: boolean;
}) {
  const className =
    tone === "secondary"
      ? "btn btn-secondary"
      : tone === "ghost"
        ? "btn btn-ghost"
        : tone === "danger"
          ? "btn btn-danger"
          : "btn btn-primary";

  return (
    <button className={className} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
