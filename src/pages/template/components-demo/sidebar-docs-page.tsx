// src/pages/components-demo/SidebarDocsPage.tsx
export default function SidebarDocsPage() {
  return (
    <div className="p-6">
      <h1 className="mb-4 text-base font-semibold leading-none tracking-tight">Documentation</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="h-40 rounded-xl bg-muted/40" />
        <div className="h-40 rounded-xl bg-muted/40" />
        <div className="h-40 rounded-xl bg-muted/40" />
      </div>
    </div>
  );
}
