'use client';

import { usePortfolio } from '@/context/PortfolioContext';
import { Button } from '@/components/ui/button';
import { Type, Bold, Copy, ExternalLink, Settings as SettingsIcon } from 'lucide-react';

const BG_PRESETS = [
  { name: 'Warm Beige', value: '#E8D5C4' },
  { name: 'Rose Dust', value: '#F2C4CE' },
  { name: 'Sage Green', value: '#C4D9C8' },
  { name: 'Periwinkle', value: '#C9C4E8' },
  { name: 'Steel Blue', value: '#B8D0E8' },
  { name: 'Cool Slate', value: '#CBD5E1' },
];

const CARD_SURFACE_PRESETS = [
  { name: 'Crisp White', value: 'rgba(255, 255, 255, 0.95)' },
  { name: 'Warm Pearl', value: 'rgba(254, 243, 199, 0.70)' },
  { name: 'Rose Blush', value: 'rgba(253, 242, 248, 0.75)' },
  { name: 'Mint Cyan', value: 'rgba(236, 254, 255, 0.75)' },
];

const FONTS = [
  { label: 'Jakarta Sans (Default)', value: 'Plus Jakarta Sans' },
  { label: 'Inter (Clean Sans)', value: 'Inter' },
  { label: 'Bricolage Grotesque (Bold Modern)', value: 'Bricolage Grotesque' },
  { label: 'Playfair Display (Elegant Serif)', value: 'Playfair Display' },
  { label: 'Lora (Editorial Serif)', value: 'Lora' },
  { label: 'Montserrat (Modern Geometric)', value: 'Montserrat' },
  { label: 'Outfit (Sleek Modern)', value: 'Outfit' },
  { label: 'Merriweather (Classic Serif)', value: 'Merriweather' },
  { label: 'Fira Code (Developer Mono)', value: 'Fira Code' },
  { label: 'Space Mono (Tech Mono)', value: 'Space Mono' },
];

export function SettingsEditor() {
  const { portfolio, updatePortfolio } = usePortfolio();

  if (!portfolio) return null;

  const ts = portfolio.themeSettings || {};
  const currentBg = ts.bgColor || '#F2EAE0';
  const currentCardBg = ts.cardBgColor || 'rgba(255, 255, 255, 0.92)';
  const currentFont = ts.fontFamily || 'Plus Jakarta Sans';
  const isBold = ts.isBoldText || false;

  const handleUpdateSettings = (patch: Partial<typeof ts>) => {
    updatePortfolio({
      themeSettings: {
        ...ts,
        ...patch,
      },
    });
  };

  const publicUrl = portfolio?.slug
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/p/${portfolio.slug}`
    : null;

  const handleCopy = () => {
    if (publicUrl) {
      navigator.clipboard.writeText(publicUrl);
    }
  };

  return (
    <div className="space-y-6 p-1 text-sm">
      {/* Section Header */}
      <div className="flex items-center gap-2 border-b pb-3">
        <SettingsIcon className="w-4 h-4 text-primary" />
        <h3 className="font-bold text-base text-foreground">Settings</h3>
      </div>

      {/* 1. Page Background Color */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Page Background
          </label>
          <input
            type="color"
            value={currentBg.startsWith('#') ? currentBg : '#F2EAE0'}
            onChange={(e) => handleUpdateSettings({ bgColor: e.target.value })}
            className="w-7 h-7 rounded border border-border cursor-pointer bg-transparent"
            title="Custom background color"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {BG_PRESETS.map((preset) => (
            <button
              key={preset.value}
              onClick={() => handleUpdateSettings({ bgColor: preset.value })}
              className={`w-7 h-7 rounded-full border border-black/10 shadow-xs transition-transform hover:scale-110 flex items-center justify-center ${
                currentBg === preset.value ? 'ring-2 ring-primary ring-offset-1 scale-110' : ''
              }`}
              style={{ backgroundColor: preset.value }}
              title={preset.name}
            />
          ))}
        </div>
      </div>

      {/* 2. Glass Card Surface Color */}
      <div className="space-y-2 pt-2 border-t">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Card Surface
          </label>
          <input
            type="color"
            value={currentCardBg.startsWith('#') ? currentCardBg : '#FFFFFF'}
            onChange={(e) => handleUpdateSettings({ cardBgColor: e.target.value })}
            className="w-7 h-7 rounded border border-border cursor-pointer bg-transparent"
            title="Custom card surface color"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {CARD_SURFACE_PRESETS.map((preset) => (
            <button
              key={preset.value}
              onClick={() => handleUpdateSettings({ cardBgColor: preset.value })}
              className={`px-3 py-2 rounded-lg border text-xs font-medium transition-all text-left flex items-center gap-2 ${
                currentCardBg === preset.value
                  ? 'border-primary bg-primary/10 text-primary font-semibold shadow-xs'
                  : 'hover:bg-muted text-muted-foreground'
              }`}
            >
              <div
                className="w-4 h-4 rounded border border-black/20 shrink-0"
                style={{ backgroundColor: preset.value }}
              />
              <span className="truncate">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. Typography & Global Font */}
      <div className="space-y-3 pt-2 border-t">
        <div className="flex items-center gap-1.5">
          <Type className="w-3.5 h-3.5 text-muted-foreground" />
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Global Font & Weight
          </label>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-muted-foreground">Font Family</label>
          <select
            value={currentFont}
            onChange={(e) => handleUpdateSettings({ fontFamily: e.target.value })}
            className="w-full h-9 px-3 text-xs rounded-md border border-input bg-background font-medium focus:outline-none focus:ring-1 focus:ring-primary"
          >
            {FONTS.map((font) => (
              <option key={font.value} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-xs text-muted-foreground">Text Weight</span>
          <Button
            variant={isBold ? 'default' : 'outline'}
            size="sm"
            className="h-8 px-3 text-xs font-bold"
            onClick={() => handleUpdateSettings({ isBoldText: !isBold })}
          >
            <Bold className="w-3.5 h-3.5 mr-1.5" />
            {isBold ? 'Bold Active' : 'Normal Weight'}
          </Button>
        </div>
      </div>

      {/* 4. Public Link & Status */}
      <div className="space-y-2 pt-4 border-t">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Public Link
        </label>
        {publicUrl ? (
          <div className="space-y-2">
            <p className="text-xs break-all bg-muted px-3 py-2 rounded-md font-mono">{publicUrl}</p>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 text-xs" onClick={handleCopy}>
                <Copy className="w-3.5 h-3.5 mr-1" /> Copy Link
              </Button>
              <Button size="sm" className="flex-1 text-xs" onClick={() => window.open(publicUrl, '_blank')}>
                <ExternalLink className="w-3.5 h-3.5 mr-1" /> Open Live
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-xs text-muted-foreground">Publish your portfolio to generate your link.</p>
        )}
      </div>

      {/* Portfolio Status */}
      <div className="space-y-2 pt-2 border-t">
        <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Status
        </label>
        <div className={`flex items-center gap-2 text-xs font-medium px-3 py-2 rounded-md ${
          portfolio?.isPublished
            ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
            : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
        }`}>
          <div className={`w-2 h-2 rounded-full ${portfolio?.isPublished ? 'bg-green-500' : 'bg-yellow-500'}`} />
          {portfolio?.isPublished ? 'Published' : 'Draft — not visible to public'}
        </div>
      </div>
    </div>
  );
}
