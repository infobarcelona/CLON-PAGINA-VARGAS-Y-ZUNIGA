import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { Mail } from "lucide-react";

const Lawyers = () => {
  const { t } = useLang();
  const [activeIdx, setActiveIdx] = useState(0);
  const active = t.lawyers.members[activeIdx];

  return (
    <div className="section-content section-enter" data-testid="section-lawyers">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start stagger">
          <div className="col-span-12 lg:col-span-3">
            <div className="eyebrow">03 · {t.nav.lawyers}</div>
            <h2
              className="display mt-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
              data-testid="lawyers-title"
            >
              <span className="slash-red mr-1">/</span>{t.lawyers.title}
            </h2>

            <div
              className="mt-7 flex flex-col"
              style={{
                borderTop: "1px solid var(--cream-edge)",
              }}
            >
              {t.lawyers.members.map((m, i) => (
                <button
                  key={m.initials}
                  type="button"
                  data-testid={`lawyer-tab-${i}`}
                  onClick={() => setActiveIdx(i)}
                  className="text-left py-4 flex items-center justify-between transition-colors"
                  style={{
                    borderBottom: "1px solid var(--cream-edge)",
                    color: i === activeIdx ? "var(--ink)" : "var(--ink-mute)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'PT Sans', sans-serif",
                        fontWeight: 700,
                        fontSize: "16px",
                      }}
                    >
                      {m.name}
                    </div>
                    <div className="label mt-1">{m.role}</div>
                  </div>
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: i === activeIdx ? "var(--accent)" : "var(--cream-edge)",
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="monogram" data-testid={`lawyer-monogram-${activeIdx}`}>
              <div className="letters">
                {active.initials[0]}<span style={{ color: "var(--accent)" }}>·</span>{active.initials[1]}
              </div>
              <div className="full-name">{active.name}</div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="label" style={{ color: "var(--accent)" }}>{active.role}</div>
            <h3
              className="display mt-1"
              style={{ fontSize: "clamp(1.5rem, 2.3vw, 2rem)" }}
              data-testid="lawyer-name"
            >
              {active.name}
            </h3>
            <ul className="mt-5 space-y-2.5" data-testid="lawyer-experience">
              {active.experience.map((line, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3"
                  style={{ color: "var(--ink-mute)", fontSize: "13.5px", lineHeight: 1.6 }}
                >
                  <span
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: "var(--accent)",
                      marginTop: 9,
                      flexShrink: 0,
                    }}
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${active.email}`}
              data-testid="lawyer-email"
              className="ver-mas mt-6 inline-flex"
            >
              <Mail size={13} strokeWidth={1.8} />
              {active.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lawyers;
