import { test } from "node:test";
import assert from "node:assert/strict";
import { BowlingGame, type Roll } from "./bowling.ts";

test("gutter game", () => {
  const game = new BowlingGame();
  game.rollMany(Array<Roll>(20).fill(0));
  assert.equal(game.score(), 0);
  assert.equal(game.isComplete(), true);
});

test("all ones", () => {
  const game = new BowlingGame();
  game.rollMany(Array<Roll>(20).fill(1));
  assert.equal(game.score(), 20);
  assert.equal(game.frames().length, 10);
});

test("spare", () => {
  const game = new BowlingGame();
  game.roll(5).roll(5).roll(3);
  game.rollMany(Array<Roll>(17).fill(0));

  assert.equal(game.score(), 16);
  assert.deepEqual(game.frames()[0], { kind: "spare", first: 5, second: 5 });
  assert.deepEqual(game.frames()[1], { kind: "open", first: 3, second: 0 });
});

test("strike", () => {
  const game = new BowlingGame();
  game.roll(10).roll(3).roll(4);
  game.rollMany(Array<Roll>(16).fill(0));

  assert.equal(game.score(), 24);
  assert.deepEqual(game.frames()[0], { kind: "strike" });
  assert.equal(game.frameScores()[0], 17);
});

test("perfect game", () => {
  const game = new BowlingGame();
  game.rollMany(Array<Roll>(12).fill(10));

  assert.equal(game.score(), 300);
  assert.equal(game.isComplete(), true);
  assert.deepEqual(game.frames()[9], { kind: "tenth", rolls: [10, 10, 10] });
});

test("all spares", () => {
  const game = new BowlingGame();
  game.rollMany(Array<Roll>(21).fill(5));

  assert.equal(game.score(), 150);
  assert.equal(game.isComplete(), true);
  assert.deepEqual(game.frames()[9], { kind: "tenth", rolls: [5, 5, 5] });
});

test("incomplete frames", () => {
  const game = new BowlingGame();
  game.roll(10).roll(4);

  assert.equal(game.score(), 0);
  assert.deepEqual(game.frameScores(), []);
  assert.equal(game.isComplete(), false);

  game.roll(2);
  assert.equal(game.score(), 22);
  assert.deepEqual(game.frameScores(), [16, 6]);
});

test("game already complete", () => {
  const finished = new BowlingGame();
  finished.rollMany(Array<Roll>(20).fill(0));
  assert.throws(() => finished.roll(0), /Game is already complete/);
});

function typeChecks() {
  const game = new BowlingGame();
  // @ts-expect-error
  game.roll(11);
  // @ts-expect-error
  game.roll(-1);
  // @ts-expect-error
  game.roll("X");
}
