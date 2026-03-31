// @/editor/utils/puck-slot.tsx
import { useEditorMode } from '@/editor/stores/editor-mode-store';
import { cn } from '@/lib/utils';

interface SlotPuckProps {
  Slot: React.ElementType;
  className?: string;
}

export const SlotPuck = ({ Slot, className = '', ...props }: SlotPuckProps) => {
  const { isEditing } = useEditorMode();

  const editorClass = isEditing ? 'p-2' : '';

  return <Slot className={cn(editorClass, 'flex flex-col gap-10', className)} {...props} />;
};
