import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router';

const Navbar = () => {
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    const location = useLocation();

    const getLinkClass = (path) => {
        if (location.pathname === path) {
            return "text-[#ffd700] border-b-2 border-[#ffd700] pb-1 cursor-pointer transition-colors duration-300 pointer-events-none";
        }
        return "text-[#fff6df] opacity-60 hover:text-[#ffd700] hover:opacity-100 cursor-pointer transition-colors duration-300";
    };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#131313]/95 backdrop-blur-md border-b border-[#1c1b1b]">
        <div className="flex justify-between items-center px-6 md:px-10 py-6 max-w-[1920px] mx-auto font-medium">
          <div 
            onClick={() => navigate('/')} 
            className="text-2xl font-black tracking-[0.2em] text-[#ffd700] cursor-pointer hover:opacity-80 transition-opacity"
          >
            LUXE.
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-[0.7rem] uppercase tracking-widest font-bold">
            <a onClick={() => navigate('/')} className={getLinkClass('/')}>Collections</a>
            <a onClick={() => navigate('/artistry')} className={getLinkClass('/artistry')}>Artistry</a>
            <a onClick={() => navigate('/experience')} className={getLinkClass('/experience')}>Experience</a>
            <a onClick={() => navigate('/concierge')} className={getLinkClass('/concierge')}>Concierge</a>
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
  )
}

export default Navbar