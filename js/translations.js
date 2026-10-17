/**
 * CyberShield Academy – UI Translations
 * Assigns a global TRANSLATIONS object used by i18n helpers throughout the app.
 * Supported locales: fr (French), ar (Arabic – RTL)
 *
 * Usage:
 *   const t = window.TRANSLATIONS[currentLang];
 *   element.textContent = t['nav_home'];
 */

window.TRANSLATIONS = {

  /* ─────────────────────────────────────────────────────────────
   * FRENCH
   * ───────────────────────────────────────────────────────────── */
  fr: {
    /* Navigation */
    nav_home:           "Accueil",
    nav_modules:        "Modules",
    nav_simulations:    "Simulations",
    nav_resources:      "Ressources",
    nav_quiz:           "Quiz",

    /* Common Buttons */
    btn_start_free:     "Commencer gratuitement",
    btn_next_question:  "Question suivante",
    btn_prev_step:      "Étape précédente",
    btn_next_step:      "Étape suivante",
    btn_play:           "Lire",
    btn_pause:          "Pause",
    btn_replay:         "Rejouer",
    btn_restart:        "Recommencer",
    btn_pass_quiz:      "Passer le quiz",
    btn_download_cert:  "Télécharger le certificat",
    btn_next_module:    "Module suivant",
    btn_redo_quiz:      "Refaire le quiz",
    btn_verify_identity:"Vérifier l'identité",
    btn_continue_lesson:"Continuer la leçon",

    /* Progress */
    progress_label:     "Progression",
    progress_global:    "Progression globale",
    progress_completed: "Complété",
    progress_step_of:   "Étape {current} sur {total}",

    /* Quiz */
    quiz_title_phishing:    "Quiz – Hameçonnage",
    quiz_title_passwords:   "Quiz – Mots de passe",
    quiz_title_ddos:        "Quiz – Attaques DDoS",
    quiz_correct_answer:    "Bonne réponse !",
    quiz_wrong_answer:      "Mauvaise réponse.",
    quiz_your_score:        "Votre score : {score} / {total}",
    quiz_next_module:       "Passer au module suivant",
    quiz_feedback_correct:  "Excellent ! Vous avez bien compris ce concept.",
    quiz_feedback_wrong:    "Ce n'est pas tout à fait ça. Relisez la leçon et réessayez.",
    quiz_question_of:       "Question {current} sur {total}",

    /* Simulation */
    sim_sandbox_safe:   "Environnement bac à sable – aucun risque réel",
    sim_step_label:     "Étape {n}",
    sim_voiceover_on:   "Narration activée",
    sim_voiceover_off:  "Narration désactivée",
    sim_speed:          "Vitesse",

    /* Certificate */
    cert_title:         "Certificat d'achèvement",
    cert_awarded_to:    "Décerné à",
    cert_download:      "Télécharger",
    cert_date:          "Date",
    cert_id:            "Identifiant du certificat",
    cert_enter_name:    "Entrez votre nom pour personnaliser votre certificat",

    /* General */
    hero_title:         "Maîtrisez la cybersécurité",
    hero_subtitle:      "Apprenez à vous protéger et à protéger vos données grâce à des simulations interactives.",
    footer_rights:      "Tous droits réservés.",
    lang_fr:            "Français",
    lang_ar:            "Arabe"
  },

  /* ─────────────────────────────────────────────────────────────
   * ARABIC  (RTL – العربية)
   * ───────────────────────────────────────────────────────────── */
  ar: {
    /* Navigation – التنقل */
    nav_home:           "الرئيسية",
    nav_modules:        "الوحدات",
    nav_simulations:    "المحاكاة",
    nav_resources:      "الموارد",
    nav_quiz:           "الاختبار",

    /* Common Buttons – الأزرار الشائعة */
    btn_start_free:     "ابدأ مجاناً",
    btn_next_question:  "السؤال التالي",
    btn_prev_step:      "الخطوة السابقة",
    btn_next_step:      "الخطوة التالية",
    btn_play:           "تشغيل",
    btn_pause:          "إيقاف مؤقت",
    btn_replay:         "إعادة التشغيل",
    btn_restart:        "إعادة البدء",
    btn_pass_quiz:      "إجراء الاختبار",
    btn_download_cert:  "تنزيل الشهادة",
    btn_next_module:    "الوحدة التالية",
    btn_redo_quiz:      "إعادة الاختبار",
    btn_verify_identity:"التحقق من الهوية",
    btn_continue_lesson:"متابعة الدرس",

    /* Progress – التقدم */
    progress_label:     "التقدم",
    progress_global:    "التقدم الإجمالي",
    progress_completed: "مكتمل",
    progress_step_of:   "الخطوة {current} من {total}",

    /* Quiz – الاختبار */
    quiz_title_phishing:    "اختبار – التصيد الاحتيالي",
    quiz_title_passwords:   "اختبار – كلمات المرور",
    quiz_title_ddos:        "اختبار – هجمات DDoS",
    quiz_correct_answer:    "إجابة صحيحة!",
    quiz_wrong_answer:      "إجابة خاطئة.",
    quiz_your_score:        "نتيجتك: {score} / {total}",
    quiz_next_module:       "الانتقال إلى الوحدة التالية",
    quiz_feedback_correct:  "ممتاز! لقد فهمت هذا المفهوم جيداً.",
    quiz_feedback_wrong:    "ليست الإجابة الصحيحة تماماً. راجع الدرس وحاول مجدداً.",
    quiz_question_of:       "السؤال {current} من {total}",

    /* Simulation – المحاكاة */
    sim_sandbox_safe:   "بيئة آمنة معزولة – لا يوجد خطر حقيقي",
    sim_step_label:     "الخطوة {n}",
    sim_voiceover_on:   "التعليق الصوتي مفعّل",
    sim_voiceover_off:  "التعليق الصوتي معطّل",
    sim_speed:          "السرعة",

    /* Certificate – الشهادة */
    cert_title:         "شهادة إتمام",
    cert_awarded_to:    "تُمنح إلى",
    cert_download:      "تنزيل",
    cert_date:          "التاريخ",
    cert_id:            "معرّف الشهادة",
    cert_enter_name:    "أدخل اسمك لتخصيص شهادتك",

    /* General – عام */
    hero_title:         "أتقن الأمن السيبراني",
    hero_subtitle:      "تعلّم كيف تحمي نفسك وبياناتك من خلال محاكاة تفاعلية.",
    footer_rights:      "جميع الحقوق محفوظة.",
    lang_fr:            "الفرنسية",
    lang_ar:            "العربية"
  }

};
