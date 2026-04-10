import { RichTextMenu, type ComponentConfig } from '@puckeditor/core';
import Heading from '@tiptap/extension-heading';
import { Color, TextStyle } from '@tiptap/extension-text-style';
import { useEffect, useRef } from 'react';

export type RichTextBlockProps = {
  content: any;
};

const COLORS = [
  '#000000',
  '#EF4444', // red
  '#3B82F6', // blue
  '#10B981', // green
  '#F59E0B', // yellow
  '#8B5CF6', // purple
  '#fff',
  '#fff3',
  '#3B82a6',
  '#10B989',
  '#F59E0B',
  '#8B5CF6',
];

const TEXT_STYLES = [
  { value: 1, label: 'Heading 1' },
  { value: 2, label: 'Heading 2' },
  { value: 3, label: 'Heading 3' },
  { value: 4, label: 'Heading 4' },
  { value: 5, label: 'Heading 5' },
  { value: 6, label: 'Heading 6' },
  { value: 'p-base', label: 'Parágrafo base' },
  { value: 'p-lg', label: 'Parágrafo lg', fontSize: '1.5rem' },
  { value: 'p-sm', label: 'Parágrafo sm', fontSize: '0.875rem' },
];

function ColorPicker({ editor }: { editor: any }) {
  // ✅ Salva a seleção continuamente sempre que ela mudar
  const savedSelection = useRef<{ from: number; to: number } | null>(null);

  useEffect(() => {
    if (!editor) return;

    const updateSelection = () => {
      const { from, to } = editor.state.selection;
      // Só salva se houver texto selecionado (from !== to)
      if (from !== to) {
        savedSelection.current = { from, to };
      }
    };

    editor.on('selectionUpdate', updateSelection);

    return () => {
      editor.off('selectionUpdate', updateSelection);
    };
  }, [editor]);

  const applyColor = (color: string) => {
    if (savedSelection.current) {
      const { from, to } = savedSelection.current;
      editor.chain().focus().setTextSelection({ from, to }).setColor(color).run();
    } else {
      editor.chain().focus().setColor(color).run();
    }
  };

  const removeColor = () => {
    if (savedSelection.current) {
      const { from, to } = savedSelection.current;
      editor.chain().focus().setTextSelection({ from, to }).unsetColor().run();
    } else {
      editor.chain().focus().unsetColor().run();
    }
  };

  return (
    <details>
      <summary style={{ cursor: 'pointer' }}>🎨</summary>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 20px)',
          gap: 6,
          padding: 8,
          background: '#fff',
          border: '1px solid #ccc',
          borderRadius: 6,
          marginTop: 6,
        }}
      >
        {COLORS.map((color) => (
          <button
            key={color}
            style={{
              width: 20,
              height: 20,
              background: color,
              border: '1px solid #ddd',
              cursor: 'pointer',
            }}
            onClick={() => applyColor(color)}
          />
        ))}

        <button
          onClick={removeColor}
          style={{
            gridColumn: 'span 6',
            fontSize: 10,
          }}
        >
          Remover cor
        </button>
      </div>
    </details>
  );
}

export const RichTextBlock: ComponentConfig<RichTextBlockProps> = {
  fields: {
    content: {
      type: 'richtext',
      contentEditable: true,

      tiptap: {
        extensions: [
          TextStyle.extend({
            addAttributes() {
              return {
                ...this.parent?.(),
                fontSize: {
                  default: null,
                  parseHTML: (element) => element.style.fontSize,
                  renderHTML: (attributes) => {
                    if (!attributes.fontSize) {
                      return {};
                    }
                    return {
                      style: `font-size: ${attributes.fontSize}`,
                    };
                  },
                },
              };
            },
          }),
          Color,
          Heading.configure({
            levels: [1, 2, 3, 4, 5, 6],
          }),
        ],
      },

      renderMenu: ({ editor }) => {
        if (!editor) return null;

        return (
          <RichTextMenu>
            <div className="flex flex-wrap">
              {/* DEFAULT CONTROLS */}
              <RichTextMenu.Group>
                <RichTextMenu.Bold />
                <RichTextMenu.Italic />
                <RichTextMenu.BulletList />
                <RichTextMenu.OrderedList />
                <RichTextMenu.AlignSelect />
              </RichTextMenu.Group>

              {/* 🎨 COLOR PICKER */}
              <RichTextMenu.Group>
                <ColorPicker editor={editor} />
              </RichTextMenu.Group>

              {/* 🔤 HEADINGS CUSTOM */}
              <RichTextMenu.Group>
                {(() => {
                  let currentValue: string | number = 'p-base';
                  for (let i = 1; i <= 6; i++) {
                    if (editor.isActive('heading', { level: i })) {
                      currentValue = i;
                      break;
                    }
                  }

                  if (currentValue === 'p-base') {
                    const activeStyle = TEXT_STYLES.find((style) => {
                      if (style.fontSize) {
                        return editor.isActive('textStyle', { fontSize: style.fontSize });
                      }
                      return (
                        style.value === 'p-base' &&
                        editor.isActive('paragraph') &&
                        !editor.isActive('textStyle')
                      );
                    });

                    currentValue = activeStyle?.value || 'p-base';
                  }

                  return (
                    <select
                      onChange={(e) => {
                        const value = e.target.value;
                        const style = TEXT_STYLES.find((s) => s.value === value);

                        if (value === 'p-base') {
                          editor.chain().focus().setParagraph().unsetMark('textStyle').run();
                        } else if (style?.fontSize) {
                          editor
                            .chain()
                            .focus()
                            .setParagraph()
                            .setMark('textStyle', { fontSize: style.fontSize })
                            .run();
                        } else {
                          const level = Number(value) as 1 | 2 | 3 | 4 | 5 | 6;
                          editor
                            .chain()
                            .focus()
                            .toggleHeading({ level })
                            .unsetMark('textStyle')
                            .run();
                        }
                      }}
                      value={String(currentValue)}
                    >
                      {TEXT_STYLES.map((style) => (
                        <option key={style.value} value={style.value}>
                          {style.label}
                        </option>
                      ))}
                    </select>
                  );
                })()}
              </RichTextMenu.Group>

              {/* 🔗 LINKS */}
              <RichTextMenu.Group>
                Link
                <button
                  onClick={() => {
                    const url = prompt('Digite a URL');
                    if (!url) return;
                    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                  }}
                  title="Adicionar link"
                >
                  🔗
                </button>
                <button
                  onClick={() => {
                    editor?.chain().focus().unsetLink().run();
                  }}
                  title="Remover link"
                >
                  ❌
                </button>
              </RichTextMenu.Group>
            </div>
          </RichTextMenu>
        );
      },
    },
  },

  defaultProps: {
    content: 'Texto aqui...',
  },

  render: ({ content }) => <div className="mx-auto">{content}</div>,
};
