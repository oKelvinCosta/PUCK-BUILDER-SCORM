import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

type ShowCodeProps = {
  code: string;
  title?: string; // aparece no topo do modal
  triggerLabel?: string; // texto do botão
  className?: string; // classes extras para o botão
  width?: 'sm' | 'md' | 'lg'; // largura do modal
};

export default function ShowCode({
  code,
  title = 'Código',
  triggerLabel = 'Ver código',
  className = '',
  width = 'lg',
}: ShowCodeProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // Fecha com ESC e trava scroll do body
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    if (open) {
      document.addEventListener('keydown', onKey);
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      // foca no botão de fechar para acessibilidade
      closeBtnRef.current?.focus();
      return () => {
        document.removeEventListener('keydown', onKey);
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {
      // fallback em ambientes sem clipboard API
      const ta = document.createElement('textarea');
      ta.value = code;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };

  const widthClass =
    width === 'sm'
      ? 'w-[min(560px,92vw)]'
      : width === 'md'
        ? 'w-[min(760px,92vw)]'
        : 'w-[min(900px,92vw)]';

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)} className={className}>
        {triggerLabel}
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-[9999] cursor-pointer bg-black/60"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            className={`absolute left-1/2 top-1/2 ${widthClass} -translate-x-1/2 -translate-y-1/2 cursor-default overflow-hidden rounded-2xl bg-white shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h3 className="text-sm font-semibold">{title}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={copy}
                  className="inline-flex items-center gap-2 rounded-md border px-3 py-1.5 text-sm hover:bg-gray-50 active:scale-[0.98]"
                >
                  {copied ? '✅ Copiado' : '📋 Copiar'}
                </button>
                <button
                  ref={closeBtnRef}
                  onClick={() => setOpen(false)}
                  aria-label="Fechar"
                  className="rounded-md p-1 text-xl leading-none hover:bg-gray-100"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="max-h-[70vh] overflow-auto p-4">
              <pre className="whitespace-pre-wrap break-words rounded-lg bg-gray-950 p-4 text-gray-100">
                <code>{code}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
