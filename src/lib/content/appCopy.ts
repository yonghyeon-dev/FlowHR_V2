import type { LocalizedText } from "./types";

export const SUPPORTED_LANGUAGES = ["ko", "en"] as const;

export const APP_COPY = {
  ko: {
    appName: "FlowHR V2",
    landingEyebrow: "승인된 코어 팩 구현",
    landingTitle: "Office, Retail, Platform 코어 운영 화면",
    landingText:
      "승인된 코어 팩을 실제 앱 라우트와 공통 셸 위에 구현한 첫 번째 운영 빌드입니다.",
    roleCards: [
      {
        title: "Platform Console",
        text: "SaaS 운영 리스크, 테넌트 상태, 보안 신호를 먼저 본다.",
        cta: "Platform 보기",
      },
      {
        title: "Office Pack",
        text: "승인, 문서, 유연근무 예외를 중심으로 운영한다.",
        cta: "Office 보기",
      },
      {
        title: "Retail Pack",
        text: "매장 커버리지, 피크타임, 브레이크와 오버타임을 중심으로 운영한다.",
        cta: "Retail 보기",
      },
    ],
    localeLabel: "언어",
    openLabel: "열기",
    nowLabel: "지금",
    decisionQuestions: "핵심 질문",
    platformShell: {
      title: "Platform Console",
      subtitle: "위험 신호 우선 운영",
    },
    adminShell: {
      title: "Tenant Admin",
      subtitle: "업종별 운영 팩",
      office: "Office Pack",
      retail: "Retail Pack",
    },
    employeeShell: {
      title: "Employee Hub",
      subtitle: "셀프서비스 코어 팩",
      office: "Office Pack",
      retail: "Retail Pack",
    },
    tabs: {
      home: "홈",
      requests: "요청",
      documents: "문서",
      me: "내 정보",
      shift: "근무",
      inbox: "인박스",
    },
  },
  en: {
    appName: "FlowHR V2",
    landingEyebrow: "Approved core pack implementation",
    landingTitle: "Office, Retail, and Platform core operations",
    landingText:
      "The first operational build that maps approved core packs into real routes and shared shells.",
    roleCards: [
      {
        title: "Platform Console",
        text: "Operator-first views for platform risk, tenant state, and security signals.",
        cta: "Open Platform",
      },
      {
        title: "Office Pack",
        text: "Runs around approvals, documents, and flexible-work exceptions.",
        cta: "Open Office",
      },
      {
        title: "Retail Pack",
        text: "Runs around coverage, peak slots, breaks, and overtime exposure.",
        cta: "Open Retail",
      },
    ],
    localeLabel: "Language",
    openLabel: "Open",
    nowLabel: "Now",
    decisionQuestions: "Key questions",
    platformShell: {
      title: "Platform Console",
      subtitle: "Risk-first operations",
    },
    adminShell: {
      title: "Tenant Admin",
      subtitle: "Industry operation packs",
      office: "Office Pack",
      retail: "Retail Pack",
    },
    employeeShell: {
      title: "Employee Hub",
      subtitle: "Self-service core packs",
      office: "Office Pack",
      retail: "Retail Pack",
    },
    tabs: {
      home: "Home",
      requests: "Requests",
      documents: "Documents",
      me: "Me",
      shift: "Shift",
      inbox: "Inbox",
    },
  },
};

export function tx(ko: string, en: string): LocalizedText {
  return { ko, en };
}
