import { readFileSync } from "node:fs";
import path from "node:path";

export const adminViews = [
  "home",
  "people",
  "attendance",
  "leave",
  "workflow",
  "documents",
  "payroll",
  "performance",
  "recruiting",
  "reports",
  "settings",
] as const;

export const employeeViews = [
  "home",
  "schedule",
  "requests",
  "inbox",
  "documents",
  "profile",
] as const;

export type AdminView = (typeof adminViews)[number];
export type EmployeeView = (typeof employeeViews)[number];
export type WireframeScope =
  | "index"
  | "landing"
  | "login"
  | "platform"
  | "admin"
  | "employee";

export type WireframePage = {
  body: string;
  styles: string;
  title?: string;
};

const wireframeRoot = path.join(process.cwd(), "flowhr-ui");

function extractBody(html: string) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return match ? match[1].trim() : html;
}

function extractStyles(html: string) {
  return [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)]
    .map((match) => match[1].trim())
    .join("\n");
}

function extractTitle(html: string) {
  return html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim();
}

function rewriteHrefValue(href: string) {
  if (href === "landing.html") return "/";
  if (href === "login.html") return "/login";
  if (href === "index.html") return "/ui";
  if (href.startsWith("platform/console.html")) {
    return href.replace("platform/console.html", "/platform/console");
  }
  if (href.startsWith("admin/")) {
    return href.replace(/^admin\/([a-z-]+)\.html$/, "/admin/$1");
  }
  if (href.startsWith("employee/")) {
    return href.replace(/^employee\/([a-z-]+)\.html$/, "/employee/$1");
  }
  if (href.startsWith("../")) {
    return rewriteHrefValue(href.slice(3));
  }
  if (/^[a-z-]+\.html(#.*)?$/i.test(href)) {
    const [file, hash] = href.split("#");
    const view = file.replace(/\.html$/i, "");
    if (adminViews.includes(view as AdminView)) {
      return `/admin/${view}${hash ? `#${hash}` : ""}`;
    }
    if (employeeViews.includes(view as EmployeeView)) {
      return `/employee/${view}${hash ? `#${hash}` : ""}`;
    }
  }
  return href;
}

function rewriteLinks(markup: string) {
  return markup.replace(/href="([^"]+)"/gi, (_, href: string) => {
    return `href="${rewriteHrefValue(href)}"`;
  });
}

function readWireframe(file: string) {
  return readFileSync(path.join(wireframeRoot, file), "utf8");
}

export function getWireframePage(file: string, scope: WireframeScope): WireframePage {
  const raw = readWireframe(file);
  const body = rewriteLinks(extractBody(raw));
  const styles = extractStyles(raw);
  const title = extractTitle(raw);

  return {
    body,
    styles,
    title: scope ? title : title,
  };
}
