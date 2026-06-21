import { useLang } from "@/i18n/LanguageContext";
import { Users, Gavel, FileStack } from "lucide-react";

const AREA_ICONS = [Users, Gavel, FileStack];

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
              {t.areas.title}
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
          {t.areas.groups.map((g, i) => {
            const Icon = AREA_ICONS[i];
            return (
            <div key={g.num} className="area-block" data-testid={`area-block-${i}`}>
              {Icon && (
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    border: "1.5px solid var(--accent-dark)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 8,
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} strokeWidth={1.6} style={{ color: "var(--accent-dark)" }} />
                </div>
              )}
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
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Areas;
