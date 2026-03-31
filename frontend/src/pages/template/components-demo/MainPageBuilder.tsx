import type { DividerType } from '@/components/layout/divider';
import Section from '@/components/layout/section';
import ShowCode from '@/components/template/show-code';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useMemo, useState } from 'react';

interface SectionData {
  id: number;
  bgColor: string;
  textColor: string;
  dividerTop: DividerType | 'none';
  dividerBottom: DividerType | 'none';
  dividerTopColor?: string;
  dividerBottomColor?: string;
  backgroundSrc?: string;
}

export default function SectionsBuilder() {
  // === INITIAL SECTIONS ===
  const [sections, setSections] = useState<SectionData[]>([
    {
      id: 1,
      bgColor: 'bg-white',
      textColor: 'text-gray-800',
      dividerTop: 'type01', // DEFAULT UPDATED
      dividerBottom: 'none',
      dividerTopColor: 'text-white', // DEFAULT UPDATED
      dividerBottomColor: 'text-white',
    },
  ]);

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        bgColor: 'bg-indigo-600',
        textColor: 'text-white',
        dividerTop: 'type01', // DEFAULT UPDATED
        dividerBottom: 'none',
        dividerTopColor: 'text-white', // DEFAULT UPDATED
        dividerBottomColor: 'text-white',
      },
    ]);
  };

  const updateSection = (id: number, changes: Partial<SectionData>) => {
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, ...changes } : s)));
  };

  const removeSection = (id: number) => {
    setSections((prev) => prev.filter((s) => s.id !== id));
  };

  // === OPTIONS ===
  const dividerOptions: (DividerType | 'none')[] = [
    'none',
    'type01',
    'type02',
    'type03',
    'type04',
    'type05',
    'type06',
    'type07',
    'type08',
    'type09',
    'type10',
  ];

  const colorOptions = [
    'text-white',
    'text-gray-200',
    'text-gray-600',
    'text-indigo-600',
    'text-coral-400',
    'text-lime-400',
    'text-azure-400',
    'text-rose-500',
    'text-black',
  ];

  // === SECTION SNIPPET ===
  const makeSectionSnippet = (s: SectionData) => {
    const top =
      s.dividerTop !== 'none'
        ? `\n    dividerTop={{ type: '${s.dividerTop}', className: '${s.dividerTopColor}' }}`
        : '';
    const bottom =
      s.dividerBottom !== 'none'
        ? `\n    dividerBottom={{ type: '${s.dividerBottom}', className: '${s.dividerBottomColor}' }}`
        : '';
    const bgImage = s.backgroundSrc ? `\n    backgroundSrc="${s.backgroundSrc}"` : '';

    return `
  <Section${top}${bottom}${bgImage}
    className="${s.bgColor} ${s.textColor}"
  >
    <Section${s.id} />
  </Section>`;
  };

  // === FULL PAGE SNIPPET (HEADER + SECTIONS + FOOTER) ===
  const fullSnippet = useMemo(() => {
    const sectionsCode = sections.map(makeSectionSnippet).join('\n');

    return `
import CourseHeader from '@/components/course-header';
import CourseFooter from '@/components/course-footer';
import Section from '@/components/layout/section';
${sections.map((s) => `import Section${s.id} from './section${s.id}';`).join('\n')}

<>
  <CourseHeader
    gradient="gradient01"
    grade="9º ano"
    subject="Fotografia"
    backgroundSrc="./imgs/core/hero.png"
    dividerType="type01"
    dividerColor="text-white"
  >
    O que é o futuro? Como me vejo daqui a alguns anos?
  </CourseHeader>

${sectionsCode}

  <CourseFooter />
</>
`.trim();
  }, [sections]);

  // === UI ===
  return (
    <section className="space-y-10 border-b p-4">
      <h2 className="mb-4 text-xl font-bold">📚 Sections Builder</h2>

      <Button onClick={addSection} className="mb-6">
        + Add Section
      </Button>

      {sections.map((section) => {
        const snippet = makeSectionSnippet(section);

        return (
          <div key={section.id} className="mb-6 rounded-md border bg-gray-50 p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">Section {section.id}</h3>
              <div className="flex gap-2">
                <ShowCode title={`Section ${section.id} • code`} code={snippet} />
                <Button variant="red" onClick={() => removeSection(section.id)}>
                  Remove
                </Button>
              </div>
            </div>

            {/* CONTROLS */}
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              {/* Background */}
              <div>
                <label className="block text-sm font-semibold">Background</label>
                <select
                  value={section.bgColor}
                  onChange={(e) => updateSection(section.id, { bgColor: e.target.value })}
                  className="w-full rounded border px-2 py-1"
                >
                  <option value="bg-white">White</option>
                  <option value="bg-gray-200">Gray 200</option>
                  <option value="bg-indigo-600">Indigo 600</option>
                  <option value="bg-coral-400">Coral 400</option>
                  <option value="bg-gradient-to-r from-indigo-600 to-coral-400">
                    Indigo → Coral
                  </option>
                </select>
              </div>

              {/* Top Divider */}
              <div>
                <label className="block text-sm font-semibold">Top Divider</label>
                <select
                  value={section.dividerTop}
                  onChange={(e) =>
                    updateSection(section.id, {
                      dividerTop: e.target.value as DividerType | 'none',
                    })
                  }
                  className="w-full rounded border px-2 py-1"
                >
                  {dividerOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Top Divider Color */}
              <div>
                <label className="block text-sm font-semibold">Top Divider Color</label>
                <select
                  value={section.dividerTopColor}
                  onChange={(e) => updateSection(section.id, { dividerTopColor: e.target.value })}
                  className="w-full rounded border px-2 py-1"
                >
                  {colorOptions.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bottom Divider */}
              <div>
                <label className="block text-sm font-semibold">Bottom Divider</label>
                <select
                  value={section.dividerBottom}
                  onChange={(e) =>
                    updateSection(section.id, {
                      dividerBottom: e.target.value as DividerType | 'none',
                    })
                  }
                  className="w-full rounded border px-2 py-1"
                >
                  {dividerOptions.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Bottom Divider Color */}
              <div>
                <label className="block text-sm font-semibold">Bottom Divider Color</label>
                <select
                  value={section.dividerBottomColor}
                  onChange={(e) =>
                    updateSection(section.id, { dividerBottomColor: e.target.value })
                  }
                  className="w-full rounded border px-2 py-1"
                >
                  {colorOptions.map((color) => (
                    <option key={color} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>

              {/* Background Image */}
              <div className="col-span-2">
                <label className="block text-sm font-semibold">Background Image (optional)</label>
                <input
                  type="text"
                  placeholder="./imgs/bg.jpg"
                  value={section.backgroundSrc || ''}
                  onChange={(e) => updateSection(section.id, { backgroundSrc: e.target.value })}
                  className="w-full rounded border px-2 py-1"
                />
              </div>
            </div>

            {/* === LIVE PREVIEW === */}
            <div className="mt-6">
              <Section
                dividerTop={
                  section.dividerTop !== 'none'
                    ? { type: section.dividerTop, className: section.dividerTopColor }
                    : undefined
                }
                dividerBottom={
                  section.dividerBottom !== 'none'
                    ? { type: section.dividerBottom, className: section.dividerBottomColor }
                    : undefined
                }
                backgroundSrc={section.backgroundSrc}
                className={cn('rounded text-center', section.bgColor, section.textColor)}
              >
                <div className="container">
                  <h4 className="text-2xl font-bold">SECTION {section.id}</h4>
                  <p className="opacity-80">Live preview with real divider colors</p>
                </div>
              </Section>
            </div>
          </div>
        );
      })}

      {/* === FULL PAGE SNIPPET === */}
      <div className="mt-10 flex justify-end">
        <ShowCode title="All Sections • Snippet" code={fullSnippet} />
      </div>
    </section>
  );
}
