import { useState } from "react";
import { Menu, X } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { useLang } from "@/i18n/LanguageContext";
import { openChat } from "@/lib/site-utils";

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
    <header data-testid="site-header" className="flex-shrink-0">
      {/* Dark topbar */}
      <div className="topbar">
        <div className="container-x px-5 md:px-10 lg:px-14 py-2 flex items-center justify-between">
          <button
            type="button"
            onClick={openChat}
            data-testid="topbar-chat-link"
            className="inline-flex items-center gap-2 transition-colors"
            style={{ color: "rgba(255,255,255,0.92)", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}
          >
            <span style={{ fontSize: "12.5px", fontWeight: 500 }}>Converse con nuestra asistente</span>
          </button>
          <LanguageToggle />
        </div>
      </div>

      {/* White main nav */}
      <div className="main-nav">
        <div className="container-x px-5 md:px-10 lg:px-14 py-3 lg:py-4 flex items-center justify-between gap-6">
          {/* Wordmark logo */}
          <button
            type="button"
            onClick={() => go("home")}
            data-testid="logo-link"
            className="flex items-center gap-3 group flex-shrink-0"
          >
            <div className="leading-tight text-left">
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  color: "var(--ink)",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                Vargas <span style={{ color: "var(--accent-dark)" }}>&amp;</span> Zúñiga
              </div>
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "9.5px",
                  letterSpacing: "0.3em",
                  color: "var(--ink-faint)",
                  textTransform: "uppercase",
                  marginTop: "4px",
                  fontWeight: 700,
                }}
              >
                Abogados <span style={{ color: "var(--accent-dark)" }}>·</span> Temuco
              </div>
            </div>
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

          <div className="flex items-center gap-4">
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
            style={{ background: "var(--paper)", borderColor: "var(--cream-edge)" }}
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {sections.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => go(key)}
                  data-testid={`mobile-nav-link-${key}`}
                  className={`nav-link text-left ${sectionKey === key ? "active" : ""}`}
                  style={{ fontSize: "16px" }}
                >
                  {labels[key]}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
