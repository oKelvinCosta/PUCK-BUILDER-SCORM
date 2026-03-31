// @/puck/utils/puck-slot.tsx
import { cn } from '@/lib/utils';
import { useEditorMode } from '@/stores/editor-mode-store';

interface SlotPuckProps {
  Slot: React.ElementType;
  className?: string;
}

export const SlotPuck = ({ Slot, className = '', ...props }: SlotPuckProps) => {
  const { isEditing } = useEditorMode();

  const editorClass = isEditing ? 'p-2' : '';

  return <Slot className={cn(editorClass, className, 'flex flex-col gap-10')} {...props} />;
};
