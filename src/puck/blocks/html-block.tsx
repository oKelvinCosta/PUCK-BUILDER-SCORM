// @/components/puck/ImgBlock.tsx
import type { ComponentConfig } from '@puckeditor/core';

export type HtmlBlockProps = {
  content: string;
};

export const HtmlBlock: ComponentConfig<HtmlBlockProps> = {
  fields: {
    content: { type: 'textarea' },
  },
  defaultProps: {
    content: '<p>HTML Block</p>',
  },
  render: ({ content }) => {
    // Validação básica de segurança para HTML
    const sanitizedcontent = content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/javascript:/gi, '');

    return (
      <div
        dangerouslySetInnerHTML={{ __html: sanitizedcontent }}
        style={{
          border: '1px solid #e2e8f0',
          padding: '16px',
          borderRadius: '8px',
          backgroundColor: '#f8fafc',
        }}
      />
    );
  },
};
