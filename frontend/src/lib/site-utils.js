export const openChat = () => {
  const launcher = document.getElementById("vyz-widget-launcher");
  const panel = document.getElementById("vyz-widget-panel");
  if (panel && panel.classList.contains("vyz-open")) return;
  if (launcher) { launcher.click(); return; }
  let attempts = 0;
  const tryOpen = () => {
    attempts += 1;
    const l = document.getElementById("vyz-widget-launcher");
    if (l) l.click();
    else if (attempts < 12) setTimeout(tryOpen, 300);
  };
  tryOpen();
};

export const buildQrUrl = (data, size = 260) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=0&data=${encodeURIComponent(
    data
  )}&bgcolor=ffffff&color=1c1c1a`;
