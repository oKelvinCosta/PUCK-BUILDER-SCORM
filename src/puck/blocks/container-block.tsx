// @/components/puck/ImgBlock.tsx
import Container from '@/components/container';
import { useEditorModeStore } from '@/stores/editor-mode-store';
import type { ComponentConfig } from '@puckeditor/core';

export type ContainerBlockProps = {
  variant: 1280 | 980 | 780 | 580;
  slot: any;
};

export const ContainerBlock: ComponentConfig<ContainerBlockProps> = {
  fields: {
    variant: {
      type: 'select',
      options: [
        { label: '1280px (Extra Large)', value: '1280' },
        { label: '980px (Large)', value: '980' },
        { label: '780px (Medium)', value: '780' },
        { label: '580px (Small)', value: '580' },
      ],
    },
    slot: {
      type: 'slot',
      disallow: ['Container'],
    },
  },
  defaultProps: {
    variant: 780,
    slot: [],
  },
  render: ({ variant, slot: Slot }) => {
    const isEditing = useEditorModeStore.getState().isEditing;

    return (
      <Container maxWidth={variant} className="container-kelvin">
        <Slot className={`${isEditing ? 'p-6' : ''} mx-auto`} />
      </Container>
    );
  },
};
