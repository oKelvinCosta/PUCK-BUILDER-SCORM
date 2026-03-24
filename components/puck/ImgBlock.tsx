import Img from '@/components/img';
import type { ComponentConfig } from '@puckeditor/core';

export type ImgBlockProps = {
  rounded: boolean;
};

export const ImgBlock: ComponentConfig<ImgBlockProps> = {
  fields: {
    rounded: {
      type: 'radio',
      options: [
        { label: 'Normal', value: false },
        { label: 'Rounded', value: true },
      ],
    },
  },
  defaultProps: {
    rounded: false,
  },
  render: ({ rounded }) => (
    <Img
      src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop"
      alt="Placeholder image"
      isCircle={rounded}
    />
  ),
};
