import React from 'react';
import loginImage from '../assets/images/app/image_login_1.png';
import logoUrl from '../assets/images/app/new_mau.png';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen flex bg-background text-foreground font-sans overflow-hidden">
      {/* Left Form Area */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-6 sm:p-8 lg:p-12 relative overflow-hidden">
        {/* Logo at the top left */}
        <div className="absolute top-6 left-6 flex items-center gap-3">
          <img src={logoUrl} alt="Mau Logo" className="w-8 h-8 object-contain" />
          <span className="font-bold text-xl tracking-tight text-foreground">Mau</span>
        </div>

        <div className="w-full max-w-md">
          {children}
        </div>
      </div>

      {/* Right Image Area */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 via-transparent to-transparent z-10" />
        <img 
          src={loginImage} 
          alt="Login Workspace" 
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black/40 z-0" />
        
        {/* Optional decorative text over the image */}
        <div className="absolute bottom-16 left-16 right-16 z-20">
          <h2 className="text-4xl font-bold text-white mb-4 leading-tight">
            Manage your projects <br /> with elegance.
          </h2>
          <p className="text-lg text-slate-300 max-w-md">
            The ultimate workspace for developers and designers. Keep everything organized, encrypted, and at your fingertips.
          </p>
        </div>
      </div>
    </div>
  );
};
