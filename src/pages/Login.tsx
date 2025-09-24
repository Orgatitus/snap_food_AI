import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, Utensils, Shield, Heart, Users, Mail } from 'lucide-react';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login, loginWithGoogle, signup } = useAuth();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isSignup) {
        await signup(email, password, name);
      } else {
        await login(email, password);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      await loginWithGoogle();
    } catch (err: any) {
      setError(err.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    { 
      email: 'admin@snapfood.com', 
      role: 'Admin', 
      icon: Shield, 
      color: 'text-red-600',
      description: 'Full system access, file management'
    },
    { 
      email: 'clinician@snapfood.com', 
      role: 'Clinician', 
      icon: Heart, 
      color: 'text-blue-600',
      description: 'Patient management, reports'
    },
    { 
      email: 'user@snapfood.com', 
      role: 'Individual', 
      icon: Users, 
      color: 'text-green-600',
      description: 'Personal nutrition tracking'
    }
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          <div className="flex items-center mb-8">
            <Utensils className="h-12 w-12 mr-4" />
            <h1 className="text-4xl font-bold">SnapFood</h1>
          </div>
          <h2 className="text-2xl font-semibold mb-4">{t('welcome')}</h2>
          <p className="text-lg opacity-90 mb-8">
            AI-powered nutrition assistant focused on African foods with offline-first capabilities and multilingual support.
          </p>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-sm">📸</span>
              </div>
              <span>Advanced food recognition with health condition awareness</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-sm">🤖</span>
              </div>
              <span>NutriBot AI assistant with voice support</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-sm">📊</span>
              </div>
              <span>Comprehensive analytics and export capabilities</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-sm">🌍</span>
              </div>
              <span>Multilingual support (English, Hausa, Yoruba, Igbo, French)</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-sm">📱</span>
              </div>
              <span>PWA with offline capabilities</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login/Signup form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <Utensils className="h-10 w-10 text-green-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">SnapFood</h1>
            </div>
            <p className="text-gray-600">{t('welcome')}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex justify-center mb-6">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setIsSignup(false)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    !isSignup 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('login')}
                </button>
                <button
                  type="button"
                  onClick={() => setIsSignup(true)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isSignup 
                      ? 'bg-white text-gray-900 shadow-sm' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {t('signup')}
                </button>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              {isSignup ? 'Create Account' : 'Welcome Back'}
            </h2>
            
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignup && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {t('name')}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('email')}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('password')}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-4 rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (isSignup ? 'Creating Account...' : 'Signing In...') : (isSignup ? t('signup') : t('login'))}
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full mt-4 flex items-center justify-center space-x-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Mail className="h-5 w-5 text-gray-500" />
                <span className="text-gray-700 font-medium">{t('loginWithGoogle')}</span>
              </button>
            </div>

            {!isSignup && (
              <div className="mt-8">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Demo Accounts</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-3">
                  {demoAccounts.map((account) => (
                    <button
                      key={account.email}
                      type="button"
                      onClick={() => {
                        setEmail(account.email);
                        setPassword('password');
                      }}
                      className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <account.icon className={`h-5 w-5 ${account.color}`} />
                        <div className="text-left">
                          <div className="text-sm font-medium text-gray-900">{account.role}</div>
                          <div className="text-xs text-gray-500">{account.description}</div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400 group-hover:text-gray-600">Click to use</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;