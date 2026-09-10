import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Search, 
  Filter, 
  MapPin, 
  Users, 
  ShieldAlert, 
  CheckCircle,
  Ambulance,
  Flame,
  Waves,
  Car,
  Zap,
  HelpCircle,
  Clock,
  RefreshCw,
  Wind,
  Activity,
  Mountain,
  Snowflake,
  Sun
} from 'lucide-react';

export default function AlertFeed({ 
  incidents, 
  selectedIncident, 
  onSelectIncident, 
  onDispatchUnit,
  onResolveIncident,
  onOpenXAI,
  onOpenPrediction,
  onOpenReallocation
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          incident.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          incident.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          incident.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSeverity = filterSeverity === 'ALL' || incident.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  const getIncidentIcon = (type) => {
    switch (type) {
      case 'fire': return <Flame className="w-4 h-4 text-red-400" />;
      case 'flood': return <Waves className="w-4 h-4 text-blue-400" />;
      case 'accident': return <Car className="w-4 h-4 text-amber-400" />;
      case 'storm': return <Wind className="w-4 h-4 text-cyan-400" />;
      case 'earthquake': return <Activity className="w-4 h-4 text-purple-400" />;
      case 'volcano': return <Flame className="w-4 h-4 text-orange-500" />;
      case 'landslide': return <Mountain className="w-4 h-4 text-amber-600" />;
      case 'blizzard': return <Snowflake className="w-4 h-4 text-cyan-200" />;
      case 'thunderstorm': return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'tsunami': return <Waves className="w-4 h-4 text-teal-400" />;
      case 'drought': return <Sun className="w-4 h-4 text-amber-400" />;
      default: return <AlertTriangle className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="hud-panel p-4 flex flex-col h-full min-h-[520px]">
      <div className="tactical-corner-tl"></div>
      <div className="tactical-corner-tr"></div>

      {/* Feed Header */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-red-500 animate-pulse" />
          <h2 className="font-hud text-lg font-bold text-slate-100 tracking-wider">
            NATURAL DISASTER CRISIS ALERTS
          </h2>
          <span className="px-2 py-0.5 rounded bg-red-950/80 border border-red-500/40 text-red-400 font-mono text-xs font-bold">
            {incidents.length} DISASTERS MONITORED
          </span>
        </div>
      </div>

      {/* Search & Filter Toggles */}
      <div className="flex flex-col gap-2 mb-3">
        {/* Search bar */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search natural disaster (flood, quake, cyclone, fire, landslide)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>

        {/* Severity Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          {['ALL', 'CRITICAL', 'HIGH', 'MODERATE'].map((sev) => (
            <button
              key={sev}
              onClick={() => setFilterSeverity(sev)}
              className={`px-2.5 py-1 rounded text-[10px] font-hud font-bold whitespace-nowrap transition-all border ${
                filterSeverity === sev
                  ? 'bg-cyan-600 text-white border-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.4)]'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Incident List Scrollable Area */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3 max-h-[460px]">
        {filteredIncidents.length === 0 ? (
          <div className="p-8 text-center font-mono text-xs text-slate-500 border border-dashed border-slate-800 rounded-lg">
            NO INCIDENTS MATCHING FILTER CRITERIA
          </div>
        ) : (
          filteredIncidents.map((incident) => {
            const isSelected = selectedIncident?.id === incident.id;
            return (
              <div
                key={incident.id}
                onClick={() => onSelectIncident(incident)}
                className={`p-3 rounded-lg border transition-all cursor-pointer relative overflow-hidden ${
                  isSelected 
                    ? 'bg-slate-900 border-cyan-500/80 shadow-[0_0_15px_rgba(6,182,212,0.25)]' 
                    : incident.severity === 'CRITICAL'
                    ? 'bg-red-950/20 border-red-500/30 hover:border-red-500/60'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Severity Indicator Bar */}
                <div className={`absolute top-0 left-0 bottom-0 w-1 ${
                  incident.severity === 'CRITICAL' ? 'bg-red-500' :
                  incident.severity === 'HIGH' ? 'bg-amber-500' : 'bg-cyan-500'
                }`}></div>

                <div className="pl-2">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-1.5">
                      {getIncidentIcon(incident.type)}
                      <span className="font-mono text-[10px] text-slate-400">{incident.id}</span>
                      <span className={`badge ${
                        incident.severity === 'CRITICAL' ? 'badge-critical' :
                        incident.severity === 'HIGH' ? 'badge-high' : 'badge-moderate'
                      }`}>
                        {incident.severity}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">{incident.timestamp}</span>
                  </div>

                  <h3 className="font-hud font-bold text-sm text-slate-100 group-hover:text-cyan-400 transition-colors">
                    {incident.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-1 font-mono text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-cyan-400" />
                      {incident.location}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 mt-1.5 line-clamp-2">
                    {incident.summary}
                  </p>

                  {/* AI Quick Actions Sub-Bar */}
                  <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between gap-1">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenXAI(incident);
                        }}
                        className="px-2 py-0.5 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/30 text-[10px] font-hud font-bold flex items-center gap-1"
                        title="Explainable AI Score Rationale"
                      >
                        <HelpCircle className="w-3 h-3 text-cyan-400" /> WHY?
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenPrediction(incident);
                        }}
                        className="px-2 py-0.5 rounded bg-amber-950 hover:bg-amber-900 text-amber-300 border border-amber-500/30 text-[10px] font-hud font-bold flex items-center gap-1"
                        title="+60 Min Predictive Timeline"
                      >
                        <Clock className="w-3 h-3 text-amber-400" /> +60M PREDICT
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenReallocation();
                        }}
                        className="px-2 py-0.5 rounded bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-500/30 text-[10px] font-hud font-bold flex items-center gap-1"
                        title="Dynamic Reallocate"
                      >
                        <RefreshCw className="w-3 h-3 text-emerald-400" /> REALLOCATE
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDispatchUnit(incident);
                        }}
                        className="px-2 py-0.5 rounded bg-red-900/60 hover:bg-red-800 text-red-200 font-hud text-[10px] font-bold border border-red-500/40 flex items-center gap-1"
                      >
                        <Ambulance className="w-3 h-3" /> DISPATCH
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onResolveIncident(incident.id);
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-emerald-400 border border-slate-700"
                        title="Mark Resolved"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
