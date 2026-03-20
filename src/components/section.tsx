import Divider, { type DividerProps } from './divider';

interface SectionProps {
  dividerTop?: DividerProps;
  dividerBottom?: DividerProps;
  contentClassName?: string;
  backgroundSrc?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({
  dividerTop,
  dividerBottom,
  contentClassName = '',
  backgroundSrc,
  children,
  ...props
}: SectionProps) {
  const contentPadding = 'py-[80px]';

  return (
    <section
      className={`w-full bg-cover bg-center bg-no-repeat`}
      {...props}
      style={backgroundSrc ? { backgroundImage: `url(${backgroundSrc})` } : undefined}
    >
      {/* Divider Top */}
      {dividerTop && (
        <Divider
          type={dividerTop.type}
          flipY={dividerTop.flipY ?? true}
          fitTo="top"
          className={`mt-[-2px] ${dividerTop.className}`}
        />
      )}

      {/* -------------------------  
          CENTERED CONTENT WRAPPER  
         ------------------------- */}

      <div
        className={`${contentPadding} mx-auto flex w-full flex-col items-center px-4 ${contentClassName}`}
      >
        {children}
      </div>

      {/* Divider Bottom */}
      {dividerBottom && (
        <Divider
          type={dividerBottom.type}
          flipY={dividerBottom.flipY}
          fitTo="bottom"
          className={`${dividerBottom.className}`}
        />
      )}
    </section>
  );
}
