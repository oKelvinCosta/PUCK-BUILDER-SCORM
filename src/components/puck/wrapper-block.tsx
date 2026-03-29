import { useEditorMode } from '@/stores/editor-mode-store';

export default function WrapperBlock({ children }: { children: React.ReactNode }) {
  const { isEditing } = useEditorMode();

  return <div className={`${isEditing ? 'p-2' : ''}`}>{children}</div>;
}
