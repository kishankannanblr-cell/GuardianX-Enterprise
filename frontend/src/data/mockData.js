export const CAMERA_FEEDS = [
  {
    id: "cam-1402",
    name: "Cam 1402",
    zone: "Conference Room A",
    floor: "FL-14",
    image:
      "https://images.unsplash.com/photo-1761818645907-8bed418b415b?crop=entropy&cs=srgb&fm=jpg&w=900&q=70",
    hazards: [
      { type: "fire", label: "Fire Detected" },
      { type: "smoke", label: "Thermal Anomaly" },
    ],
    status: "critical",
  },
  {
    id: "cam-1405",
    name: "Cam 1405",
    zone: "Breakroom",
    floor: "FL-14",
    image:
      "https://images.unsplash.com/photo-1534542971271-b93789dc3b5e?crop=entropy&cs=srgb&fm=jpg&w=900&q=70",
    hazards: [
      { type: "smoke", label: "Dense Smoke" },
      { type: "human", label: "Occupant Trapped" },
    ],
    status: "critical",
  },
  {
    id: "cam-1410",
    name: "Cam 1410",
    zone: "Server Room",
    floor: "FL-14",
    image:
      "https://images.unsplash.com/photo-1680992046626-418f7e910589?crop=entropy&cs=srgb&fm=jpg&w=900&q=70",
    hazards: [{ type: "smoke", label: "Heat Spike 185°F" }],
    status: "warning",
  },
  {
    id: "cam-1412",
    name: "Cam 1412",
    zone: "North Corridor",
    floor: "FL-14",
    image:
      "https://images.unsplash.com/photo-1764539780901-0a13bf4f4182?crop=entropy&cs=srgb&fm=jpg&w=900&q=70",
    hazards: [{ type: "human", label: "Human Detected (1 Moving)" }],
    status: "clear",
  },
];

export const TRIAGE_QUEUE = [
  {
    id: "t1",
    tier: 1,
    tierLabel: "Tier 1 · Critical",
    room: "Room 1405",
    zone: "Breakroom",
    occupants: 2,
    hazard: "Active Flame & Heavy Smoke",
    score: 98,
    action: "sar",
    color: "red",
  },
  {
    id: "t2",
    tier: 2,
    tierLabel: "Tier 2 · High",
    room: "Room 1402",
    zone: "Conference Room A",
    occupants: 1,
    hazard: "Smoke Accumulation & Thermal Spike",
    score: 84,
    action: "sar",
    color: "amber",
  },
  {
    id: "t3",
    tier: 3,
    tierLabel: "Tier 3 · Moderate",
    room: "Room 1410",
    zone: "Server Room",
    occupants: 0,
    hazard: "Temperature Elevation (185°F)",
    score: 52,
    action: "monitor",
    color: "cyan",
  },
  {
    id: "t4",
    tier: 4,
    tierLabel: "Tier 4 · Clear",
    room: "Room 1412",
    zone: "North Corridor",
    occupants: 0,
    hazard: "Clear Path / Verified Safe",
    score: 5,
    action: "clear",
    color: "emerald",
  },
];

export const INITIAL_KPIS = {
  activeAlarms: 2,
  activeAlarmsLabel: "Critical",
  occupants: 3,
  occupantsLabel: "Trapped",
  latency: 0.38,
  savings: 160000,
};
