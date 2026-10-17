/**
 * CyberShield Academy - Base de données pédagogique des modules
 * Contient les 3 modules du cahier des charges : Phishing, Passwords, DDoS
 */
(function () {
  'use strict';

  window.MODULES = {
    phishing: {
      id: 'phishing',
      title: 'Hameçonnage (Phishing)',
      titleAr: 'التصيد الاحتيالي (Phishing)',
      description: 'Repérez les indices subtils dans les courriels frauduleux, les faux liens et les pièces jointes piégées avant de cliquer.',
      descriptionAr: 'تعرف على المؤشرات الدقيقة في رسائل البريد الإلكتروني الاحتيالية والروابط المزيفة والمرفقات الضارة قبل النقر عليها.',
      level: 'Débutant',
      levelAr: 'مبتدئ',
      badge: 'Chasseur de Phishing',
      badgeAr: 'صياد التصيد الاحتيالي',
      duration: '15 min',
      nextModule: 'passwords',
      steps: [
        {
          stepNumber: 1,
          title: "L'expéditeur falsifié (Spoofing)",
          titleAr: 'تزييف المرسل (Spoofing)',
          explanation: "L'attaquant usurpe l'identité d'un organisme de confiance (banque, administration). L'adresse d'affichage paraît légitime, mais le nom de domaine réel après le @ (ex: @banque-notif-urgent.com) est frauduleux et n'appartient pas à l'institution officielle.",
          explanationAr: 'ينتحل المهاجم هوية جهة موثوقة (بنك، إدارة). يبدو اسم المرسل موثوقاً، لكن اسم النطاق الفعلي بعد @ (مثلاً: @banque-notif-urgent.com) مزيف ولا يتبع للمؤسسة الرسمية.',
          tip: "Vérifiez toujours scrupuleusement le domaine exact après le '@'.",
          tipAr: 'تحقق دائماً بدقة من اسم النطاق الفعلي بعد علامة @.',
          visualState: 'highlight-sender'
        },
        {
          stepNumber: 2,
          title: "L'urgence artificielle & la manipulation psychologique",
          titleAr: 'الإلحاح المصطنع والضغط النفسي',
          explanation: "Le message impose un compte à rebours anxiogène (ex: 'Suspension sous 24h', 'Dernier avis avant contentieux'). Cette tactique d'ingénierie sociale cherche à court-circuiter votre esprit critique et vous pousser à agir dans la précipitation.",
          explanationAr: 'تفرض الرسالة ضغطاً زمنياً مقلقاً (مثل: "إيقاف الحساب خلال 24 ساعة"). تهدف هذه الحيلة في الهندسة الاجتماعية إلى تعطيل تفكيرك النقدي ودفعك للتصرف بتسرع.',
          tip: "Face à une menace de blocage immédiat, respirez : les institutions n'agissent jamais ainsi par simple email.",
          tipAr: 'عند مواجهة تهديد بالإيقاف الفوري، خذ نفساً: المؤسسات الرسمية لا تتصرف بهذه الطريقة عبر بريد إلكتروني بسيط.',
          visualState: 'highlight-urgency'
        },
        {
          stepNumber: 3,
          title: "Le lien maquillé & l'URL piège",
          titleAr: 'الرابط المموه والعنوان الفخ',
          explanation: "Le bouton ou lien cliquable affiche un libellé rassurant ('Confirmer mes identifiants'), mais le survoler sans cliquer révèle une destination masquée vers une adresse IP suspecte ou un domaine pirate non sécurisé (HTTP au lieu de HTTPS).",
          explanationAr: 'يعرض الزر أو الرابط نصاً مطمئناً ("تأكيد بياناتي")، لكن تمرير المؤشر فوقه دون نقر يكشف وجهة خفية نحو عنوان IP مريب أو نطاق غير آمن.',
          tip: "Survolez toujours un lien avant de cliquer pour visualiser l'URL réelle en bas du navigateur.",
          tipAr: 'مرر دائماً المؤشر فوق الرابط قبل النقر لمعاينة العنوان الحقيقي أسفل المتصفح.',
          visualState: 'highlight-link'
        },
        {
          stepNumber: 4,
          title: "La fausse page de collecte (Credential Harvesting)",
          titleAr: 'صفحة جمع البيانات المزيفة',
          explanation: "En cliquant, la victime atterrit sur une copie quasi parfaite du portail de connexion bancaire. Dès que les identifiants et mots de passe sont saisis, ils sont instantanément transmis aux serveurs des cybercriminels.",
          explanationAr: 'عند النقر، يصل الضحية إلى نسخة مقلدة طبق الأصل لبوابة تسجيل الدخول البنكية. بمجرد إدخال اسم المستخدم وكلمة المرور، تُرسل فوراً إلى خوادم المجرمين.',
          tip: "Ne saisissez jamais d'identifiants après avoir suivi un lien reçu par courriel : ouvrez toujours l'URL officielle manuellement.",
          tipAr: 'لا تدخل أبداً بياناتك السرية بعد النقر على رابط بريدي: افتح الموقع الرسمي يدوياً في المتصفح.',
          visualState: 'highlight-harvest'
        }
      ],
      quiz: [
        {
          question: "Quel réflexe devez-vous adopter en premier dès la réception d'un courriel alarmant demandant une action urgente ?",
          questionAr: "ما هو رد الفعل الأول الذي يجب عليك اتخاذه فور استلام بريد إلكتروني مقلق يطلب إجراءً عاجلاً؟",
          options: [
            "Cliquer rapidement sur le lien pour vérifier si le compte est réellement bloqué",
            "Examiner attentivement l'adresse d'expédition réelle et le nom de domaine après le @",
            "Répondre immédiatement au courriel en demandant des explications",
            "Transférer le courriel à tous ses collègues sans avertissement"
          ],
          optionsAr: [
            "النقر بسرعة على الرابط للتأكد مما إذا كان الحساب معطلاً بالفعل",
            "فحص عنوان البريد الإلكتروني الفعلي واسم النطاق بعد علامة @ بعناية",
            "الرد فوراً على البريد لطلب توضيحات",
            "إعادة توجيه الرسالة إلى جميع الزملاء دون تحذير"
          ],
          correctIndex: 1,
          explanation: "L'adresse d'expédition réelle est l'indicateur le plus fiable : un attaquant peut usurper le nom affiché, mais le nom de domaine après l'arobase révèle l'origine technique du message.",
          explanationAr: "عنوان المرسل الفعلي هو المؤشر الأكثر موثوقية: يمكن للمهاجم تزييف الاسم الظاهر، لكن اسم النطاق بعد @ يكشف المصدر التقني الحقيقي للرسالة."
        },
        {
          question: "Vous recevez une pièce jointe nommée 'Facture_Fevrier.pdf.exe'. Quel est le risque majeur ?",
          questionAr: "استلمت ملفاً مرفقاً باسم 'Facture_Fevrier.pdf.exe'. ما هو الخطر الأبرز؟",
          options: [
            "C'est un fichier PDF compressé qui s'ouvrira plus vite",
            "C'est un programme exécutable malveillant camouflé par une fausse double extension",
            "Le fichier nécessite Adobe Acrobat version Pro pour être lu",
            "C'est un simple raccourci inoffensif vers un site web"
          ],
          optionsAr: [
            "إنه ملف PDF مضغوط سيفتح بشكل أسرع",
            "إنه برنامج تنفيذي ضار متخفٍ عبر امتداد مزدوج وهمي (.pdf.exe)",
            "يتطلب الملف برنامج Adobe Acrobat Pro لقراءته",
            "إنه مجرد اختصار غير ضار لموقع إلكتروني"
          ],
          correctIndex: 1,
          explanation: "La double extension (.pdf.exe) exploite le fait que Windows masque souvent les extensions connues. Le fichier est en réalité un exécutable (.exe) qui installera un malware dès son ouverture.",
          explanationAr: "الامتداد المزدوج (.pdf.exe) يستغل إخفاء نظام التشغيل للامتدادات المعروفة. الملف هو في الحقيقة برنامج تنفيذي (.exe) يثبت برمجيات خبيثة بمجرد فتحه."
        },
        {
          question: "Que révèle le fait de 'survoler' un lien avec la souris (sans cliquer) dans un courriel suspect ?",
          questionAr: "ماذا تكشف عملية 'تمرير' مؤشر الفأرة فوق رابط (دون نقره) في بريد مريب؟",
          options: [
            "Cela lance une analyse antivirus automatique du lien",
            "Cela permet de prévisualiser l'URL cible réelle vers laquelle le lien redirige véritablement",
            "Cela supprime le lien malveillant du courriel",
            "Cela informe l'expéditeur que vous avez lu le message"
          ],
          optionsAr: [
            "يبدأ فحصاً تلقائياً لمكافحة الفيروسات للرابط",
            "يتيح معاينة العنوان الحقيقي الفعلي (URL) الذي سيوجهك الرابط إليه",
            "يحذف الرابط الضار من البريد الإلكتروني",
            "يبلغ المرسل بأنك قرأت الرسالة"
          ],
          correctIndex: 1,
          explanation: "Le survol d'un lien (hover) affiche l'URL de destination dans la barre d'état du navigateur ou du client mail, permettant de démasquer les redirections trompeuses.",
          explanationAr: "تمرير المؤشر يعرض عنوان الوجهة الفعلي في شريط الحالة بالمتصفح أو برنامج البريد، مما يكشف عمليات إعادة التوجيه الخادعة."
        },
        {
          question: "Une prétendue banque vous demande par courriel de confirmer votre code confidentiel à 4 chiffres. Que devez-vous faire ?",
          questionAr: "طلب منك بنكك المزعوم عبر البريد تأكيد رمزك السري المكون من 4 أرقام. ماذا يجب أن تفعل؟",
          options: [
            "Le renseigner uniquement si la page est protégée par HTTPS",
            "Ne jamais le donner : aucune banque légitime ne demande jamais de code secret par courriel ou téléphone",
            "Envoyer la moitié du code par courriel et l'autre par SMS",
            "Demander d'abord une preuve d'identité à l'expéditeur par retour de mail"
          ],
          optionsAr: [
            "إدخاله فقط إذا كانت الصفحة محمية ببروتوكول HTTPS",
            "عدم تقديمه أبداً: لا يطلب أي بنك شرعي رموزك السرية عبر البريد الإلكتروني أو الهاتف",
            "إرسال نصف الرمز بالبريد والنصف الآخر عبر رسالة نصية SMS",
            "طلب إثبات هوية أولاً من المرسل بالرد على الرسالة"
          ],
          correctIndex: 1,
          explanation: "Règle d'or de la cybersécurité bancaire : les codes secrets, mots de passe et codes OTP ne doivent JAMAIS être transmis. Votre banque ne vous les demandera jamais.",
          explanationAr: "القاعدة الذهبية لأمن الحسابات البنكية: الرموز السرية وكلمات المرور ورموز OTP لا تُشارك أبداً. بنكك لن يطلبها منك إطلاقاً."
        },
        {
          question: "Que signifie le terme 'Smishing' ?",
          questionAr: "ماذا يعني مصطلح 'Smishing' في الأمن السيبراني؟",
          options: [
            "Une attaque DDoS visant les serveurs de messagerie instantanée",
            "Une tentative de phishing menée par SMS ou message mobile (ex: faux colis, amende)",
            "Un virus qui ralentit la vitesse de frappe au clavier",
            "Le piratage des cartes SIM dans les boutiques d'opérateurs"
          ],
          optionsAr: [
            "هجوم DDoS يستهدف خوادم المراسلة الفورية",
            "محاولة تصيد تتم عبر الرسائل النصية القصيرة SMS (مثل: طرد معلق، غرامة مرورية)",
            "فيروس يبطئ سرعة الكتابة على لوحة المفاتيح",
            "اختراق شرائح SIM في متاجر الاتصالات"
          ],
          correctIndex: 1,
          explanation: "Le Smishing (SMS + Phishing) utilise les messages textes mobiles pour inciter la victime à cliquer sur un lien piège, exploitant la confiance accordée spontanément aux SMS.",
          explanationAr: "التصيد عبر الرسائل النصية (SMS Phishing) يستغل الرسائل القصيرة لدفع الضحية للنقر على رابط مفخخ، مستغلاً الثقة التلقائية في رسائل الهاتف."
        }
      ]
    },

    passwords: {
      id: 'passwords',
      title: 'Mots de passe & Double Facteur',
      titleAr: 'كلمات المرور والمصادقة الثنائية (2FA)',
      description: 'Construisez des clés inviolables, comprenez les attaques par force brute et configurez la double authentification pour sanctuariser vos comptes.',
      descriptionAr: 'أنشئ كلمات مرور قوية، وافهم هجمات القوة الغاشمة (Brute Force)، وفعّل المصادقة الثنائية لحماية حساباتك نهائياً.',
      level: 'Débutant',
      levelAr: 'مبتدئ',
      badge: 'Gardien des Clés',
      badgeAr: 'حارس المفاتيح',
      duration: '12 min',
      nextModule: 'ddos',
      steps: [
        {
          stepNumber: 1,
          title: "L'entropie et la longueur d'un mot de passe",
          titleAr: 'الإنتروبيا وطول كلمة المرور',
          explanation: "La robustesse d'un mot de passe dépend de son entropie (imprévisibilité mathématique). La longueur est le facteur le plus déterminant : un mot de passe de 16 caractères combinant majuscules, minuscules, chiffres et symboles nécessite des siècles pour être forcé.",
          explanationAr: 'تعتمد قوة كلمة المرور على عشوائيتها الرياضية (الإنتروبيا). الطول هو العامل الأكثر حسماً: كلمة مرور من 16 خانة تجمع بين أحرف وأرقام ورموز تتطلب قروناً لكسرها.',
          tip: "Privilégiez une phrase de passe mémorable de 4 ou 5 mots aléatoires plutôt qu'un mot court complexe.",
          tipAr: 'اعتمد عبارة مرور مألوفة لك تتكون من 4 إلى 5 كلمات عشوائية بدلاً من كلمة قصيرة ومعقدة.',
          visualState: 'strength-meter'
        },
        {
          stepNumber: 2,
          title: "L'attaque par force brute et par dictionnaire",
          titleAr: 'هجمات القوة الغاشمة والقواميس',
          explanation: "Les pirates utilisent des ordinateurs surpuissants équipés de GPU capables de tester des milliards de combinaisons par seconde. Les dictionnaires de mots de passe courants (ex: '123456', 'azerty', 'password') sont testés en quelques millisecondes.",
          explanationAr: 'يستخدم القراصنة حواسيب فائقة قادرة على تجربة مليارات التوليفات في الثانية. وتُكشف كلمات المرور الشائعة في أجزاء من الألف من الثانية عبر هجمات القاموس.',
          tip: "Ne réutilisez jamais le même mot de passe sur plusieurs sites : une fuite sur l'un compromet tous les autres.",
          tipAr: 'إياك وإعادة استخدام نفس كلمة المرور على مواقع متعددة: فاي تسريب في موقع يعرض البقية للخطر.',
          visualState: 'brute-force'
        },
        {
          stepNumber: 3,
          title: "Le gestionnaire de mots de passe (Coffre-fort)",
          titleAr: 'مدير كلمات المرور (الخزنة الرقمية)',
          explanation: "Le cerveau humain ne peut mémoriser des dizaines de mots de passe complexes et uniques. Un gestionnaire de mots de passe chiffre vos identifiants dans un coffre-fort sécurisé, déverrouillé par un unique mot de passe maître robuste.",
          explanationAr: 'لا تستطيع الذاكرة البشرية حفظ عشرات كلمات المرور المعقدة والفريدة. يقوم مدير كلمات المرور بتشفير بياناتك في خزنة آمنة تُفتح بكلمة مرور رئيسية واحدة.',
          tip: "Adoptez un gestionnaire de mots de passe open-source ou certifié (ex: Bitwarden, KeePassXC).",
          tipAr: 'استخدم مدير كلمات مرور معتمداً وموثوقاً (مثل: Bitwarden أو KeePassXC).',
          visualState: 'password-manager'
        },
        {
          stepNumber: 4,
          title: "La double authentification (2FA / MFA)",
          titleAr: 'المصادقة الثنائية (2FA / MFA)',
          explanation: "La 2FA ajoute une seconde barrière inviolable : pour vous connecter, il faut ce que vous SAVEZ (mot de passe) ET ce que vous POSSÉDEZ (code temporaire TOTP généré sur smartphone ou clé physique FIDO). Même si votre mot de passe fuite, le pirate reste bloqué.",
          explanationAr: 'تضيف المصادقة الثنائية طبقة حماية ثانية: تتطلب ما تعرفه (كلمة المرور) وما تمتلكه (رمز TOTP مؤقت على هاتفك أو مفتاح أمان مادي). حتى لو سُرقت كلمة المرور، يظل المخترق عاجزاً.',
          tip: "Préférez les applications d'authentification (Google Auth, Microsoft Auth) aux SMS, plus vulnérables au SIM-swapping.",
          tipAr: 'فضل تطبيقات المصادقة على رسائل SMS، لتفادي مخاطر سرقة الشريحة (SIM-swapping).',
          visualState: '2fa-active'
        }
      ],
      quiz: [
        {
          question: "Quel facteur contribue le plus à rendre un mot de passe résistant aux attaques par force brute ?",
          questionAr: "ما هو العامل الأكثر مساهمة في جعل كلمة المرور مقاومة لهجمات القوة الغاشمة؟",
          options: [
            "Le fait de le changer tous les 7 jours obligatoirement",
            "Sa longueur totale (idéalement 14 à 16 caractères ou plus)",
            "L'utilisation exclusive de dates de naissance familiales",
            "L'inversion de l'ordre des lettres de son prénom"
          ],
          optionsAr: [
            "تغييرها إجبارياً كل 7 أيام",
            "طولها الإجمالي (من 14 إلى 16 خانة أو أكثر)",
            "الاعتماد الحصري على تواريخ الميلاد العائلية",
            "عكس ترتيب حروف اسمك الشخصي"
          ],
          correctIndex: 1,
          explanation: "Chaque caractère supplémentaire multiplie de façon exponentielle le nombre total de combinaisons possibles, rendant le calcul par force brute impraticable pour les ordinateurs.",
          explanationAr: "كل خانة إضافية تضاعف عدد التوليفات الممكنة هندسياً، مما يجعل كسرها بالقوة الغاشمة مستحيلاً عملياً على الحواسيب."
        },
        {
          question: "Pourquoi est-il dangereux de réutiliser le même mot de passe sur plusieurs sites web distincts ?",
          questionAr: "لماذا يُعد إعادة استخدام نفس كلمة المرور على عدة مواقع مختلفة أمراً بالغ الخطورة؟",
          options: [
            "Le mot de passe perd de sa longueur au fur et à mesure des connexions",
            "Si un seul des sites subit une fuite de données, les pirates testeront ce mot de passe sur tous vos autres comptes",
            "Les navigateurs refusent d'enregistrer deux fois le même mot de passe",
            "Cela ralentit considérablement la vitesse de la connexion Internet"
          ],
          optionsAr: [
            "تفقد كلمة المرور من طولها تدريجياً مع كثرة تسجيل الدخول",
            "إذا تعرض موقع واحد للاختراق والتسريب، فسيجرب القراصنة نفس الكلمة على جميع حساباتك الأخرى (Credential Stuffing)",
            "ترفض المتصفحات حفظ نفس كلمة المرور مرتين",
            "يبطئ ذلك سرعة اتصال الإنترنت بشكل ملحوظ"
          ],
          correctIndex: 1,
          explanation: "Cette technique s'appelle le 'Credential Stuffing' : les listes d'identifiants volés lors de fuites sont automatisées pour tester en masse les boîtes mails, réseaux sociaux et banques des victimes.",
          explanationAr: "تُعرف هذه التقنية باسم 'Credential Stuffing': تُستخدم البيانات المسربة آلياً لتجربة اختراق بريدك وبنوكك وحساباتك الاجتماعية في ثوانٍ."
        },
        {
          question: "Quel est le principe fondamental de la double authentification (2FA) ?",
          questionAr: "ما هو المبدأ الأساسي للمصادقة الثنائية (2FA)؟",
          options: [
            "Taper deux fois de suite son mot de passe pour s'assurer qu'il n'y a pas de faute de frappe",
            "Combiner au moins deux facteurs distincts : ce que je sais (mot de passe) et ce que je possède (téléphone, clé)",
            "Avoir deux adresses électroniques distinctes chez le même fournisseur",
            "Se connecter obligatoirement depuis deux ordinateurs différents en même temps"
          ],
          optionsAr: [
            "كتابة كلمة المرور مرتين متتاليتين للتأكد من عدم وجود أخطاء إملائية",
            "الجمع بين عاملين مستقلين: شيء تعرفه (كلمة المرور) وشيء تمتلكه (هاتفك الذكي أو مفتاح أمان)",
            "امتلاك عنواني بريد إلكتروني لدى نفس المزود",
            "تسجيل الدخول الإجباري من حاسوبين مختلفين في نفس الوقت"
          ],
          correctIndex: 1,
          explanation: "La 2FA exige deux preuves d'identité de catégories distinctes : la connaissance (mot de passe) et la possession (code TOTP mobile ou clé matérielle FIDO2).",
          explanationAr: "تتطلب المصادقة الثنائية إثباتين من فئتين مستقلتين: المعرفة (كلمة المرور) والحيازة (رمز TOTP عبر الهاتف أو مفتاح فيزيائي)."
        },
        {
          question: "Pourquoi une application d'authentification (ex: Google Authenticator) est-elle plus sûre qu'un SMS ?",
          questionAr: "لماذا يُعد تطبيق المصادقة (مثل Google Authenticator) أكثر أماناً من استلام الرمز عبر SMS؟",
          options: [
            "Les SMS sont payants alors que l'application est toujours gratuite",
            "Les SMS peuvent être interceptés ou détournés via l'attaque dite du 'SIM swapping'",
            "L'application fonctionne même sans aucun mot de passe maître",
            "Les SMS ne peuvent contenir que des lettres de l'alphabet"
          ],
          optionsAr: [
            "الرسائل النصية مدفوعة بينما التطبيق مجاني دائماً",
            "يمكن اعتراض رسائل SMS أو الاستيلاء على الرقم عبر هجوم تبديل الشريحة (SIM Swapping)",
            "التطبيق يعمل دون الحاجة لأي كلمة مرور رئيسية",
            "الرسائل النصية لا تدعم إلا الحروف الأبجدية"
          ],
          correctIndex: 1,
          explanation: "Dans une attaque SIM-swapping, le pirate convainc l'opérateur de transférer votre numéro sur sa propre carte SIM, captant ainsi tous vos SMS de sécurité. Les codes de l'application restent stockés localement sur votre appareil.",
          explanationAr: "في هجوم تبديل الشريحة (SIM Swapping)، يقنع المهاجم شركة الاتصالات بنقل رقمك إلى شريحته، مستولياً على رسائل الأمان. أما التطبيقات فتولد الرموز محلياً على جهازك دون اتصال."
        },
        {
          question: "Quel est l'avantage principal d'utiliser un gestionnaire de mots de passe certifié ?",
          questionAr: "ما هي الفائدة الرئيسية من استخدام مدير كلمات مرور معتمد؟",
          options: [
            "Il supprime totalement le besoin d'un écran d'ordinateur",
            "Il génère et stocke des mots de passe uniques et ultra-complexes pour chaque service dans un coffre chiffré",
            "Il empêche physiquement toute personne d'approcher de votre clavier",
            "Il accélère la vitesse de téléchargement de vos fichiers"
          ],
          optionsAr: [
            "يلغي تماماً الحاجة إلى شاشة الحاسوب",
            "يولد ويحفظ كلمات مرور فريدة وفائقة التعقيد لكل موقع في خزنة مشفرة بمفتاح رئيسي واحد",
            "يمنع فيزيائياً أي شخص من الاقتراب من لوحة المفاتيح",
            "يزيد من سرعة تحميل الملفات من الإنترنت"
          ],
          correctIndex: 1,
          explanation: "Le gestionnaire de mots de passe résout le dilemme humain sécurité/mémoire : vous n'avez à retenir qu'une seule phrase de passe maître robuste pour protéger des centaines d'accès uniques.",
          explanationAr: "يحل مدير كلمات المرور معضلة التوفيق بين الأمان والذاكرة: ما عليك سوى تذكر عبارة رئيسية واحدة قوية لحماية مئات الحسابات بكلمات فريدة."
        }
      ]
    },

    ddos: {
      id: 'ddos',
      title: 'Attaques DDoS & Saturation',
      titleAr: 'هجمات حجب الخدمة الموزعة (DDoS)',
      description: 'Démystifiez les réseaux de machines zombies (botnets), comprenez la saturation des bandes passantes et découvrez les contre-mesures de mitigation par CDN et pare-feu.',
      descriptionAr: 'افهم شبكات الأجهزة المخترقة (Botnets)، وكيفية إغراق الخوادم وسحق النطاق الترددي، واستكشف وسائل الحماية عبر جدران الحماية وشبكات CDN.',
      level: 'Débutant',
      levelAr: 'مبتدئ',
      badge: 'Défenseur du Réseau',
      badgeAr: 'مدافع الشبكة',
      duration: '18 min',
      nextModule: null,
      steps: [
        {
          stepNumber: 1,
          title: "L'anatomie d'un Botnet (Réseau Zombie)",
          titleAr: 'تشريح شبكة البوت نت (Botnet)',
          explanation: "Une attaque DDoS (Distributed Denial of Service) n'est pas menée depuis un seul ordinateur, mais par des milliers voire des millions d'appareils piratés (ordinateurs, caméras IP, routeurs connectés) contrôlés à distance par un serveur Command & Control (C2).",
          explanationAr: 'لا يُشن هجوم DDoS من حاسوب واحد، بل عبر آلاف أو ملايين الأجهزة المخترقة (حواسيب، كاميرات مراقبة، أجهزة راوتر) يتحكم فيها المهاجم عن بُعد كجيش رقمي منسق.',
          tip: "Sécurisez vos objets connectés (IoT) en changeant leurs identifiants par défaut pour éviter qu'ils ne deviennent des bots.",
          tipAr: 'احم أجهزتك الذكية (IoT) بتغيير كلمات المرور الافتراضية لمنع تجنيدها ضمن شبكات البوت نت.',
          visualState: 'botnet-overview'
        },
        {
          stepNumber: 2,
          title: "La saturation de la bande passante et des ressources",
          titleAr: 'إغراق وسحق موارد الخادم',
          explanation: "Sur ordre du cybercriminel, tous les bots envoient simultanément un torrent massif de requêtes illégitimes vers le serveur cible. La bande passante est saturée, la mémoire vive (RAM) et le processeur (CPU) sont submergés : les utilisateurs légitimes reçoivent une erreur '503 Service Unavailable'.",
          explanationAr: 'بأمر من المهاجم، ترسل جميع الأجهزة سيلاً هائلاً من الطلبات الوهمية إلى الخادم في آن واحد. يمتلئ النطاق الترددي وتنهار الذاكرة والمعالج، فيتعذر وصول المستخدمين الشرعيين.',
          tip: "Une attaque DDoS ne vole pas directement de données : elle vise à rendre le service indisponible pour nuire à la réputation ou bloquer l'activité.",
          tipAr: 'هجوم DDoS لا يسرق البيانات مباشرة، بل يهدف إلى إسقاط الموقع وتعطيل النشاط والتسبب في خسائر فادحة.',
          visualState: 'server-flooded'
        },
        {
          stepNumber: 3,
          title: "La filtration et les réseaux de diffusion (CDN)",
          titleAr: 'التصفية وشبكات توصيل المحتوى (CDN)',
          explanation: "Pour se défendre, les entreprises déploient des CDN (Content Delivery Networks) comme Cloudflare ou Akamai. Le trafic passe par des serveurs proxy géants répartis dans le monde entier (Anycast), capables d'absorber des térabits par seconde et de bloquer les requêtes suspectes grâce au Rate Limiting.",
          explanationAr: 'للحماية، تعتمد المؤسسات على شبكات CDN العالمية. يمر الترافيك عبر مراكز تصفية عملاقة قادرة على امتصاص هجمات بتيرابت في الثانية وعزل الحركات الخبيثة تلقائياً.',
          tip: "L'activation d'un pare-feu applicatif (WAF) permet de filtrer les requêtes anormales avant même qu'elles n'atteignent le serveur central.",
          tipAr: 'تفعيل جدار حماية التطبيقات (WAF) يتيح فرز الطلبات المشبوهة وحظرها قبل وصولها إلى خادمك الأصلي.',
          visualState: 'cdn-mitigation'
        },
        {
          stepNumber: 4,
          title: "La résilience d'infrastructure et redondance",
          titleAr: 'مرونة البنية التحتية والموازنة التلقائية',
          explanation: "Une architecture moderne résiliente combine la mise à l'échelle automatique (Autoscaling), la répartition de charge (Load Balancing) et des sauvegardes redondantes multi-régions. Lorsque la charge augmente, de nouveaux serveurs virtuels s'allument instantanément pour garantir la continuité de service.",
          explanationAr: 'تجمع البنية الحديثة بين التوسع التلقائي (Autoscaling) وتوزيع الأحمال (Load Balancing) عبر مناطق جغرافية متعددة، لضمان استمرار الخدمة حتى تحت أقسى الهجمات.',
          tip: "Préparez un plan de continuité d'activité (PCA) informatique testé régulièrement face aux pannes et attaques.",
          tipAr: 'ضع خطة طوارئ لاستمرارية الأعمال (BCP) واختبر آليات الصمود بانتظام.',
          visualState: 'resilience-ok'
        }
      ],
      quiz: [
        {
          question: "Quelle est la différence fondamentale entre une attaque DoS et une attaque DDoS ?",
          questionAr: "ما هو الفرق الجوهري بين هجوم DoS وهجوم DDoS؟",
          options: [
            "L'attaque DoS vole des mots de passe alors que la DDoS détruit physiquement les serveurs",
            "L'attaque DoS provient d'une seule machine, tandis que la DDoS utilise une multitude d'ordinateurs distribués (botnet)",
            "L'attaque DDoS ne fonctionne que sur les téléphones mobiles",
            "La DoS est légale dans certains pays alors que la DDoS est interdite"
          ],
          optionsAr: [
            "هجوم DoS يسرق كلمات المرور بينما DDoS يدمر الخوادم فيزيائياً",
            "هجوم DoS ينطلق من جهاز واحد، بينما DDoS يستعين بآلاف الأجهزة الموزعة جغرافياً (Botnet)",
            "هجوم DDoS لا يستهدف إلا الهواتف المحمولة",
            "هجوم DoS قانوني في بعض الدول بينما DDoS محظور دائماً"
          ],
          correctIndex: 1,
          explanation: "Le 'D' de DDoS signifie 'Distributed' (Distribué) : le flux d'attaque provient de milliers d'adresses IP dispersées à travers le monde, rendant le blocage manuel par adresse IP impossible.",
          explanationAr: "حرف 'D' الأول في DDoS يعني 'Distributed' (موزع): الترافيك ينبعث من آلاف العناوين الموزعة حول العالم، مما يجعل حظر عنوان IP منفرد غير فعال."
        },
        {
          question: "Qu'est-ce qu'un 'Botnet' dans le cadre d'une cyberattaque ?",
          questionAr: "ما هو تعريف 'البوت نت' (Botnet) في سياق الهجمات السيبرانية؟",
          options: [
            "Un robot d'intelligence artificielle qui aide à programmer des sites web",
            "Un réseau d'équipements connectés infectés par un logiciel malveillant et contrôlés à distance à l'insu de leurs propriétaires",
            "Un logiciel antivirus qui nettoie automatiquement les ordinateurs",
            "Un câble sous-marin reliant deux continents pour Internet"
          ],
          optionsAr: [
            "روبوت ذكاء اصطناعي يساعد في برمجة المواقع الإلكترونية",
            "شبكة من الأجهزة المخترقة ببرمجيات خبيثة وموجهة عن بُعد دون علم أصحابها لشن هجمات منسقة",
            "برنامج مضاد للفيروسات يقوم بتنظيف الأجهزة تلقائياً",
            "كابل ألياف بصرية بحري يربط بين قارتين لنقل الإنترنت"
          ],
          correctIndex: 1,
          explanation: "Un botnet est composé de machines compromises (ordinateurs, caméras, objets connectés) que les pirates enrôlent comme 'zombies' pour exécuter des attaques massives coordonnées.",
          explanationAr: "يتكون البوت نت من أجهزة مخترقة (حواسيب، أجهزة ذكية) يسخرها القراصنة كجنود رقميين 'زومبي' لتنفيذ هجمات واسعة النطاق."
        },
        {
          question: "Comment un réseau de diffusion de contenu (CDN) aide-t-il à contrer une attaque DDoS ?",
          questionAr: "كيف تساهم شبكة توزيع المحتوى (CDN) في إحباط هجمات DDoS والتخفيف من وطأتها؟",
          options: [
            "En coupant complètement la connexion Internet de l'entreprise victime",
            "En absorbant et distribuant le trafic massif sur un réseau mondial de serveurs proxy équipés de filtres anti-DDoS",
            "En poursuivant pénalement les pirates en justice automatiquement",
            "En éteignant physiquement les serveurs pour économiser l'électricité"
          ],
          optionsAr: [
            "بقطع اتصال الإنترنت بالكامل عن الشركة المستهدفة",
            "بامتصاص وتوزيع الترافيك الهائل عبر شبكة خوادم وسيطة عالمية مزودة بفلاتر ذكية لعزل الطلبات المشبوهة",
            "برفع دعاوى قضائية آلية وفورية ضد القراصنة",
            "بإطفاء الخوادم فيزيائياً لتوفير الطاقة"
          ],
          correctIndex: 1,
          explanation: "Les CDN disposent d'une bande passante gigantesque (plusieurs dizaines de térabits/s) et agissent comme un bouclier tampon en absorbant les pics d'attaque avant qu'ils ne touchent le serveur d'origine.",
          explanationAr: "تمتلك شبكات CDN سعات عملاقة وتعمل كدرع ممتص للصدمات، حيث تفلتر حركة المرور في مراكزها الموزعة قبل وصول أي طلب ضار إلى خادمك الأصلي."
        },
        {
          question: "Quel code d'erreur HTTP est le plus fréquemment affiché lorsqu'un serveur web est saturé par une attaque DDoS ?",
          questionAr: "ما هو رمز خطأ HTTP الأكثر شيوعاً عند انهيار خادم ويب تحت ضغط هجوم DDoS؟",
          options: [
            "200 OK (Succès)",
            "404 Not Found (Page introuvable)",
            "503 Service Unavailable (Service temporairement indisponible)",
            "301 Moved Permanently (Redirection permanente)"
          ],
          optionsAr: [
            "200 OK (نجاح الطلب)",
            "404 Not Found (الصفحة غير موجودة)",
            "503 Service Unavailable (الخدمة غير متوفرة مؤقتاً بسبب الحمل الزائد)",
            "301 Moved Permanently (إعادة توجيه دائمة)"
          ],
          correctIndex: 2,
          explanation: "L'erreur 503 signifie que le serveur web est opérationnel mais incapable de traiter la requête en raison d'une surcharge temporaire de ses ressources ou de sa file d'attente.",
          explanationAr: "يشير الخطأ 503 إلى أن الخادم حي ولكنه عاجز عن معالجة طلبات جديدة نتيجة الاستهلاك الكامل لموارده أو طوابير الانتظار."
        },
        {
          question: "Pourquoi les objets connectés (IoT comme les caméras, imprimantes, routeurs) sont-ils particulièrement ciblés pour créer des botnets ?",
          questionAr: "لماذا تُستهدف الأجهزة المتصلة الذكية (IoT مثل الكاميرات وأجهزة الراوتر) بكثافة لبناء شبكات البوت نت؟",
          options: [
            "Parce qu'ils sont souvent protégés par des mots de passe d'usine par défaut et reçoivent rarement des mises à jour de sécurité",
            "Parce qu'ils ont une puissance de calcul supérieure aux supercalculateurs",
            "Parce qu'ils ne sont jamais connectés à Internet",
            "Parce qu'ils ne consomment aucune énergie électrique"
          ],
          optionsAr: [
            "لأنها غالباً ما تترك بكلمات مرور المصنع الافتراضية ونادراً ما تخضع لتحديثات أمنية دورية",
            "لأن قدرتها الحسابية تفوق الحواسيب الفائقة",
            "لأنها لا تتصل بالإنترنت إطلاقاً",
            "لأنها لا تستهلك أي تيار كهربائي"
          ],
          correctIndex: 0,
          explanation: "Des millions d'appareils IoT sont déployés avec des mots de passe par défaut connus de tous (ex: admin/admin) et ne sont jamais mis à jour, ce qui en fait des cibles idéales pour des vers comme Mirai.",
          explanationAr: "تُنشر ملايين كاميرات المراقبة وأجهزة الراوتر بكلمات مرور افتراضية شائعة (مثل admin/admin) دون تحديث، مما يجعلها فريسة سهلة لبرمجيات الاختراق مثل Mirai."
        }
      ]
    }
  };
})();
