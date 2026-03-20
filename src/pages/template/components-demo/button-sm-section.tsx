import ShowCode from '@/components/show-code';
import { Button } from '@/components/ui/button';

const BUTTON_SM_SNIPPET = `
<div className="flex flex-wrap gap-4">
  <div className="flex flex-col items-center gap-2">
    <span className="text-sm text-gray-600">indigo</span>
    <Button variant="indigo">Concluir</Button>
  </div>
  <div className="flex flex-col items-center gap-2">
    <span className="text-sm text-gray-600">gray</span>
    <Button variant="gray">Concluir</Button>
  </div>
  <div className="flex flex-col items-center gap-2">
    <span className="text-sm text-gray-600">lime</span>
    <Button variant="lime">Concluir</Button>
  </div>
  <div className="flex flex-col items-center gap-2">
    <span className="text-sm text-gray-600">coral</span>
    <Button variant="red">Concluir</Button>
  </div>
  <div className="flex flex-col items-center gap-2">
    <span className="text-sm text-gray-600">Outline</span>
    <Button variant="outline">Concluir</Button>
  </div>
  <div className="flex flex-col items-center gap-2">
    <span className="text-sm text-gray-600">Emoji</span>
    <Button variant="indigo">👀 Concluir</Button>
  </div>
</div>
`.trim();

export default function ButtonSmSection() {
  return (
    <div className="min-h-500 border-b p-4">
      {/* ShowCode button (top-right) */}
      <div className="mb-2 flex justify-end">
        <ShowCode title="Button (SM) • snippet" code={BUTTON_SM_SNIPPET} />
      </div>

      {/* Preview container with fixed height */}
      <div className="flex min-h-[14rem] items-center justify-center">
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600">indigo</span>
            <Button variant="indigo">Concluir</Button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600">gray</span>
            <Button variant="gray">Concluir</Button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600">lime</span>
            <Button variant="lime">Concluir</Button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600">coral</span>
            <Button variant="red">Concluir</Button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600">Outline</span>
            <Button variant="outline">Concluir</Button>
          </div>
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600">Emoji</span>
            <Button variant="indigo">👀 Concluir</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
