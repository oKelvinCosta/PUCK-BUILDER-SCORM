import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

/* Added size + weight variants */
const alertVariants = cva('relative w-full rounded-lg', {
  variants: {
    variant: {
      outline: 'bg-white text-foreground border border-gray-200 p-6 text-center',
      coral: 'bg-coral-400 text-white border-none p-6 text-center',
      lime: 'bg-lime-400 text-indigo-600 border-none p-6 text-center px-[18px] py-[24px]',
      indigo: 'bg-indigo-600 text-white border-none p-6 text-center',
      success: 'bg-[#46D86F] text-white border-none p-6 text-center',
      destructive: 'bg-[#FF4A4A] text-white border-none p-6 text-center',
      withImage: 'flex overflow-hidden p-0 text-left bg-indigo-600 text-white',
    },
    size: {
      lg: 'text-2xl leading-8',
      sm: 'text-base leading-6',
    },
    weight: {
      normal: 'font-normal',
      bold: 'font-semibold',
    },
  },
  defaultVariants: {
    variant: 'indigo',
    size: 'lg',
    weight: 'bold',
  },
});

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, size, weight, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant, size, weight }), className)}
    {...props}
  />
));
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & { size?: 'lg' | 'sm'; weight?: 'normal' | 'bold' }
>(({ className, size = 'lg', weight = 'bold', ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      size === 'lg'
        ? weight === 'bold'
          ? 'mb-1 text-2xl font-semibold leading-8 tracking-tight'
          : 'mb-1 text-2xl font-normal leading-8 tracking-tight'
        : weight === 'bold'
          ? 'mb-1 text-base font-semibold leading-6 tracking-tight'
          : 'mb-1 text-base font-normal leading-6 tracking-tight',
      className
    )}
    {...props}
  />
));
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & { size?: 'lg' | 'sm'; weight?: 'normal' | 'bold' }
>(({ className, size = 'lg', weight = 'bold', ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      size === 'lg'
        ? weight === 'bold'
          ? 'text-2xl font-semibold leading-8 [&_p]:m-0 [&_p]:leading-8'
          : 'text-2xl font-normal leading-8 [&_p]:m-0 [&_p]:leading-8'
        : weight === 'bold'
          ? 'text-base font-semibold leading-6 [&_p]:m-0 [&_p]:leading-6'
          : 'text-base font-normal leading-6 [&_p]:m-0 [&_p]:leading-6',
      className
    )}
    {...props}
  />
));
AlertDescription.displayName = 'AlertDescription';

export { Alert, AlertDescription, AlertTitle };
