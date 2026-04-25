import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router'
import { useProducts } from '../hook/useProducts'
import { useSelector } from 'react-redux';

const ProductDetail = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user);

  const [product, setProduct] = useState(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const { handleGetProductById } = useProducts()

  const fetchProductDetails = async () => {
    try {
      const data = await handleGetProductById(productId)
      setProduct(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchProductDetails()
  }, [productId])

  const handleNextImage = () => {
    if (product && product.images && product.images.length > 0) {
      setSelectedImage((prev) => (prev + 1) % product.images.length)
    }
  }

  const handlePrevImage = () => {
    if (product && product.images && product.images.length > 0) {
      setSelectedImage((prev) => (prev - 1 + product.images.length) % product.images.length)
    }
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#131313] flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-t-2 border-[#FFD700] rounded-full animate-spin"></div>
          <p className="text-[#e5e2e1] font-['Manrope'] tracking-[0.2em] uppercase text-xs mt-6">Loading Curated Piece...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#131313] text-[#e5e2e1] font-['Manrope'] min-h-screen overflow-x-hidden selection:bg-[#ffd700] selection:text-[#3a3000]">
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
            <a onClick={() => navigate('/')} className="text-[#fff6df] opacity-60 hover:text-[#ffd700] cursor-pointer transition-colors duration-300">Collections</a>
            <a onClick={() => navigate('/artistry')} className="text-[#ffd700] border-b-2 border-[#ffd700] pb-1 cursor-pointer transition-colors duration-300 pointer-events-none">Artistry</a>
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

      {/* Main content wrapper bounds to exactly screen height so everything fits without scrolling to see it */}
      <main className="min-h-screen flex flex-col md:flex-row">
        {/* Left Side: Image Gallery */}
        <section className="w-full md:w-1/2 relative bg-[#1c1b1b] flex flex-col group rounded-r-3xl md:rounded-r-none pt-24 pb-12">
          <div className="flex-grow flex items-center justify-center p-6 md:p-10">
            {/* The image is constrained by max-height so it won't push content below the viewport fold */}
            <div className="relative w-full aspect-[4/5] max-w-[24rem] xl:max-w-[28rem] max-h-[60vh] mx-auto group/image">
              {product.images && product.images.length > 0 ? (
                <img 
                  src={product.images[selectedImage]?.url} 
                  alt={product.title} 
                  className="w-full h-full object-cover rounded-xl shadow-2xl transition-all duration-500" 
                />
              ) : (
                 <div className="w-full h-full bg-[#131313] flex flex-col items-center justify-center rounded-xl shadow-2xl">
                    <span className="material-symbols-outlined text-4xl text-[#353534] mb-2">image</span>
                    <span className="text-[10px] tracking-[0.2em] text-[#353534] uppercase font-['Manrope']">Studio Shot Pending</span>
                 </div>
              )}
              {/* Floating Badge */}
              <div className="absolute top-4 left-4 bg-[#2a2a2a]/60 backdrop-blur-md px-4 py-2 rounded-full z-10">
                <p className="text-[0.6rem] tracking-[0.3em] uppercase text-[#e9c400]">Edition 01/50</p>
              </div>

              {/* Carousel Controls (Hidden until Hover) */}
              {product.images && product.images.length > 1 && (
                <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 pointer-events-none z-10">
                  <button 
                    onClick={handlePrevImage}
                    className="pointer-events-auto p-3 bg-[#131313]/60 backdrop-blur-md rounded-full text-[#FFD700] hover:bg-[#131313]/90 transition-all active:scale-95 shadow-lg"
                  >
                    <span className="material-symbols-outlined text-2xl">chevron_left</span>
                  </button>
                  <button 
                    onClick={handleNextImage}
                    className="pointer-events-auto p-3 bg-[#131313]/60 backdrop-blur-md rounded-full text-[#FFD700] hover:bg-[#131313]/90 transition-all active:scale-95 shadow-lg"
                  >
                    <span className="material-symbols-outlined text-2xl">chevron_right</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="px-8 pb-8 overflow-x-auto no-scrollbar flex space-x-4 justify-center">
              {product.images.map((img, index) => (
                <div 
                  key={img._id || index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden cursor-pointer transition-all ${selectedImage === index ? 'ring-1 ring-[#ffd700]/40' : 'hover:ring-1 hover:ring-[#ffd700]/20'}`}
                >
                  <img 
                    src={img.url} 
                    alt={`Detail ${index + 1}`} 
                    className={`w-full h-full object-cover transition-all duration-300 ${selectedImage === index ? 'grayscale-0' : 'grayscale hover:grayscale-0'}`} 
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Right Side: Details Section */}
        <section className="w-full md:w-1/2 bg-[#131313] flex flex-col justify-center px-8 md:px-20 relative pt-24 pb-12">
          <div className="max-w-xl mx-auto md:mx-0 relative z-10">
            <div className="space-y-2 mb-8">
              <p className="font-['Manrope'] text-[0.7rem] tracking-[0.4em] uppercase text-[#dbc677]">Curated by {product.sellerId?.fullname || 'Aurelian Studio'}</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-[#fff6df] leading-tight">
                {product.title}
              </h1>
            </div>

            <div className="mb-8">
              <p className="text-2xl font-bold text-[#ffd700] tracking-tight">
                {product.price?.currency === 'USD' ? '$' : product.price?.currency === 'INR' ? '₹' : product.price?.currency}
                {product.price?.amount?.toLocaleString() || '4,200.00'}
              </p>
              <div className="h-px w-12 bg-[#4d4732]/30 mt-4"></div>
            </div>

            <div className="space-y-6 mb-10">
              <p className="text-base text-[#d0c6ab] leading-relaxed tracking-wide font-light line-clamp-4">
                {product.description}
              </p>

              {/* Editorial Accent Image */}
              <div className="grid grid-cols-12 gap-4 items-center">
                <div className="col-span-4 h-24 rounded-lg overflow-hidden bg-[#1c1b1b] group">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD-6fp6e_o18vLLrpYDD5L4dNcy0UiDiIksrcZxQqxuJqHAGuPaOhP79loJfLtP35xa1SuKIwSm4RRbay-JjC0IdoUOnaW01ATvd2m6xmyAaQMvyaZJi7RNmj9rHMy07Ghc-rTPfXA53lPT5nUUj_Yyba4BPF00eWhbF7jMzai1EcTogI7MNiycx_lW3XwU3WmLsjg0XVSuEqLflmW7KkG3VASyOYVSsalXiTs_qA8N_nv7pCk9ZrgSSZzjFt_4z1fPbXSirzQkcmE" 
                    alt="Material accent" 
                    className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
                  />
                </div>
                <div className="col-span-8">
                  <h3 className="text-[0.65rem] tracking-[0.2em] uppercase text-[#999077] mb-2">Tactile Synthesis</h3>
                  <p className="text-[0.75rem] text-[#d0c6ab] italic font-light leading-relaxed">
                    "The way light dies across its surface is intentional. It is designed to be felt in the dark."
                  </p>
                </div>
              </div>
            </div>

            {/* Interaction Zone */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-[#ffd700] text-[#3a3000] font-['Manrope'] font-bold py-4 px-8 rounded-full uppercase tracking-widest text-[0.7rem] hover:opacity-90 active:scale-[0.98] transition-all shadow-[0_10px_40px_-10px_rgba(255,215,0,0.2)]">
                Buy Now
              </button>
              <button className="flex-1 bg-transparent border border-[#4d4732]/40 text-[#fff6df] font-['Manrope'] font-bold py-4 px-8 rounded-full uppercase tracking-widest text-[0.7rem] hover:bg-[#2a2a2a] hover:border-[#ffd700]/40 transition-all">
                Add to Cart
              </button>
            </div>
            
            {/* Footer-like details */}
            <div className="mt-12 flex space-x-10 border-t border-[#4d4732]/10 pt-6">
                <div>
                    <span className="block text-[0.6rem] uppercase tracking-widest text-[#999077] mb-1">Authenticity</span>
                    <span className="text-sm font-medium text-[#e5e2e1]">Verified</span>
                </div>
                <div>
                    <span className="block text-[0.6rem] uppercase tracking-widest text-[#999077] mb-1">Condition</span>
                    <span className="text-sm font-medium text-[#e5e2e1]">Pristine</span>
                </div>
            </div>

          </div>

          {/* Background subtle atmospheric glow */}
          <div className="absolute -right-20 bottom-20 w-80 h-80 bg-[#ffd700]/5 rounded-full blur-[100px] pointer-events-none"></div>
        </section>
      </main>

      {/* Footer Component */}
      <footer className="w-full py-16 px-12 mt-0 bg-[#1c1b1b] relative overflow-hidden">
        <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-[1920px] mx-auto space-y-8 md:space-y-0 relative z-10">
          <div className="text-lg font-semibold text-[#FFF6DF]">
            Luxe <span className="font-light text-xs tracking-widest ml-4 text-[#999077]">ARCHITECTURAL CATALOG</span>
          </div>
          <nav className="flex space-x-8">
            <a href="#" className="font-['Manrope'] text-[0.75rem] tracking-widest uppercase text-[#D0C6AB] hover:text-[#ffd700] transition-colors">Sustainability</a>
            <a href="#" className="font-['Manrope'] text-[0.75rem] tracking-widest uppercase text-[#D0C6AB] hover:text-[#ffd700] transition-colors">Contact</a>
            <a href="#" className="font-['Manrope'] text-[0.75rem] tracking-widest uppercase text-[#D0C6AB] hover:text-[#ffd700] transition-colors">Press</a>
            <a href="#" className="font-['Manrope'] text-[0.75rem] tracking-widest uppercase text-[#D0C6AB] hover:text-[#ffd700] transition-colors">Legal</a>
          </nav>
          <div className="font-['Manrope'] text-[0.6rem] tracking-widest uppercase text-[#999077]">
            © {new Date().getFullYear()} Luxe Architectural Catalog. All Rights Reserved.
          </div>
        </div>
        {/* Soft atmospheric glow */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#ffd700]/20 to-transparent"></div>
      </footer>
    </div>
  )
}

export default ProductDetail