import ShowCode from '@/components/template/show-code';

const TYPOGRAPHY_SNIPPET = `
<div className="gap-4 border-b p-4">
  <h1>h1 Title</h1>
  <h2>h2 Title</h2>
  <h3>h3 Title</h3>
  <h4>h4 Title</h4>
  <h5>h5 Title</h5>
  <h6>h6 Title</h6>
  <p>Paragraph</p>
  <small>Small</small>
</div>
`.trim();

export default function TypographySection() {
  return (
    <div className="border-b p-4">
      {/* ShowCode button (top-right) */}
      <div className="mb-2 flex justify-end">
        <ShowCode title="Typography • snippet" code={TYPOGRAPHY_SNIPPET} />
      </div>

      {/* Original content */}
      <div className="gap-4">
        <h1>h1 Title - 60px</h1>
        <h2>h2 Title - 48px</h2>
        <h3>h3 Title - 36px</h3>
        <h4>h4 Title - 24px</h4>
        <h5>h5 Title - 20px</h5>
        <h6>h6 Title - 18px</h6>
        <p>Paragraph - 18px</p>
        <small>Small - 14px</small>
      </div>
    </div>
  );
}
