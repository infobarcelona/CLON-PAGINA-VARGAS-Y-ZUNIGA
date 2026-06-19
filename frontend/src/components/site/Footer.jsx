import { useLang } from "@/i18n/LanguageContext";
import { buildQrUrl, scrollToId } from "@/lib/site-utils";
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

  const otherLinks = [
    t.footer.col2Item1 || "Pensamiento Jurídico",
    t.footer.col2Item2 || "Pro Bono",
    t.footer.col2Item3 || "Selección de talentos",
    t.footer.col2Item4 || "Canal de denuncias",
    t.footer.col2Item5 || "Política de privacidad",
  ];

  return (
    <footer data-testid="site-footer" className="site-footer">
      {/* Thick body */}
      <div className="container-x px-5 md:px-10 lg:px-14 pt-5 pb-3 grid grid-cols-12 gap-6 lg:gap-8">
        {/* Col 1: Brand + tagline + social */}
        <div className="col-span-12 md:col-span-3" data-testid="footer-brand-col">
          <div className="flex items-baseline gap-1">
            <span style={{ color: "var(--accent)", fontFamily: "'PT Sans', sans-serif", fontWeight: 700, fontSize: 22, fontStyle: "italic", lineHeight: 1 }}>
              /
            </span>
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
        <div className="col-span-6 md:col-span-3" data-testid="footer-nav-col">
          <div
            className="mb-2"
            style={{
              fontFamily: "'PT Sans', sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              color: "#fff",
            }}
          >
            <span className="slash-red mr-1">/</span>
            Vargas y Zúñiga
          </div>
          <ul className="space-y-1">
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
        <div className="col-span-6 md:col-span-3" data-testid="footer-other-col">
          <div
            className="mb-2"
            style={{
              fontFamily: "'PT Sans', sans-serif",
              fontWeight: 700,
              fontSize: "14px",
              color: "#fff",
            }}
          >
            <span className="slash-red mr-1">/</span>
            {t.footer.col2Title}
          </div>
          <ul className="space-y-1">
            {otherLinks.map((it, i) => (
              <li key={i}>
                <span
                  className="flex items-center gap-2"
                  style={{ fontSize: "13px", color: "rgba(255,255,255,0.78)" }}
                  data-testid={`footer-other-${i}`}
                >
                  <span style={{ color: "var(--accent)", fontSize: 9 }}>●</span>
                  <span>{it}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Address + QR */}
        <div className="col-span-12 md:col-span-3" data-testid="footer-address-col">
          <div className="flex items-start gap-3">
            <div
              className="flex-shrink-0"
              style={{
                width: 60,
                height: 60,
                background: "#fff",
                padding: 4,
                borderRadius: 8,
              }}
              data-testid="footer-qr"
            >
              <img
                src={buildQrUrl("https://vargasyzuniga.cl/", 140)}
                alt="QR"
                style={{ width: "100%", height: "100%", display: "block" }}
              />
            </div>
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
                <span className="slash-red mr-1">/</span>
                {t.footer.phoneLabel || "Tel:"}{" "}
                <a
                  href={`tel:${t.contact.phone.replace(/\s/g, "")}`}
                  style={{ color: "var(--accent)", fontWeight: 700 }}
                  data-testid="footer-phone"
                >
                  {t.contact.phone}
                </a>
              </div>
              <div style={{ fontSize: "12.5px" }}>
                <a
                  href="mailto:avargas@vargasyzuniga.cl"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                  data-testid="footer-email"
                >
                  avargas@vargasyzuniga.cl
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="container-x px-5 md:px-10 lg:px-14 py-2.5 flex flex-wrap items-center justify-between gap-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
      >
        <span
          style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          {t.footer.copy.replace("{year}", year)}
        </span>
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
          <span className="slash-red mr-2">/</span>
          {String(sectionIndex + 1).padStart(2, "0")} / {String(totalSections).padStart(2, "0")}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
