import React, { useEffect } from 'react';
import GallerySection from '../sections/GallerySection';

const GalleryPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 md:pt-28 min-h-[80vh] bg-slate-900">
      <GallerySection isPreview={false} />
    </div>
  );
};

export default GalleryPage;
