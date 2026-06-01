/**
 * "Size" dropdown: headings (H1–H6) and paragraph sizes (base / lg / sm).
 */
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TEXT_SIZES } from './constants';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TextSizeSelectProps = { editor: any };

export function TextSizeSelect({ editor }: TextSizeSelectProps) {
  return (
    <Select
      onValueChange={(value) => {
        const style = TEXT_SIZES.find((s) => s.value === value);

        if (value === 'p-base') {
          // Removes only the fontSize, preserves color and other attributes
          editor
            .chain()
            .focus()
            .setParagraph()
            .updateAttributes('textStyle', { fontSize: null })
            .run();
        } else if (style?.fontSize) {
          // Updates only the fontSize, without touching the color
          editor
            .chain()
            .focus()
            .setParagraph()
            .updateAttributes('textStyle', { fontSize: style.fontSize })
            .run();
        } else {
          const level = Number(value) as 1 | 2 | 3 | 4 | 5 | 6;
          if (!editor.isActive('heading', { level })) {
            editor
              .chain()
              .focus()
              .toggleHeading({ level })
              // Headings have their own size via CSS — resets the inline fontSize
              .updateAttributes('textStyle', { fontSize: null })
              .run();
          } else {
            editor.chain().focus().run();
          }
        }
      }}
    >
      <SelectTrigger className="h-7 w-[130px] text-xs">
        <SelectValue placeholder="Tamanho" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {TEXT_SIZES.map((style) => (
            <SelectItem key={style.value} value={style.value} className="text-xs">
              {style.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
