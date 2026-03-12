import { readFileSync } from "node:fs";
import path from "node:path";

import { adminViews, employeeViews, type AdminView, type EmployeeView } from "@/lib/access-policy";
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

function rewriteScopedViewHref(href: string, scope: WireframeScope) {
  const [file, hash] = href.split("#");
  const view = file.replace(/\.html$/i, "");
  const suffix = hash ? `#${hash}` : "";

  if (scope === "admin" && adminViews.includes(view as AdminView)) {
    return `/admin/${view}${suffix}`;
  }

  if (scope === "employee" && employeeViews.includes(view as EmployeeView)) {
    return `/employee/${view}${suffix}`;
  }

  if (adminViews.includes(view as AdminView)) {
    return `/admin/${view}${suffix}`;
  }

  if (employeeViews.includes(view as EmployeeView)) {
    return `/employee/${view}${suffix}`;
  }

  return null;
}

function rewriteHrefValue(href: string, scope: WireframeScope) {
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
    return rewriteHrefValue(href.slice(3), scope);
  }
  if (/^[a-z-]+\.html(#.*)?$/i.test(href)) {
    return rewriteScopedViewHref(href, scope) ?? href;
  }
  return href;
}

function rewriteLinks(markup: string, scope: WireframeScope) {
  return markup.replace(/href="([^"]+)"/gi, (_, href: string) => {
    return `href="${rewriteHrefValue(href, scope)}"`;
  });
}

function readWireframe(file: string) {
  return readFileSync(path.join(wireframeRoot, file), "utf8");
}

export function getWireframePage(file: string, scope: WireframeScope): WireframePage {
  const raw = readWireframe(file);
  const body = rewriteLinks(extractBody(raw), scope);
  const styles = extractStyles(raw);
  const title = extractTitle(raw);

  return {
    body,
    styles,
    title: scope ? title : title,
  };
}
