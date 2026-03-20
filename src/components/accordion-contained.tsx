import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { RandomId } from '@/lib/random-id';
import { cn } from '@/lib/utils';
import React from 'react';

interface AccordionItemData {
  title: string | React.ReactNode;
  content?: string | React.ReactNode;
}

interface AccordionProps {
  items: AccordionItemData[];
  className?: string;
}

export default function AccordionContained({ items, className, ...props }: AccordionProps) {
  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-xl border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    >
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => {
          const id = `${RandomId('accordionItem')}${index}`;
          const value = `${RandomId('itemValue')}${index}`;

          return (
            <AccordionItem
              key={id}
              value={value}
              className={cn(index !== 0 && 'border-t', 'w-full [&_h3]:mb-0')}
            >
              <AccordionTrigger className="px-4 py-3 text-lg">{item.title}</AccordionTrigger>

              <AccordionContent className="px-4 pb-2 pt-0">
                {/* 1️⃣ string | React.ReactNode */}
                {item.content}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
