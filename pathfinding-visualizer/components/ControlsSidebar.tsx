"use client";

import { Map, Play, Flag, Trash, Wand2, MousePointer2 } from "lucide-react";
import clsx from "clsx";

interface Props {
  algo: "dijkstra" | "astar";
  setAlgo: (_: any) => void;
  speed: number;
  setSpeed: (_: number) => void;
  mode: "wall" | "start" | "goal";
  setMode: (_: any) => void;
  onRandomMaze(): void;
  onClearPath(): void;
  onClearAll(): void;
  onStart(): void;
  running: boolean;
  disabled: boolean;
}

export default function ControlsSidebar(props: Props) {
  const ModeBtn = ({
    id,
    label,
    color,
  }: {
    id: Props["mode"];
    label: string;
    color: string;
  }) => (
    <button
      onClick={() => props.setMode(id)}
      className={clsx(
        "w-full text-left px-4 py-2 rounded-lg flex items-center gap-2",
        props.mode === id ? "bg-blue-600" : "hover:bg-slate-700"
      )}
    >
      <span
        className={clsx(
          "w-3 h-3 rounded-full",
          id === "wall" && "bg-slate-400",
          id === "start" && "bg-emerald-400",
          id === "goal" && "bg-red-400"
        )}
      />
      {label}
    </button>
  );

  return (
    <aside className="w-72 bg-slate-900/70 backdrop-blur-md p-5 rounded-2xl flex flex-col gap-5">
      {/* Algorithm */}
      <section>
        <h3 className="font-semibold mb-3 flex items-center gap-2">
          Algorithm <Map size={14} />
        </h3>
        <label className="flex items-center gap-2 mb-2">
          <input
            type="radio"
            name="algo"
            value="dijkstra"
            checked={props.algo === "dijkstra"}
            onChange={() => props.setAlgo("dijkstra")}
          />
          Dijkstra&#39;s Algorithm
        </label>
        <label className="flex items-center gap-2">
          <input
            type="radio"
            name="algo"
            value="astar"
            checked={props.algo === "astar"}
            onChange={() => props.setAlgo("astar")}
          />
          A* Algorithm
        </label>
      </section>

      {/* Speed */}
      <section>
        <h3 className="font-semibold mb-3">Speed</h3>
        <input
          type="range"
          min={5}
          max={100}
          step={5}
          value={props.speed}
          onChange={(e) => props.setSpeed(+e.target.value)}
          className="w-full accent-blue-600"
        />
      </section>

      {/* Draw mode */}
      <section>
        <h3 className="font-semibold mb-3">Draw Mode</h3>
        <ModeBtn id="wall" label="Draw Walls" color="" />
        <div className="h-2" />
        <ModeBtn id="start" label="Set Start Point" color="" />
        <ModeBtn id="goal" label="Set Goal Point" color="" />
      </section>

      {/* Utilities */}
      <section className="grid grid-cols-2 gap-3">
        <button
          onClick={props.onRandomMaze}
          className="bg-slate-800 hover:bg-slate-700 rounded-lg px-3 py-2 flex flex-col items-center text-xs"
        >
          <Wand2 size={16} />
          Random Maze
        </button>
        <button
          onClick={props.onClearPath}
          className="bg-slate-800 hover:bg-slate-700 rounded-lg px-3 py-2 flex flex-col items-center text-xs"
        >
          <MousePointer2 size={16} />
          Clear Path
        </button>
      </section>

      <div className="flex gap-3 mt-auto">
        <button
          onClick={props.onClearAll}
          className="flex-1 bg-slate-700 hover:bg-slate-600 rounded-lg px-4 py-2 flex items-center justify-center gap-2"
        >
          <Trash size={16} /> Clear All
        </button>
        <button
          onClick={props.onStart}
          disabled={props.running || props.disabled}
          className={clsx(
            "flex-1 rounded-lg px-4 py-2 flex items-center justify-center gap-2",
            props.running || props.disabled
              ? "bg-emerald-800/30 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-500"
          )}
        >
          <Play size={16} /> Start
        </button>
      </div>
    </aside>
  );
}
