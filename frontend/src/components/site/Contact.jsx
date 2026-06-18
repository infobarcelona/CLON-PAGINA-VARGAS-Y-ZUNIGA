import { useLang } from "@/i18n/LanguageContext";
import { useInView } from "@/hooks/useInView";
import { MapPin, Phone, Clock, MessageSquare } from "lucide-react";
import LanguageToggle from "./LanguageToggle";

const openChat = () => {
  const launcher = document.getElementById("vyz-widget-launcher");
  const panel = document.getElementById("vyz-widget-panel");
  if (panel && panel.classList.contains("vyz-open")) return;
  if (launcher) {
    launcher.click();
    return;
  }
  let attempts = 0;
  const tryOpen = () => {
    attempts += 1;
    const l = document.getElementById("vyz-widget-launcher");
    if (l) l.click();
    else if (attempts < 10) setTimeout(tryOpen, 300);
  };
  tryOpen();
};

const Contact = () => {
  const { t } = useLang();
  const [ref, inView] = useInView();
  const year = new Date().getFullYear();

  return (
    <>
      <section
        id="contacto"
        ref={ref}
        data-testid="contact-section"
        className="relative"
        style={{ background: "var(--brand-black)" }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: title + CTA */}
            <div className="lg:col-span-6">
              <div
                className={`overline mb-4 fade-up ${inView ? "in-view" : ""}`}
                style={{ color: "var(--brand-blue)" }}
              >
                {t.contact.overline}
              </div>
              <h2
                className={`heading-section fade-up ${inView ? "in-view" : ""}`}
                style={{
                  fontSize: "clamp(2.8rem, 7vw, 6rem)",
                  color: "var(--brand-white)",
                  transitionDelay: "0.05s",
                }}
              >
                <span className="block">{t.contact.titleA}</span>
                <span className="block" style={{ color: "var(--brand-blue)" }}>
                  {t.contact.titleB}
                </span>
              </h2>
              <p
                className={`mt-7 fade-up ${inView ? "in-view" : ""}`}
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "16.5px",
                  lineHeight: 1.65,
                  maxWidth: "32rem",
                  transitionDelay: "0.15s",
                }}
              >
                {t.contact.lead}
              </p>
              <button
                type="button"
                data-testid="contact-chat-cta"
                onClick={openChat}
                className={`mt-8 btn-blue fade-up ${inView ? "in-view" : ""}`}
                style={{ transitionDelay: "0.25s" }}
              >
                <MessageSquare size={14} strokeWidth={1.6} />
                <span>{t.contact.chatHint}</span>
              </button>
            </div>

            {/* Right: info */}
            <div className={`lg:col-span-5 lg:col-start-8 fade-up ${inView ? "in-view" : ""}`} style={{ transitionDelay: "0.3s" }}>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}>
                {/* Office */}
                <div
                  className="py-6 grid grid-cols-12 gap-4"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}
                >
                  <div className="col-span-1 pt-1">
                    <MapPin size={18} strokeWidth={1.4} style={{ color: "var(--brand-blue)" }} />
                  </div>
                  <div className="col-span-11">
                    <div className="overline" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {t.contact.officeLabel}
                    </div>
                    <div
                      className="mt-1"
                      style={{ fontSize: "17px", color: "var(--brand-white)", fontWeight: 500 }}
                    >
                      {t.contact.address}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.65)", fontSize: "14px", marginTop: "3px" }}>
                      {t.contact.tower}
                    </div>
                  </div>
                </div>
                {/* Phone */}
                <div
                  className="py-6 grid grid-cols-12 gap-4"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}
                >
                  <div className="col-span-1 pt-1">
                    <Phone size={18} strokeWidth={1.4} style={{ color: "var(--brand-blue)" }} />
                  </div>
                  <div className="col-span-11">
                    <div className="overline" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {t.contact.phoneLabel}
                    </div>
                    <a
                      href="tel:+56979873921"
                      data-testid="contact-phone"
                      className="link-underline"
                      style={{
                        display: "inline-block",
                        marginTop: "4px",
                        fontSize: "17px",
                        color: "var(--brand-white)",
                        fontWeight: 500,
                      }}
                    >
                      {t.contact.phone}
                    </a>
                  </div>
                </div>
                {/* Emails */}
                <div
                  className="py-6 grid grid-cols-12 gap-4"
                  style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}
                >
                  <div className="col-span-1 pt-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" style={{ color: "var(--brand-blue)" }}>
                      <rect x="3" y="5" width="18" height="14" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                  </div>
                  <div className="col-span-11">
                    <div className="overline" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {t.contact.emailLabel}
                    </div>
                    <div className="mt-1 flex flex-col gap-1">
                      <a
                        href="mailto:avargas@vargasyzuniga.cl"
                        data-testid="contact-email-1"
                        className="link-underline self-start"
                        style={{ fontSize: "15.5px", color: "var(--brand-white)" }}
                      >
                        avargas@vargasyzuniga.cl
                      </a>
                      <a
                        href="mailto:mzuniga@vargasyzuniga.cl"
                        data-testid="contact-email-2"
                        className="link-underline self-start"
                        style={{ fontSize: "15.5px", color: "var(--brand-white)" }}
                      >
                        mzuniga@vargasyzuniga.cl
                      </a>
                    </div>
                  </div>
                </div>
                {/* Hours */}
                <div className="py-6 grid grid-cols-12 gap-4">
                  <div className="col-span-1 pt-1">
                    <Clock size={18} strokeWidth={1.4} style={{ color: "var(--brand-blue)" }} />
                  </div>
                  <div className="col-span-11">
                    <div className="overline" style={{ color: "rgba(255,255,255,0.55)" }}>
                      {t.contact.hoursLabel}
                    </div>
                    <div className="mt-1" style={{ fontSize: "15.5px", color: "var(--brand-white)" }}>
                      {t.contact.hours}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        data-testid="site-footer"
        className="relative"
        style={{ background: "var(--brand-black)", borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span
              style={{
                color: "var(--brand-white)",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "26px",
                lineHeight: 1,
                fontWeight: 400,
              }}
            >
              /
            </span>
            <span
              className="italic"
              style={{
                color: "var(--brand-white)",
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: "22px",
                fontWeight: 500,
                letterSpacing: "-0.01em",
              }}
            >
              Vargas y Zúñiga
            </span>
            <span
              className="hidden md:inline ml-3"
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: "13px",
                fontStyle: "italic",
              }}
            >
              — {t.footer.tagline}
            </span>
          </div>

          <div className="flex items-center gap-6">
            <LanguageToggle variant="dark" />
            <button
              type="button"
              data-testid="back-to-top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="link-underline"
              style={{
                fontSize: "13px",
                color: "var(--brand-white)",
                fontWeight: 500,
              }}
            >
              {t.footer.backTop} ↑
            </button>
          </div>
        </div>
        <div
          className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-4"
          style={{
            borderTop: "1px solid rgba(255,255,255,0.08)",
            fontSize: "12px",
            color: "rgba(255,255,255,0.5)",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "0.75rem",
          }}
        >
          <span>{t.footer.copy.replace("{year}", year)}</span>
          <span>{t.footer.designedIn}</span>
        </div>
      </footer>
    </>
  );
};

export default Contact;
