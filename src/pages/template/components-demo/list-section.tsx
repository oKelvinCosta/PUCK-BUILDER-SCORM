import { useState, useMemo } from 'react';
import ShowCode from '@/components/show-code';
import { Button } from '@/components/ui/button';

type ListType = 'ul' | 'ol';

export default function ListSection() {
  const [listType, setListType] = useState<ListType>('ul');
  const [items, setItems] = useState<string[]>([
    'Primeiro item da lista',
    'Segundo item da lista',
    'Terceiro item da lista',
  ]);

  const addItem = () => setItems((prev) => [...prev, `Novo item ${prev.length + 1}`]);
  const removeItem = (index: number) => setItems((prev) => prev.filter((_, i) => i !== index));
  const updateItem = (index: number, value: string) =>
    setItems((prev) => prev.map((v, i) => (i === index ? value : v)));

  // 🧠 Generate snippet dynamically
  const snippet = useMemo(() => {
    const tagOpen =
      listType === 'ul'
        ? '<ul className="list-disc list-inside space-y-1">'
        : '<ol className="list-decimal list-inside space-y-1">';
    const tagClose = listType === 'ul' ? '</ul>' : '</ol>';
    const inner = items.map((t) => `  <li>${t}</li>`).join('\n');
    return `${tagOpen}\n${inner}\n${tagClose}`;
  }, [items, listType]);

  return (
    <div className="space-y-6 border-b p-4">
      {/* === HEADER === */}
      <div className="flex justify-end">
        <ShowCode title="List Builder • snippet" code={snippet} />
      </div>

      {/* === CONTROLS === */}
      <div className="flex flex-wrap items-center gap-4">
        <Button
          variant={listType === 'ul' ? 'indigo' : 'outline'}
          size="sm"
          onClick={() => setListType('ul')}
        >
          Unordered (•)
        </Button>
        <Button
          variant={listType === 'ol' ? 'indigo' : 'outline'}
          size="sm"
          onClick={() => setListType('ol')}
        >
          Ordered (1.)
        </Button>

        <Button variant="indigo" size="sm" onClick={addItem}>
          + Add Item
        </Button>
      </div>

      {/* === LIST EDITOR === */}
      <div className="space-y-3">
        {items.map((text, index) => (
          <div
            key={index}
            className="flex items-center gap-2 rounded border border-gray-200 bg-gray-50 p-2"
          >
            <input
              type="text"
              value={text}
              onChange={(e) => updateItem(index, e.target.value)}
              className="flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:ring-2 focus:ring-indigo-500"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => removeItem(index)}
              disabled={items.length === 1}
            >
              Remove
            </Button>
          </div>
        ))}
      </div>

      {/* === PREVIEW === */}
      <div className="pt-4">
        {listType === 'ul' ? (
          <ul className="list-inside list-disc space-y-1">
            {items.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>
        ) : (
          <ol className="list-inside list-decimal space-y-1">
            {items.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
