// Scoring, shared by the pages and tools/check_scoring.mjs.
// Each province's points are divided by the most it could have earned,
// so provinces that appear in fewer answers aren't disadvantaged.
window.QUIZ_SCORE = function (answers) {
  var data = window.QUIZ_DATA, ids = Object.keys(data.provinces);
  var got = {}, max = {};
  ids.forEach(function (id) { got[id] = 0; max[id] = 0; });
  data.questions.forEach(function (q, i) {
    ids.forEach(function (id) {
      max[id] += Math.max.apply(null, q.a.map(function (a) { return a[1][id] || 0; }));
    });
    var pick = q.a[answers[i]];
    if (pick) for (var id in pick[1]) got[id] += pick[1][id];
  });
  return ids
    .map(function (id) {
      var ratio = max[id] ? got[id] / max[id] : 0;
      // Match % shown to the visitor: square root softens the low end.
      return { id: id, ratio: ratio, pct: Math.round(100 * Math.sqrt(ratio)) };
    })
    .sort(function (x, y) { return y.ratio - x.ratio; });
};

// The result to show: the winner after QUIZ_DATA.resultMap is applied, and
// the next 3 provinces that can be shown as a result.
window.QUIZ_RESULT = function (answers) {
  var ranks = window.QUIZ_SCORE(answers), map = window.QUIZ_DATA.resultMap || {};
  var id = map[ranks[0].id] || ranks[0].id;
  return {
    id: id,
    pct: ranks[0].pct,
    others: ranks.filter(function (r) { return !map[r.id] && r.id !== id; }).slice(0, 3)
  };
};
