import React, { useState } from 'react';
import { Bot, Send, Sparkles, AlertTriangle, CheckCircle2, ShieldAlert, X, Zap } from 'lucide-react';
import { getAICopilotAnalysis } from '../data/aiEngine';

export default function AICrisisCopilotModal({ isOpen, onClose, onExecuteAction }) {
  const [query, setQuery] = useState('');
  const [activeAnalysis, setActiveAnalysis] = useState(getAICopilotAnalysis('most dangerous'));
  const [history, setHistory] = useState([
    {
      role: 'assistant',
      analysis: getAICopilotAnalysis('most dangerous')
    }
  ]);

  if (!isOpen) return null;

  const handleSend = (textToSend) => {
    const promptText = textToSend || query;
    if (!promptText.trim()) return;

    const newAnalysis = getAICopilotAnalysis(promptText);
    setActiveAnalysis(newAnalysis);

    setHistory(prev => [
      ...prev,
      { role: 'user', text: promptText },
      { role: 'assistant', analysis: newAnalysis }
    ]);

    setQuery('');
  };

  const quickPrompts = [
    "What is the most dangerous situation right now?",
    "Show hospital surge & ICU bed bottleneck",
    "System-wide crisis telemetry summary"
  ];

  return (
    <div className="fixed inset-0 z-[2500] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="hud-panel w-full max-w-3xl bg-[#090d16] border-cyan-500/40 rounded-xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-cyan-950/80 via-slate-900 to-slate-950 p-4 border-b border-cyan-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
              <Bot className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-hud text-lg font-bold tracking-wider text-slate-100">
                  AI CRISIS COPILOT
                </h2>
                <span className="badge bg-cyan-950 text-cyan-400 border-cyan-500/40 text-[10px]">
                  <Sparkles className="w-3 h-3 text-cyan-400 inline mr-1" />
                  DECISION SUPPORT ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">
                Command Center Automated Incident Analysis & Strategic Action Recommender
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

        {/* Modal Body: Preset Chips + Conversation Feed */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          
          {/* Quick Prompts Bar */}
          <div className="flex flex-wrap gap-2">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="px-3 py-1.5 rounded-lg bg-slate-900/90 hover:bg-cyan-950/70 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-xs font-mono transition-all flex items-center gap-1.5"
              >
                <Zap className="w-3 h-3 text-cyan-400" />
                <span>{prompt}</span>
              </button>
            ))}
          </div>

          {/* Analysis View */}
          {activeAnalysis && (
            <div className="hud-panel hud-panel-critical p-4 bg-slate-950/90 rounded-lg space-y-4 border-red-500/40">
              
              {/* Incident Header */}
              <div className="flex items-start justify-between border-b border-red-500/20 pb-3">
                <div>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
                    <h3 className="font-hud font-bold text-red-400 text-base">
                      {activeAnalysis.title}
                    </h3>
                  </div>
                  <p className="text-xs font-mono text-slate-300 mt-1">
                    👥 {activeAnalysis.affectedCount}
                  </p>
                </div>
                <span className="badge badge-critical px-2.5 py-1">PRIORITY 1</span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {activeAnalysis.metrics.map((m, i) => (
                  <div key={i} className="p-2.5 rounded bg-slate-900/80 border border-slate-800 font-mono text-xs">
                    <span className="text-slate-400 block text-[11px] font-bold">{m.label}:</span>
                    <span className="text-cyan-300 font-bold text-xs">{m.val}</span>
                  </div>
                ))}
              </div>

              {/* Recommended Actions */}
              <div>
                <h4 className="font-hud text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-amber-400" />
                  RECOMMENDED PREVENTIVE & RESCUE ACTIONS:
                </h4>
                <ul className="space-y-2">
                  {activeAnalysis.actions.map((act, i) => (
                    <li key={i} className="flex items-start justify-between gap-3 p-2 rounded bg-slate-900/60 border border-slate-800 text-xs font-mono">
                      <div className="flex items-start gap-2 text-slate-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{act}</span>
                      </div>
                      <button
                        onClick={() => onExecuteAction && onExecuteAction(act)}
                        className="px-2 py-1 rounded bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/40 text-[10px] font-hud font-bold tracking-wider shrink-0 transition-colors"
                      >
                        EXECUTE
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          )}

        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask AI Copilot (e.g. 'What is the evacuation status?')..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-100 focus:outline-none focus:border-cyan-500"
          />
          <button
            onClick={() => handleSend()}
            className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-hud font-bold text-xs rounded-lg flex items-center gap-1 border border-cyan-400 transition-all"
          >
            <Send className="w-3.5 h-3.5" />
            <span>ASK AI</span>
          </button>
        </div>

      </div>
    </div>
  );
}
