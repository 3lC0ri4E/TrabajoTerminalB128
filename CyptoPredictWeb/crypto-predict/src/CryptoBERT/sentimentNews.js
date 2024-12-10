import fs from 'fs';
import csv from 'csv-parser';
import fetch from 'node-fetch'; 
import { parse, format } from 'date-fns';

// Cargar datos desde el CSV.
const newsData = [];
fs.createReadStream('news_data.csv')
  .pipe(csv())
  .on('data', (row) => {
    newsData.push(row);
  })
  .on('end', async () => {
    // Combinamos los campos para generar el texto completo de cada noticia.
    newsData.forEach(row => {
      row.text = `${row.title || ''} ${row.description || ''} ${row.content || ''}`.trim();
    });

    // Obtener la fecha actual y formatearla.
    const today = new Date();
    const formattedDate = format(today, 'EEE, dd MMM yyyy');
    console.log('Fecha actual:', formattedDate);

    // Filtrar noticias de la fecha actual.
    const filteredNews = newsData.filter(row => {
      try {
        const pubDate = parse(row.pubDate, "EEE, dd MMM yyyy", new Date());
        return pubDate.toDateString() === today.toDateString();
      } catch (error) {
        console.error('Error al parsear la fecha:', row.pubDate, error);
        return false;
      }
    });

    //console.log('Noticias filtradas:', filteredNews);

    if (filteredNews.length === 0) {
      console.log('No hay noticias de la fecha actual.');
      return;
    }

    // Token de autenticación de Hugging Face
    const token = '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';

    // Función para hacer una pausa
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Función para obtener la clasificación de sentimiento usando la API de Hugging Face
    async function getSentiment(text) {
      const apiUrl = 'https://api-inference.huggingface.co/models/AsaelGI1/local-tf-checkpoint';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ inputs: text }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error en la API de Hugging Face: ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      return data;
    }

    // Función para dividir el texto en fragmentos
    function splitText(text, maxLength) {
      const words = text.split(' ');
      const chunks = [];
      let chunk = [];

      for (const word of words) {
        if ((chunk.join(' ').length + word.length + 1) <= maxLength) {
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
    for (let i = 0; i < filteredNews.length; i++) {
      const news = filteredNews[i];
      console.log(`Procesando noticia: "${news.title}"`);

      try {
        const maxLength = 512; // Define el límite de palabras
        const chunks = splitText(news.text, maxLength);

        console.log(`Fragmentos generados para "${news.title}":`, chunks);

        const sentimentResults = [];

        for (const chunk of chunks) {
          const sentimentResult = await getSentiment(chunk);
          sentimentResults.push(sentimentResult);
          await sleep(1000);  // Esperar entre solicitudes
        }

        // Desanidar resultados y procesarlos
        const flattenedResults = sentimentResults.flat(3);
        console.log(`Resultados completos para "${news.title}":`, JSON.stringify(flattenedResults, null, 2));

        // Calcular el sentimiento predominante
        const sentimentSummary = flattenedResults.reduce((acc, curr) => {
          if (curr.label === 'LABEL_1' || curr.label === 'LABEL_0') {
            acc[curr.label] = (acc[curr.label] || 0) + curr.score;
          }
          return acc;
        }, {});

        const totalCount = Object.values(sentimentSummary).reduce((sum, value) => sum + value, 0);

        if (totalCount > 0) {
          const positiveCount = sentimentSummary['LABEL_1'] || 0;
          const negativeCount = sentimentSummary['LABEL_0'] || 0;

          // Calcular porcentaje de sentimientos
          const positivePercentage = (positiveCount / totalCount) * 100;
          const negativePercentage = (negativeCount / totalCount) * 100;

          console.log(`Tendencia del Sentimiento:\nPositivo: ${positivePercentage.toFixed(2)}%\nNegativo: ${negativePercentage.toFixed(2)}%`);

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
    //const totalProb = totalPositiveProb + totalNegativeProb;
    const generalSentiment = totalPositiveProb > totalNegativeProb ? 'Positive' : 'Negative';
    const percentage = totalNewsCount > 0 ? (generalSentiment === 'Positive' ? totalPositiveProb : totalNegativeProb) / totalNewsCount : 0;

    // Almacenar el resultado en un archivo JSON
    const result = {
      sentiment: generalSentiment,  // Ahora guarda 'Positive' o 'Negative'
      percentage: percentage.toFixed(2)  // El porcentaje se guarda como número
    };

    fs.writeFileSync('predominant_sentiment.json', JSON.stringify(result, null, 2));
    console.log('Sentimiento predominante general guardado en "predominant_sentiment.json".');
  });