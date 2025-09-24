import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Volume2, VolumeX } from 'lucide-react';

interface TTSButtonProps {
  text: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const TTSButton: React.FC<TTSButtonProps> = ({ 
  text, 
  className = '', 
  size = 'md' 
}) => {
  const { speak, isSpeaking, stopSpeaking } = useLanguage();

  const handleClick = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      speak(text);
    }
  };

  const sizeClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors ${sizeClasses[size]} ${className}`}
      title={isSpeaking ? 'Stop speaking' : 'Listen to this text'}
    >
      {isSpeaking ? (
        <VolumeX className={`${iconSizes[size]} animate-pulse`} />
      ) : (
        <Volume2 className={iconSizes[size]} />
      )}
    </button>
  );
};

export default TTSButton;