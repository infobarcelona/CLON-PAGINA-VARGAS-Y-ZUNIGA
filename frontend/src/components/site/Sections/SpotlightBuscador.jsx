import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";

const SpotlightBuscador = ({ carpetas, onSeleccionar, onCerrar }) => {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onCerrar();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onCerrar]);

  const resultados = query.trim().length === 0 ? [] : carpetas.filter(c =>
    c.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .includes(query.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
  ).slice(0, 8);

  return (
    <div
      onClick={onCerrar}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
        zIndex: 9999, display: "flex", alignItems: "flex-start",
        justifyContent: "center", paddingTop: "15vh",
      }}>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: 560, background: "#fff",
          borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}>
        {/* Input */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", borderBottom: resultados.length > 0 ? "1px solid rgba(23,70,160,0.08)" : "none" }}>
          <Search size={18} style={{ color: "var(--accent-dark)", flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar causa..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              flex: 1, border: "none", outline: "none",
              fontSize: "16px", color: "var(--ink)", background: "transparent",
            }}
          />
          {query && (
            <button type="button" onClick={() => setQuery("")}
              style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-faint)", padding: 0 }}>
              <X size={16} />
            </button>
          )}
          <kbd style={{ fontSize: "11px", color: "var(--ink-faint)", background: "rgba(0,0,0,0.06)", padding: "2px 6px", borderRadius: 4, flexShrink: 0 }}>ESC</kbd>
        </div>

        {/* Resultados */}
        {resultados.length > 0 && (
          <div style={{ maxHeight: 340, overflowY: "auto" }}>
            {resultados.map((c, i) => (
              <button key={c.id} type="button"
                onClick={() => { onSeleccionar(c); onCerrar(); }}
                style={{
                  display: "flex", alignItems: "center", gap: 12,
                  width: "100%", padding: "12px 20px",
                  background: "transparent", border: "none",
                  borderBottom: i < resultados.length - 1 ? "1px solid rgba(23,70,160,0.05)" : "none",
                  cursor: "pointer", textAlign: "left",
                  transition: "background 0.1s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(23,70,160,0.05)"}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <svg width="20" height="16" viewBox="0 0 120 95" fill="none">
                  <rect x="0" y="18" width="120" height="77" rx="6" fill="#1746a0"/>
                  <rect x="0" y="10" width="48" height="22" rx="5" fill="#1746a0"/>
                  <rect x="2" y="20" width="116" height="73" rx="5" fill="#4984e0"/>
                  <rect x="8" y="34" width="104" height="4" rx="2" fill="rgba(255,255,255,0.3)"/>
                  <rect x="8" y="44" width="80" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
                </svg>
                <span style={{ fontSize: "13.5px", fontWeight: 600, color: "var(--ink)" }}>{c.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Sin resultados */}
        {query.trim().length > 0 && resultados.length === 0 && (
          <div style={{ padding: "24px 20px", textAlign: "center", color: "var(--ink-faint)", fontSize: "13px" }}>
            No se encontraron causas para "{query}"
          </div>
        )}

        {/* Footer */}
        <div style={{ padding: "10px 20px", background: "rgba(23,70,160,0.03)", borderTop: "1px solid rgba(23,70,160,0.06)", display: "flex", gap: 16 }}>
          <span style={{ fontSize: "11px", color: "var(--ink-faint)" }}>↵ abrir causa</span>
          <span style={{ fontSize: "11px", color: "var(--ink-faint)" }}>ESC cerrar</span>
          <span style={{ fontSize: "11px", color: "var(--ink-faint)" }}>⌘K abrir</span>
        </div>
      </div>
    </div>
  );
};

export default SpotlightBuscador;
