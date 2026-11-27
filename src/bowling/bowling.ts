export type Roll = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export type Frame =
  | { kind: "open"; first: Roll; second: Roll }
  | { kind: "spare"; first: Roll; second: Roll }
  | { kind: "strike" }
  | { kind: "tenth"; rolls: Roll[] };

export class BowlingGame {
  private rolls: Roll[] = [];

  roll(pins: Roll): this {
    if (this.isComplete()) {
      throw new Error("Game is already complete");
    }

    this.checkValidRoll(pins);
    this.rolls.push(pins);
    return this;
  }

  rollMany(pinsList: Roll[]): this {
    for (const pins of pinsList) {
      this.roll(pins);
    }
    return this;
  }

  frames(): Frame[] {
    const list: Frame[] = [];
    let i = 0;

    while (i < this.rolls.length && list.length < 9) {
      const first = this.rolls[i];
      if (first === undefined) {
        break;
      }

      if (first === 10) {
        list.push({ kind: "strike" });
        i = i + 1;
      } else {
        const second = this.rolls[i + 1];
        if (second === undefined) {
          break;
        }
        if (first + second === 10) {
          list.push({ kind: "spare", first, second });
        } else {
          list.push({ kind: "open", first, second });
        }
        i = i + 2;
      }
    }

    if (list.length === 9 && i < this.rolls.length) {
      list.push({
        kind: "tenth",
        rolls: this.rolls.slice(i),
      });
    }

    return list;
  }

  isComplete(): boolean {
    const allFrames = this.frames();
    const tenth = allFrames[9];

    if (!tenth || tenth.kind !== "tenth") {
      return false;
    }

    const r0 = tenth.rolls[0];
    const r1 = tenth.rolls[1];

    if (r0 === undefined || r1 === undefined) {
      return false;
    }

    if (r0 === 10 || r0 + r1 === 10) {
      return tenth.rolls.length === 3;
    }

    return tenth.rolls.length === 2;
  }

  frameScores(): number[] {
    const scores: number[] = [];
    let i = 0;

    for (let frame = 0; frame < 10; frame++) {
      const first = this.rolls[i];
      if (first === undefined) {
        break;
      }

      if (frame === 9) {
        if (!this.isComplete()) {
          break;
        }
        let sum = 0;
        for (let j = i; j < this.rolls.length; j++) {
          const val = this.rolls[j];
          if (val !== undefined) {
            sum = sum + val;
          }
        }
        scores.push(sum);
        break;
      }

      if (first === 10) {
        const next1 = this.rolls[i + 1];
        const next2 = this.rolls[i + 2];
        if (next1 === undefined || next2 === undefined) {
          break;
        }
        scores.push(10 + next1 + next2);
        i = i + 1;
      } else {
        const second = this.rolls[i + 1];
        if (second === undefined) {
          break;
        }
        if (first + second === 10) {
          const next = this.rolls[i + 2];
          if (next === undefined) {
            break;
          }
          scores.push(10 + next);
        } else {
          scores.push(first + second);
        }
        i = i + 2;
      }
    }

    return scores;
  }

  score(): number {
    const scores = this.frameScores();
    let total = 0;
    for (const s of scores) {
      total = total + s;
    }
    return total;
  }

  private checkValidRoll(pins: Roll): void {
    const list = this.frames();

    if (list.length < 9) {
      let used = 0;
      for (const f of list) {
        used = used + (f.kind === "strike" ? 1 : 2);
      }

      const first = this.rolls[used];
      if (first !== undefined && first + pins > 10) {
        throw new Error("Invalid frame total");
      }
      return;
    }

    const tenth = list[9];
    if (!tenth || tenth.kind !== "tenth") {
      return;
    }

    const r0 = tenth.rolls[0];
    const r1 = tenth.rolls[1];

    if (tenth.rolls.length === 1 && r0 !== undefined) {
      if (r0 < 10 && r0 + pins > 10) {
        throw new Error("Invalid 10th frame total");
      }
    }

    if (tenth.rolls.length === 2 && r0 === 10 && r1 !== undefined) {
      if (r1 < 10 && r1 + pins > 10) {
        throw new Error("Invalid 10th frame bonus");
      }
    }
  }
}