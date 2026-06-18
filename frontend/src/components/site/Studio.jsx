import { useLang } from "@/i18n/LanguageContext";
import { useInView } from "@/hooks/useInView";

const Studio = () => {
  const { t } = useLang();
  const [ref, inView] = useInView();

  const handleCTA = (target) => {
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="estudio"
      ref={ref}
      data-testid="studio-section"
      className="relative"
      style={{ background: "var(--brand-white)" }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className={`overline fade-up ${inView ? "in-view" : ""}`}>{t.studio.overline}</div>
            <h2
              className={`heading-section mt-4 fade-up ${inView ? "in-view" : ""}`}
              style={{
                color: "var(--brand-black)",
                fontSize: "clamp(2.4rem, 5.5vw, 5rem)",
                transitionDelay: "0.05s",
              }}
            >
              <span className="block">{t.studio.titleA}</span>
              <span className="block" style={{ color: "var(--brand-blue)" }}>
                {t.studio.titleB}
              </span>
            </h2>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <p
              className={`fade-up ${inView ? "in-view" : ""}`}
              style={{
                color: "var(--brand-black)",
                fontSize: "18px",
                lineHeight: 1.55,
                fontWeight: 500,
                transitionDelay: "0.1s",
              }}
            >
              {t.studio.lead}
            </p>
            <p
              className={`mt-5 fade-up ${inView ? "in-view" : ""}`}
              style={{
                color: "var(--brand-graphite-light)",
                fontSize: "15.5px",
                lineHeight: 1.7,
                transitionDelay: "0.18s",
              }}
            >
              {t.studio.body}
            </p>
            <div className={`mt-7 fade-up ${inView ? "in-view" : ""}`} style={{ transitionDelay: "0.25s" }}>
              <button
                type="button"
                data-testid="studio-cta"
                onClick={() => handleCTA(t.studio.ctaTarget)}
                className="btn-blue"
              >
                {t.studio.cta}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Studio;
