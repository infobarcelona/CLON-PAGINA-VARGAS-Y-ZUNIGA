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
            <span style={{ fontSize: "11px", fontWeight: 500, lineHeight: 1.3 }}>Converse con<br/>nuestra asistente</span>
          </button>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <div className="flex items-center gap-3">
              <span
                style={{
                  fontSize: "12.5px",
                  color: "var(--accent)",
                  fontWeight: 600,
                }}
              >
                Acceso Abogados
              </span>
              <Link
                to="/portal"
                data-testid="topbar-portal-link"
                style={{
                  fontSize: "12.5px",
                  fontWeight: 700,
                  color: "#ffffff",
                  textDecoration: "none",
                  background: "linear-gradient(135deg, #4984e0 0%, #1746a0 100%)",
                  padding: "6px 16px",
                  borderRadius: 8,
                  letterSpacing: "0.02em",
                  boxShadow: "0 2px 8px rgba(23,70,160,0.35)",
                }}
              >
                Ingresar
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
            style={{
            style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
              background: "none", border: "none", cursor: "pointer", padding: 0,
            }}
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
