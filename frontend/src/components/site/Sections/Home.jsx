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
            <div className="eyebrow flex items-center gap-2">
              <span className="slash-red">/</span>
              <span>{t.home.eyebrow}</span>
            </div>
            <h1
              className="display-xl mt-5"
              style={{ fontSize: "clamp(2.4rem, 6vw, 5.4rem)" }}
              data-testid="home-title"
            >
              {t.brand.name.split(" & ")[0]}
              <span style={{ color: "var(--accent)", margin: "0 0.15em", fontStyle: "italic", fontWeight: 700 }}>
                &amp;
              </span>
              {t.brand.name.split(" & ")[1]}
            </h1>
            <div
              className="mt-5"
              style={{
                fontFamily: "'PT Sans', sans-serif",
                fontStyle: "italic",
                fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)",
                color: "var(--accent)",
                fontWeight: 700,
              }}
              data-testid="home-slogan"
            >
              {t.slogan}
            </div>
            <p
              className="mt-6 max-w-2xl"
              style={{
                color: "var(--ink-mute)",
                fontSize: "15.5px",
                lineHeight: 1.7,
              }}
            >
              {t.home.lead}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={openChat}
                data-testid="home-cta-chat"
                className="btn-primary"
              >
                <MessageSquare size={14} strokeWidth={1.8} />
                <span>{t.home.ctaChat}</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate("studio")}
                data-testid="home-cta-explore"
                className="btn-line"
              >
                <span>{t.home.ctaSections}</span>
                <ArrowRight size={14} strokeWidth={1.8} />
              </button>
            </div>
          </div>

          {/* Right ornament — rounded card */}
          <div className="hidden lg:flex col-span-4 items-center justify-center">
            <div
              className="relative"
              style={{
                width: "100%",
                maxWidth: 320,
                aspectRatio: "3/4",
                background: "var(--ink)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 22,
                overflow: "hidden",
              }}
            >
              <div className="text-center">
                <div
                  style={{
                    fontFamily: "'PT Sans', sans-serif",
                    fontSize: "5.4rem",
                    fontStyle: "italic",
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  V<span style={{ color: "var(--accent)" }}>&amp;</span>Z
                </div>
                <div
                  className="mt-6"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.65)",
                    fontWeight: 700,
                  }}
                >
                  Estudio Jurídico
                </div>
                <div
                  className="mt-2"
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.45)",
                    fontWeight: 700,
                  }}
                >
                  Temuco · Chile
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
