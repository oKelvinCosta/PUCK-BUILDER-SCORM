import { useState, useMemo } from 'react';
import ShowCode from '@/components/show-code';
import Tabs from '@/components/tab-content';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/textarea';
import { Input } from '@/components/ui/input';

type ContentMode = 'simple' | 'jsx';

interface TabBuilderItem {
  label: string;
  content: string;
  mode: ContentMode;
}

export default function TabsBuilderSection() {
  const [tabs, setTabs] = useState<TabBuilderItem[]>([
    { label: 'Aba 1', content: 'Conteúdo simples aqui...', mode: 'simple' },
  ]);

  const updateTab = <K extends keyof TabBuilderItem>(
    idx: number,
    key: K,
    value: TabBuilderItem[K]
  ) => {
    const next = [...tabs];
    next[idx][key] = value;
    setTabs(next);
  };

  const addTab = () =>
    setTabs((t) => [
      ...t,
      { label: `Aba ${t.length + 1}`, content: 'Novo conteúdo', mode: 'simple' },
    ]);

  const removeTab = (idx: number) => setTabs((t) => t.filter((_, i) => i !== idx));

  // Build preview-ready content
  const previewTabs = useMemo(() => {
    return tabs.map((t) => ({
      label: t.label,
      content:
        t.mode === 'simple' ? (
          <p className="col-span-12">{t.content}</p>
        ) : (
          <div className="col-span-12">
            {/* Do NOT execute JSX — show visually */}
            <pre className="whitespace-pre-wrap">{t.content}</pre>
          </div>
        ),
    }));
  }, [tabs]);

  // CODE SNIPPET GENERATOR
  const snippet = useMemo(() => {
    const items = tabs
      .map((t) => {
        if (t.mode === 'simple') {
          return `{
  label: "${t.label}",
  content: <p className='col-span-12'>${t.content}</p>
}`;
        }
        return `{
  label: "${t.label}",
  content: (
${t.content
  .split('\n')
  .map((line) => '    ' + line)
  .join('\n')}
  )
}`;
      })
      .join(',\n');

    return `
const tabItems = [
${items}
];

<Tabs tabs={tabItems} contentClassName="h-96" />
`.trim();
  }, [tabs]);

  return (
    <section id="tabs-builder" className="border-b p-4">
      <div className="mb-2 flex justify-end">
        <ShowCode title="Tabs • snippet" code={snippet} />
      </div>

      <h3 className="mb-4 text-2xl font-bold text-indigo-600">Tabs Builder</h3>

      {/* EDITOR */}
      <div className="flex flex-col gap-6">
        {tabs.map((t, idx) => (
          <div key={idx} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">Aba {idx + 1}</h4>

              {tabs.length > 1 && (
                <Button variant="red" size="sm" onClick={() => removeTab(idx)}>
                  Remover
                </Button>
              )}
            </div>

            <Input
              className="mt-3"
              value={t.label}
              onChange={(e) => updateTab(idx, 'label', e.target.value)}
              placeholder="Nome da aba"
            />

            <div className="mt-3 flex gap-4">
              <label>
                <input
                  type="radio"
                  checked={t.mode === 'simple'}
                  onChange={() => updateTab(idx, 'mode', 'simple')}
                />
                <span className="ml-2">Texto simples</span>
              </label>
              <label>
                <input
                  type="radio"
                  checked={t.mode === 'jsx'}
                  onChange={() => updateTab(idx, 'mode', 'jsx')}
                />
                <span className="ml-2">JSX custom</span>
              </label>
            </div>

            <Textarea
              className="mt-3"
              value={t.content}
              onChange={(e) => updateTab(idx, 'content', e.target.value)}
              rows={t.mode === 'simple' ? 3 : 6}
              placeholder={
                t.mode === 'simple'
                  ? 'Digite texto simples…'
                  : "<MainCard title='Exemplo'>Meu JSX aqui</MainCard>"
              }
            />
          </div>
        ))}

        <Button onClick={addTab}>+ Adicionar Aba</Button>
      </div>

      {/* PREVIEW */}
      <div className="mx-auto mt-8 max-w-6xl">
        <Tabs tabs={previewTabs} contentClassName="h-96" />
      </div>
    </section>
  );
}
