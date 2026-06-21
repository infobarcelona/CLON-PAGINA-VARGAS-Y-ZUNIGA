import { useLang } from "@/i18n/LanguageContext";
import { openChat } from "@/lib/site-utils";
import { ArrowRight, MessageSquare } from "lucide-react";

const Home = ({ onNavigate }) => {
  const { t } = useLang();
  return (
    <div className="section-content section-enter" data-testid="section-home">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="col-span-12 stagger">
            <div className="eyebrow flex items-center gap-2">
              <span>
                {t.home.eyebrow.split(" · ").map((part, i, arr) => (
                  <span key={i}>
                    {part}
                    {i < arr.length - 1 && <span className="dot-red">·</span>}
                  </span>
                ))}
              </span>
            </div>
            <h1
              className="display-xl mt-5"
              style={{ fontSize: "clamp(2.4rem, 6vw, 5.4rem)" }}
              data-testid="home-title"
            >
              {t.brand.name.split(" & ")[0]}
              <span style={{ color: "var(--accent-dark)", margin: "0 0.15em", fontStyle: "italic", fontWeight: 700 }}>
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
                color: "var(--accent-dark)",
                fontWeight: 700,
              }}
              data-testid="home-slogan"
            >
              {t.slogan.split(" · ").map((part, i, arr) => (
                <span key={i}>
                  <span style={{ color: "var(--ink)" }}>{part}</span>
                  {i < arr.length - 1 && <span style={{ color: "var(--accent-dark)", margin: "0 0.4em" }}>·</span>}
                </span>
              ))}
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

        </div>
      </div>
    </div>
  );
};

export default Home;
