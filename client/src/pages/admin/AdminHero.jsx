import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Save, Image as ImageIcon, X, Plus, GripVertical } from 'lucide-react';
import AdminHeader from '../../components/AdminHeader';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import api from '../../services/api';
import { useShop } from '../../context/ShopContext';
import { useToast } from '../../context/ToastContext';

const AdminHero = () => {
  const { toggleSidebar } = useOutletContext();
  const { refreshShopData } = useShop();
  const { showSuccess, showError } = useToast();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // slides shape: { image: string|File, heading: string, subheading: string, buttonText: string, buttonLink: string, isNewImage: boolean }
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        setLoading(true);
        const res = await api.get('/hero');
        if (res.data?.success && res.data.data) {
          const fetchedSlides = res.data.data.slides || [];
          setSlides(fetchedSlides);
          
          // Fallback if DB was previously using banners array
          if (fetchedSlides.length === 0 && res.data.data.banners?.length > 0) {
             setSlides(res.data.data.banners.map(b => ({
               image: b, heading: '', subheading: '', buttonText: '', buttonLink: ''
             })));
          }
        }
      } catch (err) {
        showError('Failed to load hero section data');
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  const handleAddSlide = () => {
    if (slides.length >= 5) {
      showError('You can only have up to 5 slides.');
      return;
    }
    setSlides([...slides, { image: null, heading: '', subheading: '', buttonText: '', buttonLink: '', isNewImage: true }]);
  };

  const handleRemoveSlide = (index) => {
    setSlides(slides.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updated = [...slides];
    updated[index][field] = value;
    setSlides(updated);
  };

  const handleImageSelect = (index, file) => {
    if (!file) return;
    const updated = [...slides];
    updated[index].image = file;
    updated[index].isNewImage = true;
    setSlides(updated);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    // Validation
    const invalidSlide = slides.find(s => !s.image);
    if (invalidSlide) {
      showError('All slides must have an image.');
      return;
    }
    if (slides.length === 0) {
      showError('You must have at least one slide.');
      return;
    }

    try {
      setSaving(true);
      const formData = new FormData();
      
      const payloadData = slides.map(s => ({
        image: s.isNewImage ? '' : s.image, // Placeholder for backend
        heading: s.heading,
        subheading: s.subheading,
        buttonText: s.buttonText,
        buttonLink: s.buttonLink,
        isNewImage: s.isNewImage
      }));

      formData.append('slidesData', JSON.stringify(payloadData));

      // Append raw files
      slides.forEach((s) => {
        if (s.isNewImage && s.image) {
          formData.append('images', s.image);
        }
      });

      const res = await api.put('/admin/hero', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (res.data?.success) {
        showSuccess('Hero slider updated successfully!');
        if (res.data.data?.slides) {
          setSlides(res.data.data.slides);
        }
        await refreshShopData();
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to update hero slider');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading Hero editor..." />;
  }

  return (
    <div>
      <AdminHeader
        title="Hero Slider Details"
        subtitle="Manage up to 5 slides. Add text, buttons, and WhatsApp links directly onto your banners."
        onToggleSidebar={toggleSidebar}
      />

      <div className="mt-6 max-w-5xl">
        <form onSubmit={handleSave} className="space-y-6">
          {slides.map((slide, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 relative">
              <div className="absolute -left-3 top-6 bg-slate-800 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-md">
                {idx + 1}
              </div>
              
              <button
                type="button"
                onClick={() => handleRemoveSlide(idx)}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 ml-4">
                {/* Image Upload Column */}
                <div className="lg:col-span-5">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Slide Image</label>
                  <div className="relative rounded-xl overflow-hidden aspect-[16/9] border-2 border-dashed border-slate-300 hover:border-brand-500 bg-slate-50 transition-colors group cursor-pointer">
                    {slide.image ? (
                      <>
                        <img 
                          src={slide.isNewImage ? URL.createObjectURL(slide.image) : slide.image} 
                          alt={`Slide ${idx + 1}`} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-white font-semibold flex items-center gap-2">
                            <ImageIcon className="w-5 h-5" /> Change Image
                          </span>
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                        <Plus className="w-8 h-8 mb-2" />
                        <span className="text-sm font-semibold">Upload Image</span>
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => handleImageSelect(idx, e.target.files[0])}
                    />
                  </div>
                  <p className="text-xs text-slate-500 mt-2">Recommended: 1600x700 or 1920x840</p>
                </div>

                {/* Text Content Column */}
                <div className="lg:col-span-7 space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Heading (Optional)</label>
                    <input
                      type="text"
                      value={slide.heading}
                      onChange={(e) => handleChange(idx, 'heading', e.target.value)}
                      placeholder="e.g. Mega Festive Offer!"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Subheading (Optional)</label>
                    <textarea
                      value={slide.subheading}
                      onChange={(e) => handleChange(idx, 'subheading', e.target.value)}
                      placeholder="e.g. Get up to 50% off on premium smartphones."
                      rows="2"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Button Text</label>
                      <input
                        type="text"
                        value={slide.buttonText}
                        onChange={(e) => handleChange(idx, 'buttonText', e.target.value)}
                        placeholder="e.g. Shop Now"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-1">Button Link</label>
                      <input
                        type="text"
                        value={slide.buttonLink}
                        onChange={(e) => handleChange(idx, 'buttonLink', e.target.value)}
                        placeholder="https://wa.me/..."
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {slides.length < 5 && (
            <button
              type="button"
              onClick={handleAddSlide}
              className="w-full py-6 rounded-2xl border-2 border-dashed border-slate-300 text-slate-500 font-semibold hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" /> Add Another Slide
            </button>
          )}

          <div className="pt-6 border-t border-slate-200 flex justify-end">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={saving}
              icon={Save}
            >
              Save Hero Slider
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminHero;
