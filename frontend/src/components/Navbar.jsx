import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sprout, Scan, History } from 'lucide-react';

export function Navbar() {
  const location = useLocation();

  const navItems = [
    { label: 'Diagnose Leaf', path: '/diagnose', icon: Scan },
    { label: 'Scan History', path: '/history', icon: History },
  ];

  return (
    <nav className="sticky top-0 z-40 w-full glass-panel border-b border-emerald-900/40 bg-[#0A120D]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          <Link to="/" className="flex items-center gap-3 group">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-500/20 transition-all emerald-glow">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white flex items-center gap-2">
                AgriVision <span className="text-emerald-400 text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 font-bold">AI</span>
              </span>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">Crop Disease Classifier & Farm Advisory</p>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive 
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold shadow-sm' 
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  {item.label}
                </Link>
              );
            })}

            <div className="ml-2 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              <span className="font-bold text-emerald-400">System Online</span>
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
}
