import React from 'react'
import {useSelector} from 'react-redux'
import { Navigate } from 'react-router'
const Protected = ({children,role="buyer"}) => {
    const user = useSelector((state) => state.auth.user);
    const loading = useSelector((state) => state.auth.loading);
    if (loading) {
        return (
            <div className="bg-[#131313] min-h-screen flex flex-col items-center justify-center font-manrope selection:bg-[#ffd700] selection:text-[#3a3000]">
                <div className="relative flex flex-col items-center mix-blend-screen">
                    <div className="absolute inset-0 border-t border-[#ffd700] rounded-full animate-[spin_1.5s_linear_infinite] w-12 h-12 opacity-30"></div>
                    <div className="absolute inset-0 border-r border-[#ffd700] rounded-full animate-[spin_3s_linear_infinite] w-12 h-12 opacity-80 shadow-[0_0_20px_rgba(255,215,0,0.2)]"></div>
                    <div className="w-12 h-12 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-[#ffd700] shadow-[0_0_10px_#ffd700] rounded-full animate-pulse"></div>
                    </div>
                </div>
                <div className="mt-10 text-center flex flex-col items-center gap-2">
                    <span className="text-[#fff6df] text-[0.65rem] font-bold tracking-[0.4em] uppercase opacity-80 animate-pulse">
                        Authenticating
                    </span>
                    <span className="text-[#d0c6ab] text-[0.55rem] tracking-[0.3em] uppercase opacity-30">
                        Establishing Secure Link
                    </span>
                </div>
            </div>
        );
    }
    if(!user){
        return <Navigate to="/login" />
    }
    if(user.role !== role){
        return <Navigate to="/" />
    }
  return (
    <div>{children}</div>
  )
}
  
export default Protected