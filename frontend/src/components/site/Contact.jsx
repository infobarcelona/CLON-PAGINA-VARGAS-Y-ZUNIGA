import { useLang } from "@/i18n/LanguageContext";
import { useInView } from "@/hooks/useInView";
import { MapPin, Phone, Clock, ArrowUpRight, MessageSquare } from "lucide-react";
import LanguageToggle from "./LanguageToggle";

const Contact = () => {
  const { t } = useLang();
  const [ref, inView] = useInView();
  const year = new Date().getFullYear();
  const titleLines = t.contact.title.split("\n");

  return (
    <section
      id="contacto"
      data-testid="contact-section"
      ref={ref}
      style={{ background: "var(--brand-primary-deep)", color: "var(--brand-ivory)" }}
      className="relative overflow-hidden"
    >
      {/* Background image faded */}
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1764410481612-7544525b2991?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxwcmVtaXVtJTIwb2ZmaWNlJTIwZGVza3xlbnwwfHx8fDE3ODE3NTY4MTV8MA&ixlib=rb-4.1.0&q=85"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7">
            <div
              className={`flex items-center gap-3 fade-up ${inView ? "in-view" : ""}`}
              style={{ color: "var(--brand-accent-light)" }}
            >
              <span
                className="inline-block w-12 h-px"
                style={{ background: "var(--brand-accent)" }}
              />
              <span className="font-mono uppercase" style={{ fontSize: "11px", letterSpacing: "0.3em" }}>
                {t.contact.overline}
              </span>
            </div>

            <h2
              className={`heading-section mt-6 fade-up ${inView ? "in-view" : ""}`}
              style={{
                color: "var(--brand-ivory)",
                fontSize: "clamp(2.6rem, 7vw, 5.5rem)",
                transitionDelay: "0.1s",
              }}
            >
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span style={{ fontStyle: "italic", color: "var(--brand-accent-light)" }}>
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h2>

            <p
              className={`mt-8 fade-up ${inView ? "in-view" : ""}`}
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "17px",
                lineHeight: 1.7,
                fontWeight: 300,
                maxWidth: "36rem",
                transitionDelay: "0.2s",
              }}
            >
              {t.contact.lead}
            </p>

            <button
              type="button"
              data-testid="contact-chat-cta"
              onClick={() => {
                const btn = document.querySelector("[data-testid='floating-chat-btn']");
                if (btn) btn.click();
              }}
              className={`mt-8 btn-pill btn-pill-inverted fade-up ${inView ? "in-view" : ""}`}
              style={{ transitionDelay: "0.3s" }}
            >
              <MessageSquare size={14} strokeWidth={1.5} />
              <span>{t.contact.chatHint}</span>
              <ArrowUpRight size={14} strokeWidth={1.5} />
            </button>
          </div>

          {/* Info cards */}
          <div className="lg:col-span-5 lg:col-start-8 lg:mt-2">
            <div
              className={`fade-up ${inView ? "in-view" : ""}`}
              style={{
                transitionDelay: "0.35s",
                borderTop: "1px solid rgba(255,255,255,0.15)",
              }}
            >
              {/* Address */}
              <div
                className="py-7 grid grid-cols-12 gap-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}
              >
                <div className="col-span-1 pt-1">
                  <MapPin size={18} strokeWidth={1.4} style={{ color: "var(--brand-accent-light)" }} />
                </div>
                <div className="col-span-11">
                  <div
                    className="font-mono uppercase"
                    style={{ fontSize: "10px", letterSpacing: "0.28em", color: "rgba(255,255,255,0.5)" }}
                  >
                    {t.contact.officeLabel}
                  </div>
                  <div
                    className="font-serif mt-2"
                    style={{ fontSize: "22px", color: "var(--brand-ivory)" }}
                  >
                    {t.contact.address}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "14px", marginTop: "4px" }}>
                    {t.contact.tower}
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div
                className="py-7 grid grid-cols-12 gap-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}
              >
                <div className="col-span-1 pt-1">
                  <Phone size={18} strokeWidth={1.4} style={{ color: "var(--brand-accent-light)" }} />
                </div>
                <div className="col-span-11">
                  <div
                    className="font-mono uppercase"
                    style={{ fontSize: "10px", letterSpacing: "0.28em", color: "rgba(255,255,255,0.5)" }}
                  >
                    {t.contact.phoneLabel}
                  </div>
                  <a
                    href="tel:+56979873921"
                    data-testid="contact-phone"
                    className="font-serif mt-2 block link-underline"
                    style={{ fontSize: "22px", color: "var(--brand-ivory)" }}
                  >
                    {t.contact.phone}
                  </a>
                </div>
              </div>

              {/* Emails */}
              <div
                className="py-7 grid grid-cols-12 gap-4"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.15)" }}
              >
                <div className="col-span-1 pt-1">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    style={{ color: "var(--brand-accent-light)" }}
                  >
                    <rect x="3" y="5" width="18" height="14" />
                    <path d="M3 7l9 6 9-6" />
                  </svg>
                </div>
                <div className="col-span-11">
                  <div
                    className="font-mono uppercase"
                    style={{ fontSize: "10px", letterSpacing: "0.28em", color: "rgba(255,255,255,0.5)" }}
                  >
                    {t.contact.emailLabel}
                  </div>
                  <div className="mt-2 flex flex-col gap-1">
                    <a
                      href="mailto:avargas@vargasyzuniga.cl"
                      data-testid="contact-email-1"
                      className="font-serif link-underline self-start"
                      style={{ fontSize: "18px", color: "var(--brand-ivory)" }}
                    >
                      avargas@vargasyzuniga.cl
                    </a>
                    <a
                      href="mailto:mzuniga@vargasyzuniga.cl"
                      data-testid="contact-email-2"
                      className="font-serif link-underline self-start"
                      style={{ fontSize: "18px", color: "var(--brand-ivory)" }}
                    >
                      mzuniga@vargasyzuniga.cl
                    </a>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="py-7 grid grid-cols-12 gap-4">
                <div className="col-span-1 pt-1">
                  <Clock size={18} strokeWidth={1.4} style={{ color: "var(--brand-accent-light)" }} />
                </div>
                <div className="col-span-11">
                  <div
                    className="font-mono uppercase"
                    style={{ fontSize: "10px", letterSpacing: "0.28em", color: "rgba(255,255,255,0.5)" }}
                  >
                    {t.contact.hoursLabel}
                  </div>
                  <div className="font-serif mt-2" style={{ fontSize: "18px", color: "var(--brand-ivory)" }}>
                    {t.contact.hours}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="mt-24 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ borderTop: "1px solid rgba(255,255,255,0.15)" }}
        >
          <div className="flex items-center gap-5">
            <div
              className="w-10 h-10 flex items-center justify-center"
              style={{ background: "var(--brand-accent)", color: "var(--brand-primary-deep)" }}
            >
              <span className="font-serif italic text-xl leading-none">V</span>
              <span className="font-serif italic text-xl leading-none opacity-80">z</span>
            </div>
            <div>
              <div className="font-serif italic" style={{ fontSize: "20px", color: "var(--brand-accent-light)" }}>
                {t.footer.tagline}
              </div>
              <div
                className="font-mono uppercase mt-1"
                style={{ fontSize: "10px", letterSpacing: "0.28em", color: "rgba(255,255,255,0.55)" }}
              >
                {t.footer.designedIn}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <LanguageToggle variant="dark" />
            <button
              type="button"
              data-testid="back-to-top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="link-underline font-mono uppercase"
              style={{ fontSize: "11px", letterSpacing: "0.28em", color: "var(--brand-ivory)" }}
            >
              {t.footer.backTop} ↑
            </button>
          </div>
        </div>

        <div
          className="mt-6 font-mono uppercase"
          style={{ fontSize: "10px", letterSpacing: "0.28em", color: "rgba(255,255,255,0.4)" }}
        >
          {t.footer.copy.replace("{year}", year)}
        </div>
      </div>
    </section>
  );
};

export default Contact;
