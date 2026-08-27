import React, { useState, useEffect } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import {
  Tag,
  Image as ImageIcon,
  Sparkles,
  Settings,
  Info,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Plus,
  ArrowRight,
} from 'lucide-react';
import AdminHeader from '../../components/AdminHeader';
import LoadingSpinner from '../../components/LoadingSpinner';
import Button from '../../components/Button';
import api from '../../services/api';
import { useShop } from '../../context/ShopContext';

const AdminDashboard = () => {
  const { toggleSidebar } = useOutletContext();
  const { settings } = useShop();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const res = await api.get('/admin/stats');
        if (res.data?.success) {
          setStats(res.data.data);
        }
      } catch (err) {
        console.error('Failed to load admin stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: 'Active Offers',
      value: stats?.activeOffers ?? 0,
      total: `${stats?.totalOffers ?? 0} total deals`,
      icon: Tag,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      link: '/admin/offers',
    },
    {
      title: 'Gallery Photos',
      value: stats?.galleryCount ?? 0,
      total: 'Store & showcase photos',
      icon: ImageIcon,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
      link: '/admin/gallery',
    },
    {
      title: 'Hero Banner',
      value: 'Live',
      total: 'Dynamic hero is active',
      icon: Sparkles,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      link: '/admin/hero',
    },
    {
      title: 'Store Settings',
      value: 'Online',
      total: settings?.phone || '+91 98765 43210',
      icon: Settings,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      link: '/admin/settings',
    },
  ];

  return (
    <div>
      <AdminHeader
        title="Dashboard Overview"
        subtitle="Manage all dynamic content and storefront sections for Anshu Mobile World"
        onToggleSidebar={toggleSidebar}
      />

      <div className="mt-6 space-y-8">
        {/* Metric Cards */}
        {loading ? (
          <LoadingSpinner text="Loading dashboard analytics..." />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {statCards.map((card) => {
              const Icon = card.icon;
              return (
                <Link
                  key={card.title}
                  to={card.link}
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      {card.title}
                    </span>
                    <div className={`p-2.5 rounded-xl border ${card.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="text-3xl font-extrabold text-slate-900 leading-none">
                      {card.value}
                    </span>
                    <p className="text-xs text-slate-500 mt-1.5">{card.total}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Quick Management Shortcuts */}
        <div>
          <h2 className="text-base font-bold text-slate-900 mb-4">
            Quick Content Shortcuts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/admin/hero"
              className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-brand-500 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Hero Section</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Update main banner, headline, promo text and CTA buttons.
                </p>
              </div>
            </Link>

            <Link
              to="/admin/offers"
              className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-brand-500 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Offers & Deals</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Add smartphone discounts, exchange deals and EMI offers.
                </p>
              </div>
            </Link>

            <Link
              to="/admin/gallery"
              className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-brand-500 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Shop Gallery</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Upload customer photos, interior shots and accessories racks.
                </p>
              </div>
            </Link>

            <Link
              to="/admin/about"
              className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-brand-500 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">About & Trust</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Edit shop background story, experience stats and features.
                </p>
              </div>
            </Link>

            <Link
              to="/admin/settings"
              className="bg-white p-5 rounded-2xl border border-slate-200/80 hover:border-brand-500 shadow-sm hover:shadow-md transition-all flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Contact & Hours</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Change phone, WhatsApp number, shop address and hours.
                </p>
              </div>
            </Link>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-900 text-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0">
                <ExternalLink className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Preview Live Site</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Check how the storefront appears to public customers.
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Recent Offers Overview */}
        {stats?.recentOffers && stats.recentOffers.length > 0 && (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-slate-900">Recent Deals in Database</h2>
              <Button to="/admin/offers" variant="outline" size="sm" icon={ArrowRight} iconPosition="right">
                Manage All
              </Button>
            </div>

            <div className="divide-y divide-slate-100">
              {stats.recentOffers.map((offer) => (
                <div key={offer._id} className="py-3.5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-12 h-12 rounded-xl object-contain p-1 bg-slate-50 border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-900 truncate">{offer.title}</p>
                      <p className="text-xs text-slate-500">
                        {offer.category} • {offer.offerPrice ? `₹${offer.offerPrice.toLocaleString('en-IN')}` : 'Special'}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-full shrink-0 ${
                      offer.isActive
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {offer.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
