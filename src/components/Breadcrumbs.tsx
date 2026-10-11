import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function Breadcrumbs({ items }: { items: Array<{ label: string; to?: string }> }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-taupe">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((it, i) => (
          <li key={it.label} className="flex items-center gap-1.5">
            {it.to ? <Link to={it.to} className="hover:text-charcoal hover:underline">{it.label}</Link> : <span aria-current="page" className="text-charcoal">{it.label}</span>}
            {i < items.length - 1 && <ChevronRight size={14} aria-hidden />}
          </li>
        ))}
      </ol>
    </nav>
  );
}
