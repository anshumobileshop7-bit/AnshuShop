import React from 'react';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-24 text-center">
      <div className="max-w-md w-full">
        <span className="text-8xl font-black text-brand-600 block mb-4">404</span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
          Page Not Found
        </h1>
        <p className="text-sm text-slate-500 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button to="/" variant="primary" size="md" icon={Home}>
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
