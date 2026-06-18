import { useLang } from "@/i18n/LanguageContext";
import { useInView } from "@/hooks/useInView";

const Stats = () => {
  const { t } = useLang();
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      data-testid="stats-section"
      className="relative"
      style={{ background: "var(--brand-graphite)" }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-36">
        <h2
          className={`heading-section fade-up ${inView ? "in-view" : ""}`}
          style={{
            fontSize: "clamp(2.6rem, 6vw, 5.5rem)",
            color: "var(--brand-white)",
          }}
        >
          <span className="block">{t.stats.titleA}</span>
          <span className="block" style={{ color: "var(--brand-blue)" }}>
            {t.stats.titleB}
          </span>
        </h2>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
          {t.stats.items.map((s, i) => (
            <div
              key={i}
              data-testid={`stat-${i}`}
              className={`stat-tile fade-up ${inView ? "in-view" : ""}`}
              style={{ transitionDelay: `${0.1 + i * 0.06}s` }}
            >
              <div
                className="font-condensed"
                style={{
                  fontSize: "clamp(2.6rem, 5vw, 4.4rem)",
                  lineHeight: 1,
                  color: "var(--brand-white)",
                  fontWeight: 800,
                  marginBottom: "0.5rem",
                }}
              >
                {s.v}
              </div>
              <div
                style={{
                  fontFamily: "'Barlow', sans-serif",
                  fontSize: "13px",
                  textTransform: "uppercase",
                  letterSpacing: "0.04em",
                  color: "var(--brand-white)",
                  marginTop: "1.5rem",
                  maxWidth: "22ch",
                  lineHeight: 1.35,
                  fontWeight: 500,
                }}
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

export default Stats;
