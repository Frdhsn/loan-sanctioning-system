const { go } = require('./mlService');

// import * as tf from '@tensorflow/tfjs';
exports.calculate = async (weights) => {
  const conv = [100, 1, 1, 100, 1, 1, 1, 100, 1, 1, 1, 1, 100, 100, 1];
  const mean = [
    7717042.881, 0.6896756764, 1203.060179, 1063053.42, 5.692907279, 1.963967632, 3.805664353, 18569.09958, 18.10574773,
    550.6340986, 11.16863148, 0.1678882124, 293266.8787, 716570.0537, 0.1147671307,
  ];
  const standardDeviation = [
    26130673.96, 0.462627843, 1989.065689, 1127597.593, 3.642314168, 0.9552595082, 2.302652091, 12026.74881,
    7.041190764, 481.726203, 5.007693253, 0.4830416709, 373726.4038, 6841731.813, 0.346620558,
  ];

  const n = weights.length;
  for (let i = 0; i < n; i++) weights[i] = (weights[i] * conv[i] - mean[i]) / standardDeviation[i];
  return await go(weights);
};
