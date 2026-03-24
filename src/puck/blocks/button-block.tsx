// @/components/puck/ImgBlock.tsx
import { Button } from '@/components/ui/button';
import type { ComponentConfig } from '@puckeditor/core';
import { RichTextMenu } from '@puckeditor/core';

export type ButtonBlockProps = {
  content: string;
  alignment: 'left' | 'center' | 'right';
  variant: 'indigo' | 'gray' | 'lime' | 'red' | 'outline' | 'link';
  size: 'default' | 'lg' | 'sm';
};

export const ButtonBlock: ComponentConfig<ButtonBlockProps> = {
  fields: {
    content: {
      type: 'richtext',
      renderMenu: ({ editor }) => (
        <RichTextMenu>
          <RichTextMenu.Group>
            <RichTextMenu.Italic />
            <button
              onClick={() => {
                const url = prompt('Digite a URL');

                if (!url) return;

                editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
              }}
            >
              🔗 Link
            </button>

            <button
              onClick={() => {
                editor?.chain().focus().unsetLink().run();
              }}
            >
              ❌ link
            </button>
          </RichTextMenu.Group>
        </RichTextMenu>
      ),
    },
    alignment: {
      type: 'radio',
      options: [
        { label: 'left', value: 'left' },
        { label: 'center', value: 'center' },
        { label: 'right', value: 'right' },
      ],
    },
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
    alignment: 'left',
    variant: 'indigo',
    size: 'default',
  },
  render: ({ content, alignment, variant, size }) => {
    const alignmentClasses = {
      left: 'mr-auto',
      center: 'mx-auto',
      right: 'ml-auto',
    };
    return (
      <Button variant={variant} size={size} className={alignmentClasses[alignment]}>
        {content}
      </Button>
    );
  },
};
