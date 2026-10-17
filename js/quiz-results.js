/**
 * CyberShield Academy - Quiz Results Engine
 * Affichage dynamique des scores, certificat et progression
 */
(function () {
  'use strict';

  /* ─── URL params ─────────────────────────────────────────────── */
  function getParams() {
    const p = new URLSearchParams(window.location.search);
    const moduleId = p.get('module') || 'phishing';
    const saved = window.CyberProgress ? window.CyberProgress.getModuleData(moduleId) : null;
    const hasScore = p.has('score') && !isNaN(parseInt(p.get('score'), 10));
    const hasTotal = p.has('total') && !isNaN(parseInt(p.get('total'), 10));

    return {
      moduleId,
      score: hasScore ? parseInt(p.get('score'), 10) : (saved ? saved.score : 0),
      total: hasTotal ? parseInt(p.get('total'), 10) : (saved ? saved.total : 5),
      isNewScore: hasScore
    };
  }

  /* ─── Main init ──────────────────────────────────────────────── */
  function init() {
    const { moduleId, score, total, isNewScore } = getParams();
    const pct = total > 0 ? Math.round((score / total) * 100) : 0;
    const mod = window.MODULES && window.MODULES[moduleId];

    // Persist score only if newly passed via URL
    if (window.CyberProgress && isNewScore) {
      window.CyberProgress.setModuleScore(moduleId, score, total);
    }

    // Update all dynamic elements
    updateScoreGauge(score, total, pct);
    updateHeader(moduleId, score, total, pct, mod);
    updateBadge(moduleId, mod);
    updateCertificate(moduleId, mod);
    updateNavigationButtons(moduleId, mod);
    updateQuestionBreakdown(moduleId, score, total);
    setupCertificateDownload();
    updateProgressCapsule();

    // Load results from localStorage for detailed breakdown
    renderDetailedBreakdown(moduleId);
  }

  /* ─── Score gauge animation ──────────────────────────────────── */
  function updateScoreGauge(score, total, pct) {
    // Update text
    const scoreText = document.querySelector('.results-animated-progress-ring-circumference-inline-text');
    if (scoreText) scoreText.textContent = `${pct}%`;
    const reponsesText = document.querySelector('.results-animated-progress-ring-circumference-eyebrow');
    if (reponsesText) reponsesText.textContent = `${score} / ${total} RÉPONSES`;

    // Animate SVG circle
    // Circumference = 2 * PI * 68 = 427.25
    const circumference = 427.25;
    const progressCircle = document.querySelectorAll('circle')[1]; // second circle is progress
    if (progressCircle) {
      const offset = circumference * (1 - pct / 100);
      progressCircle.style.strokeDashoffset = circumference; // start at 0%
      setTimeout(() => {
        progressCircle.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)';
        progressCircle.style.strokeDashoffset = offset;
      }, 300);
    }

    // Qualitative metric
    const statut = document.querySelector('.results-gauge-qualitative-metric-eyebrow');
    const metricTitle = document.querySelector('.results-gauge-qualitative-metric-section-title');
    const metricBody = document.querySelector('.results-gauge-qualitative-metric-body-copy');

    let qualitative;
    if (pct >= 80) {
      qualitative = { statut: 'Maîtrisé', title: 'Sentinelle Numérique Débloquée', body: `Excellente vigilance tactique ! Vous avez validé ${score} réponses sur ${total} avec précision.` };
    } else if (pct >= 60) {
      qualitative = { statut: 'En progression', title: 'Défenseur en Formation', body: `Bonne base ! ${total - score} réponse(s) méritent une révision. Recommencez pour consolider vos acquis.` };
    } else {
      qualitative = { statut: 'À consolider', title: 'Apprenti Cyber-Défenseur', body: `Ne vous découragez pas ! Repassez la simulation pour renforcer vos réflexes. ${score}/${total} c'est un bon début.` };
    }
    if (statut) statut.textContent = `Statut : ${qualitative.statut}`;
    if (metricTitle) metricTitle.textContent = qualitative.title;
    if (metricBody) metricBody.textContent = qualitative.body;
  }

  /* ─── Header update ──────────────────────────────────────────── */
  function updateHeader(moduleId, score, total, pct, mod) {
    const moduleNum = ['phishing','passwords','ddos'].indexOf(moduleId) + 1;
    const badge = document.querySelector('.results-status-badge-with-sparkles-eyebrow');
    if (badge) badge.textContent = `MODULE ${moduleNum} ${pct >= 60 ? 'VALIDÉ AVEC SUCCÈS !' : 'TERMINÉ'}`;

    const title = document.querySelector('.results-bilingual-headline-matrix-page-title');
    if (title) {
      title.textContent = pct >= 60
        ? `Félicitations ! Vous avez développé de solides réflexes cyber.`
        : `Module terminé ! Continuez à vous entraîner.`;
    }

    const arTitle = document.querySelector('.results-bilingual-headline-matrix-body-copy');
    if (arTitle && mod) arTitle.textContent = mod.titleAr || '';

    const subtitle = document.querySelector('.results-bilingual-headline-matrix-body-copy-2');
    if (subtitle) {
      subtitle.textContent = pct >= 60
        ? `Vous êtes maintenant capable d'identifier les pièges courants et de protéger votre environnement avec lucidité.`
        : `Continuez à vous exercer pour consolider vos connaissances en cybersécurité.`;
    }
  }

  /* ─── Badge update ───────────────────────────────────────────── */
  function updateBadge(moduleId, mod) {
    const badgeTitle = document.querySelector('.results-main-content-card-title');
    const badgeDesc = document.querySelector('.results-main-content-body-copy');
    const badgeLevel = document.querySelector('.results-main-content-eyebrow');

    if (mod && badgeTitle) badgeTitle.textContent = mod.badge || `Badge ${mod.title}`;
    if (badgeLevel) badgeLevel.textContent = 'BADGE DÉBLOQUÉ • NIVEAU 1';
    if (badgeDesc && mod) {
      const badges = {
        phishing: 'Attribué pour avoir déjoué les tentatives sophistiquées de phishing, smishing et faux domaines.',
        passwords: 'Attribué pour avoir maîtrisé la création de mots de passe robustes et la configuration de la 2FA.',
        ddos: 'Attribué pour avoir compris l\'anatomie des attaques DDoS et les mécanismes de défense réseau.'
      };
      badgeDesc.textContent = badges[moduleId] || `Attribué pour la maîtrise du module "${mod.title}".`;
    }
  }

  /* ─── Certificate update ─────────────────────────────────────── */
  function updateCertificate(moduleId, mod) {
    // Generate unique cert ID
    const certId = `CS-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 89999)}`;
    const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

    // Update cert ID in header
    const certIdEl = document.querySelector('.results-official-certificate-preview-card-eyebrow');
    if (certIdEl) certIdEl.textContent = `ID: ${certId}`;

    // Update cert body
    const certName = document.querySelector('.results-certificate-body-inside-mockup-inline-text');
    const certModule = document.querySelector('.results-certificate-body-inside-mockup-inline-text-2');
    const certDate = document.querySelector('.results-certificate-footer-inside-mockup-eyebrow');

    if (certDate) certDate.textContent = `Délivré le : ${today}`;
    if (certModule && mod) certModule.textContent = `Pour la maîtrise démontrée du module "${mod.title}"`;

    // Replace static name with input field
    const certNameContainer = certName ? certName.parentElement : null;
    if (certNameContainer && certName) {
      const savedName = localStorage.getItem('cybershield_username') || '';
      const inputWrapper = document.createElement('div');
      inputWrapper.style.cssText = 'display:flex;flex-direction:column;align-items:center;gap:0.375rem;';
      inputWrapper.innerHTML = `
        <span style="font-size:9px;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;">Décerné avec mention à</span>
        <input id="cert-name-input" type="text" value="${savedName}" placeholder="Entrez votre nom complet"
          style="font-size:16px;font-weight:700;color:#0f172a;text-align:center;border:none;border-bottom:2px solid #0284c7;
          background:transparent;padding:0.125rem 0.5rem;font-family:Inter,sans-serif;width:100%;max-width:200px;outline:none;"
          autocomplete="name"/>`;
      certName.replaceWith(inputWrapper);

      // Save name on input
      const nameInput = document.getElementById('cert-name-input');
      if (nameInput) {
        nameInput.addEventListener('input', () => {
          localStorage.setItem('cybershield_username', nameInput.value);
        });
      }
    }

    // Store cert data for print
    window._certData = { certId, today, moduleId, mod };
  }

  /* ─── Navigation buttons ─────────────────────────────────────── */
  function updateNavigationButtons(moduleId, mod) {
    const moduleOrder = ['phishing', 'passwords', 'ddos'];
    const nextModuleId = window.CyberProgress ? window.CyberProgress.getNextModule(moduleId) : null;
    const nextMod = nextModuleId && window.MODULES && window.MODULES[nextModuleId];

    // Next module indicator
    const nextLabel = document.querySelector('.results-interactive-navigation-matrix-and-pr-inline-text');
    if (nextLabel && nextMod) {
      nextLabel.textContent = `Module ${moduleOrder.indexOf(nextModuleId) + 1} : ${nextMod.title}`;
    } else if (nextLabel) {
      nextLabel.textContent = 'Tous les modules complétés ! 🎉';
    }

    // Main advance button
    const advanceBtn = document.querySelector('.results-main-advance-cta-button-navigation-link');
    if (advanceBtn) {
      if (nextModuleId) {
        advanceBtn.href = `simulation.html?module=${nextModuleId}`;
        const advSpan = advanceBtn.querySelector('span');
        if (advSpan && nextMod) advSpan.textContent = `Module suivant : ${nextMod.title}`;
      } else {
        advanceBtn.href = 'modules.html';
        const advSpan = advanceBtn.querySelector('span');
        if (advSpan) advSpan.textContent = 'Voir tous les modules';
      }
    }

    // Redo quiz button
    const redoBtn = document.querySelector('.results-retake-quiz-button-button');
    if (redoBtn) {
      redoBtn.addEventListener('click', () => {
        window.location.href = `quiz.html?module=${moduleId}`;
      });
    }

    // Back link
    const backLink = document.querySelector('.results-discreet-back-navigation-link-navigation-link');
    if (backLink) backLink.href = 'modules.html';
  }

  /* ─── Detailed question breakdown ───────────────────────────── */
  function updateQuestionBreakdown(moduleId, score, total) {
    const mod = window.MODULES && window.MODULES[moduleId];
    if (!mod) return;

    const container = document.querySelector('.results-detailed-breakdown-of-answers-content-stack');
    if (!container) return;

    // Try to get stored answers (would need to be passed via sessionStorage)
    let answers = [];
    try {
      const stored = sessionStorage.getItem('cybershield_last_answers');
      if (stored) answers = JSON.parse(stored);
    } catch (e) {}

    // Generate breakdown based on module quiz data
    container.innerHTML = mod.quiz.map((q, i) => {
      const isCorrect = answers[i] ? answers[i].correct : (i < score); // fallback
      return `
        <div style="display:flex;flex-direction:column;gap:0.5rem;padding:0.875rem;border-radius:0.75rem;
          background:${isCorrect ? '#f0fdf4' : '#fef2f2'};border:1px solid ${isCorrect ? '#d1fae5' : '#fee2e2'};">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.75rem;">
            <div style="display:flex;align-items:flex-start;gap:0.625rem;flex:1;">
              <div style="width:1.5rem;height:1.5rem;border-radius:0.375rem;background:${isCorrect ? '#10b981' : '#ef4444'};
                display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">
                <span class="material-symbols-outlined" style="font-size:14px;color:#fff;">${isCorrect ? 'check' : 'close'}</span>
              </div>
              <div>
                <span style="font-size:13px;font-weight:600;color:#0f172a;">Q${i+1}. ${q.question}</span>
                <div style="font-size:11px;color:${isCorrect ? '#059669' : '#dc2626'};margin-top:2px;">
                  Réponse correcte : ${q.options[q.correctIndex]}
                </div>
              </div>
            </div>
            <span style="font-size:12px;font-weight:700;color:${isCorrect ? '#059669' : '#dc2626'};flex-shrink:0;">
              ${isCorrect ? 'Correct' : 'Incorrect'}
            </span>
          </div>
          ${!isCorrect ? `<div style="font-size:12px;color:#64748b;padding-left:2.125rem;line-height:1.5;">${q.explanation}</div>` : ''}
        </div>`;
    }).join('');

    // Update count
    const countEl = document.querySelector('.results-detailed-breakdown-of-answers-eyebrow');
    if (countEl) countEl.textContent = `${total} épreuves tactiques`;
  }

  /* ─── Detailed breakdown from stored data ───────────────────── */
  function renderDetailedBreakdown(moduleId) {
    // Already handled in updateQuestionBreakdown
  }

  /* ─── Certificate print ─────────────────────────────────────── */
  function setupCertificateDownload() {
    const downloadBtn = document.querySelector('.results-download-action-button-button');
    if (!downloadBtn) return;

    downloadBtn.addEventListener('click', () => {
      const nameInput = document.getElementById('cert-name-input');
      const name = nameInput ? nameInput.value || 'Cyber-Défenseur' : 'Cyber-Défenseur';
      const { certId, today, mod } = window._certData || {};

      // Build print window
      const printWin = window.open('', '_blank', 'width=900,height=650');
      if (!printWin) {
        alert('Veuillez autoriser les popups pour télécharger le certificat.');
        return;
      }
      const modTitle = mod ? mod.title : 'Cybersécurité';
      printWin.document.write(`<!DOCTYPE html><html lang="fr"><head>
        <meta charset="utf-8"/>
        <title>Certificat CyberShield - ${name}</title>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap" rel="stylesheet"/>
        <style>
          @media print { @page { size:A4 landscape; margin:0; } body { margin:0; } }
          body { font-family:Inter,sans-serif; background:#f8fafc; display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; }
          .cert { width:800px; padding:3rem; background:#fff; border:3px solid #0284c7; border-radius:1rem;
            position:relative; box-shadow:0 20px 60px rgba(2,132,199,0.15); }
          .cert::before { content:''; position:absolute; inset:8px; border:1px solid #bae6fd; border-radius:0.75rem; pointer-events:none; }
          .cert-header { text-align:center; margin-bottom:2rem; }
          .cert-logo { font-size:48px; color:#0284c7; }
          .cert-academy { font-size:13px; text-transform:uppercase; letter-spacing:0.15em; color:#64748b; margin-top:0.5rem; }
          .cert-type { font-size:24px; font-weight:800; color:#0f172a; margin-top:0.5rem; letter-spacing:-0.02em; }
          .cert-divider { width:80px; height:3px; background:linear-gradient(to right,#0284c7,#10b981); margin:1rem auto; border-radius:9999px; }
          .cert-awarded { font-size:13px; color:#64748b; text-transform:uppercase; letter-spacing:0.08em; }
          .cert-name { font-size:36px; font-weight:800; color:#0f172a; margin:0.5rem 0; letter-spacing:-0.02em; }
          .cert-module { font-size:15px; color:#334155; margin:0.25rem 0 1.5rem; }
          .cert-module strong { color:#0284c7; }
          .cert-footer { display:flex; justify-content:space-between; align-items:flex-end; margin-top:2rem; padding-top:1.5rem; border-top:1px solid #e2e8f0; }
          .cert-sig { font-size:12px; color:#64748b; }
          .cert-sig strong { display:block; font-size:14px; color:#0f172a; }
          .cert-score { background:#f0f9ff; border:1px solid #bae6fd; border-radius:0.75rem; padding:0.75rem 1.5rem; text-align:center; }
          .cert-score .score-pct { font-size:28px; font-weight:800; color:#0284c7; }
          .cert-score .score-label { font-size:11px; color:#64748b; }
          .cert-id { font-size:10px; color:#94a3b8; font-family:monospace; }
          .btn-print { display:block; margin:1.5rem auto 0; padding:0.75rem 2rem; background:#0284c7; color:#fff; border:none;
            border-radius:0.5rem; font-size:14px; font-weight:700; cursor:pointer; }
          @media print { .btn-print { display:none; } }
        </style></head><body>
        <div>
          <div class="cert">
            <div class="cert-header">
              <div class="cert-logo">🛡️</div>
              <div class="cert-academy">CyberShield Academy</div>
              <div class="cert-type">Certificat d'Aptitude Tactique</div>
              <div class="cert-divider"></div>
            </div>
            <div style="text-align:center;">
              <div class="cert-awarded">Décerné avec mention à</div>
              <div class="cert-name">${name}</div>
              <div class="cert-module">Pour la maîtrise démontrée du module<br><strong>${modTitle}</strong></div>
            </div>
            <div class="cert-footer">
              <div class="cert-sig"><strong>Khaoula Sellami</strong>Auteure & Responsable pédagogique</div>
              <div class="cert-score">
                <div class="score-pct">${window._certData && window._certData.score !== undefined ? Math.round((parseInt(new URLSearchParams(window.location.search).get('score'),10)/parseInt(new URLSearchParams(window.location.search).get('total'),10))*100) : '—'}%</div>
                <div class="score-label">Score obtenu</div>
              </div>
              <div class="cert-sig">
                <strong>${today || new Date().toLocaleDateString('fr-FR')}</strong>
                Date de délivrance
                <div class="cert-id">ID: ${certId || 'CS-0000'}</div>
              </div>
            </div>
          </div>
          <button class="btn-print" onclick="window.print()">🖨 Imprimer / Télécharger en PDF</button>
        </div>
      </body></html>`);
      printWin.document.close();
      printWin.focus();
      if (window.SoundFX) SoundFX.success();
    });
  }

  /* ─── Explanation toggles ────────────────────────────────────── */
  function bindExplanationToggles() {
    document.querySelectorAll('[data-toggle-explanation]').forEach(btn => {
      btn.addEventListener('click', () => {
        const target = document.getElementById(btn.dataset.toggleExplanation);
        if (target) target.classList.toggle('hidden');
      });
    });
  }

  /* ─── Header progress ─────────────────────────────────────────── */
  function updateProgressCapsule() {
    if (window.CyberProgress) window.CyberProgress.updateHeaderUI();
  }

  /* ─── Bootstrap ──────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    bindExplanationToggles();
    if (window.MODULES) {
      init();
    } else {
      let attempts = 0;
      const poll = setInterval(() => {
        if (window.MODULES || attempts++ > 30) {
          clearInterval(poll);
          init();
        }
      }, 100);
    }
  });

})();
