import { useEffect, useRef } from "react";

const ONLYOFFICE_URL = "https://onlyoffice-vyz.onrender.com";

const OnlyOfficeEditor = ({ config, onClose }) => {
  const editorRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    const containerId = "onlyoffice-editor-container";

    // Destruir instancia anterior y limpiar el contenedor
    if (instanceRef.current) {
      try { instanceRef.current.destroyEditor(); } catch {}
      instanceRef.current = null;
    }
    const container = document.getElementById(containerId);
    if (container) container.innerHTML = "";

    const initEditor = () => {
      if (window.DocsAPI) {
        const container = document.getElementById(containerId);
        if (container) container.innerHTML = "";
        instanceRef.current = new window.DocsAPI.DocEditor(containerId, {
          ...config,
          document: {
            ...config.document,
            key: config.document.key + "_" + Date.now(),
          }
        });
      }
    };

    const existingScript = document.getElementById("onlyoffice-api-script");
    if (existingScript) {
      setTimeout(initEditor, 100);
    } else {
      const script = document.createElement("script");
      script.id = "onlyoffice-api-script";
      script.src = `${ONLYOFFICE_URL}/web-apps/apps/api/documents/api.js`;
      script.onload = () => setTimeout(initEditor, 100);
      script.onerror = () => console.error("[OnlyOffice] Error cargando API");
      document.head.appendChild(script);
    }

    return () => {
      if (instanceRef.current) {
        try { instanceRef.current.destroyEditor(); } catch {}
        instanceRef.current = null;
      }
    };
  }, [config]);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <div
        id="onlyoffice-editor-container"
        ref={editorRef}
        style={{ flex: 1, width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default OnlyOfficeEditor;
