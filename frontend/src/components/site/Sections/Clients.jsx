import { useLang } from "@/i18n/LanguageContext";

const CLIENT_LOGOS = [
  "/images/clients/plaenge.png",
  "/images/clients/massmann.png",
  "/images/clients/frontel.png",
  "/images/clients/saesa.png",
  "/images/clients/drs.png",
  "/images/clients/conavicoop.png",
];

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
              {t.clients.title}
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
                const logo = CLIENT_LOGOS[i];
                return (
                <div
                  key={g.name}
                  data-testid={`client-tile-${i}`}
                  className="client-tile"
                >
                  {logo && (
                    <img
                      src={logo}
                      alt={g.name}
                      style={{
                        width: "80%",
                        height: "80px",
                        objectFit: "contain",
                        marginBottom: 10,
                      }}
                    />
                  )}
                  <div className="client-name">{g.name}</div>
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
