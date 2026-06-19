import { useLang } from "@/i18n/LanguageContext";
import { buildQrUrl } from "@/lib/site-utils";

const Footer = ({ sectionIndex, totalSections }) => {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer data-testid="site-footer" className="site-footer">
      <div className="container-x px-5 md:px-10 lg:px-14 py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Small QR */}
          <div
            className="hidden md:flex items-center justify-center flex-shrink-0"
            style={{ width: 40, height: 40, background: "var(--bone)" }}
            aria-label="QR"
            data-testid="footer-qr"
          >
            <img
              src={buildQrUrl("https://vargasyzuniga.cl/", 96)}
              alt="QR"
              width="36"
              height="36"
              style={{ display: "block" }}
            />
          </div>

          <div className="flex flex-col min-w-0">
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.04em",
                color: "rgba(245,241,234,0.85)",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              data-testid="footer-address"
            >
              {t.footer.slim}
            </span>
            <span
              style={{
                fontSize: "10.5px",
                letterSpacing: "0.02em",
                color: "rgba(245,241,234,0.6)",
              }}
            >
              <a
                href={`tel:${t.contact.phone.replace(/\s/g, "")}`}
                style={{ color: "rgba(245,241,234,0.85)" }}
                data-testid="footer-phone"
              >
                {t.contact.phone}
              </a>
              {"  ·  "}
              <a
                href="mailto:avargas@vargasyzuniga.cl"
                style={{ color: "rgba(245,241,234,0.85)" }}
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
              fontFamily: "'Inter', sans-serif",
              fontSize: "10px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: "rgba(245,241,234,0.55)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            {String(sectionIndex + 1).padStart(2, "0")} / {String(totalSections).padStart(2, "0")}
          </span>
          <span
            style={{
              fontSize: "10.5px",
              letterSpacing: "0.02em",
              color: "rgba(245,241,234,0.5)",
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
