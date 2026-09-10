import React, { useState } from 'react';
import { Layers, ShieldCheck, Cpu, Radio, X, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { MULTI_SOURCE_FEEDS, calculateFusedConfidence } from '../data/aiEngine';

export default function MultiSourceFusionModal({ isOpen, onClose, onFuseIncident }) {
  const [feeds, setFeeds] = useState(MULTI_SOURCE_FEEDS);
  const fusedResult = calculateFusedConfidence(feeds);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[2500] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="hud-panel w-full max-w-3xl bg-[#090d16] border-purple-500/40 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-purple-950/80 via-slate-900 to-slate-950 p-4 border-b border-purple-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-purple-950 text-purple-400 border border-purple-500/40 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
              <Layers className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-hud text-lg font-bold tracking-wider text-slate-100">
                  MULTI-SOURCE AI FUSION MATRIX
                </h2>
                <span className="badge bg-purple-950 text-purple-300 border-purple-500/40 text-[10px]">
                  <Cpu className="w-3 h-3 inline mr-1 text-purple-400" />
                  REAL-TIME CROSS-VALIDATION
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Synthesizing IoT, Citizen Reports, Weather Radar, Satellite & Emergency Calls
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
          
          {/* Feeds Table */}
          <div className="hud-panel p-3 bg-slate-950/80 rounded-lg border-slate-800">
            <h3 className="font-hud text-xs font-bold text-purple-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Radio className="w-4 h-4 text-purple-400" />
              INCOMING TELEMETRY FEEDS (5 ACTIVE SOURCES):
            </h3>
            <div className="space-y-2">
              {feeds.map((f, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded bg-slate-900/90 border border-slate-800 font-mono text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{f.icon}</span>
                    <div>
                      <span className="text-slate-200 font-bold block">{f.source}</span>
                      <span className="text-slate-400 text-[11px]">{f.telemetry}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-purple-300 border border-purple-500/20 font-bold">
                      +{f.weight}% weight
                    </span>
                    <span className="badge badge-success text-[10px]">
                      {f.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fusion Result Card */}
          <div className="hud-panel p-4 bg-gradient-to-br from-purple-950/40 via-slate-900 to-slate-950 rounded-lg border-purple-500/50 space-y-3">
            <div className="flex items-center justify-between border-b border-purple-500/30 pb-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-400" />
                <h4 className="font-hud font-bold text-purple-300 text-sm">
                  FUSED INCIDENT CLUSTER
                </h4>
              </div>
              <div className="flex items-center gap-2">
                <span className="badge bg-purple-900/80 text-purple-200 border-purple-400 font-extrabold text-xs px-3 py-1 animate-pulse">
                  FLOOD CONFIDENCE: {fusedResult.confidencePct}%
                </span>
                <span className="badge badge-critical text-xs px-2.5 py-1">
                  {fusedResult.severity}
                </span>
              </div>
            </div>

            <p className="text-xs font-mono text-slate-300">
              <strong className="text-purple-300">AI Conclusion:</strong> 5 independent data points confirm single high-severity flood inundation in Brahmaputra Low-Lying Delta. Duplicate citizen reports consolidated into unified master response ticket.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => {
                  onFuseIncident && onFuseIncident(fusedResult);
                  onClose();
                }}
                className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-hud font-bold text-xs flex items-center gap-1.5 border border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all"
              >
                <Zap className="w-4 h-4" />
                <span>MERGE FEEDS & DISPATCH AGENTS</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
