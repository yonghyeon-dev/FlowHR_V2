import type {
  ActionScenario,
  ActionSimulationFailure,
  ActionSimulationRequest,
  ActionSimulationSuccess,
} from "@/lib/api/types";

type Locale = "ko" | "en";

export function pickLocale(value?: string): Locale {
  return value === "en" ? "en" : "ko";
}

export function createActionSuccess(
  actionType: ActionSimulationRequest["actionType"],
  locale: Locale,
): ActionSimulationSuccess {
  const resourceId = `mock_${actionType}_${Date.now()}`;

  const messageMap: Record<
    Locale,
    Record<ActionSimulationRequest["actionType"], string>
  > = {
    ko: {
      request_submit: "요청이 제출되었습니다.",
      signature_submit: "서명이 완료되었습니다.",
      approval_approve: "승인이 반영되었습니다.",
      settings_save: "설정이 저장되었습니다.",
      feature_selection_save: "기능 선택이 저장되었습니다.",
    },
    en: {
      request_submit: "The request was submitted.",
      signature_submit: "The signature was completed.",
      approval_approve: "The approval was applied.",
      settings_save: "The settings were saved.",
      feature_selection_save: "The feature selection was saved.",
    },
  };

  return {
    result: "success",
    message: messageMap[locale][actionType],
    resourceId,
  };
}

export function createActionFailure(
  scenario: Exclude<ActionScenario, "success">,
  locale: Locale,
): ActionSimulationFailure {
  if (scenario === "validation_error") {
    return {
      result: "error",
      code: "VALIDATION_ERROR",
      message:
        locale === "ko"
          ? "필수 항목을 다시 확인해야 합니다."
          : "Review the required fields and try again.",
      fieldErrors: {
        reviewer:
          locale === "ko"
            ? "검토 담당자를 지정해야 합니다."
            : "A reviewer must be assigned.",
      },
    };
  }

  if (scenario === "access_denied") {
    return {
      result: "error",
      code: "ACCESS_DENIED",
      message:
        locale === "ko"
          ? "이 작업을 수행할 권한이 없습니다."
          : "You do not have permission to perform this action.",
    };
  }

  return {
    result: "error",
    code: "SERVER_ERROR",
    message:
      locale === "ko"
        ? "처리 중 오류가 발생했습니다. 다시 시도해 주세요."
        : "An error occurred while processing. Please try again.",
  };
}
