// @/components/puck/ImgBlock.tsx
import Container from '@/components/layout/container';
import { CONTAINER_MAP, ContainerField, type ContainerVariant } from '@/editor/fields/container-field';
import type { ComponentConfig } from '@puckeditor/core';

export type HtmlBlockProps = {
  content: string;
  container?: ContainerVariant;
};

export const HtmlBlock: ComponentConfig<HtmlBlockProps> = {
  fields: {
    content: { type: 'textarea' },
    container: ContainerField({ defaultValue: '980' }),
  },
  defaultProps: {
    content: '<p>HTML Block</p>',
    container: '980' as ContainerVariant,
  },
  render: ({ content, container }) => {
    // Validação básica de segurança para HTML
    const sanitizedcontent = content
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+="[^"]*"/gi, '')
      .replace(/javascript:/gi, '');

    return (
      <Container style={{ maxWidth: CONTAINER_MAP[container as ContainerVariant].maxWidth }}>
        <div dangerouslySetInnerHTML={{ __html: sanitizedcontent }} />
      </Container>
    );
  },
};
