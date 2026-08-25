import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Save,
  Phone,
  MessageSquare,
  MapPin,
  Clock,
  Mail,
  Instagram,
  Facebook,
  Youtube,
  Lock,
  ExternalLink,
} from 'lucide-react';
import AdminHeader from '../../components/AdminHeader';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import api from '../../services/api';
import { useShop } from '../../context/ShopContext';
import { useToast } from '../../context/ToastContext';

const AdminSettings = () => {
  const { toggleSidebar } = useOutletContext();
  const { refreshShopData } = useShop();
  const { showSuccess, showError } = useToast();

  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);

  const [settingsForm, setSettingsForm] = useState({
    shopName: '',
    tagline: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    mapsUrl: '',
    openingHours: '',
    instagram: '',
    facebook: '',
    youtube: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const res = await api.get('/settings');
        if (res.data?.success && res.data.data) {
          const s = res.data.data;
          setSettingsForm({
            shopName: s.shopName || '',
            tagline: s.tagline || '',
            phone: s.phone || '',
            whatsapp: s.whatsapp || '',
            email: s.email || '',
            address: s.address || '',
            mapsUrl: s.mapsUrl || '',
            openingHours: s.openingHours || '',
            instagram: s.instagram || '',
            facebook: s.facebook || '',
            youtube: s.youtube || '',
          });
        }
      } catch (err) {
        showError('Failed to load shop settings');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    try {
      setSavingSettings(true);
      const res = await api.put('/admin/settings', settingsForm);
      if (res.data?.success) {
        showSuccess('Shop settings updated successfully!');
        await refreshShopData();
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to update settings');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showError('New passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      showError('Password must be at least 6 characters long');
      return;
    }

    try {
      setChangingPassword(true);
      const res = await api.put('/admin/change-password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      if (res.data?.success) {
        showSuccess('Admin password changed successfully!');
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to change password');
    } finally {
      setChangingPassword(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading shop settings..." />;
  }

  return (
    <div>
      <AdminHeader
        title="Contact & Store Settings"
        subtitle="Manage store identity, phone numbers, WhatsApp, business hours, and admin security"
        onToggleSidebar={toggleSidebar}
      />

      <div className="mt-6 max-w-4xl space-y-8">
        {/* Main Settings Form */}
        <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
            Shop Profile & Contact Information
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Shop Name *
              </label>
              <input
                type="text"
                required
                value={settingsForm.shopName}
                onChange={(e) => setSettingsForm({ ...settingsForm, shopName: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 text-sm font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Tagline / Motto
              </label>
              <input
                type="text"
                value={settingsForm.tagline}
                onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-brand-600" /> Phone Number (For Direct Calling) *
              </label>
              <input
                type="text"
                required
                value={settingsForm.phone}
                onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 text-sm font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600 fill-current" /> WhatsApp Number *
              </label>
              <input
                type="text"
                required
                value={settingsForm.whatsapp}
                onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                placeholder="+91 98765 43210"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 text-sm font-semibold"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-slate-500" /> Store Contact Email
              </label>
              <input
                type="email"
                value={settingsForm.email}
                onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                placeholder="contact@anshumobile.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-rose-500" /> Physical Store Address *
              </label>
              <textarea
                rows="2"
                required
                value={settingsForm.address}
                onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                placeholder="Shop number, building, landmark, area, city & pincode"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 text-sm resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Google Maps Link
              </label>
              <input
                type="url"
                value={settingsForm.mapsUrl}
                onChange={(e) => setSettingsForm({ ...settingsForm, mapsUrl: e.target.value })}
                placeholder="https://maps.google.com/..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" /> Store Opening Hours
              </label>
              <input
                type="text"
                value={settingsForm.openingHours}
                onChange={(e) => setSettingsForm({ ...settingsForm, openingHours: e.target.value })}
                placeholder="Mon - Sun: 10:00 AM – 09:30 PM (Open 7 Days)"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 text-sm"
              />
            </div>
          </div>

          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 pt-4">
            Social Media Handles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
                <Instagram className="w-3.5 h-3.5 text-pink-600" /> Instagram Profile
              </label>
              <input
                type="url"
                value={settingsForm.instagram}
                onChange={(e) => setSettingsForm({ ...settingsForm, instagram: e.target.value })}
                placeholder="https://instagram.com/..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
                <Facebook className="w-3.5 h-3.5 text-blue-600" /> Facebook Page
              </label>
              <input
                type="url"
                value={settingsForm.facebook}
                onChange={(e) => setSettingsForm({ ...settingsForm, facebook: e.target.value })}
                placeholder="https://facebook.com/..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1 flex items-center gap-1.5">
                <Youtube className="w-3.5 h-3.5 text-rose-600" /> YouTube Channel
              </label>
              <input
                type="url"
                value={settingsForm.youtube}
                onChange={(e) => setSettingsForm({ ...settingsForm, youtube: e.target.value })}
                placeholder="https://youtube.com/..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={savingSettings}
              icon={Save}
            >
              Save Store Settings
            </Button>
          </div>
        </form>

        {/* Change Admin Password */}
        <form onSubmit={handleChangePassword} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-4">
          <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
            <Lock className="w-4 h-4 text-brand-600" />
            <span>Change Admin Password</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Current Password *
              </label>
              <input
                type="password"
                required
                value={passwordForm.currentPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                placeholder="••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                New Password *
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                placeholder="Min 6 characters"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                Confirm New Password *
              </label>
              <input
                type="password"
                required
                minLength={6}
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                placeholder="Repeat new password"
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Button
              type="submit"
              variant="secondary"
              size="md"
              loading={changingPassword}
              icon={Lock}
            >
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminSettings;
