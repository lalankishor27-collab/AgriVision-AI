import React, { useState, useRef } from 'react';
import { Upload, Camera, Image as ImageIcon, Sparkles, CheckCircle2, RefreshCw } from 'lucide-react';

export function ImageUploader({ onSelectImage, samples = [], isLoading }) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedPreview, setSelectedPreview] = useState(null);
  const [selectedSampleKey, setSelectedSampleKey] = useState(null);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    setSelectedSampleKey(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedPreview(reader.result);
    };
    reader.readAsDataURL(file);
    onSelectImage({ type: 'file', file });
  };

  const handleSampleClick = (sample) => {
    setSelectedPreview(sample.image_url);
    setSelectedSampleKey(sample.key);
    onSelectImage({ type: 'sample', key: sample.key });
  };

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 ${
          dragActive 
            ? 'border-emerald-400 bg-emerald-500/10 scale-[1.01]' 
            : selectedPreview 
              ? 'border-emerald-500/40 bg-slate-900/60' 
              : 'border-slate-700/80 bg-slate-900/40 hover:border-emerald-500/50 hover:bg-slate-900/60'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/jpg"
          className="hidden"
          onChange={handleChange}
        />

        {selectedPreview ? (
          <div className="space-y-4">
            <div className="relative inline-block group">
              <img
                src={selectedPreview}
                alt="Selected leaf"
                className="max-h-64 rounded-xl mx-auto border-2 border-emerald-500/40 object-cover shadow-lg"
              />
              {isLoading && (
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm rounded-xl flex flex-col items-center justify-center text-emerald-400 gap-3">
                  <RefreshCw className="w-10 h-10 animate-spin text-emerald-400" />
                  <span className="text-sm font-semibold tracking-wider text-white">Analyzing Leaf Features...</span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
              <span>Image loaded. Click or drop another leaf to re-classify.</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4 py-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto shadow-inner">
              <Upload className="w-8 h-8" />
            </div>
            <div>
              <p className="text-base font-bold text-white">
                Drop crop leaf photo here, or <span className="text-emerald-400 underline">browse</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">Supports JPG, JPEG, PNG (PlantVillage 38 Class Engine)</p>
            </div>

            <div className="flex items-center justify-center gap-4 pt-2 text-xs font-medium text-slate-400">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700">
                <Camera className="w-3.5 h-3.5 text-emerald-400" /> Camera Capture
              </span>
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700">
                <ImageIcon className="w-3.5 h-3.5 text-emerald-400" /> Photo Library
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Demo Samples Selector */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Select Sample Leaf Image:
          </h3>
          <span className="text-xs text-slate-400">Instant Test</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {samples.map((sample) => {
            const isSelected = selectedSampleKey === sample.key;
            return (
              <button
                key={sample.key}
                type="button"
                onClick={() => handleSampleClick(sample)}
                className={`p-2 rounded-xl text-left border transition-all text-xs flex flex-col justify-between group ${
                  isSelected 
                    ? 'border-emerald-400 bg-emerald-500/20 text-white ring-2 ring-emerald-500/30' 
                    : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-emerald-500/40 hover:bg-slate-800/80'
                }`}
              >
                <div className="aspect-square w-full rounded-lg overflow-hidden mb-2 bg-slate-950 relative">
                  <img
                    src={sample.image_url}
                    alt={sample.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span className="absolute bottom-1 right-1 text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/70 text-emerald-300 border border-emerald-500/30">
                    {sample.crop}
                  </span>
                </div>
                <span className="font-bold line-clamp-1 group-hover:text-emerald-400">{sample.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
