/** @format */

import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import moment from 'moment';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';
import {
	uploadnews,
	getnews,
	updateNewsAnalysisId,
	getNewsAnalysisId,
} from './supabase/supabase_functions.js';
import {
	getNews,
	combineFields,
	getCurrentNews,
	getCurrentSentiment,
} from './sentimentNews.js';

// URL de las páginas de noticias
const urls = {
	CoinTelegraph: 'https://cointelegraph.com/rss/tag/bitcoin',
	'Bitcoin Magazine': 'https://bitcoinmagazine.com/.rss/full/',
	'Crypto Slate': 'https://cryptoslate.com/feed/',
	'Crypto News': 'https://cryptonews.com/news/feed/',
};

// Ruta del archivo CSV
const csvFile = 'news_data_js.csv';

// Cargar datos previos si el archivo existe
let existingData = [];
if (fs.existsSync(csvFile)) {
	const csvData = fs.readFileSync(csvFile, 'utf8');
	existingData = csvData
		.split('\n')
		.slice(1)
		.map((line) => line.split(','));
}

// Función para extraer noticias
async function fetchNews() {
	const newsData = [];

	// Hacer solicitudes HTTP a las páginas web
	for (const [name, url] of Object.entries(urls)) {
		try {
			const response = await axios.get(url);
			console.log(`Response from ${name}:`, response.status);

			if (response.status === 200) {
				const $ = cheerio.load(response.data, { xmlMode: true });

				$('item').each((index, element) => {
					const title = $(element).find('title').text();
					const pubdate = $(element).find('pubDate').text();
					const link = $(element).find('link').text();
					let description = $(element).find('description').text() || 'NULL';
					let content = $(element).find('content\\:encoded').text() || 'NULL';

					// Eliminar saltos de línea en el contenido
					content = content.replace(/(\r\n|\n|\r)/g, ' ');

					// Convertir pubDate a formato "EEE, dd, MMM, yyyy"
					const pubDateFormatted = moment(
						pubdate,
						'ddd, DD MMM YYYY HH:mm:ss Z'
					).format('YYYY-MM-DD');

					// Filtrar solo las noticias de Bitcoin
					if (
						title.toLowerCase().includes('bitcoin') ||
						title.includes('BTC')
					) {
						// Parsear la descripción y contenido para obtener solo texto
						const descriptionText = cheerio.load(description).text().trim();
						const contentText = cheerio.load(content).text().trim();

						newsData.push({
							site: name,
							title: title,
							pubDate: pubDateFormatted,
							link: link,
							description: descriptionText,
							content: contentText,
						});
					}
				});
			} else {
				console.log(
					`Failed to retrieve data from ${name}. Status code: ${response.status}`
				);
			}
		} catch (error) {
			console.error(`Error fetching data from ${name}:`, error.message);
		}
	}
	return newsData;
}

// Guardar datos en el archivo CSV
async function saveDataToCSV(newsData) {
	const csvWriter = createCsvWriter({
		path: csvFile,
		header: [
			{ id: 'site', title: 'site' },
			{ id: 'title', title: 'title' },
			{ id: 'puDdate', title: 'pubDate' },
			{ id: 'link', title: 'link' },
			{ id: 'description', title: 'description' },
			{ id: 'content', title: 'content' },
		],
		append: true, // Append to existing CSV
	});

	// Combina los nuevos datos con los existentes y elimina duplicados
	const allData = [...existingData, ...newsData];
	const uniqueData = Array.from(new Set(allData.map((item) => item.title))).map(
		(title) => allData.find((item) => item.title === title)
	);

	// Escribir en CSV
	await csvWriter.writeRecords(uniqueData);
	console.log('Data saved to CSV.');
}

// Guardar noticias en supabase
async function saveDataToSupabase(newsData) {
	// Obtener fecha actual en formato YYYY-MM-DD
	const currentDate = moment().format('YYYY-MM-DD');
	// Verificar las noticias existentes en la base de datos a partir de la fecha actual
	const existingNews = await getnews(currentDate);
	if (existingNews.error) {
		console.error(
			'Error al obtener las noticias de la base de datos:',
			existingNews.error.message
		);
		return;
	}
	//console.log('Noticias dentro de supabase del día actual', existingNews);
	// Obtener las noticias de la fecha actual de newsData
	const newNews = newsData.filter((news) => news.pubDate === currentDate);
	//console.log('Nuevas noticias del día actual:', newNews);
	console.log('Total de noticias del día actual:', newNews.length);
	// Filtrar las noticias que no existen en la base de datos
	const newsToUpload = newNews.filter(
		(news) =>
			!existingNews.data.find(
				(existingNews) => existingNews.title === news.title
			)
	);
	//console.log('Noticias a subir:', newsToUpload);
	console.log('Total de noticias a subir:', newsToUpload.length);

	// Subir noticias a la base de datos
	for (const news of newsToUpload) {
		const { error } = await uploadnews(news);
		if (error) {
			console.error(
				'Error al subir noticias a la base de datos:',
				error.message
			);
			return;
		}
		console.log('Noticia subida a la base de datos:', news.title);
	}
}

async function saveData(newsData) {
	//await saveDataToCSV(newsData);
	await saveDataToSupabase(newsData);
}

// Ejecutar el flujo
/*async function run() {
      const newsData = await fetchNews();
      await saveDataToCSV(newsData);
    }
    
    run();*/
// Ejecutar el flujo cada 8 horas
setInterval(async () => {
	const newsData = await fetchNews();
	await saveData(newsData);
	await analyzeSentiment();
}, 28800000);

// Ejecutar una vez al principio
(async () => {
	const newsData = await fetchNews();
	await saveData(newsData);
	await analyzeSentiment();
})();
