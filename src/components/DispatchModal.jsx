import React, { useState } from 'react';
import { X, Ambulance, Truck, ShieldCheck, CheckCircle2, Hospital, Home } from 'lucide-react';

export default function DispatchModal({ 
  isOpen, 
  onClose, 
  incident, 
  fleet, 
  hospitals, 
  shelters, 
  onConfirmDispatch 
}) {
  const [selectedFleet, setSelectedFleet] = useState(fleet[0]?.type || '');
  const [assignedHospital, setAssignedHospital] = useState(hospitals[0]?.name || '');
  const [assignedShelter, setAssignedShelter] = useState(shelters[0]?.name || '');

  if (!isOpen || !incident) return null;

  const handleDispatch = (e) => {
    e.preventDefault();
    onConfirmDispatch(incident.id, selectedFleet, assignedHospital, assignedShelter);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[2200] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="hud-panel w-full max-w-lg p-6 relative bg-[#0d1321] border-cyan-500/40 shadow-2xl">
        <div className="tactical-corner-tl"></div>
        <div className="tactical-corner-tr"></div>
        <div className="tactical-corner-bl"></div>
        <div className="tactical-corner-br"></div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 border-b border-slate-800 pb-3 mb-4">
          <Ambulance className="w-6 h-6 text-cyan-400 animate-bounce" />
          <div>
            <h2 className="font-hud text-xl font-bold text-slate-100 tracking-wider">
              DISPATCH COMMAND MATRIX
            </h2>
            <p className="text-xs font-mono text-cyan-400">INCIDENT: {incident.title}</p>
          </div>
        </div>

        <form onSubmit={handleDispatch} className="space-y-4 font-mono text-xs">
          
          {/* Target Location Summary */}
          <div className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
            <div className="text-[10px] text-slate-400 font-bold">SECTOR & SEVERITY</div>
            <div className="text-white font-bold">{incident.location} — {incident.severity} SEVERITY</div>
            <div className="text-cyan-400 text-[11px] mt-1">Currently Assigned: {incident.unitsAssigned.join(", ")}</div>
          </div>

          {/* Select Fleet Unit */}
          <div>
            <label className="block text-slate-300 mb-1 font-hud font-bold">SELECT FIRST RESPONDER FLEET</label>
            <select
              value={selectedFleet}
              onChange={(e) => setSelectedFleet(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-amber-400 font-bold focus:outline-none"
            >
              {fleet.map((unit, idx) => (
                <option key={idx} value={unit.type} disabled={unit.ready === 0}>
                  {unit.icon} {unit.type} ({unit.ready} Ready)
                </option>
              ))}
            </select>
          </div>

          {/* Select Destination Hospital for Triage */}
          <div>
            <label className="block text-slate-300 mb-1 font-hud font-bold">ASSIGNED MEDICAL HOSPITAL TRIAGE</label>
            <select
              value={assignedHospital}
              onChange={(e) => setAssignedHospital(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-cyan-400 font-bold focus:outline-none"
            >
              {hospitals.map((hosp) => (
                <option key={hosp.id} value={hosp.name}>
                  🏥 {hosp.name} (ICU: {hosp.icuOccupied}/{hosp.icuTotal})
                </option>
              ))}
            </select>
          </div>

          {/* Select Evacuation Shelter */}
          <div>
            <label className="block text-slate-300 mb-1 font-hud font-bold">ASSIGNED EVACUATION SHELTER</label>
            <select
              value={assignedShelter}
              onChange={(e) => setAssignedShelter(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-emerald-400 font-bold focus:outline-none"
            >
              {shelters.map((shl) => (
                <option key={shl.id} value={shl.name}>
                  ⛺ {shl.name} (Capacity: {shl.occupied}/{shl.capacity})
                </option>
              ))}
            </select>
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
              className="px-5 py-2 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-hud font-bold border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4" /> AUTHORIZE DISPATCH
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
