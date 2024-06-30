const tf = require('@tensorflow/tfjs');

// Define the structure of the machine learning model
const model = tf.sequential();
model.add(tf.layers.dense({ units: 128, activation: 'relu', inputShape: [10] }));
model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

// Compile the model
model.compile({
    optimizer: 'adam',
    loss: 'binaryCrossentropy',
    metrics: ['accuracy']
});

// Function to train the model
async function trainModel(trainingData, trainingLabels) {
    const xs = tf.tensor2d(trainingData);
    const ys = tf.tensor2d(trainingLabels);
    await model.fit(xs, ys, {
        epochs: 10,
        batchSize: 32,
        validationSplit: 0.2
    });
}

// Function to make predictions
function makePrediction(inputData) {
    const inputTensor = tf.tensor2d([inputData]);
    const prediction = model.predict(inputTensor);
    return prediction.dataSync();
}

// Example usage
const trainingData = [
    [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    [1.0, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1]
];
const trainingLabels = [
    [1],
    [0]
];

trainModel(trainingData, trainingLabels).then(() => {
    const inputData = [0.5, 0.4, 0.3, 0.2, 0.1, 0.6, 0.7, 0.8, 0.9, 1.0];
    const prediction = makePrediction(inputData);
    console.log('Prediction:', prediction);
});

module.exports = {
    trainModel,
    makePrediction
};
