import { test } from "node:test";
import assert from "node:assert/strict";
import { score } from "./bowling.ts";


test("gutter scores 20 times 0", () => {
  let rolls : number[] = Array(20).fill(0);
  assert.equal(score(rolls) , 0);
});

test("gutter scores 20 times 1", () => {
  let rolls : number[] = Array(20).fill(1);
  assert.equal(score(rolls) , 20);
});

test("gutter scores 5, 5, 3", () => {
  let rolls : number[] = [5, 5, 3];
  assert.equal(score(rolls) , 16);
});

test("gutter scores 10, 3, 4", () => {
  let rolls : number[] = [10, 3, 4];
  assert.equal(score(rolls) , 24);
});


test("gutter scores 12", () => {
  let rolls : number[] = Array(12).fill(10);
  assert.equal(score(rolls) , 300);
});