import json
import os

locales_dir = "/Users/ashwinpugazhendhi/SocialRaven/highshift.cloud-frontend/src/locales"

translations = {
    "en": {
        "instant": {
            "title": "Instant Publish",
            "subtitle": "Autonomous Content Distribution Engine",
            "coreTopic": "Core Topic",
            "coreTopicPlaceholder": "What's the story today?",
            "targetAudience": "Target Audience",
            "targetAudiencePlaceholder": "e.g. Tech Founders",
            "publishDate": "Publish Date",
            "distributionPoints": "Distribution Points",
            "handlePlaceholder": "@handle",
            "engineConfig": "Engine Configuration",
            "engineConfigDesc": "Distribution Strategy & Authentication",
            "pasteKey": "Paste Key to persist...",
            "persist": "Persist",
            "initiate": "Initiate Orchestration",
            "successKey": "API Key saved to profile!",
            "errorKey": "Failed to save API Key.",
            "successTrigger": "Orchestration triggered successfully!",
            "errorTrigger": "Failed to trigger automation."
        }
    },
    "ar": {
        "instant": {
            "title": "النشر الفوري",
            "subtitle": "محرك توزيع المحتوى المستقل",
            "coreTopic": "الموضوع الأساسي",
            "coreTopicPlaceholder": "ما هي القصة اليوم؟",
            "targetAudience": "الجمهور المستهدف",
            "targetAudiencePlaceholder": "مثل: مؤسسو التكنولوجيا",
            "publishDate": "تاريخ النشر",
            "distributionPoints": "نقاط التوزيع",
            "handlePlaceholder": "@المعرف",
            "engineConfig": "تكوين المحرك",
            "engineConfigDesc": "استراتيجية التوزيع والمصادقة",
            "pasteKey": "لصق المفتاح للاحتفاظ به...",
            "persist": "الاحتفاظ",
            "initiate": "بدء التنسيق",
            "successKey": "تم حفظ مفتاح API في الملف الشخصي!",
            "errorKey": "فشل حفظ مفتاح API.",
            "successTrigger": "تم تشغيل التنسيق بنجاح!",
            "errorTrigger": "فشل تشغيل الأتمتة."
        }
    },
    "es": {
        "instant": {
            "title": "Publicación Instantánea",
            "subtitle": "Motor de Distribución de Contenido Autónomo",
            "coreTopic": "Tema Central",
            "coreTopicPlaceholder": "¿Cuál es la historia de hoy?",
            "targetAudience": "Público Objetivo",
            "targetAudiencePlaceholder": "ej. Fundadores Tecnológicos",
            "publishDate": "Fecha de Publicación",
            "distributionPoints": "Puntos de Distribución",
            "handlePlaceholder": "@usuario",
            "engineConfig": "Configuración del Motor",
            "engineConfigDesc": "Estrategia de Distribución y Autenticación",
            "pasteKey": "Pegar clave para persistir...",
            "persist": "Persistir",
            "initiate": "Iniciar Orquestación",
            "successKey": "¡Clave API guardada en el perfil!",
            "errorKey": "Error al guardar la clave API.",
            "successTrigger": "¡Orquestación activada con éxito!",
            "errorTrigger": "Error al activar la automatización."
        }
    },
    "fr": {
        "instant": {
            "title": "Publication Instantanée",
            "subtitle": "Moteur de Distribution de Contenu Autonome",
            "coreTopic": "Sujet Central",
            "coreTopicPlaceholder": "Quelle est l'histoire d'aujourd'hui ?",
            "targetAudience": "Public Cible",
            "targetAudiencePlaceholder": "ex. Fondateurs Tech",
            "publishDate": "Date de Publication",
            "distributionPoints": "Points de Distribution",
            "handlePlaceholder": "@identifiant",
            "engineConfig": "Configuration du Moteur",
            "engineConfigDesc": "Stratégie de Distribution et Authentification",
            "pasteKey": "Collez la clé pour persister...",
            "persist": "Persister",
            "initiate": "Initier l'Orchestration",
            "successKey": "Clé API enregistrée dans le profil !",
            "errorKey": "Échec de l'enregistrement de la clé API.",
            "successTrigger": "Orchestration déclenchée avec succès !",
            "errorTrigger": "Échec du déclenchement de l'automatisation."
        }
    },
    "de": {
        "instant": {
            "title": "Sofortige Veröffentlichung",
            "subtitle": "Autonome Inhaltsverteilungsmaschine",
            "coreTopic": "Kernthema",
            "coreTopicPlaceholder": "Was ist die heutige Geschichte?",
            "targetAudience": "Zielgruppe",
            "targetAudiencePlaceholder": "z.B. Tech-Gründer",
            "publishDate": "Veröffentlichungsdatum",
            "distributionPoints": "Verteilungspunkte",
            "handlePlaceholder": "@benutzername",
            "engineConfig": "Motorkonfiguration",
            "engineConfigDesc": "Verteilungsstrategie & Authentifizierung",
            "pasteKey": "Schlüssel einfügen, um zu speichern...",
            "persist": "Speichern",
            "initiate": "Orchestrierung Initiieren",
            "successKey": "API-Schlüssel im Profil gespeichert!",
            "errorKey": "Fehler beim Speichern des API-Schlüssels.",
            "successTrigger": "Orchestrierung erfolgreich ausgelöst!",
            "errorTrigger": "Fehler beim Auslösen der Automatisierung."
        }
    },
    "zh": {
        "instant": {
            "title": "即时发布",
            "subtitle": "自主内容分发引擎",
            "coreTopic": "核心主题",
            "coreTopicPlaceholder": "今天的故事是什么？",
            "targetAudience": "目标受众",
            "targetAudiencePlaceholder": "例如 技术创始人",
            "publishDate": "发布日期",
            "distributionPoints": "分发点",
            "handlePlaceholder": "@用户名",
            "engineConfig": "引擎配置",
            "engineConfigDesc": "分发策略与身份验证",
            "pasteKey": "粘贴密钥以保存...",
            "persist": "保存",
            "initiate": "启动编排",
            "successKey": "API密钥已保存到配置文件！",
            "errorKey": "保存API密钥失败。",
            "successTrigger": "编排触发成功！",
            "errorTrigger": "触发自动化失败。"
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
            
print("InstantPublish locales updated successfully!")
