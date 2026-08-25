import React, { useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';
import Button from './Button';

const ImageUploader = ({
  previewUrl,
  onImageChange,
  onImageClear,
  label = 'Upload Image',
  helpText = 'Supports JPG, PNG, WEBP up to 10MB',
  className = '',
}) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && <label className="text-xs font-bold uppercase tracking-wider text-slate-600">{label}</label>}

      {previewUrl ? (
        <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 group bg-slate-900 aspect-video max-h-64 flex items-center justify-center">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              Change Image
            </Button>
            {onImageClear && (
              <Button
                variant="danger"
                size="sm"
                onClick={onImageClear}
              >
                Remove
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-slate-300 hover:border-brand-500 hover:bg-brand-50/40 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group"
        >
          <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 group-hover:scale-110 flex items-center justify-center mb-3 transition-transform">
            <UploadCloud className="w-6 h-6" />
          </div>
          <span className="text-sm font-semibold text-slate-800">
            Click to upload or drag & drop
          </span>
          <span className="text-xs text-slate-500 mt-1">{helpText}</span>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
