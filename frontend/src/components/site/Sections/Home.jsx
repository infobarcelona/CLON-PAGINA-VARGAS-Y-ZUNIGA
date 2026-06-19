import { useLang } from "@/i18n/LanguageContext";
import { openChat } from "@/lib/site-utils";
import { ArrowRight, MessageSquare } from "lucide-react";

const Home = ({ onNavigate }) => {
  const { t } = useLang();
  return (
    <div className="section-content section-enter" data-testid="section-home">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="col-span-12 lg:col-span-8 stagger">
            <div className="eyebrow">{t.home.eyebrow}</div>
            <h1
              className="display-xl mt-6"
              style={{
                fontSize: "clamp(2.6rem, 7vw, 6.5rem)",
                fontWeight: 500,
              }}
              data-testid="home-title"
            >
              {t.brand.name.split(" & ")[0]}
              <span style={{ color: "var(--accent)", fontStyle: "italic", fontWeight: 400, margin: "0 0.18em" }}>
                &amp;
              </span>
              {t.brand.name.split(" & ")[1]}
            </h1>
            <div
              className="mt-6"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(1.2rem, 1.8vw, 1.65rem)",
                color: "var(--ink-soft)",
                letterSpacing: "0.02em",
              }}
              data-testid="home-slogan"
            >
              {t.slogan}
            </div>
            <p
              className="mt-7 max-w-2xl"
              style={{
                color: "var(--ink-mute)",
                fontSize: "15.5px",
                lineHeight: 1.7,
              }}
            >
              {t.home.lead}
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={openChat}
                data-testid="home-cta-chat"
                className="btn-primary"
              >
                <MessageSquare size={13} strokeWidth={1.7} />
                <span>{t.home.ctaChat}</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate("studio")}
                data-testid="home-cta-explore"
                className="btn-line"
              >
                <span>{t.home.ctaSections}</span>
                <ArrowRight size={13} strokeWidth={1.7} />
              </button>
            </div>
          </div>

          {/* Right ornament */}
          <div className="hidden lg:flex col-span-4 items-center justify-center">
            <div
              className="relative"
              style={{
                width: "100%",
                maxWidth: 320,
                aspectRatio: "3/4",
                background: "var(--ink)",
                color: "var(--bone)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 16,
                  border: "1px solid rgba(245,241,234,0.18)",
                  pointerEvents: "none",
                }}
              />
              <div className="text-center">
                <div
                  className="display"
                  style={{
                    fontSize: "5.2rem",
                    fontStyle: "italic",
                    color: "var(--bone)",
                    lineHeight: 1,
                    fontWeight: 400,
                  }}
                >
                  V<span style={{ color: "var(--accent-soft)" }}>&amp;</span>Z
                </div>
                <div
                  className="mt-6"
                  style={{
                    fontSize: "9.5px",
                    letterSpacing: "0.38em",
                    textTransform: "uppercase",
                    color: "rgba(245,241,234,0.7)",
                  }}
                >
                  Estudio jurídico
                </div>
                <div
                  className="mt-2"
                  style={{
                    fontSize: "9.5px",
                    letterSpacing: "0.38em",
                    textTransform: "uppercase",
                    color: "rgba(245,241,234,0.45)",
                  }}
                >
                  Est. Temuco
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
