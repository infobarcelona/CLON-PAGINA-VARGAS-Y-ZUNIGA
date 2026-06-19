import { useState, useEffect, useRef } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { useInView } from "@/hooks/useInView";
import { ArrowRight } from "lucide-react";

const News = () => {
  const { t } = useLang();
  const [ref, inView] = useInView();
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const items = [t.news.featured, ...t.news.thumbs.slice(1).map((th) => ({ ...th, isThumb: true }))];

  // Just rotate "active" thumb via timer for visual liveliness
  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((p) => (p + 1) % t.news.thumbs.length);
    }, 6500);
    return () => clearInterval(timerRef.current);
  }, [t.news.thumbs.length]);

  return (
    <section
      id="noticias"
      ref={ref}
      data-testid="news-section"
      className="section relative"
      style={{ background: "var(--brand-cream)" }}
    >
      <div className="max-w-[1380px] mx-auto px-5 md:px-8 lg:px-12">
        <h2
          className={`heading-section fade-up ${inView ? "in-view" : ""}`}
          style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)" }}
        >
          <span className="slash-red mr-1">/</span>
          {t.news.kicker}
        </h2>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Featured */}
          <article
            className={`lg:col-span-7 fade-up ${inView ? "in-view" : ""}`}
            data-testid="news-featured"
            style={{ transitionDelay: "0.1s" }}
          >
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "16/10", background: "var(--brand-cream-deep)" }}
            >
              <img
                src={t.news.featured.img}
                alt=""
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
            <div className="mt-5">
              <div className="overline" style={{ color: "var(--brand-gray)" }}>
                {t.news.featured.date}
              </div>
              <h3
                className="heading-sub mt-2"
                style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)" }}
              >
                <span className="slash-red mr-1">/</span>
                {t.news.featured.title}
              </h3>
              <p
                className="mt-3"
                style={{
                  color: "var(--brand-gray)",
                  fontSize: "15px",
                  lineHeight: 1.65,
                  maxWidth: "60ch",
                }}
              >
                {t.news.featured.excerpt}
              </p>
              <button type="button" className="ver-mas mt-4" data-testid="news-featured-cta">
                {t.news.featured.cta} <ArrowRight size={14} strokeWidth={2} />
              </button>
            </div>
          </article>

          {/* Thumb stack */}
          <aside
            className={`lg:col-span-5 fade-up ${inView ? "in-view" : ""}`}
            data-testid="news-thumbs"
            style={{ transitionDelay: "0.2s" }}
          >
            <div className="flex flex-col">
              {t.news.thumbs.map((th, i) => (
                <button
                  key={i}
                  type="button"
                  data-testid={`news-thumb-${i}`}
                  onClick={() => setActive(i)}
                  className="text-left flex items-center gap-4 py-4 transition-all duration-300"
                  style={{
                    borderTop: i === 0 ? "1px solid var(--brand-line)" : "none",
                    borderBottom: "1px solid var(--brand-line)",
                    background: i === active ? "var(--brand-cream-deep)" : "transparent",
                    paddingLeft: i === active ? "0.6rem" : "0",
                  }}
                >
                  <div
                    className="flex-shrink-0 overflow-hidden"
                    style={{ width: 84, height: 64, background: "var(--brand-cream-deep)" }}
                  >
                    <img src={th.img} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-pt"
                      style={{ color: "var(--brand-red)", fontSize: "13px", fontWeight: 700 }}
                    >
                      {th.num}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Nunito Sans', sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "var(--brand-black)",
                        lineHeight: 1.35,
                        marginTop: "2px",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {th.title}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default News;
