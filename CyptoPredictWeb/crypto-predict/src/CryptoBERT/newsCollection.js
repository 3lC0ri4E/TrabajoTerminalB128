import React from 'react';
import axios from 'axios';
import * as cheerio from 'cheerio';
import fs from 'fs';
import moment from 'moment';
import { createObjectCsvWriter as createCsvWriter } from 'csv-writer';

// URL de las páginas de noticias
const urls = {
  'cointelegraph': 'https://cointelegraph.com/rss/tag/bitcoin',
  'bitcoinmagazine': 'https://bitcoinmagazine.com/.rss/full/',
  'cryptopotato': 'https://cryptopotato.com/feed/',
  'cryptoslate': 'https://cryptoslate.com/feed/',
  'cryptonews': 'https://cryptonews.com/news/feed/',
};

// Ruta del archivo CSV
const csvFile = 'news_data.csv';

// Cargar datos previos si el archivo existe
let existingData = [];
if (fs.existsSync(csvFile)) {
  const csvData = fs.readFileSync(csvFile, 'utf8');
  existingData = csvData.split('\n').slice(1).map(line => line.split(','));
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
            const pubDate = $(element).find('pubDate').text();
            const link = $(element).find('link').text();
            let description = $(element).find('description').text() || 'No description available';
  
            // Convertir pubDate a formato "EEE, dd, MMM, yyyy"
            const pubDateFormatted = moment(pubDate, 'ddd, DD MMM YYYY HH:mm:ss Z').format('ddd, DD MMM YYYY');
  
            // Filtrar solo las noticias de Bitcoin
            if (title.toLowerCase().includes('bitcoin') || title.includes('BTC')) {
              // Parsear la descripción para obtener solo texto
              const descriptionText = cheerio.load(description).text().trim();
  
              newsData.push({
                site: name,
                title: title,
                pubDate: pubDateFormatted,
                link: link,
                description: descriptionText,
              });
            }
          });
        } else {
          console.log(`Failed to retrieve data from ${name}. Status code: ${response.status}`);
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
        { id: 'pubDate', title: 'pubDate' },
        { id: 'link', title: 'link' },
        { id: 'description', title: 'description' },
      ],
      append: true, // Append to existing CSV
    });
  
    // Combina los nuevos datos con los existentes y elimina duplicados
    const allData = [...existingData, ...newsData];
    const uniqueData = Array.from(new Set(allData.map(item => item.title)))
      .map(title => allData.find(item => item.title === title));
  
    // Escribir en CSV
    await csvWriter.writeRecords(uniqueData);
    console.log('Data saved to CSV.');
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
    await saveDataToCSV(newsData);
  }, 28800000);
  
  // Ejecutar una vez al principio
  (async () => {
    const newsData = await fetchNews();
    await saveDataToCSV(newsData);
  })();