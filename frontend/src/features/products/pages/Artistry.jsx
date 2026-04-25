import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useProducts } from '../hook/useProducts';
import { useNavigate, useLocation } from 'react-router';

const ProductCard = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product.images || [];

  const handlePrev = (e) => {
    e.stopPropagation();
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="group flex flex-col cursor-pointer transition-transform hover:-translate-y-1 duration-500">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#1c1b1b]">
        {images.length > 0 ? (
          <img
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
            src={images[currentImageIndex].url}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-[#999077] gap-3">
             <span className="material-symbols-outlined text-4xl opacity-50">imagesmode</span>
             <span className="text-[0.6rem] uppercase tracking-[0.2em] font-bold opacity-50">Studio Shot Pending</span>
          </div>
        )}

        {/* Carousel Overlay */}
        {images.length > 1 && (
          <>
            <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={handlePrev}
                className="w-10 h-10 bg-[#131313]/80 backdrop-blur-md flex items-center justify-center text-[#fff6df] hover:text-[#ffd700] transition-colors"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 bg-[#131313]/80 backdrop-blur-md flex items-center justify-center text-[#fff6df] hover:text-[#ffd700] transition-colors"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`w-1.5 h-1.5 transition-colors ${
                    idx === currentImageIndex ? 'bg-[#ffd700]' : 'bg-[#d0c6ab]/30'
                  }`}
                ></span>
              ))}
            </div>
          </>
        )}
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-bold tracking-tight text-[#fff6df] uppercase line-clamp-1">{product.title}</h3>
        <p className="text-[#d0c6ab] text-sm mt-2 font-light line-clamp-1">{product.description || 'Elevated Essentials'}</p>
        <p className="text-[#ffd700] font-semibold mt-4 tracking-wider">
            {product.price?.currency} {product.price?.amount?.toLocaleString()}
        </p>
      </div>
    </div>
  );
};
const Artistry = () => {
  const { allProducts } = useSelector((state) => state.products);
  const user = useSelector((state) => state.auth.user);
  const { handleGetAllProducts } = useProducts();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    handleGetAllProducts();
  }, []);

  return (
    <div className="bg-[#131313] text-[#e5e2e1] min-h-screen font-manrope selection:bg-[#ffd700] selection:text-[#3a3000]">
      {/* TopNavBar */}
      <nav className="fixed top-0 w-full z-50 bg-[#131313]/95 backdrop-blur-md border-b border-[#1c1b1b]">
        <div className="flex justify-between items-center px-6 md:px-10 py-6 max-w-[1920px] mx-auto font-medium">
          <div 
            onClick={() => navigate('/')} 
            className="text-2xl uppercase font-black tracking-[0.2em] text-[#ffd700] cursor-pointer hover:opacity-80 transition-opacity"
          >
            Luxe.
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-[0.7rem] uppercase tracking-widest font-bold">
            <a onClick={() => navigate('/')} className="text-[#fff6df] opacity-60 hover:text-[#ffd700] cursor-pointer transition-colors duration-300">Collections</a>
            <a className="text-[#ffd700] border-b-2 border-[#ffd700] pb-1 cursor-pointer transition-colors duration-300 pointer-events-none">Artistry</a>
            <a className="text-[#fff6df] opacity-60 hover:text-[#ffd700] cursor-pointer transition-colors duration-300">Experience</a>
            <a className="text-[#fff6df] opacity-60 hover:text-[#ffd700] cursor-pointer transition-colors duration-300">Concierge</a>
          </div>
          
          <div className="flex items-center gap-6">
            {!user ? (
                <>
                    <button 
                      onClick={() => navigate('/login')}
                      className="text-[#FFF6DF] text-xs font-bold uppercase tracking-widest opacity-60 hover:text-[#ffd700] hover:opacity-100 transition-colors duration-300 cursor-pointer"
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => navigate('/register')}
                      className="bg-[#ffd700] text-[#3a3000] px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,215,0,0.2)] cursor-pointer"
                    >
                      Join
                    </button>
                </>
            ) : (
                <button 
                  onClick={() => navigate(user.role === 'seller' ? '/seller/dashboard' : '/')}
                  className="bg-[#ffd700] text-[#3a3000] px-8 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,215,0,0.2)] cursor-pointer"
                >
                  Dashboard
                </button>
            )}
          </div>
        </div>
      </nav>

      <main className="pt-40 pb-24 px-8 max-w-[1600px] mx-auto">
        {/* Editorial Header */}
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <p className="text-[0.75rem] uppercase tracking-[0.3em] text-[#d0c6ab] font-bold mb-4">Curated Selection / Vol. 04</p>
            <h1 className="text-[2.75rem] leading-none font-extrabold tracking-tighter text-[#fff6df] font-display">THE ARTISTRY SERIES</h1>
          </div>
          <div className="text-right">
            <p className="text-[#d0c6ab] text-[0.75rem] uppercase tracking-widest max-w-[200px] leading-relaxed">
              Sculptural objects designed for the modern sanctuary.
            </p>
          </div>
        </header>

        {/* Product Grid */}
        {allProducts && allProducts.length > 0 ? (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
            {allProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </section>
        ) : (
          <div className="w-full py-32 flex flex-col items-center justify-center border border-[#1c1b1b] bg-[#1c1b1b]/20">
            <span className="material-symbols-outlined text-4xl text-[#4d4732] mb-6">view_in_ar</span>
            <p className="text-[#d0c6ab] text-xs max-w-sm text-center uppercase tracking-[0.2em] font-bold">The artistry series is currently being curated.</p>
          </div>
        )}

        {/* Newsletter Section (Editorial Inset) */}
        <section className="mt-48 bg-[#1c1b1b] p-12 md:p-24 flex flex-col items-center text-center">
          <span className="material-symbols-outlined text-[#ffd700] text-4xl mb-8">mail</span>
          <h2 className="text-3xl font-bold tracking-tight text-[#fff6df] mb-6 uppercase">Private Access</h2>
          <p className="text-[#d0c6ab] max-w-lg mb-12 leading-relaxed">
            Join our collective to receive exclusive early access to the upcoming 'Celestial' collection.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-md flex flex-col md:flex-row gap-4">
            <input 
              className="flex-1 bg-[#2a2a2a] border-none text-[#e5e2e1] px-6 py-4 focus:ring-1 focus:ring-[#ffd700]/40 outline-none" 
              placeholder="Email Address" 
              type="email"
            />
            <button className="bg-[#ffd700] text-[#3a3000] px-8 py-4 font-bold uppercase tracking-widest text-xs transition-transform active:scale-95 cursor-pointer">
                Subscribe
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1C1B1B] w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-xl font-black text-[#FFF6DF] uppercase tracking-[0.2em]">Luxe.</div>
        <div className="flex gap-8 items-center">
          <a className="font-manrope text-[10px] uppercase tracking-widest text-[#D0C6AB] hover:text-[#FFD700] underline-offset-4 hover:underline transition-opacity opacity-80 hover:opacity-100 cursor-pointer">Sustainability</a>
          <a className="font-manrope text-[10px] uppercase tracking-widest text-[#D0C6AB] hover:text-[#FFD700] underline-offset-4 hover:underline transition-opacity opacity-80 hover:opacity-100 cursor-pointer">Contact</a>
          <a className="font-manrope text-[10px] uppercase tracking-widest text-[#D0C6AB] hover:text-[#FFD700] underline-offset-4 hover:underline transition-opacity opacity-80 hover:opacity-100 cursor-pointer">Shipping</a>
          <a className="font-manrope text-[10px] uppercase tracking-widest text-[#D0C6AB] hover:text-[#FFD700] underline-offset-4 hover:underline transition-opacity opacity-80 hover:opacity-100 cursor-pointer">Legal</a>
        </div>
        <div className="font-manrope text-[10px] uppercase tracking-widest text-[#D0C6AB] opacity-60">
          © {new Date().getFullYear()} LUXE. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default Artistry;