import { useLang } from "@/i18n/LanguageContext";
import { useInView } from "@/hooks/useInView";
import { Plus } from "lucide-react";

const Insights = () => {
  const { t } = useLang();
  const [ref, inView] = useInView();

  const heroImages = [
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=900&q=70",
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=70",
  ];

  return (
    <section
      id="insights"
      ref={ref}
      data-testid="insights-section"
      className="relative"
      style={{ background: "var(--brand-graphite)" }}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end mb-12">
          <div className="lg:col-span-7">
            <div className={`overline mb-3 fade-up ${inView ? "in-view" : ""}`} style={{ color: "var(--brand-blue)" }}>
              {t.insights.overline}
            </div>
            <h2
              className={`heading-section fade-up ${inView ? "in-view" : ""}`}
              style={{
                fontSize: "clamp(2.8rem, 7vw, 6rem)",
                color: "var(--brand-white)",
                transitionDelay: "0.05s",
              }}
            >
              {t.insights.titleA}
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p
              className={`fade-up ${inView ? "in-view" : ""}`}
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "15.5px",
                lineHeight: 1.65,
                transitionDelay: "0.15s",
              }}
            >
              {t.insights.lead}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {t.insights.cards.map((c, i) => (
            <article
              key={i}
              data-testid={`insight-card-${i}`}
              className={`insight-card fade-up group ${inView ? "in-view" : ""}`}
              style={{ transitionDelay: `${0.15 + i * 0.1}s` }}
            >
              <div className="relative overflow-hidden" style={{ aspectRatio: "4/3" }}>
                <img
                  src={heroImages[i]}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ filter: "grayscale(20%) brightness(0.7)" }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.65) 100%)",
                  }}
                />
                <div className="absolute top-6 left-6 right-6">
                  <div
                    className="flex items-start gap-3"
                    style={{ color: "var(--brand-white)" }}
                  >
                    <span
                      style={{
                        display: "inline-block",
                        width: "4px",
                        height: "60px",
                        background: "var(--brand-white)",
                        transform: "skewX(-18deg)",
                        marginTop: "4px",
                        flexShrink: 0,
                      }}
                    />
                    <h4
                      className="font-sans"
                      style={{
                        fontSize: "15px",
                        lineHeight: 1.4,
                        fontWeight: 600,
                      }}
                    >
                      {c.title}
                    </h4>
                  </div>
                </div>
              </div>
              <div
                className="flex items-center justify-between px-5 py-4"
                style={{ background: "var(--brand-white)" }}
              >
                <span
                  className="overline"
                  style={{ color: "var(--brand-graphite-light)" }}
                >
                  {c.tag}
                </span>
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 group-hover:bg-blue-500"
                  style={{
                    background: "var(--brand-bg-soft)",
                    color: "var(--brand-graphite)",
                  }}
                >
                  <Plus size={14} strokeWidth={1.6} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Insights;
