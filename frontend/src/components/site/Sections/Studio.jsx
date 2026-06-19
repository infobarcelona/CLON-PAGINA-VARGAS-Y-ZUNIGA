import { useLang } from "@/i18n/LanguageContext";

const Studio = () => {
  const { t } = useLang();
  return (
    <div className="section-content section-enter" data-testid="section-studio">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-8 lg:gap-14 items-start stagger">
          <div className="col-span-12 lg:col-span-5">
            <div className="eyebrow">01 · {t.nav.studio}</div>
            <h2
              className="display mt-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
              data-testid="studio-title"
            >
              <span className="slash-red mr-1">/</span>{t.studio.title}
            </h2>
            <div
              className="mt-4"
              style={{
                fontFamily: "'PT Sans', sans-serif",
                fontStyle: "italic",
                fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
                color: "var(--accent)",
                fontWeight: 700,
              }}
            >
              {t.slogan}
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="space-y-3.5">
              {t.studio.paragraphs.map((p, i) => (
                <p
                  key={i}
                  data-testid={`studio-paragraph-${i}`}
                  style={{
                    color: "var(--ink-mute)",
                    fontSize: "15.5px",
                    lineHeight: 1.7,
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              {t.studio.values.map((v, i) => (
                <div
                  key={v.k}
                  data-testid={`studio-value-${i}`}
                  style={{
                    background: "var(--paper)",
                    borderRadius: 14,
                    border: "1px solid var(--cream-edge)",
                    padding: "18px 18px 20px",
                  }}
                >
                  <div className="label" style={{ color: "var(--accent)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3
                    className="heading mt-2"
                    style={{ fontSize: "clamp(1.15rem, 1.4vw, 1.35rem)" }}
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
