/** @format */

import React, { useEffect, useState } from 'react';
import { Box, Text, Wrap, WrapItem } from '@chakra-ui/react';
import Navbar from './Navbar';
import TAnalysis from './RNNFunctions';
import BitcoinLineChart from './Bitcoinlinechart';
import { getLastTAnalysis, saveTA } from '../supabase/supabase_functions';

export default function Main() {
	const { probability, predictedPrice, realPrice } = TAnalysis();
	// Realizas tu recoleccion de noticias y tu analisis de Sentimientos
	const [hasSaved, setHasSaved] = useState(false);

	useEffect(() => {
		const fetchMaxData = async () => {
			// console.log('Step 1: Fetching last analysis...');
			const { data } = await getLastTAnalysis();
			// console.log('Step 2: Data fetched:', data);

			const today = new Date().toISOString().split('T')[0];
			// console.log("Step 3: Today's date:", today);

			// Check if data exists and has a valid created_at
			if (data && data[0]?.created_at) {
				const createdDate = new Date(data[0].created_at)
					.toISOString()
					.split('T')[0];
				// console.log('Step 4: Last saved date:', createdDate);

				if (today === createdDate) {
					// console.log('Step 5: Data already saved today. Skipping save.');
					return; // Exit if data for today already exists
				}
			}

			// If no record for today exists and not yet saved in this session
			if (!hasSaved && probability && predictedPrice && realPrice) {
				// console.log('Step 6: Saving new data...');
				const label = predictedPrice > realPrice ? 'Up' : 'Down';
				await saveTA(label, probability, predictedPrice, realPrice);
				setHasSaved(true); // Mark as saved
				// console.log('Step 7: Data saved successfully.');
			}
		};
		fetchMaxData();
	}, [probability, predictedPrice, realPrice, hasSaved]);

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
