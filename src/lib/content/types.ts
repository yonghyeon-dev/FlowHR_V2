export type LocalizedText = {
  ko: string;
  en: string;
};

export type ItemTone = "critical" | "watch" | "healthy" | "primary";

export type DashboardItem = {
  title: LocalizedText;
  meta?: LocalizedText;
  tone?: ItemTone;
};

export type TimelineItem = {
  lead: string;
  text: LocalizedText;
  badge: LocalizedText;
};

export type DashboardSection = {
  title: LocalizedText;
  eyebrow?: LocalizedText;
  tone?: ItemTone;
  items?: DashboardItem[];
  stats?: LocalizedText[];
  timeline?: TimelineItem[];
};

export type KpiItem = {
  value: string;
  label: LocalizedText;
};

export type DashboardPage = {
  title: LocalizedText;
  description: LocalizedText;
  questions: LocalizedText[];
  kpis?: KpiItem[];
  columns: DashboardSection[];
};

export type EmployeeHomePage = {
  title: LocalizedText;
  description: LocalizedText;
  questions: LocalizedText[];
  mustDo: LocalizedText[];
  quickActions: LocalizedText[];
  weekly: LocalizedText[];
  summary: LocalizedText[];
  mobileHero: {
    title: LocalizedText;
    text: LocalizedText;
  };
};

export type EmployeeFlowPage = {
  title: LocalizedText;
  description: LocalizedText;
  quickActions: LocalizedText[];
  hints: LocalizedText[];
  history: LocalizedText[];
};
