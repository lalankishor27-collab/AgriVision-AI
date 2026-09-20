import React, { useState } from 'react';
import { api } from '../services/api';
import { Sprout, Mail, Lock, User } from 'lucide-react';

export function Auth({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        const res = await api.register({ email, password, full_name: fullName, role: 'farmer' });
        if (onLoginSuccess) onLoginSuccess(res);
      } else {
        const res = await api.login({ email, password });
        if (onLoginSuccess) onLoginSuccess(res);
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 space-y-6 emerald-glow">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
            <Sprout className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-white">{isRegister ? 'Create Account' : 'Sign In'}</h2>
          <p className="text-xs text-slate-400">Access AgriVision AI Platform</p>
        </div>

        {error && <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div>
              <label className="text-slate-400 font-semibold block mb-1">Full Name:</label>
              <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
                <User className="w-4 h-4 text-slate-500" />
                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} required className="bg-transparent text-white outline-none w-full" placeholder="Lalan Kishor" />
              </div>
            </div>
          )}

          <div>
            <label className="text-slate-400 font-semibold block mb-1">Email:</label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
              <Mail className="w-4 h-4 text-slate-500" />
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="bg-transparent text-white outline-none w-full" placeholder="user@agrivision.ai" />
            </div>
          </div>

          <div>
            <label className="text-slate-400 font-semibold block mb-1">Password:</label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2">
              <Lock className="w-4 h-4 text-slate-500" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="bg-transparent text-white outline-none w-full" placeholder="••••••••" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full py-3 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-xs transition-all shadow-lg cursor-pointer">
            {loading ? 'Authenticating...' : isRegister ? 'Register Account' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
