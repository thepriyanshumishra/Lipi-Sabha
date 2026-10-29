import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { SUPPORTED_LIPIS, type LipiDefinition, getLipiById } from '@/data/lipiData';

interface LipiContextType {
  activeLipi: LipiDefinition;
  activeLipiId: string;
  setLipiId: (id: string) => void;
  allLipis: LipiDefinition[];
}

const LipiContext = createContext<LipiContextType | undefined>(undefined);

const STORAGE_KEY = 'lipi_sabha_active_lipi_id';

export function LipiProvider({ children }: { children: ReactNode }) {
  const [activeLipiId, setActiveLipiIdState] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && SUPPORTED_LIPIS.some((l) => l.id === saved)) {
        return saved;
      }
    } catch {
      // ignore localStorage errors
    }
    return 'devanagari';
  });

  const activeLipi = getLipiById(activeLipiId);

  const setLipiId = (id: string) => {
    if (SUPPORTED_LIPIS.some((l) => l.id === id)) {
      setActiveLipiIdState(id);
      try {
        localStorage.setItem(STORAGE_KEY, id);
      } catch {
        // ignore localStorage errors
      }
    }
  };

  useEffect(() => {
    // Notify document title or html data attribute if helpful
    document.documentElement.setAttribute('data-active-lipi', activeLipiId);
  }, [activeLipiId]);

  return (
    <LipiContext.Provider
      value={{
        activeLipi,
        activeLipiId,
        setLipiId,
        allLipis: SUPPORTED_LIPIS,
      }}
    >
      {children}
    </LipiContext.Provider>
  );
}

export function useLipi() {
  const context = useContext(LipiContext);
  if (!context) {
    throw new Error('useLipi must be used within a LipiProvider');
  }
  return context;
}
