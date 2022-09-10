exports.calculate = (weights) => {
  let s = 0;
  const n = weights.length;
  for (let i = 0; i < n; i++) s += weights[i];
  const score = s / n;
  return score;
};
