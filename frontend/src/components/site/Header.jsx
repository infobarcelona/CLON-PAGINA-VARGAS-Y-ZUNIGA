import { useEffect, useState } from "react";
import { Menu, X, Search } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { useLang } from "@/i18n/LanguageContext";

const Header = () => {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      // detect active section
      const sections = ["estudio", "areas", "equipo", "insights", "contacto"];
      let current = "home";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#top", label: t.nav.home, key: "home", id: "nav-link-home" },
    { href: "#equipo", label: t.nav.team, key: "equipo", id: "nav-link-team" },
    { href: "#areas", label: t.nav.areas, key: "areas", id: "nav-link-areas" },
    { href: "#insights", label: t.nav.insights, key: "insights", id: "nav-link-insights" },
    { href: "#estudio", label: t.nav.about, key: "estudio", id: "nav-link-about" },
    { href: "#contacto", label: t.nav.contact, key: "contacto", id: "nav-link-contact" },
  ];

  const handleClick = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 glass-nav`}
      style={{
        paddingTop: scrolled ? "0.55rem" : "1rem",
        paddingBottom: scrolled ? "0.55rem" : "1rem",
      }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-14 flex items-center justify-between gap-8">
        {/* Logo: /VyZ */}
        <a
          href="#top"
          onClick={(e) => handleClick(e, "#top")}
          data-testid="logo-link"
          className="flex items-center gap-1 group flex-shrink-0"
        >
          <span
            className="font-condensed"
            style={{
              color: "var(--brand-black)",
              fontSize: scrolled ? "32px" : "40px",
              lineHeight: 1,
              fontWeight: 400,
              transition: "font-size 0.4s ease",
            }}
          >
            /
          </span>
          <span
            className="font-condensed italic"
            style={{
              color: "var(--brand-black)",
              fontSize: scrolled ? "28px" : "34px",
              lineHeight: 1,
              fontWeight: 500,
              fontStyle: "italic",
              fontFamily: "'Barlow Condensed', sans-serif",
              transition: "font-size 0.4s ease",
              letterSpacing: "-0.01em",
            }}
          >
            Vargas y Zúñiga
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7 flex-1 justify-start ml-6">
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

        <div className="flex items-center gap-5">
          <button
            type="button"
            data-testid="search-btn"
            aria-label="Search"
            className="hidden md:inline-flex p-2"
            style={{ color: "var(--brand-black)" }}
            onClick={(e) => {
              e.preventDefault();
              // simple placeholder: scroll to top
            }}
          >
            <Search size={18} strokeWidth={1.4} />
          </button>
          <div className="hidden md:block">
            <LanguageToggle />
          </div>
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

      {/* Mobile menu */}
      {open && (
        <div
          data-testid="mobile-menu"
          className="lg:hidden absolute top-full left-0 right-0 bg-white border-t"
          style={{ borderColor: "rgba(0,0,0,0.08)" }}
        >
          <div className="px-6 py-8 flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.id}
                href={l.href}
                onClick={(e) => handleClick(e, l.href)}
                className="nav-link"
                style={{ fontSize: "20px" }}
              >
                {l.label}
              </a>
            ))}
            <div className="pt-3 border-t" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
              <LanguageToggle />
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
