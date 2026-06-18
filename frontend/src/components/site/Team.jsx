import { useLang } from "@/i18n/LanguageContext";
import { useInView } from "@/hooks/useInView";
import { Mail } from "lucide-react";

const Team = () => {
  const { t } = useLang();
  const [ref, inView] = useInView();

  const handleCTA = () => {
    const el = document.getElementById("equipo-detalle");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Quote / Team teaser section (carey-style) */}
      <section
        id="equipo"
        ref={ref}
        data-testid="team-quote-section"
        className="relative"
        style={{ background: "var(--brand-white)" }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-32 lg:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: portrait */}
            <div className={`lg:col-span-5 fade-up ${inView ? "in-view" : ""}`}>
              <div
                className="relative overflow-hidden"
                style={{ background: "var(--brand-bg-soft)", aspectRatio: "4/5", maxWidth: 520 }}
              >
                <img
                  src={t.team.members[0].img}
                  alt={t.team.members[0].name}
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{ filter: "grayscale(8%) contrast(1.04)" }}
                />
              </div>
            </div>

            {/* Right: title + quote */}
            <div className="lg:col-span-7">
              <div className={`overline fade-up ${inView ? "in-view" : ""}`} style={{ transitionDelay: "0.1s" }}>
                {t.team.overline}
              </div>
              <h2
                className={`heading-section mt-4 fade-up ${inView ? "in-view" : ""}`}
                style={{
                  fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                  color: "var(--brand-black)",
                  transitionDelay: "0.15s",
                }}
              >
                <span className="block">{t.team.titleA}</span>
                <span className="block" style={{ color: "var(--brand-blue)" }}>
                  {t.team.titleB}
                </span>
              </h2>

              <div className="mt-10 relative">
                <div
                  className={`quote-mark absolute fade-up ${inView ? "in-view" : ""}`}
                  style={{
                    right: 0,
                    top: -40,
                    fontSize: "8rem",
                    transitionDelay: "0.25s",
                    transform: "scaleX(-1)",
                  }}
                  aria-hidden="true"
                >
                  &rdquo;
                </div>
                <p
                  className={`fade-up ${inView ? "in-view" : ""}`}
                  style={{
                    fontSize: "17px",
                    lineHeight: 1.65,
                    color: "var(--brand-graphite)",
                    fontWeight: 400,
                    maxWidth: "44rem",
                    transitionDelay: "0.25s",
                  }}
                >
                  {t.team.quote}
                </p>
                <p
                  className={`mt-5 italic fade-up ${inView ? "in-view" : ""}`}
                  style={{
                    color: "var(--brand-graphite-light)",
                    fontSize: "14px",
                    transitionDelay: "0.3s",
                  }}
                >
                  {t.team.author}
                </p>
              </div>

              <div className={`mt-8 fade-up ${inView ? "in-view" : ""}`} style={{ transitionDelay: "0.35s" }}>
                <button
                  type="button"
                  data-testid="team-cta"
                  onClick={handleCTA}
                  className="btn-blue"
                >
                  {t.team.cta}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detail: partners cards */}
      <section
        id="equipo-detalle"
        data-testid="team-detail-section"
        className="relative"
        style={{ background: "var(--brand-bg-soft)" }}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-20 py-24 md:py-28">
          <div className="overline mb-3">{t.team.detailOverline}</div>
          <h3
            className="heading-section mb-12"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
              color: "var(--brand-black)",
            }}
          >
            {t.team.detailTitle}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {t.team.members.map((m, i) => (
              <article
                key={m.name}
                data-testid={`team-card-${i}`}
                className="bg-white"
                style={{ padding: 0 }}
              >
                <div
                  className="relative overflow-hidden"
                  style={{ background: "#e7e7e7", aspectRatio: "4/3" }}
                >
                  <img
                    src={m.img}
                    alt={m.name}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                    style={{ filter: "grayscale(10%) contrast(1.05)" }}
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div
                    className="overline"
                    style={{ color: "var(--brand-blue)", fontSize: "11px" }}
                  >
                    {m.role}
                  </div>
                  <h4
                    className="heading-sub mt-2"
                    style={{
                      fontSize: "clamp(1.5rem, 2.4vw, 2rem)",
                      color: "var(--brand-black)",
                    }}
                  >
                    {m.name}
                  </h4>
                  <div
                    className="mt-2"
                    style={{
                      fontSize: "13px",
                      color: "var(--brand-graphite-light)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {m.spec}
                  </div>

                  <div className="mt-5 space-y-2.5">
                    {m.bio.map((p, k) => (
                      <p
                        key={k}
                        style={{
                          color: "var(--brand-graphite)",
                          fontSize: "14.5px",
                          lineHeight: 1.65,
                        }}
                      >
                        {p}
                      </p>
                    ))}
                  </div>

                  <a
                    href={`mailto:${m.email}`}
                    data-testid={`team-email-${i}`}
                    className="inline-flex items-center gap-2 mt-5 link-underline"
                    style={{
                      color: "var(--brand-blue)",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    <Mail size={14} strokeWidth={1.6} />
                    {m.email}
                  </a>
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
