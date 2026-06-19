import { useLang } from "@/i18n/LanguageContext";
import { useInView } from "@/hooks/useInView";
import { ArrowRight } from "lucide-react";

const Experience = () => {
  const { t } = useLang();
  const [ref, inView] = useInView();

  return (
    <section
      id="experiencia"
      ref={ref}
      data-testid="experience-section"
      className="section relative"
      style={{ background: "var(--brand-cream-deep)" }}
    >
      <div className="max-w-[1380px] mx-auto px-5 md:px-8 lg:px-12">
        <h2
          className={`heading-section fade-up ${inView ? "in-view" : ""}`}
          style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)" }}
        >
          <span className="slash-red mr-1">/</span>
          {t.experience.kicker}
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {t.experience.items.map((it, i) => (
            <article
              key={i}
              data-testid={`experience-item-${i}`}
              className={`fade-up ${inView ? "in-view" : ""}`}
              style={{ transitionDelay: `${0.1 + i * 0.1}s` }}
            >
              <h3
                className="heading-sub"
                style={{ fontSize: "clamp(1.1rem, 1.5vw, 1.3rem)", lineHeight: 1.3 }}
              >
                {it.title}
              </h3>
              <p
                className="mt-3"
                style={{ color: "var(--brand-gray)", fontSize: "14.5px", lineHeight: 1.65 }}
              >
                {it.excerpt}
              </p>
              <button type="button" className="ver-mas mt-4" data-testid={`experience-cta-${i}`}>
                Ver más <ArrowRight size={14} strokeWidth={2} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
