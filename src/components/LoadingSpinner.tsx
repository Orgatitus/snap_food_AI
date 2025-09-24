import React from 'react';
import { Utensils } from 'lucide-react';

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="text-center">
        <div className="relative">
          <Utensils className="h-16 w-16 text-green-600 mx-auto animate-pulse" />
          <div className="absolute inset-0 animate-spin">
            <div className="h-16 w-16 border-4 border-green-200 border-t-green-600 rounded-full"></div>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">SnapFood</h2>
          <p className="text-gray-600">Loading your nutrition dashboard...</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;