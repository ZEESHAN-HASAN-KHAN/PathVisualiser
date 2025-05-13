import type { Grid, Coords, RunResult } from '@/lib/types';
import { DIRS } from '@/lib/dirs';
import { MinPriorityQueue } from '@datastructures-js/priority-queue';

export default function dijkstra(
  grid: Grid,
  start: Coords,
  goal: Coords,
): RunResult {
  const rows = grid.length,
    cols = grid[0].length;
  const dist = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const prev: (Coords | null)[][] = Array.from(
    { length: rows },
    () => Array(cols).fill(null),
  );
  const visited: Coords[] = [];

  const pq = new MinPriorityQueue<{
    x: number;
    y: number;
    d: number;
  }>({
    compare: (a, b) => a.d - b.d, // Compare based on the distance 'd'
  });

  const inRange = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < rows && y < cols && Number(grid[x][y]) !== 1;

  const weight = (x: number, y: number) => (Number(grid[x][y]) === 2 ? 5 : 1);

  dist[start[0]][start[1]] = 0;
  pq.enqueue({ x: start[0], y: start[1], d: 0 });

  while (!pq.isEmpty()) {
    const dequeued = pq.dequeue();
    if (!dequeued) continue;
    const { x, y, d } = dequeued;
    if (d !== dist[x][y]) continue;
    visited.push([x, y]);
    if (x === goal[0] && y === goal[1]) break;

    for (const [dx, dy] of DIRS) {
      const nx = x + dx,
        ny = y + dy;
      if (!inRange(nx, ny)) continue;
      const alt = d + weight(nx, ny);
      if (alt < dist[nx][ny]) {
        dist[nx][ny] = alt;
        prev[nx][ny] = [x, y];
        pq.enqueue({ x: nx, y: ny, d: alt });
      }
    }
  }

  // reconstruct
  const path: Coords[] = [];
  for (let cur: Coords | null = goal; cur; cur = prev[cur[0]][cur[1]])
    path.unshift(cur);
  return { visited, path };
}
