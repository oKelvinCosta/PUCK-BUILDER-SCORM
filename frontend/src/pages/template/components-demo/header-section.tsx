import CourseHeader from '@/components/template/course-header';
import ShowCode from '@/components/template/show-code';
import { Button } from '@/components/ui/button';
import { useMemo, useState } from 'react';

export default function HeaderEditSection() {
  const [gradient, setGradient] = useState<'gradient01' | 'gradient02'>('gradient01');
  const [grade, setGrade] = useState('9º ano');
  const [subject, setSubject] = useState('Fotografia');
  const [title, setTitle] = useState('O que é o futuro? Como me vejo daqui a alguns anos?');
  const [dividerType, setDividerType] = useState<
    'type01' | 'type02' | 'type03' | 'type04' | 'type05' | 'type06' | 'type07' | 'type08'
  >('type03');
  const [dividerColor, setDividerColor] = useState('text-coral-400');

  const gradients = [
    { name: 'gradient01', label: 'Gradient 01' },
    { name: 'gradient02', label: 'Gradient 02' },
  ];

  const dividerTypes = [
    'type01',
    'type02',
    'type03',
    'type04',
    'type05',
    'type06',
    'type07',
    'type08',
  ];

  const dividerColors = [
    'text-indigo-600',
    'text-coral-400',
    'text-lime-400',
    'text-azure-400',
    'text-rose-500',
    'text-gray-500',
    'text-white', // ✅ Added white
  ];

  const handleCommitOnEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      (e.currentTarget as HTMLElement).blur();
    }
  };

  const snippet = useMemo(
    () =>
      `
<CourseHeader
  gradient="${gradient}"
  grade="${grade}"
  subject="${subject}"
  backgroundSrc="./imgs/core/hero.png"
  dividerType="${dividerType}"
  dividerColor="${dividerColor}"
>
  ${title}
</CourseHeader>
`.trim(),
    [gradient, grade, subject, title, dividerType, dividerColor]
  );

  return (
    <section className="border-b p-4">
      {/* === TOP CONTROLS === */}
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
        {/* Gradient Buttons */}
        <div>
          <h3 className="mb-2 text-sm font-semibold text-gray-700">Gradient</h3>
          <div className="flex flex-wrap gap-2">
            {gradients.map((g) => (
              <Button
                key={g.name}
                variant="outline"
                onClick={() => setGradient(g.name as typeof gradient)}
                className={`capitalize ${
                  gradient === g.name ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                }`}
              >
                {g.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Grade + Subject Inputs */}
        <div>
          <h3 className="mb-2 text-sm font-semibold text-gray-700">Header Info</h3>
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-gray-700">Grade</label>
            <input
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-40 rounded border border-gray-300 px-2 py-1 text-sm focus:border-indigo-400 focus:ring-0"
            />
            <label className="mt-2 text-xs font-semibold text-gray-700">Subject</label>
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-40 rounded border border-gray-300 px-2 py-1 text-sm focus:border-indigo-400 focus:ring-0"
            />
          </div>
        </div>
      </div>

      {/* === HEADER PREVIEW === */}
      <div className="relative mb-8 border border-gray-200">
        <CourseHeader
          gradient={gradient}
          grade={grade}
          subject={subject}
          backgroundSrc="./imgs/core/hero.png"
          dividerType={dividerType}
          dividerColor={dividerColor}
        >
          <h1
            contentEditable
            suppressContentEditableWarning
            spellCheck={false}
            onBlur={(e) => setTitle(e.currentTarget.textContent || '')}
            onKeyDown={handleCommitOnEnter}
            className="cursor-text outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            {title}
          </h1>
        </CourseHeader>
      </div>

      {/* === DIVIDER CONTROLS BELOW PREVIEW === */}
      <div className="mb-10 flex flex-wrap items-end justify-center gap-6">
        <div>
          <h3 className="mb-2 text-center text-sm font-semibold text-gray-700">Divider Type</h3>
          <select
            value={dividerType}
            onChange={(e) => setDividerType(e.target.value as typeof dividerType)}
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-indigo-400 focus:ring-0"
          >
            {dividerTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <h3 className="mb-2 text-center text-sm font-semibold text-gray-700">Divider Color</h3>
          <select
            value={dividerColor}
            onChange={(e) => setDividerColor(e.target.value)}
            className="rounded border border-gray-300 px-3 py-2 text-sm focus:border-indigo-400 focus:ring-0"
          >
            {dividerColors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* === SNIPPET === */}
      <div className="mt-12 flex justify-end">
        <ShowCode title="CourseHeader • snippet" code={snippet} />
      </div>
    </section>
  );
}
