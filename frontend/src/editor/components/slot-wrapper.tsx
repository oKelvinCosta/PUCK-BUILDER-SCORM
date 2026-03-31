import { useEditorMode } from '@/editor/stores/editor-mode-store';

export default function SlotWrapper({ children }: { children: React.ReactNode }) {
  const { isEditing } = useEditorMode();

  return (
    <div className={`${isEditing ? '[&_.editor-padding]:p-2' : ''} mx-auto w-full`}>{children}</div>
  );
}
