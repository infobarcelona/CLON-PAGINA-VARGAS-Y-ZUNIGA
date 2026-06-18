import { useLang } from "@/i18n/LanguageContext";
import { useInView } from "@/hooks/useInView";
import { Mail } from "lucide-react";

const TeamCard = ({ m, index, inView }) => {
  return (
    <article
      data-testid={`team-card-${index}`}
      className={`fade-up ${inView ? "in-view" : ""}`}
      style={{ transitionDelay: `${0.15 + index * 0.15}s` }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-5">
          <div className="portrait-frame relative aspect-[3/4] max-w-[420px]">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, var(--brand-paper) 0%, #e7e1d5 100%)",
              }}
            />
            <img
              src={m.img}
              alt={m.name}
              className="absolute inset-0 w-full h-full object-cover object-top mix-blend-multiply"
              style={{ filter: "grayscale(15%) contrast(1.05)" }}
            />
            <div
              className="absolute top-4 left-4 font-mono uppercase"
              style={{ fontSize: "10px", letterSpacing: "0.3em", color: "var(--brand-primary-deep)" }}
            >
              0{index + 1} / Socio
            </div>
          </div>
        </div>
        <div className="md:col-span-7 md:pl-6">
          <h3
            className="font-serif"
            style={{
              fontSize: "clamp(1.9rem, 3vw, 2.6rem)",
              color: "var(--brand-primary-deep)",
              lineHeight: 1.05,
              letterSpacing: "-0.01em",
            }}
          >
            {m.name}
          </h3>
          <div
            className="font-mono uppercase mt-3"
            style={{ fontSize: "10px", letterSpacing: "0.28em", color: "var(--brand-primary)" }}
          >
            {m.role}
          </div>

          <div className="my-6 flex flex-wrap gap-2">
            {m.tags.map((tg, i) => (
              <span key={i} className="area-chip" style={{ background: "transparent" }}>
                {tg}
              </span>
            ))}
          </div>

          <div className="space-y-3">
            {m.bio.map((p, i) => (
              <p
                key={i}
                style={{
                  color: "var(--brand-secondary)",
                  fontSize: "14.5px",
                  lineHeight: 1.75,
                }}
              >
                {p}
              </p>
            ))}
          </div>

          <a
            href={`mailto:${m.email}`}
            data-testid={`team-email-${index}`}
            className="mt-6 inline-flex items-center gap-2 link-underline"
            style={{ color: "var(--brand-primary-deep)", fontSize: "14px" }}
          >
            <Mail size={14} strokeWidth={1.5} />
            {m.email}
          </a>
        </div>
      </div>
    </article>
  );
};

const Team = () => {
  const { t } = useLang();
  const [ref, inView] = useInView();
  return (
    <section
      id="equipo"
      data-testid="team-section"
      ref={ref}
      style={{ background: "var(--brand-paper)" }}
      className="relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-10 lg:px-16 py-24 md:py-32 lg:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 lg:mb-24">
          <div className="lg:col-span-6">
            <div className={`overline section-accent fade-up ${inView ? "in-view" : ""}`}>
              {t.team.overline}
            </div>
            <h2
              className={`heading-section mt-6 fade-up ${inView ? "in-view" : ""}`}
              style={{
                fontSize: "clamp(2.4rem, 6vw, 5rem)",
                transitionDelay: "0.1s",
              }}
            >
              {t.team.title.split(" ").map((w, i) =>
                i === 1 ? (
                  <span key={i} style={{ fontStyle: "italic", color: "var(--brand-primary)" }}>
                    {" "}
                    {w}
                  </span>
                ) : (
                  w
                )
              )}
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 flex items-end">
            <p
              className={`fade-up ${inView ? "in-view" : ""}`}
              style={{
                color: "var(--brand-secondary)",
                fontSize: "16px",
                lineHeight: 1.75,
                transitionDelay: "0.2s",
              }}
            >
              {t.team.lead}
            </p>
          </div>
        </div>

        <div className="space-y-20 lg:space-y-28">
          {t.team.members.map((m, i) => (
            <TeamCard key={m.name} m={m} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
