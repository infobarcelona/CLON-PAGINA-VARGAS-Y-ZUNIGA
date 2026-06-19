import { useLang } from "@/i18n/LanguageContext";
import { buildQrUrl } from "@/lib/site-utils";

const Footer = ({ sectionIndex, totalSections }) => {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer data-testid="site-footer" className="site-footer">
      <div className="container-x px-5 md:px-10 lg:px-14 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <div
            className="hidden md:flex items-center justify-center flex-shrink-0"
            style={{ width: 42, height: 42, background: "#fff", borderRadius: 8, padding: 3 }}
            aria-label="QR"
            data-testid="footer-qr"
          >
            <img
              src={buildQrUrl("https://vargasyzuniga.cl/", 96)}
              alt="QR"
              style={{ width: 36, height: 36, display: "block" }}
            />
          </div>

          <div className="flex flex-col min-w-0">
            <span
              style={{
                fontFamily: "'Nunito Sans', sans-serif",
                fontSize: "12px",
                color: "rgba(255,255,255,0.92)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontWeight: 600,
              }}
              data-testid="footer-address"
            >
              <span style={{ color: "var(--accent)", fontWeight: 700 }}>/</span> {t.footer.slim}
            </span>
            <span
              style={{
                fontSize: "11.5px",
                color: "rgba(255,255,255,0.65)",
                marginTop: "1px",
              }}
            >
              <a
                href={`tel:${t.contact.phone.replace(/\s/g, "")}`}
                style={{ color: "rgba(255,255,255,0.85)" }}
                data-testid="footer-phone"
              >
                {t.contact.phone}
              </a>
              {"  ·  "}
              <a
                href="mailto:avargas@vargasyzuniga.cl"
                style={{ color: "rgba(255,255,255,0.85)" }}
                data-testid="footer-email"
              >
                avargas@vargasyzuniga.cl
              </a>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-5">
          <span
            data-testid="footer-section-counter"
            style={{
              fontFamily: "'Nunito Sans', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.55)",
              fontVariantNumeric: "tabular-nums",
              fontWeight: 600,
            }}
          >
            {String(sectionIndex + 1).padStart(2, "0")} / {String(totalSections).padStart(2, "0")}
          </span>
          <span
            style={{
              fontSize: "11px",
              color: "rgba(255,255,255,0.5)",
            }}
          >
            {t.footer.copy.replace("{year}", year)}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
