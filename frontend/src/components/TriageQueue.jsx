import { motion, AnimatePresence } from "framer-motion";
import { Users, Flame, ShieldAlert, Send, Eye, CheckCircle2, ListOrdered } from "lucide-react";

const TIER_STYLE = {
  red: { bar: "bg-red-500", text: "text-red-400", chip: "bg-red-500/15 text-red-300 border-red-500/40", ring: "border-red-500/40" },
  amber: { bar: "bg-amber-500", text: "text-amber-400", chip: "bg-amber-500/15 text-amber-300 border-amber-500/40", ring: "border-amber-500/30" },
  cyan: { bar: "bg-cyan-500", text: "text-cyan-400", chip: "bg-cyan-500/15 text-cyan-300 border-cyan-500/40", ring: "border-cyan-500/25" },
  emerald: { bar: "bg-emerald-500", text: "text-emerald-400", chip: "bg-emerald-500/15 text-emerald-300 border-emerald-500/40", ring: "border-emerald-500/25" },
};

function ActionButton({ item, onDispatch }) {
  const s = TIER_STYLE[item.color];
  if (item.action === "sar") {
    return (
      <button
        data-testid={`authorize-sar-dispatch-button-${item.id}`}
        onClick={() => onDispatch(item)}
        className={`w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-[10px] font-mono-x font-bold uppercase tracking-wider transition-all active:scale-95 ${
          item.color === "red"
            ? "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_16px_rgba(239,68,68,0.35)]"
            : "bg-amber-500 hover:bg-amber-400 text-slate-900"
        }`}
      >
        <Send className="h-3.5 w-3.5" /> Authorize SAR Dispatch
      </button>
    );
  }
  if (item.action === "monitor") {
    return (
      <div className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-[10px] font-mono-x font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
        <Eye className="h-3.5 w-3.5" /> Monitoring Sensors
      </div>
    );
  }
  return (
    <div className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-[10px] font-mono-x font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
      <CheckCircle2 className="h-3.5 w-3.5" /> Verified Clear
    </div>
  );
}

export default function TriageQueue({ queue, onDispatch, dispatched }) {
  return (
    <div className="lg:col-span-5 flex flex-col gap-4 p-5 rounded-xl bg-slate-900/60 backdrop-blur-xl border border-slate-800">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold tracking-wide uppercase flex items-center gap-2">
          <ListOrdered className="h-4 w-4 text-cyan-400" /> Room-Priority Triage
        </h2>
        <span className="font-mono-x text-[10px] tracking-widest uppercase text-slate-500">
          AI Ranked
        </span>
      </div>

      <div className="flex flex-col gap-3">
        <AnimatePresence>
          {queue.map((item, i) => {
            const s = TIER_STYLE[item.color];
            const isDispatched = dispatched.includes(item.id);
            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                data-testid={`triage-item-${item.id}`}
                className={`relative p-4 rounded-lg bg-slate-950/60 border ${s.ring} overflow-hidden`}
              >
                <span className={`absolute left-0 top-0 h-full w-1 ${s.bar}`} />
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className={`inline-block text-[9px] font-mono-x font-bold uppercase tracking-widest px-2 py-0.5 rounded border ${s.chip}`}>
                      {item.tierLabel}
                    </span>
                    <p className="font-heading text-base font-bold mt-2 text-slate-100">
                      {item.room}
                    </p>
                    <p className="text-[11px] text-slate-400">{item.zone}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className={`font-mono-x text-2xl font-black ${s.text}`}>{item.score}</div>
                    <p className="text-[9px] font-mono-x uppercase tracking-widest text-slate-500">urgency</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3 text-[11px] text-slate-300">
                  <span className="inline-flex items-center gap-1">
                    <Users className="h-3.5 w-3.5 text-slate-500" /> {item.occupants} occupant{item.occupants !== 1 ? "s" : ""}
                  </span>
                  <span className="inline-flex items-center gap-1 flex-1">
                    {item.color === "red" ? (
                      <Flame className="h-3.5 w-3.5 text-red-500 shrink-0" />
                    ) : (
                      <ShieldAlert className="h-3.5 w-3.5 text-slate-500 shrink-0" />
                    )}
                    <span className="truncate">{item.hazard}</span>
                  </span>
                </div>

                {/* urgency bar */}
                <div className="mt-3 h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.score}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className={`h-full ${s.bar}`}
                  />
                </div>

                {isDispatched ? (
                  <div className="w-full mt-3 flex items-center justify-center gap-2 px-3 py-2 rounded-md text-[10px] font-mono-x font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-300 border border-emerald-500/40">
                    <CheckCircle2 className="h-3.5 w-3.5" /> SAR Team Dispatched · ETA 2m
                  </div>
                ) : (
                  <ActionButton item={item} onDispatch={onDispatch} />
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
