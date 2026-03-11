"use client";

import { startTransition, useState } from "react";
import { tx } from "@/lib/content/appCopy";
import type {
  ActionActor,
  ActionScenario,
  ActionSimulationFailure,
  ActionSimulationSuccess,
  SupportedPack,
} from "@/lib/api/types";
import type { LocalizedText } from "@/lib/content/types";

type Language = "ko" | "en";

function resolveText(language: Language, value: LocalizedText): string {
  return value[language] ?? value.ko ?? value.en;
}

type ActionSimulatorProps = {
  language: Language;
  title: LocalizedText;
  description: LocalizedText;
  endpoint: string;
  primaryLabel: LocalizedText;
  pack?: SupportedPack;
  actor?: ActionActor;
};

export function ActionSimulator({
  language,
  title,
  description,
  endpoint,
  primaryLabel,
  pack,
  actor,
}: ActionSimulatorProps) {
  const [scenario, setScenario] = useState<ActionScenario>("success");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<ActionSimulationSuccess | null>(null);
  const [error, setError] = useState<ActionSimulationFailure | null>(null);

  async function handleSubmit() {
    setSubmitting(true);
    setSuccess(null);
    setError(null);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        scenario,
        locale: language,
        pack,
        actor,
      }),
    });

    const data = (await response.json()) as ActionSimulationSuccess | ActionSimulationFailure;

    startTransition(() => {
      if (response.ok) {
        setSuccess(data as ActionSimulationSuccess);
      } else {
        setError(data as ActionSimulationFailure);
      }
      setSubmitting(false);
    });
  }

  return (
    <article className="content-card action-panel">
      <div className="card-head">
        <div>
          <h3>{resolveText(language, title)}</h3>
          <p>{resolveText(language, description)}</p>
        </div>
      </div>

      <div className="action-controls">
        <label className="action-select">
          <span>{resolveText(language, tx("응답 시나리오", "Response scenario"))}</span>
          <select value={scenario} onChange={(event) => setScenario(event.target.value as ActionScenario)}>
            <option value="success">{resolveText(language, tx("성공", "Success"))}</option>
            <option value="validation_error">{resolveText(language, tx("검증 실패", "Validation error"))}</option>
            <option value="access_denied">{resolveText(language, tx("권한 없음", "Access denied"))}</option>
            <option value="server_error">{resolveText(language, tx("서버 오류", "Server error"))}</option>
          </select>
        </label>

        <button className="action-button" type="button" onClick={handleSubmit} disabled={submitting}>
          {submitting
            ? resolveText(language, tx("처리 중...", "Processing..."))
            : resolveText(language, primaryLabel)}
        </button>
      </div>

      {success ? (
        <div className="item-row tone-healthy">
          <div>
            <strong>{success.message}</strong>
            <span>{success.resourceId}</span>
          </div>
        </div>
      ) : null}

      {error ? (
        <div className="item-row tone-critical">
          <div>
            <strong>{error.message}</strong>
            <span>{error.code}</span>
            {error.fieldErrors ? (
              <span>
                {Object.entries(error.fieldErrors)
                  .map(([key, value]) => `${key}: ${value}`)
                  .join(" / ")}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}
    </article>
  );
}
