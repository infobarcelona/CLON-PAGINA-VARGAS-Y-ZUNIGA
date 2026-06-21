import { useLang } from "@/i18n/LanguageContext";
import { Link } from "react-router-dom";
import { scrollToId, openChat } from "@/lib/site-utils";
import { Facebook, Linkedin, Instagram } from "lucide-react";

const Footer = ({ sectionIndex, totalSections, onNavigate }) => {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const navLinks = [
    { key: "studio", label: t.nav.studio },
    { key: "clients", label: t.nav.clients },
    { key: "lawyers", label: t.nav.lawyers },
    { key: "areas", label: t.nav.areas },
    { key: "contact", label: t.nav.contact },
  ];

  return (
    <footer data-testid="site-footer" className="site-footer">
      {/* Thick body */}
      <div className="container-x px-5 md:px-10 lg:px-14 pt-14 md:pt-16 pb-8 grid grid-cols-12 gap-8 lg:gap-10">
        {/* Col 1: Brand + tagline + social */}
        <div className="col-span-12 md:col-span-4" data-testid="footer-brand-col">
          <div className="flex items-baseline gap-1">
            <span
              style={{
                fontFamily: "'PT Sans', sans-serif",
                fontWeight: 700,
                fontSize: "16px",
                color: "#fff",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              Vargas <span style={{ color: "var(--accent)" }}>&amp;</span> Zúñiga
            </span>
          </div>
          <div
            className="mt-1"
            style={{
              fontSize: "10px",
              letterSpacing: "0.3em",
              color: "rgba(255,255,255,0.5)",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            Abogados · Temuco
          </div>
          <p
            className="mt-3 italic"
            style={{
              fontFamily: "'PT Sans', sans-serif",
              color: "rgba(255,255,255,0.7)",
              fontSize: "13px",
            }}
          >
            {t.slogan}
          </p>
          <div className="mt-3 flex items-center gap-2">
            <a
              href="#"
              data-testid="footer-social-fb"
              aria-label="Facebook"
              className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "rgba(255,255,255,0.08)", color: "#fff" }}
            >
              <Facebook size={12} strokeWidth={1.7} />
            </a>
            <a
              href="#"
              data-testid="footer-social-li"
              aria-label="LinkedIn"
              className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "rgba(255,255,255,0.08)", color: "#fff" }}
            >
              <Linkedin size={12} strokeWidth={1.7} />
            </a>
            <a
              href="#"
              data-testid="footer-social-ig"
              aria-label="Instagram"
              className="w-7 h-7 rounded-full flex items-center justify-center transition-colors"
              style={{ background: "rgba(255,255,255,0.08)", color: "#fff" }}
            >
              <Instagram size={12} strokeWidth={1.7} />
            </a>
          </div>
        </div>

        {/* Col 2: Nav */}
        <div className="col-span-12 md:col-span-4 md:text-center" data-testid="footer-nav-col">
          <div
            className="mb-2"
            style={{
              fontFamily: "'PT Sans', sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              color: "#fff",
            }}
          >
            Vargas y Zúñiga
          </div>
          <ul className="space-y-1 md:inline-flex md:flex-col md:mx-auto md:text-left">
            {navLinks.map((l) => (
              <li key={l.key}>
                <button
                  type="button"
                  onClick={() => onNavigate(l.key)}
                  data-testid={`footer-link-${l.key}`}
                  className="flex items-center gap-2 transition-colors"
                  style={{
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.78)",
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{ color: "var(--accent)", fontSize: 9 }}>●</span>
                  <span>{l.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Other content */}
        {/* Col 4: Address */}
        <div className="col-span-12 md:col-span-4 md:text-right" data-testid="footer-address-col">
          <div className="flex-1 min-w-0">
            <div
              style={{
                fontFamily: "'PT Sans', sans-serif",
                fontWeight: 700,
                fontSize: "15px",
                color: "#fff",
                lineHeight: 1.25,
              }}
              data-testid="footer-address"
            >
              Antonio Varas 687, of. 1010
            </div>
            <div
              style={{
                fontSize: "12.5px",
                color: "rgba(255,255,255,0.7)",
                marginTop: 2,
              }}
            >
              Torre Sinergia · Temuco — Chile
            </div>
            <div
              className="mt-1.5"
              style={{ fontSize: "12.5px", color: "rgba(255,255,255,0.7)" }}
            >
              <button
                type="button"
                onClick={openChat}
                data-testid="footer-chat-link"
                style={{
                  color: "var(--accent)",
                  fontWeight: 700,
                  background: "transparent",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  fontSize: "12.5px",
                }}
              >
                Converse con nuestra asistente
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="container-x px-5 md:px-10 lg:px-14 py-4 flex flex-wrap items-center justify-between gap-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="flex items-center gap-4">
          <span
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {t.footer.copy.replace("{year}", year)}
          </span>
          <Link
            to="/privacidad"
            data-testid="footer-bottom-privacy-link"
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.5)",
              textDecoration: "none",
            }}
          >
            Política de privacidad
          </Link>
        </div>
        <span
          data-testid="footer-section-counter"
          style={{
            fontFamily: "'Nunito Sans', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.55)",
            fontVariantNumeric: "tabular-nums",
            fontWeight: 700,
          }}
        >
          {String(sectionIndex + 1).padStart(2, "0")} / {String(totalSections).padStart(2, "0")}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
