"use client";

import { useMemo, useState } from "react";
import * as Comlink from "comlink";
import type { Grid as GridType, Coords } from "@/lib/types";
import Controls from "./Controls";
import Grid from "./Grid";
import ControlsSidebar from "./ControlsSidebar";
// Visualizer.tsx  (or wherever you spin up the worker)
// import PathWorker from "@/lib/workers/pathWorker?worker";

const SIZE = 25;
const newGrid = (): GridType =>
  Array.from({ length: SIZE }, () => Array(SIZE).fill(0));

export default function Visualizer() {
  const [grid, setGrid] = useState<GridType>(newGrid);
  const [algo, setAlgo] = useState<"dijkstra" | "astar">("dijkstra");
  const [mode, setMode] = useState<"wall" | "start" | "goal">("wall");
  const [start, setStart] = useState<Coords | null>(null);
  const [goal, setGoal] = useState<Coords | null>(null);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(20); // 5‑100 ms per frame

  /* ---------- worker proxy ---------- */
  const workerProxy = useMemo(() => {
    // ① create a real Worker bundle from the TS file
    const worker = new Worker(
      new URL("../lib/workers/pathWorker.ts", import.meta.url),
      { type: "module" }
    );

    // ② wrap with Comlink and return
    return Comlink.wrap<{
      run(args: {
        grid: GridType;
        start: Coords;
        goal: Coords;
        algo: "dijkstra" | "astar";
      }): Promise<{ visited: Coords[]; path: Coords[] }>;
    }>(worker);
  }, []);

  /* ---------- animation ---------- */
  function animate(visited: Coords[], path: Coords[]) {
    const SPEED = speed;

    // visited phase
    visited.forEach(([x, y], idx) => {
      setTimeout(() => {
        setGrid((prev) =>
          prev.map((row, i) =>
            row.map((cell, j) => (i === x && j === y ? 3 : cell))
          )
        );
        if (idx === visited.length - 1) drawPath();
      }, idx * SPEED);
    });

    // path phase
    const drawPath = () => {
      path.forEach(([x, y], idx) => {
        setTimeout(() => {
          setGrid((prev) =>
            prev.map((row, i) =>
              row.map((cell, j) => (i === x && j === y ? 4 : cell))
            )
          );
          if (idx === path.length - 1) setRunning(false);
        }, idx * SPEED);
      });
    };
  }

  /* ---------- run algorithm ---------- */
  async function run() {
    if (!start || !goal || running) return;
    setRunning(true);

    const { visited, path } = await workerProxy.run({
      grid,
      start,
      goal,
      algo,
    });
    animate(visited, path);
  }

  /* ---------- clear board ---------- */
  function clearBoard() {
    setGrid(newGrid());
    setStart(null);
    setGoal(null);
    setMode("wall");
  }

  return (
    <div className="flex gap-6">
      {/* grid board */}
      <div className="p-4 bg-slate-900/50 rounded-2xl">
        <Grid
          grid={grid}
          mode={mode}
          setGrid={setGrid}
          setStart={setStart}
          setGoal={setGoal}
        />
      </div>

      {/* sidebar */}
      <ControlsSidebar
        algo={algo}
        setAlgo={setAlgo}
        speed={speed}
        setSpeed={setSpeed}
        mode={mode}
        setMode={setMode}
        onRandomMaze={() => {
          /* todo */
        }}
        onClearPath={() => {
          /* todo */
        }}
        onClearAll={clearBoard}
        onStart={run}
        running={running}
        disabled={!start || !goal}
      />
    </div>
    // <>
    //   <h1 className="text-xl font-semibold mb-6 tracking-wide text-center">
    //     Path‑Finding Visualizer 2.0
    //   </h1>

    //   <Controls
    //     running={running}
    //     disabled={!start || !goal}
    //     mode={mode}
    //     setMode={setMode}
    //     onStart={run}
    //     onClear={clearBoard}
    //     algo={algo}
    //     setAlgo={setAlgo}
    //   />

    //   <Grid
    //     grid={grid}
    //     mode={mode}
    //     setGrid={setGrid}
    //     setStart={setStart}
    //     setGoal={setGoal}
    //   />
    // </>
  );
}
