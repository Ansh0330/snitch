import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useProducts } from '../hook/useProducts';
import { useNavigate } from 'react-router';

const Home = () => {
  const { allProducts } = useSelector((state) => state.products);
  const user = useSelector((state) => state.auth.user);
  const { handleGetAllProducts } = useProducts();
  const navigate = useNavigate();

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
            className="text-2xl font-black tracking-[0.2em] text-[#ffd700] cursor-pointer hover:opacity-80 transition-opacity"
          >
            LUXE.
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-[0.7rem] uppercase tracking-widest font-bold">
            <a className="text-[#ffd700] border-b-2 border-[#ffd700] pb-1 cursor-pointer transition-colors duration-300 pointer-events-none">Collections</a>
            <a onClick={() => navigate('/artistry')} className="text-[#fff6df] opacity-60 hover:text-[#ffd700] cursor-pointer transition-colors duration-300">Artistry</a>
            <a onClick={() => navigate('/experience')} className="text-[#fff6df] opacity-60 hover:text-[#ffd700] cursor-pointer transition-colors duration-300">Experience</a>
            <a onClick={() => navigate('/concierge')} className="text-[#fff6df] opacity-60 hover:text-[#ffd700] cursor-pointer transition-colors duration-300">Concierge</a>
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

      <main>
        {/* Editorial Hero Section */}
        <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-[#131313]">
          <div className="absolute inset-0 z-0">
            <img 
              alt="Editorial abstract gold silk" 
              className="w-full h-full object-cover opacity-60" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBsyBcrUFsyMsi7MV4yQYriRLJMoo4v4kWrwWreS1axMXhcuO-3sDXOXuLrnB6ubALbxNXk5_K1PTTIqZjiYVMcGToOB7U_kfwoJUQC7fi80Y8gdYlXC2SjDw_twibyZNoCulrdtTmgLsy1SNGEJiqoFzBFuuQWVRfZdRHwgaUObRyMw9GFuCczzrIhEph49deufbVd5x5KwYChHG51eM8sc_JlANAsFcX5BVb4vSoiZbnB2cjUKnO3kKFHxvuTQrNkhc1mkMS2YU"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-transparent to-[#131313] opacity-90"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#131313_100%)]"></div>
          </div>
          
          <div className="relative z-10 text-center px-6">
            <p className="text-[0.65rem] uppercase tracking-[0.6em] text-[#d0c6ab] mb-6 font-bold drop-shadow-2xl">Limited Release</p>
            <h1 className="text-6xl md:text-[7rem] font-extrabold tracking-tighter leading-[1] text-[#fff6df] drop-shadow-2xl">
                New Pre-Fall<br/>Collection
            </h1>
            <div className="mt-16 flex flex-col items-center gap-6">
              <div className="w-[1px] h-32 bg-gradient-to-b from-[#ffd700] to-transparent"></div>
              <p className="max-w-md text-[#d0c6ab] text-[0.65rem] tracking-[0.3em] uppercase font-bold drop-shadow-lg">
                Elevated Essentials For Luxe
              </p>
            </div>
          </div>
        </section>

        {/* Dynamic Product Grid Section */}
        <section className="max-w-[1920px] mx-auto px-6 md:px-10 py-32 bg-[#131313]">
          <div className="flex flex-col md:flex-row justify-between md:items-end mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-[#fff6df]">The Curated Edit</h2>
              <div className="h-0.5 w-16 bg-[#ffd700]"></div>
            </div>
            {allProducts?.length > 0 && (
                <button className="text-[#d0c6ab] text-[0.65rem] uppercase tracking-[0.3em] font-bold border-b border-[#4d4732] pb-1 hover:text-[#ffd700] hover:border-[#ffd700] transition-all cursor-pointer self-start md:self-auto">
                    Explore All Pieces
                </button>
            )}
          </div>

          {allProducts && allProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-[#1c1b1b]">
                {allProducts.map((product) => (
                  <article key={product._id} className="group relative aspect-[3/4] bg-[#1c1b1b] border-r border-b border-[#4d4732]/20 overflow-hidden cursor-pointer">
                    {product.images && product.images.length > 0 ? (
                        <img 
                          alt={product.title} 
                          className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" 
                          src={product.images[0].url}
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-[#999077] gap-3">
                           <span className="material-symbols-outlined text-4xl opacity-50">imagesmode</span>
                           <span className="text-[0.6rem] uppercase tracking-[0.2em] font-bold opacity-50">Studio Shot Pending</span>
                        </div>
                    )}
                    
                    {/* Hover Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Meta Payload */}
                    <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-[0.55rem] uppercase tracking-[0.3em] font-bold text-[#d0c6ab] mb-2">{new Date(product.createdAt).toLocaleDateString(undefined, { year: 'numeric' })}</p>
                      <h3 className="text-2xl font-light text-[#fff6df] tracking-tight mb-2 line-clamp-1">{product.title}</h3>
                      <p className="text-[#ffd700] font-bold text-lg tracking-widest">{product.price?.currency} {product.price?.amount?.toLocaleString()}</p>
                      
                      <button className="mt-8 w-full py-4 text-[0.65rem] uppercase tracking-[0.3em] font-bold bg-[#ffd700] text-[#3a3000] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98]">
                         <span>View Details</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
          ) : (
             <div className="w-full py-32 flex flex-col items-center justify-center border border-[#1c1b1b] bg-[#1c1b1b]/20">
                <span className="material-symbols-outlined text-4xl text-[#4d4732] mb-6">view_in_ar</span>
                <p className="text-[#d0c6ab] text-xs max-w-sm text-center uppercase tracking-[0.2em] font-bold">The showroom is currently being curated.</p>
             </div>
          )}
        </section>

        {/* Signature Brand Moment */}
        <section className="bg-[#1c1b1b] py-32 px-10 border-t border-[#4d4732]/20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <span className="material-symbols-outlined text-[#ffd700] text-5xl opacity-80" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-[#fff6df]">Luxe Is Not Heard. It Is Felt.</h2>
            <p className="text-[#d0c6ab] max-w-2xl mx-auto leading-relaxed font-light text-sm md:text-base">
              Our philosophy centers on the surgical application of craftsmanship. Every piece in the Pre-Fall collection is a testament to the power of pure restraint. Welcome to the new standard of premium.
            </p>
            <div className="pt-8">
              <button className="group inline-flex items-center gap-4 text-[#ffd700] uppercase tracking-[0.4em] text-[0.65rem] font-bold cursor-pointer">
                Read the Manifesto
                <span className="material-symbols-outlined transition-transform group-hover:translate-x-2 text-lg">arrow_right_alt</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-16 bg-[#131313] border-t border-[#1c1b1b]">
        <div className="flex flex-col md:flex-row justify-between items-center px-12 max-w-[1920px] mx-auto text-[0.6rem] uppercase tracking-[0.2em] font-bold">
          <div className="text-[#d0c6ab] opacity-40 mb-8 md:mb-0">
            © 2024 Luxe. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            <a className="text-[#d0c6ab] opacity-40 hover:text-[#ffd700] hover:opacity-100 transition-opacity cursor-pointer">Privacy Policy</a>
            <a className="text-[#d0c6ab] opacity-40 hover:text-[#ffd700] hover:opacity-100 transition-opacity cursor-pointer">Terms of Service</a>
            <a className="text-[#d0c6ab] opacity-40 hover:text-[#ffd700] hover:opacity-100 transition-opacity cursor-pointer">Legal</a>
            <a className="text-[#d0c6ab] opacity-40 hover:text-[#ffd700] hover:opacity-100 transition-opacity cursor-pointer">Contact</a>
          </div>
          <div className="mt-8 md:mt-0 flex gap-6">
            <a className="text-[#d0c6ab] opacity-40 hover:text-[#ffd700] hover:opacity-100 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-xl">public</span>
            </a>
            <a className="text-[#d0c6ab] opacity-40 hover:text-[#ffd700] hover:opacity-100 transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-xl">brand_awareness</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;