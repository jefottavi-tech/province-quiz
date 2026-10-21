// Sanity checks on the quiz weights: every province must be reachable,
// and no province may win too often with random answers.
// Usage: node tools/check_scoring.mjs
import { readFileSync } from "node:fs";
import vm from "node:vm";

const ctx = { window: {} };
vm.createContext(ctx);
for (const f of ["js/data.js", "js/score.js"]) vm.runInContext(readFileSync(new URL("../" + f, import.meta.url), "utf8"), ctx);
const { QUIZ_DATA: data, QUIZ_SCORE: score } = ctx.window;
const ids = Object.keys(data.provinces);
let ok = true;
const fail = (m) => { console.log("FAIL", m); ok = false; };

if (data.questions.length !== 20) fail(`expected 20 questions, got ${data.questions.length}`);
data.questions.forEach((q, i) => {
  if (q.a.length < 2 || q.a.length > 4) fail(`question ${i + 1} has ${q.a.length} answers`);
  for (const [, w] of q.a) for (const id of Object.keys(w)) if (!ids.includes(id)) fail(`question ${i + 1}: unknown id ${id}`);
});

// Random answers: win share per province.
const N = 200000, wins = Object.fromEntries(ids.map((id) => [id, 0]));
for (let n = 0; n < N; n++) wins[score(data.questions.map((q) => Math.floor(Math.random() * q.a.length)))[0].id]++;

// Reachability: greedy answer set that favours each province.
for (const id of ids) {
  const best = data.questions.map((q) => {
    let bi = 0;
    q.a.forEach((a, i) => { if ((a[1][id] || 0) > (q.a[bi][1][id] || 0)) bi = i; });
    return bi;
  });
  const top = score(best)[0];
  if (top.id !== id) fail(`${id} can't win with its best answers (got ${top.id})`);
}

for (const id of ids) {
  const share = wins[id] / N;
  console.log(id.padEnd(3), (share * 100).toFixed(1).padStart(5) + "%");
  if (share > 0.2) fail(`${id} wins ${(share * 100).toFixed(1)}% of random runs`);
  if (share < 0.01) fail(`${id} almost never wins with random answers`);
}
console.log(ok ? "OK" : "FAILED");
process.exit(ok ? 0 : 1);
