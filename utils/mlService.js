const tf = require('@tensorflow/tfjs');
exports.go = async (weights) => {
  console.log(`printing weights: ` + weights);
  const mymodel = await tf.loadLayersModel(
    'https://raw.githubusercontent.com/Frdhsn/test-ml-model-load/main/model/model.json'
  );
  mymodel.summary();

  //var data = [[1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6]];
  const resultTensor = mymodel.predict(tf.tensor2d([weights]));
  const predictedValue = resultTensor.arraySync()[0][0];
  //   const ret = mymodel.predict(tf.tensor2d([weights])).print();
  console.log(predictedValue);
  return predictedValue * 100.0;
};
//go();
