import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

type DividerProps = {
  type: string;
  className: string;
};

interface SectionProps extends HTMLAttributes<HTMLElement> {
  backgroundSrc?: string;
  dividerTop?: DividerProps;
  dividerBottom?: DividerProps;
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, backgroundSrc, dividerTop, dividerBottom, children, ...props }, ref) => {
    // You can add divider components here if needed
    // For now, we'll just pass the divider props through data attributes
    // You can implement the actual divider rendering logic later
    
    return (
      <section 
        ref={ref}
        className={cn(className, backgroundSrc && 'bg-cover bg-center')}
        style={backgroundSrc ? { backgroundImage: `url(${backgroundSrc})` } : undefined}
        data-divider-top={dividerTop?.type}
        data-divider-bottom={dividerBottom?.type}
        {...props}
      >
        {children}
      </section>
    );
  }
);

Section.displayName = 'Section';

export { Section };
