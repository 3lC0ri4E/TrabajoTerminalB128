/** @format */

import React from 'react';
import Navbar from './Navbar';
import { Box, Text, Heading, Stack, Flex, Image, Divider } from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Variantes de animación con Framer Motion
const MotionBox = motion(Box);

export default function Mision() {
	return (
		<Box>
			<Navbar />

			{/* Contenido de la misión centrado */}
			<Stack spacing={8} align="center" textAlign="center" maxW="900px" mx="auto" p={8}>
				{/* Título centrado */}
				<MotionBox
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<Heading as="h2" size="xl" fontWeight="semibold" mb={4}>
						Misión
					</Heading>
				</MotionBox>

				<Divider borderColor="gray.300" width="60%" />

				{/* Texto descriptivo */}
				<MotionBox
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<Text fontSize="lg" lineHeight="1.8" maxW="800px" mb={4}>
						Nuestra misión es desarrollar un prototipo de herramienta que integre inteligencia
						artificial y análisis de mercado para investigar la capacidad de predecir tendencias
						en el comportamiento de Bitcoin, fomentando decisiones de inversión más informadas y
						explorando formas de reducir la incertidumbre en el mercado de criptomonedas.
					</Text>

					<Text fontSize="lg" lineHeight="1.8" maxW="800px">
						Buscamos impulsar la adopción de tecnologías emergentes para permitir a nuestros
						usuarios aprovechar las oportunidades del mercado de manera estratégica y fundamentada.
					</Text>
				</MotionBox>

				<Divider borderColor="gray.300" width="60%" />

				{/* Imágenes con animación */}
				<Flex justify="center" gap={8} mt={8}>
					{/* Primera Imagen con animación */}
					<MotionBox
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.3 }}
					>
						<Image
							src="/images/mision 1.webp"
							alt="Imagen de misión 1"
							boxSize="300px"
							objectFit="cover"
							borderRadius="md"
							boxShadow="md"
							_hover={{ boxShadow: 'xl' }}
						/>
					</MotionBox>

					{/* Segunda Imagen con animación */}
					<MotionBox
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.3 }}
					>
						<Image
							src="/images/mision 2.webp"
							alt="Imagen de misión 2"
							boxSize="300px"
							objectFit="cover"
							borderRadius="md"
							boxShadow="md"
							_hover={{ boxShadow: 'xl' }}
						/>
					</MotionBox>
				</Flex>
			</Stack>
		</Box>
	);
}
