// FILE: src/components/CardSection.tsx
import { CardInfo } from '@/components/card-info';
import MainCard from '@/components/main-card';
import ShowCode from '@/components/show-code';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMemo, useState } from 'react';

type LayoutMode = 'vertical' | 'horizontal';
type AlignType = 'left' | 'center' | 'right';
type HorizontalSide = 'left' | 'right';

export default function CardSection() {
  // LAYOUT
  const [layout, setLayout] = useState<LayoutMode>('vertical');
  const [horizontalSide, setHorizontalSide] = useState<HorizontalSide>('left');

  // VISIBILITY
  const [hideTitle, setHideTitle] = useState(false);
  const [hideText, setHideText] = useState(false);
  const [hideImage, setHideImage] = useState(false);

  // ALIGNMENT
  const [titleAlign, setTitleAlign] = useState<AlignType>('left');
  const [textAlign, setTextAlign] = useState<AlignType>('left');

  // COLORS
  const [titleColor, setTitleColor] = useState('text-gray-700');
  const [textColor, setTextColor] = useState('text-gray-700');

  const colorChoices = [
    { label: 'Coral', value: 'text-coral-400' },
    { label: 'Indigo', value: 'text-indigo-600' },
    { label: 'Lime', value: 'text-lime-400' },
    { label: 'Gray', value: 'text-gray-700' },
    { label: 'White', value: 'text-white' },
  ];

  // BOX COLOR — supports "none" (no box)
  const [boxColor, setBoxColor] = useState<'none' | string>('bg-white');
  const boxColorChoices = [
    { label: 'No Box (Transparent)', value: 'none' },
    { label: 'White', value: 'bg-white' },
    { label: 'Indigo', value: 'bg-indigo-600' },
    { label: 'Coral', value: 'bg-coral-400' },
    { label: 'Gray', value: 'bg-gray-400' },
    { label: 'Lime', value: 'bg-lime-400' },
  ];

  // CONTENT
  const [title, setTitle] = useState('Título do Card');
  const [text, setText] = useState('Conteúdo simples do card...');
  // Content mode removed - using simple text only

  // IMAGE - Removed image selection functionality

  const commit = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      (e.currentTarget as HTMLElement).blur();
    }
  };

  const alignClass: Record<AlignType, string> = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  // ========================
  // 🔥 SNIPPET GENERATION
  // ========================
  const snippet = useMemo(() => {
    const layoutProp = layout === 'horizontal' ? ` horizontal side="${horizontalSide}"` : '';
    const titleProp = hideTitle ? '' : ` title="${title}"`;

    // Add className prop for background color if specified
    const classNameProp = boxColor !== 'none' ? ` className="${boxColor}"` : '';

    // SIMPLE TEXT ONLY
    const textContent = hideText ? '' : `<p>${text}</p>`;

    if (hideImage) {
      return `
<CardInfo${titleProp}${classNameProp}>
  ${textContent}
</CardInfo>`.trim();
    }

    return `
<MainCard imgSrc="./imgs/core/placeholder.webp"${layoutProp}${titleProp}${classNameProp}>
  ${textContent}
</MainCard>`.trim();
  }, [layout, horizontalSide, hideTitle, hideText, hideImage, title, text, boxColor]);

  // Helper para classes da box (preview)
  const boxClasses = boxColor === 'none' ? 'bg-transparent border-none shadow-none' : boxColor;

  // ================================================================
  // ========================= RENDER ===============================
  // ================================================================
  return (
    <div className="border-b p-4">
      {/* VERTICAL LAYOUT: TOP CONTROLS + BOTTOM CENTERED PREVIEW */}
      <div className="flex flex-col gap-8">
        {/* TOP CONTROL MENU */}
        <div className="mx-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* BOX COLOR */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700">Card Background</h4>
              <Select value={boxColor} onValueChange={(v) => setBoxColor(v as typeof boxColor)}>
                <SelectTrigger className="h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {boxColorChoices.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* COLORS */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700">Title & Text Color</h4>

              <div className="flex flex-col gap-1">
                <span className="text-xs">Title</span>
                <Select value={titleColor} onValueChange={setTitleColor}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colorChoices.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-xs">Text</span>
                <Select value={textColor} onValueChange={setTextColor}>
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {colorChoices.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* ALIGNMENT */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700">Alignment</h4>

              <div>
                <span className="text-xs">Title</span>
                <div className="mt-1 flex gap-1">
                  {(['left', 'center', 'right'] as AlignType[]).map((a) => (
                    <Button
                      key={a}
                      size="sm"
                      variant={titleAlign === a ? 'indigo' : 'outline'}
                      onClick={() => setTitleAlign(a)}
                    >
                      {a}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs">Text</span>
                <div className="mt-1 flex gap-1">
                  {(['left', 'center', 'right'] as AlignType[]).map((a) => (
                    <Button
                      key={a}
                      size="sm"
                      variant={textAlign === a ? 'indigo' : 'outline'}
                      onClick={() => setTextAlign(a)}
                    >
                      {a}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* LAYOUT */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-gray-700">Layout</h4>

              <div className="flex gap-2">
                <Button
                  variant={layout === 'vertical' ? 'indigo' : 'outline'}
                  onClick={() => setLayout('vertical')}
                >
                  Vertical
                </Button>

                <Button
                  variant={layout === 'horizontal' ? 'indigo' : 'outline'}
                  onClick={() => setLayout('horizontal')}
                >
                  Horizontal
                </Button>
              </div>

              {/* Horizontal image side */}
              {layout === 'horizontal' && !hideImage && (
                <div className="mt-3">
                  <span className="text-xs">Image Position</span>
                  <div className="mt-1 flex gap-1">
                    <Button
                      size="sm"
                      variant={horizontalSide === 'left' ? 'indigo' : 'outline'}
                      onClick={() => setHorizontalSide('left')}
                    >
                      Left
                    </Button>
                    <Button
                      size="sm"
                      variant={horizontalSide === 'right' ? 'indigo' : 'outline'}
                      onClick={() => setHorizontalSide('right')}
                    >
                      Right
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* VISIBILITY */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700">Visibility</h4>

              <div className="flex gap-2">
                <Button size="sm" variant="outline" onClick={() => setHideTitle((v) => !v)}>
                  {hideTitle ? 'Show Title' : 'Hide Title'}
                </Button>

                <Button size="sm" variant="outline" onClick={() => setHideText((v) => !v)}>
                  {hideText ? 'Show Text' : 'Hide Text'}
                </Button>

                <Button size="sm" variant="outline" onClick={() => setHideImage((v) => !v)}>
                  {hideImage ? 'Show Image' : 'Hide Image'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM PANEL — CENTERED PREVIEW */}
        <div className="mx-auto flex w-full max-w-4xl justify-center">
          <div className="w-full max-w-[460px] p-4">
            {/* ================= PREVIEW ================= */}
            {!hideImage ? (
              <MainCard
                imgSrc="./imgs/core/placeholder.webp"
                horizontal={layout === 'horizontal'}
                side={horizontalSide}
                title=""
                className={`w-full max-w-[460px] p-4 ${boxClasses}`}
              >
                <div className="flex flex-col gap-1">
                  {!hideTitle && (
                    <h3
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setTitle(e.currentTarget.textContent || '')}
                      onKeyDown={commit}
                      className={`${titleColor} ${alignClass[titleAlign]} cursor-text text-lg font-bold outline-none`}
                    >
                      {title}
                    </h3>
                  )}

                  {!hideText && (
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setText(e.currentTarget.textContent || '')}
                      onKeyDown={commit}
                      className={`${textColor} ${alignClass[textAlign]} cursor-text outline-none`}
                    >
                      {text}
                    </p>
                  )}
                </div>
              </MainCard>
            ) : (
              <CardInfo title="" centered className={`w-full max-w-[460px] p-4 ${boxClasses}`}>
                <div className="flex flex-col gap-1">
                  {!hideTitle && (
                    <h3
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setTitle(e.currentTarget.textContent || '')}
                      onKeyDown={commit}
                      className={`${titleColor} ${alignClass[titleAlign]} cursor-text text-lg font-bold outline-none`}
                    >
                      {title}
                    </h3>
                  )}

                  {!hideText && (
                    <p
                      contentEditable
                      suppressContentEditableWarning
                      onBlur={(e) => setText(e.currentTarget.textContent || '')}
                      onKeyDown={commit}
                      className={`${textColor} ${alignClass[textAlign]} cursor-text outline-none`}
                    >
                      {text}
                    </p>
                  )}
                </div>
              </CardInfo>
            )}

            {/* SNIPPET */}
            <div className="mt-12 flex justify-end">
              <ShowCode title="Card • snippet" code={snippet} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
