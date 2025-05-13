"use client";

import React from "react";
import clsx from "clsx";

export interface CellProps extends React.HTMLAttributes<HTMLDivElement> {
  state: number; // 0‑6
}

const Cell: React.FC<CellProps> = ({ state, className, ...rest }) => {
  const bg =
    state === 1
      ? "var(--cell-wall)"
      : state === 2
      ? "var(--cell-weight)"
      : state === 3
      ? "var(--cell-visited)"
      : state === 4
      ? "var(--cell-path)"
      : state === 5
      ? "var(--cell-start)"
      : state === 6
      ? "var(--cell-goal)"
      : "var(--cell-empty)";

  return (
    <div
      {...rest}
      className={clsx("w-5 h-5 cell transition-colors", className)}
      style={{ background: bg }}
    />
  );
};

export default React.memo(Cell);
