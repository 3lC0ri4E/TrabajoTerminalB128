/** @format */

import fetch from 'node-fetch';
import { format } from 'date-fns';
import { getnews, insertSentiment } from '../supabase/supabase_functions';

// Función para obtener la fecha actual y formatearla
function getCurrentDate() {
	const today = new Date();
	const formattedDate = format(today, 'yyyy-MM-dd');
	console.log('Fecha actual:', formattedDate);
	return formattedDate;
}

// Función para obtener las noticias de la base de datos
async function getNews() {
	const currentDate = getCurrentDate();
	const { data, error } = await getnews(currentDate);
	if (error) {
		console.error(
			'Error al obtener las noticias de la base de datos:',
			error.message
		);
		return null;
	}
	return data;
}

// Función para combinar los campos para generar el texto completo de cada noticia
function combineFields(newsData) {
	newsData.forEach((row) => {
		row.text =
			`${row.title || ''} ${row.description || ''} ${row.content || ''}`.trim();
	});
	return newsData;
}

// Función para filtrar noticias de la fecha actual
function filterNewsByDate(newsData, currentDate) {
	const filteredNews = newsData.filter((row) => {
		try {
			//console.log(row.pubDate);
			return row.pubDate === currentDate;
		} catch (error) {
			console.error('Error al parsear la fecha:', row.pubDate, error);
			return false;
		}
	});
	console.log('Total de noticias después de filtrar:', filteredNews.length);
	return filteredNews;
}

// Función para obtener las noticias de la fecha actual
async function getCurrentNews(newsData) {
	const currentDate = getCurrentDate();
	const filteredNews = filterNewsByDate(newsData, currentDate);
	//console.log('Noticias filtradas:', filteredNews);
	if (filteredNews.length === 0) {
		console.log('No hay noticias de la fecha actual.');
		return;
	}
	return filteredNews;
}

// Función para obtener el sentimiento general de las noticias de la fecha actual
async function getCurrentSentiment(newsData) {
	const currentNews = await getCurrentNews(newsData);
	if (!Array.isArray(currentNews) || currentNews.length === 0) {
		return;
	}
	// Token de autenticación de Hugging Face
	const token = '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';

	// Función para hacer una pausa
	const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

	// Función para obtener la clasificación de sentimiento usando la API de Hugging Face
	async function getSentiment(text) {
		const apiUrl =
			'https://api-inference.huggingface.co/models/AsaelGI1/local-tf-checkpoint';
		const headers = {
			Authorization: `Bearer ${token}`,
			'Content-Type': 'application/json',
		};
		const body = JSON.stringify({ inputs: text });

		for (let attempt = 0; attempt < 5; attempt++) {
			try {
				const response = await fetch(apiUrl, {
					method: 'POST',
					headers: headers,
					body: body,
				});

				if (!response.ok) {
					const errorData = await response.json();
					if (
						errorData.error &&
						errorData.error.includes('currently loading')
					) {
						console.log(
							`Modelo cargando, reintentando en 1 segundo... (Intento ${attempt + 1})`
						);
						await sleep(1000); // Espera 1 segundo antes de reintentar
						continue;
					} else {
						throw new Error(
							`Error en la API de Hugging Face: ${response.statusText} - ${JSON.stringify(errorData)}`
						);
					}
				}

				const result = await response.json();
				return result;
			} catch (error) {
				console.error(`Error en la solicitud de sentimiento: ${error.message}`);
				if (attempt === 4) {
					throw error; // Si es el último intento, lanza el error
				}
				await sleep(1000); // Espera 1 segundo antes de reintentar
			}
		}
	}

	// Función para dividir el texto en fragmentos
	function splitText(text, maxLength) {
		const words = text.split(' ');
		const chunks = [];
		let chunk = [];

		for (const word of words) {
			if (chunk.join(' ').length + word.length + 1 <= maxLength) {
				chunk.push(word);
			} else {
				chunks.push(chunk.join(' '));
				chunk = [word];
			}
		}
		if (chunk.length > 0) {
			chunks.push(chunk.join(' '));
		}

		return chunks;
	}

	// Variables para acumular las probabilidades de los sentimientos predominantes
	let totalPositiveProb = 0;
	let totalNegativeProb = 0;
	let totalNewsCount = 0;

	// Clasificar noticias filtradas por sentimiento
	for (let i = 0; i < currentNews.length; i++) {
		const news = currentNews[i];
		console.log(`Procesando noticia: "${news.title}"`);

		try {
			const maxLength = 512; // Define el límite de palabras
			const chunks = splitText(news.text, maxLength);

			console.log(`Fragmentos generados para "${news.title}":`, chunks);

			const sentimentResults = [];

			for (const chunk of chunks) {
				const sentimentResult = await getSentiment(chunk);
				sentimentResults.push(sentimentResult);
				await sleep(500); // Esperar entre solicitudes
			}

			// Desanidar resultados y procesarlos
			const flattenedResults = sentimentResults.flat(3);
			console.log(
				`Resultados completos para "${news.title}":`,
				JSON.stringify(flattenedResults, null, 2)
			);

			// Calcular el sentimiento predominante
			const sentimentSummary = flattenedResults.reduce((acc, curr) => {
				if (curr.label === 'LABEL_1' || curr.label === 'LABEL_0') {
					acc[curr.label] = (acc[curr.label] || 0) + curr.score;
				}
				return acc;
			}, {});

			const totalCount = Object.values(sentimentSummary).reduce(
				(sum, value) => sum + value,
				0
			);

			if (totalCount > 0) {
				const positiveCount = sentimentSummary['LABEL_1'] || 0;
				const negativeCount = sentimentSummary['LABEL_0'] || 0;

				// Calcular porcentaje de sentimientos
				const positivePercentage = (positiveCount / totalCount) * 100;
				const negativePercentage = (negativeCount / totalCount) * 100;

				console.log(
					`Tendencia del Sentimiento:\nPositivo: ${positivePercentage.toFixed(2)}%\nNegativo: ${negativePercentage.toFixed(2)}%`
				);

				// Acumulamos las probabilidades predominantes
				totalPositiveProb += positivePercentage;
				totalNegativeProb += negativePercentage;
				totalNewsCount++;
			}
		} catch (error) {
			console.error(`Error al clasificar la noticia "${news.title}":`, error);
		}
	}

	// Calcular el sentimiento predominante general
	const generalSentiment =
		totalPositiveProb > totalNegativeProb ? 'Positive' : 'Negative';
	let percentage =
		totalNewsCount > 0
			? (generalSentiment === 'Positive'
					? totalPositiveProb
					: totalNegativeProb) / totalNewsCount
			: 0;
	const currentDate = new Date().toISOString(); // Obtener la fecha actual en formato ISO

	// Almacenar el resultado en supabase
	const { error: insertError } = await insertSentiment(
		currentDate,
		generalSentiment,
		percentage
	);
	if (insertError) {
		console.error(
			'Error al guardar el sentimiento en la base de datos:',
			insertError.message
		);
	} else {
		console.log('Sentimiento guardado en la base de datos.');
	}

	// Ajuste del porcentaje para el speedometer (0-50 negativo, 50-100 positivo)
	if (generalSentiment === 'Negative') {
		percentage = 100 - percentage; // Invertimos el porcentaje para representarlo en el rango negativo
	}
	//console.log(`Valor final para el Speedometer: ${percentage.toFixed(2)}%`);
	// Devolver el porcentaje final para el Speedometer
	return percentage;
}

export { getNews, combineFields, getCurrentSentiment };