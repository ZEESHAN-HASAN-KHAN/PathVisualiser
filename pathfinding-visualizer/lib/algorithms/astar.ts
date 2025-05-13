import type { Grid, Coords, RunResult } from '@/lib/types';
import { DIRS } from '@/lib/dirs';
import { MinPriorityQueue } from '@datastructures-js/priority-queue';

const h = ([x, y]: Coords, [gx, gy]: Coords) =>
  Math.abs(x - gx) + Math.abs(y - gy); // Manhattan

export default function astar(
  grid: Grid,
  start: Coords,
  goal: Coords,
): RunResult {
  const rows = grid.length,
    cols = grid[0].length;
  const gScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const fScore = Array.from({ length: rows }, () => Array(cols).fill(Infinity));
  const prev: (Coords | null)[][] = Array.from(
    { length: rows },
    () => Array(cols).fill(null),
  );

  const visited: Coords[] = [];
  const pq = new MinPriorityQueue<{ x: number; y: number; f: number }>({
    compare: (a, b) => a.f - b.f,
  });

  const inRange = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < rows && y < cols && grid[x][y][0] !== 1;
  const weight = (x: number, y: number) => (Number(grid[x][y]) === 2 ? 5 : 1);

  gScore[start[0]][start[1]] = 0;
  fScore[start[0]][start[1]] = h(start, goal);
  pq.enqueue({ x: start[0], y: start[1], f: fScore[start[0]][start[1]] });

  while (!pq.isEmpty()) {
    const dequeued = pq.dequeue();
    if (!dequeued) break;
    const { x, y } = dequeued;
    visited.push([x, y]);
    if (x === goal[0] && y === goal[1]) break;

    for (const [dx, dy] of DIRS) {
      const nx = x + dx,
        ny = y + dy;
      if (!inRange(nx, ny)) continue;

      const tentative = gScore[x][y] + weight(nx, ny);
      if (tentative < gScore[nx][ny]) {
        prev[nx][ny] = [x, y];
        gScore[nx][ny] = tentative;
        fScore[nx][ny] = tentative + h([nx, ny], goal);
        pq.enqueue({ x: nx, y: ny, f: fScore[nx][ny] });
      }
    }
  }

  const path: Coords[] = [];
  for (let cur: Coords | null = goal; cur; cur = prev[cur[0]][cur[1]])
    path.unshift(cur);
  return { visited, path };
}
