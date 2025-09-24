import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NutritionAnalysis } from '../types';

interface OfflineContextType {
  isOnline: boolean;
  isOfflineMode: boolean;
  toggleOfflineMode: () => void;
  syncPendingData: () => Promise<void>;
  pendingScans: NutritionAnalysis[];
  addPendingScan: (scan: NutritionAnalysis) => void;
  clearPendingScans: () => void;
}

const OfflineContext = createContext<OfflineContextType | undefined>(undefined);

export function useOffline() {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within an OfflineProvider');
  }
  return context;
}

interface OfflineProviderProps {
  children: ReactNode;
}

export function OfflineProvider({ children }: OfflineProviderProps) {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [pendingScans, setPendingScans] = useState<NutritionAnalysis[]>([]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load pending scans from localStorage
    const stored = localStorage.getItem('snapfood_pending_scans');
    if (stored) {
      try {
        setPendingScans(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to load pending scans:', error);
      }
    }

    // Load offline mode preference
    const offlineMode = localStorage.getItem('snapfood_offline_mode') === 'true';
    setIsOfflineMode(offlineMode);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Save pending scans to localStorage
    localStorage.setItem('snapfood_pending_scans', JSON.stringify(pendingScans));
  }, [pendingScans]);

  const toggleOfflineMode = () => {
    const newMode = !isOfflineMode;
    setIsOfflineMode(newMode);
    localStorage.setItem('snapfood_offline_mode', newMode.toString());
  };

  const addPendingScan = (scan: NutritionAnalysis) => {
    setPendingScans(prev => [...prev, scan]);
  };

  const clearPendingScans = () => {
    setPendingScans([]);
    localStorage.removeItem('snapfood_pending_scans');
  };

  const syncPendingData = async () => {
    if (!isOnline || pendingScans.length === 0) return;

    try {
      // Simulate syncing to server
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, send pendingScans to server
      console.log('Syncing pending scans:', pendingScans);
      
      clearPendingScans();
    } catch (error) {
      console.error('Failed to sync pending data:', error);
      throw error;
    }
  };

  const value: OfflineContextType = {
    isOnline,
    isOfflineMode,
    toggleOfflineMode,
    syncPendingData,
    pendingScans,
    addPendingScan,
    clearPendingScans,
  };

  return (
    <OfflineContext.Provider value={value}>
      {children}
    </OfflineContext.Provider>
  );
}