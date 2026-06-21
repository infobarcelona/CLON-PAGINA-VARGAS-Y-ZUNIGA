import { useLang } from "@/i18n/LanguageContext";
import { Landmark, Umbrella, Droplets, Building2, Scale, User } from "lucide-react";

const CLIENT_ICONS = [Landmark, Umbrella, Droplets, Building2, Scale, User];

const Clients = () => {
  const { t } = useLang();
  return (
    <div className="section-content section-enter" data-testid="section-clients">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start stagger">
          <div className="col-span-12 lg:col-span-4">
            <div className="eyebrow">02 · {t.nav.clients}</div>
            <h2
              className="display mt-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3.4rem)" }}
              data-testid="clients-title"
            >
              <span className="slash-red mr-1">/</span>{t.clients.title}
            </h2>
            <p
              className="mt-5 max-w-md"
              style={{ color: "var(--ink-mute)", fontSize: "15px", lineHeight: 1.7 }}
            >
              {t.clients.lead}
            </p>
            <p
              className="mt-5 max-w-md"
              style={{
                fontFamily: "'PT Sans', sans-serif",
                fontStyle: "italic",
                color: "var(--ink-faint)",
                fontSize: "14px",
                lineHeight: 1.55,
              }}
            >
              {t.clients.note}
            </p>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {t.clients.groups.map((g, i) => {
                const Icon = CLIENT_ICONS[i];
                return (
                <div
                  key={g.name}
                  data-testid={`client-tile-${i}`}
                  className="client-tile"
                >
                  {Icon && (
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: 9,
                        border: "1.5px solid var(--accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 10,
                        flexShrink: 0,
                      }}
                    >
                      <Icon size={18} strokeWidth={1.6} style={{ color: "var(--accent)" }} />
                    </div>
                  )}
                  <div className="client-name">{g.name}</div>
                  <div className="client-kind">{g.kind}</div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
