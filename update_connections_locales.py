import json
import os

locales_dir = "/Users/ashwinpugazhendhi/SocialRaven/highshift.cloud-frontend/src/locales"

translations = {
    "en": {
        "connections": {
            "title": "Social Connections",
            "subtitle": "Profile-Based Account Orchestration",
            "newProfile": "New Profile",
            "selectProfile": "Select Profile",
            "accountsCount": "{{count}} Accounts",
            "noProfilesFound": "No Profiles Found",
            "orchestrate": "Orchestrate social flows for this profile",
            "cancel": "Cancel",
            "linkSocialAccount": "Link Social Account",
            "connectedAccounts": "Connected Accounts",
            "noAccountsLinked": "No Accounts Linked",
            "linkFirstAccount": "Link your first account to start publishing",
            "live": "Live",
            "selectProfileTitle": "Select a Profile",
            "selectProfileDesc": "Click a profile on the left to manage its social accounts or create a new one.",
            "createProfile": "Create Profile",
            "newProfileName": "New Profile Name",
            "eGClientName": "e.g., Client A, Brand B",
            "failedToCreate": "Failed to create profile",
            "failedToStartAuth": "Failed to start authentication",
            "disconnectConfirm": "Disconnect this account?",
            "failedToDisconnect": "Failed to disconnect"
        }
    },
    "ar": {
        "connections": {
            "title": "الاتصالات الاجتماعية",
            "subtitle": "تنسيق الحساب بناءً على الملف الشخصي",
            "newProfile": "ملف شخصي جديد",
            "selectProfile": "اختر الملف الشخصي",
            "accountsCount": "{{count}} حسابات",
            "noProfilesFound": "لم يتم العثور على ملفات شخصية",
            "orchestrate": "تنسيق التدفقات الاجتماعية لهذا الملف الشخصي",
            "cancel": "إلغاء",
            "linkSocialAccount": "ربط حساب اجتماعي",
            "connectedAccounts": "الحسابات المتصلة",
            "noAccountsLinked": "لا توجد حسابات مرتبطة",
            "linkFirstAccount": "اربط حسابك الأول للبدء في النشر",
            "live": "نشط",
            "selectProfileTitle": "حدد ملفًا شخصيًا",
            "selectProfileDesc": "انقر فوق ملف شخصي على اليسار لإدارة حساباته الاجتماعية أو إنشاء ملف جديد.",
            "createProfile": "إنشاء ملف شخصي",
            "newProfileName": "اسم الملف الشخصي الجديد",
            "eGClientName": "مثل: العميل أ، العلامة التجارية ب",
            "failedToCreate": "فشل إنشاء الملف الشخصي",
            "failedToStartAuth": "فشل بدء المصادقة",
            "disconnectConfirm": "هل تريد قطع اتصال هذا الحساب؟",
            "failedToDisconnect": "فشل قطع الاتصال"
        }
    },
    "es": {
        "connections": {
            "title": "Conexiones Sociales",
            "subtitle": "Orquestación de Cuentas Basada en Perfiles",
            "newProfile": "Nuevo Perfil",
            "selectProfile": "Seleccionar Perfil",
            "accountsCount": "{{count}} Cuentas",
            "noProfilesFound": "No se encontraron perfiles",
            "orchestrate": "Orquesta los flujos sociales para este perfil",
            "cancel": "Cancelar",
            "linkSocialAccount": "Vincular Cuenta Social",
            "connectedAccounts": "Cuentas Conectadas",
            "noAccountsLinked": "No hay cuentas vinculadas",
            "linkFirstAccount": "Vincula tu primera cuenta para comenzar a publicar",
            "live": "En vivo",
            "selectProfileTitle": "Selecciona un Perfil",
            "selectProfileDesc": "Haz clic en un perfil a la izquierda para administrar sus cuentas sociales o crear uno nuevo.",
            "createProfile": "Crear Perfil",
            "newProfileName": "Nombre del Nuevo Perfil",
            "eGClientName": "ej., Cliente A, Marca B",
            "failedToCreate": "Error al crear el perfil",
            "failedToStartAuth": "Error al iniciar la autenticación",
            "disconnectConfirm": "¿Desconectar esta cuenta?",
            "failedToDisconnect": "Error al desconectar"
        }
    },
    "fr": {
        "connections": {
            "title": "Connexions Sociales",
            "subtitle": "Orchestration de Compte Basée sur le Profil",
            "newProfile": "Nouveau Profil",
            "selectProfile": "Sélectionner un Profil",
            "accountsCount": "{{count}} Comptes",
            "noProfilesFound": "Aucun profil trouvé",
            "orchestrate": "Orchestrez les flux sociaux pour ce profil",
            "cancel": "Annuler",
            "linkSocialAccount": "Lier un Compte Social",
            "connectedAccounts": "Comptes Connectés",
            "noAccountsLinked": "Aucun compte lié",
            "linkFirstAccount": "Liez votre premier compte pour commencer à publier",
            "live": "En direct",
            "selectProfileTitle": "Sélectionnez un Profil",
            "selectProfileDesc": "Cliquez sur un profil à gauche pour gérer ses comptes sociaux ou en créer un nouveau.",
            "createProfile": "Créer un Profil",
            "newProfileName": "Nom du Nouveau Profil",
            "eGClientName": "ex. Client A, Marque B",
            "failedToCreate": "Échec de la création du profil",
            "failedToStartAuth": "Échec du démarrage de l'authentification",
            "disconnectConfirm": "Déconnecter ce compte ?",
            "failedToDisconnect": "Échec de la déconnexion"
        }
    },
    "de": {
        "connections": {
            "title": "Soziale Verbindungen",
            "subtitle": "Profilbasierte Konten-Orchestrierung",
            "newProfile": "Neues Profil",
            "selectProfile": "Profil Auswählen",
            "accountsCount": "{{count}} Konten",
            "noProfilesFound": "Keine Profile gefunden",
            "orchestrate": "Orchestrieren Sie soziale Flüsse für dieses Profil",
            "cancel": "Abbrechen",
            "linkSocialAccount": "Soziales Konto Verknüpfen",
            "connectedAccounts": "Verbundene Konten",
            "noAccountsLinked": "Keine Konten verknüpft",
            "linkFirstAccount": "Verknüpfen Sie Ihr erstes Konto, um mit dem Veröffentlichen zu beginnen",
            "live": "Live",
            "selectProfileTitle": "Wählen Sie ein Profil aus",
            "selectProfileDesc": "Klicken Sie links auf ein Profil, um seine sozialen Konten zu verwalten oder ein neues zu erstellen.",
            "createProfile": "Profil Erstellen",
            "newProfileName": "Neuer Profilname",
            "eGClientName": "z.B. Kunde A, Marke B",
            "failedToCreate": "Profil konnte nicht erstellt werden",
            "failedToStartAuth": "Authentifizierung konnte nicht gestartet werden",
            "disconnectConfirm": "Dieses Konto trennen?",
            "failedToDisconnect": "Trennung fehlgeschlagen"
        }
    },
    "zh": {
        "connections": {
            "title": "社交连接",
            "subtitle": "基于配置文件的帐户编排",
            "newProfile": "新配置文件",
            "selectProfile": "选择配置文件",
            "accountsCount": "{{count}} 个帐户",
            "noProfilesFound": "未找到配置文件",
            "orchestrate": "为此配置文件协调社交流程",
            "cancel": "取消",
            "linkSocialAccount": "链接社交帐户",
            "connectedAccounts": "关联的帐户",
            "noAccountsLinked": "未链接帐户",
            "linkFirstAccount": "关联您的第一个帐户以开始发布",
            "live": "实时",
            "selectProfileTitle": "选择一个配置文件",
            "selectProfileDesc": "单击左侧的配置文件以管理其社交帐户或创建一个新帐户。",
            "createProfile": "创建配置文件",
            "newProfileName": "新配置文件名称",
            "eGClientName": "例如，客户A，品牌B",
            "failedToCreate": "创建配置文件失败",
            "failedToStartAuth": "启动身份验证失败",
            "disconnectConfirm": "断开此帐户的连接？",
            "failedToDisconnect": "断开连接失败"
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
            
print("Connections locales updated successfully!")
