import React from 'react';
import { cn } from '@/lib/utils';

export type BoxContentProps = {
  layout?: 'imageLeft' | 'imageRight' | 'noImage';
  imgSrc?: string;
  imageCols?: number;
  textCols?: number;
  bgColor?: string;
  textColor?: string;
  boxBgColor?: string;
  imageSize?: string;
  textSize?: string;
  titleSize?: string;
  subtitleSize?: string;
  start?: 'left' | 'center' | 'right';

  /** Text elements */
  title?: string;
  subtitle?: string;

  /** Content */
  children?: React.ReactNode;
};

export default function BoxContent({
  layout = 'imageLeft',
  imgSrc,
  imageCols = 5,
  textCols = 7,
  bgColor = 'bg-transparent',
  textColor = 'text-gray-900',
  boxBgColor = 'bg-white',
  imageSize = 'max-w-md',
  textSize = 'text-base md:text-lg',
  titleSize = 'text-3xl font-bold',
  subtitleSize = 'text-xl font-semibold text-muted-foreground',
  start = 'center',
  title,
  subtitle,
  children,
}: BoxContentProps) {
  const colSpanClasses: Record<number, string> = {
    1: 'md:col-span-1',
    2: 'md:col-span-2',
    3: 'md:col-span-3',
    4: 'md:col-span-4',
    5: 'md:col-span-5',
    6: 'md:col-span-6',
    7: 'md:col-span-7',
    8: 'md:col-span-8',
    9: 'md:col-span-9',
    10: 'md:col-span-10',
    11: 'md:col-span-11',
    12: 'md:col-span-12',
  };

  const totalCols = imageCols + textCols;
  const shouldCenter = totalCols < 12;

  const startClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
  } as const;

  const hasImage = layout !== 'noImage' && imgSrc;

  return (
    <section className={cn('relative py-6 md:py-10', bgColor, textColor)}>
      <div className="mx-auto flex max-w-6xl px-4 md:px-0">
        <div
          className={cn(
            'w-full rounded-2xl border border-gray-200 p-6 shadow-sm md:p-8',
            boxBgColor
          )}
          style={{ backgroundColor: boxBgColor }}
        >
          <div className={cn('flex w-full', shouldCenter && startClasses[start])}>
            <div
              className={cn(
                'grid w-full grid-cols-12 items-center gap-8 md:gap-12',
                layout === 'imageLeft' ? 'md:grid-flow-col' : 'md:grid-flow-col-dense'
              )}
              style={{
                maxWidth: shouldCenter ? `${(totalCols / 12) * 100}%` : '100%',
                width: '100%',
                margin: shouldCenter ? '0 auto' : undefined,
              }}
            >
              {/* === IMAGE COLUMN === */}
              {hasImage && (
                <div
                  className={cn(
                    'col-span-12 flex justify-center',
                    layout === 'imageLeft'
                      ? cn(colSpanClasses[imageCols], 'order-1')
                      : cn(colSpanClasses[imageCols], 'order-2')
                  )}
                >
                  <div className={cn('overflow-hidden rounded-xl', imageSize)}>
                    <img
                      src={imgSrc}
                      alt={title || 'illustration'}
                      className="h-auto w-full object-contain md:object-cover"
                      style={{ aspectRatio: '4/3', maxHeight: '480px' }}
                    />
                  </div>
                </div>
              )}

              {/* === TEXT COLUMN === */}
              <div
                className={cn(
                  'col-span-12 flex flex-col justify-center',
                  hasImage &&
                    (layout === 'imageLeft'
                      ? cn(colSpanClasses[textCols], 'order-2')
                      : cn(colSpanClasses[textCols], 'order-1'))
                )}
              >
                <div className={cn('mx-auto w-full space-y-4 text-center md:text-left', textSize)}>
                  {title && <h2 className={cn(titleSize)}>{title}</h2>}
                  {subtitle && <h3 className={cn(subtitleSize)}>{subtitle}</h3>}
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
