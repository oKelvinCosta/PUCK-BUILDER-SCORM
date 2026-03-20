import { useState, useMemo } from 'react';
import ShowCode from '@/components/show-code';
import { Alert } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

type AlertVariant = 'indigo' | 'coral' | 'lime' | 'outline' | 'destructive' | 'success';
type AlertSize = 'lg' | 'sm';
type AlertWeight = 'bold' | 'normal';

export default function AlertsSection() {
  const [variant, setVariant] = useState<AlertVariant>('indigo');
  const [size, setSize] = useState<AlertSize>('lg');
  const [weight, setWeight] = useState<AlertWeight>('bold');
  const [message, setMessage] = useState<string>('');

  const variants: {
    name: AlertVariant;
    btnVariant: React.ComponentProps<typeof Button>['variant'];
  }[] = [
    { name: 'indigo', btnVariant: 'indigo' },
    { name: 'coral', btnVariant: 'red' },
    { name: 'lime', btnVariant: 'lime' },
    { name: 'outline', btnVariant: 'outline' },
    { name: 'destructive', btnVariant: 'outline' },
    { name: 'success', btnVariant: 'outline' },
  ];

  const sizes: { name: AlertSize; label: string }[] = [
    { name: 'lg', label: 'Large (24px)' },
    { name: 'sm', label: 'Small (16px)' },
  ];

  const weights: { name: AlertWeight; label: string }[] = [
    { name: 'bold', label: 'Bold' },
    { name: 'normal', label: 'Regular' },
  ];

  // Default text logic
  const defaultMessage =
    variant === 'destructive'
      ? 'Sua resposta está incorreta! Tente novamente.'
      : variant === 'success'
        ? 'Sua resposta está correta! Pode prosseguir.'
        : 'Já estamos em nosso centro de comandos...';

  const displayMessage = message.trim() || defaultMessage;

  // Press Enter to commit
  const handleCommitOnEnter = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      (e.currentTarget as HTMLElement).blur();
    }
  };

  // Dynamic snippet
  const snippet = useMemo(() => {
    return `
<Alert variant="${variant}" size="${size}" weight="${weight}">
  ${displayMessage}
</Alert>
`.trim();
  }, [variant, size, weight, displayMessage]);

  return (
    <div className="border-b p-4">
      {/* === VARIANT CONTROLS === */}
      <div className="mb-6 flex flex-wrap gap-3">
        {variants.map((v) => (
          <Button
            key={v.name}
            variant={v.btnVariant}
            onClick={() => setVariant(v.name)}
            className={`capitalize ${
              variant === v.name ? 'ring-2 ring-blue-500 ring-offset-2' : ''
            }`}
          >
            {v.name}
          </Button>
        ))}
      </div>

      {/* === SIZE CONTROLS === */}
      <div className="mb-6 flex flex-wrap gap-3">
        {sizes.map((s) => (
          <Button
            key={s.name}
            variant={size === s.name ? 'indigo' : 'outline'}
            onClick={() => setSize(s.name)}
            className="capitalize"
          >
            {s.label}
          </Button>
        ))}
      </div>

      {/* === WEIGHT CONTROLS === */}
      <div className="mb-6 flex flex-wrap gap-3">
        {weights.map((w) => (
          <Button
            key={w.name}
            variant={weight === w.name ? 'indigo' : 'outline'}
            onClick={() => setWeight(w.name)}
            className="capitalize"
          >
            {w.label}
          </Button>
        ))}
      </div>

      {/* === PREVIEW (editable alert) === */}
      <div className="mx-auto max-w-3xl px-6 py-8">
        <div className="flex h-28 items-center justify-center">
          <Alert
            variant={variant}
            size={size}
            weight={weight}
            className="w-full max-w-lg cursor-text focus-within:ring-2 focus-within:ring-indigo-400"
          >
            <div
              contentEditable
              suppressContentEditableWarning
              spellCheck={false}
              onBlur={(e) => setMessage(e.currentTarget.textContent || '')}
              onKeyDown={handleCommitOnEnter}
              className="w-full text-center outline-none"
            >
              {displayMessage}
            </div>
          </Alert>
        </div>
      </div>

      {/* === SHOW CODE BUTTON AT BOTTOM === */}
      <div className="mt-12 flex justify-end">
        <ShowCode title="Alerts • snippet" code={snippet} />
      </div>
    </div>
  );
}
