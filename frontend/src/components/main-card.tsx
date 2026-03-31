import { Card, CardContent, CardHeader, CardTitle, HorizontalCard } from '@/components/ui/card';
import * as React from 'react';

interface MainCardProps {
  imgSrc?: string;
  title?: string | React.ReactNode;
  horizontal?: boolean;
  side?: 'left' | 'right'; // NEW
  children?: React.ReactNode;
  className?: string;
  textSize?: 16 | 18 | 24;
  variant?: 'default' | 'gray';
  imgClassName?: string;
}

export default function MainCard({
  imgSrc,
  title,
  horizontal = false,
  side = 'left', // NEW DEFAULT
  children,
  className,
  textSize = 16,
  variant = 'default',
  imgClassName,
}: MainCardProps) {
  // ===========================
  // 🔥 HORIZONTAL MODE
  // ===========================
  if (horizontal) {
    return (
      <HorizontalCard
        size={textSize}
        variant={variant}
        side={side} // NEW
        className={className}
      >
        {/* IMAGE */}
        {imgSrc && (
          <img
            src={imgSrc}
            alt={typeof title === 'string' ? title : 'Card image'}
            className={`w-40 shrink-0 rounded-lg ${imgClassName || ''}`}
          />
        )}

        {/* CONTENT */}
        <div className="flex flex-1 flex-col">
          {title && <CardTitle>{title}</CardTitle>}
          <CardContent>{children}</CardContent>
        </div>
      </HorizontalCard>
    );
  }

  // ===========================
  // 🔥 VERTICAL MODE
  // ===========================
  return (
    <Card size={textSize} variant={variant} className={className}>
      {imgSrc && (
        <div className="mb-4">
          <img
            src={imgSrc}
            alt={typeof title === 'string' ? title : 'Card image'}
            className={`w-full rounded-lg ${imgClassName || ''}`}
          />
        </div>
      )}

      {title && (
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}

      <CardContent>{children}</CardContent>
    </Card>
  );
}
