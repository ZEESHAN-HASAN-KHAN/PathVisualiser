 export type Grid = number[][];           // 0 empty ·1 wall ·2 weight
export type Coords = [number, number];       // row, col
export interface RunResult {
  visited: Coords[];
  path: Coords[];
}
