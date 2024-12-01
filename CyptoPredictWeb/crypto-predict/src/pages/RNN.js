import React, { useState } from "react";
import { Box, Button, Text, VStack,   Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow, 
} from "@chakra-ui/react";
import * as tf from "@tensorflow/tfjs";
import ProbabilitySlider from "./SliderProbaiblity";

const CryptoPrediction = () => {
  const [prices, setPrices] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [probabilities, setProbabilities] = useState(null);
  const [error, setError] = useState(null);
  const [model, setModel] = useState(null);

  React.useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel("/tfjs_model/model.json");
        setModel(loadedModel);
        console.log("Model loaded successfully");
      } catch (err) {
        console.error("Error loading model:", err);
        setError("Failed to load the prediction model.");
      }
    };
    loadModel();
  }, []);

  const fetchPricesAndPredict = async () => {
    try {
      const url = "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=7";
      const response = await fetch(url);
      const data = await response.json();

      // Extract closing prices (index 4 in each candlestick)
      const closingPrices = data.map((entry) => parseFloat(entry[4]));
      setPrices(closingPrices);

      const minPrice = Math.min(...closingPrices);
      const maxPrice = Math.max(...closingPrices);

      if (closingPrices.length === 7 && model) {
        // Normalize the input prices
        const normalizedPrices = closingPrices.map(
          (price) => (price - minPrice) / (maxPrice - minPrice)
        );

        // Prepare input for the model
        const inputTensor = tf.tensor([normalizedPrices]).reshape([1, 7, 1]);

        // Make prediction
        const predictionTensor = model.predict(inputTensor);
        const predictionValue = await predictionTensor.data();

        // Inverse transform the prediction to get the original scale
        const originalPrediction =
          predictionValue[0] * (maxPrice - minPrice) + minPrice;
        setPrediction(originalPrediction);

        // Calculate probabilities
        const { upwardProbability, downwardProbability } = calculateProbabilities(
          closingPrices,
          originalPrediction
        );
        setProbabilities({ upwardProbability, downwardProbability });
      }
    } catch (err) {
      console.error("Error fetching prices or predicting:", err);
      setError("Failed to fetch prices or predict.");
    }
  };

  const calculateProbabilities = (lastPrices, predictedPrice) => {
    // Copy last 7 prices and append the predicted price
    const predictions = [...lastPrices, predictedPrice];

    // Calculate differences between consecutive predictions
    const differences = predictions.slice(1).map((val, i) => val - predictions[i]);

    // Find min and max differences for scaling
    const minDiff = Math.min(...differences);
    const maxDiff = Math.max(...differences);

    // Scale differences to [0, 1]
    const scaledDifferences = differences.map(diff => (diff - minDiff) / (maxDiff - minDiff));

    // Separate scaled upward and downward differences
    const scaledUpward = scaledDifferences.map((scaled, i) => (differences[i] > 0 ? scaled : 0));
    const scaledDownward = scaledDifferences.map((scaled, i) => (differences[i] <= 0 ? scaled : 0));

    // Total sum of scaled differences
    const totalScaled = scaledDifferences.reduce((sum, val) => sum + val, 0);

    // Calculate probabilities
    const upwardProbability = scaledUpward.reduce((sum, val) => sum + val, 0) / totalScaled;
    const downwardProbability = scaledDownward.reduce((sum, val) => sum + val, 0) / totalScaled;

    return {
      upwardProbability: (upwardProbability * 100).toFixed(2),
      downwardProbability: (downwardProbability * 100).toFixed(2),
    };
  };

  return (
    <Box maxWidth="600px" mx="auto" p="8">
      <VStack spacing={3}>
        <Button colorScheme="teal" onClick={fetchPricesAndPredict}>
        Análisis Técnico
        </Button>
        {error && <Text color="red.500">{error}</Text>}
          {prediction !== null && prices.length > 0 && (
            <Text fontSize="lg" fontWeight="bold">
              <Stat>
                <StatLabel>Análisis Técnico</StatLabel>
                <StatNumber>$ {prediction.toFixed(2)} </StatNumber>
                <StatHelpText>
                  <StatArrow type={prediction > prices[prices.length - 1] ? 'increase' : 'decrease'} />
                  $ {(Math.abs(prediction - prices[prices.length - 1])).toFixed(2)}
                </StatHelpText>
              </Stat>
            </Text>
          )}
        {probabilities && <ProbabilitySlider probabilities={probabilities} />}
      </VStack>
    </Box>
  );
};

export default CryptoPrediction;