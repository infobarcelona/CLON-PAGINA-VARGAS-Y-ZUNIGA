import { useLang } from "@/i18n/LanguageContext";
import { useInView } from "@/hooks/useInView";
import { MapPin, Phone, Clock, MessageSquare } from "lucide-react";
import { openChat, scrollToId } from "@/lib/site-utils";

const Contact = () => {
  const { t } = useLang();
  const [ref, inView] = useInView();
  const year = new Date().getFullYear();

  const social = ["Linkedin", "Spotify", "Facebook"];

  return (
    <>
      <section
        id="contacto"
        ref={ref}
        data-testid="contact-section"
        className="section relative"
        style={{ background: "var(--brand-cream-deep)" }}
      >
        <div className="max-w-[1380px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
            <div className="lg:col-span-5">
              <div className={`overline fade-up ${inView ? "in-view" : ""}`}>{t.contact.kicker}</div>
              <h2
                className={`heading-section mt-2 fade-up ${inView ? "in-view" : ""}`}
                style={{ fontSize: "clamp(2rem, 3.6vw, 3rem)", transitionDelay: "0.05s" }}
              >
                <span className="slash-red mr-1">/</span>
                {t.contact.title}
              </h2>
              <p
                className={`mt-5 fade-up ${inView ? "in-view" : ""}`}
                style={{
                  color: "var(--brand-gray)",
                  fontSize: "15.5px",
                  lineHeight: 1.65,
                  maxWidth: "36rem",
                  transitionDelay: "0.12s",
                }}
              >
                {t.contact.lead}
              </p>
              <button
                type="button"
                data-testid="contact-chat-cta"
                onClick={openChat}
                className={`btn-red mt-6 fade-up ${inView ? "in-view" : ""}`}
                style={{ transitionDelay: "0.2s" }}
              >
                <MessageSquare size={14} strokeWidth={1.7} />
                <span>{t.chatBand.cta}</span>
              </button>
            </div>

            <div className={`lg:col-span-6 lg:col-start-7 fade-up ${inView ? "in-view" : ""}`} style={{ transitionDelay: "0.25s" }}>
              <div style={{ borderTop: "1px solid var(--brand-line)" }}>
                {/* Office */}
                <div className="py-6 grid grid-cols-12 gap-4" style={{ borderBottom: "1px solid var(--brand-line)" }}>
                  <div className="col-span-1 pt-1">
                    <MapPin size={18} strokeWidth={1.6} style={{ color: "var(--brand-red)" }} />
                  </div>
                  <div className="col-span-11">
                    <div className="overline" style={{ color: "var(--brand-gray)" }}>{t.contact.officeLabel}</div>
                    <div className="font-pt mt-1" style={{ fontSize: "18px", fontWeight: 700, color: "var(--brand-black)" }}>
                      {t.contact.address}
                    </div>
                    <div style={{ color: "var(--brand-gray)", fontSize: "14px", marginTop: "3px" }}>
                      {t.contact.tower}
                    </div>
                  </div>
                </div>
                {/* Phone */}
                <div className="py-6 grid grid-cols-12 gap-4" style={{ borderBottom: "1px solid var(--brand-line)" }}>
                  <div className="col-span-1 pt-1">
                    <Phone size={18} strokeWidth={1.6} style={{ color: "var(--brand-red)" }} />
                  </div>
                  <div className="col-span-11">
                    <div className="overline" style={{ color: "var(--brand-gray)" }}>{t.contact.phoneLabel}</div>
                    <a
                      href={`tel:${t.contact.phone.replace(/\s/g, "")}`}
                      data-testid="contact-phone"
                      className="link-underline"
                      style={{
                        display: "inline-block",
                        marginTop: "4px",
                        fontSize: "18px",
                        fontWeight: 700,
                        fontFamily: "'PT Sans', sans-serif",
                        color: "var(--brand-black)",
                      }}
                    >
                      {t.contact.phone}
                    </a>
                  </div>
                </div>
                {/* Emails */}
                <div className="py-6 grid grid-cols-12 gap-4" style={{ borderBottom: "1px solid var(--brand-line)" }}>
                  <div className="col-span-1 pt-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ color: "var(--brand-red)" }}>
                      <rect x="3" y="5" width="18" height="14" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                  </div>
                  <div className="col-span-11">
                    <div className="overline" style={{ color: "var(--brand-gray)" }}>{t.contact.emailLabel}</div>
                    <div className="mt-1 flex flex-col gap-1">
                      <a
                        href="mailto:avargas@vargasyzuniga.cl"
                        data-testid="contact-email-1"
                        className="link-underline self-start"
                        style={{ fontSize: "15px", color: "var(--brand-black)" }}
                      >
                        avargas@vargasyzuniga.cl
                      </a>
                      <a
                        href="mailto:mzuniga@vargasyzuniga.cl"
                        data-testid="contact-email-2"
                        className="link-underline self-start"
                        style={{ fontSize: "15px", color: "var(--brand-black)" }}
                      >
                        mzuniga@vargasyzuniga.cl
                      </a>
                    </div>
                  </div>
                </div>
                {/* Hours */}
                <div className="py-6 grid grid-cols-12 gap-4">
                  <div className="col-span-1 pt-1">
                    <Clock size={18} strokeWidth={1.6} style={{ color: "var(--brand-red)" }} />
                  </div>
                  <div className="col-span-11">
                    <div className="overline" style={{ color: "var(--brand-gray)" }}>{t.contact.hoursLabel}</div>
                    <div className="mt-1" style={{ fontSize: "15px", color: "var(--brand-black)" }}>
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
        style={{ background: "var(--brand-black)", color: "var(--brand-white)" }}
      >
        <div className="max-w-[1380px] mx-auto px-5 md:px-8 lg:px-12 py-14 grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* logo + tagline */}
          <div className="md:col-span-3">
            <div className="flex items-center gap-2">
              <span style={{ color: "var(--brand-red)", fontSize: "28px", fontWeight: 700, fontFamily: "'PT Sans', sans-serif" }}>/</span>
              <div>
                <div
                  style={{
                    color: "var(--brand-white)",
                    fontFamily: "'PT Sans', sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Vargas <span style={{ color: "var(--brand-red)" }}>y</span> Zúñiga
                </div>
                <div
                  style={{
                    fontSize: "10px",
                    letterSpacing: "0.25em",
                    color: "rgba(255,255,255,0.55)",
                    textTransform: "uppercase",
                    marginTop: "2px",
                  }}
                >
                  Abogados
                </div>
              </div>
            </div>
            <p
              className="mt-4 italic"
              style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}
            >
              {t.footer.tagline}
            </p>
            <div className="mt-5 flex gap-3">
              {social.map((s) => (
                <span
                  key={s}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(255,255,255,0.08)", color: "var(--brand-white)", fontSize: "11px" }}
                >
                  {s[0]}
                </span>
              ))}
            </div>
          </div>

          {/* col1 */}
          <div className="md:col-span-3">
            <div
              className="font-pt mb-4"
              style={{ fontSize: "15px", fontWeight: 700, color: "var(--brand-white)" }}
            >
              {t.footer.col1Title}
            </div>
            <ul className="space-y-2.5">
              {t.footer.col1Items.map((it) => (
                <li key={it.label}>
                  <a
                    href={it.target}
                    data-testid={`footer-${it.target.replace("#", "")}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToId(it.target);
                    }}
                    className="flex items-center gap-2 transition-colors"
                    style={{ fontSize: "14px", color: "rgba(255,255,255,0.78)" }}
                  >
                    <span style={{ color: "var(--brand-red)" }}>•</span>
                    <span className="link-underline">{it.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* col2 */}
          <div className="md:col-span-3">
            <div
              className="font-pt mb-4"
              style={{ fontSize: "15px", fontWeight: 700, color: "var(--brand-white)" }}
            >
              {t.footer.col2Title}
            </div>
            <ul className="space-y-2.5">
              {t.footer.col2Items.map((it) => (
                <li key={it}>
                  <span
                    className="flex items-center gap-2"
                    style={{ fontSize: "14px", color: "rgba(255,255,255,0.78)" }}
                  >
                    <span style={{ color: "var(--brand-red)" }}>•</span>
                    <span>{it}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* col3 address */}
          <div className="md:col-span-3 md:text-right">
            <div
              className="font-pt"
              style={{
                fontSize: "18px",
                fontWeight: 700,
                color: "var(--brand-white)",
                lineHeight: 1.3,
              }}
            >
              {t.footer.address1}
            </div>
            <div
              className="font-pt"
              style={{
                fontSize: "16px",
                fontWeight: 400,
                color: "rgba(255,255,255,0.75)",
                marginTop: "4px",
              }}
            >
              {t.footer.address2}
            </div>
            <div className="mt-4" style={{ fontSize: "13px", color: "rgba(255,255,255,0.7)" }}>
              <span>{t.footer.phoneLabel} </span>
              <a
                href={`tel:${t.contact.phone.replace(/\s/g, "")}`}
                className="link-underline"
                style={{ color: "var(--brand-red)" }}
              >
                {t.contact.phone}
              </a>
            </div>
          </div>
        </div>
        <div
          className="max-w-[1380px] mx-auto px-5 md:px-8 lg:px-12 py-4"
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
          <button
            type="button"
            data-testid="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="link-underline"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            ↑ Top
          </button>
        </div>
      </footer>
    </>
  );
};

export default Contact;
