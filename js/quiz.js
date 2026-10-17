/**
 * CyberShield Academy - Quiz Engine (Dynamic)
 * Charge les questions depuis data-modules.js selon ?module=
 */
(function () {
  'use strict';

  /* ─── State ────────────────────────────────────────────────── */
  const state = {
    moduleId: null,
    module: null,
    questions: [],
    currentQ: 0,
    score: 0,
    answered: [], // array of {questionIndex, selectedIndex, correct}
    locked: false // prevent double-answers
  };

  /* ─── URL param ─────────────────────────────────────────────── */
  function getModuleParam() {
    return new URLSearchParams(window.location.search).get('module') || 'phishing';
  }

  /* ─── DOM selectors ─────────────────────────────────────────── */
  const $ = id => document.getElementById(id);
  const $$ = sel => document.querySelector(sel);
  const $$$ = sel => document.querySelectorAll(sel);

  /* ─── Init ──────────────────────────────────────────────────── */
  function init() {
    state.moduleId = getModuleParam();
    state.module = window.MODULES && window.MODULES[state.moduleId];

    if (!state.module) {
      console.warn('[QuizEngine] Module not found:', state.moduleId);
      return;
    }
    state.questions = state.module.quiz;

    updatePageMeta();
    renderQuestion(0);
    updateProgressCapsule();
  }

  function updatePageMeta() {
    document.title = `CyberShield Academy - Quiz : ${state.module.title}`;
    const heading = $$('.quiz-quiz-header-and-metacognitive-progre-page-title');
    if (heading) heading.textContent = `Quiz : ${state.module.title}`;
    const desc = $$('.quiz-quiz-header-and-metacognitive-progre-body-copy');
    if (desc) desc.textContent = state.module.description;

    // Update the bilingual badge
    const arBadge = $$('.quiz-quiz-header-and-metacognitive-progre-status-badge-2');
    if (arBadge) arBadge.textContent = state.module.titleAr || '';
  }

  /* ─── Render question ───────────────────────────────────────── */
  function renderQuestion(qIndex) {
    if (qIndex >= state.questions.length) {
      endQuiz();
      return;
    }
    state.currentQ = qIndex;
    state.locked = false;

    const q = state.questions[qIndex];
    const lang = window.CyberLang ? window.CyberLang.current() : 'fr';
    const isAr = lang === 'ar';
    const opts = isAr && q.optionsAr ? q.optionsAr : q.options;
    const questionText = isAr && q.questionAr ? q.questionAr : q.question;

    // Update progress bar
    updateProgressBar(qIndex);

    // Update question number badge
    const badge = $$('.quiz-question-statement-card-status-badge');
    if (badge) badge.textContent = qIndex + 1;

    // Update question title
    const title = $$('.quiz-question-statement-card-card-title');
    if (title) title.textContent = questionText;

    // Reset sub-instruction
    const sub = $$('.quiz-question-statement-card-body-copy');
    if (sub) sub.textContent = isAr ? 'اختر الإجابة الأكثر دقة.' : 'Sélectionnez la réponse la plus rigoureuse sur le plan de la sécurité opérationnelle.';

    // Render answer options
    const container = document.getElementById('answers-container');
    if (!container) return;

    const labels = ['A', 'B', 'C', 'D'];
    container.innerHTML = opts.slice(0, 4).map((opt, i) => `
      <button class="quiz-answer-option hover-group" data-index="${i}" type="button"
        style="display:flex;align-items:flex-start;gap:0.875rem;width:100%;text-align:${isAr ? 'right' : 'left'};
          padding:0.875rem 1rem;border-radius:0.75rem;border:1.5px solid #e2e8f0;
          background:#fff;cursor:pointer;transition:all 0.2s;margin-bottom:0.5rem;position:relative;overflow:hidden;">
        <div class="quiz-option-letter" style="min-width:2rem;height:2rem;border-radius:0.5rem;
          background:#f1f5f9;border:1.5px solid #cbd5e1;display:flex;align-items:center;
          justify-content:center;font-weight:700;font-size:13px;color:#475569;flex-shrink:0;
          transition:all 0.2s;">${labels[i]}</div>
        <div style="flex:1;">
          <span class="quiz-option-text" style="font-size:14px;color:#334155;line-height:1.5;">${opt}</span>
        </div>
      </button>`).join('');

    // Bind option clicks
    container.querySelectorAll('.quiz-answer-option').forEach(btn => {
      btn.addEventListener('click', () => handleAnswer(parseInt(btn.dataset.index)));
    });

    // Update action button: disabled until answered
    const actionBtn = $$('.quiz-action-control-group-primary-action');
    if (actionBtn) {
      actionBtn.disabled = true;
      actionBtn.style.opacity = '0.5';
      actionBtn.style.cursor = 'not-allowed';
      const isLast = (qIndex === state.questions.length - 1);
      actionBtn.innerHTML = `<span>${isLast ? (isAr ? 'إنهاء الاختبار' : 'Voir les résultats') : (isAr ? `السؤال التالي (${qIndex + 2}/${state.questions.length})` : `Question suivante (${qIndex + 2}/${state.questions.length})`)}</span>
        <span class="quiz-action-control-group-icon-2 material-symbols-outlined">arrow_forward</span>`;
    }

    // Hide feedback panel
    const feedbackPanel = $$('.quiz-instant-feedback-and-educational-exp-content-card');
    if (feedbackPanel) feedbackPanel.style.display = 'none';

    // Update score display
    updateScoreDisplay();
  }

  /* ─── Handle answer selection ───────────────────────────────── */
  function handleAnswer(selectedIndex) {
    if (state.locked) return;
    state.locked = true;

    const q = state.questions[state.currentQ];
    const correct = (selectedIndex === q.correctIndex);
    const lang = window.CyberLang ? window.CyberLang.current() : 'fr';
    const isAr = lang === 'ar';

    // Record answer
    state.answered.push({
      questionIndex: state.currentQ,
      selectedIndex,
      correct
    });
    if (correct) state.score++;

    // Visual feedback on options
    const container = document.getElementById('answers-container');
    const buttons = container ? container.querySelectorAll('.quiz-answer-option') : [];
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      const letter = btn.querySelector('.quiz-option-letter');
      if (i === q.correctIndex) {
        // Correct answer: green
        btn.style.borderColor = '#10b981';
        btn.style.background = '#f0fdf4';
        if (letter) { letter.style.background = '#10b981'; letter.style.color = '#fff'; letter.style.borderColor = '#10b981'; }
      } else if (i === selectedIndex && !correct) {
        // Wrong selection: red
        btn.style.borderColor = '#ef4444';
        btn.style.background = '#fef2f2';
        if (letter) { letter.style.background = '#ef4444'; letter.style.color = '#fff'; letter.style.borderColor = '#ef4444'; }
      } else {
        btn.style.opacity = '0.5';
      }
    });

    // Show feedback panel
    showFeedback(correct, q, isAr);

    // Sounds
    if (window.SoundFX) {
      if (correct) SoundFX.success();
      else SoundFX.error();
    }

    // Voiceover
    if (window.Voiceover && window.Voiceover.enabled) {
      const explanation = isAr && q.explanationAr ? q.explanationAr : q.explanation;
      window.Voiceover.speak(explanation);
    }

    // Activate Next button
    const actionBtn = $$('.quiz-action-control-group-primary-action');
    if (actionBtn) {
      actionBtn.disabled = false;
      actionBtn.style.opacity = '1';
      actionBtn.style.cursor = 'pointer';

      // Remove old listener and rebind
      const newBtn = actionBtn.cloneNode(true);
      actionBtn.parentNode.replaceChild(newBtn, actionBtn);
      newBtn.disabled = false;
      newBtn.style.opacity = '1';
      newBtn.style.cursor = 'pointer';
      newBtn.addEventListener('click', () => {
        if (window.SoundFX) SoundFX.click();
        renderQuestion(state.currentQ + 1);
      });
    }

    // Update score
    updateScoreDisplay();
  }

  /* ─── Feedback panel ────────────────────────────────────────── */
  function showFeedback(correct, q, isAr) {
    const container = document.getElementById('answers-container');
    if (!container) return;

    // Find or create feedback panel
    let feedback = $$('.quiz-instant-feedback-and-educational-exp-content-card');

    // Inject inline feedback after options
    const explanation = isAr && q.explanationAr ? q.explanationAr : q.explanation;
    const feedbackHtml = `
      <div class="quiz-instant-feedback-and-educational-exp-content-card"
        style="margin-top:0.75rem;padding:1rem;border-radius:0.75rem;
          background:${correct ? '#f0fdf4' : '#fef2f2'};
          border:1.5px solid ${correct ? '#10b981' : '#ef4444'};">
        <div style="display:flex;align-items:center;gap:0.5rem;margin-bottom:0.5rem;">
          <span class="material-symbols-outlined" style="color:${correct ? '#10b981' : '#ef4444'};font-size:20px;">
            ${correct ? 'check_circle' : 'cancel'}
          </span>
          <span style="font-size:13px;font-weight:700;color:${correct ? '#065f46' : '#991b1b'};">
            ${correct ? (isAr ? 'إجابة صحيحة!' : 'Bonne réponse !') : (isAr ? 'إجابة خاطئة' : 'Réponse incorrecte')}
          </span>
        </div>
        <div style="display:flex;align-items:flex-start;gap:0.5rem;">
          <span class="material-symbols-outlined" style="font-size:18px;color:#0284c7;flex-shrink:0;margin-top:1px;">psychology_alt</span>
          <p style="font-size:13px;color:#334155;line-height:1.6;margin:0;">${explanation}</p>
        </div>
        ${correct ? `<div style="margin-top:0.5rem;display:flex;align-items:center;gap:0.375rem;font-size:12px;color:#059669;font-weight:600;">
          <span class="material-symbols-outlined" style="font-size:16px;">military_tech</span>
          +50 points de cyber-vigilance
        </div>` : ''}
      </div>`;

    // Remove old feedback if exists
    const old = $$('.quiz-instant-feedback-and-educational-exp-content-card');
    if (old) old.remove();
    container.insertAdjacentHTML('beforeend', feedbackHtml);
  }

  /* ─── Progress bar update ───────────────────────────────────── */
  function updateProgressBar(qIndex) {
    const total = state.questions.length;
    const pct = Math.round((qIndex / total) * 100);
    const lang = window.CyberLang ? window.CyberLang.current() : 'fr';
    const isAr = lang === 'ar';

    const progressText = $$('.quiz-glowing-progress-module-eyebrow');
    if (progressText) progressText.textContent = isAr
      ? `السؤال ${qIndex + 1} من ${total}`
      : `QUESTION ${qIndex + 1} SUR ${total}`;

    const pctText = $$('.quiz-glowing-progress-module-eyebrow-3');
    if (pctText) pctText.textContent = `${pct}% ${isAr ? 'مكتمل' : 'complété'}`;

    const fillEl = $$('.quiz-glowing-progress-module-progress-fill');
    if (fillEl) fillEl.style.width = `${pct}%`;

    // Update mini question markers
    const markers = $$$('.quiz-glowing-progress-module-status-badge, .quiz-glowing-progress-module-status-badge-2, .quiz-glowing-progress-module-status-badge-3');
    markers.forEach((marker, i) => {
      marker.className = i < qIndex ? 'quiz-glowing-progress-module-status-badge'
        : i === qIndex ? 'quiz-glowing-progress-module-status-badge-2'
        : 'quiz-glowing-progress-module-status-badge-3';
    });
  }

  /* ─── Score display update ──────────────────────────────────── */
  function updateScoreDisplay() {
    const scoreEl = $$('.quiz-quiz-header-and-metacognitive-progre-inline-text');
    if (scoreEl) scoreEl.textContent = `${state.score}/${state.answered.length} réussi${state.score > 1 ? 's' : ''}`;
  }

  /* ─── End quiz ──────────────────────────────────────────────── */
  function endQuiz() {
    const total = state.questions.length;
    const pct = Math.round((state.score / total) * 100);

    // Persist score
    if (window.CyberProgress) {
      window.CyberProgress.setModuleScore(state.moduleId, state.score, total);
    }

    // Play completion sound
    if (window.SoundFX) SoundFX.complete();

    // Redirect to results page
    setTimeout(() => {
      window.location.href = `resultatquiz.html?module=${state.moduleId}&score=${state.score}&total=${total}`;
    }, 800);
  }

  /* ─── Header progress ───────────────────────────────────────── */
  function updateProgressCapsule() {
    if (window.CyberProgress) window.CyberProgress.updateHeaderUI();
  }

  /* ─── "Revoir la vidéo" button ──────────────────────────────── */
  function bindReviewBtn() {
    const btn = $$('.quiz-action-control-group-button');
    if (btn) {
      btn.addEventListener('click', () => {
        window.location.href = `simulation.html?module=${state.moduleId}`;
      });
    }
  }

  /* ─── Language change listener ──────────────────────────────── */
  window.addEventListener('languagechange', () => {
    if (state.module) {
      updatePageMeta();
      renderQuestion(state.currentQ);
    }
  });

  /* ─── Bootstrap ─────────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    bindReviewBtn();
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
