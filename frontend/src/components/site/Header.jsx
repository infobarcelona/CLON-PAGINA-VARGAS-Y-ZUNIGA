import { useState } from "react";
import { Menu, X } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { Link } from "react-router-dom";
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
            {/* Desktop */}
            <span className="hidden lg:inline" style={{ fontSize: "12.5px", fontWeight: 500 }}>Converse con nuestra asistente</span>
            {/* Móvil: chip ✦ IA · Renata */}
            <span className="lg:hidden" style={{ background: "transparent", border: "1px solid rgba(91,167,229,0.5)", borderRadius: 20, padding: "4px 10px", display: "inline-flex", alignItems: "center", gap: 5 }}>
              <span style={{ fontSize: "11px", color: "#5ba7e5", fontWeight: 800 }}>✦</span>
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.85)", fontWeight: 600, letterSpacing: "0.05em" }}>IA · Renata</span>
            </span>
          </button>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <div className="flex items-center gap-3">
              {/* Desktop: solo chip Abogados */}
              {/* Móvil: chip con candado "Abogados" */}
              <Link
                to="/portal"
                data-testid="topbar-portal-link-mobile"
                className="lg:hidden"
                style={{
                  textDecoration: "none", background: "transparent",
                  border: "1px solid rgba(255,255,255,0.25)", borderRadius: 20,
                  padding: "4px 10px", display: "inline-flex", alignItems: "center", gap: 5,
                }}
              >
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2.5" strokeLinecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Abogados</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* White main nav */}
      <div className="main-nav">
        <div className="container-x px-5 md:px-10 lg:px-14 py-3 lg:py-4 flex items-center justify-between gap-6" style={{ position: "relative" }}>
          {/* Wordmark logo — centrado absoluto en móvil, izquierda en desktop */}
          <button
            type="button"
            onClick={() => go("home")}
            data-testid="logo-link"
            className="lg:flex-none"
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
          >
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontWeight: 600,
                fontSize: "20px",
                color: "var(--ink)",
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                lineHeight: 1,
                whiteSpace: "nowrap",
              }}
            >
              Vargas <span style={{ color: "var(--accent-dark)" }}>&amp;</span> Zúñiga
            </div>
          </button>
          {/* Spacer para desktop */}
          <div className="hidden lg:block" style={{ fontFamily: "'Cinzel', serif", fontSize: "20px", opacity: 0, pointerEvents: "none" }}>Vargas &amp; Zúñiga</div>

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
