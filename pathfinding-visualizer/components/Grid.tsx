"use client";

import { useState } from "react";
import Cell from "./Cell";
import type { Grid as GridType, Coords } from "@/lib/types";

interface Props {
  grid: GridType;
  mode: "wall" | "start" | "goal";
  setGrid: React.Dispatch<React.SetStateAction<GridType>>;
  setStart: (c: Coords) => void;
  setGoal: (c: Coords) => void;
}

export default function Grid({
  grid,
  mode,
  setGrid,
  setStart,
  setGoal,
}: Props) {
  const [drag, setDrag] = useState(false);

  const handleClick = (r: number, c: number) => {
    setGrid((prev) =>
      prev.map((row, i) =>
        row.map((cell, j) => {
          if (i !== r || j !== c) return cell;

          switch (mode) {
            case "start":
              setStart([r, c]);
              return 5; // start state
            case "goal":
              setGoal([r, c]);
              return 6; // goal state
            default: // wall toggle
              return cell === 1 ? 0 : 1;
          }
        })
      )
    );
  };

  return (
    <div
      className="select-none"
      onMouseLeave={() => setDrag(false)}
      onMouseUp={() => setDrag(false)}
      onTouchEnd={() => setDrag(false)}
    >
      {grid.map((row, r) => (
        <div key={r} className="flex">
          {row.map((_, c) => (
            <Cell
              key={c}
              state={grid[r][c]}
              onMouseDown={() => {
                setDrag(true);
                handleClick(r, c);
              }}
              onMouseEnter={() => drag && mode === "wall" && handleClick(r, c)}
              onTouchStart={() => handleClick(r, c)}
              data-row={r}
              data-col={c}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
