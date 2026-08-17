import json
import os

locales_dir = "/Users/ashwinpugazhendhi/SocialRaven/highshift.cloud-frontend/src/locales"

translations = {
    "en": {
        "product": {
            "heroTitle": "Engineered<br/>For Impact",
            "heroSubtitle": "The Silent Engine of Social Success",
            "deployRaven": "Deploy Raven",
            "documentation": "Documentation",
            "profileTitle": "Profile Orchestration",
            "profileHeadline": "Group Your Worlds",
            "profileDesc": "Separate clients, brands, or projects into distinct Profiles. Link multiple social accounts under each profile to keep your data siloed and your workflow clean.",
            "instantTitle": "Instant Distribution",
            "instantHeadline": "The Speed of AI",
            "instantDesc": "Enter a topic, define your audience, and let Social Raven handle the rest. Our orchestration engine instantly crafts and distributes optimized content across your nodes.",
            "neuralTitle": "Neural Engine",
            "neuralHeadline": "Your AI Ghostwriter",
            "neuralDesc": "Built-in AI writing assistant that learns your brand tone and crafts compelling hooks for X, LinkedIn, Instagram, and more.",
            "archTitle": "Advanced Architecture",
            "archSubtitle": "A Technical Masterpiece Built for Scale",
            "stat1Title": "Smart Targeting",
            "stat1Desc": "Algorithm Optimized",
            "stat2Title": "Unified Hub",
            "stat2Desc": "Cross-Platform Support",
            "stat3Title": "Deep Insights",
            "stat3Desc": "Engagement Tracking",
            "stat4Title": "Bank-Grade",
            "stat4Desc": "Key Management",
            "ctaTitle": "Take Flight Today",
            "ctaButton": "Start Your Evolution",
            "learnMore": "Learn More"
        }
    },
    "ar": {
        "product": {
            "heroTitle": "مصمم<br/>للتأثير",
            "heroSubtitle": "المحرك الصامت للنجاح الاجتماعي",
            "deployRaven": "نشر الغراب",
            "documentation": "الوثائق",
            "profileTitle": "تنسيق الملف الشخصي",
            "profileHeadline": "اجمع عوالمك",
            "profileDesc": "افصل العملاء أو العلامات التجارية أو المشاريع إلى ملفات تعريف مميزة. اربط حسابات اجتماعية متعددة تحت كل ملف تعريف للحفاظ على بياناتك معزولة وسير عملك نظيفًا.",
            "instantTitle": "توزيع فوري",
            "instantHeadline": "سرعة الذكاء الاصطناعي",
            "instantDesc": "أدخل موضوعًا وحدد جمهورك واترك Social Raven يتولى الباقي. يقوم محرك التنسيق لدينا بإنشاء محتوى محسّن وتوزيعه على الفور عبر عقدك.",
            "neuralTitle": "المحرك العصبي",
            "neuralHeadline": "الكاتب الشبح بالذكاء الاصطناعي",
            "neuralDesc": "مساعد كتابة مدمج يعمل بالذكاء الاصطناعي يتعلم نبرة علامتك التجارية ويصوغ خطافات مقنعة لـ X و LinkedIn و Instagram والمزيد.",
            "archTitle": "العمارة المتقدمة",
            "archSubtitle": "تحفة فنية مبنية على نطاق واسع",
            "stat1Title": "استهداف ذكي",
            "stat1Desc": "خوارزمية محسنة",
            "stat2Title": "مركز موحد",
            "stat2Desc": "دعم عبر الأنظمة الأساسية",
            "stat3Title": "رؤى عميقة",
            "stat3Desc": "تتبع المشاركة",
            "stat4Title": "على مستوى البنك",
            "stat4Desc": "إدارة المفاتيح",
            "ctaTitle": "انطلق اليوم",
            "ctaButton": "ابدأ تطورك",
            "learnMore": "يتعلم أكثر"
        }
    },
    "es": {
        "product": {
            "heroTitle": "Diseñado<br/>Para el Impacto",
            "heroSubtitle": "El Motor Silencioso del Éxito Social",
            "deployRaven": "Desplegar Raven",
            "documentation": "Documentación",
            "profileTitle": "Orquestación de Perfiles",
            "profileHeadline": "Agrupa Tus Mundos",
            "profileDesc": "Separa clientes, marcas o proyectos en Perfiles distintos. Vincula múltiples cuentas sociales bajo cada perfil para mantener tus datos aislados y tu flujo de trabajo limpio.",
            "instantTitle": "Distribución Instantánea",
            "instantHeadline": "La Velocidad de la IA",
            "instantDesc": "Ingresa un tema, define tu audiencia y deja que Social Raven se encargue del resto. Nuestro motor de orquestación elabora y distribuye instantáneamente contenido optimizado a través de tus nodos.",
            "neuralTitle": "Motor Neuronal",
            "neuralHeadline": "Tu Escritor Fantasma de IA",
            "neuralDesc": "Asistente de escritura de IA incorporado que aprende el tono de tu marca y elabora ganchos convincentes para X, LinkedIn, Instagram y más.",
            "archTitle": "Arquitectura Avanzada",
            "archSubtitle": "Una Obra Maestra Técnica Construida para Escalar",
            "stat1Title": "Orientación Inteligente",
            "stat1Desc": "Algoritmo Optimizado",
            "stat2Title": "Centro Unificado",
            "stat2Desc": "Soporte Multiplataforma",
            "stat3Title": "Conocimientos Profundos",
            "stat3Desc": "Seguimiento de Participación",
            "stat4Title": "Nivel Bancario",
            "stat4Desc": "Gestión de Claves",
            "ctaTitle": "Emprende el Vuelo Hoy",
            "ctaButton": "Comienza Tu Evolución",
            "learnMore": "Aprende Más"
        }
    },
    "fr": {
        "product": {
            "heroTitle": "Conçu<br/>Pour l'Impact",
            "heroSubtitle": "Le Moteur Silencieux du Succès Social",
            "deployRaven": "Déployer Raven",
            "documentation": "Documentation",
            "profileTitle": "Orchestration de Profils",
            "profileHeadline": "Regroupez Vos Mondes",
            "profileDesc": "Séparez les clients, les marques ou les projets dans des profils distincts. Liez plusieurs comptes sociaux sous chaque profil pour conserver vos données isolées et votre flux de travail propre.",
            "instantTitle": "Distribution Instantanée",
            "instantHeadline": "La Vitesse de l'IA",
            "instantDesc": "Saisissez un sujet, définissez votre audience et laissez Social Raven s'occuper du reste. Notre moteur d'orchestration crée et distribue instantanément un contenu optimisé sur vos nœuds.",
            "neuralTitle": "Moteur Neuronal",
            "neuralHeadline": "Votre Prête-plume IA",
            "neuralDesc": "Assistant d'écriture IA intégré qui apprend le ton de votre marque et crée des accroches percutantes pour X, LinkedIn, Instagram et plus encore.",
            "archTitle": "Architecture Avancée",
            "archSubtitle": "Un Chef-d'œuvre Technique Conçu pour Évoluer",
            "stat1Title": "Ciblage Intelligent",
            "stat1Desc": "Algorithme Optimisé",
            "stat2Title": "Hub Unifié",
            "stat2Desc": "Prise en Charge Multiplateforme",
            "stat3Title": "Aperçus Profonds",
            "stat3Desc": "Suivi de l'Engagement",
            "stat4Title": "Niveau Bancaire",
            "stat4Desc": "Gestion des Clés",
            "ctaTitle": "Prenez Votre Envol Aujourd'hui",
            "ctaButton": "Commencez Votre Évolution",
            "learnMore": "En Savoir Plus"
        }
    },
    "de": {
        "product": {
            "heroTitle": "Entwickelt<br/>Für Wirkung",
            "heroSubtitle": "Der stille Motor des sozialen Erfolgs",
            "deployRaven": "Raven Bereitstellen",
            "documentation": "Dokumentation",
            "profileTitle": "Profil-Orchestrierung",
            "profileHeadline": "Gruppieren Sie Ihre Welten",
            "profileDesc": "Trennen Sie Kunden, Marken oder Projekte in verschiedene Profile. Verknüpfen Sie mehrere soziale Konten unter jedem Profil, um Ihre Daten isoliert und Ihren Workflow sauber zu halten.",
            "instantTitle": "Sofortige Verteilung",
            "instantHeadline": "Die Geschwindigkeit der KI",
            "instantDesc": "Geben Sie ein Thema ein, definieren Sie Ihre Zielgruppe und überlassen Sie Social Raven den Rest. Unsere Orchestrierungsmaschine erstellt und verteilt sofort optimierte Inhalte über Ihre Knoten.",
            "neuralTitle": "Neuronale Engine",
            "neuralHeadline": "Ihr KI-Ghostwriter",
            "neuralDesc": "Integrierter KI-Schreibassistent, der den Ton Ihrer Marke lernt und überzeugende Hooks für X, LinkedIn, Instagram und mehr erstellt.",
            "archTitle": "Erweiterte Architektur",
            "archSubtitle": "Ein technisches Meisterwerk, gebaut für Skalierbarkeit",
            "stat1Title": "Intelligentes Targeting",
            "stat1Desc": "Algorithmus Optimiert",
            "stat2Title": "Einheitlicher Hub",
            "stat2Desc": "Plattformübergreifende Unterstützung",
            "stat3Title": "Tiefe Einblicke",
            "stat3Desc": "Engagement-Tracking",
            "stat4Title": "Bank-Grade",
            "stat4Desc": "Schlüsselverwaltung",
            "ctaTitle": "Fliegen Sie heute los",
            "ctaButton": "Starten Sie Ihre Evolution",
            "learnMore": "Mehr Erfahren"
        }
    },
    "zh": {
        "product": {
            "heroTitle": "专为<br/>影响而设计",
            "heroSubtitle": "社交成功的无声引擎",
            "deployRaven": "部署 Raven",
            "documentation": "文档",
            "profileTitle": "配置文件编排",
            "profileHeadline": "分组您的世界",
            "profileDesc": "将客户、品牌或项目分离到不同的配置文件中。在每个配置文件下链接多个社交帐户，以保持数据孤立并保持工作流整洁。",
            "instantTitle": "即时分发",
            "instantHeadline": "AI的速度",
            "instantDesc": "输入主题，定义受众，然后让Social Raven处理其余的事情。我们的编排引擎即时制作并跨节点分发优化内容。",
            "neuralTitle": "神经引擎",
            "neuralHeadline": "您的AI代笔",
            "neuralDesc": "内置AI写作助手，了解您的品牌基调，并为X、LinkedIn、Instagram等制作引人注目的钩子。",
            "archTitle": "高级架构",
            "archSubtitle": "专为扩展而设计的技术杰作",
            "stat1Title": "智能定位",
            "stat1Desc": "算法优化",
            "stat2Title": "统一中心",
            "stat2Desc": "跨平台支持",
            "stat3Title": "深度洞察",
            "stat3Desc": "参与度跟踪",
            "stat4Title": "银行级",
            "stat4Desc": "密钥管理",
            "ctaTitle": "今天起飞",
            "ctaButton": "开始您的演进",
            "learnMore": "了解更多"
        }
    }
}

for lang, data in translations.items():
    filepath = os.path.join(locales_dir, f"{lang}.json")
    if os.path.exists(filepath):
        with open(filepath, 'r', encoding='utf-8') as f:
            current_data = json.load(f)
        
        current_data.update(data)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(current_data, f, ensure_ascii=False, indent=2)
            
print("Product locales updated successfully!")
