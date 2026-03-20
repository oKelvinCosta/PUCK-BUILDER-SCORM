// FILE: src/components/AccordionExampleSection.tsx
import AccordionContained from '@/components/accordion-contained';
import ShowCode from '@/components/show-code';
import { Textarea } from '@/components/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useMemo, useState } from 'react';

// ========================================
// Simplified type matching AccordionContained
// ========================================
type AccordionItemConfig = {
  title: string | React.ReactNode;
  content: string | React.ReactNode;
};

export default function AccordionExampleSection() {
  const [items, setItems] = useState<AccordionItemConfig[]>([
    {
      title: 'Seu texto aqui!',
      content: 'Texto simples.',
    },
    {
      title: 'Seu texto aqui!',
      content: 'Outro item com texto simples.',
    },
    {
      title: 'Seu texto aqui!',
      content: 'Mais conteúdo editável.',
    },
  ]);

  // ==================================================
  // SNIPPET GENERATOR — simplified
  // ==================================================
  const snippet = useMemo(() => {
    const inner = items
      .map((item) => {
        return `{
      title: '${item.title}',
      content: ${typeof item.content === 'string' ? `'${item.content}'` : '<ReactNode>'},
    }`;
      })
      .join(',\n    ');

    return `
<AccordionContained
  items={[
    ${inner}
  ]}
/>`.trim();
  }, [items]);

  // ==================================================
  // HANDLER
  // ==================================================
  const handleChange = <K extends keyof AccordionItemConfig>(
    index: number,
    key: K,
    value: AccordionItemConfig[K]
  ) => {
    setItems((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [key]: value };
      return updated;
    });
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      {
        title: `Novo item ${prev.length + 1}`,
        content: 'Digite seu conteúdo aqui...',
      },
    ]);
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="border-b p-4">
      <div className="mb-6 flex flex-wrap gap-3">
        <Button variant="indigo" onClick={handleAddItem}>
          + Adicionar item
        </Button>
      </div>

      {/* Editable Items */}
      <div className="mb-8 flex flex-col gap-6">
        {items.map((item, index) => (
          <div key={index} className="rounded-lg border border-gray-200 bg-gray-50 p-4 shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h4 className="font-semibold text-gray-700">Item {index + 1}</h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRemoveItem(index)}
                disabled={items.length === 1}
              >
                Remover
              </Button>
            </div>

            {/* Título */}
            <div className="mb-3">
              <label className="text-sm text-gray-600">Título:</label>
              <Input
                value={typeof item.title === 'string' ? item.title : ''}
                onChange={(e) => handleChange(index, 'title', e.target.value)}
                placeholder="Digite o título"
                className="mt-1"
              />
            </div>

            {/* CONTENT EDITOR */}
            <div className="mb-3">
              <label className="text-sm text-gray-600">Conteúdo (string ou JSX):</label>
              <Textarea
                value={typeof item.content === 'string' ? item.content : ''}
                onChange={(e) => handleChange(index, 'content', e.target.value)}
                placeholder="Digite seu texto ou JSX aqui..."
                className="mt-1 font-mono text-xs"
                rows={6}
              />
            </div>
          </div>
        ))}
      </div>

      {/* SNIPPET */}
      <div className="mb-2 flex justify-end">
        <ShowCode title="Accordion Example • snippet" code={snippet} />
      </div>

      {/* PREVIEW */}
      <div className="flex gap-4">
        <AccordionContained items={items} />
      </div>
    </div>
  );
}
