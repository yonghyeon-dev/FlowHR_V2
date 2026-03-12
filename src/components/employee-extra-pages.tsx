"use client";

import { useMemo, useState } from "react";

import { AppButton, Card, DataTable, KpiRow, PageHeader, QueueList } from "@/components/primitives";

type ScheduleRecord = {
  date: string;
  day: string;
  type: string;
  start: string;
  end: string;
  status: string;
};

type AttendanceHistory = {
  date: string;
  day: string;
  checkIn: string;
  checkOut: string;
  total: string;
  status: string;
};

const weekScheduleSeed: ScheduleRecord[] = [
  { date: "3월 9일", day: "월", type: "일반 근무", start: "09:00", end: "18:00", status: "정상" },
  { date: "3월 10일", day: "화", type: "일반 근무", start: "09:00", end: "18:00", status: "정상" },
  { date: "3월 11일", day: "수", type: "일반 근무", start: "09:00", end: "18:00", status: "정상" },
  { date: "3월 12일", day: "목", type: "일반 근무", start: "09:00", end: "18:00", status: "근무 중" },
  { date: "3월 13일", day: "금", type: "일반 근무", start: "09:00", end: "18:00", status: "예정" },
];

const historySeed: AttendanceHistory[] = [
  { date: "2026-03-12", day: "목", checkIn: "09:02", checkOut: "—", total: "—", status: "근무 중" },
  { date: "2026-03-11", day: "수", checkIn: "08:55", checkOut: "18:10", total: "9시간 15분", status: "정상" },
  { date: "2026-03-10", day: "화", checkIn: "09:00", checkOut: "18:05", total: "9시간 05분", status: "정상" },
  { date: "2026-03-07", day: "금", checkIn: "09:12", checkOut: "18:30", total: "9시간 18분", status: "지각" },
  { date: "2026-03-06", day: "목", checkIn: "09:00", checkOut: "13:00", total: "4시간 00분", status: "반차" },
];

const feedbackSeed = [
  { title: "박서준 피드백", meta: "디자인 시스템 컴포넌트 정리가 매우 깔끔합니다." },
  { title: "이하진 피드백", meta: "사용자 테스트 결과 정리가 인상적입니다." },
  { title: "박서준 피드백", meta: "멘토링에 시간을 꾸준히 쓰고 있습니다." },
];

export function EmployeeSchedule() {
  const [checkedIn, setCheckedIn] = useState(true);
  const [checkInTime, setCheckInTime] = useState("09:02");
  const [checkOutTime, setCheckOutTime] = useState("—");
  const [historyFilter, setHistoryFilter] = useState<"최근 2주" | "이번 달" | "지난달">("최근 2주");
  const [message, setMessage] = useState("");

  const history = useMemo(() => {
    if (historyFilter === "이번 달") return historySeed;
    if (historyFilter === "지난달") return historySeed.slice(1);
    return historySeed;
  }, [historyFilter]);

  function handleCheck() {
    if (checkedIn) {
      setCheckedIn(false);
      setCheckOutTime("18:01");
      setMessage("퇴근 체크가 완료되었습니다.");
    } else {
      setCheckedIn(true);
      setCheckInTime("09:00");
      setCheckOutTime("—");
      setMessage("출근 체크가 완료되었습니다.");
    }
  }

  return (
    <>
      <PageHeader breadcrumb={["홈", "일정 · 근태"]} title="일정 · 근태" subtitle="나의 근무 일정과 출퇴근 기록을 확인하세요" />
      <div className="content-grid cols-2-1">
        <Card title="출퇴근 체크" right={<span className={`badge ${checkedIn ? "success" : "neutral"}`}>{checkedIn ? "근무 중" : "퇴근 완료"}</span>}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "48px", fontWeight: 700, marginBottom: "8px" }}>{checkedIn ? "13:37" : "18:01"}</div>
            <div className="text-sm text-muted">2026년 3월 12일 목요일</div>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", marginTop: "20px" }}>
              <AppButton tone={checkedIn ? "secondary" : "primary"} onClick={handleCheck}>{checkedIn ? "퇴근" : "출근"}</AppButton>
            </div>
          </div>
          {message ? <p style={{ marginTop: "12px", color: "var(--brand-primary)" }}>{message}</p> : null}
        </Card>
        <Card title="오늘 현황">
          <div className="stat-row"><span className="stat-label">출근</span><span className="stat-value">{checkInTime}</span></div>
          <div className="stat-row"><span className="stat-label">퇴근</span><span className="stat-value">{checkOutTime}</span></div>
          <div className="stat-row"><span className="stat-label">총 근무시간</span><span className="stat-value">{checkedIn ? "—" : "9시간 01분"}</span></div>
          <div className="stat-row"><span className="stat-label">근무 유형</span><span className="stat-value">일반 근무</span></div>
          <div className="stat-row"><span className="stat-label">예정 퇴근</span><span className="stat-value">18:00</span></div>
        </Card>
      </div>

      <div style={{ marginTop: "24px" }}>
      <Card title="이번 주 근무 일정">
        <DataTable columns={["요일", "날짜", "근무 유형", "시작", "종료", "상태"]} rows={weekScheduleSeed.map((item) => [item.day, item.date, item.type, item.start, item.end, item.status])} />
      </Card>
      </div>

      <Card title="출퇴근 기록" right={<div style={{ display: "flex", gap: "8px" }}>{(["최근 2주", "이번 달", "지난달"] as const).map((item) => <button key={item} className={`filter-chip${historyFilter === item ? " active" : ""}`} type="button" onClick={() => setHistoryFilter(item)}>{item}</button>)}</div>} >
        <DataTable columns={["날짜", "요일", "출근", "퇴근", "총 근무", "상태"]} rows={history.map((item) => [item.date, item.day, item.checkIn, item.checkOut, item.total, item.status])} />
      </Card>
    </>
  );
}

export function EmployeeProfile() {
  const [profile, setProfile] = useState({
    name: "김민지",
    employeeNo: "EMP-2024-0042",
    email: "minji.kim@flowhr.io",
    personalEmail: "minji.k@gmail.com",
    phone: "010-1234-5678",
    emergency: "김영수(부) 010-9876-5432",
    address: "서울시 서초구 방배동 ***",
  });
  const [message, setMessage] = useState("");

  function updateField<K extends keyof typeof profile>(key: K, value: (typeof profile)[K]) {
    setProfile((prev) => ({ ...prev, [key]: value }));
  }

  function saveProfile() {
    setMessage("프로필 정보를 저장했습니다.");
  }

  return (
    <>
      <PageHeader breadcrumb={["홈", "내 정보"]} title="내 정보" subtitle="개인 정보, 휴가 현황, 성과 정보를 확인하세요" actions={<AppButton onClick={saveProfile}>프로필 저장</AppButton>} />

      <Card title="프로필 헤더">
        <div className="content-grid cols-2">
          <div className="stat-row"><span className="stat-label">성명</span><span className="stat-value">{profile.name}</span></div>
          <div className="stat-row"><span className="stat-label">사번</span><span className="stat-value">{profile.employeeNo}</span></div>
          <div className="stat-row"><span className="stat-label">부서</span><span className="stat-value">Product</span></div>
          <div className="stat-row"><span className="stat-label">직무</span><span className="stat-value">Product Design Lead</span></div>
        </div>
      </Card>

      <div className="content-grid cols-2" style={{ marginTop: "24px" }}>
        <Card title="기본 정보">
          <div className="form-group"><label className="form-label">이메일(회사)</label><input className="form-input" value={profile.email} onChange={(event) => updateField("email", event.target.value)} /></div>
          <div className="form-group"><label className="form-label">이메일(개인)</label><input className="form-input" value={profile.personalEmail} onChange={(event) => updateField("personalEmail", event.target.value)} /></div>
          <div className="form-group"><label className="form-label">전화번호</label><input className="form-input" value={profile.phone} onChange={(event) => updateField("phone", event.target.value)} /></div>
        </Card>
        <Card title="비상 연락처">
          <div className="form-group"><label className="form-label">긴급 연락처</label><input className="form-input" value={profile.emergency} onChange={(event) => updateField("emergency", event.target.value)} /></div>
          <div className="form-group"><label className="form-label">주소</label><input className="form-input" value={profile.address} onChange={(event) => updateField("address", event.target.value)} /></div>
        </Card>
      </div>

      <KpiRow items={[{ eyebrow: "연차 총액", label: "일", value: "15", tone: "success" }, { eyebrow: "사용", label: "일", value: "6.5", tone: "warning" }, { eyebrow: "잔여", label: "일", value: "8.5", tone: "critical" }]} />

      <div className="content-grid cols-2" style={{ marginTop: "24px" }}>
        <Card title="목표 달성 현황">
          <QueueList items={[{ tone: "success", title: "디자인 시스템 v2 출시", meta: "75%" }, { tone: "warning", title: "사용자 테스트 분기 2회", meta: "50%" }, { tone: "neutral", title: "주니어 디자이너 멘토링", meta: "60%" }]} />
        </Card>
        <Card title="최근 피드백">
          <QueueList items={feedbackSeed.map((item) => ({ tone: "neutral", title: item.title, meta: item.meta }))} />
        </Card>
      </div>

      <div style={{ marginTop: "24px" }}>
      <Card title="다음 1:1 미팅">
        <div className="content-grid cols-2">
          <div>
            <div className="font-semibold">박서준과 1:1</div>
            <div className="text-sm text-muted">2026-03-13 14:00 ~ 14:30 · 4층 회의실 B</div>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px" }}>
            <AppButton tone="secondary" onClick={() => setMessage("아젠다 작성 화면을 열었습니다.")}>아젠다 작성</AppButton>
            <AppButton tone="ghost" onClick={() => setMessage("일정 변경 요청을 보냈습니다.")}>일정 변경 요청</AppButton>
          </div>
        </div>
        {message ? <p style={{ marginTop: "12px", color: "var(--brand-primary)" }}>{message}</p> : null}
      </Card>
      </div>
    </>
  );
}
