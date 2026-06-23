import { useEffect, useRef } from "react";

const ONLYOFFICE_URL = "https://onlyoffice-vyz.onrender.com";

const OnlyOfficeEditor = ({ config, onClose }) => {
  const editorRef = useRef(null);
  const instanceRef = useRef(null);

  useEffect(() => {
    const containerId = "onlyoffice-editor-container";

    const initEditor = () => {
      if (window.DocsAPI && editorRef.current) {
        if (instanceRef.current) {
          instanceRef.current.destroyEditor();
        }
        instanceRef.current = new window.DocsAPI.DocEditor(containerId, config);
      }
    };

    const existingScript = document.getElementById("onlyoffice-api-script");
    if (existingScript) {
      initEditor();
    } else {
      const script = document.createElement("script");
      script.id = "onlyoffice-api-script";
      script.src = `${ONLYOFFICE_URL}/web-apps/apps/api/documents/api.js`;
      script.onload = initEditor;
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
