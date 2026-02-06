import { useEffect, useState } from "react";
import { API_BASE } from "../config";

export default function Dashboard({ onNewNote }) {
  const [encounters, setEncounters] = useState([
    { name: "John Smith", note: "Annual Wellness Visit" },
    { name: "Maria Lopez", note: "Follow-up: Hypertension" },
    { name: "Robert King", note: "Post-Op Checkup", muted: true },
  ]);

  // 🔄 Fetch dashboard data (safe, optional)
  useEffect(() => {
    async function loadDashboard() {
      try {
        const res = await fetch(`${API_BASE}/dashboard`);
        if (!res.ok) return;

        const data = await res.json();

        if (data?.recentEncounters) {
          setEncounters(data.recentEncounters);
        }
      } catch (err) {
        // Silent fail → keep UI intact
        console.warn("Dashboard API not available");
      }
    }

    loadDashboard();
  }, []);

  return (
    <div className="bg-background-dark text-slate-100 min-h-screen font-sans antialiased selection:bg-indigo-500/30">
      <div className="relative flex min-h-screen w-full flex-col max-w-[430px] mx-auto overflow-x-hidden border-x border-white/5 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-indigo-950/40 via-background-dark to-background-dark">

        {/* HEADER */}
        <header className="flex items-center p-6 pb-4 justify-between sticky top-0 z-50 backdrop-blur-lg bg-background-dark/80">
          <div className="flex items-center gap-3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
              <div
                className="relative bg-center bg-no-repeat aspect-square bg-cover rounded-full size-12 border border-white/20"
                style={{
                  backgroundImage:
                    'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBLatyraiZ9YkIhpCWD5iiTgeihlQstVdjEcROeGM4DIeuiPQ80CrcalKEh9Y43w_bYmvzYKGk5KD9woc_qPxf5ZPPpZoBE9CLx_96IBb8pNEJ_PRggYJm3RIMkxnpc5S2rle-0ASMHxZg8JawPzGP_KMEV8VnUqZN5OddXgoz-vRcalHrWbss_HvhCyWMsuETiENthv_ZrpBbHl0o4NwtLxknxNqwb8jV8Sgfbbzp569mO8949zlkxb40gpa2kMzLVl_NqkeEbGA")',
                }}
              />
            </div>

            <div>
              <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-[0.15em] mb-0.5">
                Clinical Suite
              </p>
              <h2 className="text-white text-xl font-extrabold tracking-tight">
                Dr. Aris Thorne
              </h2>
            </div>
          </div>

          <button className="flex items-center justify-center rounded-2xl size-11 glass hover:bg-white/10 transition-all text-white">
            <span className="material-symbols-outlined text-2xl">
              notifications_active
            </span>
          </button>
        </header>

        {/* DAILY GOAL */}
        <div className="px-6 py-4">
          <div className="glass-indigo rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute -right-10 -top-10 size-40 bg-indigo-500/10 rounded-full blur-3xl"></div>

            <div className="flex items-center justify-between relative z-10">
              <div className="space-y-1">
                <p className="text-indigo-200/70 text-sm font-medium">
                  Daily Goal Progress
                </p>
                <h3 className="text-3xl font-bold text-white leading-none">
                  84<span className="text-indigo-400">%</span>
                </h3>
                <p className="text-xs text-indigo-300/60 font-medium">
                  12 of 14 notes completed
                </p>
              </div>

              <div className="relative flex items-center justify-center">
                <svg className="size-24">
                  <circle
                    className="text-white/5"
                    cx="48"
                    cy="48"
                    r="40"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="8"
                  />
                  <circle
                    className="text-indigo-500 progress-ring-circle"
                    cx="48"
                    cy="48"
                    r="40"
                    fill="transparent"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray="251.2"
                    strokeDashoffset="40"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute material-symbols-outlined text-indigo-400 text-2xl">
                  verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 gap-4 px-6 pb-6">
          <div className="glass rounded-2xl p-4">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
              Avg. Time Saved
            </p>
            <p className="text-white text-2xl font-bold font-mono">
              3.5<span className="text-sm text-slate-500 ml-1">h</span>
            </p>
          </div>

          <div className="glass rounded-2xl p-4">
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
              Efficiency
            </p>
            <p className="text-white text-2xl font-bold font-mono">
              92<span className="text-sm text-slate-500 ml-1">%</span>
            </p>
          </div>
        </div>

        {/* RECENT ENCOUNTERS */}
        <div className="px-6 pt-4 pb-32">
          <h3 className="text-white text-lg font-extrabold mb-4">
            Recent Encounters
          </h3>

          <div className="space-y-3">
            {encounters.map((e, i) => (
              <div
                key={i}
                className={`glass rounded-3xl p-5 ${
                  e.muted ? "opacity-80" : ""
                }`}
              >
                <h4 className="text-white font-bold">{e.name}</h4>
                <p className="text-slate-400 text-sm">{e.note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FLOATING ACTION */}
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-full max-w-[380px] px-6 z-40">
          <button
            onClick={onNewNote}
            className="w-full bg-indigo-500 hover:bg-indigo-400 text-white flex items-center justify-center gap-3 py-4 rounded-2xl shadow-[0_10px_40px_-10px_rgba(99,102,241,0.5)] transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-2xl">mic</span>
            <span className="text-base font-extrabold">
              New Clinical Note
            </span>
          </button>
        </div>

        {/* BOTTOM NAV */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] h-[88px] bg-background-dark/80 backdrop-blur-2xl border-t border-white/10 flex items-center justify-around px-8 pb-4 z-50">
          {["dashboard", "group", "leaderboard", "account_circle"].map(
            (icon, i) => (
              <div
                key={icon}
                className={`flex flex-col items-center gap-1.5 ${
                  i === 0 ? "text-indigo-500" : "text-slate-500"
                }`}
              >
                <span className="material-symbols-outlined text-[28px]">
                  {icon}
                </span>
                <span className="text-[9px] font-extrabold uppercase tracking-widest">
                  {i === 0
                    ? "Dash"
                    : i === 1
                    ? "Patients"
                    : i === 2
                    ? "Stats"
                    : "Profile"}
                </span>
              </div>
            )
          )}
        </nav>

      </div>
    </div>
  );
}
