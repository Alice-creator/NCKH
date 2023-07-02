import { NativeModules } from 'react-native';

const MODEL_FILE_PATH = './best.pt';

export const loadModel = async () => {
  try {
    // Load the TensorFlow Lite model
    const { TensorFlowModule } = NativeModules;
    console.log(TensorFlowModule)
    await TensorFlowModule.loadModel(MODEL_FILE_PATH);
    console.log('Model loaded successfully');
  } catch (error) {
    throw new Error('Failed to load the model: ' + error);
  }
};

export const runModel = async (inputData) => {
  try {
    // Run the TensorFlow Lite model
    const { TensorFlowModule } = NativeModules;
    const result = await TensorFlowModule.runModel(inputData);
    return result;
  } catch (error) {
    throw new Error('Failed to run the model: ' + error);
  }
};
