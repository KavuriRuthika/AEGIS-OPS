import React, { useState } from 'react';
import { RefreshCw, Ambulance, AlertCircle, ArrowRight, CheckCircle2, ShieldAlert, X } from 'lucide-react';

export default function DynamicReallocationModal({ isOpen, onClose, onConfirmReallocation }) {
  const [reallocated, setReallocated] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2500] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="hud-panel w-full max-w-3xl bg-[#090d16] border-emerald-500/40 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-950/80 via-slate-900 to-slate-950 p-4 border-b border-emerald-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
              <RefreshCw className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-hud text-lg font-bold tracking-wider text-slate-100">
                  DYNAMIC RESOURCE REALLOCATION ENGINE
                </h2>
                <span className="badge bg-emerald-950 text-emerald-300 border-emerald-500/40 text-[10px]">
                  MAXIMUM IMPACT OPTIMIZATION
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Real-time Priority Recalculation for Escalating Emergency Feeds
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
          
          {/* New Event Alert Header */}
          <div className="p-3 rounded bg-red-950/60 border border-red-500/40 flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-400 shrink-0 animate-bounce" />
            <div>
              <span className="font-hud font-bold text-red-300 text-xs uppercase block">
                NEW HIGH-SEVERITY EVENT DETECTED:
              </span>
              <span className="text-xs font-mono text-slate-200">
                Hospital Flood Inundation at City General (1,850 citizens stranded)
              </span>
            </div>
          </div>

          {/* Reallocation Matrix Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
            
            {/* INITIAL ASSIGNMENT */}
            <div className="hud-panel p-3.5 bg-slate-950/90 rounded-lg border-slate-800 space-y-2">
              <span className="font-hud font-bold text-slate-400 text-xs uppercase block border-b border-slate-800 pb-1">
                ORIGINAL ASSIGNMENT:
              </span>
              <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                <div className="flex items-center justify-between font-bold text-slate-200">
                  <span>🚑 Ambulance Unit A-01</span>
                  <span className="text-amber-400">DISPATCHED</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">Target: NH16 Road Accident (12 victims)</p>
              </div>
              <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800 opacity-60">
                <div className="flex items-center justify-between text-slate-400">
                  <span>🚑 Ambulance Unit B-04</span>
                  <span>STANDBY</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">Location: West Base (4 km distance)</p>
              </div>
            </div>

            {/* AI OPTIMIZED REALLOCATION */}
            <div className="hud-panel p-3.5 bg-emerald-950/30 rounded-lg border-emerald-500/40 space-y-2">
              <span className="font-hud font-bold text-emerald-400 text-xs uppercase block border-b border-emerald-500/30 pb-1">
                AI RE-BALANCED ALLOCATION (GREATEST IMPACT):
              </span>
              <div className="p-2.5 rounded bg-emerald-950/60 border border-emerald-500/40">
                <div className="flex items-center justify-between font-bold text-emerald-200">
                  <span>🚑 Ambulance Unit A-01</span>
                  <span className="text-emerald-400 animate-pulse">RE-ROUTED 🔀</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  <strong>New Destination:</strong> City General Hospital Flood Zone (Highest life threat)
                </p>
              </div>
              <div className="p-2.5 rounded bg-slate-900/90 border border-cyan-500/30">
                <div className="flex items-center justify-between font-bold text-cyan-200">
                  <span>🚑 Ambulance Unit B-04</span>
                  <span className="text-cyan-400">ASSIGNED BACKUP</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1">
                  <strong>New Destination:</strong> NH16 Road Accident (Fulfills initial demand)
                </p>
              </div>
            </div>

          </div>

          {/* AI Reasoning Directive */}
          <div className="p-3 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300 space-y-1">
            <strong className="text-emerald-400 font-hud">AI IMPACT DIRECTIVE:</strong>
            <p>
              "Reallocating Unit A-01 saves an estimated +18 high-risk victims at City General while Unit B-04 arrives at NH16 with only a 3-minute delay. Net life safety impact score increased by +34%."
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => {
                setReallocated(true);
                onConfirmReallocation && onConfirmReallocation();
                setTimeout(() => onClose(), 800);
              }}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-hud font-bold text-xs flex items-center gap-1.5 border border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{reallocated ? "UNITS RE-ASSIGNED & NOTIFIED!" : "CONFIRM AI REALLOCATION"}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
