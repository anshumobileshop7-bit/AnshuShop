import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Tag,
  Search,
  Sparkles,
  X,
  Save,
} from 'lucide-react';
import AdminHeader from '../../components/AdminHeader';
import ImageUploader from '../../components/ImageUploader';
import ConfirmModal from '../../components/ConfirmModal';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

const categories = ['Smartphones', 'Accessories', 'Audio', 'Festive Offer', 'EMI Deal', 'Special Deal'];

const initialForm = {
  title: '',
  description: '',
  category: 'Smartphones',
  image: '',
  originalPrice: '',
  offerPrice: '',
  ctaText: 'Inquire on WhatsApp',
  ctaLink: '',
  startDate: new Date().toISOString().split('T')[0],
  endDate: '',
  isActive: true,
  isFeatured: false,
  tags: '',
};

const AdminOffers = () => {
  const { toggleSidebar } = useOutletContext();
  const { showSuccess, showError } = useToast();

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [saving, setSaving] = useState(false);

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const res = await api.get('/offers?all=true');
      if (res.data?.success) {
        setOffers(res.data.data);
      }
    } catch (err) {
      showError('Failed to load offers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(initialForm);
    setSelectedFile(null);
    setPreviewUrl('');
    setModalOpen(true);
  };

  const handleOpenEdit = (offer) => {
    setEditingId(offer._id);
    setForm({
      title: offer.title || '',
      description: offer.description || '',
      category: offer.category || 'Smartphones',
      image: offer.image || '',
      originalPrice: offer.originalPrice ?? '',
      offerPrice: offer.offerPrice ?? '',
      ctaText: offer.ctaText || 'Inquire on WhatsApp',
      ctaLink: offer.ctaLink || '',
      startDate: offer.startDate ? new Date(offer.startDate).toISOString().split('T')[0] : '',
      endDate: offer.endDate ? new Date(offer.endDate).toISOString().split('T')[0] : '',
      isActive: offer.isActive ?? true,
      isFeatured: offer.isFeatured ?? false,
      tags: Array.isArray(offer.tags) ? offer.tags.join(', ') : '',
    });
    setSelectedFile(null);
    setPreviewUrl(offer.image || '');
    setModalOpen(true);
  };

  const handleToggleStatus = async (id) => {
    try {
      const res = await api.patch(`/admin/offers/${id}/toggle`);
      if (res.data?.success) {
        showSuccess(res.data.message);
        setOffers((prev) =>
          prev.map((o) => (o._id === id ? { ...o, isActive: !o.isActive } : o))
        );
      }
    } catch (err) {
      showError('Failed to toggle offer status');
    }
  };

  const handleDeletePrompt = (offer) => {
    setOfferToDelete(offer);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!offerToDelete) return;
    try {
      setDeleting(true);
      const res = await api.delete(`/admin/offers/${offerToDelete._id}`);
      if (res.data?.success) {
        showSuccess('Offer deleted successfully');
        setOffers((prev) => prev.filter((o) => o._id !== offerToDelete._id));
        setDeleteModalOpen(false);
      }
    } catch (err) {
      showError('Failed to delete offer');
    } finally {
      setDeleting(false);
      setOfferToDelete(null);
    }
  };

  const handleSaveOffer = async (e) => {
    e.preventDefault();
    if (!previewUrl && !selectedFile && !form.image) {
      showError('Please upload or provide an offer image');
      return;
    }

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('description', form.description);
      formData.append('category', form.category);
      if (form.originalPrice) formData.append('originalPrice', form.originalPrice);
      if (form.offerPrice) formData.append('offerPrice', form.offerPrice);
      formData.append('ctaText', form.ctaText);
      formData.append('ctaLink', form.ctaLink);
      if (form.startDate) formData.append('startDate', form.startDate);
      if (form.endDate) formData.append('endDate', form.endDate);
      formData.append('isActive', form.isActive);
      formData.append('isFeatured', form.isFeatured);
      formData.append('tags', form.tags);

      if (selectedFile) {
        formData.append('image', selectedFile);
      } else if (form.image) {
        formData.append('image', form.image);
      }

      let res;
      if (editingId) {
        res = await api.put(`/admin/offers/${editingId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        res = await api.post('/admin/offers', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      if (res.data?.success) {
        showSuccess(`Offer ${editingId ? 'updated' : 'created'} successfully!`);
        setModalOpen(false);
        fetchOffers();
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to save offer');
    } finally {
      setSaving(false);
    }
  };

  const filteredOffers = offers.filter((o) =>
    o.title?.toLowerCase().includes(search.toLowerCase()) ||
    o.category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <AdminHeader
        title="Offers & Discounts Management"
        subtitle="Create, edit, toggle and organize smartphone deals and accessory offers"
        onToggleSidebar={toggleSidebar}
      />

      {/* Action Bar */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search offers by title or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm bg-white"
          />
        </div>

        <Button
          onClick={handleOpenCreate}
          variant="primary"
          size="md"
          icon={Plus}
          className="w-full sm:w-auto"
        >
          Add New Offer
        </Button>
      </div>

      {/* Offers Table / Cards */}
      <div className="mt-6">
        {loading ? (
          <LoadingSpinner text="Loading offers list..." />
        ) : filteredOffers.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
            <Tag className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No offers found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Click the button above to create your first promotional offer.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                    <th className="py-3.5 px-4 sm:px-6">Offer Details</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Pricing</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {filteredOffers.map((offer) => (
                    <tr key={offer._id} className="hover:bg-slate-50/60 transition-colors">
                      {/* Title & Image */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="flex items-center gap-3.5">
                          <img
                            src={offer.image}
                            alt={offer.title}
                            className="w-14 h-14 rounded-xl object-contain p-1 border border-slate-200 shrink-0 bg-slate-50"
                          />
                          <div className="min-w-0 max-w-xs sm:max-w-md">
                            <div className="flex items-center gap-1.5 mb-1">
                              <span className="font-bold text-slate-900 leading-snug truncate">
                                {offer.title}
                              </span>
                              {offer.isFeatured && (
                                <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded">
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-slate-500 line-clamp-1">
                              {offer.description}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700">
                          {offer.category}
                        </span>
                      </td>

                      {/* Pricing */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {offer.offerPrice ? (
                          <div>
                            <span className="font-bold text-slate-900">
                              ₹{offer.offerPrice.toLocaleString('en-IN')}
                            </span>
                            {offer.originalPrice && offer.originalPrice > offer.offerPrice && (
                              <span className="text-xs text-slate-400 line-through ml-1.5">
                                ₹{offer.originalPrice.toLocaleString('en-IN')}
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-xs text-slate-500">Special Promo</span>
                        )}
                      </td>

                      {/* Active Status Switch */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(offer._id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                            offer.isActive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                        >
                          {offer.isActive ? (
                            <>
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Active</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" />
                              <span>Inactive</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(offer)}
                            className="p-2 rounded-lg text-slate-600 hover:text-brand-600 hover:bg-brand-50 transition-colors"
                            title="Edit Offer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeletePrompt(offer)}
                            className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Offer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Offer Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => !saving && setModalOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-2xl w-full p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                {editingId ? 'Edit Offer Details' : 'Create New Promotional Offer'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                disabled={saving}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveOffer} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Offer Title *
                </label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Flagship 5G Series — Mega Festive Exchange Deal"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Short Description *
                </label>
                <textarea
                  rows="2"
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Provide brief details on specifications, warranty, or bonuses included..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Search Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={form.tags}
                    onChange={(e) => setForm({ ...form, tags: e.target.value })}
                    placeholder="e.g. 5G Ready, Best Seller, EMI Deal"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                  />
                </div>
              </div>

              {/* Price Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Original Price (₹ MRP)
                  </label>
                  <input
                    type="number"
                    value={form.originalPrice}
                    onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                    placeholder="e.g. 29999"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-700 mb-1">
                    Offer / Deal Price (₹ Special)
                  </label>
                  <input
                    type="number"
                    value={form.offerPrice}
                    onChange={(e) => setForm({ ...form, offerPrice: e.target.value })}
                    placeholder="e.g. 24999"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-bold text-brand-700"
                  />
                </div>
              </div>

              {/* Image Upload */}
              <div className="pt-2">
                <ImageUploader
                  previewUrl={previewUrl}
                  onImageChange={(file) => {
                    setSelectedFile(file);
                    setPreviewUrl(URL.createObjectURL(file));
                  }}
                  label="Offer Photo *"
                  helpText="Clean smartphone or accessory banner"
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

              {/* CTA & Toggles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    CTA Button Label
                  </label>
                  <input
                    type="text"
                    value={form.ctaText}
                    onChange={(e) => setForm({ ...form, ctaText: e.target.value })}
                    placeholder="Inquire on WhatsApp"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Custom CTA Link (Optional)
                  </label>
                  <input
                    type="text"
                    value={form.ctaLink}
                    onChange={(e) => setForm({ ...form, ctaLink: e.target.value })}
                    placeholder="Auto WhatsApp if blank"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-3">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
                  />
                  <span>Active on Website</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-sm font-bold text-slate-800">
                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                    className="w-4 h-4 rounded text-brand-600 focus:ring-brand-500"
                  />
                  <span>Featured on Home Page</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => setModalOpen(false)}
                  disabled={saving}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  loading={saving}
                  icon={Save}
                >
                  {editingId ? 'Update Offer' : 'Publish Offer'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Offer?"
        message={`Are you sure you want to delete "${offerToDelete?.title}"? This offer will be permanently removed from the storefront.`}
        confirmText="Yes, Delete Offer"
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteModalOpen(false)}
        loading={deleting}
      />
    </div>
  );
};

export default AdminOffers;
