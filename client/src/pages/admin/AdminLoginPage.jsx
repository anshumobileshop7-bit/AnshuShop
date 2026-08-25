import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Smartphone, Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import Button from '../../components/Button';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showError('Please provide both email and password');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      showSuccess('Welcome back, Admin!');
      navigate('/admin');
    } catch (err) {
      showError(err.response?.data?.message || err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@anshumobile.com');
    setPassword('Admin@12345');
    showSuccess('Demo credentials filled!');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-xl shadow-brand-600/30">
            <Smartphone className="w-7 h-7" />
          </div>
        </div>

        <h2 className="mt-4 text-center text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Admin Control Center
        </h2>
        <p className="mt-1.5 text-center text-xs sm:text-sm text-slate-400">
          Anshu Mobile World — Content Management System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4 sm:px-0 relative z-10">
        <div className="bg-slate-900 border border-slate-800 py-8 px-6 sm:px-10 shadow-2xl rounded-3xl">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <Mail className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="admin@anshumobile.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-11 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-brand-500 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-slate-400 hover:text-white absolute right-3.5 top-1/2 -translate-y-1/2 p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center mt-2"
              loading={loading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Sign In to Admin
            </Button>
          </form>

          {/* Quick Demo Fill Helper */}
          <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col items-center">
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs text-brand-400 hover:text-brand-300 font-semibold bg-slate-800/80 hover:bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl transition-all"
            >
              Click to Auto-fill Default Demo Credentials
            </button>
            <span className="text-[11px] text-slate-500 mt-2">
              (admin@anshumobile.com / Admin@12345)
            </span>
          </div>
        </div>

        <p className="text-center text-xs text-slate-500 mt-6 flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-brand-500" />
          <span>Protected with JWT Authentication & Encrypted Passwords</span>
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
