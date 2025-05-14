/* overwrite the Controls component completely */
"use client";

import clsx from "clsx";
import { Play, Eraser, Flag, MapPin, MousePointer2 } from "lucide-react";

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
  const ModeBtn = ({
    id,
    icon: Icon,
    tooltip,
  }: {
    id: "wall" | "start" | "goal";
    icon: any;
    tooltip: string;
  }) => (
    <button
      onClick={() => setMode(id)}
      title={tooltip}
      className={clsx(
        "p-2 rounded-lg hover:bg-slate-700",
        mode === id && "bg-slate-700"
      )}
    >
      <Icon size={18} />
    </button>
  );

  return (
    <div className="flex items-center justify-between mb-4">
      {/* left cluster */}
      <div className="flex items-center gap-2">
        <button
          onClick={onStart}
          disabled={running || disabled}
          className={clsx(
            "flex items-center gap-1 bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-lg text-sm",
            (running || disabled) && "opacity-40 cursor-not-allowed"
          )}
        >
          <Play size={16} /> {running ? "Running…" : "Visualise"}
        </button>

        <button
          onClick={onClear}
          title="Clear board"
          className="p-2 rounded-lg hover:bg-slate-700"
        >
          <Eraser size={18} />
        </button>
      </div>

      {/* centre cluster */}
      <div className="flex items-center gap-2">
        <ModeBtn id="wall" icon={MousePointer2} tooltip="Paint walls" />
        <ModeBtn id="start" icon={MapPin} tooltip="Set start" />
        <ModeBtn id="goal" icon={Flag} tooltip="Set goal" />
      </div>

      {/* right cluster */}
      <select
        value={algo}
        onChange={(e) => setAlgo(e.target.value as any)}
        className="bg-slate-800 px-3 py-2 rounded-lg text-sm"
      >
        <option value="dijkstra">Dijkstra</option>
        <option value="astar">A*</option>
      </select>
    </div>
  );
}
