interface ContainerProps {
  maxWidth?: 580 | 780 | 980 | 1280;
  className?: string;
  children: React.ReactNode;
}

export default function Container({ maxWidth = 1280, className, children }: ContainerProps) {
  return (
    <div
      style={{
        maxWidth: `${maxWidth}px`,
      }}
      className={`mx-auto w-full px-4 ${className}`}
    >
      {children}
    </div>
  );
}
