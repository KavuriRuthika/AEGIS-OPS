import React, { useState } from 'react';
import { Activity, Hospital, AlertTriangle, ArrowRight, CheckCircle2, ShieldCheck, X } from 'lucide-react';

export default function HospitalSurgeModal({ isOpen, onClose, hospitals, onRedirectPatients }) {
  const [redirected, setRedirected] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2500] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="hud-panel w-full max-w-3xl bg-[#090d16] border-red-500/40 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-950 p-4 border-b border-red-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-red-950 text-red-400 border border-red-500/40 shadow-[0_0_15px_rgba(239,68,68,0.3)]">
              <Hospital className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-hud text-lg font-bold tracking-wider text-slate-100">
                  HOSPITAL SURGE PREDICTOR & LOAD BALANCER
                </h2>
                <span className="badge bg-red-950 text-red-300 border-red-500/40 text-[10px]">
                  30-MIN INTAKE MODEL
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Victim intake forecasting & trauma bed allocation optimization
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 space-y-4 overflow-y-auto">
          
          {/* Incident Scale & Demand Breakdown */}
          <div className="hud-panel hud-panel-critical p-3.5 bg-slate-950/90 rounded-lg border-red-500/40 space-y-2">
            <div className="flex items-center justify-between border-b border-red-500/20 pb-2">
              <span className="font-hud font-bold text-red-400 text-xs uppercase flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                ACCIDENT & FLOOD ZONE ESTIMATED VICTIMS: 42
              </span>
              <span className="badge badge-critical text-[10px]">NEXT 30 MIN SURGE</span>
            </div>

            <div className="grid grid-cols-3 gap-3 font-mono text-xs">
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-center">
                <span className="text-slate-400 block text-[10px] font-bold">EMERGENCY BEDS:</span>
                <span className="text-amber-400 font-extrabold text-sm">18 Needed</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-center">
                <span className="text-slate-400 block text-[10px] font-bold">ICU CRITICAL:</span>
                <span className="text-red-400 font-extrabold text-sm">6 Needed</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800 text-center">
                <span className="text-slate-400 block text-[10px] font-bold">BLOOD UNITS:</span>
                <span className="text-cyan-400 font-extrabold text-sm">12 Units O-</span>
              </div>
            </div>
          </div>

          {/* Hospital Occupancy Table */}
          <div className="hud-panel p-3 bg-slate-950/80 rounded-lg border-slate-800">
            <h3 className="font-hud text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              CURRENT REGIONAL HOSPITAL CAPACITY:
            </h3>

            <div className="space-y-2 font-mono text-xs">
              {hospitals.map((h) => {
                const loadPct = Math.round((h.icuOccupied / h.icuTotal) * 100);
                return (
                  <div key={h.id} className="p-2.5 rounded bg-slate-900/90 border border-slate-800 flex items-center justify-between">
                    <div>
                      <span className="text-slate-200 font-bold block">{h.name}</span>
                      <span className="text-slate-400 text-[11px]">{h.traumaTier} • {h.ambulancesAvailable} Ambulances Ready</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-28 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                        <div 
                          className={`h-full ${loadPct > 80 ? 'bg-red-500' : 'bg-amber-400'}`}
                          style={{ width: `${loadPct}%` }}
                        ></div>
                      </div>
                      <span className={`font-bold font-hud ${loadPct > 80 ? 'text-red-400' : 'text-amber-400'}`}>
                        {loadPct}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* AI Load Balancing Recommendation */}
          <div className="p-3.5 rounded bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-between gap-3">
            <div className="space-y-1 font-mono text-xs text-cyan-200">
              <strong className="font-hud font-bold text-cyan-300 block">AI REDIRECTION DIRECTIVE:</strong>
              <p>
                "City General is at 88% capacity. Redirect 12 non-critical patients to Narayana Health Complex (66% load) to preserve emergency trauma headroom."
              </p>
            </div>
            <button
              onClick={() => {
                setRedirected(true);
                onRedirectPatients && onRedirectPatients();
                setTimeout(() => onClose(), 800);
              }}
              className="px-3.5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-hud font-bold text-xs border border-cyan-400 shrink-0 shadow-[0_0_12px_rgba(6,182,212,0.3)] transition-all"
            >
              {redirected ? "PATIENTS REDIRECTED!" : "EXECUTE REDIRECTION"}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
