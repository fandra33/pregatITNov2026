// 02 - zoomies

export type Position = [number, number]; // [x, y]
export type Dir = "N" | "E" | "S" | "W";

export const ROOM = 10; // 10x10, coordinates 0..9

// TODO: type the parameters and the return values. tsc complains until you do.

export function move(pos, dir, steps = 1) {
  throw new Error("TODO move");
}

export function run(start, dirs) {
  throw new Error("TODO run");
}

export function distance(a, b) {
  throw new Error("TODO distance");
}

export function farthest(start, dirs) {
  throw new Error("TODO farthest");
}

export function where(pos, name) {
  throw new Error("TODO where");
}
