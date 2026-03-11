import type {
  DashboardPage,
  EmployeeFlowPage,
  EmployeeHomePage,
  LocalizedText,
} from "@/lib/content/types";

export type SupportedPack = "office" | "retail";
export type AdminView = "home" | "attendance" | "leave" | "workflow" | "documents" | "settings";
export type EmployeeView = "home" | "requests" | "signatures";

export type ApiMeta = {
  scope: string;
  generatedAt: string;
  source: "mock";
};

export type ApiResponse<T> = {
  data: T;
  meta: ApiMeta;
};

export type PlatformOverviewResponse = DashboardPage & {
  eyebrow: LocalizedText;
};

export type AdminPageResponse = DashboardPage & {
  eyebrow: LocalizedText;
  pack: SupportedPack;
  view: AdminView;
};

export type EmployeeHomeResponse = EmployeeHomePage & {
  eyebrow: LocalizedText;
  pack: SupportedPack;
  view: "home";
};

export type EmployeeFlowResponse = EmployeeFlowPage & {
  eyebrow: LocalizedText;
  pack: SupportedPack;
  view: "requests" | "signatures";
};

export type PackFeature = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  included: boolean;
};

export type PackSetup = {
  id: SupportedPack;
  title: LocalizedText;
  summary: LocalizedText;
  primaryUse: LocalizedText;
  defaultScreens: LocalizedText[];
  featurePacks: PackFeature[];
};

export type PackSetupResponse = {
  recommendedOrder: SupportedPack[];
  packs: PackSetup[];
};

export type ActionScenario = "success" | "validation_error" | "access_denied" | "server_error";

export type ActionSimulationRequest = {
  actionType: "request_submit" | "signature_submit" | "approval_approve" | "settings_save" | "feature_selection_save";
  scenario: ActionScenario;
  locale?: "ko" | "en";
  pack?: SupportedPack;
};

export type ActionSimulationSuccess = {
  result: "success";
  message: string;
  resourceId: string;
};

export type ActionSimulationFailure = {
  result: "error";
  code: "VALIDATION_ERROR" | "ACCESS_DENIED" | "SERVER_ERROR";
  message: string;
  fieldErrors?: Record<string, string>;
};
