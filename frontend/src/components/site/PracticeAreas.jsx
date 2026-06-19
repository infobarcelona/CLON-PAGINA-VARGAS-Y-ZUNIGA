import { useLang } from "@/i18n/LanguageContext";
import { useInView } from "@/hooks/useInView";

const PracticeAreas = () => {
  const { t } = useLang();
  const [ref, inView] = useInView();

  // Split the list into two columns for the row layout
  const half = Math.ceil(t.areas.items.length / 2);
  const colA = t.areas.items.slice(0, half);
  const colB = t.areas.items.slice(half);

  return (
    <section
      id="areas"
      ref={ref}
      data-testid="areas-section"
      className="section relative overflow-hidden"
      style={{ background: "var(--brand-cream)" }}
    >
      {/* Diagonal decorative shape on left */}
      <div
        className="absolute -left-20 top-0 bottom-0 hidden lg:block pointer-events-none"
        style={{
          width: "260px",
          background: "var(--brand-cream-deep)",
          transform: "skewX(-12deg)",
          opacity: 0.7,
        }}
      />

      <div className="relative max-w-[1380px] mx-auto px-5 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <div className="lg:col-span-4">
            <h2
              className={`heading-section fade-up ${inView ? "in-view" : ""}`}
              style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.4rem)" }}
            >
              <span className="slash-red mr-1">/</span>
              {t.areas.kicker}
            </h2>
            <p
              className={`mt-5 fade-up ${inView ? "in-view" : ""}`}
              style={{
                color: "var(--brand-gray)",
                fontSize: "14.5px",
                lineHeight: 1.65,
                maxWidth: "32ch",
                transitionDelay: "0.1s",
              }}
            >
              {t.areas.lead}
            </p>
          </div>

          <div className="lg:col-span-8">
            <div
              className={`grid grid-cols-1 md:grid-cols-2 gap-x-12 fade-up ${inView ? "in-view" : ""}`}
              style={{ transitionDelay: "0.15s" }}
              data-testid="areas-list"
            >
              <div>
                {colA.map((item, i) => (
                  <div
                    key={i}
                    data-testid={`area-item-${i}`}
                    className="area-row"
                  >
                    {item}
                  </div>
                ))}
              </div>
              <div>
                {colB.map((item, i) => (
                  <div
                    key={i + half}
                    data-testid={`area-item-${i + half}`}
                    className="area-row"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
