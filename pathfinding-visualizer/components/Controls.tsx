"use client";

import clsx from "clsx";

interface Props {
  running: boolean;
  disabled: boolean;
  mode: "wall" | "start" | "goal";
  setMode: (m: "wall" | "start" | "goal") => void;
  onStart(): void;
  onClear(): void;
  algo: "dijkstra" | "astar";
  setAlgo(a: "dijkstra" | "astar"): void;
}

export default function Controls({
  running,
  disabled,
  mode,
  setMode,
  onStart,
  onClear,
  algo,
  setAlgo,
}: Props) {
  const btn = "px-3 py-1 rounded text-white text-sm";
  const modeBtn = (m: typeof mode, label: string, color: string) => (
    <button
      onClick={() => setMode(m)}
      className={clsx(
        "border px-2 py-1 rounded text-xs",
        mode === m ? color : "bg-slate-600"
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="flex items-center gap-2 mb-4">
      <select
        className="border px-2 py-1 rounded text-sm"
        value={algo}
        onChange={(e) => setAlgo(e.target.value as any)}
      >
        <option value="dijkstra">Dijkstra</option>
        <option value="astar">A*</option>
      </select>

      <button
        onClick={onStart}
        disabled={running || disabled}
        className={clsx(
          btn,
          running || disabled ? "bg-blue-300" : "bg-blue-600"
        )}
      >
        {running ? "Running…" : "Visualise"}
      </button>

      <button onClick={onClear} className={clsx(btn, "bg-slate-500")}>
        Clear
      </button>

      {modeBtn("wall", "Walls", "bg-slate-700")}
      {modeBtn("start", "Set Start", "bg-emerald-600")}
      {modeBtn("goal", "Set Goal", "bg-red-600")}
    </div>
  );
}
