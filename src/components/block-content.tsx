import React from 'react';
import { cn } from '@/lib/utils';

export type ContentBlockProps = {
  layout?: 'imageLeft' | 'imageRight';
  imgSrc?: string;
  bgColor?: string;
  gradient?: string;
  textColor?: string;
  size?: 'small' | 'medium' | 'large';
  boxed?: false | 'text' | 'full';
  hideTitle?: boolean;
  hideText?: boolean;
  hideImage?: boolean;
  start?: 'left' | 'center' | 'right';
  titleWeight?: 'normal' | 'bold';
  textWeight?: 'normal' | 'bold';
  ratio?: '1:1' | '1:2' | '2:1';
  imageSize?: 'normal' | 'small' | 'large';
  children?: React.ReactNode;
};

export default function ContentBlock({
  layout = 'imageRight',
  imgSrc,
  bgColor = 'bg-gray-50',
  gradient,
  textColor = 'text-gray-900',
  size = 'medium',
  boxed = false,
  hideTitle = false,
  hideText = false,
  hideImage = false,
  start = 'center',
  titleWeight = 'bold',
  textWeight = 'normal',
  ratio = '1:1',
  imageSize = 'normal',
  children,
}: ContentBlockProps) {
  const showImage = imgSrc && !hideImage;

  const sizeStyles = {
    small: { text: 'text-sm md:text-base', gap: 'gap-4 md:gap-6', padding: 'py-6 md:py-8' },
    medium: { text: 'text-base md:text-lg', gap: 'gap-6 md:gap-8', padding: 'py-10 md:py-12' },
    large: { text: 'text-lg md:text-xl', gap: 'gap-8 md:gap-10', padding: 'py-14 md:py-16' },
  }[size];

  // ⭐ GAP logic (1:2 = close)
  const gap =
    ratio === '1:2' ? 'gap-1 md:gap-2' : imageSize === 'small' ? 'gap-2 md:gap-3' : sizeStyles.gap;

  const startClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  } as const;

  const boxedWrapper =
    boxed === false
      ? ''
      : boxed === 'full'
        ? 'rounded-2xl shadow-md p-8 bg-white/80 backdrop-blur'
        : 'rounded-xl shadow-sm p-6 bg-white/70 backdrop-blur-sm';

  // ⭐ FIX FOR SMALL IMAGES — layout dependent grid
  const getSmallGrid = () =>
    layout === 'imageLeft' ? 'md:grid-cols-[auto_1fr]' : 'md:grid-cols-[1fr_auto]'; // FIX: prevents image collapsing

  // ⭐ Regular grid for normal/large images
  const getNormalGrid = () =>
    ratio === '1:1'
      ? 'md:grid-cols-2'
      : ratio === '1:2'
        ? 'md:grid-cols-[1fr_2fr]'
        : 'md:grid-cols-[2fr_1fr]';

  const gridCols = imageSize === 'small' ? getSmallGrid() : getNormalGrid();

  const titleWeightClass = titleWeight === 'bold' ? 'font-bold' : 'font-normal';
  const textWeightClass = textWeight === 'bold' ? 'font-semibold' : 'font-normal';

  const isImageRight = layout === 'imageRight';
  const imageOrder = isImageRight ? 'md:order-2' : 'md:order-1';
  const textOrder = isImageRight ? 'md:order-1' : 'md:order-2';

  const imageSizeStyles = {
    normal: {
      wrapper: 'h-full w-full flex justify-center',
      img: 'h-full w-full rounded-xl object-cover object-center',
      style: { maxHeight: '480px', aspectRatio: '4/3' },
    },
    small: {
      wrapper: 'flex items-start justify-center',
      img: 'rounded-xl object-cover object-center',
      style: { width: '150px', height: 'auto', maxHeight: '200px' },
    },
    large: {
      wrapper: 'h-full w-full flex justify-center',
      img: 'h-full w-full rounded-xl object-cover object-center',
      style: { maxHeight: '620px', aspectRatio: '4/3' },
    },
  }[imageSize];

  return (
    <section className={cn('relative', sizeStyles.padding, gradient ?? bgColor, textColor)}>
      <div className="mx-auto max-w-6xl px-6 md:px-12">
        {showImage ? (
          <div className={cn('grid items-center', gap, gridCols)}>
            {/* IMAGE */}
            <div className={cn(imageSizeStyles.wrapper, imageOrder)}>
              <img
                src={imgSrc}
                alt="content"
                className={imageSizeStyles.img}
                style={imageSizeStyles.style}
              />
            </div>

            {/* TEXT */}
            <div
              className={cn(
                'flex flex-col space-y-4',
                sizeStyles.text,
                startClasses[start],
                textWeightClass,
                boxed === 'text' && boxedWrapper,
                textOrder
              )}
            >
              {React.Children.map(children, (child) => {
                if (!React.isValidElement(child)) return child;
                const tag = typeof child.type === 'string' ? child.type : '';
                const childElement = child as React.ReactElement<{ className?: string }>;

                if ((hideTitle && /^h[1-6]$/.test(tag)) || (hideText && tag === 'p')) return null;

                if (/^h[1-6]$/.test(tag)) {
                  return React.cloneElement(childElement, {
                    className: cn(childElement.props.className, titleWeightClass),
                  });
                }

                if (tag === 'p') {
                  return React.cloneElement(childElement, {
                    className: cn(childElement.props.className, textWeightClass),
                  });
                }

                return child;
              })}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'flex flex-col space-y-4',
                sizeStyles.text,
                startClasses[start],
                textWeightClass,
                boxedWrapper
              )}
            >
              {children}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
