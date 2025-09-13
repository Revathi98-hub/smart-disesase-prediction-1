import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      "nav.home": "Home",
      "nav.about": "About",
      "nav.services": "Services",
      "nav.contact": "Contact",
      
      // Hero Section
      "hero.title": "AI-Powered Disease Prediction & Healthcare Solutions",
      "hero.subtitle": "Advanced symptom analysis with personalized treatment recommendations, dietary plans, and preventive care strategies.",
      "hero.cta": "Get Health Analysis",
      "hero.learn_more": "Learn More",
      
      // Features
      "features.title": "Comprehensive Healthcare Intelligence",
      "features.symptom.title": "Smart Symptom Analysis",
      "features.symptom.desc": "AI-powered symptom evaluation with multi-language support",
      "features.prediction.title": "Disease Prediction",
      "features.prediction.desc": "Advanced ML algorithms for accurate health predictions",
      "features.treatment.title": "Personalized Treatment",
      "features.treatment.desc": "Custom medication, diet, and exercise recommendations",
      
      // Symptom Checker
      "symptom_checker.title": "Describe Your Symptoms",
      "symptom_checker.placeholder": "Tell us about your symptoms in detail...",
      "symptom_checker.analyze": "Analyze Symptoms",
      "symptom_checker.loading": "Analyzing your symptoms...",
      
      // Results
      "results.disease": "Predicted Condition",
      "results.description": "Description",
      "results.medications": "Recommended Medications",
      "results.side_effects": "Potential Side Effects",
      "results.precautions": "Precautions",
      "results.diet": "Dietary Recommendations",
      "results.exercise": "Exercise Plan",
      
      // Common
      "common.language": "Language",
      "common.loading": "Loading...",
      "common.error": "An error occurred",
      "common.try_again": "Try Again",
    }
  },
  es: {
    translation: {
      "nav.home": "Inicio",
      "nav.about": "Acerca de",
      "nav.services": "Servicios",
      "nav.contact": "Contacto",
      
      "hero.title": "Predicción de Enfermedades y Soluciones de Salud con IA",
      "hero.subtitle": "Análisis avanzado de síntomas con recomendaciones de tratamiento personalizadas, planes dietéticos y estrategias de cuidado preventivo.",
      "hero.cta": "Obtener Análisis de Salud",
      "hero.learn_more": "Saber Más",
      
      "features.title": "Inteligencia Integral de Salud",
      "features.symptom.title": "Análisis Inteligente de Síntomas",
      "features.symptom.desc": "Evaluación de síntomas con IA y soporte multiidioma",
      "features.prediction.title": "Predicción de Enfermedades",
      "features.prediction.desc": "Algoritmos ML avanzados para predicciones precisas",
      "features.treatment.title": "Tratamiento Personalizado",
      "features.treatment.desc": "Recomendaciones personalizadas de medicamentos, dieta y ejercicio",
      
      "symptom_checker.title": "Describe Tus Síntomas",
      "symptom_checker.placeholder": "Cuéntanos sobre tus síntomas en detalle...",
      "symptom_checker.analyze": "Analizar Síntomas",
      "symptom_checker.loading": "Analizando tus síntomas...",
      
      "results.disease": "Condición Predicha",
      "results.description": "Descripción",
      "results.medications": "Medicamentos Recomendados",
      "results.side_effects": "Efectos Secundarios Potenciales",
      "results.precautions": "Precauciones",
      "results.diet": "Recomendaciones Dietéticas",
      "results.exercise": "Plan de Ejercicio",
      
      "common.language": "Idioma",
      "common.loading": "Cargando...",
      "common.error": "Ocurrió un error",
      "common.try_again": "Intentar de Nuevo",
    }
  },
  fr: {
    translation: {
      "nav.home": "Accueil",
      "nav.about": "À propos",
      "nav.services": "Services",
      "nav.contact": "Contact",
      
      "hero.title": "Prédiction de Maladies et Solutions de Santé par IA",
      "hero.subtitle": "Analyse avancée des symptômes avec recommandations de traitement personnalisées, plans diététiques et stratégies de soins préventifs.",
      "hero.cta": "Obtenir une Analyse de Santé",
      "hero.learn_more": "En Savoir Plus",
      
      "features.title": "Intelligence de Santé Complète",
      "features.symptom.title": "Analyse Intelligente des Symptômes",
      "features.symptom.desc": "Évaluation des symptômes par IA avec support multilingue",
      "features.prediction.title": "Prédiction de Maladies",
      "features.prediction.desc": "Algorithmes ML avancés pour des prédictions précises",
      "features.treatment.title": "Traitement Personnalisé",
      "features.treatment.desc": "Recommandations personnalisées de médicaments, régime et exercice",
      
      "symptom_checker.title": "Décrivez Vos Symptômes",
      "symptom_checker.placeholder": "Parlez-nous de vos symptômes en détail...",
      "symptom_checker.analyze": "Analyser les Symptômes",
      "symptom_checker.loading": "Analyse de vos symptômes...",
      
      "results.disease": "Condition Prédite",
      "results.description": "Description",
      "results.medications": "Médicaments Recommandés",
      "results.side_effects": "Effets Secondaires Potentiels",
      "results.precautions": "Précautions",
      "results.diet": "Recommandations Diététiques",
      "results.exercise": "Plan d'Exercice",
      
      "common.language": "Langue",
      "common.loading": "Chargement...",
      "common.error": "Une erreur s'est produite",
      "common.try_again": "Réessayer",
    }
  },
  hi: {
    translation: {
      "nav.home": "होम",
      "nav.about": "हमारे बारे में",
      "nav.services": "सेवाएं",
      "nav.contact": "संपर्क",
      
      "hero.title": "AI-संचालित रोग भविष्यवाणी और स्वास्थ्य समाधान",
      "hero.subtitle": "व्यक्तिगत उपचार सिफारिशों, आहार योजनाओं और निवारक देखभाल रणनीतियों के साथ उन्नत लक्षण विश्लेषण।",
      "hero.cta": "स्वास्थ्य विश्लेषण प्राप्त करें",
      "hero.learn_more": "और जानें",
      
      "features.title": "व्यापक स्वास्थ्य बुद्धिमत्ता",
      "features.symptom.title": "स्मार्ट लक्षण विश्लेषण",
      "features.symptom.desc": "बहुभाषी समर्थन के साथ AI-संचालित लक्षण मूल्यांकन",
      "features.prediction.title": "रोग भविष्यवाणी",
      "features.prediction.desc": "सटीक स्वास्थ्य भविष्यवाणियों के लिए उन्नत ML एल्गोरिदम",
      "features.treatment.title": "व्यक्तिगत उपचार",
      "features.treatment.desc": "कस्टम दवा, आहार और व्यायाम सिफारिशें",
      
      "symptom_checker.title": "अपने लक्षणों का वर्णन करें",
      "symptom_checker.placeholder": "अपने लक्षणों के बारे में विस्तार से बताएं...",
      "symptom_checker.analyze": "लक्षणों का विश्लेषण करें",
      "symptom_checker.loading": "आपके लक्षणों का विश्लेषण कर रहे हैं...",
      
      "results.disease": "भविष्यवाणी की गई स्थिति",
      "results.description": "विवरण",
      "results.medications": "अनुशंसित दवाएं",
      "results.side_effects": "संभावित दुष्प्रभाव",
      "results.precautions": "सावधानियां",
      "results.diet": "आहार सिफारिशें",
      "results.exercise": "व्यायाम योजना",
      
      "common.language": "भाषा",
      "common.loading": "लोड हो रहा है...",
      "common.error": "एक त्रुटि हुई",
      "common.try_again": "पुनः प्रयास करें",
    }
  },
  ar: {
    translation: {
      "nav.home": "الرئيسية",
      "nav.about": "حولنا",
      "nav.services": "الخدمات",
      "nav.contact": "اتصل بنا",
      
      "hero.title": "التنبؤ بالأمراض والحلول الصحية بالذكاء الاصطناعي",
      "hero.subtitle": "تحليل متقدم للأعراض مع توصيات علاجية شخصية وخطط غذائية واستراتيجيات رعاية وقائية.",
      "hero.cta": "احصل على تحليل صحي",
      "hero.learn_more": "اعرف المزيد",
      
      "features.title": "ذكاء صحي شامل",
      "features.symptom.title": "تحليل ذكي للأعراض",
      "features.symptom.desc": "تقييم الأعراض بالذكاء الاصطناعي مع الدعم متعدد اللغات",
      "features.prediction.title": "التنبؤ بالأمراض",
      "features.prediction.desc": "خوارزميات تعلم آلي متقدمة للتنبؤات الصحية الدقيقة",
      "features.treatment.title": "علاج شخصي",
      "features.treatment.desc": "توصيات مخصصة للأدوية والنظام الغذائي والتمارين",
      
      "symptom_checker.title": "صف أعراضك",
      "symptom_checker.placeholder": "أخبرنا عن أعراضك بالتفصيل...",
      "symptom_checker.analyze": "تحليل الأعراض",
      "symptom_checker.loading": "تحليل أعراضك...",
      
      "results.disease": "الحالة المتوقعة",
      "results.description": "الوصف",
      "results.medications": "الأدوية الموصى بها",
      "results.side_effects": "الآثار الجانبية المحتملة",
      "results.precautions": "الاحتياطات",
      "results.diet": "التوصيات الغذائية",
      "results.exercise": "خطة التمارين",
      
      "common.language": "اللغة",
      "common.loading": "جاري التحميل...",
      "common.error": "حدث خطأ",
      "common.try_again": "حاول مرة أخرى",
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;