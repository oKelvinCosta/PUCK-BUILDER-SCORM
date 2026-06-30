import type { ReactElement } from 'react';
import type { CustomFieldRender, Field } from '@puckeditor/core';

/**
 * Describes a container width option exposed in the editor.
 */
export interface ContainerWidth {
  maxWidth: string;
  label: string;
}

/**
 * Available container width presets used by the field UI.
 */
export const CONTAINER_MAP = {
  '580': { maxWidth: '580px', label: '580px' },
  '780': { maxWidth: '780px', label: '780px' },
  '980': { maxWidth: '980px', label: '980px' },
  '1280': { maxWidth: '1280px', label: '1280px' },
  full: { maxWidth: '100%', label: 'Largura Total' },
} as const;

/**
 * Valid container width keys accepted by the field.
 */
export type ContainerVariant = keyof typeof CONTAINER_MAP; //580, 780, 980, 1280, full

/**
 * Parameters used to configure the container field.
 */
export interface ContainerFieldParams {
  defaultValue?: ContainerVariant;
}

/**
 * Props passed to the custom field renderer.
 */
export interface ContainerFieldRenderProps {
  value?: ContainerVariant;
  onChange: (v: ContainerVariant | undefined) => void;
  field: Field<ContainerVariant | undefined>;
  name: string;
  id: string;
  readOnly?: boolean;
}

/**
 * Creates the custom field descriptor for selecting container width presets.
 */
export const ContainerField = (options?: ContainerFieldParams): Field<ContainerVariant, {}> => {
  const { defaultValue = '980' } = options || {};

  return {
    type: 'custom' as const,
    render: (({ value, onChange }: ContainerFieldRenderProps): ReactElement => {
      const currentValue = value ?? defaultValue;
      const options = Object.entries(CONTAINER_MAP).map(([key, item]) => ({
        value: key as ContainerVariant,
        label: item.label,
      }));

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span className="text-label-puck text-sm font-semibold">Largura do Container</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
            {options.map((opt) => {
              const previewWidth =
                opt.value === 'full' ? '100%' : `${(Number(opt.value) / 1280) * 100}%`;
              return (
                <button
                  key={opt.value}
                  onClick={() => onChange(opt.value)}
                  title={opt.label}
                  type="button"
                  style={{
                    padding: '8px',
                    border: `2px solid ${currentValue === opt.value ? 'hsl(var(--primary))' : 'rgba(0,0,0,0.1)'}`,
                    borderRadius: '4px',
                    cursor: 'pointer',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    backgroundColor: 'transparent',
                  }}
                >
                  <div
                    style={{
                      width: previewWidth,
                      height: '24px',
                      borderRadius: '2px',
                      maxWidth: '90%',
                    }}
                    className={`${currentValue === opt.value ? 'bg-primary' : 'bg-muted'}`}
                  />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '2px',
                      fontSize: '12px',
                      fontWeight: value === opt.value ? 600 : 400,
                    }}
                    className={`${currentValue === opt.value ? 'text-primary-foreground' : ''}`}
                  >
                    {opt.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      );
    }) as CustomFieldRender<ContainerVariant | undefined>,
  } as unknown as Field<ContainerVariant, {}>;
};
