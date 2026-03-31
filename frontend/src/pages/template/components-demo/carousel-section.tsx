// FILE: src/components/CarouselSection.tsx
// Replace your entire CarouselSection file with this one.

import CarouselCard from '@/components/carousel-card';
import ShowCode from '@/components/template/show-code';
import { Textarea } from '@/components/textarea';
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

type LayoutType = '1:1' | '1:2' | '2:1';

// === IMAGE GLOB (same as BlockContent) ===
const imageModules = import.meta.glob('/imgs/**/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const imageOptions = Object.values(imageModules)
  .map((url) => url as string)
  .sort((a, b) => a.localeCompare(b));

const PLACEHOLDER = './imgs/core/placeholder.webp';

interface CarouselItem {
  id: number;
  imgSrc: string;
  title: string;
  content: string | React.ReactNode;
}

export default function CarouselSection() {
  const [layout, setLayout] = useState<LayoutType>('1:2');

  const [slides, setSlides] = useState<CarouselItem[]>([
    {
      id: 1,
      imgSrc: PLACEHOLDER,
      title: 'Lorem ipsum dolore amet sis dolore sis gourmet',
      content: 'Slide 1 - Mussum Ipsum, texto normal.',
    },
    {
      id: 2,
      imgSrc: PLACEHOLDER,
      title: 'Lorem ipsum',
      content: 'Slide 2 - Mussum Ipsum, texto normal.',
    },
    {
      id: 3,
      imgSrc: PLACEHOLDER,
      title: 'Lorem ipsum dolore',
      content: 'Slide 3 - Mussum Ipsum.',
    },
  ]);

  // ➕ Add new slide
  const addSlide = () => {
    const newId = Date.now();
    setSlides((prev) => [
      ...prev,
      {
        id: newId,
        imgSrc: PLACEHOLDER,
        title: `New Slide ${prev.length + 1}`,
        content: 'Digite seu texto…',
      },
    ]);
  };

  // 🗑️ Remove slide
  const removeSlide = (id: number) => {
    setSlides((prev) => prev.filter((s) => s.id !== id));
  };

  const updateSlide = <K extends keyof CarouselItem>(
    id: number,
    key: K,
    value: CarouselItem[K]
  ) => {
    setSlides((prev) => prev.map((s) => (s.id === id ? { ...s, [key]: value } : s)));
  };

  // === SNIPPET BUILDER ===
  const snippet = useMemo(() => {
    const items = slides
      .map((s) => {
        return `{
  imgSrc: '${s.imgSrc}',
  title: '${s.title}',
  content: ${typeof s.content === 'string' ? `'${s.content}'` : '<ReactNode>'},
},`;
      })
      .join('\n');

    return `
const itemsCarouselCard = [
${items}
];

<CarouselCard items={itemsCarouselCard} layout="${layout}" />
    `.trim();
  }, [slides, layout]);

  // PREVIEW ITEMS
  const itemsCarouselCard = slides.map((s) => {
    return {
      imgSrc: s.imgSrc,
      title: s.title,
      content: s.content,
    };
  });

  return (
    <div className="border-b p-4">
      {/* LAYOUT BUTTONS */}
      <div className="mb-6 flex flex-wrap justify-center gap-3">
        {(['1:1', '1:2', '2:1'] as LayoutType[]).map((l) => (
          <Button
            key={l}
            variant="indigo"
            onClick={() => setLayout(l)}
            className={layout === l ? 'ring-2 ring-blue-500 ring-offset-2' : ''}
          >
            {l}
          </Button>
        ))}
      </div>

      {/* SLIDE EDITORS */}
      <div className="flex flex-col gap-6">
        {slides.map((s, index) => (
          <div key={s.id} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            {/* HEADER */}
            <div className="mb-2 flex items-center justify-between">
              <h3 className="font-semibold text-gray-700">Slide {index + 1}</h3>
              <Button
                size="sm"
                variant="outline"
                onClick={() => removeSlide(s.id)}
                disabled={slides.length === 1}
              >
                Remove
              </Button>
            </div>

            {/* TITLE */}
            <input
              type="text"
              value={s.title}
              onChange={(e) => updateSlide(s.id, 'title', e.target.value)}
              className="mb-3 w-full rounded border border-gray-300 p-2 text-lg font-bold"
            />

            {/* IMAGE SELECTOR */}
            <div className="mb-4 flex flex-wrap items-end gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-muted-foreground text-sm font-medium">Choose Image</label>
                <Select value={s.imgSrc} onValueChange={(v) => updateSlide(s.id, 'imgSrc', v)}>
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
                  value={s.imgSrc}
                  onChange={(e) => updateSlide(s.id, 'imgSrc', e.target.value)}
                  placeholder="https://example.com/image.webp"
                  className="w-[300px]"
                />
              </div>
            </div>

            {/* CONTENT EDITOR */}
            <div className="mb-3">
              <label className="text-muted-foreground mb-1 block text-sm font-medium">
                Content (string or JSX)
              </label>
              <Textarea
                value={typeof s.content === 'string' ? s.content : ''}
                onChange={(e) => updateSlide(s.id, 'content', e.target.value)}
                className="w-full font-mono text-xs"
                rows={6}
                placeholder="Digite seu texto ou JSX..."
              />
            </div>
          </div>
        ))}
      </div>

      {/* PREVIEW */}
      <div className="mt-10 flex flex-col gap-4">
        <CarouselCard items={itemsCarouselCard} layout={layout} />
      </div>

      {/* SNIPPET */}
      <div className="mt-12 flex justify-end gap-6">
        <Button variant="outline" onClick={addSlide}>
          + Add Slide
        </Button>
        <ShowCode title="Carousel • snippet" code={snippet} />
      </div>
    </div>
  );
}
