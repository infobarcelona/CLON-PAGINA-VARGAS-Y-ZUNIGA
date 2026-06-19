import { useLang } from "@/i18n/LanguageContext";
import { useInView } from "@/hooks/useInView";
import { scrollToId } from "@/lib/site-utils";
import { ArrowRight } from "lucide-react";

const Studio = () => {
  const { t } = useLang();
  const [ref, inView] = useInView();

  return (
    <section
      id="estudio"
      ref={ref}
      data-testid="studio-section"
      className="relative"
      style={{ background: "var(--brand-black)", color: "var(--brand-white)" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left dark */}
        <div className="px-5 md:px-8 lg:px-12 xl:pl-20 py-16 lg:py-24 max-w-[760px] lg:ml-auto lg:mr-0 w-full">
          <div
            className={`overline mb-3 fade-up ${inView ? "in-view" : ""}`}
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {t.studio.kicker}
          </div>
          <h2
            className={`heading-section fade-up ${inView ? "in-view" : ""}`}
            style={{
              color: "var(--brand-white)",
              fontSize: "clamp(2rem, 3.8vw, 3rem)",
              transitionDelay: "0.05s",
            }}
          >
            <span className="slash-red mr-1">/</span>
            {t.studio.title}
          </h2>
          <p
            className={`mt-5 fade-up ${inView ? "in-view" : ""}`}
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "15.5px",
              lineHeight: 1.7,
              transitionDelay: "0.12s",
            }}
          >
            {t.studio.body}
          </p>
          <div className={`mt-7 fade-up ${inView ? "in-view" : ""}`} style={{ transitionDelay: "0.2s" }}>
            <button
              type="button"
              data-testid="studio-cta"
              onClick={() => scrollToId(t.studio.ctaTarget)}
              className="ver-mas"
              style={{ color: "var(--brand-white)" }}
            >
              {t.studio.cta} <ArrowRight size={14} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Right red panel */}
        <div
          className="px-5 md:px-8 lg:px-12 xl:px-16 py-16 lg:py-24"
          style={{ background: "var(--brand-red)", color: "var(--brand-white)" }}
        >
          <div className="max-w-[560px]">
            <h3
              className={`heading-sub fade-up ${inView ? "in-view" : ""}`}
              style={{
                fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                color: "var(--brand-white)",
                transitionDelay: "0.1s",
              }}
            >
              {t.studio.panelTitle}
            </h3>
            <p
              className={`mt-4 fade-up ${inView ? "in-view" : ""}`}
              style={{
                fontSize: "16px",
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.92)",
                transitionDelay: "0.18s",
              }}
            >
              {t.studio.panelBody}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Studio;
