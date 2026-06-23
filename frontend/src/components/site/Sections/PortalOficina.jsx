import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, FolderOpen, Clock, User, Search, ChevronLeft, Download, Edit, Upload, Plus, X, FileText } from "lucide-react";

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
  const fileInputRef = useRef(null);
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
  const [subiendo, setSubiendo] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [modalCrear, setModalCrear] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoTipo, setNuevoTipo] = useState("doc");
  const [creando, setCreando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    const prevent = (e) => e.preventDefault();
    window.addEventListener("dragover", prevent);
    window.addEventListener("drop", prevent);
    return () => {
      window.removeEventListener("dragover", prevent);
      window.removeEventListener("drop", prevent);
    };
  }, []);

  const mostrarMensaje = (texto, tipo = "ok") => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(null), 3000);
  };

  useEffect(() => {
    const token = localStorage.getItem("portal_token");
    if (!token) { navigate("/portal"); return; }

    fetch(`${BACKEND}/api/portal/verify`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        if (!data.ok) { localStorage.removeItem("portal_token"); navigate("/portal"); return; }
        setNombre(data.nombre);
        const now = new Date();
        setAhora(
          now.toLocaleDateString("es-CL", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) +
          " — " + now.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })
        );
        return fetch(`${BACKEND}/api/drive/carpetas`, { headers: { Authorization: `Bearer ${token}` } });
      })
      .then(r => r && r.json())
      .then(data => { if (data && data.ok) setCarpetas(data.carpetas); setLoading(false); })
      .catch(() => { localStorage.removeItem("portal_token"); navigate("/portal"); });
  }, [navigate]);

  const cargarArchivos = async (carpeta) => {
    setLoadingArchivos(true);
    try {
      const token = localStorage.getItem("portal_token");
      const res = await fetch(`${BACKEND}/api/drive/archivos/${carpeta.id}`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      if (data.ok) setArchivos(data.archivos);
    } catch (err) { console.error(err); }
    setLoadingArchivos(false);
  };

  const abrirCarpeta = (carpeta) => {
    setCarpetaActual(carpeta);
    setArchivoVisor(null);
    setBusqueda("");
    cargarArchivos(carpeta);
  };

  const volverACarpetas = () => { setCarpetaActual(null); setArchivos([]); setArchivoVisor(null); setBusqueda(""); };
  const abrirArchivo = (archivo) => setArchivoVisor(archivo);
  const cerrarSesion = () => { localStorage.removeItem("portal_token"); navigate("/portal"); };

  const getViewerUrl = (archivo) => {
    if (archivo.mimeType.startsWith("application/vnd.google-apps")) return archivo.webViewLink;
    return `https://drive.google.com/file/d/${archivo.id}/preview`;
  };

  const subirArchivo = async (file) => {
    if (!carpetaActual) return;
    setSubiendo(true);
    try {
      const token = localStorage.getItem("portal_token");
      const formData = new FormData();
      formData.append("archivo", file);
      const res = await fetch(`${BACKEND}/api/drive/subir/${carpetaActual.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await res.json();
      if (data.ok) {
        mostrarMensaje(`✓ "${file.name}" subido correctamente`);
        cargarArchivos(carpetaActual);
      } else {
        mostrarMensaje(`Error: ${data.error}`, "error");
      }
    } catch (err) {
      mostrarMensaje("Error al subir el archivo", "error");
    }
    setSubiendo(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) subirArchivo(files[0]);
  };

  const crearDocumento = async () => {
    if (!nuevoNombre.trim() || !carpetaActual) return;
    setCreando(true);
    try {
      const token = localStorage.getItem("portal_token");
      const res = await fetch(`${BACKEND}/api/drive/crear/${carpetaActual.id}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nuevoNombre, tipo: nuevoTipo }),
      });
      const data = await res.json();
      if (data.ok) {
        mostrarMensaje(`✓ "${data.archivo.name}" creado correctamente`);
        setModalCrear(false);
        setNuevoNombre("");
        cargarArchivos(carpetaActual);
        setArchivoVisor(data.archivo);
      } else {
        mostrarMensaje(`Error: ${data.error}`, "error");
      }
    } catch (err) {
      mostrarMensaje("Error al crear el documento", "error");
    }
    setCreando(false);
  };

  const elementosFiltrados = carpetaActual
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

      {/* Mensaje flotante */}
      {mensaje && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 1000,
          background: mensaje.tipo === "error" ? "#c0392b" : "#1746a0",
          color: "#fff", padding: "12px 20px", borderRadius: 10, fontSize: "13px", fontWeight: 600,
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}>
          {mensaje.texto}
        </div>
      )}

      {/* Modal crear documento */}
      {modalCrear && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "32px", width: "100%", maxWidth: 420, boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", color: "var(--ink)", margin: 0 }}>Crear documento</h3>
              <button type="button" onClick={() => setModalCrear(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-faint)" }}><X size={18} /></button>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 6 }}>Nombre</label>
              <input type="text" value={nuevoNombre} onChange={e => setNuevoNombre(e.target.value)}
                placeholder="Ej: Contrato de compraventa"
                style={{ width: "100%", padding: "10px 14px", border: "1.5px solid rgba(23,70,160,0.2)", borderRadius: 8, fontSize: "14px", boxSizing: "border-box", outline: "none" }} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 6 }}>Tipo</label>
              <div style={{ display: "flex", gap: 8 }}>
                {[{ v: "doc", l: "📄 Documento" }, { v: "sheet", l: "📊 Hoja de cálculo" }, { v: "slide", l: "📑 Presentación" }].map(t => (
                  <button key={t.v} type="button" onClick={() => setNuevoTipo(t.v)}
                    style={{ flex: 1, padding: "8px 6px", fontSize: "11.5px", fontWeight: 600, border: `1.5px solid ${nuevoTipo === t.v ? "var(--accent-dark)" : "rgba(23,70,160,0.15)"}`, borderRadius: 8, background: nuevoTipo === t.v ? "rgba(23,70,160,0.08)" : "#fff", color: nuevoTipo === t.v ? "var(--accent-dark)" : "var(--ink-faint)", cursor: "pointer" }}>
                    {t.l}
                  </button>
                ))}
              </div>
            </div>
            <button type="button" onClick={crearDocumento} disabled={!nuevoNombre.trim() || creando}
              style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg, #4984e0 0%, #1746a0 100%)", color: "#fff", border: "none", borderRadius: 10, fontSize: "13.5px", fontWeight: 700, cursor: "pointer" }}>
              {creando ? "Creando..." : "Crear documento"}
            </button>
          </div>
        </div>
      )}

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Panel izquierdo */}
        <div
          style={{ width: archivoVisor ? 340 : "100%", maxWidth: archivoVisor ? 340 : 1000, margin: archivoVisor ? 0 : "0 auto", padding: "24px", overflowY: "auto", flexShrink: 0, position: "relative" }}
          onDragOver={carpetaActual ? (e) => { e.preventDefault(); setDragOver(true); } : undefined}
          onDragLeave={carpetaActual ? () => setDragOver(false) : undefined}
          onDrop={carpetaActual ? handleDrop : undefined}
        >
          {/* Overlay drag */}
          {dragOver && (
            <div style={{ position: "absolute", inset: 0, background: "rgba(23,70,160,0.08)", border: "2px dashed var(--accent-dark)", borderRadius: 12, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ textAlign: "center", color: "var(--accent-dark)" }}>
                <Upload size={32} />
                <div style={{ fontWeight: 700, marginTop: 8 }}>Suelta aquí para subir</div>
              </div>
            </div>
          )}

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
                <Clock size={11} /><span style={{ fontSize: "11px" }}>{ahora}</span>
              </div>
            </div>
          )}

          {/* Breadcrumb + acciones */}
          {carpetaActual && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button type="button" onClick={volverACarpetas}
                  style={{ display: "flex", alignItems: "center", gap: 4, background: "transparent", border: "none", cursor: "pointer", color: "var(--accent-dark)", fontSize: "13px", fontWeight: 600, padding: 0 }}>
                  <ChevronLeft size={16} /> Causas
                </button>
                <span style={{ color: "var(--ink-faint)", fontSize: "13px" }}>→</span>
                <span style={{ fontSize: "12px", color: "var(--ink)", fontWeight: 600, maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{carpetaActual.name}</span>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                <button type="button" onClick={() => setModalCrear(true)}
                  style={{ display: "flex", alignItems: "center", gap: 4, background: "linear-gradient(135deg, #4984e0 0%, #1746a0 100%)", color: "#fff", border: "none", padding: "6px 10px", borderRadius: 8, fontSize: "11.5px", fontWeight: 600, cursor: "pointer" }}>
                  <Plus size={12} /> Nuevo
                </button>
                <button type="button" onClick={() => fileInputRef.current?.click()} disabled={subiendo}
                  style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(23,70,160,0.08)", color: "var(--accent-dark)", border: "1.5px solid rgba(23,70,160,0.15)", padding: "6px 10px", borderRadius: 8, fontSize: "11.5px", fontWeight: 600, cursor: "pointer" }}>
                  <Upload size={12} /> {subiendo ? "Subiendo..." : "Subir"}
                </button>
                <input ref={fileInputRef} type="file" style={{ display: "none" }} onChange={e => e.target.files[0] && subirArchivo(e.target.files[0])} />
              </div>
            </div>
          )}

          {/* Buscador */}
          <div style={{ position: "relative", marginBottom: 12 }}>
            <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-faint)" }} />
            <input type="text" placeholder={carpetaActual ? "Buscar archivo..." : "Buscar causa..."}
              value={busqueda} onChange={e => setBusqueda(e.target.value)}
              style={{ width: "100%", padding: "10px 14px 10px 36px", border: "1.5px solid rgba(23,70,160,0.15)", borderRadius: 10, fontSize: "13px", background: "#fff", boxSizing: "border-box", outline: "none" }} />
          </div>

          {/* Contador + toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ fontSize: "11.5px", color: "var(--ink-faint)" }}>
              {carpetaActual ? `${elementosFiltrados.length} archivo${elementosFiltrados.length !== 1 ? "s" : ""}` : `${elementosFiltrados.length} causa${elementosFiltrados.length !== 1 ? "s" : ""}`}
              {carpetaActual && <span style={{ marginLeft: 8, fontSize: "10.5px", opacity: 0.7 }}>— arrastra archivos aquí para subir</span>}
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <button type="button" onClick={() => setVistaGrid(true)}
                style={{ background: vistaGrid ? "var(--accent-dark)" : "transparent", color: vistaGrid ? "#fff" : "var(--ink-faint)", border: "1.5px solid rgba(23,70,160,0.15)", borderRadius: 6, padding: "4px 8px", fontSize: "11px", cursor: "pointer" }}>
                ⊞
              </button>
              <button type="button" onClick={() => setVistaGrid(false)}
                style={{ background: !vistaGrid ? "var(--accent-dark)" : "transparent", color: !vistaGrid ? "#fff" : "var(--ink-faint)", border: "1.5px solid rgba(23,70,160,0.15)", borderRadius: 6, padding: "4px 8px", fontSize: "11px", cursor: "pointer" }}>
                ☰
              </button>
            </div>
          </div>

          {/* Lista/Grid */}
          {loadingArchivos ? (
            <div style={{ textAlign: "center", padding: "30px 0", color: "var(--ink-faint)", fontSize: "13px" }}>Cargando archivos...</div>
          ) : (
            <div style={vistaGrid ? { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10 } : { display: "flex", flexDirection: "column", gap: 8 }}>
              {elementosFiltrados.map(item => (
                <button key={item.id} type="button"
                  onClick={() => carpetaActual ? abrirArchivo(item) : abrirCarpeta(item)}
                  style={{
                    background: archivoVisor?.id === item.id ? "rgba(23,70,160,0.08)" : "#fff",
                    border: `1.5px solid ${archivoVisor?.id === item.id ? "rgba(23,70,160,0.3)" : "rgba(23,70,160,0.08)"}`,
                    borderRadius: 10, padding: vistaGrid ? "14px 12px" : "10px 14px",
                    textAlign: vistaGrid ? "center" : "left", cursor: "pointer",
                    display: "flex", flexDirection: vistaGrid ? "column" : "row",
                    alignItems: "center", gap: vistaGrid ? 8 : 10,
                  }}>
                  {carpetaActual
                    ? <span style={{ fontSize: vistaGrid ? "28px" : "16px" }}>{MIME_ICONS[item.mimeType] || "📄"}</span>
                    : <FolderOpen size={vistaGrid ? 28 : 15} style={{ color: "var(--accent-dark)", flexShrink: 0 }} />
                  }
                  <div style={{ flex: vistaGrid ? "none" : 1, minWidth: 0 }}>
                    <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink)", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: vistaGrid ? "normal" : "nowrap", wordBreak: vistaGrid ? "break-word" : "normal" }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: "10.5px", color: "var(--ink-faint)", marginTop: 2 }}>
                      {new Date(item.modifiedTime).toLocaleDateString("es-CL")}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Panel visor */}
        {archivoVisor && (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", borderLeft: "1px solid rgba(23,70,160,0.1)", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", background: "#fff", borderBottom: "1px solid rgba(23,70,160,0.08)", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: "16px" }}>{MIME_ICONS[archivoVisor.mimeType] || "📄"}</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--ink)", maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{archivoVisor.name}</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <a href={archivoVisor.webViewLink} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 4, background: "linear-gradient(135deg, #4984e0 0%, #1746a0 100%)", color: "#fff", textDecoration: "none", padding: "6px 12px", borderRadius: 8, fontSize: "12px", fontWeight: 600 }}>
                  <Edit size={12} /> Editar
                </a>
                <a href={`https://drive.google.com/uc?export=download&id=${archivoVisor.id}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(23,70,160,0.08)", color: "var(--accent-dark)", textDecoration: "none", padding: "6px 12px", borderRadius: 8, fontSize: "12px", fontWeight: 600 }}>
                  <Download size={12} /> Descargar
                </a>
                <button type="button" onClick={() => setArchivoVisor(null)}
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--ink-faint)", padding: "6px" }}>
                  <X size={16} />
                </button>
              </div>
            </div>
            <iframe src={getViewerUrl(archivoVisor)} style={{ flex: 1, border: "none", width: "100%", height: "100%" }} title={archivoVisor.name} allow="autoplay" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PortalOficina;
