import React, { useState, useEffect } from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { RecommendationPanel } from '../components/RecommendationPanel';
import { api } from '../services/api';
import { Scan, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export function Diagnose() {
  const [samples, setSamples] = useState([]);
  const [selectedImageData, setSelectedImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.getSamples().then(setSamples).catch(console.error);
  }, []);

  const handleSelectImage = async (data) => {
    setSelectedImageData(data);
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      if (data.type === 'file') {
        formData.append('file', data.file);
      } else if (data.type === 'sample') {
        formData.append('sample_key', data.key);
      }

      const response = await api.predictLeaf(formData);
      setResult(response);
    } catch (err) {
      console.error(err);
      setError("Failed to process leaf image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      {/* Studio Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Scan className="w-6 h-6" />
            </div>
            Leaf Diagnosis Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Deep Neural Crop & Disease Identification with Organic and Chemical Prescriptions.
          </p>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Image Uploader */}
        <div className="lg:col-span-5 space-y-6">
          <ImageUploader
            onSelectImage={handleSelectImage}
            samples={samples}
            isLoading={loading}
          />
        </div>

        {/* Right Column: AI Diagnosis Output */}
        <div className="lg:col-span-7 space-y-6">
          {error && (
            <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!result && !loading && !error && (
            <div className="glass-panel p-12 rounded-2xl border border-slate-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-white">Ready for Leaf Evaluation</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Drop your crop leaf photo on the left or select a sample leaf image to test deep neural prediction.
              </p>
            </div>
          )}

          {result && (
            <div className="space-y-6 animate-fade-in">
              {/* Result Header Card */}
              <div className="glass-panel p-6 rounded-2xl border border-emerald-500/40 flex flex-wrap items-center justify-between gap-4 emerald-glow">
                <div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
                    {result.crop} Crop Identified
                  </span>
                  <h2 className="text-2xl font-black text-white mt-2">{result.display_name}</h2>
                  <p className="text-xs text-slate-400 mt-1">Scan Record ID: #{result.id}</p>
                </div>

                <div className="text-right">
                  <span className="text-3xl font-black text-emerald-400">{result.confidence}%</span>
                  <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Model Confidence</span>
                </div>
              </div>

              {/* Original Image Preview */}
              <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex items-center justify-center">
                <img
                  src={result.image_url}
                  alt={result.display_name}
                  className="max-h-72 rounded-xl border border-slate-800 object-contain"
                />
              </div>

              {/* Recommendation Panel */}
              <RecommendationPanel advisory={result.advisory} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
