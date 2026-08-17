import json
import os

locales_dir = "/Users/ashwinpugazhendhi/SocialRaven/highshift.cloud-frontend/src/locales"

translations = {
    "en": {
        "dashboard": {
            "title": "Overview: Engagement & Growth",
            "last30Days": "(Last 30 Days)",
            "reachEngagement": "Reach & Engagement",
            "allImpressions": "All Impressions",
            "totalImpressions": "Total Impressions",
            "engagements": "Engagements",
            "socialPerformance": "Social Media Performance",
            "followers": "Followers",
            "upcomingQueue": "Upcoming Posts & Queue",
            "productLaunch": "Product Launch 🚀",
            "productLaunchDesc": "We're so excited to announce the launch of our new features. Read more about it on our blog!",
            "scheduled": "Scheduled",
            "tomorrow": "Tomorrow, 11:00 AM",
            "recentActivity": "Recent Activity Feed",
            "linkedAccount": "Linked Account",
            "minAgo15": "15m ago",
            "activity1": "LinkedIn post \"Product Launch\" was successfully published.",
            "system": "System",
            "hoursAgo3": "3h ago",
            "activity2": "Generated weekly analytics report for all profiles.",
            "teamMember": "Team Member",
            "hoursAgo5": "5h ago",
            "activity3": "Added a new asset to the Brand Kit."
        }
    },
    "ar": {
        "dashboard": {
            "title": "نظرة عامة: التفاعل والنمو",
            "last30Days": "(آخر 30 يومًا)",
            "reachEngagement": "الوصول والتفاعل",
            "allImpressions": "جميع الانطباعات",
            "totalImpressions": "إجمالي الانطباعات",
            "engagements": "التفاعلات",
            "socialPerformance": "أداء وسائل التواصل الاجتماعي",
            "followers": "المتابعون",
            "upcomingQueue": "المنشورات القادمة وقائمة الانتظار",
            "productLaunch": "إطلاق المنتج 🚀",
            "productLaunchDesc": "نحن متحمسون جدًا للإعلان عن إطلاق ميزاتنا الجديدة. اقرأ المزيد عنها في مدونتنا!",
            "scheduled": "مجدول",
            "tomorrow": "غدًا، 11:00 صباحًا",
            "recentActivity": "سجل النشاطات الأخيرة",
            "linkedAccount": "حساب متصل",
            "minAgo15": "قبل 15 دقيقة",
            "activity1": "تم نشر منشور LinkedIn \"إطلاق المنتج\" بنجاح.",
            "system": "النظام",
            "hoursAgo3": "قبل 3 ساعات",
            "activity2": "تم إنشاء تقرير التحليلات الأسبوعي لجميع الملفات الشخصية.",
            "teamMember": "عضو الفريق",
            "hoursAgo5": "قبل 5 ساعات",
            "activity3": "تم إضافة أصل جديد إلى مجموعة العلامة التجارية."
        }
    },
    "es": {
        "dashboard": {
            "title": "Descripción general: Interacción y Crecimiento",
            "last30Days": "(Últimos 30 Días)",
            "reachEngagement": "Alcance e Interacción",
            "allImpressions": "Todas las Impresiones",
            "totalImpressions": "Impresiones Totales",
            "engagements": "Interacciones",
            "socialPerformance": "Rendimiento en Redes Sociales",
            "followers": "Seguidores",
            "upcomingQueue": "Próximas Publicaciones y Cola",
            "productLaunch": "Lanzamiento de Producto 🚀",
            "productLaunchDesc": "Estamos muy emocionados de anunciar el lanzamiento de nuestras nuevas funciones. ¡Lee más sobre ello en nuestro blog!",
            "scheduled": "Programado",
            "tomorrow": "Mañana, 11:00 AM",
            "recentActivity": "Feed de Actividad Reciente",
            "linkedAccount": "Cuenta Vinculada",
            "minAgo15": "Hace 15m",
            "activity1": "La publicación de LinkedIn \"Lanzamiento de Producto\" se publicó con éxito.",
            "system": "Sistema",
            "hoursAgo3": "Hace 3h",
            "activity2": "Se generó el informe analítico semanal para todos los perfiles.",
            "teamMember": "Miembro del Equipo",
            "hoursAgo5": "Hace 5h",
            "activity3": "Se agregó un nuevo activo al Kit de Marca."
        }
    },
    "fr": {
        "dashboard": {
            "title": "Aperçu : Engagement et Croissance",
            "last30Days": "(30 Derniers Jours)",
            "reachEngagement": "Portée et Engagement",
            "allImpressions": "Toutes les Impressions",
            "totalImpressions": "Impressions Totales",
            "engagements": "Engagements",
            "socialPerformance": "Performances des Réseaux Sociaux",
            "followers": "Abonnés",
            "upcomingQueue": "Prochaines Publications et File d'attente",
            "productLaunch": "Lancement de Produit 🚀",
            "productLaunchDesc": "Nous sommes ravis d'annoncer le lancement de nos nouvelles fonctionnalités. Lisez-en plus sur notre blog !",
            "scheduled": "Programmé",
            "tomorrow": "Demain, 11h00",
            "recentActivity": "Flux d'Activité Récente",
            "linkedAccount": "Compte Lié",
            "minAgo15": "Il y a 15m",
            "activity1": "La publication LinkedIn \"Lancement de Produit\" a été publiée avec succès.",
            "system": "Système",
            "hoursAgo3": "Il y a 3h",
            "activity2": "Rapport analytique hebdomadaire généré pour tous les profils.",
            "teamMember": "Membre de l'équipe",
            "hoursAgo5": "Il y a 5h",
            "activity3": "Nouvel actif ajouté au Kit de Marque."
        }
    },
    "de": {
        "dashboard": {
            "title": "Übersicht: Engagement & Wachstum",
            "last30Days": "(Letzte 30 Tage)",
            "reachEngagement": "Reichweite & Engagement",
            "allImpressions": "Alle Impressionen",
            "totalImpressions": "Gesamtimpressionen",
            "engagements": "Engagements",
            "socialPerformance": "Social Media Leistung",
            "followers": "Follower",
            "upcomingQueue": "Anstehende Beiträge & Warteschlange",
            "productLaunch": "Produkteinführung 🚀",
            "productLaunchDesc": "Wir freuen uns, die Einführung unserer neuen Funktionen bekannt zu geben. Lesen Sie mehr in unserem Blog!",
            "scheduled": "Geplant",
            "tomorrow": "Morgen, 11:00 Uhr",
            "recentActivity": "Letzte Aktivitäten",
            "linkedAccount": "Verknüpftes Konto",
            "minAgo15": "Vor 15 Min.",
            "activity1": "LinkedIn-Beitrag \"Produkteinführung\" wurde erfolgreich veröffentlicht.",
            "system": "System",
            "hoursAgo3": "Vor 3 Std.",
            "activity2": "Wöchentlicher Analysebericht für alle Profile generiert.",
            "teamMember": "Teammitglied",
            "hoursAgo5": "Vor 5 Std.",
            "activity3": "Neues Asset zum Brand Kit hinzugefügt."
        }
    },
    "zh": {
        "dashboard": {
            "title": "概览：参与度与增长",
            "last30Days": "（过去30天）",
            "reachEngagement": "触达与参与",
            "allImpressions": "所有展示次数",
            "totalImpressions": "总展示次数",
            "engagements": "参与次数",
            "socialPerformance": "社交媒体表现",
            "followers": "关注者",
            "upcomingQueue": "即将发布的帖子与队列",
            "productLaunch": "产品发布 🚀",
            "productLaunchDesc": "我们很高兴宣布推出新功能。在我们的博客上了解更多信息！",
            "scheduled": "已安排",
            "tomorrow": "明天，上午 11:00",
            "recentActivity": "最近活动流",
            "linkedAccount": "已链接的帐户",
            "minAgo15": "15分钟前",
            "activity1": "LinkedIn帖子“产品发布”已成功发布。",
            "system": "系统",
            "hoursAgo3": "3小时前",
            "activity2": "已为所有资料生成每周分析报告。",
            "teamMember": "团队成员",
            "hoursAgo5": "5小时前",
            "activity3": "向品牌资产库添加了新资产。"
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
            
print("Locales updated successfully!")
