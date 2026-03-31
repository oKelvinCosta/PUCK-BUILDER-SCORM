import ContentBlock from '@/components/template/block-content';
import ShowCode from '@/components/template/show-code';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMemo, useState } from 'react';

type LayoutMode = 'imageLeft' | 'imageRight';
type SizeMode = 'small' | 'medium' | 'large';
type BoxedMode = false | 'text' | 'full';
type TagType = 'p' | 'h1' | 'h2' | 'h3' | 'h4';
type WeightType = 'normal' | 'bold';
type RatioMode = '1:1' | '1:2' | '2:1';
type ImageSizeMode = 'normal' | 'small' | 'large';

interface BlockData {
  id: number;
  layout: LayoutMode;
  bgColor: string;
  textColor: string;
  titleColor: string;
  size: SizeMode;
  boxed: BoxedMode;
  hideTitle: boolean;
  hideText: boolean;
  hideImage: boolean;
  title: string;
  text: string;
  titleTag: TagType;
  textTag: TagType;
  titleWeight: WeightType;
  textWeight: WeightType;
  ratio: RatioMode;
  imgSrc: string;
}

// === AUTOMATIC IMAGE SIZE LOGIC ===
const getAutoImageSize = (ratio: RatioMode): ImageSizeMode => {
  switch (ratio) {
    case '1:2':
      return 'small';
    case '2:1':
      return 'large';
    default:
      return 'normal';
  }
};

// === 🔥 NEW VITE 5 IMAGE GLOB ===
const imageModules = import.meta.glob('./imgs/**/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const imageOptions = Object.values(imageModules)
  .map((url) => url as string)
  .sort((a, b) => a.localeCompare(b));

const PLACEHOLDER = './imgs/core/placeholder.webp';

const colorOptions = [
  { label: 'Transparent', value: 'bg-transparent' },
  { label: 'Gray 700', value: 'bg-gray-700' },
  { label: 'Gray 400', value: 'bg-gray-400' },
  { label: 'Gray 200', value: 'bg-gray-200' },
  { label: 'White', value: 'bg-white' },
  { label: 'Coral 400', value: 'bg-coral-400' },
  { label: 'Lime 400', value: 'bg-lime-400' },
  { label: 'Indigo 600', value: 'bg-indigo-600' },
  { label: 'Indigo → Coral', value: 'bg-gradient-to-r from-indigo-600 to-coral-400' },
];

export default function BlockContentSection() {
  const [blocks, setBlocks] = useState<BlockData[]>([
    {
      id: 1,
      layout: 'imageLeft',
      bgColor: 'bg-transparent',
      textColor: 'text-gray-700',
      titleColor: 'text-gray-700',
      size: 'medium',
      boxed: false,
      hideTitle: false,
      hideText: false,
      hideImage: false,
      title: 'Bloco Dinâmico 1',
      text: 'Conteúdo demonstrativo do componente ContentBlock.',
      titleTag: 'h3',
      textTag: 'p',
      titleWeight: 'bold',
      textWeight: 'normal',
      ratio: '1:1',
      imgSrc: PLACEHOLDER,
    },
  ]);

  const addBlock = () => {
    setBlocks((prev) => [
      ...prev,
      {
        id: Date.now(),
        layout: 'imageRight',
        bgColor: 'bg-transparent',
        textColor: 'text-gray-700',
        titleColor: 'text-gray-700',
        size: 'medium',
        boxed: false,
        hideTitle: false,
        hideText: false,
        hideImage: false,
        title: `Novo Bloco ${prev.length + 1}`,
        text: 'Clique e edite este texto.',
        titleTag: 'h3',
        textTag: 'p',
        titleWeight: 'bold',
        textWeight: 'normal',
        ratio: '1:1',
        imgSrc: PLACEHOLDER,
      },
    ]);
  };

  const removeBlock = (id: number) => setBlocks((prev) => prev.filter((b) => b.id !== id));
  const updateBlock = (id: number, key: keyof BlockData, value: unknown) =>
    setBlocks((prev) => prev.map((b) => (b.id === id ? { ...b, [key]: value } : b)));

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

  // === SNIPPET GENERATION ===
  const snippet = useMemo(() => {
    return blocks
      .map((b) => {
        const ratioProp = b.ratio !== '1:1' ? ` ratio="${b.ratio}"` : '';
        const imageSize = getAutoImageSize(b.ratio);
        const imageSizeProp = imageSize !== 'normal' ? ` imageSize="${imageSize}"` : '';

        return `
<ContentBlock 
  layout="${b.layout}" 
  bgColor="${b.bgColor}" 
  textColor="${b.textColor}"
  ${ratioProp}${imageSizeProp}
  imgSrc="${b.hideImage ? '' : b.imgSrc}"
>
<div>
  ${!b.hideTitle ? `<${b.titleTag} className="${b.titleColor}">${b.title}</${b.titleTag}>` : ''}
  ${!b.hideText ? `<${b.textTag} className="${b.textColor}">${b.text}</${b.textTag}>` : ''}
</div>
</ContentBlock>`;
      })
      .join('\n\n');
  }, [blocks]);

  return (
    <div className="border-b p-4">
      <div className="mb-3 flex justify-end">
        <ShowCode title="ContentBlock Builder • snippet" code={snippet} />
      </div>

      <Button onClick={addBlock} variant="indigo" className="mb-6">
        + Add Block
      </Button>

      <div className="flex flex-col gap-12">
        {blocks.map((b, idx) => {
          return (
            <div
              key={b.id}
              className="rounded-xl border border-gray-200 bg-white/70 p-5 shadow-sm backdrop-blur-sm"
            >
              {/* HEADER */}
              <div className="mb-3 flex items-center justify-between">
                <h3 className="font-semibold text-gray-700">Block {idx + 1}</h3>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeBlock(b.id)}
                  disabled={blocks.length === 1}
                >
                  Remove
                </Button>
              </div>

              {/* IMAGE PICKER */}
              <div className="mb-4 flex flex-wrap items-end gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-muted-foreground text-sm font-medium">Choose Image</label>
                  <Select value={b.imgSrc} onValueChange={(v) => updateBlock(b.id, 'imgSrc', v)}>
                    <SelectTrigger className="w-[280px] truncate">
                      <SelectValue placeholder="Select image" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[260px] w-[280px] overflow-y-auto">
                      <SelectItem value={PLACEHOLDER}>{PLACEHOLDER}</SelectItem>
                      <div className="my-1 border-t opacity-40" />
                      {imageOptions
                        .filter((img) => img !== PLACEHOLDER)
                        .map((img) => (
                          <SelectItem
                            key={img}
                            value={img}
                            className="max-w-[260px] truncate"
                            title={img}
                          >
                            {img}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-muted-foreground text-sm font-medium">
                    Or paste image URL
                  </label>
                  <Input
                    value={b.imgSrc}
                    onChange={(e) => updateBlock(b.id, 'imgSrc', e.target.value)}
                    placeholder="https://example.com/image.webp"
                    className="w-[300px]"
                  />
                </div>
              </div>

              {/* LAYOUT */}
              <div className="mb-4 flex gap-2">
                {(['imageLeft', 'imageRight'] as LayoutMode[]).map((l) => (
                  <Button
                    key={l}
                    variant={b.layout === l ? 'indigo' : 'outline'}
                    size="sm"
                    onClick={() => updateBlock(b.id, 'layout', l)}
                  >
                    {l}
                  </Button>
                ))}
              </div>

              {/* TOGGLES */}
              <div className="mb-4 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateBlock(b.id, 'hideTitle', !b.hideTitle)}
                >
                  {b.hideTitle ? 'Show Title' : 'Hide Title'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateBlock(b.id, 'hideText', !b.hideText)}
                >
                  {b.hideText ? 'Show Text' : 'Hide Text'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateBlock(b.id, 'hideImage', !b.hideImage)}
                >
                  {b.hideImage ? 'Show Image' : 'Hide Image'}
                </Button>
              </div>

              {/* COLORS + RATIO */}
              <div className="mb-4 flex flex-wrap gap-6">
                {/* BG */}
                <div className="flex flex-col gap-1">
                  <label className="text-muted-foreground text-sm font-medium">Background</label>
                  <Select value={b.bgColor} onValueChange={(v) => updateBlock(b.id, 'bgColor', v)}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Select background" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((c) => (
                        <SelectItem key={`bg-${c.value}`} value={c.value}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* TITLE COLOR */}
                <div className="flex flex-col gap-1">
                  <label className="text-muted-foreground text-sm font-medium">Title Color</label>
                  <Select
                    value={b.titleColor}
                    onValueChange={(v) => updateBlock(b.id, 'titleColor', v)}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Select title color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((c) => (
                        <SelectItem
                          key={`title-${c.value}`}
                          value={c.value.replace('bg-', 'text-')}
                        >
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* TEXT COLOR */}
                <div className="flex flex-col gap-1">
                  <label className="text-muted-foreground text-sm font-medium">Text Color</label>
                  <Select
                    value={b.textColor}
                    onValueChange={(v) => updateBlock(b.id, 'textColor', v)}
                  >
                    <SelectTrigger className="w-[160px]">
                      <SelectValue placeholder="Select text color" />
                    </SelectTrigger>
                    <SelectContent>
                      {colorOptions.map((c) => (
                        <SelectItem key={`text-${c.value}`} value={c.value.replace('bg-', 'text-')}>
                          {c.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* RATIO */}
                <div className="flex flex-col gap-1">
                  <label className="text-muted-foreground text-sm font-medium">
                    Image : Text Ratio
                  </label>
                  <Select
                    value={b.ratio}
                    onValueChange={(v) => updateBlock(b.id, 'ratio', v as RatioMode)}
                  >
                    <SelectTrigger className="w-[130px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1:1">1:1</SelectItem>
                      <SelectItem value="1:2">1:2</SelectItem>
                      <SelectItem value="2:1">2:1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* PREVIEW */}
              <div className="mt-6">
                <ContentBlock
                  layout={b.layout}
                  bgColor={b.bgColor}
                  textColor={b.textColor}
                  ratio={b.ratio}
                  imageSize={getAutoImageSize(b.ratio)}
                  imgSrc={b.hideImage ? undefined : b.imgSrc}
                >
                  <div>
                    {!b.hideTitle && (
                      <b.titleTag
                        contentEditable
                        suppressContentEditableWarning
                        spellCheck={false}
                        onBlur={(e) =>
                          updateBlock(b.id, 'title', e.currentTarget.textContent || '')
                        }
                        onKeyDown={handleCommitOnEnter(true)}
                        className={`${b.titleColor} cursor-text ${
                          b.titleWeight === 'bold' ? 'font-bold' : 'font-normal'
                        }`}
                      >
                        {b.title}
                      </b.titleTag>
                    )}

                    {!b.hideText && (
                      <b.textTag
                        contentEditable
                        suppressContentEditableWarning
                        spellCheck={false}
                        onBlur={(e) => updateBlock(b.id, 'text', e.currentTarget.textContent || '')}
                        onKeyDown={handleCommitOnEnter(false)}
                        className={`${b.textColor} cursor-text ${
                          b.textWeight === 'bold' ? 'font-semibold' : 'font-normal'
                        }`}
                      >
                        {b.text}
                      </b.textTag>
                    )}
                  </div>
                </ContentBlock>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
