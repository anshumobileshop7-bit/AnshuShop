import React from 'react';
import { Menu, ExternalLink, RefreshCw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useToast } from '../context/ToastContext';

const AdminHeader = ({ title, subtitle, onToggleSidebar }) => {
  const { refreshShopData, settings } = useShop();
  const { showSuccess } = useToast();

  const handleRefreshCache = async () => {
    await refreshShopData();
    showSuccess('Store content refreshed from database');
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 -ml-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleRefreshCache}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          title="Refresh store cache"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Refresh Cache</span>
        </button>

        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg border border-brand-200 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Live Website</span>
        </a>
      </div>
    </header>
  );
};

export default AdminHeader;
