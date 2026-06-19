import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const SectionNav = ({ index, total, onPrev, onNext }) => {
  const { t } = useLang();
  return (
    <div
      className="container-x px-5 md:px-10 lg:px-14 py-3 flex items-center justify-between gap-4 flex-shrink-0"
      style={{ background: "transparent", borderTop: "1px solid var(--bone-edge)" }}
      data-testid="section-nav"
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onPrev}
          data-testid="section-prev"
          disabled={index === 0}
          aria-label={t.arrows.prev}
          className="section-arrow"
        >
          <ChevronLeft size={18} strokeWidth={1.4} />
        </button>
        <button
          type="button"
          onClick={onNext}
          data-testid="section-next"
          disabled={index === total - 1}
          aria-label={t.arrows.next}
          className="section-arrow"
        >
          <ChevronRight size={18} strokeWidth={1.4} />
        </button>
      </div>

      <div
        className="hidden md:flex items-center gap-2"
        style={{ fontFamily: "'Inter', sans-serif", fontSize: "10px", letterSpacing: "0.32em", textTransform: "uppercase", color: "var(--ink-mute)" }}
        data-testid="section-progress"
      >
        <span style={{ fontVariantNumeric: "tabular-nums" }}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span style={{ color: "var(--ink-faint)" }}>—</span>
        <span style={{ color: "var(--ink-faint)", fontVariantNumeric: "tabular-nums" }}>
          {String(total).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
};

export default SectionNav;
