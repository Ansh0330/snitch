import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hook/useAuth";

export default function Login() {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Form Submitted", formData);
    const user = await handleLogin({
      email: formData.email,
      password: formData.password,
    });
    if(user.role === "seller"){
      navigate("/seller/dashboard");
    }else{
      navigate("/");
    }
  };

  return (
    <div className="bg-[#131313] text-[#e5e2e1] font-manrope h-screen flex overflow-hidden">
      {/* Left Side: Editorial Image & Ethos (Desktop only) */}
      <section className="hidden lg:flex lg:w-1/2 relative bg-[#0e0e0e]">
        {/* Absolute Logo for Desktop */}
        <div
          className="absolute top-8 left-10 xl:top-10 xl:left-12 z-30 text-2xl font-black tracking-[0.2em] text-[#FFF6DF] cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/")}
        >
          LUXE.
        </div>

        <img
          alt="High-end luxury fashion"
          className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
          src="https://images.unsplash.com/photo-1618375601660-3e6842f5b791?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131313] via-[#131313]/60 to-transparent flex flex-col justify-end p-12 lg:p-16 xl:p-24 pb-16 xl:pb-20">
          <div className="max-w-md relative z-10 hover:translate-y-[-5px] transition-transform duration-700">
            <span className="text-[#ffd700] text-[0.75rem] font-bold tracking-[0.4em] uppercase mb-4 block shadow-sm">
              The Inner Circle
            </span>
            <h1 className="text-[3rem] xl:text-[4rem] font-black leading-tight tracking-tighter text-[#fff6df] mb-6 drop-shadow-lg">
              RESUME <br /> EXCELLENCE
            </h1>
            <p className="text-[#d0c6ab] text-base xl:text-lg leading-relaxed font-light opacity-90 mix-blend-screen bg-transparent">
              Your curation awaits. Step back into the Luxe ecosystem to access
              your private wardrobe, seamless checkouts, and early drops
              strictly reserved for members.
            </p>
          </div>
        </div>
        {/* Floating Decorative Element */}
        <div className="absolute top-24 left-12 w-24 h-24 border-t border-l border-[#4d4732] opacity-30"></div>
      </section>

      {/* Right Side: Login Form */}
      <section className="w-full lg:w-1/2 bg-[#131313] overflow-hidden flex flex-col relative text-left">
        {/* Top Controls Container - strictly pinned overlay */}
        <div className="absolute top-0 left-0 w-full p-8 lg:p-10 xl:p-12 flex justify-between items-center z-20">
          {/* Logo visible only on Mobile (as desktop has it on the left panel) */}
          <div
            className="lg:hidden text-xl font-black tracking-[0.2em] text-[#FFF6DF] cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
          >
            LUXE.
          </div>

          {/* Back Button with hover animation */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#d0c6ab] hover:text-[#ffd700] transition-all ml-auto text-[0.65rem] uppercase tracking-[0.2em] font-bold group cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] group-hover:-translate-x-1.5 transition-transform duration-300">
              arrow_back
            </span>
            Back
          </button>
        </div>

        {/* Centered Form Wrapper - Vertical height perfectly balanced for 100vh lock without scrollbars 
            Horizontal padding keeps the luxurious breathing room. Vertical rhythm is strictly tuned. */}
        <div className="px-8 md:px-16 lg:px-20 xl:px-28 w-full h-full flex flex-col justify-center">
          {/* Header Text - Measured Vertical Limits */}
          <header className="mb-8 xl:mb-10 mt-12 lg:mt-0">
            <h2 className="text-[2rem] lg:text-[2.25rem] xl:text-[2.75rem] font-black tracking-tight text-[#fff6df] leading-none mb-2 xl:mb-3">
              Welcome Back
            </h2>
            <p className="text-[0.65rem] mt-4 xl:text-[0.75rem] uppercase tracking-[0.25em] text-[#d0c6ab] font-medium opacity-80">
              Access your exclusive account
            </p>
          </header>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 lg:space-y-8 max-w-[30rem] w-full shrink-0"
          >
            {/* Form Fields Container */}
            <div className="space-y-5 xl:space-y-6">
              {/* Email Address */}
              <div className="group">
                <label className="block text-[0.65rem] xl:text-[0.7rem] font-bold text-[#d0c6ab] uppercase tracking-widest mb-1.5 ml-1 opacity-70 group-focus-within:opacity-100 transition-opacity">
                  Email Address
                </label>
                <div className="bg-[#1c1b1b] rounded-xl px-4 lg:px-5 py-3.5 xl:py-4 focus-within:ring-1 focus-within:ring-[#FFD700]/50 transition-all duration-300 cursor-text">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-none p-0 text-[#fff6df] placeholder:text-[#999077] focus:ring-0 font-medium tracking-wide outline-none focus:outline-none cursor-text"
                    placeholder="VANCE@LUXE.COM"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="group">
                <div className="flex justify-between items-center mb-1.5 px-1">
                  <label className="block text-[0.65rem] xl:text-[0.7rem] font-bold text-[#d0c6ab] uppercase tracking-widest opacity-70 group-focus-within:opacity-100 transition-opacity">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-[0.6rem] text-[#d0c6ab] opacity-60 hover:opacity-100 hover:text-[#ffd700] transition-colors border-b border-transparent hover:border-[#ffd700]"
                  >
                    Forgot?
                  </Link>
                </div>
                <div className="bg-[#1c1b1b] rounded-xl px-4 lg:px-5 py-3.5 xl:py-4 focus-within:ring-1 focus-within:ring-[#FFD700]/50 transition-all duration-300 relative cursor-text">
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent border-none p-0 text-[#fff6df] placeholder:text-[#999077] focus:ring-0 font-medium tracking-widest outline-none focus:outline-none pr-8 cursor-text"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            {/* Primary Action & Alternate flows */}
            <div className="pt-4 xl:pt-6 flex flex-col items-center">
              <button
                type="submit"
                className="w-full bg-[#ffd700] hover:bg-[#ffdf33] text-[#3a3000] font-black py-4 rounded-full tracking-[0.25em] uppercase text-[0.75rem] xl:text-[0.85rem] active:scale-[0.98] transition-all duration-300 shadow-[0_10px_30px_-10px_rgba(255,215,0,0.25)] hover:shadow-[0_15px_40px_-5px_rgba(255,215,0,0.4)] mb-5 lg:mb-6 cursor-pointer"
              >
                Sign In
              </button>

              <div className="flex flex-col items-center gap-5">
                <a
                  href="/api/auth/google"
                  className="group text-[0.65rem] xl:text-[0.7rem] uppercase tracking-[0.15em] text-[#d0c6ab] hover:text-[#ffd700] transition-all duration-300 font-medium cursor-pointer relative flex items-center justify-center gap-2 after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:-bottom-1.5 after:left-0 after:bg-[#ffd700] after:origin-bottom-right hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform after:duration-300"
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    className="w-3.5 h-3.5 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                  />
                  <span>Continue with google</span>
                </a>

                <Link
                  to="/register"
                  className="text-[0.65rem] xl:text-[0.7rem] uppercase tracking-[0.15em] text-[#d0c6ab] hover:text-[#ffd700] transition-all duration-300 font-medium cursor-pointer relative after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-[1px] after:-bottom-1 after:left-0 after:bg-[#ffd700] after:origin-bottom-right hover:after:scale-x-100 hover:after:origin-bottom-left after:transition-transform after:duration-300"
                >
                  New to Luxe? Create an account.
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
