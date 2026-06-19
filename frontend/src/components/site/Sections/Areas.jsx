import { useLang } from "@/i18n/LanguageContext";

const Areas = () => {
  const { t } = useLang();
  return (
    <div className="section-content section-enter" data-testid="section-areas">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start mb-7 stagger">
          <div className="col-span-12 lg:col-span-6">
            <div className="eyebrow">04 · {t.nav.areas}</div>
            <h2
              className="display mt-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
              data-testid="areas-title"
            >
              <span className="slash-red mr-1">/</span>{t.areas.title}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5 lg:col-start-8 lg:pt-5">
            <p
              style={{
                fontFamily: "'PT Sans', sans-serif",
                fontStyle: "italic",
                fontSize: "clamp(1.05rem, 1.4vw, 1.3rem)",
                color: "var(--ink)",
                lineHeight: 1.5,
                fontWeight: 400,
              }}
            >
              {t.areas.lead}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 stagger">
          {t.areas.groups.map((g, i) => (
            <div key={g.num} className="area-block" data-testid={`area-block-${i}`}>
              <div className="flex items-baseline justify-between">
                <span className="num">{g.num}</span>
                <span className="label">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3
                className="heading"
                style={{ fontSize: "clamp(1.1rem, 1.4vw, 1.4rem)" }}
              >
                {g.name}
              </h3>
              <ul>
                {g.items.map((it, idx) => (
                  <li key={idx} data-testid={`area-item-${i}-${idx}`}>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Areas;
