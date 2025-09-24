import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

export type Language = 'en' | 'ha' | 'yo' | 'ig' | 'fr';

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (lang: Language) => void;
  speak: (text: string) => void;
  isSpeaking: boolean;
  stopSpeaking: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>('en');
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('snapfood_language') as Language;
    if (saved && ['en', 'ha', 'yo', 'ig', 'fr'].includes(saved)) {
      setCurrentLanguage(saved);
      i18n.changeLanguage(saved);
    }
  }, [i18n]);

  const changeLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    i18n.changeLanguage(lang);
    localStorage.setItem('snapfood_language', lang);
  };

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }

    // Stop any current speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language-specific voice settings
    const langMap: Record<Language, string> = {
      en: 'en-US',
      ha: 'en-US', // Fallback to English for Hausa
      yo: 'en-US', // Fallback to English for Yoruba
      ig: 'en-US', // Fallback to English for Igbo
      fr: 'fr-FR'
    };

    utterance.lang = langMap[currentLanguage];
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 0.8;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const value: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    speak,
    isSpeaking,
    stopSpeaking,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}