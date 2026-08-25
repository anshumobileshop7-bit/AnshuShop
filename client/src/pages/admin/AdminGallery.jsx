import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus, Trash2, Image as ImageIcon, X, UploadCloud, Save } from 'lucide-react';
import AdminHeader from '../../components/AdminHeader';
import ImageUploader from '../../components/ImageUploader';
import ConfirmModal from '../../components/ConfirmModal';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import api from '../../services/api';
import { useToast } from '../../context/ToastContext';

const galleryCategories = [
  'Store Interior',
  'Customer Moments',
  'New Stock',
  'Accessories Zone',
  'General',
];

const AdminGallery = () => {
  const { toggleSidebar } = useOutletContext();
  const { showSuccess, showError } = useToast();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    caption: '',
    category: 'Store Interior',
    image: '',
    order: 0,
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  // Delete modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [imageToDelete, setImageToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await api.get('/gallery');
      if (res.data?.success) {
        setImages(res.data.data);
      }
    } catch (err) {
      showError('Failed to load gallery images');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleOpenUpload = () => {
    setForm({
      caption: '',
      category: 'Store Interior',
      image: '',
      order: images.length + 1,
    });
    setSelectedFile(null);
    setPreviewUrl('');
    setModalOpen(true);
  };

  const handleUploadPhoto = async (e) => {
    e.preventDefault();
    if (!selectedFile && !form.image) {
      showError('Please select or provide an image');
      return;
    }

    try {
      setSaving(true);
      const formData = new FormData();
      formData.append('caption', form.caption);
      formData.append('category', form.category);
      formData.append('order', form.order);

      if (selectedFile) {
        formData.append('image', selectedFile);
      } else if (form.image) {
        formData.append('image', form.image);
      }

      const res = await api.post('/admin/gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data?.success) {
        showSuccess('Photo added to shop gallery!');
        setModalOpen(false);
        fetchGallery();
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to upload image');
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePrompt = (item) => {
    setImageToDelete(item);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!imageToDelete) return;
    try {
      setDeleting(true);
      const res = await api.delete(`/admin/gallery/${imageToDelete._id}`);
      if (res.data?.success) {
        showSuccess('Photo removed from gallery');
        setImages((prev) => prev.filter((img) => img._id !== imageToDelete._id));
        setDeleteModalOpen(false);
      }
    } catch (err) {
      showError('Failed to delete photo');
    } finally {
      setDeleting(false);
      setImageToDelete(null);
    }
  };

  return (
    <div>
      <AdminHeader
        title="Shop Photo Gallery Management"
        subtitle="Upload and manage high-quality photos of your store, smartphone displays, and customer moments"
        onToggleSidebar={toggleSidebar}
      />

      {/* Top Action Bar */}
      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-600">
          Total Photos: <span className="text-slate-900 font-bold">{images.length}</span>
        </p>

        <Button
          onClick={handleOpenUpload}
          variant="primary"
          size="md"
          icon={Plus}
        >
          Upload New Photo
        </Button>
      </div>

      {/* Gallery Grid */}
      <div className="mt-6">
        {loading ? (
          <LoadingSpinner text="Loading gallery photos..." />
        ) : images.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300">
            <ImageIcon className="w-12 h-12 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No photos in gallery</h3>
            <p className="text-xs text-slate-500 mt-1">
              Click the button above to upload shop photos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden group flex flex-col"
              >
                <div className="relative aspect-[4/3] bg-slate-900 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.caption || 'Shop photo'}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {item.category && (
                    <span className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-lg">
                      {item.category}
                    </span>
                  )}

                  <button
                    onClick={() => handleDeletePrompt(item)}
                    className="absolute top-3 right-3 p-2 rounded-xl bg-rose-600/90 text-white hover:bg-rose-700 shadow-md transition-colors"
                    title="Delete Photo"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <p className="text-xs sm:text-sm text-slate-700 font-medium line-clamp-2">
                    {item.caption || <span className="text-slate-400 italic">No caption provided</span>}
                  </p>

                  <span className="text-[10px] text-slate-400 mt-3 block">
                    Uploaded: {new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upload Photo Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => !saving && setModalOpen(false)}
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
          />

          <div className="relative bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full p-6 sm:p-8 z-10">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <h3 className="text-xl font-bold text-slate-900">
                Upload New Shop Photo
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                disabled={saving}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUploadPhoto} className="space-y-4">
              <ImageUploader
                previewUrl={previewUrl}
                onImageChange={(file) => {
                  setSelectedFile(file);
                  setPreviewUrl(URL.createObjectURL(file));
                }}
                label="Select Photo *"
                helpText="High-res store interior, counter, or stock photo"
              />

              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">
                  Or Image URL
                </label>
                <input
                  type="url"
                  value={form.image}
                  onChange={(e) => {
                    setForm({ ...form, image: e.target.value });
                    setPreviewUrl(e.target.value);
                  }}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Category Tag
                </label>
                <select
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm bg-white"
                >
                  {galleryCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Photo Caption (Optional)
                </label>
                <input
                  type="text"
                  value={form.caption}
                  onChange={(e) => setForm({ ...form, caption: e.target.value })}
                  placeholder="e.g. Latest 5G display demo counter"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-sm"
                />
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
                  icon={UploadCloud}
                >
                  Upload & Publish
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={deleteModalOpen}
        title="Delete Photo?"
        message="Are you sure you want to delete this photo from the shop gallery? This action cannot be reversed."
        confirmText="Yes, Delete Photo"
        onConfirm={handleConfirmDelete}
        onClose={() => setDeleteModalOpen(false)}
        loading={deleting}
      />
    </div>
  );
};

export default AdminGallery;
