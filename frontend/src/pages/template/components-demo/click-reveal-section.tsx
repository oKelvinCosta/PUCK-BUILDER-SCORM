import {
  ClickReveal,
  ClickRevealContent,
  ClickRevealHidden,
  ClickRevealTrigger,
} from '@/components/click-reveal';
import Img from '@/components/img';
import ShowCode from '@/components/template/show-code';

const CLICK_REVEAL_SNIPPET = `
import {
  ClickReveal,
  ClickRevealContent,
  ClickRevealHidden,
  ClickRevealTrigger,
} from '@/components/click-reveal';

<ClickReveal>
  <ClickRevealContent>
    <h4>Click Reveal</h4>
    <p>Este é meu conteúdo de teste para te provar...</p>
    <Img src={'./imgs/core/placeholder.webp'} className="h-[80px] w-[80px]" isCircle />
  </ClickRevealContent>
  <ClickRevealTrigger />
  <p>Este é meu conteúdo de teste para te provar...</p>
  <ClickRevealHidden>
    </ClickReveal>
</ClickRevealHidden>
`.trim();

export default function ClickRevealSection() {
  return (
    <div className="border-b p-4">
      {/* ShowCode button (top-right) */}
      <div className="mb-2 flex justify-end">
        <ShowCode title="Click Reveal • snippet" code={CLICK_REVEAL_SNIPPET} />
      </div>

      {/* Original content */}
      <div className="flex gap-4">
        <ClickReveal>
          <ClickRevealContent>
            <h4>Click Reveal</h4>
            <p>Este é meu conteúdo de teste para te provar...</p>
            <Img src={'./imgs/core/placeholder.webp'} className="h-[80px] w-[80px]" isCircle />
          </ClickRevealContent>
          <ClickRevealTrigger />
          <ClickRevealHidden>
            <p>Este é meu conteúdo de teste para te provar...</p>
          </ClickRevealHidden>
        </ClickReveal>
      </div>
    </div>
  );
}
