import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  Tag,
  Image as ImageIcon,
  Info,
  Settings,
  LogOut,
  ExternalLink,
  Smartphone,
  X,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useShop } from '../context/ShopContext';

const AdminSidebar = ({ isOpen, onClose }) => {
  const { logout, admin } = useAuth();
  const { settings } = useShop();
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'Hero Banner', path: '/admin/hero', icon: Sparkles },
    { name: 'Offers & Deals', path: '/admin/offers', icon: Tag },
    { name: 'Shop Gallery', path: '/admin/gallery', icon: ImageIcon },
    { name: 'About & Trust', path: '/admin/about', icon: Info },
    { name: 'Contact & Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-950 text-slate-300 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-600/30">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white leading-tight">
                {settings.shopName || 'Anshu Mobile'}
              </h2>
              <span className="text-[11px] font-bold text-brand-400 uppercase tracking-wider">
                Admin CMS Panel
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex-1 px-4 py-6 overflow-y-auto space-y-1.5">
          <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Store Management
          </div>

          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={() => onClose?.()}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-600/25'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`
              }
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          ))}

          <div className="pt-6 px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Quick Actions
          </div>

          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-all group"
          >
            <div className="flex items-center gap-3">
              <ExternalLink className="w-5 h-5 shrink-0 text-brand-400" />
              <span>View Public Store</span>
            </div>
            <span className="text-xs text-slate-500 group-hover:text-slate-300">↗</span>
          </a>
        </div>

        {/* User profile & Logout */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80">
          <div className="flex items-center justify-between mb-3 px-2">
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white leading-tight">
                {admin?.name || 'Administrator'}
              </span>
              <span className="text-[11px] text-slate-500 truncate max-w-[150px]">
                {admin?.email || 'admin@anshumobile.com'}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-rose-950/50 text-slate-300 hover:text-rose-400 border border-slate-800 hover:border-rose-900/50 text-xs font-bold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
