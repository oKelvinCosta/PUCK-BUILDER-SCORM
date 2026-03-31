import ShowCode from '@/components/template/show-code';

const COLORS_SNIPPET = `
<div className="flex flex-wrap gap-2">
  <div className="h-20 w-32 bg-gray-700 p-2 text-primary-foreground">
    <small>.bg-gray-700</small>
  </div>
  <div className="h-20 w-32 bg-gray-400 p-2">
    <small>.bg-gray-400</small>
  </div>
  <div className="h-20 w-32 bg-gray-200 p-2">
    <small>.bg-gray-200</small>
  </div>
  <div className="h-20 w-32 bg-gray-50 p-2">
    <small>.bg-gray-50</small>
  </div>
  <div className="h-20 w-32 bg-primary p-2 text-primary-foreground">
    <small>.bg-primary</small><br />
    <small>.bg-indigo-600</small>
  </div>
  <div className="h-20 w-32 bg-indigo-200 p-2">
    <small>.bg-indigo-200</small>
  </div>
  <div className="h-20 w-32 bg-secondary p-2">
    <small>.bg-secondary</small><br />
    <small>.bg-indigo-200</small>
  </div>
  <div className="h-20 w-32 bg-azure-200 p-2">
    <small>.bg-azure-200</small>
  </div>
  <div className="h-20 w-32 bg-coral-400 p-2 text-primary-foreground">
    <small>.bg-coral-400</small>
  </div>
  <div className="h-20 w-32 bg-coral-200 p-2">
    <small>.bg-coral-200</small>
  </div>
  <div className="h-20 w-32 bg-lime-400 p-2">
    <small>.bg-lime-400</small>
  </div>
  <div className="h-20 w-32 bg-lime-200 p-2">
    <small>.bg-lime-200</small>
  </div>
  <div className="h-20 w-32 bg-accent p-2">
    <small>.bg-accent</small>
  </div>
  <div className="h-20 w-32 bg-muted p-2">
    <small>.bg-muted</small>
  </div>
  <div className="h-20 w-32 bg-success p-2 text-success-foreground">
    <small>.bg-success</small>
  </div>
  <div className="h-20 w-32 bg-destructive p-2 text-destructive-foreground">
    <small>.bg-destructive</small>
  </div>
</div>
`.trim();

export default function ColorsSection() {
  return (
    <div className="border-b p-4">
      {/* ShowCode button (top-right) */}
      <div className="mb-2 flex justify-end">
        <ShowCode title="Colors • snippet" code={COLORS_SNIPPET} />
      </div>

      {/* Original content */}
      <div className="flex gap-4">
        <div className="flex flex-wrap gap-2">
          <div className="text-primary-foreground h-20 w-32 bg-gray-700 p-2">
            <small>.bg-gray-700</small>
          </div>
          <div className="h-20 w-32 bg-gray-400 p-2">
            <small>.bg-gray-400</small>
          </div>
          <div className="h-20 w-32 bg-gray-200 p-2">
            <small>.bg-gray-200</small>
          </div>
          <div className="h-20 w-32 bg-gray-50 p-2">
            <small>.bg-gray-50</small>
          </div>
          <div className="bg-primary text-primary-foreground h-20 w-32 p-2">
            <small>.bg-primary</small>
            <br />
            <small>.bg-indigo-600</small>
          </div>
          <div className="h-20 w-32 bg-indigo-200 p-2">
            <small>.bg-indigo-200</small>
          </div>
          <div className="bg-secondary h-20 w-32 p-2">
            <small>.bg-secondary</small>
            <br />
            <small>.bg-indigo-200</small>
          </div>
          <div className="bg-azure-200 h-20 w-32 p-2">
            <small>.bg-azure-200</small>
          </div>
          <div className="bg-coral-400 text-primary-foreground h-20 w-32 p-2">
            <small>.bg-coral-400</small>
          </div>
          <div className="bg-coral-200 h-20 w-32 p-2">
            <small>.bg-coral-200</small>
          </div>
          <div className="h-20 w-32 bg-lime-400 p-2">
            <small>.bg-lime-400</small>
          </div>
          <div className="h-20 w-32 bg-lime-200 p-2">
            <small>.bg-lime-200</small>
          </div>
          <div className="bg-accent h-20 w-32 p-2">
            <small>.bg-accent</small>
          </div>
          <div className="bg-muted h-20 w-32 p-2">
            <small>.bg-muted</small>
          </div>
          <div className="bg-success text-success-foreground h-20 w-32 p-2">
            <small>.bg-success</small>
          </div>
          <div className="bg-destructive text-destructive-foreground h-20 w-32 p-2">
            <small>.bg-destructive</small>
          </div>
        </div>
      </div>
    </div>
  );
}
