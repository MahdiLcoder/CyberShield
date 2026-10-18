/**
 * CyberShield Academy - Modules Catalog & Card State Sync
 */
document.addEventListener("DOMContentLoaded", () => {
  // Category filter
  document.querySelectorAll("[data-category-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.categoryFilter;
      const cards = document.querySelectorAll(".module-card");
      const buttons = document.querySelectorAll(".filter-chip");

      buttons.forEach((filterButton) => {
        const isActive = filterButton.dataset.category === category;
        filterButton.classList.toggle("is-active", isActive);
      });

      cards.forEach((card) => {
        card.style.display =
          category === "all" || card.dataset.cat === category ? "flex" : "none";
      });
    });
  });

  // Dynamic module card state sync with localStorage
  function syncModuleCards() {
    if (!window.CyberProgress) return;
    const progressData = window.CyberProgress.get();

    ['phishing', 'passwords', 'ddos'].forEach((moduleId) => {
      const modProgress = progressData[moduleId];
      const btn = document.querySelector(`[data-module-card-btn="${moduleId}"]`);
      const badge = document.querySelector(`[data-module-badge="${moduleId}"]`);

      if (modProgress && modProgress.completed) {
        if (btn) {
          btn.className = "modules-footer-cta-navigation-link";
          btn.innerHTML = `
            <span class="modules-footer-cta-icon material-symbols-outlined">replay</span>
            <span>Revoir le module (${modProgress.percent}%)</span>
          `;
        }
        if (badge) {
          badge.innerHTML = `
            <span class="modules-card-header-and-badge-status-badge-3"></span>
            Complété • ${modProgress.percent}%
          `;
        }
      } else {
        if (btn) {
          btn.className = "modules-footer-cta-navigation-link-2";
          btn.innerHTML = `
            <span>Commencer le module</span>
            <span class="modules-footer-cta-icon material-symbols-outlined">arrow_forward</span>
          `;
        }
        if (badge) {
          badge.innerHTML = `
            <span class="modules-card-header-and-badge-status-badge-3" style="background:#94a3b8;"></span>
            Non commencé • 0%
          `;
        }
      }
    });
  }

  syncModuleCards();
});
