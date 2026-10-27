(function () {
  const storageKey = "cybershield-theme";
  const root = document.documentElement;

  function applyTheme(theme) {
    const isDark = theme === "dark";
    root.dataset.theme = isDark ? "dark" : "light";
    const isArabic = root.lang === "ar";
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const icon = button.querySelector("[data-theme-icon]");
      const label = button.querySelector("[data-theme-label]");
      button.setAttribute("aria-pressed", String(isDark));
      button.setAttribute("aria-label", isArabic
        ? (isDark ? "التبديل إلى الوضع الفاتح" : "التبديل إلى الوضع الداكن")
        : (isDark ? "Passer au mode clair" : "Passer au mode sombre"));
      if (icon) icon.textContent = isDark ? "light_mode" : "dark_mode";
      if (label) label.textContent = isArabic
        ? (isDark ? "فاتح" : "داكن")
        : (isDark ? "Clair" : "Sombre");
    });
  }

  let savedTheme = "light";
  try {
    savedTheme = localStorage.getItem(storageKey) === "dark" ? "dark" : "light";
  } catch (_) {
    // The toggle still works when browser storage is unavailable.
  }
  applyTheme(savedTheme);

  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-theme-toggle]");
    if (!button) return;
    const theme = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(theme);
    try {
      localStorage.setItem(storageKey, theme);
    } catch (_) {
      // Keep the current page usable when browser storage is unavailable.
    }
  });

  window.addEventListener("languagechange", () => applyTheme(root.dataset.theme));
})();
