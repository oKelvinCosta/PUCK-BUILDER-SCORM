// @/components/puck/ImgBlock.tsx
import type { ComponentConfig } from '@puckeditor/core';

export type GridBlockProps = {
  columnFormat: '1/1' | '1/2-1/2' | '1/3-2/3' | '2/3-1/3' | '1/3-1/3-1/3' | '1/4-1/4-1/4-1/4';
  alignment: 'top' | 'center' | 'bottom';
  'col-1': any;
  'col-2': any;
  'col-3': any;
  'col-4': any;
};

const isEditing = process.env.NODE_ENV === 'development';

export const GridBlock: ComponentConfig<GridBlockProps> = {
  fields: {
    columnFormat: {
      type: 'radio',
      options: [
        { label: '1/1', value: '1/1' },
        { label: '1/2 1/2', value: '1/2-1/2' },
        { label: '1/3 2/3', value: '1/3-2/3' },
        { label: '2/3 1/3', value: '2/3-1/3' },
        { label: '1/3 1/3 1/3', value: '1/3-1/3-1/3' },
        { label: '1/4 1/4 1/4 1/4', value: '1/4-1/4-1/4-1/4' },
      ],
    },
    alignment: {
      type: 'radio',
      options: [
        { label: 'Top', value: 'top' },
        { label: 'Center', value: 'center' },
        { label: 'Bottom', value: 'bottom' },
      ],
    },
    'col-1': {
      type: 'slot',
      disallow: ['Container'],
    },
    'col-2': {
      type: 'slot',
      disallow: ['Container'],
    },
    'col-3': {
      type: 'slot',
      disallow: ['Container'],
    },
    'col-4': {
      type: 'slot',
      disallow: ['Container'],
    },
  },
  defaultProps: {
    columnFormat: '1/2-1/2',
    alignment: 'top',
    'col-1': [],
    'col-2': [],
    'col-3': [],
    'col-4': [],
  },
  render: ({
    columnFormat,
    alignment,
    'col-1': Col1,
    'col-2': Col2,
    'col-3': Col3,
    'col-4': Col4,
  }) => {
    const gridConfigs = {
      '1/1': {
        containerClass: ' grid grid-cols-1 gap-6',
        spans: [12],
        slots: [Col1],
      },
      '1/2-1/2': {
        containerClass: ' grid grid-cols-1 gap-6 md:grid-cols-12',
        spans: [6, 6],
        slots: [Col1, Col2],
      },
      '1/3-2/3': {
        containerClass: ' grid grid-cols-1 gap-6 md:grid-cols-12',
        spans: [4, 8],
        slots: [Col1, Col2],
      },
      '2/3-1/3': {
        containerClass: ' grid grid-cols-1 gap-6 md:grid-cols-12',
        spans: [8, 4],
        slots: [Col1, Col2],
      },
      '1/3-1/3-1/3': {
        containerClass: ' grid grid-cols-1 gap-6 md:grid-cols-12',
        spans: [4, 4, 4],
        slots: [Col1, Col2, Col3],
      },
      '1/4-1/4-1/4-1/4': {
        containerClass: ' grid grid-cols-1 gap-6 md:grid-cols-12',
        spans: [3, 3, 3, 3],
        slots: [Col1, Col2, Col3, Col4],
      },
    };

    const config = gridConfigs[columnFormat as keyof typeof gridConfigs] || gridConfigs['1/2-1/2'];

    const alignmentClasses = {
      top: 'items-start',
      center: 'items-center',
      bottom: 'items-end',
    };

    return (
      <div
        className={`${isEditing && 'py-4'} grid-kelvin mt-10 ${config.containerClass} ${alignmentClasses[alignment]}`}
      >
        {config.slots.map((Slot, index) => (
          <div key={index} className={`md:col-span-${config.spans[index]}`}>
            <Slot className={isEditing ? 'p-6' : ''} />
          </div>
        ))}
      </div>
    );
  },
};
