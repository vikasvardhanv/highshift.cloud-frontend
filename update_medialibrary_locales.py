import json
import os

locales_dir = "/Users/ashwinpugazhendhi/SocialRaven/highshift.cloud-frontend/src/locales"

translations = {
    "en": {
        "media": {
            "title": "Media Library",
            "subtitle": "Your uploaded images and videos.",
            "noMedia": "No media yet",
            "noMediaDesc": "Upload images or videos when composing posts to see them here."
        }
    },
    "ar": {
        "media": {
            "title": "مكتبة الوسائط",
            "subtitle": "الصور ومقاطع الفيديو التي تم تحميلها.",
            "noMedia": "لا توجد وسائط حتى الآن",
            "noMediaDesc": "قم بتحميل الصور أو مقاطع الفيديو عند كتابة المنشورات لرؤيتها هنا."
        }
    },
    "es": {
        "media": {
            "title": "Biblioteca de Medios",
            "subtitle": "Tus imágenes y videos subidos.",
            "noMedia": "Aún no hay medios",
            "noMediaDesc": "Sube imágenes o videos al componer publicaciones para verlos aquí."
        }
    },
    "fr": {
        "media": {
            "title": "Médiathèque",
            "subtitle": "Vos images et vidéos téléchargées.",
            "noMedia": "Aucun média pour le moment",
            "noMediaDesc": "Téléchargez des images ou des vidéos lors de la rédaction de publications pour les voir ici."
        }
    },
    "de": {
        "media": {
            "title": "Mediathek",
            "subtitle": "Ihre hochgeladenen Bilder und Videos.",
            "noMedia": "Noch keine Medien",
            "noMediaDesc": "Laden Sie Bilder oder Videos hoch, wenn Sie Beiträge verfassen, um sie hier zu sehen."
        }
    },
    "zh": {
        "media": {
            "title": "媒体库",
            "subtitle": "您上传的图像和视频。",
            "noMedia": "暂无媒体",
            "noMediaDesc": "在撰写帖子时上传图像或视频即可在此处查看它们。"
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
            
print("MediaLibrary locales updated successfully!")
