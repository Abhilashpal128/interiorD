import { Link } from 'react-router-dom';
import { company } from '../config/site';

export function Logo({ light, className = '' }: { light?: boolean; className?: string }) {
  return (
    <Link to="/" aria-label={`${company.name} - home`} className={`inline-flex items-center gap-3 ${className}`}>
      {company.logoImage ? (
        <img src={company.logoImage} alt="" width={40} height={40} className="h-10 w-10 object-contain" />
      ) : (
        <span aria-hidden className={`grid h-10 w-10 place-items-center font-serif text-2xl ${light ? 'bg-ivory text-charcoal' : 'bg-charcoal text-sand'}`}>
          {company.logoMark}
        </span>
      )}
      <span className={`font-serif text-[1.45rem] font-semibold leading-none tracking-tight ${light ? 'text-ivory' : 'text-charcoal'}`}>
        {company.name}
      </span>
    </Link>
  );
}
