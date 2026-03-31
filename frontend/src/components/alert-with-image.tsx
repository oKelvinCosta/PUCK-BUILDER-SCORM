import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const alertWithImageVariants = cva(
  'relative flex w-full max-w-3xl mx-auto flex-col overflow-hidden rounded-2xl text-left sm:flex-row transition-all duration-300',
  {
    variants: {
      variant: {
        indigo: 'bg-indigo-600 text-white border-none',
        coral: 'bg-red-400 text-white border-none',
        outline: 'border border-gray-200 bg-white text-gray-800',
      },
      size: {
        lg: 'text-base leading-[23px]',
        sm: 'text-base leading-6',
      },
      weight: {
        normal: 'font-normal',
        bold: 'font-semibold',
      },
      imagePosition: {
        left: 'sm:flex-row',
        right: 'sm:flex-row-reverse',
      },
    },
    defaultVariants: {
      variant: 'indigo',
      size: 'lg',
      weight: 'normal',
      imagePosition: 'left',
    },
  }
);

interface AlertWithImageProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertWithImageVariants> {
  imageSrc: string;
  imageAlt?: string;
  imagePosition?: 'left' | 'right';
}

const AlertWithImage = React.forwardRef<HTMLDivElement, AlertWithImageProps>(
  (
    {
      imageSrc,
      imageAlt = 'Imagem',
      variant,
      size,
      weight,
      imagePosition = 'left',
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertWithImageVariants({ variant, size, weight, imagePosition }), className)}
        {...props}
      >
        {/* === IMAGE === */}
        <div className="relative w-[376px] shrink-0 rounded-bl-2xl rounded-tl-2xl">
          <img
            src={imageSrc}
            alt={imageAlt}
            className="pointer-events-none absolute inset-0 size-full max-w-none rounded-bl-2xl rounded-tl-2xl object-cover"
          />
        </div>

        {/* === CONTENT === */}
        <div className="relative flex min-h-[180px] min-w-px flex-[1_0_0] flex-col items-start justify-center gap-2 self-stretch rounded-br-2xl rounded-tr-2xl bg-indigo-600 p-10">
          <div className="relative flex w-full shrink-0 flex-col justify-center text-base leading-none text-white">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

AlertWithImage.displayName = 'AlertWithImage';
export default AlertWithImage;
