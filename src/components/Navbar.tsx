import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import { 
  Utensils, 
  Camera, 
  BarChart3, 
  MessageCircle, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Shield,
  Activity,
  User
} from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import OfflineIndicator from './OfflineIndicator';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', icon: BarChart3, label: t('dashboard') },
    { to: '/camera', icon: Camera, label: t('camera') },
    { to: '/nutribot', icon: MessageCircle, label: t('nutribot') },
  ];

  const adminItems = [
    { to: '/admin', icon: Settings, label: t('admin') },
    { to: '/diagnostics', icon: Activity, label: t('diagnostics') },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main nav */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <Utensils className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">SnapFood</span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActivePath(item.to)
                      ? 'bg-green-100 text-green-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}

              {/* Admin navigation */}
              {isAdmin && (
                <>
                  <div className="border-l border-gray-200 mx-2"></div>
                  {adminItems.map((item) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActivePath(item.to)
                          ? 'bg-red-100 text-red-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                      {item.to === '/admin' && (
                        <Shield className="h-3 w-3 text-red-500" />
                      )}
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Offline indicator */}
            <div className="hidden sm:block">
              <OfflineIndicator />
            </div>

            {/* Language switcher */}
            <div className="hidden sm:block">
              <LanguageSwitcher />
            </div>

            {/* Desktop user menu */}
            <div className="hidden md:relative md:inline-block">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {user?.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-green-600" />
                  </div>
                )}
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize flex items-center space-x-1">
                    <span>{user?.role}</span>
                    {user?.healthCondition && (
                      <>
                        <span>•</span>
                        <span>{user.healthCondition.replace('_', ' ')}</span>
                      </>
                    )}
                  </p>
                </div>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                  <div className="py-1">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                      <div className="mt-2 flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user?.role === 'admin' ? 'bg-red-100 text-red-700' :
                          user?.role === 'clinician' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {user?.role}
                        </span>
                        {user?.healthCondition && (
                          <span className="px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-700">
                            {user.healthCondition.replace('_', ' ')}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{t('logout')}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {/* User info */}
            <div className="flex items-center space-x-3 px-3 py-3 mb-4 bg-gray-50 rounded-lg">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                  <User className="h-5 w-5 text-green-600" />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                {user?.healthCondition && (
                  <p className="text-xs text-gray-500">{user.healthCondition.replace('_', ' ')}</p>
                )}
              </div>
            </div>

            {/* Offline indicator */}
            <div className="mb-4">
              <OfflineIndicator />
            </div>

            {/* Language switcher */}
            <div className="mb-4">
              <LanguageSwitcher />
            </div>

            {/* Navigation items */}
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                  isActivePath(item.to)
                    ? 'bg-green-100 text-green-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Admin items */}
            {isAdmin && (
              <>
                <div className="border-t border-gray-200 my-2"></div>
                {adminItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium transition-colors ${
                      isActivePath(item.to)
                        ? 'bg-red-100 text-red-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                    {item.to === '/admin' && (
                      <Shield className="h-4 w-4 text-red-500" />
                    )}
                  </Link>
                ))}
              </>
            )}

            {/* Logout */}
            <div className="border-t border-gray-200 my-2"></div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <LogOut className="h-5 w-5" />
              <span>{t('logout')}</span>
            </button>
          </div>
        </div>
      )}

      {/* Overlay for desktop user menu */}
      {showUserMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowUserMenu(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;