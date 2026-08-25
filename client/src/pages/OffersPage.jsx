import React, { useEffect } from 'react';
import OffersSection from '../sections/OffersSection';

const OffersPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 md:pt-28 min-h-[80vh]">
      <OffersSection isPreview={false} />
    </div>
  );
};

export default OffersPage;
