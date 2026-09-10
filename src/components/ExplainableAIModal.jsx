import React from 'react';
import { HelpCircle, Calculator, Info, ShieldAlert, X } from 'lucide-react';
import { getXAIScoreBreakdown } from '../data/aiEngine';

export default function ExplainableAIModal({ isOpen, onClose, incident }) {
  if (!isOpen) return null;

  const xai = getXAIScoreBreakdown(incident);

  return (
    <div className="fixed inset-0 z-[2500] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="hud-panel w-full max-w-2xl bg-[#090d16] border-cyan-500/40 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-cyan-950/80 via-slate-900 to-slate-950 p-4 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Calculator className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-hud text-lg font-bold tracking-wider text-slate-100">
                  EXPLAINABLE AI (XAI) — RISK SCORE BREAKDOWN
                </h2>
                <span className="badge bg-cyan-950 text-cyan-300 border-cyan-500/40 text-[10px]">
                  TRANSPARENT DECISION AUDIT
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Mathematical factor weighting for {xai.title} ({xai.incidentId})
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
          
          {/* Total Score Badge Box */}
          <div className="hud-panel hud-panel-critical p-4 bg-slate-950/90 rounded-lg flex items-center justify-between border-red-500/40">
            <div>
              <span className="font-hud text-xs font-bold text-slate-400 uppercase tracking-wider block">
                COMPUTED SEVERITY PRIORITY INDEX:
              </span>
              <span className="text-xs font-mono text-slate-300">
                Algorithm: AEGIS Multi-Variable Hazard Function v4
              </span>
            </div>
            <div className="text-right">
              <div className="text-3xl font-hud font-extrabold text-red-500 tracking-wider">
                {xai.totalScore} <span className="text-sm text-slate-500 font-normal">/ 100</span>
              </div>
              <span className="badge badge-critical text-[10px]">CRITICAL DEFCON LEVEL</span>
            </div>
          </div>

          {/* Factor Breakdown Table */}
          <div className="hud-panel p-3 bg-slate-950/80 rounded-lg border-slate-800">
            <h3 className="font-hud text-xs font-bold text-cyan-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-cyan-400" />
              FACTOR WEIGHTING CONTRIBUTION:
            </h3>

            <div className="space-y-2">
              {xai.factors.map((f, idx) => (
                <div key={idx} className="p-2.5 rounded bg-slate-900/90 border border-slate-800 flex items-center justify-between text-xs font-mono">
                  <div className="space-y-0.5">
                    <span className="text-slate-200 font-bold block">{f.name}</span>
                    <span className="text-slate-400 text-[11px]">{f.desc}</span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-slate-800 text-cyan-400 border border-cyan-500/30 font-bold font-hud">
                    +{f.score} pts
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Natural Language Rationale */}
          <div className="p-3 rounded bg-cyan-950/40 border border-cyan-500/30 font-mono text-xs text-cyan-200 space-y-1">
            <div className="flex items-center gap-1.5 font-hud font-bold text-cyan-300 uppercase">
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>AI REASONING AUDIT LOG:</span>
            </div>
            <p className="italic text-slate-300">
              "{xai.reasoning}"
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
