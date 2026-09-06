import { motion } from "framer-motion";
import { Flame, Cloud, User, Radio, Maximize2 } from "lucide-react";

const HAZARD_STYLE = {
  fire: { icon: Flame, cls: "bg-red-600/90 text-white border-red-400" },
  smoke: { icon: Cloud, cls: "bg-amber-500/90 text-slate-900 border-amber-300" },
  human: { icon: User, cls: "bg-cyan-500/90 text-slate-900 border-cyan-300" },
};

const STATUS_RING = {
  critical: "border-red-500/60 shadow-[0_0_18px_rgba(239,68,68,0.3)]",
  warning: "border-amber-500/50 shadow-[0_0_16px_rgba(245,158,11,0.2)]",
  clear: "border-emerald-500/40",
};

function CameraFeed({ cam, index, incidentActive }) {
  const critical = cam.status === "critical";
  return (
    <motion.div
      data-testid={`cctv-feed-${cam.id}`}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className={`relative aspect-video rounded-lg overflow-hidden bg-slate-950 border cctv-scanlines group cursor-pointer transition-all ${
        STATUS_RING[cam.status]
      } ${critical && incidentActive ? "pulse-red" : ""}`}
    >
      <img
        src={cam.image}
        alt={cam.zone}
        loading="lazy"
        className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
          critical ? "saturate-[1.15] contrast-110" : "opacity-90"
        }`}
      />
      {/* red tint for critical feeds */}
      {critical && <div className="absolute inset-0 bg-red-900/25 mix-blend-multiply z-[2]" />}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50 z-[3]" />

      {/* Top bar: cam id + REC */}
      <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
        <span className="font-mono-x text-[10px] font-bold tracking-wider text-white/90 bg-black/50 px-2 py-0.5 rounded">
          {cam.name} · {cam.floor}
        </span>
        <span className="flex items-center gap-1 font-mono-x text-[9px] font-bold text-red-400 bg-black/50 px-1.5 py-0.5 rounded">
          <span className="rec-blink h-1.5 w-1.5 rounded-full bg-red-500" /> REC
        </span>
      </div>

      {/* Hazard badges */}
      <div className="absolute bottom-8 left-2 flex flex-col items-start gap-1.5 z-10">
        {cam.hazards.map((h) => {
          const H = HAZARD_STYLE[h.type];
          const Icon = H.icon;
          return (
            <motion.span
              key={h.label}
              animate={h.type === "fire" ? { opacity: [1, 0.55, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[9px] font-mono-x font-bold uppercase tracking-wide backdrop-blur-sm ${H.cls}`}
            >
              <Icon className="h-3 w-3" /> {h.label}
            </motion.span>
          );
        })}
      </div>

      {/* Bottom bar: zone */}
      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between z-10">
        <span className="font-mono-x text-[10px] text-slate-300">{cam.zone}</span>
        <Maximize2 className="h-3.5 w-3.5 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
}

export default function CameraMatrix({ feeds, incidentActive }) {
  return (
    <div className="lg:col-span-7 flex flex-col gap-4 p-5 rounded-xl bg-slate-900/60 backdrop-blur-xl border border-slate-800">
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-bold tracking-wide uppercase flex items-center gap-2">
          <Radio className="h-4 w-4 text-cyan-400" /> Multi-Camera Matrix
        </h2>
        <span className="font-mono-x text-[10px] tracking-widest uppercase text-slate-500">
          4 Feeds · Floor 14
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {feeds.map((cam, i) => (
          <CameraFeed key={cam.id} cam={cam} index={i} incidentActive={incidentActive} />
        ))}
      </div>
    </div>
  );
}
