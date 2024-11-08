/** @format */

import React from 'react';
import Navbar from './Navbar';
import { Box, Text, Heading, Flex, Image, Stack, Divider } from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Variantes de animación con Framer Motion
const MotionBox = motion(Box);
const MotionImage = motion(Image);

export default function QuienesSomos() {
	return (
		<Box py={10}>
			<Navbar />

			{/* Contenido centrado */}
			<Stack spacing={8} align="center" textAlign="center" maxW="900px" mx="auto">
				{/* Título con animación */}
				<MotionBox
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<Heading as="h2" size="xl" fontWeight="semibold" mb={4}>
						¿Quiénes Somos?
					</Heading>
				</MotionBox>

				<Divider borderColor="gray.300" width="60%" />

				{/* Descripción con animación */}
				<MotionBox
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<Text fontSize="lg" lineHeight="1.8" maxW="800px" mb={4}>
						Somos un equipo de tres estudiantes de octavo semestre de Ingeniería en Sistemas Computacionales en la
						Escuela Superior de Cómputo (ESCOM) del Instituto Politécnico Nacional (IPN). Apasionados por la inteligencia
						artificial y los mercados financieros, desarrollamos soluciones innovadoras que aporten valor al análisis de criptomonedas.
					</Text>

					<Text fontSize="lg" lineHeight="1.8" maxW="800px">
						Con el respaldo de nuestra formación académica y la pasión por la tecnología, transformamos la manera en que las personas interactúan
						con el mundo financiero digital. Este prototipo refleja nuestro compromiso con la innovación y la excelencia en el desarrollo de software.
					</Text>
				</MotionBox>

				<Divider borderColor="gray.300" width="60%" />

				{/* Imágenes con Nombres y Animaciones */}
				<Flex justify="center" gap={12} mt={8} wrap="wrap">
					{/* Primera Imagen con Animación */}
					<Stack align="center" spacing={4}>
						<MotionImage
							src="imgasael"
							alt="Asael García Islas"
							boxSize="160px"
							objectFit="cover"
							borderRadius="full"
							boxShadow="md"
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.3 }}
							_hover={{ boxShadow: 'xl' }}
						/>
						<Text fontSize="lg" fontWeight="medium" textAlign="center">
							Ing. Asael García Islas
						</Text>
					</Stack>

					{/* Segunda Imagen con Animación */}
					<Stack align="center" spacing={4}>
						<MotionImage
							src="imgcoria"
							alt="Alexis Germán López Coria"
							boxSize="160px"
							objectFit="cover"
							borderRadius="full"
							boxShadow="md"
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.3 }}
							_hover={{ boxShadow: 'xl' }}
						/>
						<Text fontSize="lg" fontWeight="medium" textAlign="center">
							Ing. Alexis Germán López Coria
						</Text>
					</Stack>

					{/* Tercera Imagen con Animación */}
					<Stack align="center" spacing={4}>
						<MotionImage
							src="imgjuan"
							alt="Juan Carlos Martínez Paniagua"
							boxSize="160px"
							objectFit="cover"
							borderRadius="full"
							boxShadow="md"
							whileHover={{ scale: 1.05 }}
							transition={{ duration: 0.3 }}
							_hover={{ boxShadow: 'xl' }}
						/>
						<Text fontSize="lg" fontWeight="medium" textAlign="center">
							Ing. Juan Carlos Martínez Paniagua
						</Text>
					</Stack>
				</Flex>
			</Stack>
		</Box>
	);
}
