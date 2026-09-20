import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { Diagnose } from './pages/Diagnose';
import { History } from './pages/History';
import { Auth } from './pages/Auth';

export function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#0A120D] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/diagnose" element={<Diagnose />} />
            <Route path="/history" element={<History />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="border-t border-slate-900 bg-[#070D09] py-6 px-4 text-center text-xs text-slate-400">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <span className="font-bold text-slate-300">AgriVision AI</span>
            <span>Intelligent Crop Disease Classification & Advisory System</span>
            <span className="text-emerald-400 font-semibold">Deep Learning Powered</span>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
