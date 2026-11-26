export const DOM = [0, 47, 75, 159, 233, 298, 358, 417, 476, 537, 603, 674, 753, 843, 949, 1076, 1237, 1459, 1801, 2479, 594601];
export const REQUESTS = [0, 2, 15, 25, 34, 42, 49, 56, 63, 70, 78, 86, 95, 105, 117, 130, 147, 170, 205, 281, 3920];
export const SIZE_KB = [0, 1.37, 144.7, 319.53, 479.46, 631.97, 783.38, 937.91, 1098.62, 1265.47, 1448.32, 1648.27, 1876.08, 2142.06, 2465.37, 2866.31, 3401.59, 4155.73, 5400.08, 8037.54, 223212.26];

export type Page = {
  dom: number;
  requests: number;
  sizeKb: number;
};

export type Grade = "A" | "B" | "C" | "D" | "E" | "F" | "G";

export function quantile(table: number[], value: number): number {
  if (value <= (table[0] ?? 0)) return 0;

  for (let i = 1; i < table.length; i++) {
    const upper = table[i]!;
    if (upper > value) {
      const lower = table[i - 1]!;
      const bucket = i - 1;
      return bucket + (value - lower) / (upper - lower);
    }
  }

  return 20;
}

export function ecoIndex(page: Page): number {
  const qDom = quantile(DOM, page.dom);
  const qRequests = quantile(REQUESTS, page.requests);
  const qSize = quantile(SIZE_KB, page.sizeKb);

  return 100 - (5 * (3 * qDom + 2 * qRequests + qSize)) / 6;
}

export function grade(score: number): Grade {
  if (score > 80) return "A";
  if (score > 70) return "B";
  if (score > 55) return "C";
  if (score > 40) return "D";
  if (score > 25) return "E";
  if (score > 10) return "F";
  return "G";
}