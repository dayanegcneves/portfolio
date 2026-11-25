import { Icon } from '../Icons.tsx';
import type { GlyphName, StackItem } from '../types';

const glyphs: GlyphName[] = ['check', 'loop', 'spark'];

const isGlyph = (icon: string): icon is GlyphName => (glyphs as string[]).includes(icon);

export function StackIcon({ item, size = 34 }: { item: StackItem; size?: number }) {
  if (isGlyph(item.icon)) {
    return (
      <span className="stack-glyph">
        <Icon name={item.icon} size={size - 6} />
      </span>
    );
  }
  return <img src={item.icon} alt="" width={size} height={size} loading="lazy" decoding="async" />;
}
