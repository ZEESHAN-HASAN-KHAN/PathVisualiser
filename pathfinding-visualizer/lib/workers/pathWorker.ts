/* eslint-disable no-restricted-globals */
import * as Comlink from 'comlink';
import dijkstra from '../algorithms/dijkstra';
import astar from '../algorithms/astar';
import type { Grid, Coords, RunResult } from '@/lib/types';

interface Req {
  grid: Grid;
  start: Coords;
  goal: Coords;
  algo: 'dijkstra' | 'astar';
}

const api = {
  run({ grid, start, goal, algo }: Req): RunResult {
    return algo === 'dijkstra'
      ? dijkstra(grid, start, goal)
      : astar(grid, start, goal);
  },
};

Comlink.expose(api);
