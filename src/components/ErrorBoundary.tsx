import { Component, type ErrorInfo, type ReactNode } from 'react';
import { contact } from '../config/site';

export class ErrorBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('UI error:', error, info.componentStack);
  }
  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <div className="grid min-h-screen place-items-center bg-ivory p-8 text-center">
        <div className="max-w-md">
          <h1 className="font-serif text-4xl text-charcoal">Something went wrong</h1>
          <p className="mt-3 text-ink/80">Please refresh the page. If the problem continues, call us on {contact.phoneDisplay}.</p>
          <button type="button" className="btn btn-primary mt-6" onClick={() => window.location.reload()}>
            Reload page
          </button>
        </div>
      </div>
    );
  }
}
