// src/pages/ReadmePage.tsx

import { Separator } from '@/components/ui/separator';
import ReactMarkdown from 'react-markdown';
import readme from '../../../README.md?raw';

export default function ReadmePage() {
  return (
    <div className="mx-auto w-full">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">SCORM Course Template – README</h1>
      </div>

      <Separator className="my-4" />

      {/* Scrollable content area rendering README.md dynamically */}
      <div className="h-[calc(100vh-14rem)] overflow-y-auto scroll-smooth pr-4">
        <div className="mx-auto w-full max-w-4xl">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="mt-8 mb-4 text-3xl font-bold" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="mt-8 mb-3 text-2xl font-semibold" {...props} />
              ),
              h3: ({ node, ...props }) => (
                <h3 className="mt-6 mb-2 text-xl font-semibold" {...props} />
              ),
              h4: ({ node, ...props }) => (
                <h4 className="mt-5 mb-2 text-lg font-semibold" {...props} />
              ),
              p: ({ node, ...props }) => <p className="my-4" {...props} />,
              ul: ({ node, ...props }) => (
                <ul className="my-4 list-disc pl-6" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="my-4 list-decimal pl-6" {...props} />
              ),
              li: ({ node, ...props }) => <li className="my-1" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote
                  className="my-4 border-l-4 border-muted-foreground/30 pl-4 italic text-muted-foreground"
                  {...props}
                />
              ),
              code: ({ node, inline, className, children, ...props }: any) => {
                const isInline = inline ?? !className;
                return (
                  <code
                    className={`${isInline ? 'rounded bg-muted px-1.5 py-0.5' : ''} ${
                      className || ''
                    }`}
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
              pre: ({ node, ...props }) => (
                <pre className="my-4 overflow-x-auto rounded-md border bg-muted p-4" {...props} />
              ),
              hr: ({ node, ...props }) => <hr className="my-8" {...props} />,
              a: ({ node, ...props }) => (
                <a className="text-primary underline underline-offset-2" {...props} />
              ),
              table: ({ node, ...props }) => (
                <div className="my-4 overflow-x-auto">
                  <table className="min-w-full border-collapse" {...props} />
                </div>
              ),
              th: ({ node, ...props }) => (
                <th className="border px-3 py-2 text-left" {...props} />
              ),
              td: ({ node, ...props }) => <td className="border px-3 py-2" {...props} />,
            }}
          >
            {readme}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
