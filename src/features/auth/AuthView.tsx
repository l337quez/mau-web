import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Mail, Lock, User, ArrowLeft, Fingerprint } from 'lucide-react';

type AuthState = 'login' | 'register' | 'recover';

export const AuthView = () => {
  const [authState, setAuthState] = useState<AuthState>('login');
  const navigate = useNavigate();

  const handleSimulatedSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect directly to the board since auth is simulated
    navigate('/board');
  };

  return (
    <div className="w-full animation-fade-in">
      {authState === 'login' && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Welcome back</h1>
            <p className="text-muted-foreground text-lg">Enter your details to access your workspace.</p>
          </div>

          <form onSubmit={handleSimulatedSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="email" 
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-foreground">Password</label>
                <button 
                  type="button" 
                  onClick={() => setAuthState('recover')}
                  className="text-sm text-orange-500 hover:text-orange-600 font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                />
              </div>
            </div>

            <div className="pt-4 space-y-3">
              <button 
                type="submit"
                className="w-full bg-foreground hover:bg-foreground/90 text-background font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 group"
              >
                Sign In
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="relative flex items-center py-2">
                <div className="flex-grow border-t border-border"></div>
                <span className="flex-shrink-0 mx-4 text-muted-foreground text-sm">or</span>
                <div className="flex-grow border-t border-border"></div>
              </div>

              <button 
                type="button"
                onClick={(e) => handleSimulatedSubmit(e)}
                className="w-full bg-background border border-border hover:bg-muted text-foreground font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <Fingerprint className="w-5 h-5 text-orange-500" />
                Sign in with Biometrics
              </button>
            </div>
          </form>

          <p className="text-center text-muted-foreground">
            Don't have an account?{' '}
            <button 
              onClick={() => setAuthState('register')}
              className="text-foreground font-medium hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      )}

      {authState === 'register' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <h1 className="text-4xl font-bold text-foreground mb-2">Create an account</h1>
            <p className="text-muted-foreground text-lg">Join us and start organizing your projects today.</p>
          </div>

          <form onSubmit={handleSimulatedSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="text" 
                  required
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="email" 
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 rounded-xl transition-colors mt-8"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-muted-foreground">
            Already have an account?{' '}
            <button 
              onClick={() => setAuthState('login')}
              className="text-foreground font-medium hover:underline"
            >
              Sign in
            </button>
          </p>
        </div>
      )}

      {authState === 'recover' && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div>
            <button 
              onClick={() => setAuthState('login')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to login
            </button>
            <h1 className="text-4xl font-bold text-foreground mb-2">Reset password</h1>
            <p className="text-muted-foreground text-lg">Enter your email and we'll send you instructions to reset your password.</p>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              alert('Reset link sent! (Simulated)');
              setAuthState('login');
            }} 
            className="space-y-4"
          >
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input 
                  type="email" 
                  required
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all outline-none"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-foreground hover:bg-foreground/90 text-background font-medium py-3 rounded-xl transition-colors mt-8"
            >
              Send Reset Link
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
