interface ContainerProps {
  maxWidth?: 580 | 780 | 980 | 1280;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Container({ maxWidth = 1280, className, children, style }: ContainerProps) {
  return (
    <div
      style={{
        maxWidth: `${maxWidth}px`,
        ...style,
      }}
      className={`mx-auto flex w-full px-4 ${className}`}
    >
      {children}
    </div>
  );
}
