import React, { useEffect } from 'react';
import ContactSection from '../sections/ContactSection';

const ContactPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 md:pt-28 min-h-[80vh]">
      <ContactSection />
    </div>
  );
};

export default ContactPage;
