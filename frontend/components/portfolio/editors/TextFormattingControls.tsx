'use client';

import { usePortfolio } from '@/context/PortfolioContext';
import { Type } from 'lucide-react';

interface TextFormattingControlsProps {
  fieldKey: string;
  colorOnly?: boolean;
  defaultColor?: string;
  label?: string;
}

export function TextFormattingControls({ fieldKey, colorOnly, defaultColor = '#7C3AED', label }: TextFormattingControlsProps) {
  const { portfolio, updatePortfolio } = usePortfolio();

  const fieldStyle = portfolio?.themeSettings?.fieldStyles?.[fieldKey] || {};

  const handleChange = (patch: Partial<typeof fieldStyle>) => {
    const currentTheme = portfolio?.themeSettings || {};
    const currentStyles = currentTheme.fieldStyles || {};

    updatePortfolio({
      themeSettings: {
        ...currentTheme,
        fieldStyles: {
          ...currentStyles,
          [fieldKey]: {
            ...fieldStyle,
            ...patch,
          },
        },
      },
    });
  };

  if (colorOnly) {
    return (
      <div className="flex items-center gap-2 mt-1.5 p-1.5 bg-muted/40 rounded-lg border text-xs">
        <span className="text-[11px] font-medium text-muted-foreground">{label || 'Accent Color:'}</span>
        <input
          type="color"
          value={fieldStyle.color || defaultColor}
          onChange={(e) => handleChange({ color: e.target.value })}
          className="w-5 h-5 rounded-full border border-black/10 cursor-pointer bg-transparent shrink-0"
        />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 mt-1.5 p-1.5 bg-muted/40 rounded-lg border text-xs flex-wrap">
      <div className="flex items-center gap-1" title="Font Family for this text">
        <Type className="w-3 h-3 text-muted-foreground shrink-0" />
        <select
          value={fieldStyle.fontFamily || 'Plus Jakarta Sans'}
          onChange={(e) => handleChange({ fontFamily: e.target.value })}
          className="h-6 px-1.5 text-[11px] rounded border border-input bg-background font-medium focus:outline-none"
        >
          <option value="Plus Jakarta Sans">Jakarta Sans</option>
          <option value="Inter">Inter</option>
          <option value="Bricolage Grotesque">Bricolage</option>
          <option value="Playfair Display">Playfair</option>
          <option value="Lora">Lora</option>
          <option value="Montserrat">Montserrat</option>
          <option value="Outfit">Outfit</option>
          <option value="Merriweather">Merriweather</option>
          <option value="Fira Code">Fira Code</option>
          <option value="Space Mono">Space Mono</option>
        </select>
      </div>

      <div className="flex items-center gap-1" title="Text Color for this field">
        <span className="text-[10px] text-muted-foreground font-medium">Color:</span>
        <input
          type="color"
          value={fieldStyle.color || '#1E293B'}
          onChange={(e) => handleChange({ color: e.target.value })}
          className="w-4 h-4 rounded-full border border-black/10 cursor-pointer bg-transparent shrink-0"
        />
      </div>

      <button
        type="button"
        onClick={() => handleChange({ isBold: !fieldStyle.isBold })}
        className={`h-6 px-2 rounded border text-[11px] font-bold transition-all ${
          fieldStyle.isBold
            ? 'bg-primary text-primary-foreground border-primary'
            : 'bg-background hover:bg-muted text-muted-foreground'
        }`}
        title="Toggle bold text"
      >
        B
      </button>
    </div>
  );
}
