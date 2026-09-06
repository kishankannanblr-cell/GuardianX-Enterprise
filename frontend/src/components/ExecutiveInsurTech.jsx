import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Slider } from "./ui/slider";
import { DollarSign, TrendingUp, Clock, Cpu, FileDown, Percent, Building2 } from "lucide-react";

const FIN_STYLE = {
  emerald: { border: "border-emerald-500/40", glow: "shadow-[0_0_15px_rgba(16,185,129,0.15)]", text: "text-emerald-400", icon: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", bar: "bg-emerald-500" },
  cyan: { border: "border-cyan-500/40", glow: "shadow-[0_0_15px_rgba(6,182,212,0.15)]", text: "text-cyan-400", icon: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30", bar: "bg-cyan-500" },
  amber: { border: "border-amber-500/40", glow: "shadow-[0_0_15px_rgba(245,158,11,0.15)]", text: "text-amber-400", icon: "bg-amber-500/15 text-amber-400 border-amber-500/30", bar: "bg-amber-500" },
  slate: { border: "border-slate-600/50", glow: "", text: "text-slate-200", icon: "bg-slate-500/15 text-slate-300 border-slate-500/30", bar: "bg-slate-500" },
};

function FinCard({ label, value, sub, color, icon: Icon, index }) {
  const s = FIN_STYLE[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`p-5 rounded-xl bg-slate-900/70 backdrop-blur-md border ${s.border} ${s.glow} relative overflow-hidden`}
    >
      <span className={`absolute left-0 top-0 h-full w-1 ${s.bar}`} />
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-mono-x font-bold tracking-[0.2em] uppercase text-slate-400 max-w-[70%]">
          {label}
        </p>
        <span className={`grid place-items-center h-8 w-8 rounded-lg border ${s.icon}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className={`font-mono-x text-2xl lg:text-3xl font-black tracking-tight mt-4 ${s.text}`}>
        {value}
      </div>
      <p className="text-[11px] text-slate-400 mt-1">{sub}</p>
    </motion.div>
  );
}

const fmt = (n) => "$" + n.toLocaleString("en-US");

export default function ExecutiveInsurTech({ onExport }) {
  const [premium, setPremium] = useState(800000);
  const discount = useMemo(() => Math.round(premium * 0.2), [premium]);
  const netProfit = useMemo(() => Math.round(discount - 36000), [discount]);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <FinCard label="Annual Policy Discount" value="$160,000" sub="20% verified life-safety credit" color="emerald" icon={DollarSign} index={0} />
        <FinCard label="Net Annual Profit" value="$124,000" sub="After monitoring OpEx" color="cyan" icon={TrendingUp} index={1} />
        <FinCard label="Payback Period" value="2.8 Months" sub="Full ROI realization" color="amber" icon={Clock} index={2} />
        <FinCard label="Hardware CapEx" value="$0" sub="Uses existing CCTV" color="slate" icon={Cpu} index={3} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="p-6 rounded-xl bg-slate-900/70 backdrop-blur-xl border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.1)] flex flex-col gap-6"
      >
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-heading text-lg font-bold tracking-wide uppercase flex items-center gap-2">
              <Percent className="h-4 w-4 text-cyan-400" /> Underwriting Discount Simulator
            </h2>
            <p className="text-[11px] text-slate-400 mt-1">
              Adjust the annual property insurance premium to compute the GuardianX 20% life-safety credit.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono-x text-[11px] font-bold tracking-wider">
            <Building2 className="h-4 w-4" /> 20% CREDIT LOCKED
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-end">
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono-x uppercase tracking-widest text-slate-400">
                Annual Property Insurance Premium
              </span>
              <span
                data-testid="premium-value-display"
                className="font-mono-x text-lg font-black text-cyan-300"
              >
                {fmt(premium)}
              </span>
            </div>
            <Slider
              data-testid="insurance-premium-slider"
              value={[premium]}
              min={200000}
              max={2000000}
              step={10000}
              onValueChange={(v) => setPremium(v[0])}
              className="py-2"
            />
            <div className="flex items-center justify-between text-[10px] font-mono-x text-slate-500">
              <span>$200K</span>
              <span>$2M</span>
            </div>
          </div>

          <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-5 text-center">
            <p className="text-[10px] font-mono-x uppercase tracking-widest text-emerald-400/80">
              Calculated Discount Credit
            </p>
            <div
              data-testid="calculated-discount-amount"
              className="font-mono-x text-3xl lg:text-4xl font-black text-emerald-400 mt-2"
            >
              {fmt(discount)}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Est. net profit <span className="text-emerald-300 font-bold">{fmt(netProfit)}</span> / yr
            </p>
          </div>
        </div>

        <button
          data-testid="export-underwriting-packet-button"
          onClick={() => onExport({ premium, discount, netProfit })}
          className="self-start flex items-center gap-2 px-5 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono-x font-bold text-[11px] uppercase tracking-wider transition-all active:scale-95 shadow-[0_0_20px_rgba(6,182,212,0.35)]"
        >
          <FileDown className="h-4 w-4" /> Export Underwriting Risk Packet
        </button>
      </motion.div>
    </div>
  );
}
