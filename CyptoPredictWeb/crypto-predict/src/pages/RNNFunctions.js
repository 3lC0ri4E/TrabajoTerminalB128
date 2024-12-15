/** @format */

import { useState, useEffect, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';

const TAnalysis = () => {
	const [probability, setProbability] = useState(null);
	const [predictedPrice, setPredictedPrice] = useState(null);
	const [realPrice, setRealPrice] = useState(null);
	const [error, setError] = useState(null);
	const [model, setModel] = useState(null);

	// Cargar modelo TensorFlow
	useEffect(() => {
		const loadModel = async () => {
			try {
				const loadedModel = await tf.loadLayersModel('/tfjs_model/model.json');
				setModel(loadedModel);
			} catch (err) {
				setError('Error al cargar el modelo de predicción.');
			}
		};
		loadModel();
	}, []);

	// Función para obtener precios y predecir
	const fetchPricesAndPredict = useCallback(async () => {
		try {
			const url =
				'https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1d&limit=7';
			const response = await fetch(url);
			const data = await response.json();

			// Extraer precios de cierre
			const closingPrices = data.map((entry) => parseFloat(entry[4]));

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

				// Almacenar el precio predicho
				setPredictedPrice(originalPrediction);
				setRealPrice(closingPrices[closingPrices.length - 1]);

				// Calcular probabilidad
				const calculatedProbability = calculateProbability(
					closingPrices,
					originalPrediction
				);
				setProbability(calculatedProbability);
			}
		} catch (err) {
			console.error('Error fetching prices or predicting:', err);
			setError('Failed to fetch prices or predict.');
		}
	}, [model]); // Dependencia de `model` ya que se usa dentro

	useEffect(() => {
		fetchPricesAndPredict();
	}, [fetchPricesAndPredict]); // Ejecutar una sola vez al cargar

	const calculateProbability = (lastPrices, predictedPrice) => {
		const predictions = [...lastPrices, predictedPrice];
		const differences = predictions
			.slice(1)
			.map((val, i) => val - predictions[i]);
		const minDiff = Math.min(...differences);
		const maxDiff = Math.max(...differences);
		const scaledDifferences = differences.map(
			(diff) => (diff - minDiff) / (maxDiff - minDiff)
		);
		const scaledUpward = scaledDifferences.map((scaled, i) =>
			differences[i] > 0 ? scaled : 0
		);
		const totalScaled = scaledDifferences.reduce((sum, val) => sum + val, 0);
		const upwardProbability =
			scaledUpward.reduce((sum, val) => sum + val, 0) / totalScaled;

		return (upwardProbability * 100).toFixed(2);
	};

	return { probability, predictedPrice, realPrice, error };
};

export default TAnalysis;
