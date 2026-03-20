// src/pages/template/example-components.tsx
import { useEffect, useState } from 'react';
import { componentSections } from './components-demo/component-sections';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

export default function ExampleComponents() {
  const [openSections, setOpenSections] = useState<string[]>([]);

  // ⭐ Listen for sidebar event
  useEffect(() => {
    const onOpen = (e: CustomEvent<string>) => {
      const id = e.detail;
      if (!id) return;

      setOpenSections((prev) => (prev.includes(id) ? prev : [...prev, id]));

      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    };

    window.addEventListener('open-section-from-sidebar', onOpen as EventListener);
    return () => window.removeEventListener('open-section-from-sidebar', onOpen as EventListener);
  }, []);

  // ⭐ Handle browser hash change
  useEffect(() => {
    const checkHash = () => {
      const id = window.location.hash.replace('#', '');
      if (!id) return;

      setOpenSections((prev) => (prev.includes(id) ? prev : [...prev, id]));

      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">Components</h1>

      <Accordion
        type="multiple"
        value={openSections}
        onValueChange={(v) => setOpenSections(v)}
        className="w-full space-y-12"
      >
        {componentSections.map(({ id, title, content: Content }, index) => (
          <div key={id}>
            <AccordionItem value={id} id={id} className="w-full scroll-mt-24">
              <AccordionTrigger className="mb-4 w-full text-left text-2xl font-semibold hover:no-underline">
                {title}
              </AccordionTrigger>

              <AccordionContent className="w-full data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
                <Content />
              </AccordionContent>
            </AccordionItem>

            {/* ⭐ Divider between sections */}
            {index < componentSections.length - 1 && <Separator className="my-8" />}
          </div>
        ))}
      </Accordion>
    </div>
  );
}
