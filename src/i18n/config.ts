import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Translation resources
const resources = {
  en: {
    translation: {
      // Navigation
      welcome: "Welcome to SnapFood",
      dashboard: "Dashboard",
      camera: "Camera",
      nutribot: "NutriBot",
      admin: "Admin Panel",
      diagnostics: "Diagnostics",
      logout: "Sign Out",
      
      // Common
      loading: "Loading...",
      error: "Error",
      success: "Success",
      cancel: "Cancel",
      confirm: "Confirm",
      save: "Save",
      delete: "Delete",
      edit: "Edit",
      
      // Authentication
      login: "Sign In",
      signup: "Sign Up",
      email: "Email Address",
      password: "Password",
      name: "Full Name",
      loginWithGoogle: "Continue with Google",
      
      // Health Conditions
      healthCondition: "Health Condition",
      normal: "Normal",
      diabetic: "Diabetic",
      hypertensive: "Hypertensive",
      weightLoss: "Weight Loss",
      pregnantNursing: "Pregnant/Nursing",
      cholesterolWatch: "Cholesterol Watch",
      
      // Camera & Analysis
      analyzing: "Analyzing food...",
      confidence: "Confidence",
      nutrients: "Nutrients",
      recommendations: "Recommendations",
      healthScore: "Health Score",
      todayCalories: "Today's Calories",
      mealsLogged: "Meals Logged",
      capturePhoto: "Capture Photo",
      uploadImage: "Upload Image",
      analyzeFood: "Analyze Food",
      
      // Dashboard
      weeklyTrends: "Weekly Trends",
      nutritionBreakdown: "Nutrition Breakdown",
      recentMeals: "Recent Meals",
      exportReport: "Export Report",
      
      // Admin Panel
      modelManagement: "Model Management",
      healthLogicManagement: "Health Logic Management",
      foodMetaManagement: "Food Meta Management",
      systemDiagnostics: "System Diagnostics",
      uploadFile: "Upload File",
      replaceFile: "Replace File",
      validateFile: "Validate File",
      
      // NutriBot
      askQuestion: "Ask me about nutrition, recipes, or health tips...",
      quickQuestions: "Quick questions:",
      
      // Offline
      offlineMode: "Offline Mode",
      syncData: "Sync Data",
      pendingSync: "Pending Sync",
      
      // TTS
      listen: "Listen",
      stopListening: "Stop",
      
      // Export
      downloadPDF: "Download PDF",
      downloadCSV: "Download CSV",
      
      // Languages
      english: "English",
      hausa: "Hausa",
      yoruba: "Yoruba",
      igbo: "Igbo",
      french: "French"
    }
  },
  ha: {
    translation: {
      // Navigation
      welcome: "Maraba da zuwa SnapFood",
      dashboard: "Allon Bayanai",
      camera: "Kamara",
      nutribot: "NutriBot",
      admin: "Shafin Gudanarwa",
      diagnostics: "Bincike",
      logout: "Fita",
      
      // Common
      loading: "Ana loda...",
      error: "Kuskure",
      success: "Nasara",
      cancel: "Soke",
      confirm: "Tabbatar",
      save: "Ajiye",
      delete: "Share",
      edit: "Gyara",
      
      // Authentication
      login: "Shiga",
      signup: "Yi Rajista",
      email: "Adireshin Imel",
      password: "Kalmar Sirri",
      name: "Cikakken Suna",
      loginWithGoogle: "Ci gaba da Google",
      
      // Health Conditions
      healthCondition: "Yanayin Lafiya",
      normal: "Na Yau da Kullun",
      diabetic: "Mai Ciwon Sukari",
      hypertensive: "Mai Hauhawar Jini",
      weightLoss: "Rage Nauyi",
      pregnantNursing: "Mai Ciki/Shayarwa",
      cholesterolWatch: "Lura da Cholesterol",
      
      // Camera & Analysis
      analyzing: "Ana nazarin abinci...",
      confidence: "Tabbas",
      nutrients: "Abubuwan Gina Jiki",
      recommendations: "Shawarwari",
      healthScore: "Maki na Lafiya",
      todayCalories: "Calories na Yau",
      mealsLogged: "Abincin da aka Rubuta",
      capturePhoto: "Dauki Hoto",
      uploadImage: "Loda Hoto",
      analyzeFood: "Nazarin Abinci",
      
      // Dashboard
      weeklyTrends: "Yanayin Mako",
      nutritionBreakdown: "Rarraba Abinci Mai Gina Jiki",
      recentMeals: "Abincin Kwanan Nan",
      exportReport: "Fitar da Rahoto",
      
      // Admin Panel
      modelManagement: "Gudanar da Model",
      healthLogicManagement: "Gudanar da Dabaran Lafiya",
      foodMetaManagement: "Gudanar da Bayanan Abinci",
      systemDiagnostics: "Binciken Tsarin",
      uploadFile: "Loda Fayil",
      replaceFile: "Maye Fayil",
      validateFile: "Tabbatar da Fayil",
      
      // NutriBot
      askQuestion: "Tambaye ni game da abinci mai gina jiki, girke-girke, ko shawarwarin lafiya...",
      quickQuestions: "Tambayoyi masu sauri:",
      
      // Offline
      offlineMode: "Yanayin Kashe Intanet",
      syncData: "Daidaita Bayanai",
      pendingSync: "Jiran Daidaitawa",
      
      // TTS
      listen: "Saurara",
      stopListening: "Tsaya",
      
      // Export
      downloadPDF: "Sauke PDF",
      downloadCSV: "Sauke CSV",
      
      // Languages
      english: "Turanci",
      hausa: "Hausa",
      yoruba: "Yarbanci",
      igbo: "Igbo",
      french: "Faransanci"
    }
  },
  yo: {
    translation: {
      // Navigation
      welcome: "Kaabo si SnapFood",
      dashboard: "Oju Iṣẹ",
      camera: "Kamẹra",
      nutribot: "NutriBot",
      admin: "Oju Iṣakoso",
      diagnostics: "Iwadii",
      logout: "Jade",
      
      // Common
      loading: "N gba...",
      error: "Aṣiṣe",
      success: "Aṣeyọri",
      cancel: "Fagilee",
      confirm: "Jẹrisi",
      save: "Fi pamọ",
      delete: "Pa rẹ",
      edit: "Ṣatunkọ",
      
      // Authentication
      login: "Wọle",
      signup: "Forukọsilẹ",
      email: "Adirẹsi Imeeli",
      password: "Ọrọ igbaniwọle",
      name: "Orukọ Kikun",
      loginWithGoogle: "Tẹsiwaju pẹlu Google",
      
      // Health Conditions
      healthCondition: "Ipo Ilera",
      normal: "Deede",
      diabetic: "Aisan Suga",
      hypertensive: "Ẹjẹ Giga",
      weightLoss: "Idinku Iwuwo",
      pregnantNursing: "Oyun/Ifunni",
      cholesterolWatch: "Iṣọ Cholesterol",
      
      // Camera & Analysis
      analyzing: "N ṣayẹwo ounjẹ...",
      confidence: "Igbẹkẹle",
      nutrients: "Awọn Èrọ Ara",
      recommendations: "Awọn Imọran",
      healthScore: "Ami Ilera",
      todayCalories: "Calories Oni",
      mealsLogged: "Awọn Ounjẹ Ti a Kọ Silẹ",
      capturePhoto: "Ya Foto",
      uploadImage: "Gbe Aworan",
      analyzeFood: "Ṣayẹwo Ounjẹ",
      
      // Dashboard
      weeklyTrends: "Awọn Aṣa Ọsẹ",
      nutritionBreakdown: "Pipin Ounjẹ",
      recentMeals: "Awọn Ounjẹ Aipẹ",
      exportReport: "Gbe Ijabọ Jade",
      
      // Admin Panel
      modelManagement: "Iṣakoso Awoṣe",
      healthLogicManagement: "Iṣakoso Ọgbọn Ilera",
      foodMetaManagement: "Iṣakoso Data Ounjẹ",
      systemDiagnostics: "Iwadii Eto",
      uploadFile: "Gbe Faili",
      replaceFile: "Rọpo Faili",
      validateFile: "Jẹrisi Faili",
      
      // NutriBot
      askQuestion: "Beere lọwọ mi nipa ounjẹ, awọn ilana sise, tabi awọn imọran ilera...",
      quickQuestions: "Awọn ibeere kiakia:",
      
      // Offline
      offlineMode: "Ipo Aisinipo",
      syncData: "Ṣe Imuṣiṣẹpọ Data",
      pendingSync: "Ti nduro fun Imuṣiṣẹpọ",
      
      // TTS
      listen: "Gbọ",
      stopListening: "Duro",
      
      // Export
      downloadPDF: "Gba PDF",
      downloadCSV: "Gba CSV",
      
      // Languages
      english: "Gẹẹsi",
      hausa: "Hausa",
      yoruba: "Yoruba",
      igbo: "Igbo",
      french: "Faransi"
    }
  },
  ig: {
    translation: {
      // Navigation
      welcome: "Nnọọ na SnapFood",
      dashboard: "Ebe Nlekọta",
      camera: "Igwefoto",
      nutribot: "NutriBot",
      admin: "Ebe Nchịkwa",
      diagnostics: "Nyocha",
      logout: "Pụọ",
      
      // Common
      loading: "Na-ebu...",
      error: "Njehie",
      success: "Ihe ịga nke ọma",
      cancel: "Kagbuo",
      confirm: "Kwenye",
      save: "Chekwaa",
      delete: "Hichapụ",
      edit: "Dezie",
      
      // Authentication
      login: "Banye",
      signup: "Debanye aha",
      email: "Adreesị Ozi-e",
      password: "Okwu nzuzo",
      name: "Aha Zuru Ezu",
      loginWithGoogle: "Gaa n'ihu na Google",
      
      // Health Conditions
      healthCondition: "Ọnọdụ Ahụike",
      normal: "Nkịtị",
      diabetic: "Ọrịa Shuga",
      hypertensive: "Ọbara Mgbago",
      weightLoss: "Mbelata Ibu",
      pregnantNursing: "Ime/Inye Ara",
      cholesterolWatch: "Nlekọta Cholesterol",
      
      // Camera & Analysis
      analyzing: "Na-enyocha nri...",
      confidence: "Ntụkwasị Obi",
      nutrients: "Ihe Na-edozi Ahụ",
      recommendations: "Ndụmọdụ",
      healthScore: "Akara Ahụike",
      todayCalories: "Calories Taa",
      mealsLogged: "Nri Edere Ede",
      capturePhoto: "Were Foto",
      uploadImage: "Bulite Onyonyo",
      analyzeFood: "Nyochaa Nri",
      
      // Dashboard
      weeklyTrends: "Omume Izu",
      nutritionBreakdown: "Nkewa Nri",
      recentMeals: "Nri Ndị Na-adịbeghị Anya",
      exportReport: "Wepụta Akụkọ",
      
      // Admin Panel
      modelManagement: "Njikwa Ihe Nlere",
      healthLogicManagement: "Njikwa Mgbagha Ahụike",
      foodMetaManagement: "Njikwa Data Nri",
      systemDiagnostics: "Nyocha Usoro",
      uploadFile: "Bulite Faịlụ",
      replaceFile: "Dochie Faịlụ",
      validateFile: "Kwenye Faịlụ",
      
      // NutriBot
      askQuestion: "Jụọ m maka nri, uzommepụta, ma ọ bụ ndụmọdụ ahụike...",
      quickQuestions: "Ajụjụ ngwa ngwa:",
      
      // Offline
      offlineMode: "Ọnọdụ Offline",
      syncData: "Sync Data",
      pendingSync: "Na-echere Sync",
      
      // TTS
      listen: "Gee Ntị",
      stopListening: "Kwụsị",
      
      // Export
      downloadPDF: "Budata PDF",
      downloadCSV: "Budata CSV",
      
      // Languages
      english: "Bekee",
      hausa: "Hausa",
      yoruba: "Yoruba",
      igbo: "Igbo",
      french: "French"
    }
  },
  fr: {
    translation: {
      // Navigation
      welcome: "Bienvenue sur SnapFood",
      dashboard: "Tableau de Bord",
      camera: "Caméra",
      nutribot: "NutriBot",
      admin: "Panneau Admin",
      diagnostics: "Diagnostics",
      logout: "Se Déconnecter",
      
      // Common
      loading: "Chargement...",
      error: "Erreur",
      success: "Succès",
      cancel: "Annuler",
      confirm: "Confirmer",
      save: "Sauvegarder",
      delete: "Supprimer",
      edit: "Modifier",
      
      // Authentication
      login: "Se Connecter",
      signup: "S'inscrire",
      email: "Adresse Email",
      password: "Mot de Passe",
      name: "Nom Complet",
      loginWithGoogle: "Continuer avec Google",
      
      // Health Conditions
      healthCondition: "Condition de Santé",
      normal: "Normal",
      diabetic: "Diabétique",
      hypertensive: "Hypertendu",
      weightLoss: "Perte de Poids",
      pregnantNursing: "Enceinte/Allaitante",
      cholesterolWatch: "Surveillance Cholestérol",
      
      // Camera & Analysis
      analyzing: "Analyse de la nourriture...",
      confidence: "Confiance",
      nutrients: "Nutriments",
      recommendations: "Recommandations",
      healthScore: "Score de Santé",
      todayCalories: "Calories d'Aujourd'hui",
      mealsLogged: "Repas Enregistrés",
      capturePhoto: "Prendre Photo",
      uploadImage: "Télécharger Image",
      analyzeFood: "Analyser Nourriture",
      
      // Dashboard
      weeklyTrends: "Tendances Hebdomadaires",
      nutritionBreakdown: "Répartition Nutritionnelle",
      recentMeals: "Repas Récents",
      exportReport: "Exporter Rapport",
      
      // Admin Panel
      modelManagement: "Gestion des Modèles",
      healthLogicManagement: "Gestion Logique Santé",
      foodMetaManagement: "Gestion Méta Nourriture",
      systemDiagnostics: "Diagnostics Système",
      uploadFile: "Télécharger Fichier",
      replaceFile: "Remplacer Fichier",
      validateFile: "Valider Fichier",
      
      // NutriBot
      askQuestion: "Demandez-moi des conseils nutritionnels, recettes ou santé...",
      quickQuestions: "Questions rapides:",
      
      // Offline
      offlineMode: "Mode Hors Ligne",
      syncData: "Synchroniser Données",
      pendingSync: "Synchronisation en Attente",
      
      // TTS
      listen: "Écouter",
      stopListening: "Arrêter",
      
      // Export
      downloadPDF: "Télécharger PDF",
      downloadCSV: "Télécharger CSV",
      
      // Languages
      english: "Anglais",
      hausa: "Haoussa",
      yoruba: "Yoruba",
      igbo: "Igbo",
      french: "Français"
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;