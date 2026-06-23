import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, FolderOpen, Clock, User, Search, ExternalLink } from "lucide-react";

const BACKEND = "https://vargasyzuniga.onrender.com";

const PortalOficina = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(true);
  const [carpetas, setCarpetas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [ahora, setAhora] = useState("");

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

  const cerrarSesion = () => { localStorage.removeItem("portal_token"); navigate("/portal"); };

  const carpetasFiltradas = carpetas.filter(c =>
    c.name.toLowerCase().includes(busqueda.toLowerCase())
  );

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
      <div style={{ background: "var(--ink)", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
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

      <div style={{ flex: 1, padding: "32px", maxWidth: 1000, margin: "0 auto", width: "100%", overflowY: "auto" }}>
        {/* Bienvenida */}
        <div style={{ background: "linear-gradient(135deg, #4984e0 0%, #1746a0 100%)", borderRadius: 16, padding: "24px 28px", marginBottom: 24, color: "#fff" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <User size={16} style={{ opacity: 0.8 }} />
            <span style={{ fontSize: "12px", opacity: 0.8, letterSpacing: "0.05em", textTransform: "uppercase" }}>Portal Abogados</span>
          </div>
          <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "20px", fontWeight: 600, margin: "0 0 6px" }}>
            Bienvenido, {nombre.split(" ")[0]}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 6, opacity: 0.75 }}>
            <Clock size={12} />
            <span style={{ fontSize: "12px" }}>{ahora}</span>
          </div>
        </div>

        {/* Buscador */}
        <div style={{ position: "relative", marginBottom: 20 }}>
          <Search size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--ink-faint)" }} />
          <input
            type="text"
            placeholder="Buscar causa por nombre..."
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
            style={{ width: "100%", padding: "12px 16px 12px 40px", border: "1.5px solid rgba(23,70,160,0.15)", borderRadius: 12, fontSize: "14px", background: "#fff", boxSizing: "border-box", outline: "none" }}
          />
        </div>

        {/* Contador */}
        <div style={{ fontSize: "12.5px", color: "var(--ink-faint)", marginBottom: 12 }}>
          {busqueda ? `${carpetasFiltradas.length} de ${carpetas.length} causas` : `${carpetas.length} causas en total`}
        </div>

        {/* Grid de carpetas */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
          {carpetasFiltradas.map(c => (
            <button
              key={c.id}
              type="button"
              onClick={() => window.open(`https://drive.google.com/drive/folders/${c.id}`, "_blank")}
              style={{
                background: "#fff",
                border: "1.5px solid rgba(23,70,160,0.08)",
                borderRadius: 12,
                padding: "14px 16px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.15s",
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(23,70,160,0.3)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(23,70,160,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(23,70,160,0.08)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <FolderOpen size={16} style={{ color: "var(--accent-dark)", flexShrink: 0, marginTop: 2 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--ink)", lineHeight: 1.3, wordBreak: "break-word" }}>
                  {c.name}
                </div>
                <div style={{ fontSize: "11px", color: "var(--ink-faint)", marginTop: 3 }}>
                  {new Date(c.modifiedTime).toLocaleDateString("es-CL")}
                </div>
              </div>
              <ExternalLink size={11} style={{ color: "var(--ink-faint)", flexShrink: 0 }} />
            </button>
          ))}
        </div>

        {carpetasFiltradas.length === 0 && busqueda && (
          <div style={{ textAlign: "center", padding: "40px 0", color: "var(--ink-faint)", fontSize: "14px" }}>
            No se encontraron causas con "{busqueda}"
          </div>
        )}

        <p style={{ fontSize: "11.5px", color: "var(--ink-faint)", textAlign: "center", marginTop: 28, lineHeight: 1.6 }}>
          El acceso a este portal queda registrado. Los documentos son confidenciales y de uso exclusivo del estudio.
        </p>
      </div>
    </div>
  );
};

export default PortalOficina;
