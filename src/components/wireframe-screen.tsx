"use client";

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { usePathname, useRouter } from "next/navigation";

import type { WireframePage } from "@/lib/wireframes";

type DrawerItem = {
  label: string;
  value: string;
};

type DrawerState = {
  title: string;
  description: string;
  items?: DrawerItem[];
};

const enhancerStyles = `
  .wf-toast {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 1000;
    min-width: 220px;
    padding: 12px 16px;
    border-radius: 12px;
    background: rgba(17, 24, 39, 0.92);
    color: #fff;
    box-shadow: 0 12px 32px rgba(15, 23, 42, 0.28);
    font-size: 14px;
    font-weight: 600;
  }

  .wf-drawer-overlay {
    position: fixed;
    inset: 0;
    z-index: 950;
    display: flex;
    justify-content: flex-end;
    background: rgba(15, 23, 42, 0.18);
  }

  .wf-drawer {
    width: min(420px, 100vw);
    height: 100%;
    background: #fff;
    border-left: 1px solid rgba(15, 23, 42, 0.08);
    box-shadow: -16px 0 40px rgba(15, 23, 42, 0.12);
    padding: 24px;
    overflow-y: auto;
  }

  .wf-drawer-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 20px;
  }

  .wf-drawer-title {
    font-size: 20px;
    font-weight: 700;
    color: #111827;
  }

  .wf-drawer-description {
    margin-top: 6px;
    color: #4b5563;
    font-size: 14px;
    line-height: 1.5;
  }

  .wf-drawer-grid {
    display: grid;
    gap: 12px;
  }

  .wf-drawer-row {
    padding: 12px;
    border: 1px solid rgba(15, 23, 42, 0.08);
    border-radius: 12px;
    background: #f8fafc;
  }

  .wf-drawer-label {
    display: block;
    margin-bottom: 4px;
    color: #6b7280;
    font-size: 12px;
    font-weight: 600;
  }

  .wf-drawer-value {
    color: #111827;
    font-size: 14px;
    font-weight: 600;
  }

  .wf-clickable-card {
    outline: 2px solid transparent;
    transition: outline-color 120ms ease, transform 120ms ease, box-shadow 120ms ease;
  }

  .wf-clickable-card:hover {
    outline-color: rgba(15, 23, 42, 0.12);
    transform: translateY(-1px);
  }

  .wf-clickable-card.wf-active-card {
    outline-color: #0f766e;
    box-shadow: 0 12px 24px rgba(15, 118, 110, 0.12);
  }
`;

function normalizeText(value: string | null | undefined) {
  return value?.replace(/\s+/g, " ").trim() ?? "";
}

function isTextField(
  node: Element,
): node is HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement {
  return (
    node instanceof HTMLInputElement ||
    node instanceof HTMLSelectElement ||
    node instanceof HTMLTextAreaElement
  );
}

function getFieldValue(field: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) {
  if (field instanceof HTMLSelectElement) {
    return normalizeText(field.options[field.selectedIndex]?.text);
  }

  if (field instanceof HTMLInputElement && (field.type === "checkbox" || field.type === "radio")) {
    return field.checked ? "선택됨" : "선택 안 됨";
  }

  return normalizeText(field.value);
}

function findScopedContainer(node: Element, selector: string) {
  let current: Element | null = node;
  while (current) {
    if (current.matches(selector)) return current;
    current = current.parentElement;
  }
  return null;
}

function setExclusiveActive(target: Element, selector: string, activeClass: string) {
  const scoped =
    findScopedContainer(target, ".tabs") ??
    findScopedContainer(target, ".filter-bar") ??
    findScopedContainer(target, ".card-header") ??
    target.parentElement;

  scoped?.querySelectorAll(selector).forEach((node) => node.classList.remove(activeClass));
  target.classList.add(activeClass);
}

function getCardTitle(element: Element) {
  return (
    normalizeText(element.closest(".card")?.querySelector(".card-title")?.textContent) ||
    normalizeText(element.closest(".card")?.querySelector(".font-semibold")?.textContent) ||
    normalizeText(element.closest(".section-divider")?.querySelector("h2")?.textContent) ||
    normalizeText(document.querySelector(".page-title")?.textContent) ||
    "상세 정보"
  );
}

function collectFormFields(scope: ParentNode | null) {
  if (!scope) return [] as DrawerItem[];

  const groups = Array.from(scope.querySelectorAll(".form-group"));
  if (!groups.length) return [] as DrawerItem[];

  return groups
    .map((group) => {
      const label = normalizeText(group.querySelector(".form-label")?.textContent);
      const field = Array.from(group.querySelectorAll("input, select, textarea")).find(isTextField);
      const value = field ? getFieldValue(field) : normalizeText(group.textContent);

      if (!label || !value) return null;
      return { label, value };
    })
    .filter((item): item is DrawerItem => Boolean(item));
}

function getTableRowSummary(element: HTMLElement) {
  const row = element.closest("tr");
  const table = row?.closest("table");
  if (!row || !table) return null;

  const headers = Array.from(table.querySelectorAll("thead th")).map((header) =>
    normalizeText(header.textContent) || "항목",
  );
  const cells = Array.from(row.querySelectorAll("td")).map((cell) => normalizeText(cell.textContent));
  if (!cells.length) return null;

  return {
    title: cells[0] || "선택 항목",
    description: "테이블 행 기준 상세 정보를 확인합니다.",
    items: cells.map((value, index) => ({
      label: headers[index] || `필드 ${index + 1}`,
      value: value || "-",
    })),
  };
}

function getQueueSummary(element: HTMLElement) {
  const queue = element.closest(".queue-item");
  if (!queue) return null;

  const title = normalizeText(queue.querySelector(".q-title")?.textContent) || "처리 항목";
  const meta = normalizeText(queue.querySelector(".q-meta")?.textContent);

  return {
    title,
    description: meta || "대기열 항목 상세입니다.",
  };
}

function getCardSummary(element: HTMLElement) {
  const card = element.closest(".card");
  if (!card) return null;

  const title = getCardTitle(card);
  const items = collectFormFields(card);
  const description =
    normalizeText(card.querySelector(".card-subtitle")?.textContent) ||
    normalizeText(card.querySelector(".text-muted")?.textContent) ||
    "카드 기준 상세 정보입니다.";

  return {
    title,
    description,
    items,
  };
}

function appendRequestHistory(root: HTMLDivElement | null, button: HTMLElement) {
  const tableBody = root?.querySelector("table.data-table tbody");
  if (!tableBody) return;

  const fields = collectFormFields(button.closest(".card"));
  if (!fields.length) return;

  const requestType =
    fields.find((field) => field.label.includes("유형"))?.value ||
    fields.find((field) => field.label.includes("종류"))?.value ||
    "신규 요청";

  const requestDetail =
    fields.find((field) => field.label.includes("사유"))?.value ||
    fields.find((field) => field.label.includes("내용"))?.value ||
    "작성된 요청";

  const approver =
    fields.find((field) => field.label.includes("결재"))?.value ||
    fields.find((field) => field.label.includes("승인"))?.value ||
    "자동 지정";

  const row = document.createElement("tr");
  row.innerHTML = `
    <td><span class="badge info">${requestType}</span></td>
    <td>${requestDetail}</td>
    <td>${new Date().toLocaleDateString("ko-KR")}</td>
    <td>
      <div class="flex items-center gap-2">
        <div class="avatar sm">자동</div>
        <span class="text-sm">${approver}</span>
      </div>
    </td>
    <td><span class="badge warning">대기 중</span></td>
    <td class="cell-actions"><button class="btn btn-ghost btn-sm">상세</button></td>
  `;

  tableBody.prepend(row);
}

function markActiveCard(root: HTMLDivElement | null, card: HTMLElement) {
  root?.querySelectorAll(".wf-clickable-card").forEach((node) => node.classList.remove("wf-active-card"));
  card.classList.add("wf-clickable-card", "wf-active-card");
}

export function WireframeScreen({ screen }: { screen: WireframePage }) {
  const router = useRouter();
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [drawer, setDrawer] = useState<DrawerState | null>(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2200);
    return () => window.clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    if (!rootRef.current) return;
    rootRef.current.innerHTML = screen.body;
    setToast(null);
    setDrawer(null);
  }, [screen.body]);

  function showDrawerFromElement(element: HTMLElement, title?: string) {
    const rowSummary = getTableRowSummary(element);
    const queueSummary = getQueueSummary(element);
    const cardSummary = getCardSummary(element);

    setDrawer(
      rowSummary ??
        queueSummary ??
        cardSummary ?? {
          title: title || getCardTitle(element),
          description: "선택한 항목의 상세 정보입니다.",
        },
    );
  }

  function navigateByContext(button: HTMLElement) {
    const text = normalizeText(button.textContent);
    const cardTitle = getCardTitle(button);

    if (pathname.startsWith("/platform")) {
      if (text.includes("테넌트")) {
        router.push("/platform/console#tenants");
        return true;
      }
      if (text.includes("감사")) {
        router.push("/platform/console#audit");
        return true;
      }
      if (text.includes("설정")) {
        router.push("/platform/console#settings");
        return true;
      }
      return false;
    }

    if (pathname.startsWith("/admin")) {
      if (text.includes("문서") || cardTitle.includes("문서")) {
        router.push("/admin/documents");
        return true;
      }
      if (text.includes("급여") || cardTitle.includes("급여")) {
        router.push("/admin/payroll");
        return true;
      }
      if (text.includes("근태") || cardTitle.includes("근태")) {
        router.push("/admin/attendance");
        return true;
      }
      if (text.includes("휴가") || cardTitle.includes("휴가")) {
        router.push("/admin/leave");
        return true;
      }
      if (text.includes("리포트") || cardTitle.includes("리포트")) {
        router.push("/admin/reports");
        return true;
      }
      return false;
    }

    if (pathname.startsWith("/employee")) {
      if (text.includes("서명") || text.includes("문서") || cardTitle.includes("문서")) {
        router.push("/employee/documents");
        return true;
      }
      if (text.includes("일정") || cardTitle.includes("일정")) {
        router.push("/employee/schedule");
        return true;
      }
      if (text.includes("요청") || cardTitle.includes("요청")) {
        router.push("/employee/requests");
        return true;
      }
      if (text.includes("인박스") || cardTitle.includes("인박스")) {
        router.push("/employee/inbox");
        return true;
      }
      return false;
    }

    return false;
  }

  function handleButton(button: HTMLElement) {
    const buttonText = normalizeText(button.textContent) || "버튼";
    const isPrimary = button.classList.contains("btn-primary");
    const isSecondary = button.classList.contains("btn-secondary");
    const isPagination = button.classList.contains("pagination-btn");

    if (isPagination) {
      const pagination = button.closest(".pagination-controls") ?? button.parentElement;
      pagination?.querySelectorAll(".pagination-btn").forEach((node) => node.classList.remove("active"));
      button.classList.add("active");
      setToast(`${buttonText} 페이지로 이동했습니다.`);
      return;
    }

    if (buttonText.includes("취소") || buttonText.includes("닫기")) {
      setDrawer(null);
      setToast("작업을 취소했습니다.");
      return;
    }

    if (
      pathname === "/employee/requests" &&
      (buttonText.includes("신청하기") ||
        buttonText.includes("요청하기") ||
        buttonText.includes("정정 요청"))
    ) {
      appendRequestHistory(rootRef.current, button);
      setToast("요청 이력이 반영되었습니다.");
      showDrawerFromElement(button, "요청 내용 확인");
      return;
    }

    if (buttonText.includes("전체 보기") || buttonText.includes("상세") || buttonText.includes("보기")) {
      if (!navigateByContext(button)) {
        showDrawerFromElement(button, buttonText);
      }
      setToast(`${buttonText} 작업을 연결했습니다.`);
      return;
    }

    if (
      buttonText.includes("저장") ||
      buttonText.includes("발송") ||
      buttonText.includes("생성") ||
      buttonText.includes("추가") ||
      buttonText.includes("재발송") ||
      buttonText.includes("다운로드") ||
      buttonText.includes("편집") ||
      buttonText.includes("관리") ||
      buttonText.includes("조치") ||
      buttonText.includes("확인") ||
      buttonText.includes("처리") ||
      buttonText.includes("알림") ||
      buttonText.includes("승인") ||
      buttonText.includes("종료") ||
      buttonText.includes("배정")
    ) {
      showDrawerFromElement(button, buttonText);
      setToast(`${buttonText} 작업을 연결했습니다.`);
      return;
    }

    if (isPrimary || isSecondary) {
      showDrawerFromElement(button, buttonText);
      setToast(`${buttonText} 작업을 연결했습니다.`);
      return;
    }

    if (!navigateByContext(button)) {
      showDrawerFromElement(button, buttonText);
    }
    setToast(`${buttonText} 작업을 연결했습니다.`);
  }

  function handleRootClick(event: ReactMouseEvent<HTMLDivElement>) {
    const target = event.target as HTMLElement;

    const button = target.closest("button") as HTMLElement | null;
    if (button) {
      event.preventDefault();
      handleButton(button);
      return;
    }

    const filterChip = target.closest(".filter-chip") as HTMLElement | null;
    if (filterChip) {
      event.preventDefault();
      setExclusiveActive(filterChip, ".filter-chip", "active");
      setToast(`${normalizeText(filterChip.textContent) || "필터"}로 전환했습니다.`);
      return;
    }

    const tabItem = target.closest(".tab-item") as HTMLElement | null;
    if (tabItem) {
      event.preventDefault();
      setExclusiveActive(tabItem, ".tab-item", "active");
      setToast(`${normalizeText(tabItem.textContent) || "탭"} 탭을 활성화했습니다.`);
      return;
    }

    const toggle = target.closest(".toggle") as HTMLElement | null;
    if (toggle) {
      event.preventDefault();
      const track = toggle.querySelector(".toggle-track");
      track?.classList.toggle("on");
      setToast(track?.classList.contains("on") ? "설정을 활성화했습니다." : "설정을 비활성화했습니다.");
      return;
    }

    const row = target.closest("tbody tr") as HTMLElement | null;
    if (row && !target.closest("a")) {
      rootRef.current
        ?.querySelectorAll("tbody tr.active-row")
        .forEach((node) => node.classList.remove("active-row"));
      row.classList.add("active-row");
      return;
    }

    const clickableCard = target.closest(".card[style*='cursor: pointer']") as HTMLElement | null;
    if (clickableCard) {
      event.preventDefault();
      markActiveCard(rootRef.current, clickableCard);

      if (pathname === "/employee/requests") {
        const cards = Array.from(
          rootRef.current?.querySelectorAll(".content-grid.cols-3 .card[style*='cursor: pointer']") ?? [],
        );
        const index = cards.indexOf(clickableCard);
        const select = rootRef.current?.querySelector(".form-select") as HTMLSelectElement | null;
        if (select && index >= 0 && index < select.options.length) {
          select.selectedIndex = index;
        }

        setToast(`${getCardTitle(clickableCard)} 카드를 선택했습니다.`);
        return;
      }

      showDrawerFromElement(clickableCard);
      setToast(`${getCardTitle(clickableCard)} 카드를 선택했습니다.`);
    }
  }

  return (
    <div className="wireframe-root">
      <style dangerouslySetInnerHTML={{ __html: enhancerStyles }} />
      {screen.styles ? <style dangerouslySetInnerHTML={{ __html: screen.styles }} /> : null}

      <div ref={rootRef} onClick={handleRootClick} />

      {toast ? <div className="wf-toast">{toast}</div> : null}

      {drawer ? (
        <div className="wf-drawer-overlay" onClick={() => setDrawer(null)}>
          <aside className="wf-drawer" onClick={(event) => event.stopPropagation()}>
            <div className="wf-drawer-header">
              <div>
                <div className="wf-drawer-title">{drawer.title}</div>
                <div className="wf-drawer-description">{drawer.description}</div>
              </div>
              <button className="btn btn-ghost btn-sm" type="button" onClick={() => setDrawer(null)}>
                닫기
              </button>
            </div>

            {drawer.items?.length ? (
              <div className="wf-drawer-grid">
                {drawer.items.map((item) => (
                  <div key={`${item.label}-${item.value}`} className="wf-drawer-row">
                    <span className="wf-drawer-label">{item.label}</span>
                    <span className="wf-drawer-value">{item.value}</span>
                  </div>
                ))}
              </div>
            ) : null}
          </aside>
        </div>
      ) : null}
    </div>
  );
}
