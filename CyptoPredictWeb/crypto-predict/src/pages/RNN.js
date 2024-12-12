import React, { useState, useEffect } from "react";
import { Box, Text, VStack, Stat, StatLabel, StatNumber, StatHelpText, StatArrow } from "@chakra-ui/react";
import * as tf from "@tensorflow/tfjs";
import ProbabilitySlider from "./SliderProbaiblity";
import ProbabilitySpeedometer from "./Speedometer";
import { saveTA } from '../supabase/supabase_functions';

const CryptoPrediction = () => {
  const [prices, setPrices] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [probabilities, setProbabilities] = useState(null);
  const [error, setError] = useState(null);
  const [model, setModel] = useState(null);

  // Cargar modelo TensorFlow
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await tf.loadLayersModel("/tfjs_model/model.json");
        setModel(loadedModel);
      } catch (err) {
        setError("Failed to load the prediction model.");
      }
    };
    loadModel();
  }, []);

  // Automatizar la predicción cada 8 horas
  useEffect(() => {
    const saveAndPredict = async () => {
      await fetchPricesAndPredict();
    };

    // Ejecutar inmediatamente al cargar
    saveAndPredict();

    // Configurar intervalo para cada 8 horas
    const interval = setInterval(() => {
      saveAndPredict();
    }, 8 * 60 * 60 * 1000); // Cada 8 horas

  return () => clearInterval(interval); // Limpiar el intervalo al desmontar
}, [model]);

 // Modifica fetchPricesAndPredict para incluir el guardado
const fetchPricesAndPredict = async () => {
  try {
    const url = "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=7";
    const response = await fetch(url);
    const data = await response.json();

    // Extraer precios de cierre
    const closingPrices = data.map((entry) => parseFloat(entry[4]));
    setPrices(closingPrices);

    const minPrice = Math.min(...closingPrices);
    const maxPrice = Math.max(...closingPrices);

    if (closingPrices.length === 7 && model) {
      // Normalizar precios
      const normalizedPrices = closingPrices.map(
        (price) => (price - minPrice) / (maxPrice - minPrice)
      );

      // Preparar entrada para el modelo
      const inputTensor = tf.tensor([normalizedPrices]).reshape([1, 7, 1]);

      // Hacer predicción
      const predictionTensor = model.predict(inputTensor);
      const predictionValue = await predictionTensor.data();

      // Transformar a escala original
      const originalPrediction =
        predictionValue[0] * (maxPrice - minPrice) + minPrice;
      setPrediction(originalPrediction);

      // Calcular probabilidades
      const { upwardProbability, downwardProbability } = calculateProbabilities(
        closingPrices,
        originalPrediction
      );
      setProbabilities({ upwardProbability, downwardProbability });

      // Determinar el label (Up o Down)
      const label = originalPrediction > closingPrices[closingPrices.length - 1] ? "Up" : "Down";

      // Guardar los resultados en Supabase
      await saveTA(label, upwardProbability);
    }
  } catch (err) {
    console.error("Error fetching prices or predicting:", err);
    setError("Failed to fetch prices or predict.");
  }
};

  const calculateProbabilities = (lastPrices, predictedPrice) => {
    const predictions = [...lastPrices, predictedPrice];
    const differences = predictions.slice(1).map((val, i) => val - predictions[i]);
    const minDiff = Math.min(...differences);
    const maxDiff = Math.max(...differences);
    const scaledDifferences = differences.map(diff => (diff - minDiff) / (maxDiff - minDiff));
    const scaledUpward = scaledDifferences.map((scaled, i) => (differences[i] > 0 ? scaled : 0));
    const scaledDownward = scaledDifferences.map((scaled, i) => (differences[i] <= 0 ? scaled : 0));
    const totalScaled = scaledDifferences.reduce((sum, val) => sum + val, 0);
    const upwardProbability = scaledUpward.reduce((sum, val) => sum + val, 0) / totalScaled;
    const downwardProbability = scaledDownward.reduce((sum, val) => sum + val, 0) / totalScaled;

    return {
      upwardProbability: (upwardProbability * 100).toFixed(2),
      downwardProbability: (downwardProbability * 100).toFixed(2),
    };
  };

  return (
    <Box m={'auto'}>
        {error && <Text color="red.500">{error}</Text>}
        {prediction !== null && prices.length > 0 && (
          <Text fontSize="lg" fontWeight="bold">
            {/* <Stat> */}
              {/* <StatLabel>Análisis Técnico</StatLabel> */}
              {/* <StatNumber>$ {prediction.toFixed(2)}</StatNumber> */}
              {/* <StatHelpText>
                <StatArrow type={prediction > prices[prices.length - 1] ? 'increase' : 'decrease'} />
                $ {(Math.abs(prediction - prices[prices.length - 1])).toFixed(2)}
              </StatHelpText> */}
            {/* </Stat> */}
          </Text>
        )}
        {probabilities && <ProbabilitySpeedometer upwardProbability={probabilities.upwardProbability} texts={{down :'Bajista',middle: 'Lateral', up: 'Alcista'}} />}
    </Box>
  );
};

export default CryptoPrediction;
