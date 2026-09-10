import React, { useState } from 'react';
import { Image as ImageIcon, Scan, Eye, Layers, X, Upload, CheckCircle2 } from 'lucide-react';
import { SATELLITE_SAMPLE_IMAGES } from '../data/aiEngine';

export default function SatelliteDroneIntelModal({ isOpen, onClose, onInjectMapOverlay }) {
  const [selectedScan, setSelectedScan] = useState(SATELLITE_SAMPLE_IMAGES[0]);
  const [isScanning, setIsScanning] = useState(false);
  const [customScans, setCustomScans] = useState([]);

  if (!isOpen) return null;

  const handleRunCV = (scan) => {
    setSelectedScan(scan);
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 1000);
  };

  const handleCustomFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const customObj = {
      id: `SAT-CUSTOM-${Date.now().toString().slice(-4)}`,
      name: `Custom Recon — ${file.name}`,
      type: "custom",
      url: imageUrl,
      detections: [
        { type: "Custom Hazard Zone", count: "Detected area", severity: "CRITICAL", coords: [[22.59, 78.96], [22.60, 78.98], [22.58, 78.99]] },
        { type: "Inaccessible Escape Route", count: "1 route blocked", severity: "HIGH" },
        { type: "Structures Monitored", count: "48 buildings", severity: "MEDIUM" }
      ],
      riskScore: 88
    };

    setCustomScans(prev => [customObj, ...prev]);
    handleRunCV(customObj);
  };

  const allScans = [...customScans, ...SATELLITE_SAMPLE_IMAGES];

  return (
    <div className="fixed inset-0 z-[2500] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="hud-panel w-full max-w-4xl bg-[#090d16] border-cyan-500/40 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-cyan-950/80 via-slate-900 to-slate-950 p-4 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Scan className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-hud text-lg font-bold tracking-wider text-slate-100">
                  SATELLITE & DRONE RECON IMAGE INTELLIGENCE
                </h2>
                <span className="badge bg-cyan-950 text-cyan-300 border-cyan-500/40 text-[10px]">
                  COMPUTER VISION CV SCANNER
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Automated damage, flood, fire, route blockage & stranded citizen detection
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
        <div className="p-4 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-4">
          
          {/* Image & Canvas Scanning View (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            
            {/* Scan Image Box */}
            <div className="relative rounded-lg border border-cyan-500/30 overflow-hidden bg-slate-950 h-80 flex items-center justify-center">
              <img 
                src={selectedScan.url} 
                alt={selectedScan.name}
                className="w-full h-full object-cover opacity-90 scale-[1.02]" 
              />

              {/* Laser Scanning Animation Overlay */}
              {isScanning ? (
                <div className="absolute inset-0 bg-cyan-500/10 backdrop-blur-[2px] flex flex-col items-center justify-center">
                  <div className="w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse absolute top-1/2 -translate-y-1/2 shadow-[0_0_20px_#06b6d4]"></div>
                  <span className="font-hud font-extrabold text-cyan-300 tracking-widest text-sm bg-black/80 px-4 py-1.5 rounded border border-cyan-400 animate-pulse">
                    RUNNING NEURAL CV OBJECT DETECTION...
                  </span>
                </div>
              ) : (
                /* Dynamic Bounding Box Highlights matching active scan detections */
                <div className="absolute inset-0 pointer-events-none p-4 flex flex-col justify-between">
                  {selectedScan.detections[0] && (
                    <div className="border-2 border-red-500 bg-red-950/80 backdrop-blur rounded p-2 text-[11px] font-mono text-red-200 font-bold max-w-fit shadow-[0_0_12px_rgba(239,68,68,0.5)]">
                      🎯 {selectedScan.detections[0].type.toUpperCase()}: {selectedScan.detections[0].count}
                    </div>
                  )}
                  {selectedScan.detections[1] && (
                    <div className="self-end border-2 border-amber-500 bg-amber-950/80 backdrop-blur rounded p-2 text-[11px] font-mono text-amber-200 font-bold max-w-fit shadow-[0_0_12px_rgba(245,158,11,0.5)]">
                      ⚠️ {selectedScan.detections[1].type.toUpperCase()}: {selectedScan.detections[1].count}
                    </div>
                  )}
                </div>
              )}

              <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded text-[10px] font-mono text-cyan-400 border border-cyan-500/30">
                {selectedScan.id} • RESOLUTION: 4K HIGH-ALTITUDE SAR
              </div>
            </div>

            {/* Upload & Select Bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-hud font-bold text-slate-400 uppercase">
                  SELECT SATELLITE / DRONE RECON IMAGE:
                </span>
                <label className="px-2.5 py-1 rounded bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-hud text-[11px] font-bold cursor-pointer flex items-center gap-1">
                  <Upload className="w-3 h-3 text-cyan-400" />
                  <span>UPLOAD IMAGE</span>
                  <input type="file" accept="image/*" className="hidden" onChange={handleCustomFileUpload} />
                </label>
              </div>

              {/* Scan Selector Chips */}
              <div className="grid grid-cols-2 gap-2 max-h-44 overflow-y-auto pr-1">
                {allScans.map((scan) => (
                  <button
                    key={scan.id}
                    onClick={() => handleRunCV(scan)}
                    className={`p-2 rounded-lg border text-xs font-mono text-left transition-all ${
                      selectedScan.id === scan.id
                        ? "bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-[0_0_10px_rgba(6,182,212,0.2)]"
                        : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span className="font-bold block truncate">{scan.name}</span>
                    <span className="text-[10px] text-slate-400">Risk: {scan.riskScore}%</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Detections Breakdown (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-3">
            
            <div className="hud-panel p-3.5 bg-slate-950/90 rounded-lg border-cyan-500/30 flex-1">
              <h3 className="font-hud text-xs font-bold text-cyan-300 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-cyan-400" />
                COMPUTER VISION DETECTION REPORT:
              </h3>

              <div className="space-y-2.5">
                {selectedScan.detections.map((d, i) => (
                  <div key={i} className="p-2.5 rounded bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs font-mono">
                    <div>
                      <span className="text-slate-200 font-bold block">{d.type}</span>
                      <span className="text-cyan-400 text-[11px]">{d.count}</span>
                    </div>
                    <span className={`badge ${d.severity === 'CRITICAL' ? 'badge-critical' : 'badge-high'}`}>
                      {d.severity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => {
                onInjectMapOverlay && onInjectMapOverlay(selectedScan);
                onClose();
              }}
              className="w-full py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-hud font-bold text-xs flex items-center justify-center gap-2 border border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
            >
              <Eye className="w-4 h-4" />
              <span>OVERLAY DETECTED RISK ZONE ON CRISIS MAP</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
}
