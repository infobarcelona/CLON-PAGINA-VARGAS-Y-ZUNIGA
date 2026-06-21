import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div
      data-testid="privacy-policy-page"
      style={{
        height: "100vh",
        overflowY: "auto",
        WebkitOverflowScrolling: "touch",
        background: "var(--paper)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header simple */}
      <div className="topbar">
        <div className="container-x px-5 md:px-10 lg:px-14 py-2 flex items-center justify-between">
          <Link
            to="/"
            data-testid="privacy-back-top"
            className="inline-flex items-center gap-2 transition-colors"
            style={{ color: "rgba(255,255,255,0.92)", textDecoration: "none" }}
          >
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: 3,
                height: 14,
                background: "var(--accent)",
                transform: "skewX(-18deg)",
                borderRadius: 1,
              }}
            />
            <span style={{ fontSize: "12.5px", fontWeight: 500 }}>Volver al sitio</span>
          </Link>
        </div>
      </div>

      <div className="main-nav">
        <div className="container-x px-5 md:px-10 lg:px-14 py-3 lg:py-4 flex items-center">
          <Link to="/" data-testid="privacy-logo-link" className="flex items-center gap-3 group flex-shrink-0" style={{ textDecoration: "none" }}>
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: 6,
                height: 42,
                background: "var(--accent)",
                transform: "skewX(-18deg)",
                borderRadius: 2,
                flexShrink: 0,
              }}
            />
            <div className="leading-tight text-left">
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontWeight: 600,
                  fontSize: "20px",
                  color: "var(--ink)",
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                Vargas <span style={{ color: "var(--accent)" }}>&amp;</span> Zúñiga
              </div>
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "9.5px",
                  letterSpacing: "0.3em",
                  color: "var(--ink-faint)",
                  textTransform: "uppercase",
                  marginTop: "4px",
                  fontWeight: 700,
                }}
              >
                Abogados <span style={{ color: "var(--accent)" }}>·</span> Temuco
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Contenido */}
      <div className="container-x px-5 md:px-10 lg:px-14 py-12 md:py-16" style={{ flex: 1 }}>
        <div style={{ maxWidth: 760 }}>
          <div className="eyebrow">Documento legal</div>
          <h1
            className="display mt-4"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
            data-testid="privacy-title"
          >
            <span className="slash-red mr-1">/</span>Política de Privacidad
          </h1>
          <p style={{ color: "var(--ink-mute)", fontSize: "13px", marginTop: 10 }}>
            Última actualización: junio de 2026
          </p>

          <div
            className="mt-10"
            style={{
              fontSize: "14.5px",
              lineHeight: 1.8,
              color: "var(--ink-soft)",
            }}
          >
            <p style={{ marginBottom: 20 }}>
              Vargas &amp; Zúñiga Abogados ("el Estudio") respeta la privacidad de quienes
              visitan este sitio web y utilizan nuestros canales de contacto, incluyendo
              nuestra asistente virtual. Esta política describe qué información recopilamos,
              cómo la usamos y qué derechos tiene usted sobre sus datos personales, en
              conformidad con la Ley N° 19.628 sobre Protección de la Vida Privada.
            </p>

            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", color: "var(--ink)", marginTop: 28, marginBottom: 10 }}>
              1. Información que recopilamos
            </h2>
            <p style={{ marginBottom: 14 }}>
              Cuando usted se contacta con nosotros a través de nuestra asistente virtual o
              de otros canales del sitio, podemos recopilar: su nombre, número de teléfono,
              correo electrónico, el área legal de su interés, una descripción general de su
              situación o consulta, y la fecha y hora en que solicita ser contactado o
              agendar una reunión.
            </p>

            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", color: "var(--ink)", marginTop: 28, marginBottom: 10 }}>
              2. Finalidad del tratamiento de sus datos
            </h2>
            <p style={{ marginBottom: 14 }}>
              Utilizamos su información exclusivamente para: responder a su consulta,
              coordinar y confirmar reuniones con nuestros abogados, y entregarle
              orientación general sobre los servicios del Estudio. No utilizamos sus datos
              para fines distintos a los aquí descritos.
            </p>

            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", color: "var(--ink)", marginTop: 28, marginBottom: 10 }}>
              3. No venta ni cesión de datos a terceros
            </h2>
            <p style={{ marginBottom: 14 }}>
              El Estudio no vende, arrienda ni comparte su información personal con
              terceros para fines comerciales o publicitarios. Sus datos solo son
              accesibles por el personal del Estudio involucrado en la atención de su
              consulta, y por los proveedores tecnológicos estrictamente necesarios para
              operar este sitio y nuestra asistente virtual, quienes están obligados a
              resguardar su confidencialidad.
            </p>

            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", color: "var(--ink)", marginTop: 28, marginBottom: 10 }}>
              4. Asistente virtual
            </h2>
            <p style={{ marginBottom: 14 }}>
              Nuestra asistente virtual utiliza inteligencia artificial para mantener una
              conversación natural y recopilar la información necesaria para orientar su
              consulta. Las conversaciones quedan registradas con el único fin de dar
              continuidad a su atención y mejorar nuestro servicio. La asistente virtual no
              entrega asesoría legal vinculante; su función es de orientación y
              coordinación inicial.
            </p>

            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", color: "var(--ink)", marginTop: 28, marginBottom: 10 }}>
              5. Cookies y tecnologías similares
            </h2>
            <p style={{ marginBottom: 14 }}>
              Este sitio puede utilizar cookies técnicas básicas para su correcto
              funcionamiento, como recordar el idioma seleccionado. No utilizamos cookies
              de seguimiento publicitario ni compartimos información de navegación con
              redes de publicidad de terceros.
            </p>

            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", color: "var(--ink)", marginTop: 28, marginBottom: 10 }}>
              6. Sus derechos (Derechos ARCO)
            </h2>
            <p style={{ marginBottom: 14 }}>
              Usted tiene derecho a acceder, rectificar, cancelar y oponerse al tratamiento
              de sus datos personales en nuestro poder. Para ejercer cualquiera de estos
              derechos, puede contactarnos directamente a través de los datos indicados al
              final de este documento.
            </p>

            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", color: "var(--ink)", marginTop: 28, marginBottom: 10 }}>
              7. Seguridad de la información
            </h2>
            <p style={{ marginBottom: 14 }}>
              Adoptamos medidas técnicas y organizativas razonables para proteger su
              información personal frente a accesos no autorizados, pérdida o uso
              indebido.
            </p>

            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", color: "var(--ink)", marginTop: 28, marginBottom: 10 }}>
              8. Cambios a esta política
            </h2>
            <p style={{ marginBottom: 14 }}>
              Esta política puede actualizarse periódicamente. La fecha de la última
              actualización se encuentra al inicio de este documento.
            </p>

            <h2 style={{ fontFamily: "'Cinzel', serif", fontSize: "16px", color: "var(--ink)", marginTop: 28, marginBottom: 10 }}>
              9. Contacto
            </h2>
            <p style={{ marginBottom: 6 }}>
              Para consultas sobre esta política o el tratamiento de sus datos personales,
              puede contactarnos en:
            </p>
            <p style={{ marginBottom: 4 }}>Vargas &amp; Zúñiga Abogados</p>
            <p style={{ marginBottom: 4 }}>Antonio Varas 687, of. 1010, Torre Sinergia, Temuco, Chile</p>
            <p style={{ marginBottom: 30 }}>
              <a href="mailto:avargas@vargasyzuniga.cl" style={{ color: "var(--accent)" }}>
                avargas@vargasyzuniga.cl
              </a>
            </p>
          </div>

          <Link
            to="/"
            data-testid="privacy-back-bottom"
            className="btn-primary mt-4 inline-flex"
            style={{ textDecoration: "none" }}
          >
            <ArrowLeft size={13} strokeWidth={1.7} />
            <span>Volver al sitio</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
