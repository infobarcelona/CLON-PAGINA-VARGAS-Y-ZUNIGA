import { useLang } from "@/i18n/LanguageContext";
import { useInView } from "@/hooks/useInView";
import { ArrowRight } from "lucide-react";

const Recent = () => {
  const { t } = useLang();
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      data-testid="recent-section"
      className="section relative"
      style={{ background: "var(--brand-cream)" }}
    >
      <div className="max-w-[1380px] mx-auto px-5 md:px-8 lg:px-12">
        <h2
          className={`heading-section text-center fade-up ${inView ? "in-view" : ""}`}
          style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)" }}
        >
          <span className="slash-red mr-1">/</span>
          {t.recent.kicker}
        </h2>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {t.recent.items.map((it, i) => (
            <article
              key={i}
              data-testid={`recent-item-${i}`}
              className={`fade-up ${inView ? "in-view" : ""}`}
              style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className="overline" style={{ color: "var(--brand-gray)" }}>
                {it.date}
              </div>
              <h3
                className="mt-2"
                style={{
                  fontFamily: "'PT Sans', sans-serif",
                  fontSize: "clamp(1rem, 1.4vw, 1.2rem)",
                  fontWeight: 700,
                  color: "var(--brand-red)",
                  lineHeight: 1.3,
                }}
              >
                {it.title}
              </h3>
              <p
                className="mt-3"
                style={{ color: "var(--brand-gray)", fontSize: "14.5px", lineHeight: 1.65 }}
              >
                {it.excerpt}
              </p>
              <button type="button" className="ver-mas mt-3" data-testid={`recent-cta-${i}`}>
                Ver más <ArrowRight size={14} strokeWidth={2} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Recent;
