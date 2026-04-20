import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
// import { useProducts } from '../hook/useProducts'; // Uncomment if using create hook

export default function CreateProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priceAmount: '',
    priceCurrency: 'USD',
  });

  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    // Collect the selected files
    const files = Array.from(e.target.files);
    // Prevent adding more than 7 total images
    setImages((prev) => [...prev, ...files].slice(0, 7));
  };

  const handleRemoveImage = (e, indexToRemove) => {
    e.stopPropagation(); // Prevent opening file dialog
    setImages((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Publishing Product: ", formData, "Images:", images);
    // Add useProducts integration here
    
  };

  return (
    <div className="bg-[#131313] text-[#e5e2e1] selection:bg-[#ffd700] selection:text-[#705e00] min-h-screen flex flex-col font-manrope">
      
      {/* TopAppBar Navigation Shell */}
      <header className="w-full top-0 sticky bg-[#131313] z-50">
        <div className="flex justify-between items-center px-8 py-6 w-full max-w-screen-2xl mx-auto">
          <div 
            onClick={() => navigate('/')} 
            className="text-2xl font-black tracking-[0.2em] text-[#FFF6DF] cursor-pointer hover:opacity-80 transition-opacity"
          >
            LUXE.
          </div>
          <div className="flex items-center gap-8">
            <button 
              onClick={() => navigate(-1)}
              className="text-[#D0C6AB] font-manrope text-[0.75rem] uppercase tracking-widest hover:text-[#FFD700] transition-colors duration-300 scale-95 active:opacity-80 cursor-pointer"
            >
              Cancel
            </button>
            <button 
              className="bg-[#ffd700] text-[#3a3000] px-8 py-3 rounded-full font-manrope text-[0.75rem] uppercase tracking-widest font-bold hover:opacity-90 transition-all scale-95 active:opacity-80 cursor-pointer"
            >
              Save Draft
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center px-6 py-12 md:py-24 relative overflow-hidden">
        
        {/* Editorial Header Section */}
        <div className="w-full max-w-4xl mb-20 text-center md:text-left relative z-10">
          <span className="text-[0.7rem] uppercase tracking-[0.4em] text-[#999077] mb-4 block">New Exhibition Entry</span>
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tighter text-[#fff6df] leading-tight">
            Curate Your <br /> <span className="italic font-serif opacity-80">Masterpiece</span>
          </h1>
        </div>

        {/* Centralized Form Container */}
        <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-24 pb-32 relative z-10">
          
          {/* Section 1: Core Identity */}
          <section className="space-y-12">
            <div className="group relative">
              <label className="text-[0.65rem] uppercase tracking-widest text-[#d0c6ab] font-bold absolute -top-6 left-0 opacity-60 group-focus-within:opacity-100 transition-opacity">Product Title</label>
              <input 
                type="text" 
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-transparent border-0 border-b border-[#4d4732] py-6 text-3xl md:text-4xl font-light tracking-tight placeholder:text-[#353534] outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-[#ffd700] transition-colors duration-500" 
                placeholder="The Minimalist's Silhouette" 
                required
              />
            </div>
            <div className="group relative">
              <label className="text-[0.65rem] uppercase tracking-widest text-[#d0c6ab] font-bold absolute -top-6 left-0 opacity-60 group-focus-within:opacity-100 transition-opacity">The Narrative</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full bg-transparent border-0 border-b border-[#4d4732] py-6 text-xl font-light leading-relaxed placeholder:text-[#353534] outline-none focus:outline-none focus:ring-0 focus:ring-offset-0 focus:border-[#ffd700] transition-colors duration-500 resize-none" 
                placeholder="Describe the soul of this creation..." 
                rows="4"
                required
              ></textarea>
            </div>
          </section>

          {/* Section 2: Visual Portfolio */}
          <section className="space-y-8">
            <div className="flex justify-between items-end">
              <h2 className="text-[0.75rem] uppercase tracking-widest text-[#d0c6ab] font-medium">Visual Gallery (0/7)</h2>
              <span className="text-[0.6rem] text-[#999077] italic">High-resolution recommended (min 2000px)</span>
            </div>
            
            {/* Hidden File Input */}
            <input 
              type="file" 
              multiple 
              accept="image/*" 
              ref={fileInputRef} 
              onChange={handleImageChange} 
              className="hidden" 
            />

            {/* Asymmetric Bento Grid for Uploads */}
            <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] gap-4">
              {/* Main Feature Slot */}
              <div 
                onClick={handleImageClick}
                className="col-span-2 row-span-2 rounded-xl bg-[#1c1b1b] border border-dashed border-[#4d4732] flex flex-col items-center justify-center group hover:bg-[#201f1f] transition-all cursor-pointer overflow-hidden relative"
              >
                {images[0] ? (
                  <>
                    <img src={URL.createObjectURL(images[0])} alt="Feature" className="w-full h-full object-cover" />
                      <button
                      type="button"
                      onClick={(e) => handleRemoveImage(e, 0)}
                      className="absolute top-3 right-3 text-[#e5e2e1] hover:text-[#ffd700] opacity-0 group-hover:opacity-100 transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center hover:scale-110 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[24px]">close</span>
                    </button>
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-4xl text-[#999077] mb-4 group-hover:text-[#ffd700] transition-colors">add_photo_alternate</span>
                    <p className="text-[0.7rem] uppercase tracking-tighter text-[#999077] group-hover:text-[#e5e2e1]">Primary Perspective</p>
                  </>
                )}
              </div>
              
              {/* Secondary Slots */}
              {[...Array(6)].map((_, index) => {
                const imageIndex = index + 1;
                const imageFile = images[imageIndex];
                return (
                  <div 
                    key={index}
                    onClick={handleImageClick} 
                    className="rounded-xl bg-[#1c1b1b] border border-dashed border-[#4d4732] flex items-center justify-center group hover:bg-[#201f1f] transition-all cursor-pointer overflow-hidden relative"
                  >
                    {imageFile ? (
                      <>
                        <img src={URL.createObjectURL(imageFile)} alt={`Slot ${imageIndex}`} className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={(e) => handleRemoveImage(e, imageIndex)}
                          className="absolute top-2 right-2 text-[#e5e2e1] hover:text-[#ffd700] opacity-0 group-hover:opacity-100 transition-all duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex items-center justify-center hover:scale-110 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[20px]">close</span>
                        </button>
                      </>
                    ) : (
                      <span className="material-symbols-outlined text-[#999077] group-hover:text-[#ffd700]">add</span>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3: Valuation */}
          <section className="max-w-md">
             <div className="group relative">
                <label className="text-[0.65rem] uppercase tracking-widest text-[#d0c6ab] font-bold absolute -top-6 left-0 opacity-60 group-focus-within:opacity-100 transition-opacity">Value Assessment</label>
                <div className="flex items-center gap-4 bg-[#1c1b1b] rounded-xl px-6 py-4 focus-within:ring-1 ring-[#ffd700]/40 transition-all">
                   <select 
                     name="priceCurrency"
                     value={formData.priceCurrency}
                     onChange={handleChange}
                     className="bg-transparent text-[#ffd700] text-lg font-medium border-none focus:ring-0 cursor-pointer appearance-none outline-none focus:outline-none"
                   >
                       <option value="USD" className="bg-[#131313]">USD</option>
                       <option value="EUR" className="bg-[#131313]">EUR</option>
                       <option value="GBP" className="bg-[#131313]">GBP</option>
                       <option value="INR" className="bg-[#131313]">INR</option>
                   </select>
                   <div className="h-8 w-[1px] bg-[#4d4732]"></div>
                   <input 
                     type="number" 
                     name="priceAmount"
                     value={formData.priceAmount}
                     onChange={handleChange}
                     className="w-full bg-transparent border-none text-2xl font-light placeholder:text-[#353534] focus:ring-0 outline-none focus:outline-none" 
                     placeholder="0.00" 
                     required
                   />
                </div>
             </div>
          </section>

          {/* Final Action Section */}
          <section className="pt-12 border-t border-[#4d4732]/30 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#2a2a2a] flex items-center justify-center shrink-0">
                 <span className="material-symbols-outlined text-[#ffd700] text-sm">info</span>
              </div>
              <div>
                 <p className="text-xs text-[#e5e2e1] font-medium uppercase tracking-widest mb-1.5">Submission Standards</p>
                 <p className="text-[0.65rem] text-[#999077] max-w-[240px] leading-relaxed">All luxury items undergo a 24-hour verification process to ensure authenticity and quality.</p>
              </div>
            </div>
            
            <button 
              type="submit"
              className="w-full md:w-auto bg-[#ffd700] text-[#3a3000] px-12 py-5 rounded-full font-bold tracking-[0.2em] uppercase text-[0.75rem] shadow-[0_0_40px_rgba(255,215,0,0.1)] hover:shadow-[0_0_60px_rgba(255,215,0,0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
            >
                Publish to Gallery
            </button>
          </section>
        </form>

        {/* Editorial Accent Image */}
        <div className="absolute right-0 top-1/4 -translate-y-1/2 hidden xl:block w-[300px] pointer-events-none opacity-20">
           <div className="relative overflow-hidden rounded-l-[100px] h-[600px]">
               <img 
                 className="w-full h-full object-cover" 
                 alt="abstract artistic sculpture with golden accents" 
                 src="https://lh3.googleusercontent.com/aida-public/AB6AXuANSTCxAlKh4yrBQhrhII4evQrAt0U-EiCDOpez9V1evD95CYceF2zittePTWRU3uV-YzdXyRrwVfzR_NKZ5i67cZSvTLT2-uRjmFRE-pcIuUvXLpvoy5xeRBV7WbWMDTp7bc7DFv41hpN9kXqSI4BQhQIwlc3CqKnsF6t-cJHUVlhapb2OSZLapJCxSKsvWuXugcTUl857Kmnbrz8s--KD8SXY3QFEMg6e4JIadJLwD7_QAbnpoi7GkfjMED5_h5R01LrHJMNxzLk"
               />
               <div className="absolute inset-0 bg-gradient-to-l from-[#131313] to-transparent"></div>
           </div>
        </div>

      </main>
      
      {/* Footer Credit */}
      <footer className="p-8 text-center relative z-10 border-t border-[#4d4732]/10 mt-auto">
         <p className="text-[0.6rem] uppercase tracking-[0.5em] text-[#999077] opacity-40">The Luxe Standard © 2024</p>
      </footer>
    </div>
  );
}
