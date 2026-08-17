import json
import os

locales_dir = "/Users/ashwinpugazhendhi/SocialRaven/highshift.cloud-frontend/src/locales"

translations = {
    "en": {
        "schedule": {
            "title": "Temporal Command",
            "subtitle": "Orchestrate your global transmission capability.",
            "schedulePost": "Schedule Post",
            "recentActivity": "Recent Activity",
            "noRecentActivity": "No recent activity",
            "viewHistory": "View Full History",
            "viewHistoryDesc": "Analyze your transmission logs.",
            "newTransmission": "New Transmission",
            "postsCount": "{{count}} Posts"
        }
    },
    "ar": {
        "schedule": {
            "title": "القيادة الزمنية",
            "subtitle": "نظم قدرة النقل العالمية الخاصة بك.",
            "schedulePost": "جدولة المنشور",
            "recentActivity": "النشاط الأخير",
            "noRecentActivity": "لا يوجد نشاط أخير",
            "viewHistory": "عرض السجل الكامل",
            "viewHistoryDesc": "تحليل سجلات النقل الخاصة بك.",
            "newTransmission": "نقل جديد",
            "postsCount": "{{count}} منشورات"
        }
    },
    "es": {
        "schedule": {
            "title": "Comando Temporal",
            "subtitle": "Orquesta tu capacidad de transmisión global.",
            "schedulePost": "Programar Publicación",
            "recentActivity": "Actividad Reciente",
            "noRecentActivity": "Sin actividad reciente",
            "viewHistory": "Ver Historial Completo",
            "viewHistoryDesc": "Analiza tus registros de transmisión.",
            "newTransmission": "Nueva Transmisión",
            "postsCount": "{{count}} Publicaciones"
        }
    },
    "fr": {
        "schedule": {
            "title": "Commande Temporelle",
            "subtitle": "Orchestrez votre capacité de transmission globale.",
            "schedulePost": "Planifier une publication",
            "recentActivity": "Activité récente",
            "noRecentActivity": "Aucune activité récente",
            "viewHistory": "Voir l'historique complet",
            "viewHistoryDesc": "Analysez vos journaux de transmission.",
            "newTransmission": "Nouvelle Transmission",
            "postsCount": "{{count}} Publications"
        }
    },
    "de": {
        "schedule": {
            "title": "Zeitliche Steuerung",
            "subtitle": "Orchestrieren Sie Ihre globale Übertragungsfähigkeit.",
            "schedulePost": "Beitrag Planen",
            "recentActivity": "Letzte Aktivitäten",
            "noRecentActivity": "Keine letzten Aktivitäten",
            "viewHistory": "Vollständigen Verlauf anzeigen",
            "viewHistoryDesc": "Analysieren Sie Ihre Übertragungsprotokolle.",
            "newTransmission": "Neue Übertragung",
            "postsCount": "{{count}} Beiträge"
        }
    },
    "zh": {
        "schedule": {
            "title": "时序指挥",
            "subtitle": "协调您的全球传输能力。",
            "schedulePost": "计划发布",
            "recentActivity": "最近活动",
            "noRecentActivity": "最近没有活动",
            "viewHistory": "查看完整历史",
            "viewHistoryDesc": "分析您的传输日志。",
            "newTransmission": "新传输",
            "postsCount": "{{count}} 帖子"
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
            
print("Schedule locales updated successfully!")
