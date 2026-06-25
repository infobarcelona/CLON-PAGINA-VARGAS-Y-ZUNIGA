import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, FolderOpen, Clock, User, Search, ChevronLeft, Download, Edit, Upload, Plus, X, Trash2, FolderPlus, FileText, Table, Presentation } from "lucide-react";
import OnlyOfficeEditor from "./OnlyOfficeEditor";
import SpotlightBuscador from "./SpotlightBuscador";
import SessionTimer from "./SessionTimer";

const BACKEND = "https://vargasyzuniga.onrender.com";

const MIME_ICONS = {
  "application/vnd.google-apps.document": "📄",
  "application/vnd.google-apps.spreadsheet": "📊",
  "application/vnd.google-apps.presentation": "📑",
  "application/vnd.google-apps.folder": "📁",
  "application/pdf": "📕",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": "📝",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "📊",
  "image/jpeg": "🖼️",
  "image/png": "🖼️",
};

const PortalOficina = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);
  const contextMenuRef = useRef(null);

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [carpetas, setCarpetas] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [ahora, setAhora] = useState("");
  const [carpetaActual, setCarpetaActual] = useState(null);
  const [archivos, setArchivos] = useState([]);
  const [loadingArchivos, setLoadingArchivos] = useState(false);
  const [archivoVisor, setArchivoVisor] = useState(null);
  const [onlyofficeConfig, setOnlyofficeConfig] = useState(null);
  const archivoVisorRef = useRef(null);
  const nombreRef = useRef("");
  const [loadingEditor, setLoadingEditor] = useState(false);
  const [vistaGrid, setVistaGrid] = useState(true);
  const [subiendo, setSubiendo] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [modalCrear, setModalCrear] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(null);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoTipo, setNuevoTipo] = useState("doc");
  const [creando, setCreando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [contextMenu, setContextMenu] = useState(null);
  const [contextMenuItem, setContextMenuItem] = useState(null);
  const [modalRenombrar, setModalRenombrar] = useState(null);
  const [nuevoNombreItem, setNuevoNombreItem] = useState("");
  const [modalCarpeta, setModalCarpeta] = useState(false);
  const [spotlight, setSpotlight] = useState(false);
  const [nombreCarpeta, setNombreCarpeta] = useState("");

  const mostrarMensaje = (texto, tipo = "ok") => {
    setMensaje({ texto, tipo });
    setTimeout(() => setMensaje(null), 3000);
  };

  useEffect(() => {
    const prevent = (e) => e.preventDefault();
    window.addEventListener("dragover", prevent);
    window.addEventListener("drop", prevent);
    const cerrarMenu = () => { setContextMenu(null); setContextMenuItem(null); };
    window.addEventListener("click", cerrarMenu);
    return () => {
      window.removeEventListener("dragover", prevent);
      window.removeEventListener("drop", prevent);
      window.removeEventListener("click", cerrarMenu);
    };
  }, []);

  // Activar Spotlight con Cmd+K
  useEffect(() => {
    const handleKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSpotlight(true);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Mantener el ref del archivo activo actualizado
  useEffect(() => {
    archivoVisorRef.current = archivoVisor;
  }, [archivoVisor]);

  // Mantener el ref del nombre actualizado
  useEffect(() => {
    nombreRef.current = nombre;
  }, [nombre]);

  // Enviar token y archivo activo al widget de Renata via postMessage
  useEffect(() => {
    const token = sessionStorage.getItem("portal_token");
    if (!token) return;
    const enviarToken = () => {
      const iframe = document.getElementById("vyz-widget-iframe");
      const av = archivoVisorRef.current;
      const payload = { 
        type: "VYZ_PORTAL_TOKEN", 
        token, 
        nombre: nombreRef.current,
        archivoActivo: av ? { id: av.id, nombre: av.name, tipo: av.mimeType } : null
      };
      if (iframe && iframe.contentWindow) {
        iframe.contentWindow.postMessage(payload, "https://vargasyzuniga.onrender.com");
      }
      window.postMessage(payload, "*");
    };
    enviarToken();
    const interval = setInterval(enviarToken, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const token = sessionStorage.getItem("portal_token");
    if (!token) { navigate("/portal"); return; }
    fetch(`${BACKEND}/api/portal/verify`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => {
        if (!data.ok) { sessionStorage.removeItem("portal_token"); navigate("/portal"); return; }
        setNombre(data.nombre);
        setEmail(data.email || "");
        const now = new Date();
        setAhora(
          now.toLocaleDateString("es-CL", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) +
          " — " + now.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })
        );
        return fetch(`${BACKEND}/api/drive/carpetas`, { headers: { Authorization: `Bearer ${token}` } });
      })
      .then(r => r && r.json())
      .then(data => { if (data && data.ok) setCarpetas(data.carpetas); setLoading(false); })
      .catch(() => { sessionStorage.removeItem("portal_token"); navigate("/portal"); });
  }, [navigate]);

  const cargarArchivos = async (carpeta) => {
    setLoadingArchivos(true);
    try {
      const token = sessionStorage.getItem("portal_token");
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
  const cerrarSesion = () => { sessionStorage.removeItem("portal_token"); navigate("/portal"); };

  const cerrarEditor = () => {
    setOnlyofficeConfig(null);
    setArchivoVisor(null);
  };

  const abrirEditor = async (archivo, esNuevo = false) => {
    setOnlyofficeConfig(null);
    setArchivoVisor(archivo);
    await new Promise(r => setTimeout(r, esNuevo ? 2500 : 300));
    setLoadingEditor(true);
    setOnlyofficeConfig(null);
    try {
      const token = sessionStorage.getItem("portal_token");
      const res = await fetch(`${BACKEND}/api/onlyoffice/token`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ fileId: archivo.id, fileName: archivo.name, mimeType: archivo.mimeType }),
      });
      const data = await res.json();
      if (data.ok) setOnlyofficeConfig(data.config);
      else mostrarMensaje(`Error: ${data.error}`, "error");
    } catch { mostrarMensaje("Error al abrir el editor", "error"); }
    setLoadingEditor(false);
  };

  const getViewerUrl = (archivo) => {
    if (archivo.mimeType.startsWith("application/vnd.google-apps")) return archivo.webViewLink;
    return `https://drive.google.com/file/d/${archivo.id}/preview`;
  };

  const subirArchivo = async (file) => {
    if (!carpetaActual) return;
    setSubiendo(true);
    try {
      const token = sessionStorage.getItem("portal_token");
      const formData = new FormData();
      formData.append("archivo", file);
      const res = await fetch(`${BACKEND}/api/drive/subir/${carpetaActual.id}`, {
        method: "POST", headers: { Authorization: `Bearer ${token}` }, body: formData,
      });
      const data = await res.json();
      if (data.ok) { mostrarMensaje(`✓ "${file.name}" subido correctamente`); cargarArchivos(carpetaActual); }
      else mostrarMensaje(`Error: ${data.error}`, "error");
    } catch { mostrarMensaje("Error al subir el archivo", "error"); }
    setSubiendo(false);
  };

  const eliminarItem = async (item) => {
    try {
      const token = sessionStorage.getItem("portal_token");
      const res = await fetch(`${BACKEND}/api/drive/eliminar/${item.id}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.ok) {
        mostrarMensaje(`✓ "${item.name}" eliminado`);
        setModalEliminar(null);
        if (archivoVisor?.id === item.id) setArchivoVisor(null);
        if (carpetaActual) cargarArchivos(carpetaActual);
        else {
          const token2 = sessionStorage.getItem("portal_token");
          const r = await fetch(`${BACKEND}/api/drive/carpetas`, { headers: { Authorization: `Bearer ${token2}` } });
          const d = await r.json();
          if (d.ok) setCarpetas(d.carpetas);
        }
      } else mostrarMensaje(`Error: ${data.error}`, "error");
    } catch { mostrarMensaje("Error al eliminar", "error"); }
  };

  const crearDocumento = async () => {
    if (!nuevoNombre.trim() || !carpetaActual) return;
    setCreando(true);
    try {
      const token = sessionStorage.getItem("portal_token");
      const folderId = carpetaActual?.id;
      const res = await fetch(`${BACKEND}/api/drive/crear/${folderId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nuevoNombre, tipo: nuevoTipo }),
      });
      const data = await res.json();
      if (data.ok) {
        mostrarMensaje(`✓ "${data.archivo.name}" creado`);
        setModalCrear(false); setNuevoNombre("");
        cargarArchivos(carpetaActual);
        abrirEditor(data.archivo, true);
      } else mostrarMensaje(`Error: ${data.error}`, "error");
    } catch { mostrarMensaje("Error al crear", "error"); }
    setCreando(false);
  };

  const crearCarpeta = async () => {
    if (!nombreCarpeta.trim()) return;
    try {
      const token = sessionStorage.getItem("portal_token");
      const folderId = carpetaActual?.id || "1A_pJ-3Nqe1_1r0zzX7KwZKNp4mN9oNYs";
      const res = await fetch(`${BACKEND}/api/drive/carpeta/${folderId}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombreCarpeta }),
      });
      const data = await res.json();
      if (data.ok) {
        mostrarMensaje(`✓ Carpeta "${nombreCarpeta}" creada`);
        setModalCarpeta(false); setNombreCarpeta("");
        if (carpetaActual) cargarArchivos(carpetaActual);
        else {
          const r = await fetch(`${BACKEND}/api/drive/carpetas`, { headers: { Authorization: `Bearer ${token}` } });
          const d = await r.json();
          if (d.ok) setCarpetas(d.carpetas);
        }
      } else mostrarMensaje(`Error: ${data.error}`, "error");
    } catch { mostrarMensaje("Error al crear carpeta", "error"); }
  };

  const renombrarItem = async () => {
    if (!nuevoNombreItem.trim() || !modalRenombrar) return;
    try {
      const token = sessionStorage.getItem("portal_token");
      const res = await fetch(`${BACKEND}/api/drive/renombrar/${modalRenombrar.id}`, {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nuevoNombreItem }),
      });
      const data = await res.json();
      if (data.ok) {
        mostrarMensaje(`✓ Renombrado a "${nuevoNombreItem}"`);
        setModalRenombrar(null);
        setNuevoNombreItem("");
        if (carpetaActual) cargarArchivos(carpetaActual);
        else {
          const r = await fetch(`${BACKEND}/api/drive/carpetas`, { headers: { Authorization: `Bearer ${token}` } });
          const d = await r.json();
          if (d.ok) setCarpetas(d.carpetas);
        }
      } else mostrarMensaje(`Error: ${data.error}`, "error");
    } catch { mostrarMensaje("Error al renombrar", "error"); }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
    setContextMenuItem(null);
  };

  const handleItemContextMenu = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenuItem({ x: e.clientX, y: e.clientY, item });
    setContextMenu(null);
  };

  const handleDrop = (e) => { e.preventDefault(); setDragOver(false); const files = Array.from(e.dataTransfer.files); if (files.length > 0) subirArchivo(files[0]); };

  const elementosFiltrados = carpetaActual
    ? archivos.filter(a => a.name.toLowerCase().includes(busqueda.toLowerCase()))
    : carpetas.filter(c => c.name.toLowerCase().includes(busqueda.toLowerCase()));

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: "14px", color: "var(--ink-faint)" }}>Cargando portal...</div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", height: "100vh", background: "var(--cream)", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ background: "var(--ink)", padding: "14px 32px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <Link to="/" style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: "15px", fontWeight: 700, color: "#fff", letterSpacing: "0.05em" }}>
            VARGAS <span style={{ color: "var(--accent)" }}>&amp;</span> ZÚÑIGA
          </span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {email === "avargas@vargasyzuniga.cl" && (
            <Link to="/portal/auditoria" style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--accent)", textDecoration: "none", fontSize: "12.5px", fontWeight: 600 }}>
              🛡️ Auditoría
            </Link>
          )}
          <button type="button" onClick={cerrarSesion}
            style={{ display: "flex", alignItems: "center", gap: 6, background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "rgba(255,255,255,0.7)", padding: "6px 14px", borderRadius: 8, fontSize: "12.5px", cursor: "pointer" }}>
            <LogOut size={13} /> Cerrar sesión
          </button>
        </div>
      </div>

      {/* Mensaje flotante */}
      {mensaje && (
        <div style={{ position: "fixed", top: 20, right: 20, zIndex: 1000, background: mensaje.tipo === "error" ? "#c0392b" : "#1746a0", color: "#fff", padding: "12px 20px", borderRadius: 10, fontSize: "13px", fontWeight: 600, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>
          {mensaje.texto}
        </div>
      )}

      {/* Menú contextual */}
      {contextMenu && (
        <div ref={contextMenuRef} style={{ position: "fixed", top: contextMenu.y, left: contextMenu.x, background: "#fff", borderRadius: 10, boxShadow: "0 4px 24px rgba(0,0,0,0.15)", border: "1px solid rgba(23,70,160,0.1)", zIndex: 999, minWidth: 200, overflow: "hidden" }}
          onClick={e => e.stopPropagation()}>
          {[
            { icon: "📄", label: "Nuevo documento", action: () => { setNuevoTipo("doc"); setModalCrear(true); setContextMenu(null); }, disabled: !carpetaActual },
            { icon: "📊", label: "Nueva hoja de cálculo", action: () => { setNuevoTipo("sheet"); setModalCrear(true); setContextMenu(null); }, disabled: !carpetaActual },
            { icon: "📑", label: "Nueva presentación", action: () => { setNuevoTipo("slide"); setModalCrear(true); setContextMenu(null); }, disabled: !carpetaActual },
            null,
            { icon: "📁", label: "Nueva carpeta", action: () => { setModalCarpeta(true); setContextMenu(null); } },
            null,
            { icon: "⬆️", label: "Subir archivo", action: () => { fileInputRef.current?.click(); setContextMenu(null); }, disabled: !carpetaActual },
          ].map((item, i) => item === null ? (
            <div key={i} style={{ height: 1, background: "rgba(23,70,160,0.08)", margin: "4px 0" }} />
          ) : (
            <button key={i} type="button" onClick={item.action} disabled={item.disabled}
              style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", background: "transparent", border: "none", cursor: item.disabled ? "not-allowed" : "pointer", fontSize: "13px", color: item.disabled ? "var(--ink-faint)" : "var(--ink)", textAlign: "left" }}>
              <span>{item.icon}</span> {item.label}
            </button>
          ))}
        </div>
      )}

      {/* Modal crear documento */}
      {modalCrear && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 998, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "32px", width: "100%", maxWidth: 420, boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", color: "var(--ink)", margin: 0 }}>Crear documento</h3>
              <button type="button" onClick={() => setModalCrear(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-faint)" }}><X size={18} /></button>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 6 }}>Nombre</label>
              <input type="text" value={nuevoNombre} onChange={e => setNuevoNombre(e.target.value)} onKeyDown={e => e.key === "Enter" && nuevoNombre.trim() && crearDocumento()} placeholder="Ej: Contrato de compraventa"
                style={{ width: "100%", padding: "10px 14px", border: "1.5px solid rgba(23,70,160,0.2)", borderRadius: 8, fontSize: "14px", boxSizing: "border-box", outline: "none" }} />
            </div>
            <div style={{ marginBottom: 24 }}>
              <label style={{ display: "block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--ink-faint)", marginBottom: 6 }}>Tipo</label>
              <div style={{ display: "flex", gap: 8 }}>
                {[{ v: "doc", l: "📄 Documento" }, { v: "sheet", l: "📊 Hoja" }, { v: "slide", l: "📑 Presentación" }].map(t => (
                  <button key={t.v} type="button" onClick={() => setNuevoTipo(t.v)}
                    style={{ flex: 1, padding: "8px 6px", fontSize: "11.5px", fontWeight: 600, border: `1.5px solid ${nuevoTipo === t.v ? "var(--accent-dark)" : "rgba(23,70,160,0.15)"}`, borderRadius: 8, background: nuevoTipo === t.v ? "rgba(23,70,160,0.08)" : "#fff", color: nuevoTipo === t.v ? "var(--accent-dark)" : "var(--ink-faint)", cursor: "pointer" }}>
                    {t.l}
                  </button>
                ))}
              </div>
            </div>
            <button type="button" onClick={crearDocumento} disabled={!nuevoNombre.trim() || creando}
              style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg, #4984e0 0%, #1746a0 100%)", color: "#fff", border: "none", borderRadius: 10, fontSize: "13.5px", fontWeight: 700, cursor: "pointer" }}>
              {creando ? "Creando..." : "Crear y abrir"}
            </button>
          </div>
        </div>
      )}

      {/* Modal crear carpeta */}
      {modalCarpeta && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 998, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "32px", width: "100%", maxWidth: 380, boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", color: "var(--ink)", margin: 0 }}>Nueva carpeta</h3>
              <button type="button" onClick={() => setModalCarpeta(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-faint)" }}><X size={18} /></button>
            </div>
            <input type="text" value={nombreCarpeta} onChange={e => setNombreCarpeta(e.target.value)} onKeyDown={e => e.key === "Enter" && nombreCarpeta.trim() && crearCarpeta()} placeholder="Nombre de la carpeta"
              style={{ width: "100%", padding: "10px 14px", border: "1.5px solid rgba(23,70,160,0.2)", borderRadius: 8, fontSize: "14px", boxSizing: "border-box", outline: "none", marginBottom: 20 }} />
            <button type="button" onClick={crearCarpeta} disabled={!nombreCarpeta.trim()}
              style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg, #4984e0 0%, #1746a0 100%)", color: "#fff", border: "none", borderRadius: 10, fontSize: "13.5px", fontWeight: 700, cursor: "pointer" }}>
              Crear carpeta
            </button>
          </div>
        </div>
      )}

      {/* Menu contextual de item */}
      {contextMenuItem && (
        <div style={{ position: "fixed", top: contextMenuItem.y, left: contextMenuItem.x, background: "#fff", borderRadius: 10, boxShadow: "0 4px 24px rgba(0,0,0,0.15)", border: "1px solid rgba(23,70,160,0.1)", zIndex: 999, minWidth: 180, overflow: "hidden" }}
          onClick={e => e.stopPropagation()}>
          <button type="button" onClick={() => { setNuevoNombreItem(contextMenuItem.item.name); setModalRenombrar(contextMenuItem.item); setContextMenuItem(null); }}
            style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", background: "transparent", border: "none", cursor: "pointer", fontSize: "13px", color: "var(--ink)", textAlign: "left" }}>
            ✏️ Renombrar
          </button>
          {contextMenuItem.item.mimeType !== "application/vnd.google-apps.folder" && (
            <>
              <a href={`https://vargasyzuniga.onrender.com/api/onlyoffice/download/${contextMenuItem.item.id}`} target="_blank" rel="noopener noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", textDecoration: "none", fontSize: "13px", color: "var(--ink)" }}
                onClick={() => setContextMenuItem(null)}>
                ⬇️ Descargar
              </a>
              <div style={{ height: 1, background: "rgba(23,70,160,0.08)", margin: "4px 0" }} />
            </>
          )}
          {contextMenuItem.item.mimeType === "application/vnd.google-apps.folder" && (
            <div style={{ height: 1, background: "rgba(23,70,160,0.08)", margin: "4px 0" }} />
          )}
          <button type="button" onClick={() => { setModalEliminar(contextMenuItem.item); setContextMenuItem(null); }}
            style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 16px", background: "transparent", border: "none", cursor: "pointer", fontSize: "13px", color: "#c0392b", textAlign: "left" }}>
            🗑️ Eliminar
          </button>
        </div>
      )}

      {/* Modal renombrar */}
      {modalRenombrar && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 998, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "32px", width: "100%", maxWidth: 380, boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", color: "var(--ink)", margin: 0 }}>Renombrar</h3>
              <button type="button" onClick={() => setModalRenombrar(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ink-faint)" }}><X size={18} /></button>
            </div>
            <input type="text" value={nuevoNombreItem} onChange={e => setNuevoNombreItem(e.target.value)} onKeyDown={e => e.key === "Enter" && nuevoNombreItem.trim() && renombrarItem()}
              onKeyDown={e => e.key === "Enter" && renombrarItem()}
              style={{ width: "100%", padding: "10px 14px", border: "1.5px solid rgba(23,70,160,0.2)", borderRadius: 8, fontSize: "14px", boxSizing: "border-box", outline: "none", marginBottom: 20 }} />
            <button type="button" onClick={renombrarItem} disabled={!nuevoNombreItem.trim()}
              style={{ width: "100%", padding: "12px", background: "linear-gradient(135deg, #4984e0 0%, #1746a0 100%)", color: "#fff", border: "none", borderRadius: 10, fontSize: "13.5px", fontWeight: 700, cursor: "pointer" }}>
              Guardar
            </button>
          </div>
        </div>
      )}

      {/* Modal confirmar eliminar */}}
      {modalEliminar && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 998, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: "#fff", borderRadius: 16, padding: "32px", width: "100%", maxWidth: 380, boxShadow: "0 8px 40px rgba(0,0,0,0.15)" }}>
            <h3 style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", color: "var(--ink)", margin: "0 0 12px" }}>Eliminar</h3>
            <p style={{ fontSize: "13.5px", color: "var(--ink-mute)", margin: "0 0 24px", lineHeight: 1.5 }}>
              ¿Estás seguro que deseas eliminar <b>"{modalEliminar.name}"</b>? Esta acción no se puede deshacer.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button type="button" onClick={() => setModalEliminar(null)}
                style={{ flex: 1, padding: "10px", background: "transparent", border: "1.5px solid rgba(23,70,160,0.15)", borderRadius: 10, fontSize: "13px", cursor: "pointer", color: "var(--ink)" }}>
                Cancelar
              </button>
              <button type="button" onClick={() => eliminarItem(modalEliminar)}
                style={{ flex: 1, padding: "10px", background: "#c0392b", color: "#fff", border: "none", borderRadius: 10, fontSize: "13px", fontWeight: 700, cursor: "pointer" }}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}
        onContextMenu={(e) => {
          if (carpetaActual) return;
          if (e.target.closest("button") || e.target.closest("a")) return;
          handleContextMenu(e);
        }}>
        {/* Panel izquierdo */}
        <div style={{ width: archivoVisor ? 340 : "100%", maxWidth: archivoVisor ? 340 : 1000, margin: archivoVisor ? 0 : "0 auto", padding: "24px", overflowY: "auto", flexShrink: 0, position: "relative" }}
          onContextMenu={(e) => { if (carpetaActual && !(e.target.closest("button") || e.target.closest("a"))) handleContextMenu(e); }}
          onDragOver={carpetaActual ? (e) => { e.preventDefault(); setDragOver(true); } : undefined}
          onDragLeave={carpetaActual ? () => setDragOver(false) : undefined}
          onDrop={carpetaActual ? handleDrop : undefined}>

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
              <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "18px", fontWeight: 600, margin: "0 0 4px" }}>Bienvenido, {nombre.split(" ")[0]}</h2>
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
                <button type="button" onClick={() => { setOnlyofficeConfig(null); setArchivoVisor(null); }}
                  style={{ fontSize: "12px", color: "var(--accent-dark)", fontWeight: 600, maxWidth: 150, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", background: "none", border: "none", cursor: "pointer", padding: 0 }}>
                  {carpetaActual.name}
                </button>
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

          <SessionTimer />
        {/* Spotlight */}
          {spotlight && (
            <SpotlightBuscador
              carpetas={carpetas}
              onSeleccionar={(carpeta) => abrirCarpeta(carpeta)}
              onCerrar={() => setSpotlight(false)}
            />
          )}

          {/* Buscador */}
          <div style={{ position: "relative", marginBottom: 12 }}>
            <Search size={14} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--ink-faint)" }} />
            {!carpetaActual && (
              <button type="button" onClick={() => setSpotlight(true)}
                title="Búsqueda rápida (⌘K)"
                style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(23,70,160,0.07)", border: "1px solid rgba(23,70,160,0.15)", borderRadius: 6, padding: "2px 7px", fontSize: "11px", color: "var(--accent-dark)", cursor: "pointer", fontWeight: 600 }}>
                ⌘K
              </button>
            )}
            <input type="text" placeholder={carpetaActual ? "Buscar archivo..." : "Buscar causa..."}
              value={busqueda} onChange={e => setBusqueda(e.target.value)}
              style={{ width: "100%", padding: "10px 14px 10px 36px", border: "1.5px solid rgba(23,70,160,0.15)", borderRadius: 10, fontSize: "13px", background: "#fff", boxSizing: "border-box", outline: "none" }} />
          </div>

          <div style={{ height: 16 }} />
          {/* Contador + toggle */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ fontSize: "11.5px", color: "var(--ink-faint)" }}>
              {carpetaActual ? `${elementosFiltrados.length} elemento${elementosFiltrados.length !== 1 ? "s" : ""}` : `${elementosFiltrados.length} causa${elementosFiltrados.length !== 1 ? "s" : ""}`}
              {carpetaActual && <span style={{ marginLeft: 8, fontSize: "10.5px", opacity: 0.7 }}>— clic derecho para más opciones</span>}
            </div>
            <div style={{ display: "flex", gap: 4 }}>
              <button type="button" onClick={() => setVistaGrid(true)}
                style={{ background: vistaGrid ? "var(--accent-dark)" : "transparent", color: vistaGrid ? "#fff" : "var(--ink-faint)", border: "1.5px solid rgba(23,70,160,0.15)", borderRadius: 6, padding: "4px 8px", fontSize: "11px", cursor: "pointer" }}>⊞</button>
              <button type="button" onClick={() => setVistaGrid(false)}
                style={{ background: !vistaGrid ? "var(--accent-dark)" : "transparent", color: !vistaGrid ? "#fff" : "var(--ink-faint)", border: "1.5px solid rgba(23,70,160,0.15)", borderRadius: 6, padding: "4px 8px", fontSize: "11px", cursor: "pointer" }}>☰</button>
            </div>
          </div>

          {/* Lista/Grid */}
          {loadingArchivos ? (
            <div style={{ textAlign: "center", padding: "30px 0", color: "var(--ink-faint)", fontSize: "13px" }}>Cargando...</div>
          ) : (
            <div style={vistaGrid ? { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 10, minHeight: 400 } : { display: "flex", flexDirection: "column", gap: 8, minHeight: 400 }}>
              {elementosFiltrados.map(item => (
                <div key={item.id} style={{ position: "relative" }} className="portal-item">
                  <button type="button"
                    onContextMenu={(e) => handleItemContextMenu(e, item)}
                    onClick={() => carpetaActual ? (item.mimeType === "application/vnd.google-apps.folder" ? abrirCarpeta(item) : abrirEditor(item)) : abrirCarpeta(item)}
                    style={{
                      width: "100%", background: archivoVisor?.id === item.id ? "rgba(23,70,160,0.08)" : "#fff",
                      border: `1.5px solid ${archivoVisor?.id === item.id ? "rgba(23,70,160,0.3)" : "rgba(23,70,160,0.08)"}`,
                      borderRadius: 10, padding: vistaGrid ? "14px 12px" : "10px 14px",
                      textAlign: vistaGrid ? "center" : "left", cursor: "pointer",
                      display: "flex", flexDirection: vistaGrid ? "column" : "row", alignItems: "center", gap: vistaGrid ? 8 : 10,
                    }}>
                    {item.mimeType === "application/vnd.google-apps.folder" ? (
                      <svg width={vistaGrid ? 48 : 22} height={vistaGrid ? 38 : 18} viewBox="0 0 120 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0" y="18" width="120" height="77" rx="6" fill="#1746a0"/>
                        <rect x="0" y="10" width="48" height="22" rx="5" fill="#1746a0"/>
                        <rect x="2" y="20" width="116" height="73" rx="5" fill="#4984e0"/>
                        <rect x="8" y="34" width="104" height="4" rx="2" fill="rgba(255,255,255,0.3)"/>
                        <rect x="8" y="44" width="80" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
                        <rect x="8" y="54" width="90" height="4" rx="2" fill="rgba(255,255,255,0.2)"/>
                      </svg>
                    ) : (
                      <span style={{ fontSize: vistaGrid ? "28px" : "16px" }}>{MIME_ICONS[item.mimeType] || "📄"}</span>
                    )}
                    <div style={{ flex: vistaGrid ? "none" : 1, minWidth: 0 }}>
                      <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink)", lineHeight: 1.3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: vistaGrid ? "normal" : "nowrap", wordBreak: vistaGrid ? "break-word" : "normal" }}>{item.name}</div>
                      <div style={{ fontSize: "10.5px", color: "var(--ink-faint)", marginTop: 2 }}>{new Date(item.modifiedTime).toLocaleDateString("es-CL")}</div>
                    </div>
                  </button>
                  {/* Botón eliminar */}
                  <button type="button" onClick={(e) => { e.stopPropagation(); setModalEliminar(item); }}
                    style={{ position: "absolute", top: 6, right: 6, background: "rgba(192,57,43,0.08)", border: "none", borderRadius: 6, padding: "4px 5px", cursor: "pointer", opacity: 0, transition: "opacity 0.15s", display: "flex", alignItems: "center" }}
                    className="delete-btn">
                    <Trash2 size={11} style={{ color: "#c0392b" }} />
                  </button>
                </div>
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
                {loadingEditor && (
                  <span style={{ fontSize: "12px", color: "var(--ink-faint)", padding: "6px 12px" }}>Cargando editor...</span>
                )}
                <a href={`https://vargasyzuniga.onrender.com/api/onlyoffice/download/${archivoVisor.id}`} target="_blank" rel="noopener noreferrer"
                  style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(23,70,160,0.08)", color: "var(--accent-dark)", textDecoration: "none", padding: "6px 12px", borderRadius: 8, fontSize: "12px", fontWeight: 600 }}>
                  <Download size={12} /> Descargar
                </a>
                <button type="button" onClick={() => setModalEliminar(archivoVisor)}
                  style={{ display: "flex", alignItems: "center", gap: 4, background: "rgba(192,57,43,0.08)", color: "#c0392b", border: "none", padding: "6px 12px", borderRadius: 8, fontSize: "12px", fontWeight: 600, cursor: "pointer" }}>
                  <Trash2 size={12} /> Eliminar
                </button>
                <button type="button" onClick={() => setArchivoVisor(null)}
                  style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--ink-faint)", padding: "6px" }}>
                  <X size={16} />
                </button>
              </div>
            </div>
            {onlyofficeConfig ? (
              <OnlyOfficeEditor config={onlyofficeConfig} onClose={() => setOnlyofficeConfig(null)} />
            ) : loadingEditor ? (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, background: "#fff" }}>
                <div style={{ width: 40, height: 40, border: "3px solid rgba(23,70,160,0.15)", borderTop: "3px solid #1746a0", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                <div style={{ fontSize: "13px", color: "var(--ink-faint)" }}>Cargando editor...</div>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
            ) : null}
          </div>
        )}
      </div>

      <style>{`
        .portal-item:hover .delete-btn { opacity: 1 !important; }
      `}</style>
    </div>
  );
};

export default PortalOficina;
