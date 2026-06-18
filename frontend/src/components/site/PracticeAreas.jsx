import { useState } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { useInView } from "@/hooks/useInView";
import { Plus, Minus } from "lucide-react";

const PracticeAreas = () => {
  const { t } = useLang();
  const [open, setOpen] = useState("personas");
  const [ref, inView] = useInView();

  const titleLines = t.areas.title.split("\n");

  return (
    <section
      id="areas"
      data-testid="areas-section"
      ref={ref}
      className="relative"
      style={{ background: "var(--brand-primary-deep)", color: "var(--brand-ivory)" }}
    >
      {/* Decorative columns image strip */}
      <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
        <img
          src="https://images.pexels.com/photos/8815804/pexels-photo-8815804.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1200&w=1800"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 lg:mb-24">
          <div className="lg:col-span-5">
            <div
              className={`flex items-center gap-3 fade-up ${inView ? "in-view" : ""}`}
              style={{ color: "var(--brand-accent-light)" }}
            >
              <span
                className="inline-block w-12 h-px"
                style={{ background: "var(--brand-accent)" }}
              />
              <span
                className="font-mono uppercase"
                style={{ fontSize: "11px", letterSpacing: "0.3em" }}
              >
                {t.areas.overline}
              </span>
            </div>

            <h2
              className={`heading-section mt-6 fade-up ${inView ? "in-view" : ""}`}
              style={{
                color: "var(--brand-ivory)",
                fontSize: "clamp(2.4rem, 5.5vw, 4.5rem)",
                transitionDelay: "0.1s",
              }}
            >
              {titleLines.map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? (
                    <span style={{ fontStyle: "italic", color: "var(--brand-accent-light)" }}>
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h2>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p
              className={`fade-up ${inView ? "in-view" : ""}`}
              style={{
                color: "rgba(255,255,255,0.7)",
                fontSize: "16px",
                lineHeight: 1.75,
                transitionDelay: "0.2s",
                fontWeight: 300,
              }}
            >
              {t.areas.lead}
            </p>
          </div>
        </div>

        {/* Accordion list */}
        <div
          className={`fade-up ${inView ? "in-view" : ""}`}
          style={{ transitionDelay: "0.3s", borderTop: "1px solid rgba(255,255,255,0.12)" }}
        >
          {t.areas.categories.map((cat) => {
            const isOpen = open === cat.id;
            return (
              <div
                key={cat.id}
                data-testid={`area-${cat.id}`}
                style={{ borderBottom: "1px solid rgba(255,255,255,0.12)" }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : cat.id)}
                  data-testid={`area-toggle-${cat.id}`}
                  className="w-full flex items-center gap-6 md:gap-12 py-7 md:py-10 group text-left"
                >
                  <span
                    className="font-serif italic"
                    style={{
                      color: "var(--brand-accent-light)",
                      fontSize: "clamp(1.4rem, 2vw, 2rem)",
                      minWidth: "3ch",
                      opacity: 0.8,
                    }}
                  >
                    {cat.num}
                  </span>
                  <span
                    className="font-serif flex-1 transition-all duration-500"
                    style={{
                      fontSize: "clamp(1.7rem, 4vw, 3.2rem)",
                      color: isOpen ? "var(--brand-accent-light)" : "var(--brand-ivory)",
                      letterSpacing: "-0.01em",
                      fontStyle: isOpen ? "italic" : "normal",
                      fontWeight: 400,
                    }}
                  >
                    {cat.title}
                  </span>
                  <span
                    className="flex-shrink-0 w-12 h-12 flex items-center justify-center border transition-all duration-500"
                    style={{
                      borderColor: isOpen ? "var(--brand-accent)" : "rgba(255,255,255,0.25)",
                      background: isOpen ? "var(--brand-accent)" : "transparent",
                      color: isOpen ? "var(--brand-primary-deep)" : "var(--brand-ivory)",
                    }}
                  >
                    {isOpen ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
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
                    <div className="pb-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
                      <div className="md:col-span-5 md:col-start-1">
                        <p
                          style={{
                            color: "rgba(255,255,255,0.65)",
                            fontSize: "15px",
                            lineHeight: 1.75,
                            maxWidth: "32rem",
                          }}
                        >
                          {cat.desc}
                        </p>
                      </div>
                      <div className="md:col-span-7 md:col-start-6">
                        <div className="flex flex-wrap gap-2">
                          {cat.items.map((it, idx) => (
                            <span
                              key={idx}
                              data-testid={`area-item-${cat.id}-${idx}`}
                              className="inline-block px-4 py-2 transition-all duration-300"
                              style={{
                                border: "1px solid rgba(255,255,255,0.18)",
                                fontSize: "13px",
                                color: "rgba(255,255,255,0.85)",
                                background: "rgba(255,255,255,0.02)",
                              }}
                            >
                              {it}
                            </span>
                          ))}
                        </div>
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
