/**
 * CyberShield Academy - Language Toggle (Enhanced)
 * Bilinguisme FR/AR avec persistance localStorage et RTL
 */
(function () {
  'use strict';

  const LANG_KEY = 'cybershield_lang';
  let currentLang = localStorage.getItem(LANG_KEY) || 'fr';

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);

    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // Apply RTL font adjustments
    if (lang === 'ar') {
      document.body.style.fontFamily = "'Inter', 'Segoe UI', Tahoma, sans-serif";
    } else {
      document.body.style.fontFamily = '';
    }

    // Translate elements with data-i18n attribute
    const t = window.TRANSLATIONS && window.TRANSLATIONS[lang];
    if (t) {
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (t[key]) {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = t[key];
          } else {
            el.textContent = t[key];
          }
        }
      });
      document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.dataset.i18nTitle;
        if (t[key]) el.title = t[key];
      });
    }

    // Update button active states
    document.querySelectorAll('[data-language]').forEach(btn => {
      btn.classList.toggle('is-active', btn.dataset.language === lang);
      if (btn.dataset.language === lang) {
        btn.style.fontWeight = '700';
        btn.style.color = '#0284c7';
      } else {
        btn.style.fontWeight = '';
        btn.style.color = '';
      }
    });

    // Notify voiceover engine
    if (window.Voiceover) {
      window.Voiceover.setLang(lang);
    }

    // Dispatch event for other modules
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { lang } }));
  }

  // Bind all language buttons
  function bindButtons() {
    document.querySelectorAll('[data-language]').forEach(button => {
      button.addEventListener('click', () => {
        applyLanguage(button.dataset.language);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    bindButtons();
    applyLanguage(currentLang);
  });

  window.CyberLang = { apply: applyLanguage, current: () => currentLang };
})();
