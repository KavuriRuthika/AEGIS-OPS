import React, { useState } from 'react';
import { X, PlusCircle, AlertTriangle, ShieldAlert, MapPin } from 'lucide-react';

export default function IncidentModal({ isOpen, onClose, onSubmitIncident }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('fire');
  const [severity, setSeverity] = useState('HIGH');
  const [location, setLocation] = useState('Sector 3 Industrial Corridor');
  const [summary, setSummary] = useState('');
  const [affectedPeople, setAffectedPeople] = useState(500);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !summary) return;

    // Generate random lat/lng around Bay Area center
    const lat = 37.7650 + (Math.random() - 0.5) * 0.05;
    const lng = -122.4250 + (Math.random() - 0.5) * 0.05;

    const newIncident = {
      id: `INC-${Math.floor(1000 + Math.random() * 9000)}`,
      title,
      type,
      severity,
      category: severity === 'CRITICAL' ? 5 : severity === 'HIGH' ? 4 : 3,
      location,
      lat,
      lng,
      radiusMeters: severity === 'CRITICAL' ? 2500 : 1200,
      timestamp: new Date().toISOString().substring(11, 19) + ' UTC',
      summary,
      affectedPeople: Number(affectedPeople),
      unitsAssigned: ["Initial-Rescue-01"],
      status: "ACTIVE_CONTAINMENT",
      threatLevel: severity === 'CRITICAL' ? 90 : 70
    };

    onSubmitIncident(newIncident);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="hud-panel w-full max-w-lg p-6 relative bg-[#0d1321] border-cyan-500/40 shadow-2xl">
        <div className="tactical-corner-tl"></div>
        <div className="tactical-corner-tr"></div>
        <div className="tactical-corner-bl"></div>
        <div className="tactical-corner-br"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
          <ShieldAlert className="w-6 h-6 text-red-500 animate-pulse" />
          <h2 className="font-hud text-xl font-bold text-slate-100 tracking-wider">
            REPORT EMERGENCY INCIDENT
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          
          {/* Incident Title */}
          <div>
            <label className="block text-slate-300 mb-1 font-hud font-bold">INCIDENT TITLE</label>
            <input
              type="text"
              required
              placeholder="e.g. Chemical Pipeline Leak - Harbor Sector"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Type & Severity */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 mb-1 font-hud font-bold">INCIDENT TYPE</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-cyan-400 font-bold focus:outline-none focus:border-cyan-500"
              >
                <option value="fire">🔥 WILDFIRE / STRUCTURE</option>
                <option value="flood">🌊 FLASH FLOOD</option>
                <option value="accident">🚗 VEHICLE / SPILL</option>
                <option value="power">⚡ GRID POWER / HAZMAT</option>
                <option value="storm">🌪️ COASTAL SURGE</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-hud font-bold">SEVERITY LEVEL</label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-red-400 font-bold focus:outline-none focus:border-cyan-500"
              >
                <option value="CRITICAL">🔴 CRITICAL (DEFCON 1)</option>
                <option value="HIGH">🟠 HIGH SEVERITY</option>
                <option value="MODERATE">🟡 MODERATE</option>
              </select>
            </div>
          </div>

          {/* Location & Impacted Count */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 mb-1 font-hud font-bold">SECTOR LOCATION</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-hud font-bold">ESTIMATED POPULATION</label>
              <input
                type="number"
                required
                value={affectedPeople}
                onChange={(e) => setAffectedPeople(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Brief Summary */}
          <div>
            <label className="block text-slate-300 mb-1 font-hud font-bold">TELEMETRY & SITUATION SUMMARY</label>
            <textarea
              required
              rows={3}
              placeholder="Describe current hazards, wind speed, structural damage..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-slate-800 text-slate-400 hover:text-white font-hud font-bold"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-red-600 hover:bg-red-500 text-white font-hud font-bold border border-red-400 shadow-[0_0_15px_rgba(239,68,68,0.4)] flex items-center gap-1.5"
            >
              <PlusCircle className="w-4 h-4" /> DISPATCH & LOG INCIDENT
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
