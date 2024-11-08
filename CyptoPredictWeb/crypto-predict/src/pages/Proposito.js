/** @format */

import React from 'react';
import Navbar from './Navbar';
import { Box, Text, Heading, Flex, Image, Stack, Divider } from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Variantes de animación con Framer Motion
const MotionBox = motion(Box);
const MotionImage = motion(Image);

export default function Proposito() {
	return (
		<Box>
			<Navbar />

			{/* Contenido centrado */}
			<Stack spacing={8} align="center" textAlign="center" maxW="900px" mx="auto" p={8}>
				{/* Título centrado con animación */}
				<MotionBox
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<Heading as="h2" size="xl" fontWeight="semibold" mb={4}>
						Propósito
					</Heading>
				</MotionBox>

				<Divider borderColor="gray.300" width="60%" />

				{/* Texto descriptivo con animación */}
				<MotionBox
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<Text fontSize="lg" lineHeight="1.8" maxW="800px" mb={4}>
						Nuestro propósito es contribuir al avance del análisis financiero y tecnológico mediante
						la exploración de cómo la inteligencia artificial puede mejorar la precisión en la predicción
						de tendencias del precio de Bitcoin, facilitando así decisiones más informadas y estratégicas
						en el mercado de criptomonedas.
					</Text>
				</MotionBox>

				<Divider borderColor="gray.300" width="60%" />

				{/* Imágenes con animación */}
				<Flex justify="center" gap={8} mt={8}>
					{/* Primera Imagen */}
					<MotionImage
						src="/images/proposito1.webp"
						alt="Imagen de propósito 1"
						boxSize="300px"
						objectFit="cover"
						borderRadius="md"
						boxShadow="md"
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.3 }}
						_hover={{ boxShadow: 'xl' }}
					/>

					{/* Segunda Imagen */}
					<MotionImage
						src="/images/proposito2.webp"
						alt="Imagen de propósito 2"
						boxSize="300px"
						objectFit="cover"
						borderRadius="md"
						boxShadow="md"
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.3 }}
						_hover={{ boxShadow: 'xl' }}
					/>
				</Flex>
			</Stack>
		</Box>
	);
}
