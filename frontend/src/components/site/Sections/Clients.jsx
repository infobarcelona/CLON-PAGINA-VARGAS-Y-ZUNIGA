import { useLang } from "@/i18n/LanguageContext";

const Clients = () => {
  const { t } = useLang();
  return (
    <div className="section-content section-enter" data-testid="section-clients">
      <div className="container-x">
        <div className="grid grid-cols-12 gap-8 lg:gap-12 items-start stagger">
          <div className="col-span-12 lg:col-span-4">
            <div className="eyebrow">02 / {t.nav.clients}</div>
            <h2
              className="display mt-5"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}
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
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                color: "var(--ink-faint)",
                fontSize: "14.5px",
                lineHeight: 1.55,
              }}
            >
              {t.clients.note}
            </p>
          </div>

          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {t.clients.groups.map((g, i) => (
                <div
                  key={g.name}
                  data-testid={`client-tile-${i}`}
                  className="client-tile"
                >
                  <div className="client-name">{g.name}</div>
                  <div className="client-kind">{g.kind}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clients;
