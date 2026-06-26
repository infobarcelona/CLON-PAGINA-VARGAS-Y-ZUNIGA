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
          <div className="block lg:hidden col-span-12 flex justify-center" style={{ order: -1, marginTop: "2px", marginBottom: "8px" }}>
            <style>{`
              @keyframes respirar-sutil {
                0%   { box-shadow: 0 0 0px 0px rgba(73,132,224,0); border-color: rgba(73,132,224,0.15); }
                50%  { box-shadow: 0 0 12px 5px rgba(73,132,224,0.28), 0 0 22px 10px rgba(23,70,160,0.1); border-color: rgba(122,184,245,0.6); }
                100% { box-shadow: 0 0 0px 0px rgba(73,132,224,0); border-color: rgba(73,132,224,0.15); }
              }
              @keyframes luz-sutil {
                0%,30%  { opacity: 0; }
                50%     { opacity: 1; }
                70%,100%{ opacity: 0; }
              }
              .renata-marco { position:absolute; inset:0; border-radius:16px; pointer-events:none; z-index:3; border:1px solid rgba(73,132,224,0.15); animation: respirar-sutil 5s ease-in-out infinite; }
              .renata-luz { position:absolute; border-radius:50%; pointer-events:none; z-index:4; animation: luz-sutil 5s ease-in-out infinite; }
            `}</style>
            <div
              onClick={openChat}
              style={{
                width: "92%", maxWidth: 400, borderRadius: 16,
                boxShadow: "0 6px 24px rgba(0,0,0,0.12)", cursor: "pointer",
                position: "relative",
              }}
            >
              <div className="renata-marco" />
              <div className="renata-luz" style={{width:"2px",height:"2px",background:"#e0f4ff",boxShadow:"0 0 2px 1px rgba(224,244,255,0.95)",top:"-1px",left:"18%",animationDelay:"0s"}} />
              <div className="renata-luz" style={{width:"2px",height:"2px",background:"#7ab8f5",boxShadow:"0 0 2px 1px rgba(122,184,245,0.9)",top:"-1px",left:"45%",animationDelay:"0.05s"}} />
              <div className="renata-luz" style={{width:"2px",height:"2px",background:"#fff",boxShadow:"0 0 3px 1px rgba(255,255,255,0.85)",top:"-1px",left:"70%",animationDelay:"0.03s"}} />
              <div className="renata-luz" style={{width:"2px",height:"2px",background:"#a0d4ff",boxShadow:"0 0 2px 1px rgba(160,212,255,0.9)",top:"-1px",left:"88%",animationDelay:"0.07s"}} />
              <div className="renata-luz" style={{width:"2px",height:"2px",background:"#c0e4ff",boxShadow:"0 0 2px 1px rgba(192,228,255,0.9)",top:"20%",right:"-1px",animationDelay:"0.04s"}} />
              <div className="renata-luz" style={{width:"2px",height:"2px",background:"#fff",boxShadow:"0 0 2px 1px rgba(255,255,255,0.85)",top:"48%",right:"-1px",animationDelay:"0.02s"}} />
              <div className="renata-luz" style={{width:"2px",height:"2px",background:"#7ab8f5",boxShadow:"0 0 2px 1px rgba(122,184,245,0.9)",top:"75%",right:"-1px",animationDelay:"0.06s"}} />
              <div className="renata-luz" style={{width:"2px",height:"2px",background:"#7ab8f5",boxShadow:"0 0 2px 1px rgba(122,184,245,0.9)",bottom:"-1px",left:"15%",animationDelay:"0.03s"}} />
              <div className="renata-luz" style={{width:"2px",height:"2px",background:"#e0f4ff",boxShadow:"0 0 3px 1px rgba(224,244,255,0.9)",bottom:"-1px",left:"40%",animationDelay:"0.06s"}} />
              <div className="renata-luz" style={{width:"2px",height:"2px",background:"#fff",boxShadow:"0 0 2px 1px rgba(255,255,255,0.85)",bottom:"-1px",left:"65%",animationDelay:"0.01s"}} />
              <div className="renata-luz" style={{width:"2px",height:"2px",background:"#5ba7e5",boxShadow:"0 0 2px 1px rgba(91,167,229,0.9)",bottom:"-1px",left:"85%",animationDelay:"0.08s"}} />
              <div className="renata-luz" style={{width:"2px",height:"2px",background:"#c0e4ff",boxShadow:"0 0 2px 1px rgba(192,228,255,0.9)",top:"18%",left:"-1px",animationDelay:"0.05s"}} />
              <div className="renata-luz" style={{width:"2px",height:"2px",background:"#fff",boxShadow:"0 0 2px 1px rgba(255,255,255,0.85)",top:"45%",left:"-1px",animationDelay:"0.02s"}} />
              <div className="renata-luz" style={{width:"2px",height:"2px",background:"#a0d4ff",boxShadow:"0 0 2px 1px rgba(160,212,255,0.9)",top:"72%",left:"-1px",animationDelay:"0.07s"}} />
              <div style={{ width: "100%", aspectRatio: "4/4.5", overflow: "hidden", borderRadius: "22px 22px 0 0" }}>
                <img
                  src="/images/team/renata-hero.jpg"
                  alt="Renata, asistente virtual"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{
                background: "linear-gradient(135deg, #4984e0 0%, var(--accent-dark) 50%, #101849 100%)",
                padding: "20px 18px", textAlign: "center", borderRadius: "0 0 16px 16px",
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
              className="w-full"
              onClick={openChat}
              style={{
                maxWidth: 420,
                marginLeft: "60px",
                borderRadius: 22,
                boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
                cursor: "pointer",
                position: "relative",
              }}
              data-testid="home-renata-card"
            >
              <div style={{position:"absolute",inset:0,borderRadius:22,pointerEvents:"none",zIndex:3,border:"1px solid rgba(73,132,224,0.15)",animation:"respirar-sutil 5s ease-in-out infinite"}} />
              <div style={{position:"absolute",borderRadius:"50%",pointerEvents:"none",zIndex:4,width:"2px",height:"2px",background:"#e0f4ff",boxShadow:"0 0 2px 1px rgba(224,244,255,0.95)",top:"-1px",left:"18%",animation:"luz-sutil 5s ease-in-out infinite"}} />
              <div style={{position:"absolute",borderRadius:"50%",pointerEvents:"none",zIndex:4,width:"2px",height:"2px",background:"#7ab8f5",boxShadow:"0 0 2px 1px rgba(122,184,245,0.9)",top:"-1px",left:"55%",animation:"luz-sutil 5s ease-in-out infinite 0.04s"}} />
              <div style={{position:"absolute",borderRadius:"50%",pointerEvents:"none",zIndex:4,width:"2px",height:"2px",background:"#fff",boxShadow:"0 0 2px 1px rgba(255,255,255,0.85)",top:"35%",right:"-1px",animation:"luz-sutil 5s ease-in-out infinite 0.02s"}} />
              <div style={{position:"absolute",borderRadius:"50%",pointerEvents:"none",zIndex:4,width:"2px",height:"2px",background:"#a0d4ff",boxShadow:"0 0 2px 1px rgba(160,212,255,0.9)",bottom:"-1px",left:"40%",animation:"luz-sutil 5s ease-in-out infinite 0.06s"}} />
              <div style={{position:"absolute",borderRadius:"50%",pointerEvents:"none",zIndex:4,width:"2px",height:"2px",background:"#c0e4ff",boxShadow:"0 0 2px 1px rgba(192,228,255,0.9)",top:"60%",left:"-1px",animation:"luz-sutil 5s ease-in-out infinite 0.03s"}} />
              <div style={{ width: "100%", aspectRatio: "4/4.5", overflow: "hidden", borderRadius: "22px 22px 0 0" }}>
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
                  borderRadius: "0 0 22px 22px",
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
