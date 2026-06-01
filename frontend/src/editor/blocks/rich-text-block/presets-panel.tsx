/**
 * Saved project text styles: list, apply, delete, and "+ Novo" to capture current formatting.
 */
import { Button } from '@/components/ui/button';
import type { TextStylePreset } from '@/editor/stores/use-text-styles-store';
import { Trash2 } from 'lucide-react';
import { applyPresetToEditor, capturePresetSnapshot } from './preset-commands';
import type { ToolbarActiveMenu } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PresetsPanelProps = {
  editor: any;
  presets: TextStylePreset[];
  onSavePreset: (preset: {
    name: string;
    styles: ReturnType<typeof capturePresetSnapshot>;
  }) => void;
  onDeletePreset: (id: string) => void;
  onSetActiveMenu: (menu: ToolbarActiveMenu) => void;
};

export function PresetsPanel({
  editor,
  presets,
  onSavePreset,
  onSetActiveMenu,
  onDeletePreset,
}: PresetsPanelProps) {
  const handleSavePreset = () => {
    const name = prompt('Nome do estilo (ex: Destaque Rosa):');
    if (!name) return;
    onSavePreset({ name, styles: capturePresetSnapshot(editor) });
    onSetActiveMenu(null);
  };

  const handleDeletePreset = (id: string) => {
    onDeletePreset(id);
    onSetActiveMenu(null);
  };

  const handleSetPreset = (preset: TextStylePreset) => {
    applyPresetToEditor(editor, preset.styles);
    onSetActiveMenu(null);
  };

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex items-center justify-between">
        <span className="text-mute text-[10px] font-bold uppercase">Estilos Salvos</span>
        <Button variant="link" size="sm" className="h-6 text-[10px]" onClick={handleSavePreset}>
          + Novo
        </Button>
      </div>
      {presets.length === 0 ? (
        <p className="py-2 text-center text-[10px] italic text-slate-400">Nenhum estilo salvo</p>
      ) : (
        <div className="flex flex-col gap-1">
          {presets.map((preset) => (
            <div
              key={preset.id}
              className="flex items-center justify-between rounded bg-white pr-2 shadow-sm"
            >
              <button
                onClick={() => handleSetPreset(preset)}
                className="flex-1 p-1.5 px-2 text-left text-xs font-medium text-slate-700"
              >
                {preset.name}
              </button>
              <button
                onClick={() => handleDeletePreset(preset.id)}
                className="p-1 hover:text-red-500"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
