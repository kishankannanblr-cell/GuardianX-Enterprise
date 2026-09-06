import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { Siren, ShieldCheck } from "lucide-react";

import Header from "./Header";
import KpiBanner from "./KpiBanner";
import CameraMatrix from "./CameraMatrix";
import TriageQueue from "./TriageQueue";
import ExecutiveInsurTech from "./ExecutiveInsurTech";
import { CAMERA_FEEDS, TRIAGE_QUEUE, INITIAL_KPIS } from "../data/mockData";

const fmt = (n) => "$" + n.toLocaleString("en-US");

export default function GuardianX() {
  const [view, setView] = useState("tactical");
  const [kpis, setKpis] = useState(INITIAL_KPIS);
  const [feeds] = useState(CAMERA_FEEDS);
  const [queue] = useState(TRIAGE_QUEUE);
  const [incidentActive, setIncidentActive] = useState(false);
  const [dispatched, setDispatched] = useState([]);

  const handleSimulate = useCallback(() => {
    setView("tactical");
    setIncidentActive(true);
    // Animate KPI escalation
    setKpis({
      activeAlarms: 4,
      activeAlarmsLabel: "Critical",
      occupants: 5,
      occupantsLabel: "Trapped",
      latency: 0.29,
      savings: 160000,
    });
    toast.error("🚨 INCIDENT ESCALATED · FLOOR 14", {
      description: "Autonomous triage engaged. 4 alarms active, 5 occupants located.",
      duration: 5000,
    });
  }, []);

  const handleDispatch = useCallback((item) => {
    setDispatched((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]));
    toast.success(`SAR Dispatch Authorized · ${item.room}`, {
      description: `Search & Rescue routed to ${item.zone}. ${item.occupants} occupant(s) prioritized. ETA 2 min.`,
      duration: 4500,
    });
  }, []);

  const handleExport = useCallback(({ premium, discount, netProfit }) => {
    toast.success("Underwriting Risk Packet Generated", {
      description: `Premium ${fmt(premium)} · 20% credit ${fmt(discount)} · Net ${fmt(netProfit)}/yr. Packet ready for carrier submission.`,
      duration: 5500,
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0f19] grid-overlay text-slate-100 flex flex-col p-4 md:p-6 gap-6">
      <Header
        view={view}
        setView={setView}
        onSimulate={handleSimulate}
        incidentActive={incidentActive}
      />

      <AnimatePresence>
        {incidentActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600/15 border border-red-500/50 pulse-red"
          >
            <Siren className="h-5 w-5 text-red-400 shrink-0" />
            <p className="font-mono-x text-[12px] font-bold tracking-wider text-red-300 uppercase">
              Live Incident · Floor 14 — Autonomous SAR triage active. Command authorization required for dispatch.
            </p>
            <button
              onClick={() => {
                setIncidentActive(false);
                setKpis(INITIAL_KPIS);
                setDispatched([]);
              }}
              data-testid="clear-incident-button"
              className="ml-auto shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-900/70 hover:bg-slate-800 border border-slate-700 text-[10px] font-mono-x font-bold uppercase tracking-wider text-slate-300 transition-colors"
            >
              <ShieldCheck className="h-3.5 w-3.5" /> Stand Down
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <KpiBanner kpis={kpis} />

      <AnimatePresence mode="wait">
        {view === "tactical" ? (
          <motion.div
            key="tactical"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            <CameraMatrix feeds={feeds} incidentActive={incidentActive} />
            <TriageQueue queue={queue} onDispatch={handleDispatch} dispatched={dispatched} />
          </motion.div>
        ) : (
          <motion.div
            key="executive"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
          >
            <ExecutiveInsurTech onExport={handleExport} />
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-auto pt-2 flex items-center justify-between text-[10px] font-mono-x tracking-widest uppercase text-slate-600">
        <span>GuardianX Enterprise · SOC v4.2</span>
        <span>© 2026 · Autonomous Life Safety Grid</span>
      </footer>
    </div>
  );
}
