import { useLang } from "@/i18n/LanguageContext";

const LanguageToggle = () => {
  const { lang, setLang } = useLang();
  const isEN = lang === "en";

  return (
    <div className="lang-toggle" data-testid="lang-toggle">
      <button
        type="button"
        className={!isEN ? "active" : ""}
        onClick={() => setLang("es")}
        data-testid="lang-toggle-es"
      >
        Español
      </button>
      <span className="sep">|</span>
      <button
        type="button"
        className={isEN ? "active" : ""}
        onClick={() => setLang("en")}
        data-testid="lang-toggle-en"
      >
        English
      </button>
    </div>
  );
};

export default LanguageToggle;
