import React from 'react';
import { Link } from 'react-router-dom';
import { Scan, Sparkles, ArrowRight, CheckCircle2, ShieldCheck, Cpu, Database, Activity } from 'lucide-react';

export function Home() {
  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 text-center overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold tracking-wider uppercase shadow-sm">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Deep Learning Crop Care Engine
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Intelligent Crop Disease <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              Classification Engine
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Multi-crop leaf disease classification using PyTorch deep learning transfer learning (MobileNetV3) trained on the 38-class PlantVillage dataset with instant organic and chemical remedies.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/diagnose"
              className="px-7 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm flex items-center gap-2 shadow-xl transition-all hover:scale-105 cursor-pointer emerald-glow"
            >
              <Scan className="w-5 h-5 text-slate-950" /> Start Leaf Diagnosis
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/history"
              className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 transition-all cursor-pointer"
            >
              View Scan History Log
            </Link>
          </div>
        </div>
      </section>

      {/* System Features Overview */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="glass-panel p-8 rounded-3xl border border-emerald-900/50 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">System Capabilities</span>
              <h2 className="text-2xl font-extrabold text-white mt-1">Core Modules & Architecture</h2>
            </div>
            <Activity className="w-8 h-8 text-emerald-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-white text-lg">PyTorch AI Engine</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                MobileNetV3 transfer learning model fine-tuned on 54,305 PlantVillage images covering 38 disease and healthy crop classes.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-white text-lg">Agronomic Advisory</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Provides actionable organic treatments, targeted chemical fungicide controls, and preventive farming practices.
              </p>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-extrabold text-white text-lg">FastAPI & SQLite</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Asynchronous REST API with Pydantic validation and full scan history persistence for long-term farm tracking.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
