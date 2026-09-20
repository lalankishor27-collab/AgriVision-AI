import React, { useState } from 'react';
import { CheckCircle, Leaf, FlaskConical, ShieldCheck, FileText } from 'lucide-react';

export function RecommendationPanel({ advisory }) {
  const [activeTab, setActiveTab] = useState('organic');

  if (!advisory) return null;

  const { display_name, pathogen, description, organic_treatment = [], chemical_treatment = [], prevention = [] } = advisory;

  return (
    <div className="glass-panel rounded-2xl p-6 border border-emerald-900/40 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div>
          <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
            Pathogen: {pathogen}
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-2">{display_name}</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">{description}</p>
        </div>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 transition-all cursor-pointer"
        >
          <FileText className="w-4 h-4 text-slate-400" />
          Print Advisory Report
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('organic')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'organic'
              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Leaf className="w-4 h-4 text-emerald-400" /> Organic Solutions
        </button>

        <button
          onClick={() => setActiveTab('chemical')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'chemical'
              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <FlaskConical className="w-4 h-4 text-cyan-400" /> Chemical Control
        </button>

        <button
          onClick={() => setActiveTab('prevention')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTab === 'prevention'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-purple-400" /> Long-Term Prevention
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-3 min-h-[140px]">
        {activeTab === 'organic' && (
          <ul className="space-y-2.5 text-xs text-slate-200">
            {organic_treatment.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {activeTab === 'chemical' && (
          <ul className="space-y-2.5 text-xs text-slate-200">
            {chemical_treatment.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <FlaskConical className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}

        {activeTab === 'prevention' && (
          <ul className="space-y-2.5 text-xs text-slate-200">
            {prevention.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
                <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
