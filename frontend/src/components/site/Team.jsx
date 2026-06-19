import { useState, useEffect, useRef } from "react";
import { useLang } from "@/i18n/LanguageContext";
import { useInView } from "@/hooks/useInView";
import { ArrowRight } from "lucide-react";
import { scrollToId } from "@/lib/site-utils";

const Team = () => {
  const { t } = useLang();
  const [ref, inView] = useInView();
  const [pageIdx, setPageIdx] = useState(0);
  const timerRef = useRef(null);
  const trackRef = useRef(null);

  const members = t.team.members;
  // Pages of 4 visible cards
  const perPage = 4;
  const totalPages = Math.max(1, Math.ceil(members.length / perPage));

  useEffect(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setPageIdx((p) => (p + 1) % totalPages);
    }, 7000);
    return () => clearInterval(timerRef.current);
  }, [totalPages]);

  return (
    <>
      <section
        id="equipo"
        ref={ref}
        data-testid="team-section"
        className="section relative"
        style={{ background: "var(--brand-cream)" }}
      >
        <div className="max-w-[1380px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-4">
              <h2
                className={`heading-section fade-up ${inView ? "in-view" : ""}`}
                style={{ fontSize: "clamp(1.7rem, 2.8vw, 2.4rem)" }}
              >
                <span className="slash-red mr-1">/</span>
                {t.team.kicker}
              </h2>
              <p
                className={`mt-5 fade-up ${inView ? "in-view" : ""}`}
                style={{
                  color: "var(--brand-gray)",
                  fontSize: "14.5px",
                  lineHeight: 1.65,
                  maxWidth: "36ch",
                  transitionDelay: "0.1s",
                }}
              >
                {t.team.lead}
              </p>
              <button
                type="button"
                data-testid="team-cta"
                onClick={() => scrollToId(t.team.ctaTarget)}
                className={`ver-mas mt-5 fade-up ${inView ? "in-view" : ""}`}
                style={{ transitionDelay: "0.2s" }}
              >
                {t.team.cta} <ArrowRight size={14} strokeWidth={2} />
              </button>
            </div>

            <div className="lg:col-span-8 overflow-hidden" data-testid="team-carousel">
              <div
                ref={trackRef}
                className="flex transition-transform duration-700 ease-out"
                style={{
                  transform: `translateX(-${pageIdx * 100}%)`,
                  width: `${totalPages * 100}%`,
                }}
              >
                {Array.from({ length: totalPages }).map((_, pIdx) => (
                  <div
                    key={pIdx}
                    className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-5"
                    style={{ width: `${100 / totalPages}%`, flex: `0 0 ${100 / totalPages}%` }}
                  >
                    {members.slice(pIdx * perPage, pIdx * perPage + perPage).map((m, i) => (
                      <article
                        key={i}
                        data-testid={`team-card-${pIdx * perPage + i}`}
                        className="team-card"
                      >
                        <div className="portrait">
                          <img src={m.img} alt={m.name} />
                        </div>
                        <div className="name">{m.name}</div>
                        <div className="role">{m.role}</div>
                      </article>
                    ))}
                  </div>
                ))}
              </div>

              <div className="mt-7 flex justify-center dots" data-testid="team-dots">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    data-testid={`team-dot-${i}`}
                    onClick={() => setPageIdx(i)}
                    className={`dot ${i === pageIdx ? "active" : ""}`}
                    aria-label={`Page ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail */}
      <section
        id="equipo-detalle"
        data-testid="team-detail-section"
        className="section relative"
        style={{ background: "var(--brand-cream-deep)" }}
      >
        <div className="max-w-[1380px] mx-auto px-5 md:px-8 lg:px-12">
          <div className="overline">{t.team.detailKicker}</div>
          <h3
            className="heading-section mt-2 mb-10"
            style={{ fontSize: "clamp(1.7rem, 2.6vw, 2.2rem)" }}
          >
            <span className="slash-red mr-1">/</span>
            {t.team.detailTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {t.team.socios.map((m, i) => (
              <article
                key={m.name}
                data-testid={`socio-card-${i}`}
                className="bg-white"
                style={{ boxShadow: "0 1px 0 rgba(0,0,0,0.04)" }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-5">
                  <div
                    className="sm:col-span-2 relative overflow-hidden"
                    style={{ background: "var(--brand-cream-deep)", aspectRatio: "3/4" }}
                  >
                    <img
                      src={m.img}
                      alt={m.name}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="sm:col-span-3 p-6 md:p-7">
                    <div className="overline" style={{ color: "var(--brand-red)" }}>
                      {m.role}
                    </div>
                    <h4
                      className="heading-sub mt-1"
                      style={{ fontSize: "clamp(1.3rem, 2vw, 1.6rem)" }}
                    >
                      {m.name}
                    </h4>
                    <div
                      className="mt-1"
                      style={{ fontSize: "13px", color: "var(--brand-gray)" }}
                    >
                      {m.spec}
                    </div>
                    <ul className="mt-4 space-y-2">
                      {m.bio.map((p, k) => (
                        <li
                          key={k}
                          style={{
                            color: "var(--brand-graphite)",
                            fontSize: "13.5px",
                            lineHeight: 1.6,
                          }}
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={`mailto:${m.email}`}
                      data-testid={`socio-email-${i}`}
                      className="ver-mas mt-5"
                    >
                      {m.email}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
