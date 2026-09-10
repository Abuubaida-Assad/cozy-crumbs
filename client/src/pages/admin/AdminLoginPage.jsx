import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';

export const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { login } = useAuth();
  const { success } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    try {
      const res = await login(email.trim(), password.trim());
      if (res.user.role !== 'admin') {
        setErrorMsg('Access denied: You do not have administrator permissions.');
        return;
      }
      success(`Welcome back, ${res.user.name}!`);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login error:', err);
      const message =
        err.response?.data?.message ||
        (err.response?.status === 401 ? 'Invalid email or password. Please verify your credentials.' : err.message);
      setErrorMsg(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#24130D] flex items-center justify-center p-4 selection:bg-[#8C735A] selection:text-white">
      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex flex-col items-center gap-2 group mb-3">
            <span
              className="font-display font-black text-3xl text-[#FCFAF7] italic"
              style={{ fontFamily: '"Playfair Display", serif' }}
            >
              COZY CRUMBS
            </span>
            <span className="text-[11px] tracking-[0.25em] font-bold text-[#B09A7C] uppercase">
              ADMIN DASHBOARD
            </span>
          </Link>
          <p className="text-xs text-[#E8DED1]/70">
            Sign in with authorized administrator credentials to manage catalog and products.
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#3A2923] rounded-3xl p-7 sm:p-9 border border-white/10 shadow-2xl">
          {errorMsg && (
            <div className="mb-6 p-4 rounded-2xl bg-red-500/15 border border-red-500/30 text-red-200 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#E8DED1] mb-2">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B09A7C]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="cozycrumbs6767@gmail.com"
                  className="w-full pl-10 pr-4 py-3 bg-[#24130D]/80 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#B09A7C] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#E8DED1] mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B09A7C]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-11 py-3 bg-[#24130D]/80 border border-white/10 rounded-xl text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#B09A7C] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-full bg-[#B09A7C] hover:bg-[#8C735A] text-[#24130D] hover:text-white font-bold text-xs uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
            >
              <span>{isLoading ? 'AUTHENTICATING...' : 'LOGIN'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <Link
              to="/"
              className="text-xs text-[#E8DED1]/70 hover:text-white transition-colors"
            >
              &larr; Return to Cozy Crumbs Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
