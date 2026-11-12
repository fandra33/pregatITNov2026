// If I fits, I sits
// Tests: node --test        Types: npx tsc --noEmit

/** Dimensions in cm. `label?` means the field may be absent entirely. */
export type Box = {
  readonly width: number;
  readonly depth: number;
  readonly label?: string;
};

export type Cat = {
  readonly name: string;
  /** nose to tail base, cm */
  readonly length: number;
  readonly width: number;
};

/** The result of seating one cat. `box: null` means the cat found nothing. */
export type Seating = {
  readonly cat: Cat;
  readonly box: Box | null;
};

/**
- Cats are liquid: the box area must be at least 70% of the cat's area,
- and the box's shorter side at least half the cat's width.
 */
export function fits(cat: Cat, box: Box): boolean {
  const catArea = cat.length * cat.width;
  const boxArea = box.width * box.depth;
  
  if (boxArea < catArea * 0.7) {
    return false;
  }

  const shorterBoxSide = Math.min(box.width, box.depth);
  if (shorterBoxSide < cat.width / 2) {
    return false;
  }

  return true;
}

/** The smallest box (by area) the cat fits in; the first one on a tie; null if none. */
export function bestBox(cat: Cat, boxes: readonly Box[]): Box | null {
  let best: Box | null = null;
  let minArea = Infinity;

  for (const box of boxes) {
    if (fits(cat, box)) {
      const area = box.width * box.depth;
      if (area < minArea) {
        minArea = area;
        best = box;
      }
    }
  }

  return best;
}

/**
- Each cat, in order, takes its best box among those still free.
- `boxes` must come out exactly as it went in.
 */
export function seat(cats: readonly Cat[], boxes: readonly Box[]): Seating[] {
  const availableBoxes = [...boxes];
  const seatings: Seating[] = [];

  for (const cat of cats) {
    const box = bestBox(cat, availableBoxes);
    seatings.push({ cat, box });
    if (box !== null) {
      const index = availableBoxes.indexOf(box);
      if (index !== -1) {
        availableBoxes.splice(index, 1);
      }
    }
  }

  return seatings;
}

/** "shoebox (30×20)" or "unlabelled box (30×20)". The × is U+00D7. */
export function describe(box: Box): string {
  const name = box.label ?? "unlabelled box";
  return `${name} (${box.width}\u00D7${box.depth})`;
}