import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Type } from 'lucide-react';
import { useState } from 'react';

/**
 * Curated list of popular Google Fonts with their corresponding CSS font-family strings.
 * These are used to populate the picker and provide visual previews.
 */
const POPULAR_FONTS = [
  { name: 'Inter', family: "'Inter', sans-serif" },
  { name: 'Roboto', family: "'Roboto', sans-serif" },
  { name: 'Open Sans', family: "'Open Sans', sans-serif" },
  { name: 'Montserrat', family: "'Montserrat', sans-serif" },
  { name: 'Lato', family: "'Lato', sans-serif" },
  { name: 'Poppins', family: "'Poppins', sans-serif" },
  { name: 'Playfair Display', family: "'Playfair Display', serif" },
  { name: 'Merriweather', family: "'Merriweather', serif" },
  { name: 'Oswald', family: "'Oswald', sans-serif" },
  { name: 'Raleway', family: "'Raleway', sans-serif" },
  { name: 'Nunito', family: "'Nunito', sans-serif" },
  { name: 'Ubuntu', family: "'Ubuntu', sans-serif" },
  { name: 'Roboto Mono', family: "'Roboto Mono', monospace" },
  { name: 'Josefin Sans', family: "'Josefin Sans', sans-serif" },
  { name: 'Quicksand', family: "'Quicksand', sans-serif" },
  { name: 'Bebas Neue', family: "'Bebas Neue', cursive" },
  { name: 'Space Grotesk', family: "'Space Grotesk', sans-serif" },
  { name: 'Outfit', family: "'Outfit', sans-serif" },
  { name: 'Plus Jakarta Sans', family: "'Plus Jakarta Sans', sans-serif" },
  { name: 'DM Sans', family: "'DM Sans', sans-serif" },
];

/**
 * Utility function to sort an array of font objects alphabetically by their name.

 */
const SORTED_FONTS = [...POPULAR_FONTS].sort((a, b) => a.name.localeCompare(b.name));

interface FontPickerProps {
  value: string; // The current font-family value (e.g. "'Inter', sans-serif")
  onChange: (value: string) => void; // Callback triggered when a new font is selected or typed
  id?: string; // Optional ID for accessibility labels
}

/**
 * FontPicker Component
 * Provides a searchable dropdown of popular Google Fonts with live previews.
 * Also includes a fallback input for typing any custom font family name.
 */
export function FontPicker({ value, onChange, id }: FontPickerProps) {
  // isCustom is true if the current value is NOT in our popular list
  const [isCustom, setIsCustom] = useState(
    !SORTED_FONTS.some((f) => f.family === value || f.name === value) && value !== ''
  );

  /**
   * Handles selection changes from the dropdown.
   * If "custom" is selected, it shows the manual text input.
   */
  const handleSelectChange = (val: string) => {
    if (val === 'custom') {
      setIsCustom(true);
    } else {
      setIsCustom(false);
      onChange(val);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <div className="flex-1">
          {/* Main Dropdown Picker */}
          <Select value={isCustom ? 'custom' : value} onValueChange={handleSelectChange}>
            <SelectTrigger id={id} className="h-8 text-xs">
              <Type className="mr-2 size-3 opacity-50" />
              <SelectValue placeholder="Selecionar fonte..." />
            </SelectTrigger>
            <SelectContent>
              {/* Map through sorted popular fonts and apply inline styles for preview */}
              {SORTED_FONTS.map((font) => (
                <SelectItem key={font.family} value={font.family} className="text-xs">
                  <span style={{ fontFamily: font.family }}>{font.name}</span>
                </SelectItem>
              ))}
              {/* Option to toggle manual input mode */}
              <SelectItem value="custom" className="border-t text-xs font-medium">
                Outra fonte...
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Manual Input: Only shown when "isCustom" mode is active */}
      {isCustom && (
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Ex: 'Comic Sans MS', cursive"
          className="h-8 text-xs"
        />
      )}

      {/* 
        Dynamic Link Injection:
        Loads all fonts in the POPULAR_FONTS list from Google Fonts API 
        to ensure the previews in the dropdown list render correctly.
      */}
      <link
        href={`https://fonts.googleapis.com/css2?${SORTED_FONTS.map(
          (f) => `family=${f.name.replace(/\s+/g, '+')}`
        ).join('&')}&display=swap`}
        rel="stylesheet"
      />
    </div>
  );
}
