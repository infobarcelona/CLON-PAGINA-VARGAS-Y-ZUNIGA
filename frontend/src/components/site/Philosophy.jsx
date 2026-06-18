import { useLang } from "@/i18n/LanguageContext";
import { useInView } from "@/hooks/useInView";

const Philosophy = () => {
  const { t } = useLang();
  const [ref, inView] = useInView();

  const titleLines = t.philosophy.title.split("\n");

  return (
    <section
      id="estudio"
      data-testid="philosophy-section"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "var(--brand-ivory)" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-36 lg:py-44">
        {/* Watermark */}
        <div
          className="mark-watermark absolute pointer-events-none select-none"
          style={{
            fontSize: "clamp(12rem, 30vw, 28rem)",
            right: "-2rem",
            top: "-3rem",
            lineHeight: 1,
            zIndex: 0,
          }}
          aria-hidden="true"
        >
          V&amp;Z
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: image */}
          <div className="lg:col-span-5 lg:col-start-1">
            <div className={`portrait-frame relative ${inView ? "in-view fade-up" : "fade-up"}`}>
              <img
                src="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NjV8MHwxfHNlYXJjaHwxfHxzY2FsZXMlMjBvZiUyMGp1c3RpY2V8ZW58MHx8fHwxNzgxNzU2ODE1fDA&ixlib=rb-4.1.0&q=85"
                alt="Lady Justice"
                className="w-full h-[520px] md:h-[640px] object-cover"
              />
              <div
                className="absolute bottom-0 left-0 right-0 px-6 py-5"
                style={{
                  background: "linear-gradient(0deg, rgba(21,32,38,0.9), transparent)",
                  color: "var(--brand-ivory)",
                }}
              >
                <div
                  className="font-mono uppercase"
                  style={{ fontSize: "10px", letterSpacing: "0.3em", opacity: 0.7 }}
                >
                  Iustitia · Lex · Officium
                </div>
                <div className="font-serif italic text-xl mt-1" style={{ color: "var(--brand-accent-light)" }}>
                  Justicia, Ley y Deber.
                </div>
              </div>
            </div>
          </div>

          {/* Right: text */}
          <div className="lg:col-span-6 lg:col-start-7 flex flex-col">
            <div
              className={`overline section-accent fade-up ${inView ? "in-view" : ""}`}
              style={{ transitionDelay: "0.05s" }}
            >
              {t.philosophy.overline}
            </div>

            <h2
              className={`heading-section mt-6 fade-up ${inView ? "in-view" : ""}`}
              style={{
                transitionDelay: "0.15s",
                fontSize: "clamp(2.2rem, 5vw, 4rem)",
              }}
            >
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span style={{ fontStyle: "italic", color: "var(--brand-primary)" }}>{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h2>

            <p
              className={`mt-8 fade-up ${inView ? "in-view" : ""}`}
              style={{
                transitionDelay: "0.25s",
                color: "var(--brand-primary-deep)",
                fontSize: "20px",
                fontWeight: 300,
                lineHeight: 1.55,
                fontFamily: "Cormorant Garamond, serif",
              }}
            >
              {t.philosophy.lead}
            </p>

            <p
              className={`mt-6 fade-up ${inView ? "in-view" : ""}`}
              style={{
                transitionDelay: "0.35s",
                color: "var(--brand-secondary)",
                fontSize: "15px",
                lineHeight: 1.75,
                maxWidth: "44rem",
              }}
            >
              {t.philosophy.body}
            </p>

            {/* Pillars */}
            <div className={`mt-12 fade-up ${inView ? "in-view" : ""}`} style={{ transitionDelay: "0.45s" }}>
              <div className="overline mb-6" style={{ color: "var(--brand-secondary)" }}>
                {t.philosophy.pillarsTitle}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "var(--brand-border)" }}>
                {t.philosophy.pillars.map((p) => (
                  <div
                    key={p.num}
                    data-testid={`pillar-${p.num}`}
                    className="p-6 transition-colors"
                    style={{ background: "var(--brand-ivory)" }}
                  >
                    <div
                      className="font-mono"
                      style={{ fontSize: "11px", letterSpacing: "0.22em", color: "var(--brand-accent)" }}
                    >
                      {p.num}
                    </div>
                    <div
                      className="font-serif mt-2 mb-2"
                      style={{ fontSize: "26px", color: "var(--brand-primary-deep)" }}
                    >
                      {p.t}
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--brand-secondary)", lineHeight: 1.6 }}>
                      {p.d}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div
          className={`mt-20 lg:mt-28 grid grid-cols-3 fade-up ${inView ? "in-view" : ""}`}
          style={{ transitionDelay: "0.55s" }}
        >
          {t.philosophy.stats.map((s, i) => (
            <div
              key={s.l}
              className="py-8 flex flex-col items-center md:items-start text-center md:text-left"
              style={{
                borderTop: "1px solid var(--brand-border)",
                borderBottom: "1px solid var(--brand-border)",
                borderRight: i < 2 ? "1px solid var(--brand-border)" : "none",
                padding: "2.5rem 1.5rem",
              }}
              data-testid={`stat-${i}`}
            >
              <div
                className="font-serif"
                style={{
                  fontSize: "clamp(2.6rem, 6vw, 4.5rem)",
                  color: "var(--brand-primary)",
                  fontWeight: 500,
                  lineHeight: 1,
                }}
              >
                {s.v}
              </div>
              <div
                className="font-mono uppercase mt-3"
                style={{ fontSize: "10px", letterSpacing: "0.28em", color: "var(--brand-secondary)" }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
