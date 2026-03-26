// @/components/puck/ImgBlock.tsx
import Img from '@/components/img';
import * as Fields from '@/puck/fields';
import type { ComponentConfig } from '@puckeditor/core';

export type ImgBlockProps = {
  src: string;
  borderRadius: number;
  maxWidthValue: number;
  maxWidthUnit: 'px' | '%';
  alignment: 'left' | 'center' | 'right';
  rounded: boolean;
};

const placeholderImgUrl =
  'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop';

const getAlignmentXClasses = (alignment: 'left' | 'center' | 'right') => {
  const alignmentClasses = {
    left: 'ml-0 mr-auto',
    center: 'mx-auto',
    right: 'ml-auto mr-0',
  };
  return alignmentClasses[alignment];
};

export const ImgBlock: ComponentConfig<ImgBlockProps> = {
  fields: {
    src: {
      type: 'text',
      label: 'URL/Src Imagem',
    },

    maxWidthValue: {
      type: 'number',
      label: 'Largura máxima',
    },
    maxWidthUnit: {
      type: 'radio',
      label: 'Largura máxima Unidade',
      options: [
        { label: 'px', value: 'px' },
        { label: '%', value: '%' },
      ],
    },
    alignment: Fields.AlignmentXField({ defaultValue: 'center' }),
    rounded: {
      type: 'radio',
      label: 'Circular?',
      options: [
        { label: 'Normal', value: false },
        { label: 'Circular', value: true },
      ],
    },
    borderRadius: {
      type: 'number',
      label: 'Raio da Borda (px)',
    },
  },
  defaultProps: {
    src: placeholderImgUrl,
    borderRadius: 0,
    maxWidthValue: 100,
    maxWidthUnit: '%',
    alignment: 'center',
    rounded: false,
  },
  render: ({ src, borderRadius, maxWidthValue, maxWidthUnit, alignment, rounded }) => {
    return (
      <div
        className={getAlignmentXClasses(alignment)}
        style={{ maxWidth: `${maxWidthValue}${maxWidthUnit}` }}
      >
        <Img
          src={src}
          alt="Image"
          isCircle={rounded}
          style={!rounded ? { borderRadius: `${borderRadius}px` } : {}}
        />
      </div>
    );
  },
};
