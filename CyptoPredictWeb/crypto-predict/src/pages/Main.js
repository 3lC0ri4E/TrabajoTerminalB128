/** @format */

import React, { useEffect, useState } from 'react';
import { Box, Text, Wrap, WrapItem } from '@chakra-ui/react';
import Navbar from './Navbar';
import TAnalysis from './RNNFunctions';
import BitcoinLineChart from './Bitcoinlinechart';
import { getLastTAnalysis, saveTA } from '../supabase/supabase_functions';
import { fetchNews, saveDataToSupabase } from './newsCollection';
import { getNews, getCurrentSentiment, combineFields } from './sentimentNews';

export default function Main() {
	const { probability, predictedPrice, realPrice } = TAnalysis();
	//Realizas tu recoleccion de noticias y tu analisis de Sentimientos
	const [hasSaved, setHasSaved] = useState(false);

	useEffect(() => {
		const fetchMaxData = async () => {
			const { data } = await getLastTAnalysis();
			// Obtienes tu ultimo registro de Analisis Fundamental de la BD
			if (data && data.created_at) {
				const today = new Date().toISOString().split('T')[0];
				const createdDate = new Date(data.created_at)
					.toISOString()
					.split('T')[0];
				console.log(today);
				console.log(createdDate);
				if (today !== createdDate && probability && !hasSaved) {
					const label = predictedPrice > realPrice ? 'Up' : 'Down';
					await saveTA(label, probability, predictedPrice, realPrice);
					// Guardas tu nuevo Analisis Fundamental en la BD
					setHasSaved(true);
				}
			} else if (!hasSaved) {
				if (probability) {
					const label = predictedPrice > realPrice ? 'Up' : 'Down';
					await saveTA(label, probability, predictedPrice, realPrice);
					// Guardas tu nuevo Analisis Fundamental en la BD
					setHasSaved(true);
				}
			}
		};
		fetchMaxData();
	}, [probability, hasSaved, predictedPrice, realPrice]);

	/*
	// Análisis de sentimientos
	const [sentiment, setSentiment] = useState(null);

	useEffect(() => {
		const getSentiment = async () => {
			const getnews = await getNews();
			if (!getnews || !Array.isArray(getnews)) {
				console.error('getNews returned an invalid response:', getnews);
				return;
			}

			const combinedFields = combineFields(getnews);
			if (!combinedFields) {
				console.error(
					'combineFields returned an invalid response:',
					combinedFields
				);
				return;
			}
			const currentSentiment = await getCurrentSentiment(combinedFields);
			setSentiment(currentSentiment);
		};

		getSentiment();
	}, []);*/

	
	return (
		<Box>
			<Navbar />
			<Wrap
				align='center'
				justify='center'
				spacing={5}>
				<WrapItem>
					<Box
						w={{ base: '80vw', md: '45vw' }}
						m={6}>
						<Text
							fontWeight={600}
							fontSize={{ base: 25, md: 35 }}
							p={[1, 2, 4, 5]}
							textAlign='left'>
							Innovación que transforma tus
							<Box
								as='span'
								color='#64e400 '>
								&nbsp;desiciones&nbsp;
							</Box>
						</Text>
						<Text
							fontSize={{ base: 15, xl: 20 }}
							fontWeight={450}
							p={[1, 2, 4, 5]}
							textAlign='left'>
							Descubre el futuro de las inversiones en criptomonedas con nuestro
							sistema inteligente que predice tendencias del mercado, ayudándote
							a tomar decisiones estratégicas en un entorno en constante cambio.
						</Text>
					</Box>
				</WrapItem>
				<WrapItem>
					<Box
						w={{ base: '90vw', md: '45vw' }}
						h={{ base: '50vh', md: '70vh' }}
						mb={6}>
						{/* <BitcoinChart /> */}
						<BitcoinLineChart />
					</Box>
				</WrapItem>
			</Wrap>
		</Box>
	);
}
