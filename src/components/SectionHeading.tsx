import type { ReactNode } from 'react';
import { Reveal } from './Reveal';

interface Props {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: 'left' | 'center';
  light?: boolean;
  id?: string;
}

export function SectionHeading({ eyebrow, title, intro, align = 'left', light, id }: Props) {
  return (
    <Reveal className={`mb-10 max-w-2xl sm:mb-14 ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow ${light ? '!text-sand' : ''}`}>{eyebrow}</p>
      <h2 id={id} className={`h-section mt-3 ${light ? '!text-ivory' : ''}`}>
        {title}
      </h2>
      {intro && <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? 'text-sand/90' : 'text-ink/80'}`}>{intro}</p>}
    </Reveal>
  );
}
