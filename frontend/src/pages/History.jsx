import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { History as HistoryIcon, Trash2, Calendar } from 'lucide-react';

export function History() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await api.getHistory();
      setRecords(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this scan record from history?")) {
      await api.deleteHistory(id);
      setRecords((prev) => prev.filter((r) => r.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <HistoryIcon className="w-6 h-6" />
            </div>
            Scan History Feed
          </h1>
          <p className="text-xs text-slate-400 mt-1">Review past crop leaf predictions and diagnosis records.</p>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-400 text-xs">Loading records...</div>
      ) : records.length === 0 ? (
        <div className="glass-panel p-12 rounded-2xl text-center text-slate-400 text-xs">No scan records found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {records.map((item) => (
            <div key={item.id} className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950">
                <img src={item.original_image_path} alt={item.display_name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">{item.display_name}</h3>
                <div className="flex items-center justify-between text-xs text-slate-400 mt-2">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {item.created_at ? new Date(item.created_at).toLocaleDateString() : 'Recent'}</span>
                  <span className="font-semibold text-emerald-400">{item.confidence}% Conf.</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="text-slate-400">Crop: {item.crop}</span>
                <button onClick={() => handleDelete(item.id)} className="text-rose-400 hover:underline flex items-center gap-1">
                  <Trash2 className="w-3.5 h-3.5" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
