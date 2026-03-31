// @/components/puck/ImgBlock.tsx
import { Button } from '@/components/ui/button';
import { AlignmentXField } from '@/editor/fields';
import type { ComponentConfig } from '@puckeditor/core';
import { RichTextMenu } from '@puckeditor/core';

export type ButtonBlockProps = {
  content: string;
  link: string;
  alignment: 'left' | 'center' | 'right';
  variant: 'indigo' | 'gray' | 'lime' | 'red' | 'outline' | 'link';
  size: 'default' | 'lg' | 'sm';
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
        { label: 'Indigo', value: 'indigo' },
        { label: 'Gray', value: 'gray' },
        { label: 'Lime', value: 'lime' },
        { label: 'Red', value: 'red' },
        { label: 'Outline', value: 'outline' },
        { label: 'Link', value: 'link' },
      ],
    },
    size: {
      type: 'radio',
      options: [
        { label: 'Default', value: 'default' },
        { label: 'Large', value: 'lg' },
        { label: 'Small', value: 'sm' },
      ],
    },
  },
  defaultProps: {
    content: 'Button',
    link: '',
    alignment: 'left',
    variant: 'indigo',
    size: 'default',
  },
  render: ({ content, link, alignment, variant, size }) => {
    const alignmentClasses = {
      left: 'mr-auto',
      center: 'mx-auto',
      right: 'ml-auto',
    };

    if (link) {
      return (
        <a href={link} target="_blank" rel="noopener noreferrer" className="inline-block">
          <Button variant={variant} size={size} className={alignmentClasses[alignment]}>
            {content}
          </Button>
        </a>
      );
    } else {
      return (
        <Button variant={variant} size={size} className={alignmentClasses[alignment]}>
          {content}
        </Button>
      );
    }
  },
};
