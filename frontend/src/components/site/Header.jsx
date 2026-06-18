import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import LanguageToggle from "./LanguageToggle";
import { useLang } from "@/i18n/LanguageContext";

const Header = () => {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#estudio", label: t.nav.studio, id: "nav-link-studio" },
    { href: "#areas", label: t.nav.areas, id: "nav-link-areas" },
    { href: "#equipo", label: t.nav.team, id: "nav-link-team" },
    { href: "#contacto", label: t.nav.contact, id: "nav-link-contact" },
  ];

  const handleClick = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "glass-nav" : ""
      }`}
      style={{
        paddingTop: scrolled ? "0.6rem" : "1.5rem",
        paddingBottom: scrolled ? "0.6rem" : "1.5rem",
      }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#top"
          onClick={(e) => handleClick(e, "#top")}
          data-testid="logo-link"
          className="flex items-center gap-5 group"
        >
          <div
            className="w-[72px] h-[72px] flex items-center justify-center"
            style={{ background: "var(--brand-primary-deep)", color: "var(--brand-ivory)" }}
          >
            <span className="font-serif text-4xl leading-none italic">V</span>
            <span className="font-serif text-4xl leading-none italic opacity-70">z</span>
          </div>
          <div className="leading-tight">
            <div
              className="font-serif tracking-tight"
              style={{ color: "var(--brand-primary-deep)", fontSize: "34px", lineHeight: 1.05 }}
            >
              Vargas <span className="italic font-light opacity-80">&amp;</span> Zúñiga
            </div>
            <div
              className="font-mono uppercase tracking-[0.22em] mt-1"
              style={{ fontSize: "13px", color: "var(--brand-secondary)" }}
            >
              Abogados — Temuco
            </div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.id}
              href={l.href}
              onClick={(e) => handleClick(e, l.href)}
              data-testid={l.id}
              className="link-underline font-sans text-[13px] tracking-[0.04em]"
              style={{ color: "var(--brand-primary-deep)" }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setOpen(!open)}
            data-testid="mobile-menu-toggle"
            className="lg:hidden p-2"
            style={{ color: "var(--brand-primary-deep)" }}
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
          className="lg:hidden absolute top-full left-0 right-0 glass-nav border-t"
          style={{ borderColor: "rgba(92,92,92,0.1)" }}
        >
          <div className="px-6 py-8 flex flex-col gap-5">
            {links.map((l) => (
              <a
                key={l.id}
                href={l.href}
                onClick={(e) => handleClick(e, l.href)}
                className="font-serif text-2xl"
                style={{ color: "var(--brand-primary-deep)" }}
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
