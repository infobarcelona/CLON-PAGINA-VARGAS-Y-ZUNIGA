import { useEffect, useState } from "react";
import { Menu, X, Search, Phone } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { useLang } from "@/i18n/LanguageContext";
import { scrollToId } from "@/lib/site-utils";

const Header = () => {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["estudio", "equipo", "areas", "experiencia", "noticias", "contacto"];
      let current = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#estudio", label: t.nav.studio, key: "estudio", id: "nav-link-studio" },
    { href: "#equipo", label: t.nav.team, key: "equipo", id: "nav-link-team" },
    { href: "#areas", label: t.nav.areas, key: "areas", id: "nav-link-areas" },
    { href: "#experiencia", label: t.nav.experience, key: "experiencia", id: "nav-link-experience" },
    { href: "#noticias", label: t.nav.news, key: "noticias", id: "nav-link-news" },
    { href: "#contacto", label: t.nav.contact, key: "contacto", id: "nav-link-contact" },
  ];

  const handleClick = (e, href) => {
    e.preventDefault();
    setOpen(false);
    if (href === "#top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    scrollToId(href);
  };

  return (
    <header data-testid="site-header" className="fixed top-0 left-0 right-0 z-40">
      {/* Top bar with phone + lang */}
      <div className="topbar">
        <div className="max-w-[1380px] mx-auto px-5 md:px-8 lg:px-12 py-2 flex items-center justify-between">
          <a
            href={`tel:${t.topbar.phone.replace(/\s/g, "")}`}
            data-testid="topbar-phone"
            className="inline-flex items-center gap-2 hover:text-[var(--brand-red)] transition-colors"
          >
            <Phone size={13} strokeWidth={1.6} />
            <span>{t.topbar.phone}</span>
          </a>
          <LanguageToggle />
        </div>
      </div>

      {/* Main nav */}
      <div className="header-shell">
        <div
          className="max-w-[1380px] mx-auto px-5 md:px-8 lg:px-12 flex items-center justify-between gap-6"
          style={{
            paddingTop: scrolled ? "0.7rem" : "1.2rem",
            paddingBottom: scrolled ? "0.7rem" : "1.2rem",
            transition: "padding 0.4s ease",
          }}
        >
          {/* Logo */}
          <a
            href="#top"
            onClick={(e) => handleClick(e, "#top")}
            data-testid="logo-link"
            className="flex items-center gap-2.5 flex-shrink-0 group"
          >
            <span
              className="font-pt"
              style={{
                color: "var(--brand-red)",
                fontSize: "32px",
                lineHeight: 1,
                fontWeight: 700,
                fontStyle: "italic",
              }}
            >
              /
            </span>
            <div className="leading-tight">
              <div
                className="font-pt"
                style={{
                  color: "var(--brand-black)",
                  fontSize: "20px",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                Vargas <span style={{ color: "var(--brand-red)" }}>y</span> Zúñiga
              </div>
              <div
                style={{
                  fontFamily: "'Nunito Sans', sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  color: "var(--brand-gray)",
                  textTransform: "uppercase",
                  marginTop: "3px",
                }}
              >
                Abogados · Temuco
              </div>
            </div>
          </a>

          {/* Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {links.map((l) => (
              <a
                key={l.id}
                href={l.href}
                onClick={(e) => handleClick(e, l.href)}
                data-testid={l.id}
                className={`nav-link ${active === l.key ? "active" : ""}`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button
              type="button"
              aria-label="Search"
              data-testid="search-btn"
              className="hidden md:inline-flex p-2 hover:text-[var(--brand-red)] transition-colors"
              style={{ color: "var(--brand-black)" }}
            >
              <Search size={18} strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => setOpen(!open)}
              data-testid="mobile-menu-toggle"
              className="lg:hidden p-2"
              style={{ color: "var(--brand-black)" }}
              aria-label="Menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          data-testid="mobile-menu"
          className="lg:hidden bg-white border-t"
          style={{ borderColor: "rgba(0,0,0,0.08)" }}
        >
          <div className="px-6 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.id}
                href={l.href}
                onClick={(e) => handleClick(e, l.href)}
                className="nav-link"
                style={{ fontSize: "18px" }}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
