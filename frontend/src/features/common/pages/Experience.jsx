import React, { useEffect } from 'react';
import Navbar from '../../common/components/Navbar';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';

const FadeInWhenVisible = ({ children, delay = 0, yOffset = 50 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
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
    >
      {children}
    </motion.div>
  );
};

const Experience = () => {
  return (
    <div className="bg-[#131313] text-[#e5e2e1] min-h-screen font-manrope selection:bg-[#ffd700] selection:text-[#3a3000]">
      {/* TopNavBar */}
      <Navbar />
      
      <main className="pt-32">
        {/* Hero Section: Editorial Scale */}
        <section className="px-6 md:px-12 mb-20 md:mb-40 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-7">
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-[#d0c6ab] font-bold tracking-[0.3em] text-[10px] uppercase mb-6"
              >
                Introduction
              </motion.p>
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-[#fff6df] text-[clamp(2.5rem,8vw,5.5rem)] font-extralight leading-[1.1] tracking-tighter mb-8 md:mb-12"
              >
                The Quiet <br/>Authority of <br/><span className="italic font-light">Elegance.</span>
              </motion.h1>
            </div>
            <div className="md:col-span-5 pb-8">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="text-[#d0c6ab] text-base md:text-lg font-light leading-relaxed max-w-md"
              >
                A curated journey into the heart of silent luxury, where every stitch and shadow tells a story of uncompromising dedication.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Main Editorial Image */}
        <FadeInWhenVisible yOffset={0}>
          <section className="w-full mb-20 md:mb-40 overflow-hidden px-4 md:px-0">
            <div className="relative h-[50vh] md:h-[819px] w-full max-w-[1920px] mx-auto rounded-xl md:rounded-none overflow-hidden">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                alt="Luxury fashion editorial" 
                className="w-full h-full object-cover grayscale opacity-80 brightness-75" 
                src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#131313] via-transparent to-[#131313] opacity-60"></div>
            </div>
          </section>
        </FadeInWhenVisible>

        {/* Craftsmanship: Asymmetric Layout */}
        <section className="px-6 md:px-12 mb-20 md:mb-40 max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
            <div className="order-2 md:order-1">
              <FadeInWhenVisible>
                <div className="bg-[#1c1b1b] p-10 md:p-16 rounded-xl relative overflow-hidden group">
                  <div className="absolute -right-12 -top-12 w-48 h-48 bg-[#ffd700]/5 rounded-full blur-3xl group-hover:bg-[#ffd700]/10 transition-all duration-700"></div>
                  <p className="text-[#ffd700] font-bold tracking-widest text-[10px] uppercase mb-8">Pillar I</p>
                  <h2 className="text-[#fff6df] text-3xl md:text-4xl font-light mb-8 tracking-tight">CRAFTSMANSHIP</h2>
                  <p className="text-[#d0c6ab] leading-loose text-sm font-light mb-12">
                    Our artisans work in silence, respecting the medium of raw luxury. Each piece undergoes a rigorous hundred-hour process of refinement, ensuring that the final result isn't just a product, but a testament to human capability. No seam is incidental; no texture is accidental.
                  </p>
                  <div className="flex items-center gap-4 text-[#ffd700] text-xs tracking-widest font-bold cursor-pointer hover:gap-6 transition-all">
                    <span>DISCOVER THE ATELIER</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </div>
                </div>
              </FadeInWhenVisible>
            </div>
            <div className="order-1 md:order-2 flex flex-col items-center md:items-start text-center md:text-left">
              <FadeInWhenVisible delay={0.2}>
                <h3 className="text-[#353534] text-[8rem] md:text-[10rem] font-bold leading-none select-none pointer-events-none opacity-20 hidden md:block">01</h3>
                <p className="text-[#e5e2e1] italic text-xl md:text-2xl font-light md:-mt-20 relative z-10 leading-snug max-w-sm">
                  "The hand of the maker is invisible, yet felt in every curve."
                </p>
              </FadeInWhenVisible>
            </div>
          </div>
        </section>

        {/* Exclusivity: Dark Minimalist Card */}
        <section className="px-6 md:px-12 mb-20 md:mb-40 max-w-screen-2xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <FadeInWhenVisible>
                <div className="h-full bg-[#1c1b1b] p-10 md:p-12 rounded-xl">
                  <span className="material-symbols-outlined text-[#ffd700] mb-8 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>workspace_premium</span>
                  <h3 className="text-[#fff6df] text-2xl font-light mb-6 tracking-tight">EXCLUSIVITY</h3>
                  <p className="text-[#d0c6ab] text-sm font-light leading-relaxed">
                    Access is not granted; it is recognized. We maintain a limited global production to ensure that owning a LUXE piece remains a distinction shared by only a few.
                  </p>
                </div>
              </FadeInWhenVisible>
            </div>
            <div className="flex-1">
              <FadeInWhenVisible delay={0.2}>
                <div className="h-full border-[#ffd700]/20 border-t md:border-t-0 md:border-l p-10 md:p-12 bg-[#131313]">
                  <span className="material-symbols-outlined text-[#ffd700] mb-8 text-3xl">history_edu</span>
                  <h3 className="text-[#fff6df] text-2xl font-light mb-6 tracking-tight">LEGACY</h3>
                  <p className="text-[#d0c6ab] text-sm font-light leading-relaxed">
                    We build for the centuries. Our pieces are designed to be heirloom-quality, carrying the weight of history into the future with timeless silhouettes.
                  </p>
                </div>
              </FadeInWhenVisible>
            </div>
          </div>
        </section>

        {/* Legacy Section: Centered Editorial */}
        <section className="px-6 md:px-12 mb-40 md:mb-60 max-w-screen-2xl mx-auto text-center">
          <FadeInWhenVisible>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-[#fff6df] text-4xl md:text-7xl font-extralight tracking-tighter mb-8 md:mb-12">The Future of <br className="hidden md:block"/>History.</h2>
              <p className="text-[#d0c6ab] text-sm md:text-base font-light leading-loose mb-12 md:mb-16">
                Legacy is not what is left behind, but what is carried forward. At LUXE, we bridge the gap between ancestral techniques and modern innovation, creating a continuum of excellence that defies the transience of trends.
              </p>
              <button className="bg-[#ffd700] text-[#221b00] px-10 md:px-12 py-4 md:py-5 rounded-full text-[10px] md:text-xs tracking-widest font-bold hover:scale-105 transition-transform duration-500 shadow-[0_0_40px_rgba(255,215,0,0.15)]">
                JOIN THE INNER CIRCLE
              </button>
            </div>
          </FadeInWhenVisible>
        </section>
      </main>

      {/* Footer (Simplified for this page) */}
      <footer className="w-full py-12 md:py-16 px-6 md:px-12 bg-[#1c1b1b]">
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-screen-2xl mx-auto gap-8">
          <div className="text-lg font-bold text-[#FFF6DF] tracking-[0.2em]">LUXE</div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8">
            <a className="font-['Manrope'] text-[10px] tracking-widest font-medium uppercase text-[#D0C6AB]/60 hover:text-[#FFD700] transition-colors duration-300" href="#">PRIVACY</a>
            <a className="font-['Manrope'] text-[10px] tracking-widest font-medium uppercase text-[#D0C6AB]/60 hover:text-[#FFD700] transition-colors duration-300" href="#">TERMS</a>
            <a className="font-['Manrope'] text-[10px] tracking-widest font-medium uppercase text-[#D0C6AB]/60 hover:text-[#FFD700] transition-colors duration-300" href="#">BOUTIQUES</a>
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

export default Experience;
