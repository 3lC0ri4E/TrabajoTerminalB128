/** @format */

import React from 'react';
import Navbar from './Navbar';
import { Box, Text, Heading, Stack, Flex, Image, Divider } from '@chakra-ui/react';
import { motion } from 'framer-motion';

// Variantes de animación con Framer Motion
const MotionBox = motion(Box);

export default function Vision() {
	return (
		<Box>
			<Navbar />

			{/* Contenido de la visión centrado */}
			<Stack spacing={8} align="center" textAlign="center" maxW="900px" mx="auto" p={8}>
				{/* Título centrado */}
				<MotionBox
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
				>
					<Heading as="h2" size="xl" fontWeight="semibold" mb={4}>
						Visión
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
						Nuestra Visión es ser reconocidos como innovadores en la integración de inteligencia
						artificial y análisis financiero para explorar tendencias en criptomonedas, proporcionando
						a usuarios e inversores herramientas experimentales que faciliten decisiones más informadas
						en el dinámico mercado de Bitcoin.
					</Text>

					<Text fontSize="lg" lineHeight="1.8" maxW="800px">
						A través de nuestro prototipo, aspiramos a abrir nuevas oportunidades para el análisis
						financiero digital y contribuir al futuro del bitcoin, facilitando la integración de
						tecnologías emergentes en la toma de decisiones estratégicas.
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
							src="/images/vision 1.webp"
							alt="Imagen de visión 1"
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
							src="/images/vision 2.webp"
							alt="Imagen de visión 2"
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
