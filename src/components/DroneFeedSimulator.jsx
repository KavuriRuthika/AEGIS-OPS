import React, { useState, useEffect, useRef } from 'react';
import { 
  Video, 
  Eye, 
  Crosshair, 
  Thermometer, 
  Wind, 
  Compass, 
  Maximize2, 
  Radio,
  Zap,
  ShieldAlert
} from 'lucide-react';
import { SIMULATED_DRONE_FEEDS } from '../data/mockData';

export default function DroneFeedSimulator({ selectedSector }) {
  const [activeCamIndex, setActiveCamIndex] = useState(0);
  const [visionMode, setVisionMode] = useState('rgb'); // Default to clear REAL OPTICAL view
  const [zoomLevel, setZoomLevel] = useState(2.4);
  const canvasRef = useRef(null);

  // If selectedSector matches a camera location, switch to it
  useEffect(() => {
    if (selectedSector) {
      const foundIdx = SIMULATED_DRONE_FEEDS.findIndex(f => 
        f.target.toLowerCase().includes(selectedSector.toLowerCase()) || 
        f.name.toLowerCase().includes(selectedSector.toLowerCase())
      );
      if (foundIdx !== -1) {
        setActiveCamIndex(foundIdx);
      }
    }
  }, [selectedSector]);

  const currentCam = SIMULATED_DRONE_FEEDS[activeCamIndex] || SIMULATED_DRONE_FEEDS[0];

  const currentImage = currentCam?.image || "/satellite_flood.jpg";

  // Dynamic HUD canvas overlay reticle animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid overlay
      ctx.strokeStyle = visionMode === 'nightvision' ? 'rgba(34, 197, 94, 0.25)' : 'rgba(56, 189, 248, 0.2)';
      ctx.lineWidth = 1;
      const gridSize = 45;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Reticle Crosshair
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      ctx.strokeStyle = visionMode === 'nightvision' ? 'rgba(34, 197, 94, 0.95)' : 'rgba(6, 182, 212, 0.9)';
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, cy, 14, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx - 50, cy); ctx.lineTo(cx - 12, cy);
      ctx.moveTo(cx + 12, cy); ctx.lineTo(cx + 50, cy);
      ctx.moveTo(cx, cy - 50); ctx.lineTo(cx, cy - 12);
      ctx.moveTo(cx, cy + 12); ctx.lineTo(cx, cy + 50);
      ctx.stroke();

      // Rotating radar ring
      const angle = frame * 0.03;
      ctx.beginPath();
      ctx.arc(cx, cy, 75, angle, angle + Math.PI / 2);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [activeCamIndex, visionMode]);

  return (
    <div className="hud-panel p-4 flex flex-col h-full">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Video className="w-5 h-5 text-cyan-400 animate-pulse" />
          <h2 className="font-hud text-lg font-bold text-slate-100 tracking-wider">
            RECON DRONE & CCTV SURVEILLANCE
          </h2>
        </div>

        {/* Camera Selector Tabs */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded border border-slate-800 font-mono text-[11px] overflow-x-auto max-w-full">
          {SIMULATED_DRONE_FEEDS.map((feed, idx) => (
            <button
              key={feed.id}
              onClick={() => setActiveCamIndex(idx)}
              title={feed.target}
              className={`px-2 py-1 rounded font-hud font-bold whitespace-nowrap transition-all ${
                activeCamIndex === idx
                  ? 'bg-cyan-600 text-white shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              CAM-{(idx + 1).toString().padStart(2, '0')}
            </button>
          ))}
        </div>
      </div>

      {/* Camera Feed Screen with High Visibility Optical Aerial Drone View */}
      <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-cyan-500/40 bg-slate-950 flex items-center justify-center shadow-2xl">
        
        {/* Real Aerial Drone Video Stream Image */}
        <img
          key={currentCam.id + currentImage}
          src={currentImage}
          alt={currentCam.name}
          onError={(e) => { e.target.src = '/satellite_flood.jpg'; }}
          className={`w-full h-full object-cover scale-[1.02] transition-all duration-300 ${
            visionMode === 'thermal'
              ? 'filter saturate-[2.2] contrast-[1.4] hue-rotate-[-30deg]'
              : visionMode === 'nightvision'
              ? 'filter hue-rotate-[90deg] saturate-[2.5] contrast-[1.5] brightness-110'
              : 'filter contrast-[1.15] brightness-105'
          }`}
        />

        {/* Canvas HUD Overlay (Grid & Reticle) */}
        <canvas 
          ref={canvasRef} 
          width={640} 
          height={360} 
          className="absolute inset-0 w-full h-full pointer-events-none"
        />

        {/* HUD Telemetry Overlay */}
        <div className="absolute inset-0 pointer-events-none p-3 flex flex-col justify-between font-mono text-[11px]">
          
          {/* Top Info Strip */}
          <div className="flex justify-between items-start text-cyan-400 drop-shadow">
            <div className="bg-slate-950/85 backdrop-blur p-2 rounded border border-cyan-500/40 max-w-[70%]">
              <div className="font-hud font-bold text-xs text-white truncate">{currentCam.name}</div>
              <div className="text-[10px] text-slate-300 truncate">TARGET: {currentCam.target}</div>
              <div className="text-[10px] text-cyan-300">COORDS: {currentCam.coordinates}</div>
            </div>

            <div className="bg-slate-950/85 backdrop-blur p-2 rounded border border-cyan-500/40 text-right">
              <span className="inline-flex items-center gap-1 text-red-400 font-bold animate-pulse">
                <span className="w-2 h-2 rounded-full bg-red-500"></span> {currentCam.status}
              </span>
              <div className="text-[10px] text-slate-300 mt-0.5">ZOOM: {zoomLevel}x MAG</div>
            </div>
          </div>

          {/* Bottom Telemetry Controls */}
          <div className="flex justify-between items-end pointer-events-auto gap-2">
            
            <div className="bg-slate-950/85 backdrop-blur p-2 rounded border border-slate-800 text-slate-300 text-[10px] space-y-1">
              <div className="flex items-center gap-1">
                <Thermometer className="w-3 h-3 text-red-400" />
                <span>THERMAL: <strong className="text-white">{currentCam.thermalTemp}</strong></span>
              </div>
              <div className="flex items-center gap-1">
                <Wind className="w-3 h-3 text-cyan-400" />
                <span>WIND VANE: <strong className="text-white">{currentCam.windSpeed}</strong></span>
              </div>
            </div>

            {/* Vision Mode Switchers */}
            <div className="flex items-center gap-1.5 bg-slate-950/90 p-1 rounded border border-slate-800">
              <button
                onClick={() => setVisionMode('rgb')}
                className={`px-2 py-1 rounded text-[10px] font-hud font-bold transition-all ${
                  visionMode === 'rgb' ? 'bg-cyan-600 text-white shadow-[0_0_8px_rgba(6,182,212,0.5)]' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                REAL OPTICAL
              </button>

              <button
                onClick={() => setVisionMode('thermal')}
                className={`px-2 py-1 rounded text-[10px] font-hud font-bold transition-all ${
                  visionMode === 'thermal' ? 'bg-red-600 text-white shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                THERMAL IR
              </button>

              <button
                onClick={() => setVisionMode('nightvision')}
                className={`px-2 py-1 rounded text-[10px] font-hud font-bold transition-all ${
                  visionMode === 'nightvision' ? 'bg-emerald-600 text-white shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                NIGHT VISION
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
