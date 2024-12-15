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

export default function QuienesSomos() {
	return (
		<Box py={10}>
			<Navbar />

			{/* Contenido centrado */}
			<Stack
				spacing={8}
				align='center'
				textAlign='center'
				maxW={{ base: '90%', md: '700px', lg: '900px' }}
				mx='auto'
				p={{ base: 4, md: 8 }}>
				{/* Título */}
				<Heading
					as='h2'
					size={{ base: 'lg', md: 'xl' }}
					fontWeight='semibold'
					mb={4}>
					Nosotros
				</Heading>

				<Divider
					borderColor='gray.300'
					width='60%'
				/>

				{/* Descripción */}
				<Text
					fontSize={{ base: 'md', md: 'lg' }}
					lineHeight='1.8'
					maxW='800px'
					mb={4}>
					Somos un equipo de tres estudiantes de octavo semestre de Ingeniería
					en Sistemas Computacionales en la Escuela Superior de Cómputo (ESCOM)
					del Instituto Politécnico Nacional (IPN). Apasionados por la
					inteligencia artificial y los mercados financieros, desarrollamos
					soluciones innovadoras que aporten valor al análisis de criptomonedas.
				</Text>

				<Text
					fontSize={{ base: 'md', md: 'lg' }}
					lineHeight='1.8'
					maxW='800px'>
					Con el respaldo de nuestra formación académica y la pasión por la
					tecnología, transformamos la manera en que las personas interactúan
					con el mundo financiero digital. Este prototipo refleja nuestro
					compromiso con la innovación y la excelencia en el desarrollo de
					software.
				</Text>

				<Divider
					borderColor='gray.300'
					width='60%'
				/>

				{/* Imágenes con Nombres */}
				<Flex
					justify='center'
					gap={{ base: 6, md: 12 }}
					mt={8}
					wrap='wrap'>
					{/* Primera Imagen */}
					<Stack
						align='center'
						spacing={4}>
						<Image
							src='./images/Asael.jpg'
							alt='Asael García Islas'
							boxSize={{ base: '120px', md: '160px' }}
							objectFit='cover'
							borderRadius='full'
							boxShadow='md'
							_hover={{ boxShadow: 'xl' }}
						/>
						<Text
							fontSize={{ base: 'sm', md: 'lg' }}
							fontWeight='medium'
							textAlign='center'>
							Ing. Asael García Islas
						</Text>
					</Stack>

					{/* Segunda Imagen */}
					<Stack
						align='center'
						spacing={4}>
						<Image
							src='./images/Coria.jpg'
							alt='Alexis Germán López Coria'
							boxSize={{ base: '120px', md: '160px' }}
							objectFit='cover'
							borderRadius='full'
							boxShadow='md'
							_hover={{ boxShadow: 'xl' }}
						/>
						<Text
							fontSize={{ base: 'sm', md: 'lg' }}
							fontWeight='medium'
							textAlign='center'>
							Ing. Alexis Germán López Coria
						</Text>
					</Stack>

					{/* Tercera Imagen */}
					<Stack
						align='center'
						spacing={4}>
						<Image
							src='./images/Juan.jpg'
							alt='Juan Carlos Martínez Paniagua'
							boxSize={{ base: '120px', md: '160px' }}
							objectFit='cover'
							borderRadius='full'
							boxShadow='md'
							_hover={{ boxShadow: 'xl' }}
						/>
						<Text
							fontSize={{ base: 'sm', md: 'lg' }}
							fontWeight='medium'
							textAlign='center'>
							Ing. Juan Carlos Martínez Paniagua
						</Text>
					</Stack>
				</Flex>
			</Stack>
		</Box>
	);
}
