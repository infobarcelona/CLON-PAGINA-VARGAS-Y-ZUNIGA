import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, FolderOpen, Clock, User } from "lucide-react";

const PortalOficina = () => {
  const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [loading, setLoading] = useState(true);
  const [ahora, setAhora] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("portal_token");
    if (!token) {
      navigate("/portal");
      return;
    }
    // Verificar token con el backend
    fetch("https://vargasyzuniga.onrender.com/api/portal/verify", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        if (!data.ok) {
          localStorage.removeItem("portal_token");
          navigate("/portal");
        } else {
          setNombre(data.nombre);
          // Fecha y hora actual
          const now = new Date();
          setAhora(
            now.toLocaleDateString("es-CL", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            }) +
              " — " +
              now.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })
          );
          setLoading(false);
        }
      })
      .catch(() => {
        localStorage.removeItem("portal_token");
        navigate("/portal");
      });
  }, [navigate]);

  const cerrarSesion = () => {
    localStorage.removeItem("portal_token");
    navigate("/portal");
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "var(--cream)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ fontSize: "14px", color: "var(--ink-faint)" }}>Verificando acceso...</div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--cream)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header del portal */}
      <div
        style={{
          background: "var(--ink)",
          padding: "14px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "15px",
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.05em",
            }}
          >
            VARGAS <span style={{ color: "var(--accent)" }}>&amp;</span> ZÚÑIGA
          </span>
        </Link>
        <button
          type="button"
          onClick={cerrarSesion}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "rgba(255,255,255,0.7)",
            padding: "6px 14px",
            borderRadius: 8,
            fontSize: "12.5px",
            cursor: "pointer",
          }}
        >
          <LogOut size={13} />
          Cerrar sesión
        </button>
      </div>

      {/* Contenido */}
      <div
        style={{
          flex: 1,
          padding: "48px 32px",
          maxWidth: 800,
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Bienvenida */}
        <div
          style={{
            background: "linear-gradient(135deg, #4984e0 0%, #1746a0 100%)",
            borderRadius: 16,
            padding: "28px 32px",
            marginBottom: 28,
            color: "#fff",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <User size={18} style={{ opacity: 0.8 }} />
            <span style={{ fontSize: "13px", opacity: 0.8, letterSpacing: "0.05em", textTransform: "uppercase" }}>
              Portal Abogados
            </span>
          </div>
          <h2
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "22px",
              fontWeight: 600,
              margin: "0 0 8px",
            }}
          >
            Bienvenido, {nombre.split(" ")[0]}
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: 6, opacity: 0.75 }}>
            <Clock size={13} />
            <span style={{ fontSize: "12.5px" }}>{ahora}</span>
          </div>
        </div>

        {/* Card de acceso a documentos */}
        <div
          style={{
            background: "#fff",
            borderRadius: 16,
            padding: "28px 32px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
            border: "1px solid rgba(23,70,160,0.08)",
            marginBottom: 20,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                background: "rgba(23,70,160,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FolderOpen size={20} style={{ color: "var(--accent-dark)" }} />
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--ink)" }}>
                Carpeta de Causas
              </div>
              <div style={{ fontSize: "12.5px", color: "var(--ink-faint)" }}>
                Acceso a los documentos del estudio
              </div>
            </div>
          </div>
          <p style={{ fontSize: "13.5px", color: "var(--ink-mute)", lineHeight: 1.6, margin: "16px 0 20px" }}>
            Haga clic en el botón para acceder a la carpeta de causas del estudio. 
            Recuerde mantener la confidencialidad de los documentos.
          </p>
          <button
            type="button"
            onClick={() => window.open("LINK_ICLOUD_AQUI", "_blank")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg, #4984e0 0%, #1746a0 100%)",
              color: "#fff",
              border: "none",
              padding: "12px 24px",
              borderRadius: 10,
              fontSize: "13.5px",
              fontWeight: 700,
              boxShadow: "0 2px 8px rgba(23,70,160,0.3)",
              cursor: "pointer",
            }}
          >
            <FolderOpen size={15} />
            Acceder a Causas
          </button>
        </div>

        {/* Nota de confidencialidad */}
        <p
          style={{
            fontSize: "12px",
            color: "var(--ink-faint)",
            textAlign: "center",
            lineHeight: 1.6,
          }}
        >
          El acceso a este portal queda registrado. Los documentos son confidenciales y de uso exclusivo del estudio.
        </p>
      </div>
    </div>
  );
};

export default PortalOficina;
