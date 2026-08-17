import json
import os

locales_dir = "/Users/ashwinpugazhendhi/SocialRaven/highshift.cloud-frontend/src/locales"

translations = {
    "en": {
        "analytics": {
            "title": "Neural Insights",
            "subtitle": "Real-time synthesis of cross-platform performance and audience resonance protocols.",
            "aggregating": "Aggregating Global Metrics...",
            "totalImpressions": "Total Impressions",
            "totalEngagement": "Total Engagement",
            "totalFollowers": "Total Followers",
            "growthTrajectory": "Growth Trajectory",
            "engagementPulsar": "Engagement Pulsar",
            "peakPerformance": "Peak Performance: Wednesday"
        }
    },
    "ar": {
        "analytics": {
            "title": "الرؤى العصبية",
            "subtitle": "توليف في الوقت الفعلي للأداء عبر الأنظمة الأساسية وبروتوكولات صدى الجمهور.",
            "aggregating": "تجميع المقاييس العالمية...",
            "totalImpressions": "إجمالي الانطباعات",
            "totalEngagement": "إجمالي التفاعل",
            "totalFollowers": "إجمالي المتابعين",
            "growthTrajectory": "مسار النمو",
            "engagementPulsar": "تفاعل النجم النابض",
            "peakPerformance": "ذروة الأداء: الأربعاء"
        }
    },
    "es": {
        "analytics": {
            "title": "Información Neuronal",
            "subtitle": "Síntesis en tiempo real del rendimiento multiplataforma y los protocolos de resonancia de la audiencia.",
            "aggregating": "Agregando Métricas Globales...",
            "totalImpressions": "Impresiones Totales",
            "totalEngagement": "Interacción Total",
            "totalFollowers": "Seguidores Totales",
            "growthTrajectory": "Trayectoria de Crecimiento",
            "engagementPulsar": "Púlsar de Interacción",
            "peakPerformance": "Rendimiento Máximo: Miércoles"
        }
    },
    "fr": {
        "analytics": {
            "title": "Informations Neuronales",
            "subtitle": "Synthèse en temps réel des performances multiplateformes et des protocoles de résonance d'audience.",
            "aggregating": "Agrégation des Métriques Globales...",
            "totalImpressions": "Impressions Totales",
            "totalEngagement": "Engagement Total",
            "totalFollowers": "Abonnés Totaux",
            "growthTrajectory": "Trajectoire de Croissance",
            "engagementPulsar": "Pulsar d'Engagement",
            "peakPerformance": "Performance Maximale : Mercredi"
        }
    },
    "de": {
        "analytics": {
            "title": "Neuronale Einblicke",
            "subtitle": "Echtzeitsynthese plattformübergreifender Leistungs- und Publikumsresonanzprotokolle.",
            "aggregating": "Globale Metriken Werden Aggregiert...",
            "totalImpressions": "Gesamte Impressionen",
            "totalEngagement": "Gesamtes Engagement",
            "totalFollowers": "Gesamte Follower",
            "growthTrajectory": "Wachstumsverlauf",
            "engagementPulsar": "Engagement-Pulsar",
            "peakPerformance": "Spitzenleistung: Mittwoch"
        }
    },
    "zh": {
        "analytics": {
            "title": "神经洞察",
            "subtitle": "跨平台表现和受众共鸣协议的实时合成。",
            "aggregating": "汇总全局指标...",
            "totalImpressions": "总展示次数",
            "totalEngagement": "总参与度",
            "totalFollowers": "总关注者",
            "growthTrajectory": "增长轨迹",
            "engagementPulsar": "参与度脉冲星",
            "peakPerformance": "峰值表现：星期三"
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
            
print("Analytics locales updated successfully!")
