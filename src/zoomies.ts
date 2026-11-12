// 02 - zoomies

export type Position = [number, number]; // [x, y]
export type Dir = "N" | "E" | "S" | "W";

export const ROOM = 10; // 10x10, coordinates 0..9

// TODO: type the parameters and the return values. tsc complains until you do.

export function move(pos: Position, dir: Dir, steps = 1): Position {
  if (dir === "N") {
    if (pos[1] + steps >= ROOM) {
      return [pos[0], ROOM - 1];
    }

    return [pos[0], pos[1] + steps];
  }
  if (dir === "E") {
    if (pos[0] + steps >= ROOM) {
      return [ROOM - 1, pos[1]];
    }
    return [pos[0] + steps, pos[1]];
  }
  if (dir === "S") {
    if (pos[1] - steps < 0) {
      return [pos[0], 0];
    }
    return [pos[0], pos[1] - steps];
  }
  if (dir === "W") {
    if (pos[0] - steps < 0) {
      return [0, pos[1]];
    }
    return [pos[0] - steps, pos[1]];
  }


  throw new Error("TODO move");
}

export function run(start: Position, dirs: Dir[]): Position[] {
  let positions: Position[] = [start];
  for (const dir of dirs) {
    start = move(start, dir);
    positions.push(start);
  }
  return positions;
}

export function distance(a: Position, b: Position): number {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
}

export function farthest(start: Position, dirs: Dir[]): Position {
  let furthestPos = start;
  let maxDistance = 0;
  let currentPos = start;

  for (const dir of dirs) {
    currentPos = move(currentPos, dir);
    const dist = distance(start, currentPos);
    if (dist > maxDistance) {
      maxDistance = dist;
      furthestPos = currentPos;
    }
  }

  return furthestPos;
}

export function where(pos: Position, name?: string) {
  if (name == undefined) {
    return `the cat is at (${pos[0]}, ${pos[1]})`;
  }
  return `${name} is at (${pos[0]}, ${pos[1]})`;
}
