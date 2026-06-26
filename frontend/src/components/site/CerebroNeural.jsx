const CerebroNeural = ({ width = 140, height = 120 }) => (
  <svg width={width} height={height} viewBox="0 0 140 120" fill="none" xmlns="http://www.w3.org/2000/svg"
    style={{ display: "block" }}>
    <style>{`
      @keyframes pulse-node {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
      @keyframes flow-line {
        0% { stroke-opacity: 0.15; }
        50% { stroke-opacity: 0.7; }
        100% { stroke-opacity: 0.15; }
      }
      .cn1 { animation: pulse-node 2.1s ease-in-out infinite; }
      .cn2 { animation: pulse-node 1.7s ease-in-out infinite 0.3s; }
      .cn3 { animation: pulse-node 2.4s ease-in-out infinite 0.6s; }
      .cn4 { animation: pulse-node 1.9s ease-in-out infinite 0.9s; }
      .cn5 { animation: pulse-node 2.2s ease-in-out infinite 1.2s; }
      .cn6 { animation: pulse-node 1.6s ease-in-out infinite 0.4s; }
      .cn7 { animation: pulse-node 2.0s ease-in-out infinite 0.8s; }
      .cn8 { animation: pulse-node 1.8s ease-in-out infinite 1.1s; }
      .cl1 { animation: flow-line 2.3s ease-in-out infinite; }
      .cl2 { animation: flow-line 1.8s ease-in-out infinite 0.5s; }
      .cl3 { animation: flow-line 2.6s ease-in-out infinite 0.2s; }
      .cl4 { animation: flow-line 2.0s ease-in-out infinite 0.7s; }
      .cl5 { animation: flow-line 1.5s ease-in-out infinite 1.0s; }
    `}</style>

    {/* Silueta cerebro */}
    <path d="M70 8 C52 8,36 18,30 32 C22 32,14 38,14 48 C14 56,18 62,24 66 C20 70,18 76,20 82 C22 90,30 94,38 92 C42 98,50 102,58 102 C62 106,66 108,70 108 C74 108,78 106,82 102 C90 102,98 98,102 92 C110 94,118 90,120 82 C122 76,120 70,116 66 C122 62,126 56,126 48 C126 38,118 32,110 32 C104 18,88 8,70 8Z"
      fill="none" stroke="rgba(122,184,245,0.25)" strokeWidth="1.5"/>
    <path d="M70 12 C68 40,68 70,70 108" stroke="rgba(122,184,245,0.15)" strokeWidth="0.8" strokeDasharray="3,3"/>

    {/* Pliegues izquierda */}
    <path d="M30 45 C38 42,46 44,52 40" stroke="rgba(122,184,245,0.2)" strokeWidth="1" fill="none" strokeLinecap="round"/>
    <path d="M24 60 C32 55,44 58,52 54" stroke="rgba(122,184,245,0.2)" strokeWidth="1" fill="none" strokeLinecap="round"/>
    <path d="M26 75 C36 70,48 73,56 70" stroke="rgba(122,184,245,0.2)" strokeWidth="1" fill="none" strokeLinecap="round"/>
    <path d="M35 88 C44 84,54 87,60 85" stroke="rgba(122,184,245,0.2)" strokeWidth="1" fill="none" strokeLinecap="round"/>

    {/* Pliegues derecha */}
    <path d="M110 45 C102 42,94 44,88 40" stroke="rgba(122,184,245,0.2)" strokeWidth="1" fill="none" strokeLinecap="round"/>
    <path d="M116 60 C108 55,96 58,88 54" stroke="rgba(122,184,245,0.2)" strokeWidth="1" fill="none" strokeLinecap="round"/>
    <path d="M114 75 C104 70,92 73,84 70" stroke="rgba(122,184,245,0.2)" strokeWidth="1" fill="none" strokeLinecap="round"/>
    <path d="M105 88 C96 84,86 87,80 85" stroke="rgba(122,184,245,0.2)" strokeWidth="1" fill="none" strokeLinecap="round"/>

    {/* Líneas de conexión izquierda */}
    <line className="cl1" x1="36" y1="40" x2="52" y2="55" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl2" x1="52" y1="55" x2="40" y2="70" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl3" x1="40" y1="70" x2="55" y2="82" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl1" x1="52" y1="55" x2="62" y2="45" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl4" x1="62" y1="45" x2="58" y2="30" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl2" x1="52" y1="55" x2="48" y2="72" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl5" x1="48" y1="72" x2="55" y2="82" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl3" x1="36" y1="40" x2="42" y2="28" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl1" x1="55" y1="82" x2="62" y2="95" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl4" x1="40" y1="70" x2="30" y2="62" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl2" x1="62" y1="45" x2="66" y2="60" stroke="#5ba7e5" strokeWidth="0.8"/>

    {/* Centro */}
    <line className="cl3" x1="66" y1="60" x2="74" y2="60" stroke="#a0d4ff" strokeWidth="1"/>
    <line className="cl5" x1="62" y1="95" x2="70" y2="108" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl1" x1="78" y1="95" x2="70" y2="108" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl2" x1="58" y1="30" x2="70" y2="22" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl4" x1="82" y1="30" x2="70" y2="22" stroke="#7ab8f5" strokeWidth="0.8"/>

    {/* Líneas de conexión derecha */}
    <line className="cl2" x1="104" y1="40" x2="88" y2="55" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl1" x1="88" y1="55" x2="100" y2="70" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl4" x1="100" y1="70" x2="85" y2="82" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl3" x1="88" y1="55" x2="78" y2="45" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl5" x1="78" y1="45" x2="82" y2="30" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl1" x1="88" y1="55" x2="92" y2="72" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl2" x1="92" y1="72" x2="85" y2="82" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl4" x1="104" y1="40" x2="98" y2="28" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl3" x1="85" y1="82" x2="78" y2="95" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl5" x1="100" y1="70" x2="110" y2="62" stroke="#7ab8f5" strokeWidth="0.8"/>
    <line className="cl1" x1="78" y1="45" x2="74" y2="60" stroke="#5ba7e5" strokeWidth="0.8"/>

    {/* Nodos izquierda */}
    <circle className="cn1" cx="36" cy="40" r="2.5" fill="#a0d4ff"/>
    <circle className="cn2" cx="52" cy="55" r="3" fill="#7ab8f5"/>
    <circle className="cn3" cx="40" cy="70" r="2.5" fill="#a0d4ff"/>
    <circle className="cn4" cx="55" cy="82" r="2" fill="#7ab8f5"/>
    <circle className="cn5" cx="62" cy="45" r="2" fill="#c0e4ff"/>
    <circle className="cn6" cx="48" cy="72" r="1.8" fill="#7ab8f5"/>
    <circle className="cn7" cx="42" cy="28" r="2" fill="#a0d4ff"/>
    <circle className="cn8" cx="30" cy="62" r="1.8" fill="#7ab8f5"/>
    <circle className="cn1" cx="58" cy="30" r="2" fill="#c0e4ff"/>
    <circle className="cn3" cx="62" cy="95" r="2" fill="#7ab8f5"/>

    {/* Nodos centro */}
    <circle cx="70" cy="22" r="2.5" fill="#e0f4ff"/>
    <circle className="cn2" cx="66" cy="60" r="3.5" fill="#5ba7e5"/>
    <circle className="cn4" cx="74" cy="60" r="3.5" fill="#5ba7e5"/>
    <circle className="cn6" cx="70" cy="108" r="2" fill="#7ab8f5"/>

    {/* Nodos derecha */}
    <circle className="cn2" cx="104" cy="40" r="2.5" fill="#a0d4ff"/>
    <circle className="cn1" cx="88" cy="55" r="3" fill="#7ab8f5"/>
    <circle className="cn4" cx="100" cy="70" r="2.5" fill="#a0d4ff"/>
    <circle className="cn3" cx="85" cy="82" r="2" fill="#7ab8f5"/>
    <circle className="cn7" cx="78" cy="45" r="2" fill="#c0e4ff"/>
    <circle className="cn5" cx="92" cy="72" r="1.8" fill="#7ab8f5"/>
    <circle className="cn8" cx="98" cy="28" r="2" fill="#a0d4ff"/>
    <circle className="cn2" cx="110" cy="62" r="1.8" fill="#7ab8f5"/>
    <circle className="cn6" cx="82" cy="30" r="2" fill="#c0e4ff"/>
    <circle className="cn1" cx="78" cy="95" r="2" fill="#7ab8f5"/>

    {/* Halos de brillo */}
    <circle cx="36" cy="40" r="5" fill="rgba(160,212,255,0.15)"/>
    <circle cx="52" cy="55" r="6" fill="rgba(91,167,229,0.12)"/>
    <circle cx="88" cy="55" r="6" fill="rgba(91,167,229,0.12)"/>
    <circle cx="104" cy="40" r="5" fill="rgba(160,212,255,0.15)"/>
    <circle cx="66" cy="60" r="7" fill="rgba(91,167,229,0.15)"/>
    <circle cx="74" cy="60" r="7" fill="rgba(91,167,229,0.15)"/>
  </svg>
);

export default CerebroNeural;
