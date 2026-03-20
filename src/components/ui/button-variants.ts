import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm leading-none font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        indigo: 'bg-indigo-600 text-white hover:bg-indigo-600/70',
        gray: 'bg-gray-700 text-white hover:bg-gray-400',
        lime: 'bg-lime-400 text-indigo-600 hover:bg-lime-200',
        red: 'bg-coral-400 text-white hover:bg-coral-200',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 pt-[10px] pb-[6px] px-4',
        lg: 'h-14 px-9 py-4 text-base',
        sm: 'h-9 rounded-md px-3',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'indigo',
      size: 'default',
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
