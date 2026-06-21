import { useLang } from "@/i18n/LanguageContext";
import { openChat } from "@/lib/site-utils";
import { MapPin, Phone, Clock, ArrowRight } from "lucide-react";

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
              <span className="slash-red mr-1">/</span>{t.contact.title}
            </h2>

            <div className="mt-7" style={{ borderTop: "1px solid var(--bone-edge)" }}>
              <div className="py-4 grid grid-cols-12 gap-3" style={{ borderBottom: "1px solid var(--bone-edge)" }}>
                <div className="col-span-1 pt-1">
                  <MapPin size={15} strokeWidth={1.6} style={{ color: "var(--accent)" }} />
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
                  <Clock size={15} strokeWidth={1.6} style={{ color: "var(--accent)" }} />
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
          <div className="col-span-12 lg:col-span-7 flex flex-col items-start justify-center">
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.4rem, 2.4vw, 2rem)",
                color: "var(--ink)",
                lineHeight: 1.4,
                maxWidth: "480px",
              }}
              data-testid="contact-chat-text"
            >
              Para contactarnos o reservar una reunión, por favor converse con nuestra asistente
            </p>
            <button
              type="button"
              onClick={openChat}
              data-testid="contact-chat-button"
              className="btn-primary mt-6"
            >
              <span>Conversar</span>
              <ArrowRight size={13} strokeWidth={1.7} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
