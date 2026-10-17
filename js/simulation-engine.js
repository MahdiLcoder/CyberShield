/**
 * CyberShield Academy - Simulation Engine
 * Moteur d'animation pas à pas avec audio et voix off
 */
(function () {
  'use strict';

  /* ─── State ────────────────────────────────────────────────── */
  let state = {
    moduleId: null,
    module: null,
    currentStep: 0,
    totalSteps: 4,
    isPlaying: false,
    playTimer: null,
    stepDuration: 5000 // ms per auto-step
  };

  /* ─── DOM refs (resolved on DOMContentLoaded) ──────────────── */
  let dom = {};

  /* ─── URL param helper ─────────────────────────────────────── */
  function getModuleParam() {
    const params = new URLSearchParams(window.location.search);
    return params.get('module') || 'phishing';
  }

  /* ─── Init ─────────────────────────────────────────────────── */
  function init() {
    state.moduleId = getModuleParam();
    state.module = window.MODULES && window.MODULES[state.moduleId];

    if (!state.module) {
      console.warn('[SimEngine] Module not found:', state.moduleId);
      return;
    }
    state.totalSteps = state.module.steps.length;

    resolveDOM();
    bindEvents();
    updatePageMeta();
    renderStep(0);
    updateProgressCapsule();
  }

  function resolveDOM() {
    dom = {
      // Playback buttons (there may be multiple with same class)
      btnPrev: document.querySelector('[title="Étape précédente"]'),
      btnPlay: document.querySelector('.simulation-playback-navigation-buttons-primary-action'),
      btnNext: document.querySelector('[title="Étape suivante"]'),
      btnReplay: document.querySelector('[title="Recommencer la simulation"]'),
      btnVoiceover: document.querySelector('.simulation-voiceover-status-pill-button'),

      // Step indicators
      stepCards: [
        document.querySelector('.simulation-step-1-content-card'),
        document.querySelector('.simulation-step-2-content-card'),
        document.querySelector('.simulation-step-3-content-card'),
        document.querySelector('.simulation-step-4-content-card')
      ],
      stepBadges: [
        document.querySelector('.simulation-step-1-content-card-2'),
        document.querySelector('.simulation-step-2-content-card-2'),
        document.querySelector('.simulation-step-3-content-card-2'),
        document.querySelector('.simulation-step-4-content-card-2')
      ],
      stepTitles: [
        document.querySelector('.simulation-step-1-eyebrow'),
        document.querySelector('.simulation-step-2-eyebrow'),
        document.querySelector('.simulation-step-3-eyebrow'),
        document.querySelector('.simulation-step-4-eyebrow')
      ],
      stepSubtitles: [
        document.querySelector('.simulation-step-1-inline-text'),
        document.querySelector('.simulation-step-2-inline-text'),
        document.querySelector('.simulation-step-3-inline-text'),
        document.querySelector('.simulation-step-4-inline-text')
      ],

      // Content panels
      pageTitle: document.querySelector('.simulation-breadcrumb-navigation-page-title'),
      rightPanelTitle: document.querySelector('.simulation-section-comment-a-marche-section-title'),
      rightPanelBody: document.querySelector('.simulation-section-comment-a-marche-body-copy'),
      pillBox1Text: document.querySelector('.simulation-anatomical-breakdown-pill-box-inline-text'),
      pillBox2Text: document.querySelectorAll('.simulation-anatomical-breakdown-pill-box-inline-text')[1],
      pillBox1Label: document.querySelector('.simulation-anatomical-breakdown-pill-box-eyebrow'),
      pillBox2Label: document.querySelectorAll('.simulation-anatomical-breakdown-pill-box-eyebrow')[1],

      // Play icon
      playIcon: document.querySelector('.simulation-playback-navigation-buttons-icon-2'),

      // Progress fill
      progressFill: document.querySelector('.simulation-progress-fill-content-card'),

      // Timer display
      timerDisplay: document.querySelector('.simulation-player-top-status-header-inline-text-2'),

      // Quiz button
      btnQuiz: document.querySelector('.simulation-validation-button-content-link'),

      // Voiceover status text
      voiceoverStatus: document.querySelector('.simulation-voiceover-status-pill-inline-text-2'),

      // Bilingual audio switcher
      btnLangFR: document.querySelector('.simulation-bilingual-audio-track-switcher-button'),
      btnLangAR: document.querySelector('.simulation-bilingual-audio-track-switcher-button-2'),

      // Breadcrumb dynamic text
      breadcrumbModule: document.querySelector('.simulation-breadcrumb-navigation-inline-text'),

      // Scenario header text
      scenarioText: document.querySelector('.simulation-player-top-status-header-eyebrow')
    };
  }

  /* ─── Page Meta Update ─────────────────────────────────────── */
  function updatePageMeta() {
    if (!state.module) return;
    document.title = `CyberShield Academy - ${state.module.title}`;
    if (dom.breadcrumbModule) {
      dom.breadcrumbModule.textContent = `Module ${['phishing','passwords','ddos'].indexOf(state.moduleId)+1} : ${state.module.title}`;
    }
    if (dom.pageTitle) {
      dom.pageTitle.textContent = `Simulation interactive : ${state.module.title}`;
    }
    // Update quiz link
    if (dom.btnQuiz) {
      dom.btnQuiz.href = `quiz.html?module=${state.moduleId}`;
    }
    // Module-specific content
    renderModuleContent();
  }

  /* ─── Module-specific interactive content ──────────────────── */
  function renderModuleContent() {
    const emailFrame = document.querySelector('.simulation-simulated-desktop-email-client-ui-content-stack');
    const labSection = document.querySelector('.simulation-left-column-simulation-stage-and-int-content-stack');

    if (state.moduleId === 'passwords') {
      injectPasswordLab(labSection);
    } else if (state.moduleId === 'ddos') {
      injectDDoSAnimation(labSection);
    }
    // phishing: keep existing email markup
  }

  /* ─── Password Strength Lab ────────────────────────────────── */
  function injectPasswordLab(container) {
    const playerFrame = container && container.querySelector('.simulation-outer-simulation-player-frame-content-card');
    if (!playerFrame) return;

    const emailUI = playerFrame.querySelector('.simulation-simulated-desktop-email-client-ui-content-stack');
    if (!emailUI) return;

    emailUI.innerHTML = `
      <div style="padding:1.5rem;display:flex;flex-direction:column;gap:1.25rem;">
        <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:0.75rem;padding:1.25rem;">
          <h3 style="font-size:14px;font-weight:700;color:#0f172a;margin-bottom:0.75rem;display:flex;align-items:center;gap:0.5rem;">
            <span class="material-symbols-outlined" style="font-size:18px;color:#0284c7;">lock</span>
            Testeur de mot de passe en direct
          </h3>
          <input id="pw-input" type="text" placeholder="Entrez un mot de passe à tester..."
            style="width:100%;padding:0.625rem 0.875rem;border:1px solid #cbd5e1;border-radius:0.5rem;font-size:14px;font-family:JetBrains Mono,monospace;margin-bottom:0.75rem;box-sizing:border-box;"
            autocomplete="off" spellcheck="false"/>
          <div style="margin-bottom:0.5rem;">
            <div style="display:flex;justify-content:space-between;margin-bottom:0.25rem;">
              <span style="font-size:12px;color:#475569;font-weight:500;">Force du mot de passe</span>
              <span id="pw-strength-label" style="font-size:12px;font-weight:700;color:#94a3b8;">Aucun</span>
            </div>
            <div style="height:8px;background:#e2e8f0;border-radius:9999px;overflow:hidden;">
              <div id="pw-strength-bar" style="height:100%;width:0%;border-radius:9999px;transition:all 0.4s ease;background:#94a3b8;"></div>
            </div>
          </div>
          <div id="pw-crack-time" style="font-size:12px;color:#64748b;background:#f1f5f9;padding:0.5rem 0.75rem;border-radius:0.5rem;font-family:JetBrains Mono,monospace;">
            ⏱ Temps de déchiffrement estimé : <strong>—</strong>
          </div>
          <div id="pw-criteria" style="margin-top:0.75rem;display:grid;grid-template-columns:1fr 1fr;gap:0.375rem;font-size:12px;"></div>
        </div>
        <div id="tfa-demo" style="background:#0f172a;border-radius:0.75rem;padding:1.25rem;color:#e2e8f0;display:flex;flex-direction:column;gap:0.75rem;">
          <div style="display:flex;align-items:center;gap:0.5rem;border-bottom:1px solid #1e293b;padding-bottom:0.625rem;">
            <span class="material-symbols-outlined" style="font-size:18px;color:#10b981;">smartphone</span>
            <span style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:#94a3b8;">Application 2FA - Code TOTP</span>
          </div>
          <div style="text-align:center;">
            <div id="totp-code" style="font-size:32px;font-weight:800;font-family:JetBrains Mono,monospace;color:#10b981;letter-spacing:0.2em;">── ──</div>
            <div style="margin-top:0.5rem;font-size:11px;color:#64748b;">Code valide pendant <strong id="totp-timer" style="color:#0ea5e9;">30</strong>s</div>
            <div style="height:4px;background:#1e293b;border-radius:9999px;margin-top:0.5rem;overflow:hidden;">
              <div id="totp-bar" style="height:100%;background:linear-gradient(to right,#0ea5e9,#10b981);border-radius:9999px;transition:width 1s linear;width:100%;"></div>
            </div>
          </div>
          <div style="font-size:11px;color:#64748b;text-align:center;">
            Même si votre mot de passe est volé, l'attaquant ne peut pas se connecter sans ce code éphémère.
          </div>
        </div>
      </div>`;

    // Password tester logic
    const input = document.getElementById('pw-input');
    const strengthBar = document.getElementById('pw-strength-bar');
    const strengthLabel = document.getElementById('pw-strength-label');
    const crackTime = document.getElementById('pw-crack-time');
    const criteriaEl = document.getElementById('pw-criteria');

    function evalPassword(pw) {
      const criteria = [
        { label: '≥ 12 caractères', ok: pw.length >= 12 },
        { label: 'Majuscule (A-Z)', ok: /[A-Z]/.test(pw) },
        { label: 'Minuscule (a-z)', ok: /[a-z]/.test(pw) },
        { label: 'Chiffre (0-9)', ok: /\d/.test(pw) },
        { label: 'Symbole (!@#…)', ok: /[^a-zA-Z0-9]/.test(pw) },
        { label: '≥ 16 caractères', ok: pw.length >= 16 }
      ];
      const score = criteria.filter(c => c.ok).length;
      const levels = [
        { label: 'Aucun', color: '#94a3b8', pct: 0 },
        { label: 'Très faible', color: '#ef4444', pct: 15 },
        { label: 'Faible', color: '#f97316', pct: 30 },
        { label: 'Moyen', color: '#eab308', pct: 50 },
        { label: 'Bon', color: '#22c55e', pct: 70 },
        { label: 'Fort', color: '#10b981', pct: 85 },
        { label: 'Excellent', color: '#0284c7', pct: 100 }
      ];
      const level = levels[Math.min(score, levels.length - 1)];
      // Crack time estimation (simplified)
      const charsets = [26, 26, 10, 32];
      const pool = [/[a-z]/.test(pw) ? 26 : 0, /[A-Z]/.test(pw) ? 26 : 0, /\d/.test(pw) ? 10 : 0, /[^a-zA-Z0-9]/.test(pw) ? 32 : 0].reduce((a, b) => a + b, 0) || 1;
      const combinations = Math.pow(pool, pw.length || 1);
      const attemptsPerSec = 1e10;
      const seconds = combinations / attemptsPerSec;
      let timeStr;
      if (seconds < 1) timeStr = 'Instantané';
      else if (seconds < 60) timeStr = `${Math.round(seconds)} secondes`;
      else if (seconds < 3600) timeStr = `${Math.round(seconds / 60)} minutes`;
      else if (seconds < 86400) timeStr = `${Math.round(seconds / 3600)} heures`;
      else if (seconds < 31536000) timeStr = `${Math.round(seconds / 86400)} jours`;
      else if (seconds < 31536000 * 1000) timeStr = `${Math.round(seconds / 31536000)} ans`;
      else timeStr = 'Des milliards d\'années 🔒';
      return { criteria, score, level, timeStr };
    }

    if (input) {
      input.addEventListener('input', () => {
        const pw = input.value;
        if (!pw) {
          strengthBar.style.width = '0%';
          strengthLabel.textContent = 'Aucun';
          strengthLabel.style.color = '#94a3b8';
          crackTime.innerHTML = '⏱ Temps de déchiffrement estimé : <strong>—</strong>';
          criteriaEl.innerHTML = '';
          return;
        }
        const { criteria, level, timeStr } = evalPassword(pw);
        strengthBar.style.width = `${level.pct}%`;
        strengthBar.style.background = level.color;
        strengthLabel.textContent = level.label;
        strengthLabel.style.color = level.color;
        crackTime.innerHTML = `⏱ Temps de déchiffrement estimé : <strong style="color:${level.color}">${timeStr}</strong>`;
        criteriaEl.innerHTML = criteria.map(c => `
          <div style="display:flex;align-items:center;gap:0.375rem;color:${c.ok ? '#10b981' : '#94a3b8'};">
            <span class="material-symbols-outlined" style="font-size:14px;">${c.ok ? 'check_circle' : 'radio_button_unchecked'}</span>
            <span>${c.label}</span>
          </div>`).join('');
        if (window.SoundFX) SoundFX.click();
      });
    }

    // TOTP simulation
    let totpInterval;
    function updateTOTP() {
      const now = Math.floor(Date.now() / 1000);
      const remaining = 30 - (now % 30);
      const code = String(Math.floor(100000 + Math.abs(Math.sin(Math.floor(now / 30))) * 899999)).padStart(6, '0');
      const display = document.getElementById('totp-code');
      const timer = document.getElementById('totp-timer');
      const bar = document.getElementById('totp-bar');
      if (display) display.textContent = code.slice(0, 3) + ' ' + code.slice(3);
      if (timer) timer.textContent = remaining;
      if (bar) bar.style.width = `${(remaining / 30) * 100}%`;
    }
    updateTOTP();
    totpInterval = setInterval(updateTOTP, 1000);
  }

  /* ─── DDoS Animation ──────────────────────────────────────── */
  function injectDDoSAnimation(container) {
    const playerFrame = container && container.querySelector('.simulation-outer-simulation-player-frame-content-card');
    if (!playerFrame) return;
    const emailUI = playerFrame.querySelector('.simulation-simulated-desktop-email-client-ui-content-stack');
    if (!emailUI) return;

    emailUI.innerHTML = `
      <div style="padding:1.5rem;position:relative;min-height:280px;background:#0f172a;border-radius:0.5rem;overflow:hidden;" id="ddos-stage">
        <div style="position:absolute;inset:0;background:radial-gradient(ellipse at center,#1e293b 0%,#0f172a 70%);"></div>
        
        <!-- Server -->
        <div id="ddos-server" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:10;text-align:center;">
          <div id="ddos-server-icon" style="width:64px;height:64px;background:#1e293b;border:2px solid #334155;border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto;transition:all 0.3s;">
            <span class="material-symbols-outlined" style="font-size:32px;color:#10b981;">dns</span>
          </div>
          <div id="ddos-server-label" style="margin-top:0.5rem;font-size:11px;font-weight:700;color:#10b981;font-family:JetBrains Mono,monospace;">SERVEUR OK</div>
          <div id="ddos-req-counter" style="font-size:10px;color:#64748b;font-family:JetBrains Mono,monospace;">0 req/s</div>
        </div>

        <!-- Shield -->
        <div id="ddos-shield" class="hidden" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(1.5);z-index:20;opacity:0;transition:all 0.5s;">
          <span class="material-symbols-outlined icon-filled" style="font-size:80px;color:#0284c7;opacity:0.15;"></span>
        </div>

        <!-- Status bar -->
        <div style="position:absolute;bottom:0;left:0;right:0;background:#0f172a;border-top:1px solid #1e293b;padding:0.5rem 1rem;display:flex;align-items:center;justify-content:space-between;">
          <span id="ddos-status" style="font-size:11px;font-weight:600;color:#10b981;font-family:JetBrains Mono,monospace;">● Réseau stable</span>
          <button id="ddos-firewall-btn" style="background:#0284c7;color:#fff;border:none;padding:0.25rem 0.75rem;border-radius:0.375rem;font-size:11px;font-weight:600;cursor:pointer;transition:all 0.3s;" type="button">
            Activer le pare-feu CDN
          </button>
        </div>

        <!-- Packets container -->
        <div id="ddos-packets" style="position:absolute;inset:0;pointer-events:none;overflow:hidden;"></div>
      </div>`;

    // DDoS simulation logic
    let reqPerSec = 0;
    let attacking = false;
    let defended = false;
    let packetInterval, attackInterval;
    const server = document.getElementById('ddos-server-icon');
    const serverLabel = document.getElementById('ddos-server-label');
    const reqCounter = document.getElementById('ddos-req-counter');
    const statusEl = document.getElementById('ddos-status');
    const firewallBtn = document.getElementById('ddos-firewall-btn');
    const packetsEl = document.getElementById('ddos-packets');
    const shieldEl = document.getElementById('ddos-shield');

    function createPacket(color) {
      const pkt = document.createElement('div');
      const angle = Math.random() * Math.PI * 2;
      const radius = 140 + Math.random() * 40;
      const startX = Math.cos(angle) * radius + 160;
      const startY = Math.sin(angle) * radius + 140;
      pkt.style.cssText = `
        position:absolute;width:8px;height:8px;border-radius:50%;
        background:${color};opacity:0.8;
        left:${startX}px;top:${startY}px;
        transition:all ${0.4 + Math.random() * 0.3}s linear;
        box-shadow:0 0 6px ${color};`;
      packetsEl.appendChild(pkt);
      setTimeout(() => {
        pkt.style.left = '160px';
        pkt.style.top = '140px';
        pkt.style.opacity = '0';
        pkt.style.transform = 'scale(0)';
      }, 20);
      setTimeout(() => pkt.remove(), 800);
    }

    // Start attack after 2s
    setTimeout(() => {
      attacking = true;
      statusEl.textContent = '⚠ Attaque DDoS détectée !';
      statusEl.style.color = '#ef4444';
      if (window.SoundFX) SoundFX.alert();

      attackInterval = setInterval(() => {
        if (defended) return;
        reqPerSec = Math.min(reqPerSec + 120, 12000);
        reqCounter.textContent = `${reqPerSec.toLocaleString()} req/s`;

        if (reqPerSec > 5000 && server) {
          server.style.borderColor = '#ef4444';
          server.querySelector('span').style.color = '#ef4444';
          serverLabel.textContent = 'SURCHARGÉ !';
          serverLabel.style.color = '#ef4444';
          server.style.animation = 'none';
        }
      }, 600);

      packetInterval = setInterval(() => {
        if (!packetsEl) return;
        const count = defended ? 1 : Math.min(Math.floor(reqPerSec / 1000) + 1, 8);
        for (let i = 0; i < count; i++) {
          createPacket(defended ? '#10b981' : '#ef4444');
        }
      }, 200);
    }, 2000);

    // Firewall button
    if (firewallBtn) {
      firewallBtn.addEventListener('click', () => {
        defended = true;
        reqPerSec = 0;
        firewallBtn.textContent = '✓ Pare-feu CDN Actif';
        firewallBtn.style.background = '#10b981';
        statusEl.textContent = '● Attaque neutralisée par CDN';
        statusEl.style.color = '#10b981';
        if (server) {
          server.style.borderColor = '#10b981';
          server.querySelector('span').style.color = '#10b981';
          serverLabel.textContent = 'SERVEUR OK';
          serverLabel.style.color = '#10b981';
        }
        reqCounter.textContent = '0 req/s (filtré)';
        // Show shield
        if (shieldEl) {
          shieldEl.classList.remove('hidden');
          setTimeout(() => { shieldEl.style.opacity = '1'; }, 50);
        }
        if (window.SoundFX) SoundFX.success();
      });
    }
  }

  /* ─── Step Rendering ───────────────────────────────────────── */
  function renderStep(stepIndex) {
    if (!state.module) return;
    const step = state.module.steps[stepIndex];
    if (!step) return;
    state.currentStep = stepIndex;

    const lang = window.CyberLang ? window.CyberLang.current() : 'fr';

    // Update step indicators
    dom.stepCards.forEach((card, i) => {
      if (!card) return;
      const badge = dom.stepBadges[i];
      const titleEl = dom.stepTitles[i];
      const subEl = dom.stepSubtitles[i];
      const s = state.module.steps[i];
      if (!s) return;

      card.classList.remove('is-active', 'is-completed');
      if (badge) badge.style.background = '';

      if (i < stepIndex) {
        // completed
        card.classList.add('is-completed');
        if (badge) {
          badge.innerHTML = '<span class="material-symbols-outlined" style="font-size:16px;">check</span>';
          badge.style.background = '#10b981';
          badge.style.color = '#fff';
        }
      } else if (i === stepIndex) {
        // active
        card.classList.add('is-active');
        if (badge) {
          badge.textContent = String(i + 1);
          badge.style.background = '#0284c7';
          badge.style.color = '#fff';
        }
      } else {
        // future
        if (badge) {
          badge.textContent = String(i + 1);
          badge.style.background = '';
          badge.style.color = '';
        }
      }
      if (titleEl) titleEl.textContent = `Étape ${i + 1} : ${lang === 'ar' ? (s.titleAr || s.title) : s.title}`;
      if (subEl) subEl.textContent = lang === 'ar' ? (s.tipAr || s.tip) : s.tip;
    });

    // Update right panel content
    const t = lang === 'ar';
    if (dom.rightPanelTitle) dom.rightPanelTitle.textContent = t ? (step.titleAr || step.title) : step.title;
    if (dom.rightPanelBody) dom.rightPanelBody.textContent = t ? (step.explanationAr || step.explanation) : step.explanation;

    // Update progress bar
    const pct = ((stepIndex + 1) / state.totalSteps) * 100;
    if (dom.progressFill) dom.progressFill.style.width = `${pct}%`;

    // Update scenario header
    if (dom.scenarioText) {
      dom.scenarioText.textContent = t ? (step.titleAr || step.title) : step.title;
    }

    // Voiceover
    if (window.Voiceover && window.Voiceover.enabled) {
      const text = t ? (step.explanationAr || step.explanation) : step.explanation;
      window.Voiceover.speak(text);
    }

    // Sound
    if (window.SoundFX) SoundFX.step();
  }

  /* ─── Playback controls ────────────────────────────────────── */
  function goNext() {
    if (state.currentStep < state.totalSteps - 1) {
      renderStep(state.currentStep + 1);
    } else {
      stopAuto();
    }
  }

  function goPrev() {
    if (state.currentStep > 0) {
      renderStep(state.currentStep - 1);
    }
  }

  function startAuto() {
    if (state.isPlaying) return;
    state.isPlaying = true;
    if (dom.playIcon) dom.playIcon.textContent = 'pause';
    state.playTimer = setInterval(() => {
      if (state.currentStep < state.totalSteps - 1) {
        renderStep(state.currentStep + 1);
      } else {
        stopAuto();
      }
    }, state.stepDuration);
  }

  function stopAuto() {
    state.isPlaying = false;
    clearInterval(state.playTimer);
    if (dom.playIcon) dom.playIcon.textContent = 'play_arrow';
  }

  function togglePlay() {
    if (state.isPlaying) stopAuto();
    else startAuto();
    if (window.SoundFX) SoundFX.click();
  }

  function restart() {
    stopAuto();
    renderStep(0);
    if (window.SoundFX) SoundFX.click();
  }

  /* ─── Event bindings ───────────────────────────────────────── */
  function bindEvents() {
    if (dom.btnPrev) dom.btnPrev.addEventListener('click', () => { SoundFX && SoundFX.click(); goPrev(); });
    if (dom.btnNext) dom.btnNext.addEventListener('click', () => { SoundFX && SoundFX.click(); goNext(); });
    if (dom.btnPlay) dom.btnPlay.addEventListener('click', togglePlay);
    if (dom.btnReplay) dom.btnReplay.addEventListener('click', restart);

    // Step indicator clicks
    dom.stepCards.forEach((card, i) => {
      if (card) card.addEventListener('click', () => {
        stopAuto();
        renderStep(i);
        if (window.SoundFX) SoundFX.click();
      });
    });

    // Voiceover toggle
    if (dom.btnVoiceover) {
      dom.btnVoiceover.addEventListener('click', () => {
        if (window.Voiceover) {
          const on = window.Voiceover.toggle();
          if (dom.voiceoverStatus) dom.voiceoverStatus.textContent = on ? 'Activée' : 'Désactivée';
        }
        if (window.SoundFX) SoundFX.click();
      });
    }

    // Language switcher for voiceover
    if (dom.btnLangFR) dom.btnLangFR.addEventListener('click', () => {
      if (window.Voiceover) window.Voiceover.setLang('fr');
    });
    if (dom.btnLangAR) dom.btnLangAR.addEventListener('click', () => {
      if (window.Voiceover) window.Voiceover.setLang('ar');
    });

    // Update on language change
    window.addEventListener('languagechange', () => renderStep(state.currentStep));
  }

  /* ─── Hotspot interactions (phishing email) ────────────────── */
  function initHotspots() {
    document.querySelectorAll('.tooltip-hover-group, .link-hover-group').forEach(el => {
      const popover = el.querySelector('[class*="hidden"]');
      if (popover) {
        el.addEventListener('mouseenter', () => {
          popover.classList.remove('hidden');
          if (window.SoundFX) SoundFX.alert();
        });
        el.addEventListener('mouseleave', () => {
          popover.classList.add('hidden');
        });
        el.addEventListener('click', () => {
          popover.classList.toggle('hidden');
          if (window.SoundFX) SoundFX.click();
        });
      }
    });

    // Fake CTA button prevention
    const fakeBtn = document.querySelector('.simulation-fake-call-to-action-button');
    if (fakeBtn) {
      fakeBtn.addEventListener('click', e => {
        e.preventDefault();
        if (window.SoundFX) SoundFX.error();
        fakeBtn.style.animation = 'shake 0.5s ease';
        setTimeout(() => { fakeBtn.style.animation = ''; }, 500);
      });
    }
  }

  /* ─── Header progress ─────────────────────────────────────── */
  function updateProgressCapsule() {
    if (window.CyberProgress) window.CyberProgress.updateHeaderUI();
  }

  /* ─── Bootstrap ────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    // Wait for data-modules.js to be available
    if (window.MODULES) {
      init();
      initHotspots();
    } else {
      // Poll until data is ready (max 3 seconds)
      let attempts = 0;
      const poll = setInterval(() => {
        if (window.MODULES || attempts++ > 30) {
          clearInterval(poll);
          init();
          initHotspots();
        }
      }, 100);
    }
  });

})();

