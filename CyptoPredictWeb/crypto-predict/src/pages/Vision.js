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

export default function Vision() {
	return (
		<Box>
			<Navbar />

			{/* Contenido de la visión centrado */}
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
					Visión
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
					Nuestra Visión es ser reconocidos como innovadores en la integración
					de inteligencia artificial y análisis financiero para explorar
					tendencias en criptomonedas, proporcionando a usuarios e inversores
					herramientas experimentales que faciliten decisiones más informadas en
					el dinámico mercado de Bitcoin.
				</Text>

				<Text
					fontSize={{ base: 'md', md: 'lg' }}
					lineHeight='1.8'
					maxW='800px'>
					A través de nuestro prototipo, aspiramos a abrir nuevas oportunidades
					para el análisis financiero digital y contribuir al futuro del
					bitcoin, facilitando la integración de tecnologías emergentes en la
					toma de decisiones estratégicas.
				</Text>

				<Divider
					borderColor='gray.300'
					width='60%'
				/>

				{/* Imágenes */}
				<Flex
					justify='center'
					gap={8}
					mt={8}
					flexWrap='wrap'>
					{/* Primera Imagen */}
					<Image
						src='/images/vision 1.webp'
						alt='Imagen de visión 1'
						boxSize={{ base: '200px', md: '250px', lg: '300px' }}
						objectFit='cover'
						borderRadius='md'
						boxShadow='md'
						_hover={{ boxShadow: 'xl' }}
					/>

					{/* Segunda Imagen */}
					<Image
						src='/images/vision 2.webp'
						alt='Imagen de visión 2'
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
