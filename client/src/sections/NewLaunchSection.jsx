import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight, Zap } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import api from '../services/api';
import { useShop } from '../context/ShopContext';

const NewLaunchSection = () => {
  const [newLaunches, setNewLaunches] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getCleanWhatsApp } = useShop();

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        setLoading(true);
        // Fetch only smartphones, featured or newest
        const res = await api.get('/offers', { params: { category: 'Smartphones', featured: 'true' } });
        if (res.data?.success) {
          // Take top 2 for the new launch highlight
          setNewLaunches(res.data.data.slice(0, 2));
        }
      } catch (err) {
        console.error('Failed to load new launches:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLaunches();
  }, []);

  if (loading || newLaunches.length === 0) return null;

  return (
    <section className="py-20 sm:py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] bg-brand-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[60%] bg-rose-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeading
            badge="Just Arrived"
            title="Latest Smartphone Launches"
            subtitle="Be the first to experience the newest flagship devices with zero downpayment and exclusive launch offers."
            align="left"
            light={true}
            className="mb-0 max-w-2xl"
          />
          <Button
            to="/offers"
            variant="ghost"
            size="md"
            icon={ArrowRight}
            iconPosition="right"
            className="bg-gradient-to-r from-brand-500 to-blue-500 hover:from-brand-400 hover:to-blue-400 text-white shrink-0 self-start md:self-auto rounded-full px-8 py-3.5 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-1 font-bold border-none"
          >
            Explore All Phones
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {newLaunches.map((phone, idx) => (
            <motion.div
              key={phone._id || idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="group relative rounded-3xl overflow-hidden bg-slate-800 border border-slate-700 hover:border-brand-500/50 transition-colors duration-500 flex flex-col sm:flex-row"
            >
              {/* Image Section */}
              <div className="w-full sm:w-2/5 aspect-[4/3] sm:aspect-auto sm:min-h-[300px] relative overflow-hidden bg-slate-950">
                <img
                  src={phone.image}
                  alt={phone.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-rose-500 text-white shadow-lg shadow-rose-500/30 animate-pulse">
                    <Rocket className="w-3.5 h-3.5" /> New
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="w-full sm:w-3/5 p-6 sm:p-8 flex flex-col justify-center">
                <div className="flex flex-wrap gap-2 mb-4">
                  {phone.tags?.slice(0, 2).map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-bold tracking-wider uppercase text-brand-300 bg-brand-500/10 px-2.5 py-1 rounded-lg border border-brand-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight mb-3 group-hover:text-brand-400 transition-colors">
                  {phone.title}
                </h3>
                
                <p className="text-sm text-slate-400 leading-relaxed mb-6 line-clamp-2">
                  {phone.description}
                </p>

                <div className="mt-auto flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-0.5">Launch Price</p>
                    <p className="text-xl font-black text-white">
                      ₹{phone.offerPrice?.toLocaleString('en-IN') || phone.originalPrice?.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <Button
                    href={`https://wa.me/${getCleanWhatsApp()}?text=Hi%20Anshu%20Mobile,%20I%20am%20interested%20in%20the%20newly%20launched%20${encodeURIComponent(phone.title)}`}
                    variant="primary"
                    size="md"
                    className="shrink-0 shadow-lg shadow-brand-600/20 group-hover:bg-brand-500"
                  >
                    Inquire Now
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewLaunchSection;
