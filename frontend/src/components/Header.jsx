import { motion } from "framer-motion";
import { ShieldCheck, Radio, Zap } from "lucide-react";

export default function Header({ view, setView, onSimulate, incidentActive }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 shadow-2xl"
    >
      <div className="flex items-center gap-3 w-full lg:w-auto">
        <div className="grid place-items-center h-11 w-11 rounded-lg bg-cyan-500/15 border border-cyan-500/40 shadow-[0_0_18px_rgba(6,182,212,0.25)]">
          <ShieldCheck className="h-6 w-6 text-cyan-400" />
        </div>
        <div>
          <h1
            data-testid="app-header-title"
            className="font-heading text-xl font-extrabold tracking-wider uppercase leading-none"
          >
            Guardian<span className="text-cyan-400">X</span> Enterprise
          </h1>
          <p className="text-[10px] font-mono-x tracking-[0.25em] text-slate-500 uppercase mt-1">
            Autonomous Life Safety · InsurTech Command
          </p>
        </div>
        <div
          data-testid="live-status-badge"
          className="hidden sm:inline-flex items-center gap-2 px-3 py-1 ml-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono-x font-bold tracking-widest uppercase"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          SOC Active | Live Feed
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
        <div className="flex items-center bg-slate-950/80 p-1.5 rounded-lg border border-slate-800 w-full sm:w-auto">
          <button
            data-testid="view-toggle-tactical"
            onClick={() => setView("tactical")}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md text-[11px] font-mono-x font-bold tracking-wider uppercase transition-all duration-200 ${
              view === "tactical"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                : "text-slate-400 hover:text-slate-200 border border-transparent"
            }`}
          >
            <Radio className="h-3.5 w-3.5" /> Tactical Command
          </button>
          <button
            data-testid="view-toggle-executive"
            onClick={() => setView("executive")}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-md text-[11px] font-mono-x font-bold tracking-wider uppercase transition-all duration-200 ${
              view === "executive"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.2)]"
                : "text-slate-400 hover:text-slate-200 border border-transparent"
            }`}
          >
            <Zap className="h-3.5 w-3.5" /> Executive InsurTech &amp; ROI
          </button>
        </div>

        <button
          data-testid="simulate-incident-button"
          onClick={onSimulate}
          className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-white font-mono-x font-bold text-[11px] uppercase tracking-wider transition-all duration-200 active:scale-95 ${
            incidentActive
              ? "bg-red-700 hover:bg-red-600 pulse-red"
              : "bg-red-600 hover:bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.4)]"
          }`}
        >
          <Zap className="h-4 w-4" />
          {incidentActive ? "Incident Live · Floor 14" : "Simulate Incident (Floor 14)"}
        </button>
      </div>
    </motion.header>
  );
}
