"use client";

import Link from "next/link";
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

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("flowhr.lang", language);
  }, [language]);

  return (
    <div className="app-root office-tone">
      <header className="global-header">
        <Link className="brand-lockup" href="/">
          <span className="brand-mark">F</span>
          <div>
            <strong>{APP_COPY[language].appName}</strong>
            <span>{resolveText(language, tx("Pack Setup", "Pack Setup"))}</span>
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
          <p className="eyebrow">{resolveText(language, tx("FlowHR Setup", "FlowHR Setup"))}</p>
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
              <p className="eyebrow">{resolveText(language, pack.title)}</p>
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
                  <div key={feature.id} className={`item-row ${feature.included ? "" : "tone-watch"}`}>
                    <div>
                      <strong>{resolveText(language, feature.title)}</strong>
                      <span>{resolveText(language, feature.description)}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="setup-actions">
                <Link href={`/admin/${pack.id}/home`}>
                  {resolveText(language, tx("관리자 코어 보기", "Open admin core"))}
                </Link>
                <Link href={`/employee/${pack.id}/home`}>
                  {resolveText(language, tx("직원 코어 보기", "Open employee core"))}
                </Link>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
