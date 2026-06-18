import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { useInView } from "@/hooks/useInView";
import { Plus, Minus, ArrowRight } from "lucide-react";

const PracticeAreas = () => {
  const { t } = useLang();
  const [open, setOpen] = useState("personas");
  const [ref, inView] = useInView();

  return (
    <section
      id="areas"
      ref={ref}
      data-testid="areas-section"
      className="relative dark-overlay"
      style={{ background: "var(--brand-black)" }}
    >
      {/* Background image */}
      <div className="absolute inset-0 opacity-30">
        <img
          src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "grayscale(60%) brightness(0.6)" }}
        />
      </div>

      <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-14">
          <div className="lg:col-span-7">
            <div className={`overline mb-4 fade-up ${inView ? "in-view" : ""}`} style={{ color: "var(--brand-blue)" }}>
              {t.areas.overline}
            </div>
            <h2
              className={`heading-section fade-up ${inView ? "in-view" : ""}`}
              style={{
                fontSize: "clamp(2.8rem, 7vw, 6rem)",
                color: "var(--brand-white)",
                transitionDelay: "0.05s",
              }}
            >
              <span className="block">{t.areas.titleA}</span>
              <span className="block" style={{ color: "var(--brand-blue)" }}>
                {t.areas.titleB}
              </span>
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p
              className={`fade-up ${inView ? "in-view" : ""}`}
              style={{
                color: "rgba(255,255,255,0.75)",
                fontSize: "16px",
                lineHeight: 1.65,
                transitionDelay: "0.15s",
              }}
            >
              {t.areas.lead}
            </p>
          </div>
        </div>

        {/* Accordion */}
        <div
          className={`fade-up ${inView ? "in-view" : ""}`}
          style={{
            transitionDelay: "0.25s",
            borderTop: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          {t.areas.categories.map((cat) => {
            const isOpen = open === cat.id;
            return (
              <div key={cat.id} data-testid={`area-${cat.id}`} className="area-row">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : cat.id)}
                  data-testid={`area-toggle-${cat.id}`}
                  className="w-full flex items-center gap-6 md:gap-10 py-7 md:py-9 text-left"
                >
                  <span
                    className="font-condensed"
                    style={{
                      color: "var(--brand-blue)",
                      fontSize: "clamp(1.2rem, 1.8vw, 1.6rem)",
                      minWidth: "3ch",
                    }}
                  >
                    {cat.num}
                  </span>
                  <span
                    className="font-condensed flex-1 transition-colors duration-400"
                    style={{
                      fontSize: "clamp(1.6rem, 3.4vw, 2.8rem)",
                      color: isOpen ? "var(--brand-blue)" : "var(--brand-white)",
                      letterSpacing: "0.005em",
                      fontWeight: 800,
                      textTransform: "uppercase",
                    }}
                  >
                    {cat.title}
                  </span>
                  <span
                    className="flex-shrink-0 w-11 h-11 flex items-center justify-center border transition-all duration-400"
                    style={{
                      borderColor: isOpen ? "var(--brand-blue)" : "rgba(255,255,255,0.3)",
                      background: isOpen ? "var(--brand-blue)" : "transparent",
                      color: isOpen ? "var(--brand-white)" : "var(--brand-white)",
                    }}
                  >
                    {isOpen ? <Minus size={16} strokeWidth={1.6} /> : <Plus size={16} strokeWidth={1.6} />}
                  </span>
                </button>

                <div
                  className="grid transition-all duration-700 ease-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                    opacity: isOpen ? 1 : 0,
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="pb-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pl-0 md:pl-[4.5rem]">
                      <div className="md:col-span-5">
                        <p
                          style={{
                            color: "rgba(255,255,255,0.7)",
                            fontSize: "15px",
                            lineHeight: 1.7,
                            maxWidth: "32rem",
                          }}
                        >
                          {cat.desc}
                        </p>
                      </div>
                      <div className="md:col-span-7">
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                          {cat.items.map((it, idx) => (
                            <li
                              key={idx}
                              data-testid={`area-item-${cat.id}-${idx}`}
                              className="flex items-center justify-between border-b"
                              style={{
                                borderColor: "rgba(255,255,255,0.1)",
                                padding: "0.9rem 0",
                              }}
                            >
                              <span
                                style={{
                                  color: "var(--brand-white)",
                                  fontSize: "14.5px",
                                  fontWeight: 500,
                                }}
                              >
                                {it}
                              </span>
                              <ArrowRight
                                size={14}
                                strokeWidth={1.6}
                                style={{ color: "var(--brand-blue)" }}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PracticeAreas;
