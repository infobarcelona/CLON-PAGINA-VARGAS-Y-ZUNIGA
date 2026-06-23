import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, ChevronLeft, Shield } from "lucide-react";

const BACKEND = "https://vargasyzuniga.onrender.com";

const PortalAuditoria = () => {
  const navigate = useNavigate();
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("portal_token");
    if (!token) { navigate("/portal"); return; }

    fetch(`${BACKEND}/api/auditoria`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        if (data.ok) setRegistros(data.registros);
        else setError(data.error || "Sin acceso");
        setLoading(false);
      })
      .catch(() => { setError("Error al cargar"); setLoading(false); });
  }, [navigate]);

  const cerrarSesion = () => { sessionStorage.removeItem("portal_token"); navigate("/portal"); };

  return (
    <div style={{ minHeight: "100vh", height: "100vh", background: "var(--cream)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ background: "var(--ink)", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: "15px", fontWeight: 700, color: "#fff", letterSpacing: "0.05em" }}>
            VARGAS <span style={{ color: "var(--accent)" }}>&amp;</span> ZÚÑIGA
          </span>
        </Link>
        <button type="button" onClick={cerrarSesion}
          style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", padding: "6px 14px", borderRadius: 8, fontSize: "12.5px", cursor: "pointer" }}>
          <LogOut size={13} /> Cerrar sesión
        </button>
      </div>

      <div style={{ flex: 1, padding: "28px 32px", overflowY: "auto", maxWidth: 1000, margin: "0 auto", width: "100%" }}>
        {/* Título */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <button type="button" onClick={() => navigate("/portal/oficina")}
            style={{ display: "flex", alignItems: "center", gap: 4, background: "transparent", border: "none", cursor: "pointer", color: "var(--accent-dark)", fontSize: "13px", fontWeight: 600, padding: 0 }}>
            <ChevronLeft size={16} /> Portal
          </button>
          <span style={{ color: "var(--ink-faint)" }}>→</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Shield size={16} style={{ color: "var(--accent-dark)" }} />
            <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--ink)" }}>Auditoría de Accesos</span>
          </div>
        </div>

        {loading && <div style={{ textAlign: "center", padding: "40px 0", color: "var(--ink-faint)" }}>Cargando registros...</div>}
        {error && <div style={{ textAlign: "center", padding: "40px 0", color: "#c0392b", fontSize: "14px" }}>{error}</div>}

        {!loading && !error && (
          <>
            <div style={{ fontSize: "12px", color: "var(--ink-faint)", marginBottom: 16 }}>
              {registros.length} registro{registros.length !== 1 ? "s" : ""} — últimos 200
            </div>
            <div style={{ background: "#fff", borderRadius: 12, border: "1px solid rgba(23,70,160,0.08)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: "rgba(23,70,160,0.05)", borderBottom: "1px solid rgba(23,70,160,0.08)" }}>
                    {["Abogado", "Documento", "Acción", "Fecha y hora", "IP"].map(h => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "var(--accent-dark)", fontSize: "11.5px", letterSpacing: "0.04em", textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {registros.map((r, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid rgba(23,70,160,0.05)", background: i % 2 === 0 ? "#fff" : "rgba(23,70,160,0.02)" }}>
                      <td style={{ padding: "11px 16px", color: "var(--ink)", fontWeight: 600 }}>{r.abogado_nombre}</td>
                      <td style={{ padding: "11px 16px", color: "var(--ink)", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.archivo_nombre}</td>
                      <td style={{ padding: "11px 16px" }}>
                        <span style={{ background: "rgba(23,70,160,0.08)", color: "var(--accent-dark)", padding: "3px 10px", borderRadius: 20, fontSize: "11.5px", fontWeight: 600 }}>
                          {r.accion === 'abrir_editor' ? '📝 Editó' : r.accion}
                        </span>
                      </td>
                      <td style={{ padding: "11px 16px", color: "var(--ink-faint)", fontSize: "12px" }}>
                        {new Date(r.fecha).toLocaleDateString("es-CL", { day: "2-digit", month: "2-digit", year: "numeric" })} {new Date(r.fecha).toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td style={{ padding: "11px 16px", color: "var(--ink-faint)", fontSize: "12px", fontFamily: "monospace" }}>{r.ip || "—"}</td>
                    </tr>
                  ))}
                  {registros.length === 0 && (
                    <tr>
                      <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "var(--ink-faint)" }}>No hay registros aún</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PortalAuditoria;
