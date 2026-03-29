import { useEditorMode } from '@/stores/editor-mode-store';
import React from 'react';

// Simple wrapper component that provides editor mode state
export function EditorModeWrapper({
  children,
}: {
  children: (props: {
    isEditing: boolean;
    mode: 'editing' | 'preview' | 'production';
    isPreview: boolean;
    isProduction: boolean;
  }) => React.ReactNode;
}) {
  const { isEditing, mode, isPreview, isProduction } = useEditorMode();

  return children({ isEditing, mode, isPreview, isProduction });
}
