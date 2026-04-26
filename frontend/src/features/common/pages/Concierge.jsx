import React, { useEffect, useRef } from 'react';
import Navbar from '../../common/components/Navbar';
import { motion, useAnimation, useInView } from 'framer-motion';

const FadeInWhenVisible = ({ children, delay = 0, yOffset = 50 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay } }
      }}
      initial="hidden"
      animate={controls}
      className="h-full"
    >
      {children}
    </motion.div>
  );
};

const Concierge = () => {
  return (
    <div className="bg-[#131313] text-[#e5e2e1] min-h-screen font-manrope selection:bg-[#ffd700] selection:text-[#3a3000]">
      {/* TopNavBar */}
      <Navbar />

      {/* Main Content */}
      <main className="pt-32 pb-24 px-6 md:px-12 lg:px-24">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[#ffd700] font-bold tracking-[0.3em] uppercase text-[10px] mb-6 block"
              >
                Luxe Experience
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-[#fff6df] text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight mb-8"
              >
                The Art of <br/>Personal Service
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-[#d0c6ab] text-lg md:text-xl font-light leading-relaxed max-w-md"
              >
                Tailored expertise for the discerning few. From wardrobe curation to the procurement of rare artifacts, our concierge defines the modern pinnacle of service.
              </motion.p>
            </div>
            <FadeInWhenVisible yOffset={0}>
              <div className="relative h-[400px] md:h-[600px] rounded-xl overflow-hidden bg-[#1c1b1b]">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal" 
                  alt="Professional luxury concierge tailoring" 
                  src="https://images.unsplash.com/photo-1679101893304-045625840a94?q=80&w=1064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-transparent opacity-60"></div>
              </div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Services Grid */}
        <section className="max-w-7xl mx-auto mb-40">
          <FadeInWhenVisible>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <h2 className="text-[#d0c6ab] font-bold tracking-widest uppercase text-xs">Curated Offerings</h2>
              <div className="h-px flex-grow mx-8 bg-[#1c1b1b] hidden md:block"></div>
              <p className="text-[#d0c6ab] text-sm italic font-light">Refining the boundaries of possibility.</p>
            </div>
          </FadeInWhenVisible>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Private Styling */}
            <FadeInWhenVisible delay={0.1}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="group h-full p-10 bg-[#1c1b1b] rounded-xl transition-all duration-500 hover:bg-[#252424] relative overflow-hidden cursor-pointer"
              >
                <div className="mb-12">
                  <span className="material-symbols-outlined text-[#ffd700] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>straighten</span>
                </div>
                <h3 className="text-[#fff6df] text-2xl font-bold mb-4">Private Styling</h3>
                <p className="text-[#d0c6ab] leading-relaxed font-light">A dedicated specialist to curate your seasonal wardrobe, focusing on timeless silhouettes and rare textures.</p>
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[#ffd700] text-xs font-bold tracking-widest uppercase">Learn More</span>
                </div>
              </motion.div>
            </FadeInWhenVisible>

            {/* Exclusive Sourcing */}
            <FadeInWhenVisible delay={0.3}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="group h-full p-10 bg-[#1c1b1b] rounded-xl transition-all duration-500 hover:bg-[#252424] relative overflow-hidden cursor-pointer"
              >
                <div className="mb-12">
                  <span className="material-symbols-outlined text-[#ffd700] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>search_check</span>
                </div>
                <h3 className="text-[#fff6df] text-2xl font-bold mb-4">Exclusive Sourcing</h3>
                <p className="text-[#d0c6ab] leading-relaxed font-light">Access to the unattainable. We find the pieces others can't, from archival fashion to limited edition timepieces.</p>
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[#ffd700] text-xs font-bold tracking-widest uppercase">Learn More</span>
                </div>
              </motion.div>
            </FadeInWhenVisible>

            {/* Bespoke Tailoring */}
            <FadeInWhenVisible delay={0.5}>
              <motion.div 
                whileHover={{ y: -10 }}
                className="group h-full p-10 bg-[#1c1b1b] rounded-xl transition-all duration-500 hover:bg-[#252424] relative overflow-hidden cursor-pointer"
              >
                <div className="mb-12">
                  <span className="material-symbols-outlined text-[#ffd700] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>content_cut</span>
                </div>
                <h3 className="text-[#fff6df] text-2xl font-bold mb-4">Bespoke Tailoring</h3>
                <p className="text-[#d0c6ab] leading-relaxed font-light">Perfect fitment through our network of master artisans. Hand-stitched garments crafted specifically for your form.</p>
                <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[#ffd700] text-xs font-bold tracking-widest uppercase">Learn More</span>
                </div>
              </motion.div>
            </FadeInWhenVisible>
          </div>
        </section>

        {/* Inquiry Form */}
        <section className="max-w-4xl mx-auto">
          <FadeInWhenVisible yOffset={30}>
            <div className="bg-[#1c1b1b] rounded-xl p-8 md:p-16 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffd700]/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-[#fff6df] mb-4 tracking-tight">Initiate an Inquiry</h2>
                <p className="text-[#d0c6ab] font-light">Enter your details and a specialist will contact you within 24 hours.</p>
              </div>
              
              <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#d0c6ab] font-bold ml-1">Full Name</label>
                    <input 
                      className="w-full bg-[#131313] border-none rounded-xl py-4 px-6 text-[#fff6df] placeholder:text-[#d0c6ab]/30 focus:outline-none focus:ring-1 focus:ring-[#ffd700]/40 transition-all" 
                      placeholder="ALEXANDER VANCE" 
                      type="text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-[#d0c6ab] font-bold ml-1">Service Interest</label>
                    <select className="w-full bg-[#131313] border-none rounded-xl py-4 px-6 text-[#fff6df] focus:outline-none focus:ring-1 focus:ring-[#ffd700]/40 transition-all appearance-none cursor-pointer">
                      <option>Private Styling</option>
                      <option>Exclusive Sourcing</option>
                      <option>Bespoke Tailoring</option>
                      <option>General Concierge</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#d0c6ab] font-bold ml-1">Your Message</label>
                  <textarea 
                    className="w-full bg-[#131313] border-none rounded-xl py-4 px-6 text-[#fff6df] placeholder:text-[#d0c6ab]/30 focus:outline-none focus:ring-1 focus:ring-[#ffd700]/40 transition-all resize-none" 
                    placeholder="How may we assist you?" 
                    rows="4"
                  ></textarea>
                </div>
                <div className="pt-6 flex justify-center">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#ffd700] text-[#221b00] px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(255,215,0,0.15)] hover:shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all" 
                    type="submit"
                  >
                    Submit Inquiry
                  </motion.button>
                </div>
              </form>
            </div>
          </FadeInWhenVisible>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 md:py-16 px-6 md:px-12 bg-[#1c1b1b] mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-screen-2xl mx-auto gap-8">
          <div className="text-lg font-bold text-[#FFF6DF] tracking-[0.2em]">LUXE</div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a className="font-['Manrope'] text-[10px] tracking-widest font-medium uppercase text-[#D0C6AB]/60 hover:text-[#FFD700] transition-colors duration-300" href="#">PRIVACY</a>
            <a className="font-['Manrope'] text-[10px] tracking-widest font-medium uppercase text-[#D0C6AB]/60 hover:text-[#FFD700] transition-colors duration-300" href="#">TERMS</a>
            <a className="font-['Manrope'] text-[10px] tracking-widest font-medium uppercase text-[#D0C6AB]/60 hover:text-[#FFD700] transition-colors duration-300" href="#">MEMBERSHIP</a>
            <a className="font-['Manrope'] text-[10px] tracking-widest font-medium uppercase text-[#D0C6AB]/60 hover:text-[#FFD700] transition-colors duration-300" href="#">PRESS</a>
          </div>
          <div className="font-['Manrope'] text-[10px] tracking-widest font-medium uppercase text-[#D0C6AB]/60 text-center md:text-left">
            © 2026 LUXE HOUSE. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Concierge;
