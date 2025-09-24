import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'clinician';
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please log in to access this page.</p>
        </div>
      </div>
    );
  }

  if (requiredRole) {
    const hasPermission = 
      (requiredRole === 'admin' && user.role === 'admin') ||
      (requiredRole === 'clinician' && (user.role === 'clinician' || user.role === 'admin'));

    if (!hasPermission) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto">
            <div className="mb-8">
              <div className="mx-auto h-24 w-24 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-4xl">🚫</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Insufficient Permissions</h2>
            <p className="text-gray-600 mb-6">
              You need {requiredRole} access to view this page. 
              Current role: <span className="font-medium capitalize">{user.role}</span>
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                <strong>Demo Accounts:</strong><br />
                • Admin: admin@snapfood.com<br />
                • Clinician: clinician@snapfood.com<br />
                • Individual: user@snapfood.com<br />
                (Password: password)
              </p>
            </div>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;