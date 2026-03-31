import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';

export interface ClickRevealContextType {
  isRevealed: boolean;
  setIsRevealed: Dispatch<SetStateAction<boolean>>;
}

export const ClickRevealContext = createContext<ClickRevealContextType | null>(null);

export function useClickRevealContext() {
  const ctx = useContext<ClickRevealContextType | null>(ClickRevealContext);
  if (!ctx) {
    throw new Error('useClickRevealContext deve ser usado dentro de <ClickRevealContext>');
  }
  return ctx;
}
