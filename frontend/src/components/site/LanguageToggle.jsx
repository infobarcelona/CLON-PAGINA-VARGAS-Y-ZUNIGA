import { useLang } from "@/i18n/LanguageContext";

const LanguageToggle = () => {
  const { lang, setLang } = useLang();
  const isEN = lang === "en";

  return (
    <div className="lang-toggle" data-testid="lang-toggle">
      {/* Desktop: texto */}
      <button
        type="button"
        className={`hidden lg:inline ${!isEN ? "active" : ""}`}
        onClick={() => setLang("es")}
        data-testid="lang-toggle-es"
      >
        Español
      </button>
      <span className="sep hidden lg:inline">|</span>
      <button
        type="button"
        className={`hidden lg:inline ${isEN ? "active" : ""}`}
        onClick={() => setLang("en")}
        data-testid="lang-toggle-en"
      >
        English
      </button>
      {/* Móvil: banderas */}
      <button
        type="button"
        className="lg:hidden"
        onClick={() => setLang("es")}
        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", padding: "0 2px", opacity: !isEN ? 1 : 0.45 }}
        data-testid="lang-toggle-es-flag"
      >
        🇪🇸
      </button>
      <button
        type="button"
        className="lg:hidden"
        onClick={() => setLang("en")}
        style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", padding: "0 2px", opacity: isEN ? 1 : 0.45 }}
        data-testid="lang-toggle-en-flag"
      >
        🇺🇸
      </button>
    </div>
  );
};

export default LanguageToggle;
