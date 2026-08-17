import json
import os

locales_dir = "/Users/ashwinpugazhendhi/SocialRaven/highshift.cloud-frontend/src/locales"

translations = {
    "en": {
        "smartinbox": {
            "title": "Facebook and Instagram, one queue",
            "subtitle": "One operational inbox for every connected Facebook Page and Instagram Business profile.",
            "workspaceLabel": "Unified social inbox",
            "metricAccounts": "Accounts",
            "metricFB": "FB",
            "metricIG": "IG",
            "connectedInboxes": "Connected inboxes",
            "connectedInboxesDesc": "Choose what feeds the shared queue",
            "all": "All",
            "searchAccounts": "Search accounts",
            "visibleSelected": "{{count}} visible selected",
            "clear": "Clear",
            "noMatchingAccounts": "No matching accounts",
            "noMatchingAccountsDesc": "Connect a Facebook Page or Instagram Business account, or change the current filters.",
            "allConversations": "All conversations",
            "activeThreads": "{{threadCount}} active threads across {{platformCount}} networks",
            "unifiedView": "Unified view",
            "threadDetails": "Thread details",
            "threadDetailsDesc": "Reply panel will open here",
            "selectConversation": "Select a conversation",
            "selectConversationDesc": "Thread detail, channel, and reply context will appear in this pane.",
            "channelsIncluded": "Channels included",
            "typeReply": "Type a reply...",
            "unifiedQueueReady": "Unified queue ready",
            "unifiedQueueDesc": "{{count}} selected inboxes are combined in this queue.",
            "noInboxesSelected": "No inboxes selected.",
            "connectedAccount": "Connected account"
        }
    },
    "ar": {
        "smartinbox": {
            "title": "فيسبوك وإنستغرام، قائمة انتظار واحدة",
            "subtitle": "صندوق وارد تشغيلي واحد لكل صفحة فيسبوك وملف إنستغرام أعمال متصل.",
            "workspaceLabel": "صندوق وارد اجتماعي موحد",
            "metricAccounts": "الحسابات",
            "metricFB": "فيسبوك",
            "metricIG": "إنستغرام",
            "connectedInboxes": "صناديق الوارد المتصلة",
            "connectedInboxesDesc": "اختر ما يغذي قائمة الانتظار المشتركة",
            "all": "الكل",
            "searchAccounts": "البحث في الحسابات",
            "visibleSelected": "{{count}} مرئي محدد",
            "clear": "مسح",
            "noMatchingAccounts": "لا توجد حسابات مطابقة",
            "noMatchingAccountsDesc": "قم بتوصيل صفحة فيسبوك أو حساب إنستغرام أعمال، أو قم بتغيير الفلاتر الحالية.",
            "allConversations": "كل المحادثات",
            "activeThreads": "{{threadCount}} سلاسل نشطة عبر {{platformCount}} شبكات",
            "unifiedView": "عرض موحد",
            "threadDetails": "تفاصيل السلسلة",
            "threadDetailsDesc": "ستفتح لوحة الرد هنا",
            "selectConversation": "حدد محادثة",
            "selectConversationDesc": "ستظهر تفاصيل السلسلة والقناة وسياق الرد في هذه اللوحة.",
            "channelsIncluded": "القنوات المضمنة",
            "typeReply": "اكتب ردًا...",
            "unifiedQueueReady": "قائمة الانتظار الموحدة جاهزة",
            "unifiedQueueDesc": "تم دمج {{count}} صناديق وارد محددة في قائمة الانتظار هذه.",
            "noInboxesSelected": "لم يتم تحديد أي صناديق وارد.",
            "connectedAccount": "حساب متصل"
        }
    },
    "es": {
        "smartinbox": {
            "title": "Facebook e Instagram, una cola",
            "subtitle": "Una bandeja de entrada operativa para cada página de Facebook y perfil comercial de Instagram conectado.",
            "workspaceLabel": "Bandeja de entrada social unificada",
            "metricAccounts": "Cuentas",
            "metricFB": "FB",
            "metricIG": "IG",
            "connectedInboxes": "Bandejas de entrada conectadas",
            "connectedInboxesDesc": "Elige qué alimenta la cola compartida",
            "all": "Todos",
            "searchAccounts": "Buscar cuentas",
            "visibleSelected": "{{count}} visible seleccionado",
            "clear": "Borrar",
            "noMatchingAccounts": "No hay cuentas coincidentes",
            "noMatchingAccountsDesc": "Conecta una página de Facebook o una cuenta comercial de Instagram, o cambia los filtros actuales.",
            "allConversations": "Todas las conversaciones",
            "activeThreads": "{{threadCount}} hilos activos en {{platformCount}} redes",
            "unifiedView": "Vista unificada",
            "threadDetails": "Detalles del hilo",
            "threadDetailsDesc": "El panel de respuesta se abrirá aquí",
            "selectConversation": "Selecciona una conversación",
            "selectConversationDesc": "El detalle del hilo, el canal y el contexto de respuesta aparecerán en este panel.",
            "channelsIncluded": "Canales incluidos",
            "typeReply": "Escribe una respuesta...",
            "unifiedQueueReady": "Cola unificada lista",
            "unifiedQueueDesc": "{{count}} bandejas de entrada seleccionadas se combinan en esta cola.",
            "noInboxesSelected": "No hay bandejas de entrada seleccionadas.",
            "connectedAccount": "Cuenta conectada"
        }
    },
    "fr": {
        "smartinbox": {
            "title": "Facebook et Instagram, une seule file d'attente",
            "subtitle": "Une boîte de réception opérationnelle pour chaque page Facebook et profil Instagram professionnel connecté.",
            "workspaceLabel": "Boîte de réception sociale unifiée",
            "metricAccounts": "Comptes",
            "metricFB": "FB",
            "metricIG": "IG",
            "connectedInboxes": "Boîtes de réception connectées",
            "connectedInboxesDesc": "Choisissez ce qui alimente la file d'attente partagée",
            "all": "Tout",
            "searchAccounts": "Rechercher des comptes",
            "visibleSelected": "{{count}} visible sélectionné",
            "clear": "Effacer",
            "noMatchingAccounts": "Aucun compte correspondant",
            "noMatchingAccountsDesc": "Connectez une page Facebook ou un compte Instagram professionnel, ou modifiez les filtres actuels.",
            "allConversations": "Toutes les conversations",
            "activeThreads": "{{threadCount}} fils actifs sur {{platformCount}} réseaux",
            "unifiedView": "Vue unifiée",
            "threadDetails": "Détails du fil",
            "threadDetailsDesc": "Le panneau de réponse s'ouvrira ici",
            "selectConversation": "Sélectionnez une conversation",
            "selectConversationDesc": "Les détails du fil, le canal et le contexte de réponse apparaîtront dans ce panneau.",
            "channelsIncluded": "Canaux inclus",
            "typeReply": "Tapez une réponse...",
            "unifiedQueueReady": "File d'attente unifiée prête",
            "unifiedQueueDesc": "{{count}} boîtes de réception sélectionnées sont combinées dans cette file d'attente.",
            "noInboxesSelected": "Aucune boîte de réception sélectionnée.",
            "connectedAccount": "Compte connecté"
        }
    },
    "de": {
        "smartinbox": {
            "title": "Facebook und Instagram, eine Warteschlange",
            "subtitle": "Ein operativer Posteingang für jede verbundene Facebook-Seite und jedes Instagram-Geschäftsprofil.",
            "workspaceLabel": "Vereinheitlichter Social-Posteingang",
            "metricAccounts": "Konten",
            "metricFB": "FB",
            "metricIG": "IG",
            "connectedInboxes": "Verbundene Posteingänge",
            "connectedInboxesDesc": "Wählen Sie, was die gemeinsame Warteschlange speist",
            "all": "Alle",
            "searchAccounts": "Konten suchen",
            "visibleSelected": "{{count}} sichtbar ausgewählt",
            "clear": "Löschen",
            "noMatchingAccounts": "Keine passenden Konten",
            "noMatchingAccountsDesc": "Verbinden Sie eine Facebook-Seite oder ein Instagram-Geschäftskonto oder ändern Sie die aktuellen Filter.",
            "allConversations": "Alle Konversationen",
            "activeThreads": "{{threadCount}} aktive Threads über {{platformCount}} Netzwerke",
            "unifiedView": "Einheitliche Ansicht",
            "threadDetails": "Thread-Details",
            "threadDetailsDesc": "Das Antwortfenster wird hier geöffnet",
            "selectConversation": "Wählen Sie eine Konversation",
            "selectConversationDesc": "Thread-Details, Kanal und Antwortkontext werden in diesem Bereich angezeigt.",
            "channelsIncluded": "Enthaltene Kanäle",
            "typeReply": "Antwort eingeben...",
            "unifiedQueueReady": "Einheitliche Warteschlange bereit",
            "unifiedQueueDesc": "{{count}} ausgewählte Posteingänge werden in dieser Warteschlange kombiniert.",
            "noInboxesSelected": "Keine Posteingänge ausgewählt.",
            "connectedAccount": "Verbundenes Konto"
        }
    },
    "zh": {
        "smartinbox": {
            "title": "Facebook和Instagram，一个队列",
            "subtitle": "为每个连接的Facebook页面和Instagram业务配置文件提供一个可操作的收件箱。",
            "workspaceLabel": "统一的社交收件箱",
            "metricAccounts": "帐户",
            "metricFB": "FB",
            "metricIG": "IG",
            "connectedInboxes": "已连接的收件箱",
            "connectedInboxesDesc": "选择共享队列的馈送源",
            "all": "全部",
            "searchAccounts": "搜索帐户",
            "visibleSelected": "{{count}} 个可见项已选",
            "clear": "清除",
            "noMatchingAccounts": "没有匹配的帐户",
            "noMatchingAccountsDesc": "连接Facebook页面或Instagram商业帐户，或更改当前过滤器。",
            "allConversations": "所有对话",
            "activeThreads": "{{platformCount}}个网络上的{{threadCount}}个活动线程",
            "unifiedView": "统一视图",
            "threadDetails": "线程详细信息",
            "threadDetailsDesc": "回复面板将在此处打开",
            "selectConversation": "选择对话",
            "selectConversationDesc": "线程详细信息、频道和回复上下文将显示在此窗格中。",
            "channelsIncluded": "包括的频道",
            "typeReply": "输入回复...",
            "unifiedQueueReady": "统一队列准备就绪",
            "unifiedQueueDesc": "{{count}}个选定的收件箱合并到此队列中。",
            "noInboxesSelected": "未选择收件箱。",
            "connectedAccount": "已连接的帐户"
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
            
print("SmartInbox locales updated successfully!")
