import { create } from 'zustand';

/**
 * CanvasTheme describes the design tokens used inside the Puck canvas.
 *
 * Most color values are stored as raw HSL channels because Tailwind/shadcn
 * tokens consume them as `hsl(var(--token))`.
 */
export interface CanvasTheme {
  background: string;
  foreground: string;

  card: string;
  'card-foreground': string;

  primary: string;
  'primary-foreground': string;

  secondary: string;
  'secondary-foreground': string;

  tertiary: string;
  'tertiary-foreground': string;

  destructive: string;
  'destructive-foreground': string;

  success: string;
  'success-foreground': string;

  border: string;
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

/**
 * Baseline theme used whenever a project does not provide a full theme from
 * the database. Keep these values synchronized with `styles/canvas.css`.
 */
const defaultTheme: CanvasTheme = {
  background: '253 0% 100%',
  foreground: '253 25% 25%',
  card: '0 0% 100%',
  'card-foreground': '253 24% 31%',
  primary: '67.85 99.34% 47.25%',
  'primary-foreground': '253 25% 25%',

  secondary: '207 100% 50%',
  'secondary-foreground': '0 0% 100%',

  tertiary: '255 100% 57%',
  'tertiary-foreground': '0 0% 100%',

  destructive: '0 84.2% 60.2%',
  'destructive-foreground': '0 0% 100%',

  success: '160.1 84.1% 39.4%',
  'success-foreground': '0 0% 100%',

  border: '253 25% 86%',
  input: '20 5.9% 90%',
  ring: '215 20.2% 65.1%',
  radius: '0.5rem',

  'extra-color-1': '0 84.2% 60.2%',
  'extra-color-2': '45.4 93.4% 47.5%',
  'extra-color-3': '142.1 70.6% 45.3%',
  'extra-color-4': '198.6 88.7% 48.4%',
  'extra-color-5': '292.2 84.1% 60.6%',

  'title-font-family': "'Space Grotesk', 'Roboto', 'Helvetica Neue', sans-serif",
  'title-font-weight': '700',
  'text-font-family': "'Lexend', 'Roboto', 'Helvetica Neue', sans-serif",
};

/**
 * Returns a fresh theme object every time.
 *
 * This avoids sharing the same object reference between resets/hydration and
 * makes each project load start from a clean default theme.
 */
export function createDefaultCanvasTheme(): CanvasTheme {
  return { ...defaultTheme };
}

interface CanvasThemeStore {
  /** Current canvas theme. Components subscribe to this value through `useThemeStore()`. */
  theme: CanvasTheme;

  /**
   * Merges a partial theme into the current in-memory theme.
   *
   * Use this for live edits in the current project/session, where keeping
   * unchanged values from the same theme is expected.
   */
  setTheme: (theme: Partial<CanvasTheme>) => void;

  /**
   * Replaces the current theme with `defaultTheme + project theme`.
   *
   * Use this when loading/switching projects. It prevents values from the
   * previous project from leaking into a project that has no saved value for
   * a token, such as `border`.
   */
  hydrateTheme: (theme?: Partial<CanvasTheme> | null) => void;

  /** Restores the current project/session theme back to the default tokens. */
  resetTheme: () => void;
}

/**
 * Zustand creates a small global store and returns a hook.
 *
 * Any component can call `useThemeStore()` to read `theme` or call one of the
 * actions below. When the store changes, only subscribed components re-render.
 */
export const useThemeStore = create<CanvasThemeStore>((set) => ({
  theme: createDefaultCanvasTheme(),
  setTheme: (partial) => set((state) => ({ theme: { ...state.theme, ...partial } })),
  hydrateTheme: (partial) => set({ theme: { ...createDefaultCanvasTheme(), ...(partial ?? {}) } }),
  resetTheme: () => set({ theme: createDefaultCanvasTheme() }),
}));
