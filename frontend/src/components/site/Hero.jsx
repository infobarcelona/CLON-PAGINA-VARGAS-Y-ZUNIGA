import { useLang } from "@/i18n/LanguageContext";
import { ArrowDownRight, ArrowRight } from "lucide-react";

const Hero = () => {
  const { t } = useLang();

  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative w-full min-h-screen overflow-hidden grain"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/10757816/pexels-photo-10757816.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1400&w=2000"
          alt="Cordillera de Los Andes — Araucanía"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Top hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "rgba(255,255,255,0.12)" }}
      />

      {/* Side mono labels */}
      <div
        className="hidden md:block absolute left-6 top-1/2 -translate-y-1/2 -rotate-90 origin-left font-mono uppercase"
        style={{ fontSize: "10px", letterSpacing: "0.42em", color: "rgba(255,255,255,0.5)" }}
      >
        Vargas &amp; Zúñiga · Est. 2005
      </div>
      <div
        className="hidden md:block absolute right-6 top-1/2 -translate-y-1/2 rotate-90 origin-right font-mono uppercase"
        style={{ fontSize: "10px", letterSpacing: "0.42em", color: "rgba(255,255,255,0.5)" }}
      >
        Temuco · La Araucanía · Chile
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 min-h-screen flex flex-col justify-between pt-40 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
          <div className="lg:col-span-9 lg:col-start-1">
            <div
              className="flex items-center gap-3 mb-8 fade-up in-view"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              <span
                className="inline-block w-12 h-px"
                style={{ background: "var(--brand-accent)" }}
              />
              <span
                className="font-mono uppercase"
                style={{ fontSize: "11px", letterSpacing: "0.3em" }}
              >
                {t.hero.overline}
              </span>
            </div>

            <h1
              className="heading-display word-rise"
              style={{
                color: "var(--brand-ivory)",
                fontSize: "clamp(3.2rem, 11vw, 11rem)",
              }}
              data-testid="hero-title"
            >
              <span>
                <span style={{ animationDelay: "0.15s" }}>{t.hero.titleA}</span>
              </span>
              <br />
              <span>
                <span
                  style={{
                    animationDelay: "0.45s",
                    fontStyle: "italic",
                    fontWeight: 300,
                    color: "var(--brand-accent-light)",
                  }}
                >
                  {t.hero.titleB}
                </span>
              </span>
            </h1>
          </div>

          <div className="lg:col-span-4 lg:col-start-8 lg:mt-auto lg:pb-2">
            <p
              className="font-sans fade-up in-view max-w-md"
              style={{
                color: "rgba(255,255,255,0.78)",
                fontSize: "16px",
                lineHeight: 1.7,
                fontWeight: 300,
                transitionDelay: "0.6s",
              }}
            >
              {t.hero.sub}
            </p>
            <div className="mt-8 flex flex-wrap gap-4 fade-up in-view" style={{ transitionDelay: "0.8s" }}>
              <button
                type="button"
                data-testid="hero-cta-primary"
                onClick={() => scrollTo("#areas")}
                className="btn-pill btn-pill-inverted"
              >
                <span>{t.hero.cta}</span>
                <ArrowRight size={14} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                data-testid="hero-cta-secondary"
                onClick={() => scrollTo("#contacto")}
                className="btn-pill"
                style={{ color: "rgba(255,255,255,0.9)", borderColor: "rgba(255,255,255,0.4)" }}
              >
                <span>{t.hero.ctaSecondary}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex items-end justify-between mt-16"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          <button
            type="button"
            onClick={() => scrollTo("#estudio")}
            data-testid="hero-scroll-cue"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <span
              className="font-mono uppercase"
              style={{ fontSize: "10px", letterSpacing: "0.32em" }}
            >
              {t.hero.scroll}
            </span>
            <span
              className="inline-block w-12 h-px transition-transform group-hover:scale-x-150 origin-left"
              style={{ background: "rgba(255,255,255,0.45)" }}
            />
            <ArrowDownRight size={14} strokeWidth={1.5} className="float-slow" />
          </button>
          <div
            className="hidden md:flex items-center gap-6 font-mono uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.28em" }}
          >
            <span>01 / Personas</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>02 / Litigios</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <span>03 / Estado</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
