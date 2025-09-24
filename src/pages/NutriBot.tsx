import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Volume2, Bot, User, Loader } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

const NutriBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: "Hello! I'm NutriBot, your AI nutrition assistant. I can help you with meal planning, nutritional advice, and answer questions about African foods. How can I assist you today?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate typing indicator
    const typingMessage: Message = {
      id: 'typing',
      type: 'bot',
      content: '',
      timestamp: new Date(),
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);

    // Simulate AI response delay
    setTimeout(() => {
      setMessages(prev => prev.filter(msg => msg.id !== 'typing'));
      
      // Generate contextual response based on user input
      let botResponse = "I understand you're asking about nutrition. Let me help you with that.";
      
      const lowerContent = content.toLowerCase();
      
      if (lowerContent.includes('jollof') || lowerContent.includes('rice')) {
        botResponse = "Jollof rice is a beloved West African dish! A typical serving contains about 400-500 calories. To make it healthier, try using brown rice, adding vegetables like carrots and peas, and reducing the oil content. Would you like specific nutritional tips for preparing jollof rice?";
      } else if (lowerContent.includes('egusi') || lowerContent.includes('soup')) {
        botResponse = "Egusi soup is rich in protein and healthy fats from the melon seeds! It's an excellent source of vitamins A, C, and K when prepared with leafy vegetables. For a healthier version, use lean meat or fish, and increase the vegetable content. How are you planning to prepare your egusi?";
      } else if (lowerContent.includes('plantain') || lowerContent.includes('banana')) {
        botResponse = "Plantains are a great source of potassium, vitamin B6, and fiber! Ripe plantains are higher in sugar, while green plantains have more resistant starch. For better health, try baking or grilling instead of frying. Would you like some healthy plantain recipe suggestions?";
      } else if (lowerContent.includes('diabetes') || lowerContent.includes('sugar')) {
        botResponse = "For diabetes management, focus on complex carbohydrates like brown rice, quinoa, and sweet potatoes. Traditional African foods like millet, sorghum, and unripe plantain are excellent choices. Always pair carbs with protein and fiber. Would you like a diabetes-friendly meal plan?";
      } else if (lowerContent.includes('weight') || lowerContent.includes('lose')) {
        botResponse = "For healthy weight management, try these African superfoods: moringa leaves, hibiscus tea, and African yam. Focus on portion control with traditional dishes and add more vegetables. Okra, bitter leaf, and waterleaf are low-calorie options. Need a personalized meal plan?";
      } else if (lowerContent.includes('protein') || lowerContent.includes('muscle')) {
        botResponse = "Great protein sources in African cuisine include fish (like tilapia and catfish), beans, lentils, and palm nuts. Combine plant proteins like beans and grains for complete amino acids. Try bean cakes (akara), fish pepper soup, or groundnut stew. What's your protein goal?";
      } else if (lowerContent.includes('blood pressure') || lowerContent.includes('hypertension')) {
        botResponse = "To manage blood pressure, reduce salt in traditional dishes and use herbs like garlic, ginger, and local spices instead. Choose potassium-rich foods like African yam, plantain, and leafy greens. Limit processed foods and increase fish consumption. Need low-sodium recipe modifications?";
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: botResponse,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // In a real app, this would handle speech-to-text
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setInputMessage("How can I make jollof rice healthier?");
      }, 3000);
    }
  };

  const speakMessage = (content: string) => {
    // In a real app, this would use Text-to-Speech API
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(content);
      utterance.rate = 0.8;
      utterance.pitch = 1;
      speechSynthesis.speak(utterance);
    }
  };

  const quickActions = [
    "What's healthy about plantains?",
    "Low-sodium jollof rice recipe",
    "Best protein sources in African food",
    "Diabetes-friendly Nigerian meals"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">NutriBot Assistant</h1>
        <p className="text-gray-600">Your AI companion for African nutrition and healthy eating</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100">
        {/* Messages Area */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex space-x-3 max-w-xs lg:max-w-md ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {message.type === 'user' ? 
                    <User className="h-4 w-4 text-green-600" /> : 
                    <Bot className="h-4 w-4 text-blue-600" />
                  }
                </div>
                
                <div className={`rounded-lg px-4 py-2 ${
                  message.type === 'user'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  {message.isTyping ? (
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-sm">{message.content}</p>
                      {message.type === 'bot' && (
                        <button
                          onClick={() => speakMessage(message.content)}
                          className="text-xs text-gray-500 hover:text-gray-700 flex items-center space-x-1"
                        >
                          <Volume2 className="h-3 w-3" />
                          <span>Speak</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Actions */}
        <div className="px-6 py-3 border-t border-gray-100">
          <p className="text-sm text-gray-600 mb-3">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={() => sendMessage(action)}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs hover:bg-gray-200 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-gray-100">
          <form onSubmit={handleSubmit} className="flex space-x-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me about nutrition, recipes, or health tips..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                disabled={isLoading}
              />
              {isRecording && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
            
            <button
              type="button"
              onClick={toggleRecording}
              className={`p-3 rounded-lg transition-colors ${
                isRecording 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isRecording ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
            
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? <Loader className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            </button>
          </form>
          
          <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>🇳🇬 English</span>
              <span>🇳🇬 Hausa</span>
              <span>🇳🇬 Yoruba</span>
              <span>🇳🇬 Igbo</span>
            </div>
            <span className="text-xs">Powered by AI • Always consult healthcare professionals</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NutriBot;