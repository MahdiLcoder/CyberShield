/**
 * CyberShield Academy - Progress Manager
 * Gestion de la progression globale via localStorage
 */
(function () {
  'use strict';

  const STORAGE_KEY = 'cybershield_progress';
  const MODULES_ORDER = ['phishing', 'passwords', 'ddos'];

  const Progress = {
    get() {
      try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
      } catch {
        return {};
      }
    },

    save(data) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.warn('localStorage unavailable', e);
      }
    },

    setModuleScore(moduleId, score, total) {
      const data = this.get();
      data[moduleId] = {
        score,
        total,
        percent: Math.round((score / total) * 100),
        completed: score >= Math.ceil(total * 0.6),
        completedAt: new Date().toISOString()
      };
      this.save(data);
      this.updateHeaderUI();
    },

    getModuleData(moduleId) {
      return this.get()[moduleId] || null;
    },

    getCompletedCount() {
      const data = this.get();
      return MODULES_ORDER.filter(id => data[id] && data[id].completed).length;
    },

    getGlobalPercent() {
      return Math.round((this.getCompletedCount() / MODULES_ORDER.length) * 100);
    },

    updateHeaderUI() {
      const completed = this.getCompletedCount();
      const total = MODULES_ORDER.length;
      const percent = this.getGlobalPercent();

      // Update all progress capsules on the page
      document.querySelectorAll('[data-progress-text]').forEach(el => {
        el.textContent = `${completed}/${total} (${percent}%)`;
      });
      document.querySelectorAll('[data-progress-bar]').forEach(el => {
        el.style.width = `${percent}%`;
      });
      // Show progress capsule if at least 1 module completed
      if (completed > 0) {
        document.querySelectorAll('[data-progress-capsule]').forEach(el => {
          el.classList.remove('hidden');
          el.style.display = 'flex';
        });
      }
    },

    getNextModule(currentId) {
      const idx = MODULES_ORDER.indexOf(currentId);
      if (idx === -1 || idx >= MODULES_ORDER.length - 1) return null;
      return MODULES_ORDER[idx + 1];
    }
  };

  // Initialize on load
  document.addEventListener('DOMContentLoaded', () => {
    Progress.updateHeaderUI();
  });

  window.CyberProgress = Progress;
})();

