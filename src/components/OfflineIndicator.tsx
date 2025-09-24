import React from 'react';
import { useOffline } from '../contexts/OfflineContext';
import { useTranslation } from 'react-i18next';
import { Wifi, WifiOff, Cloud, CloudOff, FolderSync as Sync } from 'lucide-react';

const OfflineIndicator: React.FC = () => {
  const { isOnline, isOfflineMode, toggleOfflineMode, pendingScans, syncPendingData } = useOffline();
  const { t } = useTranslation();

  const handleSync = async () => {
    try {
      await syncPendingData();
    } catch (error) {
      console.error('Sync failed:', error);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Network Status */}
      <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
        isOnline 
          ? 'bg-green-100 text-green-700' 
          : 'bg-red-100 text-red-700'
      }`}>
        {isOnline ? (
          <Wifi className="h-3 w-3" />
        ) : (
          <WifiOff className="h-3 w-3" />
        )}
        <span>{isOnline ? 'Online' : 'Offline'}</span>
      </div>

      {/* Offline Mode Toggle */}
      <button
        onClick={toggleOfflineMode}
        className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
          isOfflineMode
            ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
        title={isOfflineMode ? 'Disable offline mode' : 'Enable offline mode'}
      >
        {isOfflineMode ? (
          <CloudOff className="h-3 w-3" />
        ) : (
          <Cloud className="h-3 w-3" />
        )}
        <span>{t('offlineMode')}</span>
      </button>

      {/* Pending Sync Indicator */}
      {pendingScans.length > 0 && (
        <button
          onClick={handleSync}
          disabled={!isOnline}
          className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title={`${pendingScans.length} scans pending sync`}
        >
          <Sync className="h-3 w-3" />
          <span>{pendingScans.length}</span>
        </button>
      )}
    </div>
  );
};

export default OfflineIndicator;