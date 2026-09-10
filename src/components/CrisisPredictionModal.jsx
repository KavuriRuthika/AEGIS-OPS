import React, { useState } from 'react';
import { Clock, TrendingUp, AlertTriangle, ShieldCheck, X, ArrowRight, Zap } from 'lucide-react';
import { predict60MinuteTimeline } from '../data/aiEngine';

export default function CrisisPredictionModal({ isOpen, onClose, incident, onExecutePreventative }) {
  const steps = predict60MinuteTimeline(incident);
  const [activeStep, setActiveStep] = useState(0);

  if (!isOpen) return null;

  const currentStep = steps[activeStep];

  return (
    <div className="fixed inset-0 z-[2500] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="hud-panel w-full max-w-3xl bg-[#090d16] border-amber-500/40 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-950 p-4 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-950 text-amber-400 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <TrendingUp className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-hud text-lg font-bold tracking-wider text-slate-100">
                  NEXT 60 MINUTES CRISIS PREDICTION
                </h2>
                <span className="badge bg-amber-950 text-amber-300 border-amber-500/40 text-[10px]">
                  PREDICTIVE RISK FORECAST
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Hydro & Meteorological Progression Modeling for {incident?.title || 'Flood Zone 3'}
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
          
          {/* Stepper Header */}
          <div className="grid grid-cols-4 gap-2">
            {steps.map((step, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`p-3 rounded-lg border text-center transition-all ${
                  activeStep === idx
                    ? "bg-amber-950/80 border-amber-400 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.25)] scale-[1.02]"
                    : "bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200"
                }`}
              >
                <span className="font-hud text-xs font-bold block">{step.time}</span>
                <span className="text-[10px] font-mono text-slate-400">{step.waterLevel}</span>
              </button>
            ))}
          </div>

          {/* Selected Step Detailed Breakdown */}
          <div className="hud-panel p-4 bg-slate-950/90 rounded-lg border-amber-500/40 space-y-3">
            <div className="flex items-center justify-between border-b border-amber-500/20 pb-2">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                <h3 className="font-hud font-bold text-amber-300 text-base">
                  TIMELINE MARKER: {currentStep.time}
                </h3>
              </div>
              <span className={`badge ${currentStep.riskLevel === 'EXTREME' || currentStep.riskLevel === 'CRITICAL' ? 'badge-critical' : 'badge-warning'}`}>
                RISK: {currentStep.riskLevel}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[11px] font-bold">WATER LEVEL TELEMETRY:</span>
                <span className="text-cyan-400 font-bold text-sm">{currentStep.waterLevel}</span>
              </div>
              <div className="p-2.5 rounded bg-slate-900/80 border border-slate-800">
                <span className="text-slate-400 block text-[11px] font-bold">EVACUATION ROUTE STATUS:</span>
                <span className="text-red-400 font-bold text-xs">{currentStep.roadStatus}</span>
              </div>
            </div>

            <div className="p-3 rounded bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300">
              <strong className="text-amber-300">Predicted Impact:</strong> {currentStep.impact}
            </div>

            {/* AI Action Directive */}
            <div className="p-3 rounded bg-amber-950/40 border border-amber-500/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-200">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span><strong>AI Directive:</strong> Pre-position rescue boats & issue evacuation before +40 MIN mark.</span>
              </div>
              <button
                onClick={() => {
                  onExecutePreventative && onExecutePreventative(currentStep);
                  onClose();
                }}
                className="px-3 py-1.5 rounded bg-amber-600 hover:bg-amber-500 text-white font-hud font-bold text-xs border border-amber-400 shrink-0 transition-colors"
              >
                EXECUTE PREVENTATIVE ACTION
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
