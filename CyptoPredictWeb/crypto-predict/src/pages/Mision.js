/** @format */

import React from 'react';
import Navbar from './Navbar';
import {
	Box,
	Text,
	Heading,
	Stack,
	Flex,
	Image,
	Divider,
} from '@chakra-ui/react';

export default function Mision() {
	return (
		<Box>
			<Navbar />

			{/* Contenido de la misión centrado */}
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
					Misión
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
					Nuestra misión es desarrollar un prototipo de herramienta que integre
					inteligencia artificial y análisis de mercado para investigar la
					capacidad de predecir tendencias en el comportamiento de Bitcoin,
					fomentando decisiones de inversión más informadas y explorando formas
					de reducir la incertidumbre en el mercado de criptomonedas.
				</Text>

				<Text
					fontSize={{ base: 'md', md: 'lg' }}
					lineHeight='1.8'
					maxW='800px'>
					Buscamos impulsar la adopción de tecnologías emergentes para permitir
					a nuestros usuarios aprovechar las oportunidades del mercado de manera
					estratégica y fundamentada.
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
						src='/images/mision 1.webp'
						alt='Imagen de misión 1'
						boxSize={{ base: '200px', md: '250px', lg: '300px' }}
						objectFit='cover'
						borderRadius='md'
						boxShadow='md'
						_hover={{ boxShadow: 'xl' }}
					/>

					{/* Segunda Imagen */}
					<Image
						src='/images/mision 2.webp'
						alt='Imagen de misión 2'
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
