import { useLang } from "@/i18n/LanguageContext";
import { openChat } from "@/lib/site-utils";
import { ArrowRight, MessageSquare } from "lucide-react";
import CerebroNeural from "@/components/site/CerebroNeural";

const Home = ({ onNavigate }) => {
  const { t } = useLang();
  return (
    <div className="section-content section-enter" data-testid="section-home">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="col-span-12 lg:col-span-7 stagger">

            <h1
              className="display-xl mt-5"
              style={{ fontSize: "clamp(1.8rem, 4.5vw, 4rem)", textAlign: "center" }}
              data-testid="home-title"
            >
              {t.brand.name.split(" & ")[0]}
              <span style={{ color: "var(--accent-dark)", margin: "0 0.15em", fontStyle: "italic", fontWeight: 700 }}>
                &amp;
              </span>
              {t.brand.name.split(" & ")[1]}
            </h1>
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
                marginTop: "6px",
                fontWeight: 600,
                textAlign: "center",
              }}
            >
              Abogados Ltda.
            </div>
            <div
              className="mt-5"
              style={{
                fontFamily: "'PT Sans', sans-serif",
                fontStyle: "italic",
                fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)",
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
                onClick={() => onNavigate("studio")}
                data-testid="home-cta-explore"
                className="btn-line"
              >
                <span>{t.home.ctaSections}</span>
                <ArrowRight size={14} strokeWidth={1.8} />
              </button>
            </div>
          </div>

          {/* Foto de Renata en móvil — aparece ANTES del título */}
          <div className="block lg:hidden col-span-12 flex justify-center" style={{ order: -1, marginTop: "-8px", marginBottom: "8px" }}>
            <style>{`
              @keyframes renata-halo {
                0%   { transform: scale(0.88); opacity: 0.5; }
                70%  { transform: scale(1.06); opacity: 0; }
                100% { transform: scale(1.06); opacity: 0; }
              }
              .renata-halo::after {
                content: ''; position: absolute; inset: -6px;
                border-radius: 20px;
                background: #1746a0; opacity: 0.4; z-index: 0;
                animation: renata-halo 2.4s ease-out infinite;
              }
              .renata-halo-ring {
                position: absolute; inset: -3px; border-radius: 19px;
                border: 1px solid rgba(91,167,229,0.5);
                animation: renata-halo 2.4s ease-out infinite 0.4s;
                z-index: 0; pointer-events: none;
              }
            `}</style>
            <div
              onClick={openChat}
              className="renata-halo"
              style={{
                width: "92%", maxWidth: 400, borderRadius: 16, overflow: "hidden",
                boxShadow: "0 6px 24px rgba(0,0,0,0.12)", cursor: "pointer",
                position: "relative",
              }}
            >
              <div className="renata-halo-ring" />
              <div style={{ width: "100%", aspectRatio: "4/4.5", overflow: "hidden" }}>
                <img
                  src="/images/team/renata-hero.jpg"
                  alt="Renata, asistente virtual"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{
                background: "linear-gradient(135deg, #4984e0 0%, var(--accent-dark) 50%, #101849 100%)",
                padding: "20px 18px", textAlign: "center",
              }}>
                <div style={{ fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "rgba(255,255,255,0.75)", fontWeight: 700, marginBottom: 8 }}>
                  Disponible 24/7
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
                  <CerebroNeural width={80} height={69} />
                </div>
                <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: "20px", fontWeight: 600, color: "#fff", margin: "0 0 8px" }}>
                  Contacta a Renata
                </h4>
                <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.92)", lineHeight: 1.55, margin: 0 }}>
                  Nuestra asistente con inteligencia artificial. Pregúntale lo que necesites sobre el estudio, honorarios o cómo agendar tu reunión.
                </p>
              </div>
            </div>
          </div>

          {/* Foto de Renata en desktop — se mantiene igual */}
          <div className="hidden lg:flex col-span-5 items-center justify-center">
            <div
              className="w-full renata-halo"
              onClick={openChat}
              style={{
                maxWidth: 420,
                marginLeft: "60px",
                borderRadius: 22,
                overflow: "hidden",
                boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
                cursor: "pointer",
                position: "relative",
              }}
              data-testid="home-renata-card"
            >
              <div className="renata-halo-ring" style={{ borderRadius: 25 }} />
              <div style={{ width: "100%", aspectRatio: "4/4.5", overflow: "hidden" }}>
                <img
                  src="/images/team/renata-hero.jpg"
                  alt="Renata, asistente virtual"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div
                style={{
                  background: "linear-gradient(135deg, #4984e0 0%, var(--accent-dark) 50%, #101849 100%)",
                  padding: "26px 22px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.75)",
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  Disponible 24/7
                </div>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
                  <CerebroNeural width={100} height={86} />
                </div>
                <h4
                  style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#fff",
                    margin: "0 0 10px",
                  }}
                >
                  Contacta a Renata
                </h4>
                <p
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.92)",
                    lineHeight: 1.55,
                    margin: "0 0 18px",
                  }}
                >
                  Nuestra asistente con inteligencia artificial. Pregúntale lo que necesites
                  saber del estudio: experiencia, áreas de práctica,
                  honorarios o cómo agendar tu reunión.
                </p>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
