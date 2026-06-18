import { useEffect, useState, useCallback } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";

const openChat = () => {
  const launcher = document.getElementById("vyz-widget-launcher");
  const panel = document.getElementById("vyz-widget-panel");
  if (panel && panel.classList.contains("vyz-open")) return;
  if (launcher) {
    launcher.click();
    return;
  }
  let attempts = 0;
  const tryOpen = () => {
    attempts += 1;
    const l = document.getElementById("vyz-widget-launcher");
    if (l) l.click();
    else if (attempts < 10) setTimeout(tryOpen, 300);
  };
  tryOpen();
};

const Hero = () => {
  const { t } = useLang();
  const slides = t.hero.slides;
  const [idx, setIdx] = useState(0);

  const go = useCallback((dir) => {
    setIdx((p) => (p + dir + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    const id = setInterval(() => setIdx((p) => (p + 1) % slides.length), 7000);
    return () => clearInterval(id);
  }, [slides.length]);

  const slide = slides[idx];

  const handleCTA = (target) => {
    if (target === "chat") {
      openChat();
      return;
    }
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="top"
      data-testid="hero-section"
      className="relative w-full hero-dark overflow-hidden"
      style={{ minHeight: "100vh" }}
    >
      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 min-h-screen flex flex-col justify-center pt-32 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Side arrows desktop */}
          <button
            type="button"
            onClick={() => go(-1)}
            data-testid="hero-prev"
            aria-label="Previous"
            className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 items-center justify-center w-12 h-12 transition-all duration-300 hover:bg-white/5"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <ChevronLeft size={28} strokeWidth={1.2} />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            data-testid="hero-next"
            aria-label="Next"
            className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 items-center justify-center w-12 h-12 transition-all duration-300 hover:bg-white/5"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <ChevronRight size={28} strokeWidth={1.2} />
          </button>

          {/* Slash mark */}
          <div className="lg:col-span-3 lg:col-start-2 flex justify-center items-center">
            <div
              style={{
                width: "8px",
                height: "260px",
                background: "var(--brand-white)",
                transform: "skewX(-18deg)",
                transition: "transform 0.6s ease",
              }}
              key={`slash-${idx}`}
            />
          </div>

          <div className="lg:col-span-7 lg:col-start-5">
            <div
              key={`overline-${idx}`}
              data-testid="hero-overline"
              className="overline mb-5"
              style={{ color: "var(--brand-blue)", animation: "fadeUpKey 0.6s ease both" }}
            >
              {slide.overline}
            </div>
            <h1
              key={`title-${idx}`}
              data-testid="hero-title"
              className="heading-display"
              style={{
                fontSize: "clamp(2.6rem, 6.5vw, 6.5rem)",
                color: "var(--brand-white)",
                animation: "fadeUpKey 0.7s 0.05s ease both",
                maxWidth: "16ch",
              }}
            >
              {slide.title}
            </h1>
            <p
              key={`sub-${idx}`}
              data-testid="hero-sub"
              className="mt-5 max-w-xl"
              style={{
                color: "rgba(255,255,255,0.78)",
                fontSize: "16px",
                lineHeight: 1.65,
                fontWeight: 400,
                animation: "fadeUpKey 0.7s 0.12s ease both",
              }}
            >
              {slide.sub}
            </p>
            <div
              key={`cta-${idx}`}
              className="mt-7"
              style={{ animation: "fadeUpKey 0.7s 0.2s ease both" }}
            >
              <button
                type="button"
                data-testid="hero-cta"
                onClick={() => handleCTA(slide.ctaTarget)}
                className="btn-blue"
              >
                <span>{slide.cta}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom scroll cue + dots */}
        <div className="absolute bottom-12 left-0 right-0 flex flex-col items-center gap-6">
          <button
            type="button"
            onClick={() => handleCTA("#estudio")}
            data-testid="hero-scroll-cue"
            aria-label="Scroll"
            className="flex items-center justify-center w-12 h-12 rounded-full border transition-all duration-300 hover:border-white"
            style={{
              borderColor: "rgba(255,255,255,0.4)",
              color: "rgba(255,255,255,0.7)",
            }}
          >
            <ArrowDown size={16} strokeWidth={1.4} />
          </button>
          <div className="flex items-center gap-3" data-testid="hero-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIdx(i)}
                data-testid={`hero-dot-${i}`}
                aria-label={`Slide ${i + 1}`}
                className="rounded-full transition-all duration-400"
                style={{
                  width: i === idx ? 12 : 8,
                  height: i === idx ? 12 : 8,
                  background: i === idx ? "var(--brand-white)" : "rgba(255,255,255,0.3)",
                  border: i === idx ? "none" : "1px solid rgba(255,255,255,0.4)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUpKey {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;
