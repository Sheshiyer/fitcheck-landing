import { useRef, useState, useEffect, type ReactNode } from "react";
import {
  PanelLeft,
  ChevronLeft,
  ChevronRight,
  Monitor,
  RotateCw,
  Share,
  Plus,
  Copy,
  Grid,
  Compass,
  Layers,
  ListTodo,
  Sparkles,
} from "lucide-react";
import Logo from "./Logo";

/* ---- ScaledDashboard: renders at fixed width then scales to fit ---- */
function ScaledDashboard({ children, designWidth = 896 }: { children: ReactNode; designWidth?: number }) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    const ro = new ResizeObserver(() => {
      const s = outer.offsetWidth / designWidth;
      setScale(s);
      setHeight(inner.offsetHeight * s);
    });
    ro.observe(outer);
    return () => ro.disconnect();
  }, [designWidth]);

  return (
    <div ref={outerRef} className="w-full overflow-hidden" style={{ height }}>
      <div
        ref={innerRef}
        style={{
          width: designWidth,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/* ---- Sidebar nav items ---- */
const sidebarNav = [
  { icon: Compass, label: "Uncover" },
  { icon: Layers, label: "Products" },
  { icon: ListTodo, label: "Inbox" },
];

const recentArticles = [
  "Summer Dress Fit Guide",
  "Denim Jacket Styling",
  "Athleisure Collection",
  "Wedding Guest Looks",
];

/* ---- Stats ---- */
const stats = [
  { label: "LIVE SKUS", value: "62", sub: "Products enabled" },
  { label: "TRY-ONS", value: "3,412", sub: "This month" },
  { label: "CONVERSION", value: "+18%", sub: "Add-to-cart lift" },
  { label: "RETURNS", value: "-22%", sub: "Fit-driven reduction" },
];

/* ---- Subject cards ---- */
const subjects = ["Dresses", "Outerwear", "Activewear"];

/* ---- Drafting rows ---- */
const draftRows = [
  { q: "How does the midi dress fit on curvy bodies?", vol: "2,400", diff: "Low", status: "Live" },
  { q: "Will this jacket fit over a hoodie?", vol: "1,800", diff: "Med", status: "Rendering" },
  { q: "Does the sports bra work for D cups?", vol: "3,100", diff: "Low", status: "Live" },
  { q: "How loose is the oversized tee actually?", vol: "890", diff: "Med", status: "Rendering" },
  { q: "Can I see this in plus size?", vol: "4,200", diff: "Low", status: "Live" },
];

export default function DashboardMockup() {
  return (
    <ScaledDashboard>
      <div className="rounded-t-2xl overflow-hidden bg-[#1a1a1c] shadow-[0_-20px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10 text-left">
        {/* Title bar */}
        <div className="bg-[#242427] border-b border-white/5 px-4 py-2.5">
          <div className="flex items-center gap-3">
            {/* Traffic lights */}
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            {/* Nav icons */}
            <div className="flex items-center gap-2 ml-2">
              <PanelLeft className="w-3.5 h-3.5 text-white/40" />
              <ChevronLeft className="w-3.5 h-3.5 text-white/40" />
              <ChevronRight className="w-3.5 h-3.5 text-white/25" />
            </div>
            {/* URL bar */}
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-2 bg-[#1a1a1c] rounded-md px-6 py-1">
                <Monitor className="w-3 h-3 text-white/40" />
                <span className="text-[10px] text-white/60">fitcheck.style</span>
              </div>
            </div>
            {/* Right icons */}
            <div className="flex items-center gap-2">
              <RotateCw className="w-3.5 h-3.5 text-white/40" />
              <Share className="w-3.5 h-3.5 text-white/40" />
              <Plus className="w-3.5 h-3.5 text-white/40" />
              <Copy className="w-3.5 h-3.5 text-white/40" />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex">
          {/* Sidebar */}
          <div className="w-[22%] border-r border-white/5 bg-[#1e1e21] px-3 py-3.5">
            <div className="flex items-center justify-between mb-4">
              <Logo className="w-4 h-4 text-white/70" />
              <Grid className="w-3.5 h-3.5 text-white/30" />
            </div>
            {/* Workspace */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 rounded bg-[#FF6B35] flex items-center justify-center text-[8px] font-bold text-white">
                F
              </div>
              <span className="text-[10px] text-white/80">Fitcheck Demo</span>
            </div>
            {/* Nav */}
            <div className="space-y-1 mb-4">
              {sidebarNav.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 px-2 py-1.5 rounded text-[10px] text-white/60 hover:bg-white/5">
                  <Icon className="w-3 h-3" />
                  {label}
                </div>
              ))}
            </div>
            {/* Recent */}
            <div className="mt-4">
              <p className="text-[8px] text-white/30 uppercase tracking-wider mb-2">Recent</p>
              {recentArticles.map((a) => (
                <div key={a} className="flex items-center gap-2 py-1.5 text-[9px] text-white/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#28c840]/70" />
                  {a}
                </div>
              ))}
            </div>
          </div>

          {/* Main */}
          <div className="flex-1 p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#FF6B35] flex items-center justify-center text-white text-sm font-bold">
                  F
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Fitcheck Demo Store</p>
                  <p className="text-[10px] text-white/45">Virtual try-on analytics</p>
                </div>
              </div>
              <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FF6B35] text-white text-[10px] font-medium">
                <Sparkles className="w-3 h-3" />
                Generate
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 divide-x divide-white/5 rounded-xl bg-white/[0.03] ring-1 ring-white/5 mb-4">
              {stats.map((s) => (
                <div key={s.label} className="px-4 py-3 text-center">
                  <p className="text-[8px] tracking-wider text-white/35 uppercase mb-1">{s.label}</p>
                  <p className="text-xl font-medium text-white tabular-nums">{s.value}</p>
                  <p className="text-[8px] text-white/35 mt-0.5">{s.sub}</p>
                </div>
              ))}
            </div>

            {/* Subject cards */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {subjects.map((s) => (
                <div key={s} className="rounded-lg bg-white/[0.03] ring-1 ring-white/5 p-3">
                  <p className="text-[10px] font-medium text-white/80">{s}</p>
                  <p className="text-[8px] text-white/35 mt-1">12 SKUs enabled</p>
                </div>
              ))}
            </div>

            {/* Table */}
            <div className="rounded-lg bg-white/[0.03] ring-1 ring-white/5 overflow-hidden">
              <div className="grid grid-cols-[1fr_80px_60px_80px] gap-2 px-3 py-2 border-b border-white/5 text-[8px] text-white/30 uppercase tracking-wider">
                <span>Question</span>
                <span>Volume</span>
                <span>Difficulty</span>
                <span>Status</span>
              </div>
              {draftRows.map((r) => (
                <div key={r.q} className="grid grid-cols-[1fr_80px_60px_80px] gap-2 px-3 py-2 border-b border-white/5 last:border-b-0 text-[9px]">
                  <span className="text-white/70 truncate">{r.q}</span>
                  <span className="text-white/50 tabular-nums">{r.vol}</span>
                  <span className="text-white/50">{r.diff}</span>
                  <span className={r.status === "Rendering" ? "text-[#febc2e]/80" : "text-[#28c840]/80"}>
                    {r.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ScaledDashboard>
  );
}
