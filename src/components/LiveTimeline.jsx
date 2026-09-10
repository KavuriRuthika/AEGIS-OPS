import React from 'react';
import { 
  Clock, 
  Activity, 
  Play, 
  Pause, 
  ShieldAlert, 
  Radio, 
  CheckCircle,
  TrendingUp,
  AlertCircle,
  Cpu
} from 'lucide-react';

export default function LiveTimeline({ 
  timelineEvents, 
  autoSimulate, 
  setAutoSimulate,
  incidentsCount,
  criticalCount,
  icuAvailable,
  shelterSpots
}) {
  return (
    <div className="hud-panel p-4 flex flex-col h-full">
      
      {/* Header with simulation toggle */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-cyan-400" />
          <h2 className="font-hud text-lg font-bold text-slate-100 tracking-wider">
            LIVE DISPATCH TIMELINE
          </h2>
        </div>

        <button
          onClick={() => setAutoSimulate(!autoSimulate)}
          className={`px-3 py-1 rounded text-xs font-mono font-bold flex items-center gap-1.5 transition-all border ${
            autoSimulate
              ? 'bg-cyan-950/80 text-cyan-400 border-cyan-500/60 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
              : 'bg-slate-900 text-slate-500 border-slate-800 hover:text-slate-300'
          }`}
        >
          {autoSimulate ? <Pause className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> : <Play className="w-3.5 h-3.5" />}
          <span>{autoSimulate ? 'LIVE FEED ON (20s)' : 'FEED PAUSED'}</span>
        </button>
      </div>

      {/* Metrics Summary Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
        <div className="p-2 rounded bg-slate-900/90 border border-slate-800 font-mono">
          <div className="text-[10px] text-slate-400">ACTIVE INCIDENTS</div>
          <div className="text-lg font-bold text-cyan-400 font-hud">{incidentsCount}</div>
        </div>

        <div className="p-2 rounded bg-slate-900/90 border border-slate-800 font-mono">
          <div className="text-[10px] text-slate-400">CRITICAL DEFCON 1</div>
          <div className="text-lg font-bold text-red-500 font-hud">{criticalCount}</div>
        </div>

        <div className="p-2 rounded bg-slate-900/90 border border-slate-800 font-mono">
          <div className="text-[10px] text-slate-400">ICU BEDS AVAIL</div>
          <div className="text-lg font-bold text-emerald-400 font-hud">{icuAvailable}</div>
        </div>

        <div className="p-2 rounded bg-slate-900/90 border border-slate-800 font-mono">
          <div className="text-[10px] text-slate-400">SHELTER SPOTS</div>
          <div className="text-lg font-bold text-amber-400 font-hud">{shelterSpots}</div>
        </div>
      </div>

      {/* Timeline Stream */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-2.5 max-h-[300px]">
        {timelineEvents.map((evt) => (
          <div 
            key={evt.id} 
            className="p-2.5 rounded bg-slate-900/60 border border-slate-800/80 hover:border-slate-700 transition-all flex items-start gap-2.5"
          >
            <div className="mt-0.5">
              {evt.type === 'critical' ? (
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></div>
              ) : evt.type === 'warning' ? (
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500"></div>
              ) : (
                <div className="w-2.5 h-2.5 rounded-full bg-cyan-500"></div>
              )}
            </div>

            <div className="flex-1 min-w-0 font-mono text-xs">
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="font-bold text-slate-200 truncate font-hud text-sm">{evt.title}</span>
                <span className="text-[10px] text-slate-400 shrink-0">{evt.time}</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-snug">{evt.description}</p>
              <div className="mt-1 text-[10px] text-cyan-400 font-bold flex items-center gap-2">
                <span>{evt.sector || 'Sector All'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
