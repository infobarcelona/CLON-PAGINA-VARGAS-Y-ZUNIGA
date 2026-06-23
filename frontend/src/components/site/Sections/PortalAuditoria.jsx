import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, ChevronLeft, Shield, Search } from "lucide-react";

const BACKEND = "https://vargasyzuniga.onrender.com";

const PortalAuditoria = () => {
  const navigate = useNavigate();
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filtroAbogado, setFiltroAbogado] = useState("todos");
  const [filtroFecha, setFiltroFecha] = useState("todos");
  const [filtroDoc, setFiltroDoc] = useState("");

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

  // Abogados únicos para el filtro
  const abogados = [...new Set(registros.map(r => r.abogado_nombre))];

  // Aplicar filtros
  const ahora = new Date();
  const registrosFiltrados = registros.filter(r => {
    const fecha = new Date(r.fecha);

    if (filtroAbogado !== "todos" && r.abogado_nombre !== filtroAbogado) return false;

    if (filtroFecha === "hoy") {
      if (fecha.toDateString() !== ahora.toDateString()) return false;
    } else if (filtroFecha === "semana") {
      const hace7 = new Date(ahora); hace7.setDate(ahora.getDate() - 7);
      if (fecha < hace7) return false;
    } else if (filtroFecha === "mes") {
      const hace30 = new Date(ahora); hace30.setDate(ahora.getDate() - 30);
      if (fecha < hace30) return false;
    }

    if (filtroDoc && !r.archivo_nombre.toLowerCase().includes(filtroDoc.toLowerCase())) return false;

    return true;
  });

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

      <div style={{ flex: 1, padding: "28px 32px", overflowY: "auto", maxWidth: 1100, margin: "0 auto", width: "100%" }}>
        {/* Título */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
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

        {/* Filtros */}
        {!loading && !error && (
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            {/* Filtro abogado */}
            <select value={filtroAbogado} onChange={e => setFiltroAbogado(e.target.value)}
              style={{ padding: "8px 12px", border: "1.5px solid rgba(23,70,160,0.15)", borderRadius: 8, fontSize: "13px", background: "#fff", color: "var(--ink)", cursor: "pointer", outline: "none" }}>
              <option value="todos">Todos los abogados</option>
              {abogados.map(a => <option key={a} value={a}>{a.split(" ")[0]}</option>)}
            </select>

            {/* Filtro fecha */}
            <select value={filtroFecha} onChange={e => setFiltroFecha(e.target.value)}
              style={{ padding: "8px 12px", border: "1.5px solid rgba(23,70,160,0.15)", borderRadius: 8, fontSize: "13px", background: "#fff", color: "var(--ink)", cursor: "pointer", outline: "none" }}>
              <option value="todos">Todas las fechas</option>
              <option value="hoy">Hoy</option>
              <option value="semana">Última semana</option>
              <option value="mes">Último mes</option>
            </select>

            {/* Filtro documento */}
            <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
              <Search size={13} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--ink-faint)" }} />
              <input type="text" placeholder="Buscar documento..." value={filtroDoc} onChange={e => setFiltroDoc(e.target.value)}
                style={{ width: "100%", padding: "8px 12px 8px 30px", border: "1.5px solid rgba(23,70,160,0.15)", borderRadius: 8, fontSize: "13px", background: "#fff", boxSizing: "border-box", outline: "none" }} />
            </div>

            {/* Contador */}
            <div style={{ display: "flex", alignItems: "center", fontSize: "12px", color: "var(--ink-faint)" }}>
              {registrosFiltrados.length} de {registros.length} registros
            </div>
          </div>
        )}

        {loading && <div style={{ textAlign: "center", padding: "40px 0", color: "var(--ink-faint)" }}>Cargando registros...</div>}
        {error && <div style={{ textAlign: "center", padding: "40px 0", color: "#c0392b", fontSize: "14px" }}>{error}</div>}

        {!loading && !error && (
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
                {registrosFiltrados.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(23,70,160,0.05)", background: i % 2 === 0 ? "#fff" : "rgba(23,70,160,0.02)" }}>
                    <td style={{ padding: "11px 16px", color: "var(--ink)", fontWeight: 600 }}>{r.abogado_nombre}</td>
                    <td style={{ padding: "11px 16px", color: "var(--ink)", maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.archivo_nombre}</td>
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
                {registrosFiltrados.length === 0 && (
                  <tr>
                    <td colSpan={5} style={{ padding: "40px", textAlign: "center", color: "var(--ink-faint)" }}>No hay registros para los filtros seleccionados</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortalAuditoria;
