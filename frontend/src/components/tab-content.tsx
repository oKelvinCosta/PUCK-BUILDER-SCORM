import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';
import { Fragment, isValidElement, useState } from 'react';

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
  defaultIndex?: number;
  className?: string;
  contentClassName?: string;
}

export default function Tabs({ tabs, defaultIndex = 0, className, contentClassName }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);
  const content = tabs[activeIndex]?.content;

  const isMultipleChildren =
    Array.isArray(content) || (isValidElement(content) && content.type === Fragment);

  return (
    <div className={cn('w-full', className)}>
      {/* Botões de Abas com Scroll Horizontal */}
      <div className="scrollbar-thin scrollbar-thumb-gray-300 overflow-x-auto border-b border-gray-200">
        <div className="flex shrink-0 whitespace-nowrap">
          {tabs.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                'px-4 py-2 font-medium transition-colors',
                activeIndex === idx
                  ? 'border-b-2 border-indigo-500 text-indigo-600'
                  : 'text-gray-500 hover:text-indigo-500'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Conteúdo Ativo */}
      <section
        role="tabpanel"
        className={cn('mt-4 overflow-y-auto p-4', contentClassName || 'h-64')}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {isMultipleChildren ? content : <div className="col-span-12">{content}</div>}
        </div>
      </section>
    </div>
  );
}
