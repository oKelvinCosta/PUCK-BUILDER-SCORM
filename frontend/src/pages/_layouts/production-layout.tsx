import { useEditorMode } from '@/editor/stores/editor-mode-store';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function ProductionLayout() {
  const { setMode } = useEditorMode();

  useEffect(() => {
    setMode('production');
  }, [setMode]);

  return <Outlet />;
}
