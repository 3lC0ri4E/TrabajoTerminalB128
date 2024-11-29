/** @format */

import React from 'react';
import {
	Box,
	Text,
	Wrap,
	WrapItem,
} from '@chakra-ui/react';
import Navbar from './Navbar';

import BitcoinLineChart from './Bitcoinlinechart';

export default function Main() {
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
							El futuro de las
							<Box
								as='span'
								color='#64e400 '>
								&nbsp;inversiones&nbsp;
							</Box>
							está aquí
						</Text>
						<Text
							fontSize={{ base: 15, xl: 20 }}
							fontWeight={450}
							p={[1, 2, 4, 5]}
							textAlign='left'>
                            Descubre el futuro de las inversiones en criptomonedas con
                            nuestro sistema inteligente que predice tendencias del mercado,
                            ayudándote a tomar decisiones estratégicas en un entorno en constante cambio.
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
