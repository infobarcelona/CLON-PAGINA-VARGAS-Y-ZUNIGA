import { useEffect, useRef, useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { openChat, scrollToId } from "@/lib/site-utils";

const Hero = () => {
  const { t } = useLang();
  const slides = t.hero.slides;
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);

  const go = (dir) => setIdx((p) => (p + dir + slides.length) % slides.length);
  const goTo = (i) => setIdx(i);

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setIdx((p) => (p + 1) % slides.length), 8000);
    return () => clearInterval(timerRef.current);
  }, [idx, slides.length]);

  const handleCTA = (target) => {
    if (target === "chat") {
      openChat();
      return;
    }
    scrollToId(target);
  };

  const slide = slides[idx];

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative"
      style={{ background: "var(--brand-cream)", paddingTop: "96px" }}
    >
      <div className="max-w-[1380px] mx-auto px-5 md:px-8 lg:px-12 pt-8 lg:pt-12 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center min-h-[440px] lg:min-h-[520px]">
          {/* Left: text */}
          <div className="lg:col-span-5 lg:pr-4 relative">
            {/* arrows */}
            <div className="hidden lg:flex absolute -left-4 top-1/2 -translate-y-1/2 flex-col gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                data-testid="hero-prev"
                aria-label="Previous"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ background: "var(--brand-cream-deep)", color: "var(--brand-black)" }}
              >
                <ChevronLeft size={16} strokeWidth={1.7} />
              </button>
            </div>

            <div
              key={`overline-${idx}`}
              className="overline mb-3"
              style={{ animation: "fadeUpKey 0.6s ease both" }}
            >
              <span className="slash-red mr-1">/</span> {slide.tag}
            </div>
            <h1
              key={`title-${idx}`}
              data-testid="hero-title"
              className="heading-display"
              style={{
                fontSize: "clamp(2rem, 3.6vw, 3rem)",
                animation: "fadeUpKey 0.7s 0.05s ease both",
                maxWidth: "30ch",
              }}
            >
              {slide.title}
            </h1>
            <p
              key={`sub-${idx}`}
              data-testid="hero-sub"
              style={{
                marginTop: "1.2rem",
                color: "var(--brand-gray)",
                fontSize: "15.5px",
                lineHeight: 1.65,
                maxWidth: "44ch",
                animation: "fadeUpKey 0.7s 0.12s ease both",
              }}
            >
              {slide.excerpt}
            </p>
            <div
              key={`cta-${idx}`}
              className="mt-6"
              style={{ animation: "fadeUpKey 0.7s 0.2s ease both" }}
            >
              <button
                type="button"
                data-testid="hero-cta"
                onClick={() => handleCTA(slide.ctaTarget)}
                className="ver-mas"
                style={{ fontSize: "15px" }}
              >
                {slide.cta} <ArrowRight size={14} strokeWidth={2} />
              </button>
            </div>
          </div>

          {/* Right: image */}
          <div className="lg:col-span-7 relative">
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "16/10", background: "var(--brand-cream-deep)" }}
            >
              <img
                key={`img-${idx}`}
                src={slide.img}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{ animation: "fadeKey 0.9s ease both" }}
              />
            </div>
            <button
              type="button"
              onClick={() => go(1)}
              data-testid="hero-next"
              aria-label="Next"
              className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full items-center justify-center transition-all duration-300"
              style={{ background: "var(--brand-cream-deep)", color: "var(--brand-black)" }}
            >
              <ChevronRight size={16} strokeWidth={1.7} />
            </button>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3" data-testid="hero-thumbs">
          {slides.map((s, i) => (
            <button
              key={i}
              type="button"
              data-testid={`hero-thumb-${i}`}
              onClick={() => goTo(i)}
              className={`hero-thumb ${i === idx ? "active" : ""}`}
            >
              <div
                className="flex-shrink-0 overflow-hidden"
                style={{
                  width: 70,
                  height: 50,
                  background: "var(--brand-cream-deep)",
                }}
              >
                <img
                  src={s.img}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="hero-thumb-num">{s.num}</div>
                <div className="hero-thumb-title">{s.title}</div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeUpKey {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeKey {
          from { opacity: 0.5; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
