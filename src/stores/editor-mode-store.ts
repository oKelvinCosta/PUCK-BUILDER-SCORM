import { create } from 'zustand';

// Define the three possible states of our editor
export type EditorMode = 'editing' | 'preview' | 'production';

// Interface that defines the shape of our store's state and methods
interface EditorModeStore {
  mode: EditorMode; // Current active mode
  setMode: (mode: EditorMode) => void; // Function to change mode
  isEditing: boolean; // Convenience flag: true when in editing mode
  isPreview: boolean; // Convenience flag: true when in preview mode
  isProduction: boolean; // Convenience flag: true when in production mode
}

// Create the Zustand store with our state management logic
export const useEditorModeStore = create<EditorModeStore>((set, get) => ({
  // Initial state: start in editing mode
  mode: 'editing',

  // Method to update the mode - this is how we change states
  setMode: (mode) => set({ mode }),

  // Computed properties using getters - these automatically update when mode changes
  // Note: These are less common in Zustand, usually we compute in the hook instead
  get isEditing() {
    return get().mode === 'editing';
  },

  get isPreview() {
    return get().mode === 'preview';
  },

  get isProduction() {
    return get().mode === 'production';
  },
}));

// Custom hook that provides a clean API for components to use the store
// This is the recommended pattern for Zustand - create a simple hook for each store
export const useEditorMode = () => {
  // Get the raw state and setter from the store
  const { mode, setMode } = useEditorModeStore();

  // Return computed values and the setter - this is what components will use
  return {
    mode, // Current mode: 'editing' | 'preview' | 'production'
    setMode, // Function to change mode
    isEditing: mode === 'editing', // Boolean: true if currently editing
    isPreview: mode === 'preview', // Boolean: true if currently previewing
    isProduction: mode === 'production', // Boolean: true if currently in production
  };
};

/* 
ZUSTAND BASICS:
- Zustand is a lightweight state management library for React
- No providers needed (unlike Context API)
- Components subscribe to specific parts of state
- Automatic re-rendering only when subscribed state changes

USAGE EXAMPLE:
```typescript
// In any component:
import { useEditorMode } from '@/stores/editor-mode-store';

function MyComponent() {
  const { mode, setMode, isEditing } = useEditorMode();
  
  const handleSwitchToPreview = () => {
    setMode('preview');
  };
  
  return (
    <div>
      <p>Current mode: {mode}</p>
      {isEditing && <button onClick={handleSwitchToPreview}>Go to Preview</button>}
    </div>
  );
}
```

KEY BENEFITS:
✅ Simple API - just import and use the hook
✅ No boilerplate - no providers, reducers, or actions
✅ TypeScript friendly - full type safety
✅ Performant - only re-renders when needed
✅ Persistent state (optional) - can add persist middleware
*/
