// @/components/puck/ImgBlock.tsx
import { Button } from '@/components/ui/button';
import { AlignmentXField } from '@/editor/fields';
import { cn } from '@/lib/utils';
import type { ComponentConfig } from '@puckeditor/core';
import { RichTextMenu } from '@puckeditor/core';

export type ButtonBlockProps = {
  content: string;
  link: string;
  alignment: 'left' | 'center' | 'right';
  variant: 'link' | 'canvas-primary' | 'canvas-outline' | 'success' | 'destructive';
  size: 'canvas-default' | 'canvas-lg' | 'canvas-sm';
  customBg?: string;
  customText?: string;
};

export const ButtonBlock: ComponentConfig<ButtonBlockProps> = {
  fields: {
    content: {
      type: 'richtext',
      renderMenu: () => (
        <RichTextMenu>
          <RichTextMenu.Group>
            <RichTextMenu.Italic />
          </RichTextMenu.Group>
        </RichTextMenu>
      ),
    },
    link: {
      type: 'text',
      label: 'Link URL',
    },
    alignment: AlignmentXField(),
    variant: {
      type: 'radio',
      options: [
        { label: 'Link', value: 'link' },
        { label: 'Primary', value: 'canvas-primary' },
        { label: 'Outline', value: 'canvas-outline' },
        { label: 'Success', value: 'success' },
        { label: 'Destructive', value: 'destructive' },
      ],
    },
    size: {
      type: 'radio',
      options: [
        { label: 'Default', value: 'canvas-default' },
        { label: 'Large', value: 'canvas-lg' },
        { label: 'Small', value: 'canvas-sm' },
      ],
    },
    customBg: {
      type: 'text',
      label: 'Cor de Fundo (Hex/HSL)',
    },
    customText: {
      type: 'text',
      label: 'Cor do Texto (Hex/HSL)',
    },
  },
  defaultProps: {
    content: 'Botão',
    link: '',
    alignment: 'left',
    variant: 'canvas-primary',
    size: 'canvas-default',
  },
  render: ({ content, link, alignment, variant, size, customBg, customText }) => {
    const alignmentClasses = {
      left: 'mr-auto',
      center: 'mx-auto',
      right: 'ml-auto',
    };

    const style = {
      backgroundColor: customBg || undefined,
      color: customText || undefined,
      borderColor: variant === 'canvas-outline' && customBg ? customBg : undefined,
    };

    const buttonElement = (
      <Button
        variant={variant}
        size={size}
        className={cn(alignmentClasses[alignment], 'transition-opacity hover:opacity-80')}
        style={style}
      >
        {content}
      </Button>
    );

    if (link) {
      return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="inline-block">
          {buttonElement}
        </a>
      );
    }

    return buttonElement;
  },
};
