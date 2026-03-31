import { cn } from '@/lib/utils';
import * as React from 'react';

type TextSize = 16 | 18 | 24;

/* Explicit text sizing for container + paragraphs */
const sizeToClasses: Record<TextSize, string> = {
  16: 'text-base leading-6 [&_p]:m-0 [&_p]:text-base',
  18: 'text-lg leading-7   [&_p]:m-0 [&_p]:text-lg',
  24: 'text-2xl leading-8  [&_p]:m-0 [&_p]:text-2xl',
};

export const CardInfo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    title: string;
    variant?: 'white' | 'gray';
    size?: TextSize;
    centered?: boolean; // ✅ NEW: centers text + content
  }
>(
  (
    { title, children, className, variant = 'white', size = 16, centered = false, ...props },
    ref
  ) => {
    const bgClass = variant === 'gray' ? 'bg-gray-200' : 'bg-white';

    return (
      <div
        ref={ref}
        className={cn(
          'flex min-h-[140px] w-full gap-4 rounded-xl border border-gray-200 p-6 transition-all duration-300',
          sizeToClasses[size],
          bgClass,
          centered
            ? 'flex-col items-center justify-center text-center'
            : 'flex-col items-start md:flex-row md:items-center',
          className
        )}
        {...props}
      >
        {/* === TITLE === */}
        {title && (
          <div
            className={cn(
              'text-primary w-full font-semibold',
              centered ? 'text-center' : 'md:w-1/3 md:text-left'
            )}
          >
            {title}
          </div>
        )}

        {/* === CONTENT === */}
        <div
          className={cn(
            '!font-gamay-editorial w-full text-gray-700 [&_p]:m-0',
            centered ? 'max-w-prose text-center' : 'md:w-2/3'
          )}
        >
          {children}
        </div>
      </div>
    );
  }
);

CardInfo.displayName = 'CardInfo';
