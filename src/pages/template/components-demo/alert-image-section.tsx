import { useState, useMemo } from 'react';
import ShowCode from '@/components/show-code';
import AlertWithImage from '@/components/alert-with-image';
import { Button } from '@/components/ui/button';

export default function AlertsImageSection() {
  const [variant, setVariant] = useState<'indigo' | 'coral' | 'outline'>('indigo');
  const [title, setTitle] = useState('Hacktown Cidade Industrial');
  const [message, setMessage] = useState(
    'Oi estarei no Hacktown esse final de semana e estamos promovendo essa vaquinha para angariar fundos e levar dois palestrantes da Ocupação Vitória (Izidora) Belo Horizonte - MG.'
  );

  const variants = [
    { name: 'indigo', btnVariant: 'indigo' },
    { name: 'coral', btnVariant: 'red' },
    { name: 'outline', btnVariant: 'outline' },
  ];

  // Press Enter or blur to commit edit
  const handleCommitOnEnter =
    (commitOnEnter = true) =>
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (commitOnEnter && e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        (e.currentTarget as HTMLElement).blur();
      }
      if (!commitOnEnter && e.key === 'Enter' && e.ctrlKey) {
        e.preventDefault();
        (e.currentTarget as HTMLElement).blur();
      }
    };

  // 🧠 New snippet using CHILDREN instead of title/message props
  const snippet = useMemo(() => {
    return `
<AlertWithImage
  variant="${variant}"
  imageSrc="./imgs/core/placeholder.webp"
  imageAlt="Hacktown"
>
  <h3>${title}</h3>
  <p>${message}</p>
</AlertWithImage>
`.trim();
  }, [variant, title, message]);

  return (
    <div className="border-b p-4">
      {/* === VARIANT BUTTONS === */}
      <div className="mb-6 flex flex-wrap gap-3">
        {variants.map((v) => (
          <Button
            key={v.name}
            variant={v.btnVariant as 'indigo' | 'red' | 'outline'}
            onClick={() => setVariant(v.name as typeof variant)}
            className={`capitalize ${
              variant === v.name ? 'ring-2 ring-blue-500 ring-offset-2' : ''
            }`}
          >
            {v.name}
          </Button>
        ))}
      </div>

      {/* === PREVIEW === */}
      <div className="mx-auto max-w-3xl px-6 py-8">
        <div className="flex min-h-[220px] items-center">
          <AlertWithImage
            variant={variant}
            imageSrc="./imgs/core/placeholder.webp"
            imageAlt="Hacktown"
          >
            <div className="flex flex-col gap-2">
              {/* Editable TITLE */}
              <h3
                contentEditable
                suppressContentEditableWarning
                spellCheck={false}
                onBlur={(e) => setTitle(e.currentTarget.textContent || '')}
                onKeyDown={handleCommitOnEnter(true)}
                className="cursor-text text-lg font-bold outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                {title}
              </h3>

              {/* Editable MESSAGE */}
              <p
                contentEditable
                suppressContentEditableWarning
                spellCheck={false}
                onBlur={(e) => setMessage(e.currentTarget.textContent || '')}
                onKeyDown={handleCommitOnEnter(false)}
                className="cursor-text outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
              >
                {message}
              </p>
            </div>
          </AlertWithImage>
        </div>
      </div>

      {/* === SNIPPET BUTTON === */}
      <div className="mt-12 flex justify-end">
        <ShowCode title="AlertWithImage • snippet" code={snippet} />
      </div>
    </div>
  );
}
