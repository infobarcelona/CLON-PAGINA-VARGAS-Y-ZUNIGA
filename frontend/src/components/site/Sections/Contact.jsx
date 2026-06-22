import { useLang } from "@/i18n/LanguageContext";
import { openChat } from "@/lib/site-utils";
import { MapPin, Phone, Clock, ArrowRight, MessageSquare } from "lucide-react";

const Contact = () => {
  const { t } = useLang();

  return (
    <div className="section-content section-enter" data-testid="section-contact">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 stagger">
          {/* Heading + info */}
          <div className="col-span-12 lg:col-span-5">
            <div className="eyebrow">05 · {t.nav.contact}</div>
            <h2
              className="display mt-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
              data-testid="contact-title"
            >
              {t.contact.title}
            </h2>

            <div className="mt-7" style={{ borderTop: "1px solid var(--bone-edge)" }}>
              <div className="py-4 grid grid-cols-12 gap-3" style={{ borderBottom: "1px solid var(--bone-edge)" }}>
                <div className="col-span-1 pt-1">
                  <MapPin size={15} strokeWidth={1.6} style={{ color: "var(--accent-dark)" }} />
                </div>
                <div className="col-span-11">
                  <div className="label">{t.contact.officeLabel}</div>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "18px",
                      color: "var(--ink)",
                      marginTop: 2,
                    }}
                  >
                    {t.contact.address}
                  </div>
                  <div style={{ color: "var(--ink-mute)", fontSize: "13px", marginTop: 2 }}>
                    {t.contact.tower}
                  </div>
                </div>
              </div>
              <div className="py-4 grid grid-cols-12 gap-3">
                <div className="col-span-1 pt-1">
                  <Clock size={15} strokeWidth={1.6} style={{ color: "var(--accent-dark)" }} />
                </div>
                <div className="col-span-11">
                  <div className="label">{t.contact.hoursLabel}</div>
                  <div style={{ fontSize: "13.5px", color: "var(--ink)", marginTop: 2 }}>
                    {t.contact.hours}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Chat CTA */}
          <div className="col-span-12 lg:col-span-7 flex flex-col items-center justify-center">
            <h3
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 700,
                fontSize: "58px",
                color: "var(--ink)",
                margin: "0 0 28px",
                textAlign: "center",
                letterSpacing: "0.01em",
                lineHeight: 1.1,
                whiteSpace: "nowrap",
              }}
              data-testid="contact-chat-wordmark"
            >
              VARGAS <span style={{ color: "var(--accent-dark)" }}>&amp;</span> ZÚÑIGA
            </h3>
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "13px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--ink-faint)",
                textAlign: "center",
                marginBottom: 16,
                marginTop: -8,
              }}
            >
              Abogados Ltda.
            </div>
            <div
              style={{
                background: "linear-gradient(135deg, #4984e0 0%, #24398c 55%, #101849 100%)",
                borderRadius: 16,
                padding: "40px 32px",
                textAlign: "center",
                width: "100%",
                maxWidth: 480,
              }}
            >
              <h3
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "clamp(1.3rem, 2vw, 1.5rem)",
                  fontWeight: 600,
                  color: "#ffffff",
                  margin: "0 0 14px",
                }}
                data-testid="contact-chat-title"
              >
                AGENDA TU HORA — CUÉNTANOS TU CASO
              </h3>
              <p
                style={{
                  fontSize: "14.5px",
                  color: "rgba(255,255,255,0.92)",
                  lineHeight: 1.6,
                  margin: "0 0 26px",
                }}
                data-testid="contact-chat-text"
              >
                Para contactarnos o reservar una reunión, por favor converse con nuestra asistente
              </p>
              <button
                type="button"
                onClick={openChat}
                data-testid="contact-chat-button"
                style={{
                  background: "#ffffff",
                  color: "var(--accent-dark)",
                  border: "none",
                  padding: "14px 30px",
                  borderRadius: 10,
                  fontSize: "13.5px",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.25), 0 0 0 1px rgba(255,255,255,0.1)",
                }}
              >
                <MessageSquare size={16} strokeWidth={1.9} />
                <span>Conversar con la asistente</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
