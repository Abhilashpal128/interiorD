import { Link } from 'react-router-dom';
import { company } from '../config/site';

export function Logo({ light, className = '' }: { light?: boolean; className?: string }) {
  const logo = light && company.logoImageLight ? company.logoImageLight : company.logoImage;
  return (
    <Link to="/" aria-label={`${company.name} - home`} className={`brand ${light ? 'brand-light' : ''} ${className}`}>
      <img src={logo} alt={company.name} width={2006} height={784} className="brand-image" />
    </Link>
  );
}
