import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Save, Plus, Trash2, ShieldCheck, Image as ImageIcon } from 'lucide-react';
import AdminHeader from '../../components/AdminHeader';
import ImageUploader from '../../components/ImageUploader';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import api from '../../services/api';
import { useShop } from '../../context/ShopContext';
import { useToast } from '../../context/ToastContext';

const AdminAbout = () => {
  const { toggleSidebar } = useOutletContext();
  const { refreshShopData } = useShop();
  const { showSuccess, showError } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const [form, setForm] = useState({
    title: '',
    subtitle: '',
    description: '',
    experienceYears: '',
    happyCustomers: '',
    smartphonesSold: '',
    image: '',
    whyChooseUs: [],
  });

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const res = await api.get('/about');
        if (res.data?.success && res.data.data) {
          const data = res.data.data;
          setForm({
            title: data.title || '',
            subtitle: data.subtitle || '',
            description: data.description || '',
            experienceYears: data.experienceYears || '7+ Years Experience',
            happyCustomers: data.happyCustomers || '10,000+ Happy Customers',
            smartphonesSold: data.smartphonesSold || '15,000+ Devices Delivered',
            image: data.image || '',
            whyChooseUs: data.whyChooseUs || [],
          });
          setPreviewUrl(data.image || '');
        }
      } catch (err) {
        showError('Failed to load About data');
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  const handleAddFeature = () => {
    setForm((prev) => ({
      ...prev,
      whyChooseUs: [
        ...prev.whyChooseUs,
        {
          title: 'New Trust Feature',
          description: 'Detailed customer benefit explanation.',
          icon: 'ShieldCheck',
        },
      ],
    }));
  };

  const handleRemoveFeature = (index) => {
    setForm((prev) => ({
      ...prev,
      whyChooseUs: prev.whyChooseUs.filter((_, i) => i !== index),
    }));
  };

  const handleFeatureChange = (index, field, value) => {
    setForm((prev) => {
      const updated = [...prev.whyChooseUs];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, whyChooseUs: updated };
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('subtitle', form.subtitle);
      formData.append('description', form.description);
      formData.append('experienceYears', form.experienceYears);
      formData.append('happyCustomers', form.happyCustomers);
      formData.append('smartphonesSold', form.smartphonesSold);
      formData.append('whyChooseUs', JSON.stringify(form.whyChooseUs));

      if (selectedFile) {
        formData.append('image', selectedFile);
      } else {
        formData.append('image', form.image);
      }

      const res = await api.put('/admin/about', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data?.success) {
        showSuccess('About section updated successfully!');
        if (res.data.data?.image) {
          setForm((prev) => ({ ...prev, image: res.data.data.image }));
          setPreviewUrl(res.data.data.image);
          setSelectedFile(null);
        }
        await refreshShopData();
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to update about section');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading About section editor..." />;
  }

  return (
    <div>
      <AdminHeader
        title="About & Trust Management"
        subtitle="Manage shop narrative, trust stats, guarantee points, and store picture"
        onToggleSidebar={toggleSidebar}
      />

      <div className="mt-6 max-w-4xl">
        <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 sm:p-8 space-y-6">
          {/* Main Story Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                About Heading *
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Your Trusted Mobile Store"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 font-bold text-slate-900 text-base"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Subheading / Mission Line
              </label>
              <input
                type="text"
                value={form.subtitle}
                onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                placeholder="Providing genuine smartphones, original accessories & customer support..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Full Shop Story / Description *
              </label>
              <textarea
                rows="4"
                required
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Write about how Anshu Mobile World helps customers find genuine phones..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm resize-none"
              />
            </div>
          </div>

          {/* Trust Metric Counters */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-3">
              Trust & Experience Metrics
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Years in Business</label>
                <input
                  type="text"
                  value={form.experienceYears}
                  onChange={(e) => setForm({ ...form, experienceYears: e.target.value })}
                  placeholder="7+ Years Experience"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Happy Customers</label>
                <input
                  type="text"
                  value={form.happyCustomers}
                  onChange={(e) => setForm({ ...form, happyCustomers: e.target.value })}
                  placeholder="10,000+ Happy Customers"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Smartphones Sold</label>
                <input
                  type="text"
                  value={form.smartphonesSold}
                  onChange={(e) => setForm({ ...form, smartphonesSold: e.target.value })}
                  placeholder="15,000+ Devices Delivered"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold"
                />
              </div>
            </div>
          </div>

          {/* Shop Photo */}
          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-brand-600" />
              <span>About Section Store Picture</span>
            </h3>

            <ImageUploader
              previewUrl={previewUrl}
              onImageChange={(file) => {
                setSelectedFile(file);
                setPreviewUrl(URL.createObjectURL(file));
              }}
              label="Storefront / Counter Image"
              helpText="High-quality photo of your shop or team"
            />

            <div className="mt-2">
              <input
                type="url"
                value={form.image}
                onChange={(e) => {
                  setForm({ ...form, image: e.target.value });
                  setPreviewUrl(e.target.value);
                }}
                placeholder="Or enter image URL (https://...)"
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>
          </div>

          {/* Why Choose Us Features */}
          <div className="pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Why Choose Us (Trust Features)</span>
              </h3>

              <Button
                type="button"
                onClick={handleAddFeature}
                variant="outline"
                size="sm"
                icon={Plus}
              >
                Add Feature
              </Button>
            </div>

            <div className="space-y-3">
              {form.whyChooseUs.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-4"
                >
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                        Feature Title
                      </label>
                      <input
                        type="text"
                        value={feature.title}
                        onChange={(e) => handleFeatureChange(idx, 'title', e.target.value)}
                        placeholder="e.g. 100% Genuine Products"
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                        Feature Description
                      </label>
                      <input
                        type="text"
                        value={feature.description}
                        onChange={(e) => handleFeatureChange(idx, 'description', e.target.value)}
                        placeholder="Short description of this advantage..."
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(idx)}
                    className="p-2 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors mt-4"
                    title="Remove Feature"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={saving}
              icon={Save}
            >
              Save About Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminAbout;
