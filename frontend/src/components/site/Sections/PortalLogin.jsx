import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, User, Eye, EyeOff } from "lucide-react";

const PortalLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("https://vargasyzuniga.onrender.com/api/portal/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem("portal_token", data.token);
        window.location.href = "/portal/oficina";
      } else {
        setError(data.message || "Credenciales incorrectas. Intente nuevamente.");
      }
    } catch {
      setError("Error de conexión. Por favor intente más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--cream)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      {/* Logo */}
      <Link to="/" style={{ textDecoration: "none", marginBottom: 40 }}>
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "22px",
            fontWeight: 700,
            color: "var(--ink)",
            letterSpacing: "0.05em",
            textAlign: "center",
          }}
        >
          VARGAS <span style={{ color: "var(--accent-dark)" }}>&amp;</span> ZÚÑIGA
        </div>
        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "10px",
            letterSpacing: "0.2em",
            color: "var(--ink-faint)",
            textTransform: "uppercase",
            textAlign: "center",
            marginTop: 4,
          }}
        >
          Portal Abogados
        </div>
      </Link>

      {/* Card */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: 18,
          padding: "40px 36px",
          width: "100%",
          maxWidth: 420,
          boxShadow: "0 4px 32px rgba(0,0,0,0.08)",
          border: "1px solid rgba(23,70,160,0.1)",
        }}
      >
        <h2
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: "18px",
            fontWeight: 600,
            color: "var(--ink)",
            margin: "0 0 8px",
            textAlign: "center",
          }}
        >
          Acceso Abogados
        </h2>
        <p
          style={{
            fontSize: "13px",
            color: "var(--ink-faint)",
            textAlign: "center",
            margin: "0 0 32px",
          }}
        >
          Ingrese sus credenciales para acceder al portal
        </p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--ink)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Correo electrónico
            </label>
            <div style={{ position: "relative" }}>
              <User
                size={15}
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--ink-faint)",
                }}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="correo@example.com"
                style={{
                  width: "100%",
                  padding: "11px 12px 11px 36px",
                  border: "1.5px solid rgba(23,70,160,0.2)",
                  borderRadius: 10,
                  fontSize: "14px",
                  color: "var(--ink)",
                  background: "#fafafa",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 24 }}>
            <label
              style={{
                display: "block",
                fontSize: "12px",
                fontWeight: 600,
                color: "var(--ink)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                marginBottom: 6,
              }}
            >
              Contraseña
            </label>
            <div style={{ position: "relative" }}>
              <Lock
                size={15}
                style={{
                  position: "absolute",
                  left: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--ink-faint)",
                }}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "11px 40px 11px 36px",
                  border: "1.5px solid rgba(23,70,160,0.2)",
                  borderRadius: 10,
                  fontSize: "14px",
                  color: "var(--ink)",
                  background: "#fafafa",
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 12,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--ink-faint)",
                  padding: 0,
                }}
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                background: "rgba(220,53,69,0.08)",
                border: "1px solid rgba(220,53,69,0.2)",
                borderRadius: 8,
                padding: "10px 14px",
                fontSize: "13px",
                color: "#c0392b",
                marginBottom: 16,
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "13px",
              background: loading ? "rgba(23,70,160,0.5)" : "var(--accent-dark)",
              color: "#fff",
              border: "none",
              borderRadius: 10,
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
      </div>

      {/* Back link */}
      <Link
        to="/"
        style={{
          marginTop: 24,
          fontSize: "13px",
          color: "var(--ink-faint)",
          textDecoration: "none",
        }}
      >
        ← Volver al sitio
      </Link>
    </div>
  );
};

export default PortalLogin;
