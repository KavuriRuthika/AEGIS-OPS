import React, { useState } from 'react';
import { Megaphone, Radio, Globe, Send, ShieldCheck, X } from 'lucide-react';
import { generateTargetedBroadcasts } from '../data/aiEngine';

export default function TargetedBroadcastModal({ isOpen, onClose, onSendBroadcast }) {
  const [radius, setRadius] = useState(2.8);
  const [targetAudience, setTargetAudience] = useState("HIGH_RISK");
  const [activeLang, setActiveLang] = useState("en");
  const [sent, setSent] = useState(false);

  if (!isOpen) return null;

  const broadcastData = generateTargetedBroadcasts("Critical Inundation Alert", radius);

  return (
    <div className="fixed inset-0 z-[2500] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="hud-panel w-full max-w-3xl bg-[#090d16] border-amber-500/40 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-amber-950/80 via-slate-900 to-slate-950 p-4 border-b border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-950 text-amber-400 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
              <Megaphone className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-hud text-lg font-bold tracking-wider text-slate-100">
                  TARGETED EMERGENCY CITIZEN BROADCAST
                </h2>
                <span className="badge bg-amber-950 text-amber-300 border-amber-500/40 text-[10px]">
                  MULTI-LINGUAL CELL BROADCAST
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Location-Based Risk Perimeter Targeted Warning System
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
          
          {/* Target Radius & Audience Controls */}
          <div className="hud-panel p-3.5 bg-slate-950/90 rounded-lg border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="w-full sm:w-1/2">
                <label className="text-slate-400 block font-bold mb-1">
                  TARGET PERIMETER RADIUS: <span className="text-cyan-400">{radius} km</span>
                </label>
                <input 
                  type="range" 
                  min="0.5" 
                  max="10.0" 
                  step="0.1" 
                  value={radius} 
                  onChange={(e) => setRadius(parseFloat(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>
              <div className="w-full sm:w-1/2">
                <label className="text-slate-400 block font-bold mb-1">AUDIENCE SCOPE:</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setTargetAudience("ALL")}
                    className={`flex-1 py-1.5 rounded border text-[11px] font-bold ${
                      targetAudience === "ALL" 
                        ? "bg-amber-600 text-white border-amber-400" 
                        : "bg-slate-900 text-slate-400 border-slate-800"
                    }`}
                  >
                    SEND TO ALL ({(broadcastData.targetCount * 2).toLocaleString()})
                  </button>
                  <button
                    onClick={() => setTargetAudience("HIGH_RISK")}
                    className={`flex-1 py-1.5 rounded border text-[11px] font-bold ${
                      targetAudience === "HIGH_RISK" 
                        ? "bg-red-600 text-white border-red-400" 
                        : "bg-slate-900 text-slate-400 border-slate-800"
                    }`}
                  >
                    HIGH-RISK ONLY ({broadcastData.targetCount.toLocaleString()})
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Multi-Language Tabs */}
          <div className="hud-panel p-3.5 bg-slate-950/90 rounded-lg border-amber-500/30 space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              <span className="font-hud font-bold text-slate-300">BROADCAST LANGUAGE PREVIEW:</span>
              <div className="flex gap-2 ml-auto">
                {Object.keys(broadcastData.languages).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveLang(key)}
                    className={`px-3 py-1 rounded text-xs font-bold border ${
                      activeLang === key
                        ? "bg-cyan-950 text-cyan-300 border-cyan-400"
                        : "bg-slate-900 text-slate-400 border-slate-800"
                    }`}
                  >
                    {broadcastData.languages[key].code}
                  </button>
                ))}
              </div>
            </div>

            {/* Language Text Card */}
            <div className="p-3 rounded bg-slate-900 border border-slate-800 text-slate-100 leading-relaxed font-sans text-sm">
              {broadcastData.languages[activeLang].text}
            </div>
          </div>

          {/* Broadcast Action Button */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={() => {
                setSent(true);
                onSendBroadcast && onSendBroadcast({
                  title: "CRITICAL FLOOD WARNING",
                  message: broadcastData.languages[activeLang].text,
                  radius,
                  audience: targetAudience
                });
                setTimeout(() => onClose(), 800);
              }}
              className="px-5 py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white font-hud font-bold text-xs flex items-center gap-2 border border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-all"
            >
              <Send className="w-4 h-4" />
              <span>{sent ? "CELL BROADCAST TRANSMITTED!" : "TRANSMIT MULTI-LINGUAL WARNING"}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
