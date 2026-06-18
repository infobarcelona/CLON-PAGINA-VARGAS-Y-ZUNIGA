import { useState } from "react";
import { MessageSquare, X } from "lucide-react";
import { useLang } from "@/i18n/LanguageContext";

const FloatingChat = () => {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Placeholder modal hint */}
      {open && (
        <div
          data-testid="chat-modal"
          className="fixed bottom-28 right-8 z-50 w-[320px] p-5 shadow-2xl"
          style={{
            background: "var(--brand-ivory)",
            border: "1px solid var(--brand-border)",
          }}
        >
          <div className="flex items-start justify-between mb-3">
            <div
              className="font-mono uppercase"
              style={{ fontSize: "10px", letterSpacing: "0.28em", color: "var(--brand-primary)" }}
            >
              Vargas &amp; Zúñiga
            </div>
            <button
              type="button"
              data-testid="chat-close"
              onClick={() => setOpen(false)}
              style={{ color: "var(--brand-secondary)" }}
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>
          <div
            className="font-serif"
            style={{ fontSize: "22px", color: "var(--brand-primary-deep)", lineHeight: 1.2 }}
          >
            {t.chat.tooltip}
          </div>
          <p
            className="mt-3"
            style={{ fontSize: "13px", color: "var(--brand-secondary)", lineHeight: 1.6 }}
          >
            {t.chat.placeholder}
          </p>
        </div>
      )}

      <button
        type="button"
        className="chat-fab"
        data-testid="floating-chat-btn"
        onClick={() => setOpen(!open)}
        aria-label={t.chat.tooltip}
      >
        {open ? <X size={22} strokeWidth={1.4} /> : <MessageSquare size={22} strokeWidth={1.4} />}
      </button>
    </>
  );
};

export default FloatingChat;
