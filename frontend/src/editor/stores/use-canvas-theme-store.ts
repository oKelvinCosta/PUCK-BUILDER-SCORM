// src/stores/useCanvasThemeStore.ts
import { create } from 'zustand';

export interface CanvasTheme {
  background: string;
  foreground: string;

  card: string;
  'card-foreground': string;

  primary: string;
  'primary-foreground': string;
  border: string;

  secondary: string;
  'secondary-foreground': string;

  tertiary: string;
  'tertiary-foreground': string;

  muted: string;
  'muted-foreground': string;

  accent: string;
  'accent-foreground': string;

  destructive: string;
  'destructive-foreground': string;

  success: string;
  'success-foreground': string;

  input: string;
  ring: string;
  radius: string;

  'extra-color-1': string;
  'extra-color-2': string;
  'extra-color-3': string;
  'extra-color-4': string;
  'extra-color-5': string;

  'title-font-family': string;
  'title-font-weight': string;
  'text-font-family': string;
}

// Tema padrão mockado — futuramente vem do banco
const defaultTheme: CanvasTheme = {
  background: '255 25% 97%',
  foreground: '253 25% 25%',

  card: '0 0% 100%',
  'card-foreground': '253 25% 25%',

  primary: '349.7 89.2% 60.2%',
  'primary-foreground': '253 25% 25%',

  secondary: '207 100% 50%',
  'secondary-foreground': '0 0% 100%',

  tertiary: '255 100% 57%',
  'tertiary-foreground': '0 0% 100%',

  muted: '60 4.8% 95.9%',
  'muted-foreground': '253 25% 40%',

  accent: '218 26% 92%',
  'accent-foreground': '218 19% 26%',

  destructive: '0 84.2% 60.2%',
  'destructive-foreground': '0 0% 100%',

  success: '160.1 84.1% 39.4%',
  'success-foreground': '0 0% 100%',

  border: '253 25% 93%',
  input: '20 5.9% 90%',
  ring: '215 20.2% 65.1%',
  radius: '0.5rem',

  'extra-color-1': '255 100% 57%',
  'extra-color-2': '207 100% 50%',
  'extra-color-3': '349.7 89.2% 60.2%',
  'extra-color-4': '349.7 89.2% 60.2%',
  'extra-color-5': '349.7 89.2% 60.2%',

  'title-font-family': 'Comic Sans MS, Helvetica, sans-serif',
  'title-font-weight': '700',
  'text-font-family': 'Comic Sans MS, Helvetica, sans-serif',
};

interface CanvasThemeStore {
  theme: CanvasTheme;
  setTheme: (theme: Partial<CanvasTheme>) => void;
  resetTheme: () => void;
}

export const useCanvasThemeStore = create<CanvasThemeStore>((set) => ({
  theme: defaultTheme,
  setTheme: (partial) => set((state) => ({ theme: { ...state.theme, ...partial } })),
  resetTheme: () => set({ theme: defaultTheme }),
}));
