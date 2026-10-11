import { Suspense, lazy } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { EnquiryProvider } from './context/EnquiryContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { ScrollManager } from './components/ScrollManager';
import HomePage from './pages/HomePage';

const ProjectDetailPage = lazy(() => import('./pages/ProjectDetailPage'));
const ServiceDetailPage = lazy(() => import('./pages/ServiceDetailPage'));
const AdminPage = lazy(() => import('./pages/AdminPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const PrivacyPage = lazy(() => import('./pages/LegalPages').then((m) => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('./pages/LegalPages').then((m) => ({ default: m.TermsPage })));

export default function App() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith('/admin');
  return (
    <EnquiryProvider>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:bg-charcoal focus:p-3 focus:text-ivory">Skip to content</a>
      <ScrollManager />
      <Header />
      <main id="main">
        <Suspense fallback={<div className="grid min-h-[50vh] place-items-center text-taupe" role="status">Loading...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/:slug" element={<ProjectDetailPage />} />
            <Route path="/services/:id" element={<ServiceDetailPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      {!isAdmin && <FloatingActions />}
      <Toaster position="top-center" toastOptions={{ duration: 4500, style: { borderRadius: '2px', background: '#26231f', color: '#f6f1e8' } }} />
    </EnquiryProvider>
  );
}
