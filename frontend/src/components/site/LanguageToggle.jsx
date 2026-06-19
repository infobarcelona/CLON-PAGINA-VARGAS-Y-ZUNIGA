import { useLang } from "@/i18n/LanguageContext";

const LanguageToggle = ({ variant = "light" }) => {
  const { lang, setLang } = useLang();
  const isEN = lang === "en";
  const isDark = variant === "dark";

  return (
    <div className="lang-toggle" data-testid="lang-toggle">
      <button
        type="button"
        className={!isEN ? "active" : ""}
        onClick={() => setLang("es")}
        data-testid="lang-toggle-es"
        style={{ color: isDark ? (isEN ? "rgba(245,241,234,0.5)" : "var(--bone)") : undefined }}
      >
        ES
      </button>
      <span className="sep" style={{ color: isDark ? "rgba(245,241,234,0.4)" : undefined }}>—</span>
      <button
        type="button"
        className={isEN ? "active" : ""}
        onClick={() => setLang("en")}
        data-testid="lang-toggle-en"
        style={{ color: isDark ? (!isEN ? "rgba(245,241,234,0.5)" : "var(--bone)") : undefined }}
      >
        EN
      </button>
    </div>
  );
};

export default LanguageToggle;
