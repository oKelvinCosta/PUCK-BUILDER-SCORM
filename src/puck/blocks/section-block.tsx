import type { ComponentConfig } from '@puckeditor/core';

export type SectionBlockProps = {
  backgroundImage: string;
  imagePosition: 'left' | 'center' | 'right';
  paddingTop: number;
  paddingBottom: number;
  slot: any;
};
const isEditing = process.env.NODE_ENV === 'development';

export const SectionBlock: ComponentConfig<SectionBlockProps> = {
  fields: {
    // 🖼️ background image
    backgroundImage: {
      type: 'text', // pode trocar por image field depois
      label: 'Background Image URL',
    },

    // ↔️ posição da imagem
    imagePosition: {
      type: 'radio',
      label: 'Image Position',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },

    // 📏 padding
    paddingTop: {
      type: 'number',
      label: 'Padding Top',
    },
    paddingBottom: {
      type: 'number',
      label: 'Padding Bottom',
    },

    slot: {
      type: 'slot',
      disallow: ['Section'],
    },
  },

  defaultProps: {
    backgroundImage: '',
    imagePosition: 'center',
    paddingTop: 80,
    paddingBottom: 80,
    slot: [],
  },

  render: ({ backgroundImage, imagePosition, paddingTop, paddingBottom, slot: Slot }) => {
    return (
      <section
        style={{
          paddingTop: `${paddingTop}px`,
          paddingBottom: `${paddingBottom}px`,
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
          backgroundPosition: imagePosition,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Slot className={isEditing ? 'p-6' : ''} />
      </section>
    );
  },
};
