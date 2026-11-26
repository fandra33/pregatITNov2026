export type Mood = "sleepy" | "hungry" | "playful" | "grumpy";

export type CatEvent =
  | { kind: "fed"; grams: number }
  | { kind: "petted"; seconds: number }
  | { kind: "ignored" }
  | { kind: "vacuum" };

const MOODS: readonly Mood[] = ["sleepy", "hungry", "playful", "grumpy"];

export function sound(mood: Mood): string {
  switch (mood) {
    case "sleepy":
      return "purr";
    case "hungry":
      return "MEOW";
    case "playful":
      return "chirp";
    case "grumpy":
      return "hiss";
  }
}

export function next(mood: Mood, event: CatEvent): Mood {
  switch (event.kind) {
    case "fed":
      return event.grams >= 50 ? "sleepy" : "hungry";
    case "petted":
      if (mood === "grumpy") {
        return "grumpy";
      }
      return event.seconds <= 3 ? "playful" : "grumpy";
    case "ignored":
      return mood === "playful" ? "grumpy" : mood;
    case "vacuum":
      return "grumpy";
  }
}

export function day(start: Mood, events: CatEvent[]): Mood[] {
  const result: Mood[] = [];
  let current = start;
  for (const event of events) {
    current = next(current, event);
    result.push(current);
  }
  return result;
}

export function parseMood(input: unknown): Mood | null {
  if (typeof input !== "string") {
    return null;
  }
  const normalized = input.trim().toLowerCase();
  return MOODS.includes(normalized as Mood) ? (normalized as Mood) : null;
}