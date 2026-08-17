import json
import os

locales_dir = "/Users/ashwinpugazhendhi/SocialRaven/highshift.cloud-frontend/src/locales"

translations = {
    "en": {
        "settings": {
            "tabIdentity": "Identity",
            "tabAlerts": "Alerts",
            "tabSecurity": "Security",
            "tabSubscription": "Subscription",
            "systemConfig": "System Config",
            "systemConfigDesc": "Calibrate your neural interface and manage authentication protocols for the socialraven network.",
            "identityMatrix": "Identity Matrix",
            "identityMatrixDesc": "Update your public signature across the network.",
            "displayLabel": "Display Label",
            "neuralAddress": "Neural Address",
            "syncProfile": "Synchronize profile",
            "premiumActive": "Premium Access Active",
            "premiumActiveDesc": "Your subscription is managed through our secure stripe portal. Review invoices and plan details below.",
            "accessStripe": "Access Stripe Portal",
            "protocolUnderDev": "Protocol Under Development",
            "neuralLinkComingSoon": "Neural link for {{tab}} coming soon"
        }
    },
    "ar": {
        "settings": {
            "tabIdentity": "الهوية",
            "tabAlerts": "التنبيهات",
            "tabSecurity": "الأمان",
            "tabSubscription": "الاشتراك",
            "systemConfig": "تكوين النظام",
            "systemConfigDesc": "قم بمعايرة واجهتك العصبية وإدارة بروتوكولات المصادقة لشبكة socialraven.",
            "identityMatrix": "مصفوفة الهوية",
            "identityMatrixDesc": "قم بتحديث توقيعك العام عبر الشبكة.",
            "displayLabel": "تسمية العرض",
            "neuralAddress": "العنوان العصبي",
            "syncProfile": "مزامنة الملف الشخصي",
            "premiumActive": "الوصول المميز نشط",
            "premiumActiveDesc": "تتم إدارة اشتراكك من خلال بوابة stripe الآمنة. راجع الفواتير وتفاصيل الخطة أدناه.",
            "accessStripe": "الوصول إلى بوابة Stripe",
            "protocolUnderDev": "البروتوكول قيد التطوير",
            "neuralLinkComingSoon": "الرابط العصبي لـ {{tab}} قريباً"
        }
    },
    "es": {
        "settings": {
            "tabIdentity": "Identidad",
            "tabAlerts": "Alertas",
            "tabSecurity": "Seguridad",
            "tabSubscription": "Suscripción",
            "systemConfig": "Configuración del Sistema",
            "systemConfigDesc": "Calibre su interfaz neuronal y administre los protocolos de autenticación para la red socialraven.",
            "identityMatrix": "Matriz de Identidad",
            "identityMatrixDesc": "Actualice su firma pública en toda la red.",
            "displayLabel": "Etiqueta de Visualización",
            "neuralAddress": "Dirección Neuronal",
            "syncProfile": "Sincronizar perfil",
            "premiumActive": "Acceso Premium Activo",
            "premiumActiveDesc": "Su suscripción se gestiona a través de nuestro portal seguro de stripe. Revise las facturas y los detalles del plan a continuación.",
            "accessStripe": "Acceder al Portal de Stripe",
            "protocolUnderDev": "Protocolo en Desarrollo",
            "neuralLinkComingSoon": "Enlace neuronal para {{tab}} próximamente"
        }
    },
    "fr": {
        "settings": {
            "tabIdentity": "Identité",
            "tabAlerts": "Alertes",
            "tabSecurity": "Sécurité",
            "tabSubscription": "Abonnement",
            "systemConfig": "Configuration Système",
            "systemConfigDesc": "Calibrez votre interface neuronale et gérez les protocoles d'authentification pour le réseau socialraven.",
            "identityMatrix": "Matrice d'Identité",
            "identityMatrixDesc": "Mettez à jour votre signature publique sur le réseau.",
            "displayLabel": "Étiquette d'Affichage",
            "neuralAddress": "Adresse Neuronale",
            "syncProfile": "Synchroniser le profil",
            "premiumActive": "Accès Premium Actif",
            "premiumActiveDesc": "Votre abonnement est géré via notre portail sécurisé stripe. Consultez les factures et les détails du forfait ci-dessous.",
            "accessStripe": "Accéder au portail Stripe",
            "protocolUnderDev": "Protocole en Développement",
            "neuralLinkComingSoon": "Lien neuronal pour {{tab}} bientôt disponible"
        }
    },
    "de": {
        "settings": {
            "tabIdentity": "Identität",
            "tabAlerts": "Benachrichtigungen",
            "tabSecurity": "Sicherheit",
            "tabSubscription": "Abonnement",
            "systemConfig": "Systemkonfiguration",
            "systemConfigDesc": "Kalibrieren Sie Ihre neuronale Schnittstelle und verwalten Sie Authentifizierungsprotokolle für das socialraven-Netzwerk.",
            "identityMatrix": "Identitätsmatrix",
            "identityMatrixDesc": "Aktualisieren Sie Ihre öffentliche Signatur im gesamten Netzwerk.",
            "displayLabel": "Anzeigename",
            "neuralAddress": "Neuronale Adresse",
            "syncProfile": "Profil synchronisieren",
            "premiumActive": "Premium-Zugang Aktiv",
            "premiumActiveDesc": "Ihr Abonnement wird über unser sicheres Stripe-Portal verwaltet. Überprüfen Sie unten Ihre Rechnungen und Plandetails.",
            "accessStripe": "Auf Stripe-Portal zugreifen",
            "protocolUnderDev": "Protokoll in Entwicklung",
            "neuralLinkComingSoon": "Neuronale Verbindung für {{tab}} in Kürze"
        }
    },
    "zh": {
        "settings": {
            "tabIdentity": "身份",
            "tabAlerts": "警报",
            "tabSecurity": "安全",
            "tabSubscription": "订阅",
            "systemConfig": "系统配置",
            "systemConfigDesc": "校准您的神经接口并管理socialraven网络的身份验证协议。",
            "identityMatrix": "身份矩阵",
            "identityMatrixDesc": "更新您在整个网络中的公开签名。",
            "displayLabel": "显示标签",
            "neuralAddress": "神经地址",
            "syncProfile": "同步个人资料",
            "premiumActive": "高级访问已激活",
            "premiumActiveDesc": "您的订阅通过我们安全的Stripe门户进行管理。请在下方查看发票和计划详情。",
            "accessStripe": "访问Stripe门户",
            "protocolUnderDev": "协议开发中",
            "neuralLinkComingSoon": "{{tab}}的神经链接即将推出"
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
            
print("Settings locales updated successfully!")
