"use client";

import { useMemo, useState } from "react";

import { AppButton, Card, DataTable, KpiRow, PageHeader, QueueList } from "@/components/primitives";

type DocumentTemplate = {
  id: string;
  name: string;
  description: string;
  version: string;
  usageCount: number;
};

type VaultRecord = {
  id: string;
  title: string;
  recipient: string;
  type: string;
  sentAt: string;
  signedAt?: string;
  status: "서명 완료" | "서명 대기" | "만료";
};

type PayrollRule = {
  id: string;
  name: string;
  type: string;
  formula: string;
  active: boolean;
};

type PayrollTask = {
  id: string;
  title: string;
  meta: string;
  status: "완료" | "처리 중" | "대기";
};

type PayslipRecord = {
  id: string;
  name: string;
  department: string;
  basePay: string;
  allowance: string;
  deduction: string;
  netPay: string;
  status: "발송 완료" | "재발행 요청" | "퇴직정산 포함";
};

const templateSeed: DocumentTemplate[] = [
  { id: "dt1", name: "근로계약서", description: "정규직 계약용 표준 문서", version: "v3.2", usageCount: 128 },
  { id: "dt2", name: "연봉 변경 동의서", description: "연봉 조정/승진 반영 문서", version: "v2.1", usageCount: 45 },
  { id: "dt3", name: "NDA", description: "입사 시 필수 서명 문서", version: "v1.4", usageCount: 312 },
];

const vaultSeed: VaultRecord[] = [
  { id: "vd1", title: "근로계약서", recipient: "강지민", type: "계약서", sentAt: "2026.03.10", signedAt: "2026.03.11", status: "서명 완료" },
  { id: "vd2", title: "NDA", recipient: "강지민", type: "NDA", sentAt: "2026.03.10", signedAt: "2026.03.11", status: "서명 완료" },
  { id: "vd3", title: "연봉 변경 동의서", recipient: "박유리", type: "동의서", sentAt: "2026.03.08", status: "서명 대기" },
  { id: "vd4", title: "퇴사 확인서", recipient: "정현우", type: "확인서", sentAt: "2026.03.08", status: "서명 대기" },
];

const payrollRulesSeed: PayrollRule[] = [
  { id: "pr1", name: "기본급", type: "고정", formula: "연봉 / 12", active: true },
  { id: "pr2", name: "초과근무 수당", type: "변동", formula: "통상시급 × 1.5 × 초과시간", active: true },
  { id: "pr3", name: "야간근무 수당", type: "변동", formula: "통상시급 × 0.5 × 야간시간", active: true },
  { id: "pr4", name: "국민연금", type: "공제", formula: "기준 소득월액 × 4.5%", active: true },
];

const payrollTasksSeed: PayrollTask[] = [
  { id: "pt1", title: "근태 데이터 수집 완료", meta: "1,198명 출퇴근 기록 수집 완료", status: "완료" },
  { id: "pt2", title: "인사 변경 반영", meta: "승진 1명, 연봉 조정 3명", status: "완료" },
  { id: "pt3", title: "미확정 변동 사항 처리", meta: "수동 보정 3건", status: "처리 중" },
  { id: "pt4", title: "급여 계산 실행", meta: "전체 1,240명 급여 산출", status: "대기" },
];

const payslipSeed: PayslipRecord[] = [
  { id: "ps1", name: "김민지", department: "Product", basePay: "₩4,166,667", allowance: "₩320,000", deduction: "₩845,200", netPay: "₩3,641,467", status: "발송 완료" },
  { id: "ps2", name: "최도윤", department: "Engineering", basePay: "₩4,583,333", allowance: "₩680,000", deduction: "₩1,012,400", netPay: "₩4,250,933", status: "발송 완료" },
  { id: "ps3", name: "이수현", department: "Sales", basePay: "₩3,750,000", allowance: "₩150,000", deduction: "₩734,800", netPay: "₩3,165,200", status: "재발행 요청" },
];

export function AdminDocuments() {
  const [templates] = useState(templateSeed);
  const [vault, setVault] = useState(vaultSeed);
  const [recipient, setRecipient] = useState("강지민, 이현서");
  const [templateId, setTemplateId] = useState(templateSeed[0].id);
  const [deadline, setDeadline] = useState("2026-03-19");
  const [note, setNote] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  const filteredVault = useMemo(
    () => vault.filter((item) => [item.title, item.recipient, item.type].some((field) => field.toLowerCase().includes(query.toLowerCase()))),
    [vault, query],
  );

  function sendDocument() {
    const template = templates.find((item) => item.id === templateId);
    if (!template) return;
    const recipients = recipient.split(",").map((item) => item.trim()).filter(Boolean);
    const newRecords = recipients.map((name, index) => ({ id: `vd_${Date.now()}_${index}`, title: template.name, recipient: name, type: template.name, sentAt: deadline, status: "서명 대기" as const }));
    setVault((prev) => [...newRecords, ...prev]);
    setNote("");
    setMessage(`${recipients.length}명에게 문서를 발송했습니다.`);
  }

  function updateVault(id: string, status: VaultRecord["status"], actionText: string) {
    setVault((prev) => prev.map((item) => (item.id === id ? { ...item, status, signedAt: status === "서명 완료" ? new Date().toLocaleDateString("ko-KR") : item.signedAt } : item)));
    setMessage(actionText);
  }

  return (
    <>
      <PageHeader breadcrumb={["Home", "Documents"]} title="문서 관리" subtitle="계약서 발송, 템플릿 관리, 문서 보관함" actions={<><AppButton tone="secondary" onClick={() => setMessage("템플릿 관리자 화면을 열었습니다.")}>템플릿 관리</AppButton><AppButton onClick={sendDocument}>문서 발송</AppButton></>} />
      <KpiRow items={[{ eyebrow: "발송 완료", label: "이번 달", value: "156", tone: "neutral" }, { eyebrow: "서명 완료", label: "완료율", value: "132", tone: "success" }, { eyebrow: "서명 대기", label: "미완료", value: String(vault.filter((item) => item.status === "서명 대기").length), tone: "warning" }, { eyebrow: "만료 예정", label: "7일 이내", value: "5", tone: "critical" }]} />
      <div className="content-grid cols-2" style={{ marginTop: "24px" }}>
        <Card title="문서 템플릿"><QueueList items={templates.map((template) => ({ tone: "neutral", title: `${template.name} · ${template.version}`, meta: `${template.description} · 사용 ${template.usageCount}건` }))} /></Card>
        <Card title="새 문서 발송">
          <div className="form-group"><label className="form-label">수신자</label><input className="form-input" value={recipient} onChange={(event) => setRecipient(event.target.value)} /></div>
          <div className="form-group"><label className="form-label">문서 템플릿</label><select className="form-select" value={templateId} onChange={(event) => setTemplateId(event.target.value)}>{templates.map((template) => <option key={template.id} value={template.id}>{template.name} ({template.version})</option>)}</select></div>
          <div className="form-group"><label className="form-label">서명 마감일</label><input className="form-input" value={deadline} onChange={(event) => setDeadline(event.target.value)} /></div>
          <div className="form-group"><label className="form-label">메모</label><textarea className="form-textarea" rows={3} value={note} onChange={(event) => setNote(event.target.value)} /></div>
          <AppButton onClick={sendDocument}>발송하기</AppButton>
        </Card>
      </div>
      <Card title="문서 보관함" right={<input className="filter-search" placeholder="문서명 또는 수신자 검색..." value={query} onChange={(event) => setQuery(event.target.value)} />}>
        <DataTable columns={["문서명", "수신자", "유형", "발송일", "서명일", "상태", "액션"]} rows={filteredVault.map((item) => [item.title, item.recipient, item.type, item.sentAt, item.signedAt ?? "—", item.status, item.status === "서명 대기" ? <div key={`${item.id}-actions`} style={{ display: "flex", gap: "8px" }}><AppButton tone="ghost" onClick={() => updateVault(item.id, "서명 대기", "리마인더를 발송했습니다.")}>리마인더</AppButton><AppButton tone="primary" onClick={() => updateVault(item.id, "서명 완료", "문서를 서명 완료 처리했습니다.")}>완료 처리</AppButton></div> : <AppButton key={`${item.id}-download`} tone="ghost" onClick={() => setMessage(`${item.title} 다운로드를 시작했습니다.`)}>다운로드</AppButton>])} />
        {message ? <p style={{ marginTop: "12px", color: "var(--brand-primary)" }}>{message}</p> : null}
      </Card>
    </>
  );
}

export function AdminPayroll() {
  const [rules, setRules] = useState(payrollRulesSeed);
  const [tasks, setTasks] = useState(payrollTasksSeed);
  const [payslips, setPayslips] = useState(payslipSeed);
  const [ruleName, setRuleName] = useState("");
  const [ruleFormula, setRuleFormula] = useState("");
  const [message, setMessage] = useState("");

  function addRule() {
    if (!ruleName.trim() || !ruleFormula.trim()) {
      setMessage("규칙명과 계산식을 입력하세요.");
      return;
    }
    setRules((prev) => [{ id: `pr_${Date.now()}`, name: ruleName, type: "사용자 정의", formula: ruleFormula, active: true }, ...prev]);
    setRuleName("");
    setRuleFormula("");
    setMessage("급여 규칙을 추가했습니다.");
  }

  function advanceTask(id: string) {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, status: task.status === "대기" ? "처리 중" : "완료" } : task)));
    setMessage("마감 단계를 갱신했습니다.");
  }

  function reissuePayslip(id: string) {
    setPayslips((prev) => prev.map((item) => (item.id === id ? { ...item, status: "발송 완료" } : item)));
    setMessage("명세서를 재발행했습니다.");
  }

  return (
    <>
      <PageHeader breadcrumb={["Home", "Payroll"]} title="급여 관리" subtitle="급여 규칙, 마감 프로세스, 명세서 관리" actions={<><AppButton tone="secondary" onClick={() => setMessage("급여 데이터를 내보냈습니다.")}>급여 데이터 내보내기</AppButton><AppButton onClick={() => setMessage("급여 마감을 시작했습니다.")}>마감 시작</AppButton></>} />
      <KpiRow items={[{ eyebrow: "이번 달 총 급여", label: "총 급여액", value: "₩847.2M", tone: "critical" }, { eyebrow: "급여 대상자", label: "명", value: "1,240", tone: "neutral" }, { eyebrow: "미확정 변동", label: "확인 필요", value: "3", tone: "warning" }, { eyebrow: "마감 상태", label: "단계 완료", value: "2/5", tone: "success" }]} />
      <div className="content-grid cols-2" style={{ marginTop: "24px" }}>
        <Card title="급여 규칙" right={<AppButton tone="ghost" onClick={addRule}>규칙 추가</AppButton>}>
          <DataTable columns={["규칙명", "유형", "계산 방식", "상태"]} rows={rules.map((rule) => [rule.name, rule.type, rule.formula, rule.active ? "활성" : "비활성"])} />
          <div className="content-grid cols-2" style={{ marginTop: "16px" }}><input className="form-input" placeholder="새 규칙명" value={ruleName} onChange={(event) => setRuleName(event.target.value)} /><input className="form-input" placeholder="계산식" value={ruleFormula} onChange={(event) => setRuleFormula(event.target.value)} /></div>
        </Card>
        <Card title="급여 마감"><QueueList items={tasks.map((task) => ({ tone: task.status === "완료" ? "success" : task.status === "처리 중" ? "warning" : "neutral", title: task.title, meta: `${task.meta} · ${task.status}`, action: <AppButton tone="ghost" onClick={() => advanceTask(task.id)}>단계 갱신</AppButton> }))} /></Card>
      </div>
      <Card title="명세서 센터" right={<AppButton tone="secondary" onClick={() => setMessage("명세서 일괄 발송을 시작했습니다.")}>일괄 발송</AppButton>}>
        <DataTable columns={["이름", "부서", "기본급", "수당", "공제", "실수령액", "상태", "액션"]} rows={payslips.map((item) => [item.name, item.department, item.basePay, item.allowance, item.deduction, item.netPay, item.status, item.status === "재발행 요청" ? <AppButton key={`${item.id}-reissue`} onClick={() => reissuePayslip(item.id)}>재발행</AppButton> : <AppButton key={`${item.id}-preview`} tone="ghost" onClick={() => setMessage(`${item.name} 명세서를 열었습니다.`)}>미리보기</AppButton>])} />
        {message ? <p style={{ marginTop: "12px", color: "var(--brand-primary)" }}>{message}</p> : null}
      </Card>
    </>
  );
}
