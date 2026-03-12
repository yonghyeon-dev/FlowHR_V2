"use client";

import { useState } from "react";

import { AppButton, Card, DataTable, KpiRow, PageHeader, QueueList } from "@/components/primitives";

type PerformanceProgress = {
  id: string;
  name: string;
  department: string;
  selfReview: string;
  peerReview: string;
  managerReview: string;
  overall: string;
};

type OneOnOneMeeting = {
  id: string;
  title: string;
  meta: string;
};

type JobPosting = {
  id: string;
  role: string;
  department: string;
  status: "모집 중" | "마감 임박" | "마감";
  applicants: number;
  deadline: string;
};

type CandidateStage = "서류 접수" | "1차 면접" | "2차 면접" | "최종";

type Candidate = {
  id: string;
  name: string;
  summary: string;
  stage: CandidateStage;
  tag?: string;
};

type ChecklistTask = {
  id: string;
  title: string;
  status: "완료" | "진행 중" | "예정";
};

type ReportCardItem = {
  id: string;
  name: string;
  description: string;
  generatedAt: string;
};

type ScheduledReport = {
  id: string;
  name: string;
  frequency: string;
  format: string;
  audience: string;
  lastSent: string;
  active: boolean;
};

const performanceSeed: PerformanceProgress[] = [
  { id: "pf1", name: "김민지", department: "Product", selfReview: "완료", peerReview: "완료", managerReview: "진행 중", overall: "2/3" },
  { id: "pf2", name: "최도윤", department: "Engineering", selfReview: "완료", peerReview: "진행 중", managerReview: "미시작", overall: "1/3" },
  { id: "pf3", name: "이수현", department: "Sales", selfReview: "완료", peerReview: "완료", managerReview: "완료", overall: "완료" },
];

const oneOnOneSeed: OneOnOneMeeting[] = [
  { id: "oo1", title: "강태원 ↔ 최도윤", meta: "3/12 14:00 · 연속 야간근무 이슈와 목표 진행률 점검" },
  { id: "oo2", title: "박유리 ↔ 한서윤", meta: "3/12 15:30 · 복직 준비와 업무 인수인계" },
];

const jobsSeed: JobPosting[] = [
  { id: "jb1", role: "시니어 백엔드 엔지니어", department: "Engineering", status: "모집 중", applicants: 14, deadline: "2026.03.31" },
  { id: "jb2", role: "프로덕트 디자이너", department: "Product", status: "모집 중", applicants: 8, deadline: "2026.03.25" },
  { id: "jb3", role: "인사 담당자", department: "HR", status: "마감 임박", applicants: 3, deadline: "2026.03.14" },
];

const candidateSeed: Candidate[] = [
  { id: "cd1", name: "박정민", summary: "경력 5년 · 카카오 출신 · 3/11 접수", stage: "서류 접수" },
  { id: "cd2", name: "김도연", summary: "경력 7년 · 3/14 면접 예정", stage: "1차 면접" },
  { id: "cd3", name: "송민규", summary: "경력 6년 · CTO 면접 대기", stage: "2차 면접" },
  { id: "cd4", name: "윤재훈", summary: "경력 9년 · 처우 협의 중", stage: "최종", tag: "오퍼 발송" },
];

const onboardingSeed: ChecklistTask[] = [
  { id: "ob1", title: "근로계약서 서명", status: "완료" },
  { id: "ob2", title: "NDA 서명", status: "완료" },
  { id: "ob3", title: "IT 장비 수령", status: "완료" },
  { id: "ob4", title: "계정 생성", status: "완료" },
  { id: "ob5", title: "팀 소개 미팅", status: "진행 중" },
  { id: "ob6", title: "보안 교육", status: "예정" },
];

const offboardingSeed: ChecklistTask[] = [
  { id: "of1", title: "퇴사 확인 면담", status: "완료" },
  { id: "of2", title: "인수인계 계획 수립", status: "완료" },
  { id: "of3", title: "업무 인수인계 실행", status: "진행 중" },
  { id: "of4", title: "IT 장비 반납", status: "예정" },
  { id: "of5", title: "계정 비활성화", status: "예정" },
];

const reportCardsSeed: ReportCardItem[] = [
  { id: "rp1", name: "인원 현황 리포트", description: "부서별/직급별 인원 구성 분석", generatedAt: "2026.03.01" },
  { id: "rp2", name: "근태 리포트", description: "출퇴근, 초과근무, 예외 현황 분석", generatedAt: "2026.03.10" },
  { id: "rp3", name: "휴가 사용 리포트", description: "유형별 휴가 사용률과 잔여 현황", generatedAt: "2026.03.05" },
  { id: "rp4", name: "이직률 리포트", description: "분기별 이직률과 퇴사 사유 분석", generatedAt: "2026.03.01" },
];

const schedulesSeed: ScheduledReport[] = [
  { id: "sr1", name: "주간 근태 리포트", frequency: "매주 월요일 09:00", format: "Excel", audience: "인사팀 전체", lastSent: "2026.03.09", active: true },
  { id: "sr2", name: "월간 인원 현황", frequency: "매월 1일 09:00", format: "PDF", audience: "경영진", lastSent: "2026.03.01", active: true },
  { id: "sr3", name: "채용 파이프라인 리포트", frequency: "격주 금요일 17:00", format: "PDF", audience: "채용팀, 부서장", lastSent: "2026.03.07", active: false },
];

export function AdminPerformance() {
  const [cycleName, setCycleName] = useState("2026 H1 성과 평가");
  const [cycleType, setCycleType] = useState("다면 평가 (360도)");
  const [meetings, setMeetings] = useState(oneOnOneSeed);
  const [message, setMessage] = useState("");

  function saveCycle() {
    setMessage("평가 설정을 저장했습니다.");
  }

  function scheduleMeeting() {
    setMeetings((prev) => [...prev, { id: `oo_${Date.now()}`, title: "신규 1:1 미팅", meta: "3/18 16:00 · 신규 등록" }]);
    setMessage("1:1 미팅을 추가했습니다.");
  }

  return (
    <>
      <PageHeader breadcrumb={["Home", "Performance"]} title="성과 관리" subtitle="목표 관리, 평가 주기, 1:1 미팅 관리" actions={<><AppButton tone="secondary" onClick={() => setMessage("평가 리포트를 생성했습니다.")}>평가 리포트</AppButton><AppButton onClick={saveCycle}>평가 주기 저장</AppButton></>} />
      <KpiRow items={[{ eyebrow: "목표 설정 완료", label: "구성원", value: "82%", tone: "success" }, { eyebrow: "평가 진행", label: "건", value: "45", tone: "warning" }, { eyebrow: "1:1 일정", label: "이번 주", value: "12", tone: "neutral" }, { eyebrow: "미설정", label: "목표 미입력", value: "215", tone: "critical" }]} />
      <div className="content-grid cols-2" style={{ marginTop: "24px" }}>
        <Card title="평가 주기 설정">
          <div className="form-group"><label className="form-label">평가 주기명</label><input className="form-input" value={cycleName} onChange={(event) => setCycleName(event.target.value)} /></div>
          <div className="form-group"><label className="form-label">평가 유형</label><select className="form-select" value={cycleType} onChange={(event) => setCycleType(event.target.value)}><option>다면 평가 (360도)</option><option>상향 평가</option><option>자기 평가 + 상사 평가</option></select></div>
        </Card>
        <Card title="평가 진행 현황"><DataTable columns={["이름", "부서", "자기 평가", "동료 평가", "상사 평가", "전체 상태"]} rows={performanceSeed.map((item) => [item.name, item.department, item.selfReview, item.peerReview, item.managerReview, item.overall])} /></Card>
      </div>
      <Card title="1:1 미팅 허브" right={<AppButton onClick={scheduleMeeting}>1:1 예약</AppButton>}><QueueList items={meetings.map((meeting) => ({ tone: "neutral", title: meeting.title, meta: meeting.meta }))} />{message ? <p style={{ marginTop: "12px", color: "var(--brand-primary)" }}>{message}</p> : null}</Card>
    </>
  );
}

export function AdminRecruiting() {
  const [jobs, setJobs] = useState(jobsSeed);
  const [candidates, setCandidates] = useState(candidateSeed);
  const [onboarding, setOnboarding] = useState(onboardingSeed);
  const [offboarding, setOffboarding] = useState(offboardingSeed);
  const [newRole, setNewRole] = useState("");
  const [message, setMessage] = useState("");

  function addJob() {
    if (!newRole.trim()) {
      setMessage("공고명을 입력하세요.");
      return;
    }
    setJobs((prev) => [{ id: `jb_${Date.now()}`, role: newRole, department: "Engineering", status: "모집 중", applicants: 0, deadline: "2026.04.30" }, ...prev]);
    setNewRole("");
    setMessage("채용 공고를 추가했습니다.");
  }

  function moveCandidate(id: string) {
    const order: CandidateStage[] = ["서류 접수", "1차 면접", "2차 면접", "최종"];
    setCandidates((prev) => prev.map((candidate) => {
      if (candidate.id !== id) return candidate;
      const nextStage = order[Math.min(order.indexOf(candidate.stage) + 1, order.length - 1)];
      return { ...candidate, stage: nextStage };
    }));
    setMessage("후보자 단계를 이동했습니다.");
  }

  function toggleTask(setter: React.Dispatch<React.SetStateAction<ChecklistTask[]>>, id: string) {
    setter((prev) => prev.map((task) => (task.id === id ? { ...task, status: task.status === "완료" ? "진행 중" : task.status === "진행 중" ? "예정" : "완료" } : task)));
  }

  return (
    <>
      <PageHeader breadcrumb={["Home", "Recruiting"]} title="채용 관리" subtitle="채용 공고, 지원자 파이프라인, 온보딩/오프보딩 관리" actions={<><AppButton tone="secondary" onClick={() => setMessage("채용 리포트를 생성했습니다.")}>채용 리포트</AppButton><AppButton onClick={addJob}>채용 공고 등록</AppButton></>} />
      <KpiRow items={[{ eyebrow: "진행 중 채용", label: "활성 공고", value: String(jobs.filter((job) => job.status !== "마감").length), tone: "critical" }, { eyebrow: "서류 접수", label: "지원자", value: "47", tone: "warning" }, { eyebrow: "면접 일정", label: "이번 주", value: "12", tone: "neutral" }, { eyebrow: "평균 채용 기간", label: "공고~입사", value: "28일", tone: "success" }]} />
      <div className="content-grid cols-2" style={{ marginTop: "24px" }}>
        <Card title="채용 공고"><DataTable columns={["포지션", "부서", "상태", "지원자", "마감일", "액션"]} rows={jobs.map((job) => [job.role, job.department, job.status, String(job.applicants), job.deadline, <AppButton key={`${job.id}-manage`} tone="ghost" onClick={() => setMessage(`${job.role} 공고를 열었습니다.`)}>관리</AppButton>])} /><input className="form-input" style={{ marginTop: "16px" }} placeholder="새 채용 공고명" value={newRole} onChange={(event) => setNewRole(event.target.value)} /></Card>
        <Card title="지원자 파이프라인"><QueueList items={candidates.map((candidate) => ({ tone: candidate.stage === "최종" ? "success" : candidate.stage === "2차 면접" ? "warning" : "neutral", title: `${candidate.name} · ${candidate.stage}`, meta: `${candidate.summary}${candidate.tag ? ` · ${candidate.tag}` : ""}`, action: <AppButton tone="ghost" onClick={() => moveCandidate(candidate.id)}>다음 단계</AppButton> }))} /></Card>
      </div>
      <div className="content-grid cols-2" style={{ marginTop: "24px" }}>
        <Card title="온보딩 센터"><QueueList items={onboarding.map((task) => ({ tone: task.status === "완료" ? "success" : task.status === "진행 중" ? "warning" : "neutral", title: task.title, meta: task.status, action: <AppButton tone="ghost" onClick={() => toggleTask(setOnboarding, task.id)}>상태 변경</AppButton> }))} /></Card>
        <Card title="오프보딩 센터"><QueueList items={offboarding.map((task) => ({ tone: task.status === "완료" ? "success" : task.status === "진행 중" ? "warning" : "neutral", title: task.title, meta: task.status, action: <AppButton tone="ghost" onClick={() => toggleTask(setOffboarding, task.id)}>상태 변경</AppButton> }))} /></Card>
      </div>
      {message ? <p style={{ marginTop: "12px", color: "var(--brand-primary)" }}>{message}</p> : null}
    </>
  );
}

export function AdminReports() {
  const [scheduled, setScheduled] = useState(schedulesSeed);
  const [selectedReport, setSelectedReport] = useState(reportCardsSeed[0].id);
  const [message, setMessage] = useState("");

  const current = reportCardsSeed.find((item) => item.id === selectedReport) ?? reportCardsSeed[0];

  function toggleSchedule(id: string) {
    setScheduled((prev) => prev.map((item) => (item.id === id ? { ...item, active: !item.active } : item)));
    setMessage("정기 보고서 활성 상태를 변경했습니다.");
  }

  return (
    <>
      <PageHeader breadcrumb={["Home", "Reports"]} title="리포트 센터" subtitle="인사 데이터 인사이트, 분석 리포트, 정기 보고서 관리" actions={<><AppButton tone="secondary" onClick={() => setMessage("정기 보고서 설정을 열었습니다.")}>정기 보고서</AppButton><AppButton onClick={() => setMessage("커스텀 리포트를 생성했습니다.")}>커스텀 리포트</AppButton></>} />
      <div className="content-grid cols-3" style={{ marginTop: "8px" }}>
        {reportCardsSeed.map((report) => (
          <Card key={report.id} title={report.name} footer={`최근 생성: ${report.generatedAt}`}>
            <p className="text-sm text-muted" style={{ marginBottom: "16px" }}>{report.description}</p>
            <AppButton tone="secondary" onClick={() => setSelectedReport(report.id)}>리포트 보기</AppButton>
          </Card>
        ))}
      </div>
      <div className="content-grid cols-2" style={{ marginTop: "24px" }}>
        <Card title="인사이트 미리보기">
          <div className="font-semibold" style={{ marginBottom: "12px" }}>{current.name}</div>
          <QueueList items={[{ tone: "neutral", title: "Engineering", meta: "452명" }, { tone: "neutral", title: "Sales", meta: "248명" }, { tone: "neutral", title: "Product", meta: "178명" }]} />
        </Card>
        <Card title="정기 보고서"><DataTable columns={["보고서명", "스케줄", "형식", "수신자", "마지막 발송", "상태", "액션"]} rows={scheduled.map((item) => [item.name, item.frequency, item.format, item.audience, item.lastSent, item.active ? "활성" : "비활성", <AppButton key={`${item.id}-toggle`} tone="ghost" onClick={() => toggleSchedule(item.id)}>{item.active ? "비활성화" : "활성화"}</AppButton>])} /></Card>
      </div>
      {message ? <p style={{ marginTop: "12px", color: "var(--brand-primary)" }}>{message}</p> : null}
    </>
  );
}
