import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import { AlignCenterVertical, AlignEndVertical, AlignStartVertical } from 'lucide-react';

// Options interface for the AlignmentXField component
export interface AlignmentXFieldOptions {
  label?: string; // Custom label for the field
  defaultValue?: 'left' | 'center' | 'right'; // Default alignment value
}

// System color for active state (blue)
const systemColor = '#3b82f6';

// Custom field component for horizontal alignment selection
export function AlignmentXField(options?: AlignmentXFieldOptions) {
  // Extract options with defaults
  const { label = 'Alinhamento eixo X', defaultValue = 'center' } = options || {};

  return {
    label,
    type: 'custom' as const,
    render: ({
      value,
      onChange,
    }: {
      value?: 'left' | 'center' | 'right';
      onChange: (val: 'left' | 'center' | 'right') => void;
    }) => {
      // Alignment options with icons
      const fieldOptions = [
        { label: '', value: 'left', icon: AlignStartVertical },
        { label: '', value: 'center', icon: AlignCenterVertical },
        { label: '', value: 'right', icon: AlignEndVertical },
      ];

      // Use current value or defaultValue as fallback
      const currentValue = value || defaultValue;

      return (
        // Main container with vertical layout
        <>
          <div className="flex flex-col gap-2">
            {/* Field label */}
            <span style={{ color: '#5A5A5A' }} className="text-sm font-semibold">
              {label}
            </span>
            <ButtonGroup fullWidth className="w-full">
              {fieldOptions.map((opt) => {
                const Icon = opt.icon;
                // Check if this option is currently active
                const isActive = currentValue === opt.value;
                return (
                  <>
                    <Button
                      key={opt.value}
                      onClick={() => onChange(opt.value as 'left' | 'center' | 'right')}
                      variant="outline"
                      title={opt.label}
                      style={{
                        border: `2px solid ${isActive ? systemColor : '#eee'}`,
                      }}
                      className="flex w-[33.33%] items-center justify-center"
                    >
                      {/* Icon with color based on active state */}
                      <Icon size={16} color={isActive ? systemColor : '#666'} />

                      {/* Optional text label (currently empty) */}
                      {opt.label && (
                        <span
                          style={{
                            fontSize: '10px',
                            color: isActive ? systemColor : '#666',
                            fontWeight: isActive ? 600 : 400,
                          }}
                        >
                          {opt.label}
                        </span>
                      )}
                    </Button>
                  </>
                );
              })}
            </ButtonGroup>
          </div>
        </>
      );
    },
  };
}
