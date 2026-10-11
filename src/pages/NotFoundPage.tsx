import { Link } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';

export default function NotFoundPage() {
  useSeo({ title: 'Page not found', noindex: true, path: '/404' });
  return (
    <div className="container-x grid min-h-[60vh] place-items-center py-20 text-center" role="alert">
      <div>
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-3 font-serif text-5xl">We could not find that page</h1>
        <p className="mx-auto mt-4 max-w-md text-ink/80">The link may be outdated or mistyped. Let us take you back to the homepage.</p>
        <Link to="/" className="btn btn-primary mt-8">Back to home</Link>
      </div>
    </div>
  );
}
