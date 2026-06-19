import { useLang } from "@/i18n/LanguageContext";

const Studio = () => {
  const { t } = useLang();
  return (
    <div className="section-content section-enter" data-testid="section-studio">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-8 lg:gap-14 items-start stagger">
          <div className="col-span-12 lg:col-span-5">
            <div className="eyebrow">01 / {t.nav.studio}</div>
            <h2
              className="display mt-5"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}
              data-testid="studio-title"
            >
              {t.studio.title}
            </h2>
            <div
              className="mt-5"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                fontSize: "clamp(1.05rem, 1.4vw, 1.3rem)",
                color: "var(--accent)",
              }}
            >
              {t.slogan}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="space-y-4">
              {t.studio.paragraphs.map((p, i) => (
                <p
                  key={i}
                  data-testid={`studio-paragraph-${i}`}
                  style={{
                    color: "var(--ink-mute)",
                    fontSize: "15.5px",
                    lineHeight: 1.75,
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-9 grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.studio.values.map((v, i) => (
                <div key={v.k} data-testid={`studio-value-${i}`}>
                  <div className="label" style={{ color: "var(--accent)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3
                    className="heading mt-2"
                    style={{ fontSize: "clamp(1.2rem, 1.5vw, 1.5rem)" }}
                  >
                    {v.k}
                  </h3>
                  <p
                    className="mt-2"
                    style={{
                      color: "var(--ink-mute)",
                      fontSize: "13.5px",
                      lineHeight: 1.6,
                    }}
                  >
                    {v.d}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studio;
