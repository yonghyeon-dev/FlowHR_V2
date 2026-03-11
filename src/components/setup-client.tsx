"use client";

import Link from "next/link";
import { ActionSimulator } from "@/components/action-simulator";
import { APP_COPY, tx } from "@/lib/content/appCopy";
import type { LocalizedText } from "@/lib/content/types";
import type { PackSetupResponse } from "@/lib/api/types";
import { useEffect, useState } from "react";

type Language = "ko" | "en";

function resolveText(language: Language, value: LocalizedText): string {
  return value[language] ?? value.ko ?? value.en;
}

function pickInitialLanguage(): Language {
  if (typeof window === "undefined") return "ko";
  const saved = window.localStorage.getItem("flowhr.lang");
  if (saved === "ko" || saved === "en") return saved;
  return navigator.language?.toLowerCase().startsWith("ko") ? "ko" : "en";
}

export function SetupClient({ data }: { data: PackSetupResponse }) {
  const [language, setLanguage] = useState<Language>(() => pickInitialLanguage());
  const [selectedPack, setSelectedPack] = useState(data.recommendedOrder[0] ?? data.packs[0]?.id ?? "office");
  const [featureState, setFeatureState] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(
      data.packs.flatMap((pack) =>
        pack.featurePacks.map((feature) => [`${pack.id}:${feature.id}`, feature.included]),
      ),
    ),
  );

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("flowhr.lang", language);
  }, [language]);

  const selectedPackData = data.packs.find((pack) => pack.id === selectedPack) ?? data.packs[0];
  const selectedFeatures = selectedPackData
    ? selectedPackData.featurePacks.filter((feature) => featureState[`${selectedPackData.id}:${feature.id}`])
    : [];

  function toggleFeature(packId: string, featureId: string, locked: boolean) {
    if (locked) return;
    const key = `${packId}:${featureId}`;
    setFeatureState((current) => ({
      ...current,
      [key]: !current[key],
    }));
  }

  return (
    <div className="app-root office-tone">
      <header className="global-header">
        <Link className="brand-lockup" href="/">
          <span className="brand-mark">F</span>
          <div>
            <strong>{APP_COPY[language].appName}</strong>
            <span>{resolveText(language, tx("팩 설정", "Pack Setup"))}</span>
          </div>
        </Link>
        <div className="locale-switch">
          {(["ko", "en"] as const).map((item) => (
            <button
              key={item}
              className={item === language ? "is-active" : ""}
              type="button"
              onClick={() => setLanguage(item)}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <div className="landing-page">
        <section className="landing-hero">
          <p className="eyebrow">{resolveText(language, tx("FlowHR 도입 설정", "FlowHR Setup"))}</p>
          <h1>{resolveText(language, tx("도입 조직에 맞는 Pack과 기능을 먼저 선택", "Choose the right pack and feature set before rollout"))}</h1>
          <p>
            {resolveText(
              language,
              tx(
                "초기 도입은 오피스형과 리테일형 두 축으로 나누고, 기능 팩은 조직 운영 방식에 맞게 조합한다.",
                "Start with office and retail as the two primary tracks, then combine feature packs to match the way the organization operates.",
              ),
            )}
          </p>
        </section>

        <section className="landing-grid setup-grid">
          {data.packs.map((pack) => (
            <article key={pack.id} className="landing-card setup-card">
              <div className="setup-card-head">
                <p className="eyebrow">{resolveText(language, pack.title)}</p>
                <button
                  className={`pack-select-button${selectedPack === pack.id ? " is-selected" : ""}`}
                  type="button"
                  onClick={() => setSelectedPack(pack.id)}
                >
                  {resolveText(
                    language,
                    selectedPack === pack.id
                      ? tx("선택됨", "Selected")
                      : tx("이 팩 선택", "Choose this pack"),
                  )}
                </button>
              </div>
              <h2>{resolveText(language, pack.summary)}</h2>
              <p>{resolveText(language, pack.primaryUse)}</p>
              <div className="chip-grid">
                {pack.defaultScreens.map((item) => (
                  <span key={resolveText(language, item)} className="chip">
                    {resolveText(language, item)}
                  </span>
                ))}
              </div>
              <div className="setup-feature-list">
                {pack.featurePacks.map((feature) => (
                  <button
                    key={feature.id}
                    className={`item-row feature-toggle ${feature.included ? "is-locked" : ""} ${featureState[`${pack.id}:${feature.id}`] ? "is-enabled" : "is-disabled"} ${feature.included ? "" : "tone-watch"}`}
                    type="button"
                    onClick={() => toggleFeature(pack.id, feature.id, feature.included)}
                  >
                    <div>
                      <strong>{resolveText(language, feature.title)}</strong>
                      <span>{resolveText(language, feature.description)}</span>
                    </div>
                    <small>
                      {resolveText(
                        language,
                        feature.included
                          ? tx("필수", "Required")
                          : featureState[`${pack.id}:${feature.id}`]
                            ? tx("활성", "Enabled")
                            : tx("비활성", "Disabled"),
                      )}
                    </small>
                  </button>
                ))}
              </div>
              <div className="setup-actions">
                <Link href={`/admin/${pack.id}/home`}>
                  {resolveText(language, tx("관리자 코어 보기", "Open admin core"))}
                </Link>
                <Link href={`/admin/${pack.id}/settings`}>
                  {resolveText(language, tx("설정 화면 보기", "Open settings"))}
                </Link>
                <Link href={`/employee/${pack.id}/home`}>
                  {resolveText(language, tx("직원 코어 보기", "Open employee core"))}
                </Link>
              </div>
            </article>
          ))}
        </section>

        <section className="page-stack">
          {selectedPackData ? (
            <article className="content-card content-card-primary">
              <div className="card-head">
                <div>
                  <h3>{resolveText(language, tx("현재 도입 선택", "Current rollout selection"))}</h3>
                  <p>{resolveText(language, selectedPackData.summary)}</p>
                </div>
              </div>
              <div className="chip-grid">
                <span className="chip">
                  {resolveText(language, tx("선택 팩", "Selected pack"))}: {resolveText(language, selectedPackData.title)}
                </span>
                <span className="chip">
                  {resolveText(language, tx("활성 기능 수", "Enabled feature count"))}: {selectedFeatures.length}
                </span>
              </div>
              <div className="setup-feature-list">
                {selectedFeatures.map((feature) => (
                  <div key={`${selectedPackData.id}:${feature.id}`} className="item-row">
                    <div>
                      <strong>{resolveText(language, feature.title)}</strong>
                      <span>{resolveText(language, feature.description)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ) : null}

          <ActionSimulator
            language={language}
            title={tx("기능 선택 저장 시뮬레이션", "Feature selection save simulation")}
            description={tx(
              "도입 단계에서 팩과 기능 선택을 저장할 때 성공, 검증 실패, 권한 오류 상태를 먼저 확인한다.",
              "Review success, validation, and permission states before saving pack and feature selections during setup.",
            )}
            actionType="feature_selection_save"
            primaryLabel={tx("선택 저장 테스트", "Test save selection")}
          />
        </section>
      </div>
    </div>
  );
}
