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
            <div className="eyebrow">03 / {t.nav.lawyers}</div>
            <h2
              className="display mt-5"
              style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
              data-testid="lawyers-title"
            >
              {t.lawyers.title}
            </h2>

            {/* Selector list */}
            <div className="mt-7 flex flex-col" style={{ borderTop: "1px solid var(--bone-edge)" }}>
              {t.lawyers.members.map((m, i) => (
                <button
                  key={m.initials}
                  type="button"
                  data-testid={`lawyer-tab-${i}`}
                  onClick={() => setActiveIdx(i)}
                  className="text-left py-4 flex items-center justify-between transition-colors"
                  style={{
                    borderBottom: "1px solid var(--bone-edge)",
                    color: i === activeIdx ? "var(--ink)" : "var(--ink-mute)",
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 500,
                        fontSize: "18px",
                        letterSpacing: "0.005em",
                      }}
                    >
                      {m.name}
                    </div>
                    <div className="label mt-1">{m.role}</div>
                  </div>
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: i === activeIdx ? "var(--accent)" : "var(--bone-edge)",
                      display: "inline-block",
                      flexShrink: 0,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Profile */}
          <div className="col-span-12 lg:col-span-4">
            <div className="monogram" data-testid={`lawyer-monogram-${activeIdx}`}>
              <div className="letters">
                {active.initials[0]}
                <span style={{ color: "var(--accent-soft)" }}>·</span>
                {active.initials[1]}
              </div>
              <div className="full-name">{active.name}</div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <div className="label">{active.role}</div>
            <h3
              className="display mt-2"
              style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)" }}
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
                      width: 4,
                      height: 4,
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
              className="inline-flex items-center gap-2 mt-6"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                color: "var(--ink)",
                borderBottom: "1px solid var(--ink)",
                paddingBottom: 2,
              }}
            >
              <Mail size={13} strokeWidth={1.6} />
              {active.email}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lawyers;
