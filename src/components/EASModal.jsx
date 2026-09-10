import React, { useState } from 'react';
import { X, Megaphone, Radio, Volume2, AlertOctagon, ShieldAlert } from 'lucide-react';
import { playAlertSiren } from '../data/mockData';

export default function EASModal({ isOpen, onClose, onTriggerBroadcast }) {
  const [broadcastPreset, setBroadcastPreset] = useState("MANDATORY EVACUATION ORDER");
  const [messageText, setMessageText] = useState("ATTENTION ALL RESIDENTS: Mandatory Evacuation Order issued for Sectors 2 and 4 due to rapidly advancing hazards. Move immediately to Civic Arena Shelter.");
  const [targetSector, setTargetSector] = useState("Sectors 1, 2, 4");
  const [isBroadcasting, setIsBroadcasting] = useState(false);

  if (!isOpen) return null;

  const handleBroadcast = (e) => {
    e.preventDefault();
    setIsBroadcasting(true);
    playAlertSiren("critical");

    setTimeout(() => {
      onTriggerBroadcast({
        title: broadcastPreset,
        message: messageText,
        sector: targetSector
      });
      setIsBroadcasting(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[2500] bg-black/90 backdrop-blur-lg flex items-center justify-center p-4">
      <div className="hud-panel w-full max-w-xl p-6 relative bg-red-950/40 border-red-500/80 shadow-[0_0_50px_rgba(239,68,68,0.3)]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 border-b border-red-500/40 pb-3 mb-4">
          <AlertOctagon className="w-7 h-7 text-red-500 animate-ping" />
          <div>
            <h2 className="font-hud text-2xl font-extrabold text-red-400 tracking-wider">
              EMERGENCY ALERT SYSTEM (EAS)
            </h2>
            <p className="text-xs font-mono text-slate-300">PUBLIC BROADCAST & SIREN DISPATCH MATRIX</p>
          </div>
        </div>

        <form onSubmit={handleBroadcast} className="space-y-4 font-mono text-xs">
          
          {/* Preset selector */}
          <div>
            <label className="block text-slate-300 mb-1 font-hud font-bold">ALERT PRESET TYPE</label>
            <select
              value={broadcastPreset}
              onChange={(e) => setBroadcastPreset(e.target.value)}
              className="w-full bg-slate-900 border border-red-500/50 rounded p-2 text-red-400 font-bold focus:outline-none"
            >
              <option value="MANDATORY EVACUATION ORDER">🔴 MANDATORY EVACUATION ORDER</option>
              <option value="SHELTER IN PLACE ALERT">🟠 SHELTER IN PLACE ALERT</option>
              <option value="HAZMAT EXCLUSION WARNING">☣️ HAZMAT CHEMICAL EXCLUSION</option>
              <option value="FLASH FLOOD SURGE ADVISORY">🌊 FLASH FLOOD SURGE ADVISORY</option>
            </select>
          </div>

          {/* Targeted Sectors */}
          <div>
            <label className="block text-slate-300 mb-1 font-hud font-bold">TARGET BROADCAST SECTORS</label>
            <input
              type="text"
              required
              value={targetSector}
              onChange={(e) => setTargetSector(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-cyan-400 font-bold focus:outline-none"
            />
          </div>

          {/* Broadcast Message Body */}
          <div>
            <label className="block text-slate-300 mb-1 font-hud font-bold">PUBLIC BROADCAST MESSAGE</label>
            <textarea
              required
              rows={4}
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none"
            />
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => playAlertSiren("critical")}
              className="px-3 py-2 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 font-hud text-xs font-bold border border-slate-700 flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" /> TEST SIREN AUDIO
            </button>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded bg-slate-800 text-slate-400 hover:text-white font-hud font-bold"
              >
                CANCEL
              </button>

              <button
                type="submit"
                disabled={isBroadcasting}
                className="px-5 py-2 rounded bg-red-600 hover:bg-red-500 text-white font-hud font-bold border border-red-400 shadow-[0_0_20px_rgba(239,68,68,0.6)] flex items-center gap-2 text-sm"
              >
                <Megaphone className="w-4 h-4" />
                {isBroadcasting ? "TRANSMITTING EAS BROADCAST..." : "TRANSMIT PUBLIC BROADCAST"}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
