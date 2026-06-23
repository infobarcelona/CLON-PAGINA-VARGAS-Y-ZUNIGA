import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, FolderOpen, Clock, User, Search, FileText, ChevronLeft, Download, Edit } from "lucide-react";

const BACKEND = "https://vargasyzuniga.onrender.com";

const MIME_ICONS = {
  "application/vnd.google-apps.document": "📄",
  "application/vnd.google-apps.spreadsheet": "📊",
  "application/vnd.google-apps.presentation": "📑",
  "application/pdf": "📕",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "📝",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "📊",
  "image/jpeg": "🖼️",
  "image/png": "🖼️",
};

const PortalOficina = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(true);
  const [carpetas, setCarpetas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [ahora, setAhora] = useState("");
  const [carpetaActual, setCarpetaActual] = useState(null);
  const [archivos, setArchivos] = useState([]);
  const [loadingArchivos, setLoadingArchivos] = useState(false);
  const [archivoVisor, setArchivoVisor] = useState(null);
  const [vistaGrid, setVistaGrid] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("portal_token");
    if (!token) { navigate("/portal"); return; }

    fetch(`${BACKEND}/api/portal/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(r => r.json())
      .then(data => {
        if (!data.ok) { localStorage.removeItem("portal_token"); navigate("/portal"); return; }
        setNombre(data.nombre);
        const now = new Date();
        setAhora(
          now.toLocaleDateString("es-CL", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) +
          " — " + now.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })
        );
        return fetch(`${BACKEND}/api/drive/carpetas`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      })
      .then(r => r && r.json())
      .then(data => {
        if (data && data.ok) setCarpetas(data.carpetas);
        setLoading(false);
      })
      .catch(() => { localStorage.removeItem("portal_token"); navigate("/portal"); });
  }, [navigate]);

  const abrirCarpeta = async (carpeta) => {
    setCarpetaActual(carpeta);
    setArchivoVisor(null);
    setLoadingArchivos(true);
    setBusqueda("");
    try {
      const token = localStorage.getItem("portal_token");
      const res = await fetch(`${BACKEND}/api/drive/archivos/${carpeta.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.ok) setArchivos(data.archivos);
    } catch (err) {
      console.error(err);
    }
    setLoadingArchivos(false);
  };

  const volverACarpetas = () => {
    setCarpetaActual(null);
    setArchivos([]);
    setArchivoVisor(null);
    setBusqueda("");
  };

  const abrirArchivo = (archivo) => {
    setArchivoVisor(archivo);
  };

  const getViewerUrl = (archivo) => {
    if (archivo.mimeType.startsWith("application/vnd.google-apps")) {
      return archivo.webViewLink;
    }
    return `https://drive.google.com/file/d/${archivo.id}/preview`;
  };

  const cerrarSesion = () => { localStorage.removeItem("portal_token"); navigate("/portal"); };

  const carpetasFiltradas = carpetaActual
    ? archivos.filter(a => a.name.toLowerCase().includes(busqueda.toLowerCase()))
    : carpetas.filter(c => c.name.toLowerCase().includes(busqueda.toLowerCase()));

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "14px", color: "var(--ink-faint)" }}>Cargando portal...</div>
      </div>
    );
  }

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

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Panel izquierdo */}
        <div style={{ width: archivoVisor ? 320 : "100%", maxWidth: archivoVisor ? 320 : 1000, margin: archivoVisor ? 0 : "0 auto", padding: "24px", overflowY: "auto", flexShrink: 0 }}>
          {/* Bienvenida */}
          {!carpetaActual && (
            <div style={{ background: "linear-gradient(135deg, #4984e0 0%, #1746a0 100%)", borderRadius: 16, padding: "20px 24px", marginBottom: 20, color: "#fff" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <User size={14} style={{ opacity: 0.8 }} />
                <span style={{ fontSize: "11px", opacity: 0.8, letterSpacing: "0.05em", textTransform: "uppercase" }}>Portal Abogados</span>
              </div>
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "18px", fontWeight: 600, margin: "0 0 4px" }}>
                Bienvenido, {nombre.split(" ")[0]}
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: 6, opacity: 0.75 }}>
                <Clock size={11} />
                <span style={{ fontSize: "11px" }}>{ahora}</span>
              </div>
            </div>
          )}

          {/* Breadcrumb */}
          {carpetaActual && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <button type="button" onClick={volverACarpetas}
                style={{ display: "flex", alignItems: "center", gap: 4, background: "transparent", border: "none", cursor: "pointer", color: "var(--accent-dark)", fontSize: "13px", fontWeight: 600, padding: 0 }}>
                <ChevronLeft size={16} /> Causas
              </button>
              <span style={{ color: "var(--ink-faint)", fontSize: "13px" }}>→</span>
              <span style={{ fontSize: "13px", color: "var(--ink)", fontWeight: 600 }}>{carpetaActual.name}</span>
            </div>
          )}

          {/* Buscador */}
          <div style={{ position: "relative", marginBottom: 14 }}>
            <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-faint)" }} />
            <input
              type="text"
              placeholder={carpetaActual ? "Buscar archivo..." : "Buscar causa..."}
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              style={{ width: "100%", padding: "10px 14px 10px 36px", border: "1.5px solid rgba(23,70,160,0.15)", borderRadius: 10, fontSize: "13px", background: "#fff", boxSizing: "border-box", outline: "none" }}
            />
          </div>

          {/* Contador + toggle vista */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ fontSize: "11.5px", color: "var(--ink-faint)" }}>
              {carpetaActual
                ? `${carpetasFiltradas.length} archivo${carpetasFiltradas.length !== 1 ? "s" : ""}`
                : `${carpetasFiltradas.length} causa${carpetasFiltradas.length !== 1 ? "s" : ""}`}
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <button type="button" onClick={() => setVistaGrid(true)}
                style={{ background: vistaGrid ? "var(--accent-dark)" : "transparent", color: vistaGrid ? "#fff" : "var(--ink-faint)", border: "1.5px solid rgba(23,70,160,0.15)", borderRadius: 6, padding: "4px 8px", fontSize: "11px", cursor: "pointer" }}>
                ⊞ Cuadrícula
              </button>
              <button type="button" onClick={() => setVistaGrid(false)}
                style={{ background: !vistaGrid ? "var(--accent-dark)" : "transparent", color: !vistaGrid ? "#fff" : "var(--ink-faint)", border: "1.5px solid rgba(23,70,160,0.15)", borderRadius: 6, padding: "4px 8px", fontSize: "11px", cursor: "pointer" }}>
                ☰ Lista
              </button>
            </div>
          </div>

          {/* Lista */}
          {loadingArchivos ? (
            <div style={{ textAlign: "center", padding: "30px 0", color: "var(--ink-faint)", fontSize: "13px" }}>Cargando archivos...</div>
          ) : (
            <div style={vistaGrid ? { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 10 } : { display: "flex", flexDirection: "column", gap: 8 }}>
              {carpetaActual
                ? carpetasFiltradas.map(a => (
                    <button key={a.id} type="button" onClick={() => abrirArchivo(a)}
                      style={{
                        background: archivoVisor?.id === a.id ? "rgba(23,70,160,0.08)" : "#fff",
                        border: `1.5px solid ${archivoVisor?.id === a.id ? "rgba(23,70,160,0.3)" : "rgba(23,70,160,0.08)"}`,
                        borderRadius: 10, padding: vistaGrid ? "14px 12px" : "10px 14px",
                        textAlign: vistaGrid ? "center" : "left", cursor: "pointer",
                        display: "flex", flexDirection: vistaGrid ? "column" : "row",
                        alignItems: vistaGrid ? "center" : "center", gap: vistaGrid ? 8 : 10,
                      }}>
                      <span style={{ fontSize: vistaGrid ? "28px" : "16px" }}>{MIME_ICONS[a.mimeType] || "📄"}</span>
                      <div style={{ flex: vistaGrid ? "none" : 1, minWidth: 0 }}>
                        <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink)", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: vistaGrid ? "normal" : "nowrap", wordBreak: vistaGrid ? "break-word" : "normal" }}>{a.name}</div>
                        <div style={{ fontSize: "10.5px", color: "var(--ink-faint)", marginTop: 2 }}>{new Date(a.modifiedTime).toLocaleDateString("es-CL")}</div>
                      </div>
                    </button>
                  ))
                : carpetasFiltradas.map(c => (
                    <button key={c.id} type="button" onClick={() => abrirCarpeta(c)}
                      style={{
                        background: "#fff", border: "1.5px solid rgba(23,70,160,0.08)",
                        borderRadius: 10, padding: vistaGrid ? "14px 12px" : "10px 14px",
                        textAlign: vistaGrid ? "center" : "left", cursor: "pointer",
                        display: "flex", flexDirection: vistaGrid ? "column" : "row",
                        alignItems: "center", gap: vistaGrid ? 8 : 10,
                      }}>
                      <FolderOpen size={vistaGrid ? 28 : 15} style={{ color: "var(--accent-dark)", flexShrink: 0 }} />
                      <div style={{ flex: vistaGrid ? "none" : 1, minWidth: 0 }}>
                        <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: vistaGrid ? "normal" : "nowrap", wordBreak: vistaGrid ? "break-word" : "normal" }}>{c.name}</div>
                        <div style={{ fontSize: "10.5px", color: "var(--ink-faint)", marginTop: 2 }}>{new Date(c.modifiedTime).toLocaleDateString("es-CL")}</div>
                      </div>
                    </button>
                  ))
              }
            </div>
          )}
        </div>

        {/* Panel visor */}
        {archivoVisor && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", borderLeft: "1px solid rgba(23,70,160,0.1)", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", background: "#fff", borderBottom: "1px solid rgba(23,70,160,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: "16px" }}>{MIME_ICONS[archivoVisor.mimeType] || "📄"}</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>{archivoVisor.name}</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <a href={archivoVisor.webViewLink} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 4, background: "linear-gradient(135deg, #4984e0 0%, #1746a0 100%)", color: "#fff", textDecoration: "none", padding: "6px 12px", borderRadius: 8, fontSize: "12px", fontWeight: 600 }}>
                  <Edit size={12} /> Editar en Drive
                </a>
                <a href={`https://drive.google.com/uc?export=download&id=${archivoVisor.id}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(23,70,160,0.08)", color: "var(--accent-dark)", textDecoration: "none", padding: "6px 12px", borderRadius: 8, fontSize: "12px", fontWeight: 600 }}>
                  <Download size={12} /> Descargar
                </a>
              </div>
            </div>
            <iframe
              src={getViewerUrl(archivoVisor)}
              style={{ flex: 1, border: "none", width: "100%", height: "100%" }}
              title={archivoVisor.name}
              allow="autoplay"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PortalOficina;
