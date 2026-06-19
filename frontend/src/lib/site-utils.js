export const openChat = () => {
  const launcher = document.getElementById("vyz-widget-launcher");
  const panel = document.getElementById("vyz-widget-panel");
  if (panel && panel.classList.contains("vyz-open")) return;
  if (launcher) {
    launcher.click();
    return;
  }
  let attempts = 0;
  const tryOpen = () => {
    attempts += 1;
    const l = document.getElementById("vyz-widget-launcher");
    if (l) l.click();
    else if (attempts < 12) setTimeout(tryOpen, 300);
  };
  tryOpen();
};

export const scrollToId = (id) => {
  const el = document.querySelector(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
};
