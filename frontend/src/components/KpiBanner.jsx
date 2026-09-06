import { motion } from "framer-motion";
import { AlertTriangle, Users, Timer, PiggyBank } from "lucide-react";

const STYLES = {
  red: {
    border: "border-red-500/40",
    glow: "shadow-[0_0_15px_rgba(239,68,68,0.15)]",
    text: "text-red-400",
    icon: "bg-red-500/15 text-red-400 border-red-500/30",
    accent: "bg-red-500",
  },
  amber: {
    border: "border-amber-500/40",
    glow: "shadow-[0_0_15px_rgba(245,158,11,0.15)]",
    text: "text-amber-400",
    icon: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    accent: "bg-amber-500",
  },
  cyan: {
    border: "border-cyan-500/40",
    glow: "shadow-[0_0_15px_rgba(6,182,212,0.15)]",
    text: "text-cyan-400",
    icon: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    accent: "bg-cyan-500",
  },
  emerald: {
    border: "border-emerald-500/40",
    glow: "shadow-[0_0_15px_rgba(16,185,129,0.15)]",
    text: "text-emerald-400",
    icon: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    accent: "bg-emerald-500",
  },
};

function KpiCard({ testId, label, value, sub, color, icon: Icon, index }) {
  const s = STYLES[color];
  return (
    <motion.div
      data-testid={testId}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`p-5 rounded-xl bg-slate-900/70 backdrop-blur-md border ${s.border} ${s.glow} flex flex-col justify-between relative overflow-hidden`}
    >
      <span className={`absolute left-0 top-0 h-full w-1 ${s.accent}`} />
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-mono-x font-bold tracking-[0.2em] uppercase text-slate-400">
          {label}
        </p>
        <span className={`grid place-items-center h-8 w-8 rounded-lg border ${s.icon}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-4">
        <div className={`font-mono-x text-3xl font-black tracking-tight ${s.text}`}>
          {value}
        </div>
        <p className="text-[11px] font-medium text-slate-400 mt-1">{sub}</p>
      </div>
    </motion.div>
  );
}

export default function KpiBanner({ kpis }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KpiCard
        testId="kpi-active-alarms"
        label="Active Alarms"
        value={kpis.activeAlarms}
        sub={`${kpis.activeAlarmsLabel} · Floor 14`}
        color="red"
        icon={AlertTriangle}
        index={0}
      />
      <KpiCard
        testId="kpi-occupants-located"
        label="Occupants Located"
        value={kpis.occupants}
        sub={`${kpis.occupantsLabel} · Awaiting SAR`}
        color="amber"
        icon={Users}
        index={1}
      />
      <KpiCard
        testId="kpi-triage-latency"
        label="Triage Latency"
        value={`${kpis.latency.toFixed(2)}s`}
        sub="AI decision cycle"
        color="cyan"
        icon={Timer}
        index={2}
      />
      <KpiCard
        testId="kpi-annual-savings"
        label="Annual Insurance Savings"
        value={`$${(kpis.savings / 1000).toFixed(0)}K`}
        sub="/ yr · Verified underwriting"
        color="emerald"
        icon={PiggyBank}
        index={3}
      />
    </div>
  );
}
