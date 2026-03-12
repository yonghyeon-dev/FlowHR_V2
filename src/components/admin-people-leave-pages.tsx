"use client";

import { useMemo, useState } from "react";

import { AppButton, Card, DataTable, KpiRow, PageHeader, QueueList, StatRows } from "@/components/primitives";

type PersonRecord = {
  id: string;
  name: string;
  department: string;
  title: string;
  status: "재직 중" | "퇴사 예정" | "휴직";
  signal: string;
  email: string;
  phone: string;
  manager: string;
  leaveBalance: string;
};

type LeavePolicy = {
  id: string;
  name: string;
  basis: string;
  annualDays: string;
  carry: string;
  payType: string;
  active: boolean;
};

type LeaveQueueItem = {
  id: string;
  employee: string;
  title: string;
  period: string;
  meta: string;
  status: "승인 대기" | "승인 완료" | "반려";
};

const peopleSeed: PersonRecord[] = [
  { id: "p1", name: "김민지", department: "Product", title: "시니어 디자이너", status: "재직 중", signal: "초과근무 주의", email: "minji.kim@flowhr.io", phone: "010-1234-5678", manager: "박서준", leaveBalance: "8.5일" },
  { id: "p2", name: "최도윤", department: "Engineering", title: "백엔드 엔지니어", status: "재직 중", signal: "연속 야간근무", email: "doyun.choi@flowhr.io", phone: "010-2222-3333", manager: "강태원", leaveBalance: "11.5일" },
  { id: "p3", name: "이수현", department: "Sales", title: "영업 매니저", status: "재직 중", signal: "1:1 예정", email: "soohyun.lee@flowhr.io", phone: "010-7777-1234", manager: "김영수", leaveBalance: "7.0일" },
  { id: "p4", name: "정현우", department: "Engineering", title: "프론트엔드 리드", status: "퇴사 예정", signal: "퇴사일: 3/31", email: "hyunwoo.jung@flowhr.io", phone: "010-5555-8888", manager: "강태원", leaveBalance: "2.0일" },
  { id: "p5", name: "한서윤", department: "Product", title: "주니어 기획자", status: "휴직", signal: "복직 예정: 4/15", email: "seoyun.han@flowhr.io", phone: "010-9898-1111", manager: "박서준", leaveBalance: "12.0일" },
];

const leavePoliciesSeed: LeavePolicy[] = [
  { id: "lp1", name: "연차 휴가", basis: "근속 연차 기준", annualDays: "15일", carry: "최대 10일", payType: "유급", active: true },
  { id: "lp2", name: "반차", basis: "연차 0.5일 차감", annualDays: "-", carry: "-", payType: "유급", active: true },
  { id: "lp3", name: "병가", basis: "진단서 제출", annualDays: "60일", carry: "이월 불가", payType: "유급(60일)", active: true },
];

const leaveQueueSeed: LeaveQueueItem[] = [
  { id: "lq1", employee: "김주원", title: "연차", period: "3/17 ~ 3/18", meta: "Engineering · 개인 사유", status: "승인 대기" },
  { id: "lq2", employee: "유수미", title: "병가", period: "3/12", meta: "Product · 진단서 첨부", status: "승인 대기" },
  { id: "lq3", employee: "박서준", title: "연차", period: "3/20 ~ 3/21", meta: "HR · 가족 행사", status: "승인 완료" },
];

export function AdminPeople() {
  const [people, setPeople] = useState(peopleSeed);
  const [selectedId, setSelectedId] = useState(peopleSeed[1].id);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"전체" | "재직 중" | "퇴사 예정" | "휴직">("전체");
  const [newName, setNewName] = useState("");
  const [newDept, setNewDept] = useState("Product");
  const [message, setMessage] = useState("");

  const filtered = useMemo(
    () =>
      people.filter((person) => {
        const matchesQuery = [person.name, person.department, person.title].some((field) => field.toLowerCase().includes(query.toLowerCase()));
        const matchesStatus = statusFilter === "전체" ? true : person.status === statusFilter;
        return matchesQuery && matchesStatus;
      }),
    [people, query, statusFilter],
  );

  const selected = filtered.find((item) => item.id === selectedId) ?? filtered[0] ?? people[0];

  function handleAddPerson() {
    if (!newName.trim()) {
      setMessage("이름을 입력하세요.");
      return;
    }
    const record: PersonRecord = {
      id: `p_${Date.now()}`,
      name: newName,
      department: newDept,
      title: "신규 구성원",
      status: "재직 중",
      signal: "온보딩 진행 중",
      email: `${newName.replace(/\s+/g, "").toLowerCase()}@flowhr.io`,
      phone: "010-0000-0000",
      manager: "미지정",
      leaveBalance: "15일",
    };
    setPeople((prev) => [record, ...prev]);
    setSelectedId(record.id);
    setNewName("");
    setMessage("구성원을 등록했습니다.");
  }

  return (
    <>
      <PageHeader
        breadcrumb={["Home", "People"]}
        title="구성원 관리"
        subtitle={`전체 ${people.length}명 · 재직 중 ${people.filter((item) => item.status === "재직 중").length}명 · 퇴사 예정 ${people.filter((item) => item.status === "퇴사 예정").length}명 · 휴직 ${people.filter((item) => item.status === "휴직").length}명`}
        actions={<><AppButton tone="secondary" onClick={() => setMessage("구성원 목록을 CSV로 내보냈습니다.")}>엑셀 내보내기</AppButton><AppButton onClick={handleAddPerson}>구성원 등록</AppButton></>}
      />
      <div className="filter-bar">
        <input className="filter-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="이름, 부서, 직위 검색..." />
        {(["전체", "재직 중", "퇴사 예정", "휴직"] as const).map((item) => (
          <button key={item} className={`filter-chip${statusFilter === item ? " active" : ""}`} onClick={() => setStatusFilter(item)} type="button">{item}</button>
        ))}
      </div>
      <Card>
        <DataTable columns={["이름", "부서", "직위", "상태", "시그널", "액션"]} rows={filtered.map((person) => [
          <button key={`${person.id}-select`} className="btn btn-ghost" onClick={() => setSelectedId(person.id)}>{person.name}</button>,
          person.department,
          person.title,
          person.status,
          person.signal,
          <AppButton key={`${person.id}-detail`} tone="ghost" onClick={() => setSelectedId(person.id)}>상세</AppButton>,
        ])} />
      </Card>
      <div className="content-grid cols-2" style={{ marginTop: "24px" }}>
        <Card title={`구성원 상세 — ${selected.name}`}>
          <div className="stat-row"><span className="stat-label">이메일</span><span className="stat-value">{selected.email}</span></div>
          <div className="stat-row"><span className="stat-label">전화번호</span><span className="stat-value">{selected.phone}</span></div>
          <div className="stat-row"><span className="stat-label">직속 상사</span><span className="stat-value">{selected.manager}</span></div>
          <div className="stat-row"><span className="stat-label">잔여 휴가</span><span className="stat-value">{selected.leaveBalance}</span></div>
          <div className="stat-row"><span className="stat-label">최근 시그널</span><span className="stat-value">{selected.signal}</span></div>
        </Card>
        <Card title="신규 구성원 등록">
          <div className="form-group"><label className="form-label">이름</label><input className="form-input" value={newName} onChange={(event) => setNewName(event.target.value)} /></div>
          <div className="form-group"><label className="form-label">부서</label><select className="form-select" value={newDept} onChange={(event) => setNewDept(event.target.value)}><option>Product</option><option>Engineering</option><option>Sales</option><option>HR</option></select></div>
          <AppButton onClick={handleAddPerson}>등록</AppButton>
          {message ? <p style={{ marginTop: "12px", color: "var(--brand-primary)" }}>{message}</p> : null}
        </Card>
      </div>
      <div className="content-grid cols-2" style={{ marginTop: "24px" }}>
        <Card title="조직도"><QueueList items={[{ tone: "neutral", title: "Product (28명)", meta: "UX 12 · 기획 10 · 리서치 6" }, { tone: "neutral", title: "Engineering (45명)", meta: "백엔드 18 · 프론트 15 · 인프라 12" }, { tone: "neutral", title: "Sales (32명)", meta: "B2B 14 · B2C 12 · CS 6" }, { tone: "neutral", title: "HR (8명)", meta: "HRM 4 · HRD 4" }]} /></Card>
        <Card title="인사 변경 이력"><QueueList items={[{ tone: "success", title: "강지민 입사", meta: "Engineering · 2026.03.12" }, { tone: "neutral", title: "이수현 부서 이동", meta: "Sales B2B → Sales B2C · 2026.03.10" }, { tone: "warning", title: "정현우 퇴사 예정", meta: "퇴사일 2026.03.31" }]} /></Card>
      </div>
    </>
  );
}

export function AdminLeave() {
  const [policies, setPolicies] = useState(leavePoliciesSeed);
  const [queue, setQueue] = useState(leaveQueueSeed);
  const [name, setName] = useState("");
  const [annualDays, setAnnualDays] = useState("15일");
  const [message, setMessage] = useState("");

  function addPolicy() {
    if (!name.trim()) {
      setMessage("휴가 유형명을 입력하세요.");
      return;
    }
    setPolicies((prev) => [{ id: `lp_${Date.now()}`, name, basis: "관리자 추가", annualDays, carry: "정책 확인 필요", payType: "유급", active: true }, ...prev]);
    setName("");
    setMessage("휴가 정책을 추가했습니다.");
  }

  function updateQueue(id: string, status: LeaveQueueItem["status"]) {
    setQueue((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)));
    setMessage(status === "승인 완료" ? "휴가 요청을 승인했습니다." : "휴가 요청을 반려했습니다.");
  }

  return (
    <>
      <PageHeader
        breadcrumb={["Home", "Leave"]}
        title="휴가 관리"
        subtitle="휴가 현황, 정책, 요청 관리"
        actions={<><AppButton tone="secondary" onClick={() => setMessage("휴가 현황을 내보냈습니다.")}>내보내기</AppButton><AppButton onClick={addPolicy}>휴가 부여</AppButton></>}
      />
      <KpiRow items={[{ eyebrow: "오늘 휴가", label: "명 부재 중", value: "18", tone: "critical" }, { eyebrow: "대기 중 요청", label: "승인 대기", value: String(queue.filter((item) => item.status === "승인 대기").length), tone: "warning" }, { eyebrow: "잔여 연차 평균", label: "전사 평균", value: "8.2일", tone: "neutral" }, { eyebrow: "이번 달 사용", label: "총 사용", value: "142일", tone: "success" }]} />
      <div className="content-grid cols-2-1" style={{ marginTop: "24px" }}>
        <Card title="휴가 캘린더"><div className="bar-chart">{["3/12 연차 8명", "3/13 반차 4명", "3/14 병가 2명", "3/15 연차 5명"].map((item, index) => <div key={item} className="bar-row"><span className="bar-label">{item.split(" ")[0]}</span><div className="bar-track"><div className="bar-fill" style={{ width: `${55 + index * 10}%` }} /></div><span className="bar-value">{item.split(" ").slice(1).join(" ")}</span></div>)}</div></Card>
        <Card title="오늘 부재자"><QueueList items={[{ tone: "neutral", title: "이수현", meta: "Sales · 연차" }, { tone: "neutral", title: "윤서하", meta: "Engineering · 반차" }, { tone: "warning", title: "장유미", meta: "Product · 병가" }]} /></Card>
      </div>
      <div className="content-grid cols-2" style={{ marginTop: "24px" }}>
        <Card title="휴가 정책" right={<AppButton tone="ghost" onClick={addPolicy}>정책 추가</AppButton>}>
          <DataTable columns={["휴가 유형", "부여 기준", "연간 부여", "이월", "유급/무급", "상태"]} rows={policies.map((policy) => [policy.name, policy.basis, policy.annualDays, policy.carry, policy.payType, policy.active ? "활성" : "비활성"])} />
          <div className="content-grid cols-2" style={{ marginTop: "16px" }}>
            <input className="form-input" placeholder="새 휴가 유형" value={name} onChange={(event) => setName(event.target.value)} />
            <input className="form-input" placeholder="연간 부여일수" value={annualDays} onChange={(event) => setAnnualDays(event.target.value)} />
          </div>
        </Card>
        <Card title="휴가 요청 큐">
          <QueueList items={queue.map((item) => ({ tone: item.status === "승인 대기" ? "warning" : item.status === "반려" ? "critical" : "success", title: `${item.employee} — ${item.title} (${item.period})`, meta: `${item.meta} · ${item.status}`, action: item.status === "승인 대기" ? <div style={{ display: "flex", gap: "8px" }}><AppButton tone="primary" onClick={() => updateQueue(item.id, "승인 완료")}>승인</AppButton><AppButton tone="ghost" onClick={() => updateQueue(item.id, "반려")}>반려</AppButton></div> : undefined }))} />
          {message ? <p style={{ marginTop: "12px", color: "var(--brand-primary)" }}>{message}</p> : null}
        </Card>
      </div>
    </>
  );
}
