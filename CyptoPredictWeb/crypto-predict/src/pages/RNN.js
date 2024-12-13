/** @format */

import React, { useState, useEffect, useCallback } from 'react';
import { Box, Stat, StatLabel, Text } from '@chakra-ui/react';
import * as tf from '@tensorflow/tfjs';
import ProbabilitySpeedometer from './Speedometer';
import { saveTA } from '../supabase/supabase_functions';

const TechnicalAnalysis = () => {
	const [probabilities, setProbabilities] = useState(null);
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

	// Modificar fetchPricesAndPredict para incluir el guardado y memoizarlo
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

				// Calcular probabilidades
				const { upwardProbability, downwardProbability } =
					calculateProbabilities(closingPrices, originalPrediction);
				setProbabilities({ upwardProbability, downwardProbability });

				// Determinar el label (Up o Down)
				const label =
					originalPrediction > closingPrices[closingPrices.length - 1]
						? 'Up'
						: 'Down';

				// Guardar los resultados en Supabase
				await saveTA(label, upwardProbability);
			}
		} catch (err) {
			console.error('Error fetching prices or predicting:', err);
			setError('Failed to fetch prices or predict.');
		}
	}, [model]); // Dependencia de `model` ya que se usa dentro

	// Automatizar la predicción cada 8 horas
	useEffect(() => {
		const saveAndPredict = async () => {
			await fetchPricesAndPredict();
		};

		// Ejecutar inmediatamente al cargar
		saveAndPredict();

		// Configurar intervalo para cada 8 horas
		const interval = setInterval(
			() => {
				saveAndPredict();
			},
			8 * 60 * 60 * 1000
		); // Cada 8 horas

		return () => clearInterval(interval); // Limpiar el intervalo al desmontar
	}, [fetchPricesAndPredict]); // Ahora puedes incluir `fetchPricesAndPredict` sin problemas

	const calculateProbabilities = (lastPrices, predictedPrice) => {
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
		const scaledDownward = scaledDifferences.map((scaled, i) =>
			differences[i] <= 0 ? scaled : 0
		);
		const totalScaled = scaledDifferences.reduce((sum, val) => sum + val, 0);
		const upwardProbability =
			scaledUpward.reduce((sum, val) => sum + val, 0) / totalScaled;
		const downwardProbability =
			scaledDownward.reduce((sum, val) => sum + val, 0) / totalScaled;

		return {
			upwardProbability: (upwardProbability * 100).toFixed(2),
			downwardProbability: (downwardProbability * 100).toFixed(2),
		};
	};

	return (
		<Box
			m={'auto'}
			overflow={'auto'}>
			{error && <Text color='red.500'>{error}</Text>}
			<Stat>
				<StatLabel fontSize={{ base: 20 }}>Análisis Técnico</StatLabel>
				{probabilities && (
					<ProbabilitySpeedometer
						probability={probabilities.upwardProbability}
						texts={{
							down: 'Bajista',
							middle: 'Lateral',
							up: 'Alcista',
							label: 'Tendencia del Mercado',
						}}
					/>
				)}
			</Stat>
		</Box>
	);
};

export default TechnicalAnalysis;
