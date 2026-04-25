import { useEffect } from "react";
import { useProducts } from "../hook/useProducts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate();
  const { handleGetSellerProducts } = useProducts();
  const sellerProducts = useSelector((state) => state.products.sellerProducts);

  useEffect(() => {
    handleGetSellerProducts();
  }, []);

  return (
    <div className="bg-[#131313] text-[#e5e2e1] min-h-screen selection:bg-[#ffd700] selection:text-[#3a3000]">
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-[#131313]/90 backdrop-blur-md text-[#FFD700] font-manrope tracking-tight flex justify-between items-center px-8 md:px-12 py-6">
        <div 
          onClick={() => navigate('/')} 
          className="text-2xl font-black tracking-[0.2em] text-[#FFF6DF] cursor-pointer hover:opacity-80 transition-opacity"
        >
          LUXE.
        </div>
        
        <div className="flex items-center space-x-10">
          <nav className="hidden md:flex space-x-8 text-sm uppercase tracking-widest">
            <a className="text-[#FFD700] font-bold hover:text-[#FFF6DF] transition-colors duration-300 cursor-pointer">Catalog</a>
            <a className="text-[#d0c6ab] hover:text-[#FFF6DF] transition-colors duration-300 cursor-pointer">Showroom</a>
            <a className="text-[#d0c6ab] hover:text-[#FFF6DF] transition-colors duration-300 cursor-pointer">Archive</a>
          </nav>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/seller/create-product')}
              className="hidden md:flex items-center gap-2 bg-[#ffd700] text-[#3a3000] px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,215,0,0.2)]"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              New Listing
            </button>
            <span className="material-symbols-outlined hover:text-[#FFF6DF] cursor-pointer transition-colors duration-300 text-[#d0c6ab]">account_circle</span>
          </div>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="pt-32 pb-24 px-8 md:px-16 min-h-screen relative overflow-hidden flex flex-col font-manrope">
        
        {/* Editorial Accent Image (Right Edge) - From Stitch Design */}
        <div className="absolute top-0 right-0 h-full w-1/2 lg:w-1/3 z-0 pointer-events-none overflow-hidden opacity-30 select-none hidden md:block">
          <img 
            alt="Abstract 3D metallic liquid gold and black silk fabric flowing dramatically" 
            className="h-full w-full object-cover scale-150 rotate-12 origin-top-right mix-blend-screen" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjrV5XqYxL_5zzJKmx3I9OKY7LvWgPMpxXAPtAlq_wmP8PDeohugW8XuhDwgHvkzXjnXJK0xRdxQmcVTe8f-Rxulbg95FMzyRWxT25cmuyGnZmuDEIUgFGUGAv3-8e6m-pY6FyRqCsD4WKlmDWe7TSxgqKpyK2WtEmXkhEtLW-pXtFhrzU-iD3-14eY2Vw7MoOrdfUNzJs_9F-eiubsyDLAPNAW9wPA-rewE4t-e-BzoGJp_0-jkfEc4dc6jcLUCgpJ5UMHt_2OuE"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#131313] to-[#131313]"></div>
        </div>

        <div className="relative z-10 max-w-[1920px] mx-auto w-full flex-1 flex flex-col">
          {/* Header Section */}
          <header className="mb-16 md:mb-24 mt-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
              <div>
                <span className="text-[0.75rem] text-[#d0c6ab] uppercase tracking-[0.3em] font-bold mb-4 block">Seller name</span>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-[#fff6df]">Curated Masterpieces</h1>
              </div>
              
              {sellerProducts?.length > 0 && (
                <div className="flex items-center space-x-6 text-[#d0c6ab]">
                  <div className="text-right">
                    <span className="text-[0.75rem] uppercase tracking-widest block opacity-50 mb-1">Active Listings</span>
                    <span className="text-2xl font-medium text-[#fff6df]">{sellerProducts.length}</span>
                  </div>
                  <div className="h-10 w-[1px] bg-[#4d4732]/30"></div>
                  <div className="text-right">
                    <span className="text-[0.75rem] uppercase tracking-widest block opacity-50 mb-1">Global Vault</span>
                    <span className="text-2xl font-medium text-[#dbc677]">Diamond</span>
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* Product Grid */}
          <section className="flex-1">
            {sellerProducts && sellerProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-8 gap-y-16">
                {sellerProducts.map((product) => (
                  <article key={product._id} className="group cursor-pointer">
                    <div onClick={() => navigate(`/seller/product/${product._id}`)} className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#1c1b1b] mb-6 transition-all duration-500 group-hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-transparent group-hover:border-[#4d4732]/20">
                      {product.images && product.images.length > 0 ? (
                        <img 
                          alt={product.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          src={product.images[0].url}
                        />
                      ) : (
                         <div className="w-full h-full flex flex-col items-center justify-center text-[#999077] gap-3">
                           <span className="material-symbols-outlined text-3xl opacity-50">imagesmode</span>
                           <span className="text-[0.65rem] uppercase tracking-widest font-bold opacity-50">No Image</span>
                        </div>
                      )}
                      
                      <div className="absolute top-4 right-4 bg-[#131313]/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#4d4732]/30 shadow-lg">
                        <span className="text-[0.6rem] font-bold text-[#d0c6ab] tracking-[0.1em] uppercase">
                           {new Date(product.createdAt).toLocaleDateString(undefined, { year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-1.5 px-2">
                       <h3 className="text-xl font-light text-[#e5e2e1] tracking-tight group-hover:text-[#fff6df] transition-colors line-clamp-1">
                          {product.title}
                       </h3>
                       <p className="text-[#ffd700] font-bold text-lg tracking-widest mt-1">
                          {product.price?.currency} {product.price?.amount?.toLocaleString()}
                       </p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="w-full py-32 flex flex-col items-center justify-center bg-[#1c1b1b]/30 rounded-3xl border border-[#4d4732]/20 shadow-2xl backdrop-blur-sm relative z-10">
                <span className="material-symbols-outlined text-5xl text-[#4d4732] mb-6 drop-shadow-md">inventory_2</span>
                <h2 className="text-[#d0c6ab] tracking-widest uppercase text-sm font-bold mb-3">The Archive is Empty</h2>
                <p className="text-[#999077] text-xs max-w-sm text-center mb-10 leading-relaxed">You have not curated any items yet. Begin building your luxury collection to display artifacts here.</p>
                <button 
                  onClick={() => navigate('/seller/create-product')}
                  className="bg-transparent border border-[#ffd700]/50 text-[#ffd700] px-12 py-5 rounded-full font-bold tracking-[0.2em] uppercase text-[0.7rem] hover:border-[#ffd700] hover:bg-[#ffd700]/5 shadow-[0_0_40px_rgba(255,215,0,0.05)] hover:shadow-[0_0_40px_rgba(255,215,0,0.15)] transition-all cursor-pointer"
                >
                  Curate First Output
                </button>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Floating Action Button for Mobile */}
      <button 
        onClick={() => navigate('/seller/create-product')}
        className="fixed bottom-8 right-8 z-50 md:hidden bg-[#ffd700] text-[#3a3000] w-14 h-14 rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform"
      >
        <span className="material-symbols-outlined text-3xl font-bold">add</span>
      </button>

      {/* Footer Credit */}
      <footer className="p-8 text-center relative z-10 border-t border-[#1c1b1b] bg-[#131313] font-manrope">
         <p className="text-[0.6rem] uppercase tracking-[0.5em] text-[#999077] opacity-40">The Luxe Standard © 2024</p>
      </footer>
    </div>
  );
}