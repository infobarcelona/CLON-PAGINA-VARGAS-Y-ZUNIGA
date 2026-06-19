import { useState } from "react";
import { Menu, X } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { useLang } from "@/i18n/LanguageContext";

const Header = ({ sectionKey, onNavigate, sections }) => {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  const labels = {
    home: t.nav.home,
    studio: t.nav.studio,
    clients: t.nav.clients,
    lawyers: t.nav.lawyers,
    areas: t.nav.areas,
    contact: t.nav.contact,
  };

  const go = (key) => {
    setOpen(false);
    onNavigate(key);
  };

  return (
    <header data-testid="site-header" className="glass-nav flex-shrink-0">
      <div className="container-x flex items-center justify-between gap-6 px-5 md:px-10 lg:px-14 py-4 lg:py-5">
        {/* Wordmark logo (no monogram) */}
        <button
          type="button"
          onClick={() => go("home")}
          data-testid="logo-link"
          className="flex flex-col items-start text-left group"
        >
          <span
            className="display"
            style={{
              fontSize: "clamp(20px, 1.6vw, 26px)",
              letterSpacing: "0.005em",
              fontWeight: 500,
              color: "var(--ink)",
            }}
          >
            {t.brand.name}
          </span>
          <span
            className="label"
            style={{ marginTop: "2px", fontSize: "9.5px", letterSpacing: "0.42em" }}
          >
            {t.brand.suffix} · Temuco
          </span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {sections.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => go(key)}
              data-testid={`nav-link-${key}`}
              className={`nav-link ${sectionKey === key ? "active" : ""}`}
            >
              {labels[key]}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            data-testid="mobile-menu-toggle"
            className="lg:hidden p-2"
            style={{ color: "var(--ink)" }}
            aria-label="Menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          data-testid="mobile-menu"
          className="lg:hidden border-t"
          style={{ background: "var(--bone)", borderColor: "var(--bone-edge)" }}
        >
          <div className="px-6 py-6 flex flex-col gap-3">
            {sections.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => go(key)}
                data-testid={`mobile-nav-link-${key}`}
                className={`nav-link text-left ${sectionKey === key ? "active" : ""}`}
                style={{ fontSize: "13.5px" }}
              >
                {labels[key]}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
