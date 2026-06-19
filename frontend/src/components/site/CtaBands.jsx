import { useLang } from "@/i18n/LanguageContext";
import { useInView } from "@/hooks/useInView";
import { MessageSquare, ArrowRight } from "lucide-react";
import { openChat } from "@/lib/site-utils";

const CtaBands = () => {
  const { t } = useLang();
  const [ref, inView] = useInView();

  return (
    <section
      ref={ref}
      data-testid="cta-bands"
      className="grid grid-cols-1 md:grid-cols-2"
    >
      {/* Red panel */}
      <div
        className="split-band-red"
        style={{ padding: "3rem 1.5rem", paddingBlock: "3.5rem" }}
      >
        <div className="max-w-[560px] mx-auto px-2 md:px-6 lg:pl-12">
          <div
            className={`overline fade-up ${inView ? "in-view" : ""}`}
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            <span style={{ color: "var(--brand-white)", fontWeight: 700 }}>/</span> {t.chatBand.cta}
          </div>
          <h3
            className={`heading-sub mt-2 fade-up ${inView ? "in-view" : ""}`}
            style={{
              color: "var(--brand-white)",
              fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
              transitionDelay: "0.05s",
            }}
          >
            {t.chatBand.title}
          </h3>
          <p
            className={`mt-3 fade-up ${inView ? "in-view" : ""}`}
            style={{
              color: "rgba(255,255,255,0.92)",
              fontSize: "14.5px",
              lineHeight: 1.65,
              transitionDelay: "0.12s",
            }}
          >
            {t.chatBand.body}
          </p>
          <button
            type="button"
            data-testid="cta-chat"
            onClick={openChat}
            className={`btn-outline-light mt-5 fade-up ${inView ? "in-view" : ""}`}
            style={{ transitionDelay: "0.2s" }}
          >
            <MessageSquare size={14} strokeWidth={1.7} />
            <span>{t.chatBand.cta}</span>
          </button>
        </div>
      </div>

      {/* Orange panel */}
      <div
        className="split-band-orange"
        style={{ padding: "3rem 1.5rem", paddingBlock: "3.5rem" }}
      >
        <div className="max-w-[560px] mx-auto px-2 md:px-6 lg:pr-12">
          <div
            className={`overline fade-up ${inView ? "in-view" : ""}`}
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            {t.newsletterBand.cta}
          </div>
          <h3
            className={`heading-sub mt-2 fade-up ${inView ? "in-view" : ""}`}
            style={{
              color: "var(--brand-white)",
              fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
              transitionDelay: "0.05s",
            }}
          >
            <span className="slash-red" style={{ color: "var(--brand-white)" }}>/</span>{" "}
            {t.newsletterBand.title}
          </h3>
          <p
            className={`mt-3 fade-up ${inView ? "in-view" : ""}`}
            style={{
              color: "rgba(255,255,255,0.94)",
              fontSize: "14.5px",
              lineHeight: 1.65,
              transitionDelay: "0.12s",
            }}
          >
            {t.newsletterBand.body}
          </p>
          <button
            type="button"
            data-testid="cta-newsletter"
            onClick={openChat}
            className={`btn-outline-light mt-5 fade-up ${inView ? "in-view" : ""}`}
            style={{ transitionDelay: "0.2s" }}
          >
            <span>{t.newsletterBand.cta}</span>
            <ArrowRight size={14} strokeWidth={1.7} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CtaBands;
