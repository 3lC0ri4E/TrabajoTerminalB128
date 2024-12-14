/** @format */

import React from 'react';
import Navbar from './Navbar';
import {
	Box,
	Text,
	Heading,
	Flex,
	Image,
	Stack,
	Divider,
} from '@chakra-ui/react';

export default function Proposito() {
	return (
		<Box>
			<Navbar />

			{/* Contenido centrado */}
			<Stack
				spacing={8}
				align='center'
				textAlign='center'
				maxW={{ base: '90%', md: '700px', lg: '900px' }}
				mx='auto'
				p={{ base: 4, md: 8 }}>
				{/* Título centrado */}
				<Heading
					as='h2'
					size={{ base: 'lg', md: 'xl' }}
					fontWeight='semibold'
					mb={4}>
					Propósito
				</Heading>

				<Divider
					borderColor='gray.300'
					width='60%'
				/>

				{/* Texto descriptivo */}
				<Text
					fontSize={{ base: 'md', md: 'lg' }}
					lineHeight='1.8'
					maxW='800px'
					mb={4}>
					Nuestro propósito es contribuir al avance del análisis financiero y
					tecnológico mediante la exploración de cómo la inteligencia artificial
					puede mejorar la precisión en la predicción de tendencias del precio
					de Bitcoin, facilitando así decisiones más informadas y estratégicas
					en el mercado de criptomonedas.
				</Text>

				<Divider
					borderColor='gray.300'
					width='60%'
				/>

				{/* Imágenes */}
				<Flex
					justify='center'
					gap={{ base: 4, md: 8 }}
					mt={8}
					flexWrap='wrap'>
					{/* Primera Imagen */}
					<Image
						src='/images/proposito1.webp'
						alt='Imagen de propósito 1'
						boxSize={{ base: '200px', md: '250px', lg: '300px' }}
						objectFit='cover'
						borderRadius='md'
						boxShadow='md'
						_hover={{ boxShadow: 'xl' }}
					/>

					{/* Segunda Imagen */}
					<Image
						src='/images/proposito2.webp'
						alt='Imagen de propósito 2'
						boxSize={{ base: '200px', md: '250px', lg: '300px' }}
						objectFit='cover'
						borderRadius='md'
						boxShadow='md'
						_hover={{ boxShadow: 'xl' }}
					/>
				</Flex>
			</Stack>
		</Box>
	);
}
