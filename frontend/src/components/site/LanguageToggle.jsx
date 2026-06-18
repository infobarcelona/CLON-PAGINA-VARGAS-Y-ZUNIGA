import { useLang } from "@/i18n/LanguageContext";

const LanguageToggle = ({ variant = "light" }) => {
  const { lang, setLang } = useLang();
  const isEN = lang === "en";

  return (
    <div
      className="lang-toggle"
      data-testid="lang-toggle"
      style={{
        background: variant === "dark" ? "rgba(255,255,255,0.06)" : undefined,
        borderColor: variant === "dark" ? "rgba(255,255,255,0.18)" : undefined,
      }}
    >
      <span
        className="lang-pill"
        style={{
          left: isEN ? "calc(50% + 1px)" : 3,
          right: isEN ? 3 : "calc(50% + 1px)",
        }}
      />
      <button
        type="button"
        className={!isEN ? "active" : ""}
        onClick={() => setLang("es")}
        data-testid="lang-toggle-es"
        style={{ color: variant === "dark" && isEN ? "rgba(255,255,255,0.65)" : undefined }}
      >
        ES
      </button>
      <button
        type="button"
        className={isEN ? "active" : ""}
        onClick={() => setLang("en")}
        data-testid="lang-toggle-en"
        style={{ color: variant === "dark" && !isEN ? "rgba(255,255,255,0.65)" : undefined }}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
