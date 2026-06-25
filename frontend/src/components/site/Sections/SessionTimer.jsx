import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const INACTIVIDAD_MS = 3 * 60 * 1000; // 3 minutos
const CUENTA_REGRESIVA_S = 30; // 30 segundos

export default function SessionTimer() {
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [cuenta, setCuenta] = useState(CUENTA_REGRESIVA_S);
  const timerInactividad = useRef(null);
  const timerCuenta = useRef(null);
  const navigate = useNavigate();

  const cerrarSesion = useCallback(() => {
    sessionStorage.removeItem("portal_token");
    navigate("/portal");
  }, [navigate]);

  const reiniciarTimer = useCallback(() => {
    if (mostrarAviso) return; // No reiniciar si ya está mostrando el aviso
    clearTimeout(timerInactividad.current);
    timerInactividad.current = setTimeout(() => {
      setMostrarAviso(true);
      setCuenta(CUENTA_REGRESIVA_S);
    }, INACTIVIDAD_MS);
  }, [mostrarAviso]);

  const mantenerSesion = () => {
    setMostrarAviso(false);
    clearInterval(timerCuenta.current);
    setCuenta(CUENTA_REGRESIVA_S);
    reiniciarTimer();
  };

  // Detectar actividad del usuario
  useEffect(() => {
    const eventos = ["mousemove", "mousedown", "keydown", "touchstart", "scroll", "click"];
    eventos.forEach(ev => window.addEventListener(ev, reiniciarTimer, true));
    reiniciarTimer(); // Iniciar al montar
    return () => {
      eventos.forEach(ev => window.removeEventListener(ev, reiniciarTimer, true));
      clearTimeout(timerInactividad.current);
      clearInterval(timerCuenta.current);
    };
  }, [reiniciarTimer]);

  // Cuenta regresiva cuando aparece el aviso
  useEffect(() => {
    if (!mostrarAviso) return;
    timerCuenta.current = setInterval(() => {
      setCuenta(prev => {
        if (prev <= 1) {
          clearInterval(timerCuenta.current);
          cerrarSesion();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerCuenta.current);
  }, [mostrarAviso, cerrarSesion]);

  if (!mostrarAviso) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
      zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center"
    }}>
      <div style={{
        background: "#fff", borderRadius: 16, padding: "36px 40px",
        maxWidth: 400, width: "90%", textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
      }}>
        {/* Ícono */}
        <div style={{
          width: 64, height: 64, borderRadius: "50%",
          background: "rgba(23,70,160,0.08)", margin: "0 auto 20px",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 28
        }}>🔒</div>

        {/* Título */}
        <h2 style={{
          fontSize: 18, fontWeight: 700, color: "#1a1a2e",
          margin: "0 0 10px"
        }}>Sesión por expirar</h2>

        {/* Descripción */}
        <p style={{
          fontSize: 14, color: "#666", margin: "0 0 24px", lineHeight: 1.5
        }}>
          Por inactividad, tu sesión se cerrará automáticamente en
        </p>

        {/* Cuenta regresiva */}
        <div style={{
          fontSize: 48, fontWeight: 800, color: cuenta <= 10 ? "#e53e3e" : "#1746a0",
          margin: "0 0 24px", lineHeight: 1,
          transition: "color 0.3s"
        }}>
          {cuenta}s
        </div>

        {/* Botones */}
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button
            onClick={cerrarSesion}
            style={{
              padding: "10px 20px", borderRadius: 8, border: "1.5px solid rgba(23,70,160,0.2)",
              background: "transparent", color: "#1746a0", fontWeight: 600,
              fontSize: 14, cursor: "pointer"
            }}>
            Cerrar sesión
          </button>
          <button
            onClick={mantenerSesion}
            style={{
              padding: "10px 24px", borderRadius: 8, border: "none",
              background: "#1746a0", color: "#fff", fontWeight: 600,
              fontSize: 14, cursor: "pointer"
            }}>
            Mantener sesión
          </button>
        </div>
      </div>
    </div>
  );
}
