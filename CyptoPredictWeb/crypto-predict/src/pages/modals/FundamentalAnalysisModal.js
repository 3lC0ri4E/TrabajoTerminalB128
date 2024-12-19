/** @format */

import React from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Button,
	Text,
	UnorderedList,
	ListItem,
} from '@chakra-ui/react';

const FundamentalAnalysisModal = ({ isOpen, onClose }) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered
			size='lg'
			motionPreset='slideInBottom'
			scrollBehavior='inside'>
			<ModalContent
				mx='auto'
				position='absolute'
				transform='translate(-50%, -50%)'>
				<ModalHeader>
					Análisis de Sentimientos del Mercado de Bitcoin
				</ModalHeader>
				<ModalBody>
					<Text>
						Nuestro sistema utiliza inteligencia artificial avanzada para
						analizar el sentimiento de noticias relacionadas con Bitcoin (BTC).
						Este análisis proporciona a los usuarios una visión más clara de
						cómo las noticias pueden influir en el mercado, ayudando a tomar
						decisiones más informadas.
					</Text>

					<Text
						fontWeight='bold'
						my='1rem'>
						¿Cómo Funciona?
					</Text>
					<UnorderedList>
						<ListItem>
							<strong>Recolección de Noticias:</strong> Utilizamos tecnología de
							web scraping para recopilar noticias relevantes de fuentes
							confiables en tiempo real.
						</ListItem>
						<ListItem>
							<strong>Clasificación de Sentimientos:</strong> El sistema evalúa
							cada noticia y la clasifica como:
							<UnorderedList pl='1.5rem'>
								<ListItem>
									<strong>Positiva:</strong> Noticias que podrían favorecer el
									mercado.
								</ListItem>
								<ListItem>
									<strong>Negativa:</strong> Noticias que podrían indicar
									riesgos o caídas en el mercado.
								</ListItem>
							</UnorderedList>
						</ListItem>
						<ListItem>
							<strong>Actualización Continua:</strong> Las noticias se analizan
							constantemente para ofrecer información actualizada y precisa.
						</ListItem>
					</UnorderedList>

					<Text
						fontWeight='bold'
						my='1rem'>
						Resultados del Modelo
					</Text>
					<UnorderedList>
						<ListItem>
							<strong>Precisión General:</strong> 97%
						</ListItem>
						<ListItem>
							<strong>Clasificación de Noticias Positivas:</strong> 99% de
							acierto.
						</ListItem>
						<ListItem>
							<strong>Clasificación de Noticias Negativas:</strong> 84% de
							acierto.
						</ListItem>
						<ListItem>
							<strong>Promedio General:</strong>
							<UnorderedList pl='1.5rem'>
								<ListItem>
									<strong>Accuracy:</strong> 99.51%
								</ListItem>
								<ListItem>
									<strong>Precisión:</strong> 99.72%
								</ListItem>
								<ListItem>
									<strong>Recall:</strong> 98.21%
								</ListItem>
								<ListItem>
									<strong>F1-Score:</strong> 98.95%
								</ListItem>
							</UnorderedList>
						</ListItem>
					</UnorderedList>

					<Text
						fontWeight='bold'
						my='1rem'>
						Ventajas del Sistema
					</Text>
					<UnorderedList>
						<ListItem>
							<strong>Actualización Automática:</strong> Aseguramos que siempre
							tengas la información más reciente y relevante.
						</ListItem>
						<ListItem>
							<strong>Modelo Especializado:</strong> Diseñado específicamente
							para el análisis del mercado de Bitcoin.
						</ListItem>
						<ListItem>
							<strong>Toma de Decisiones Informada:</strong> Ayuda a los
							usuarios a comprender cómo las noticias pueden influir en las
							tendencias del mercado.
						</ListItem>
					</UnorderedList>

					<Text
						fontWeight='bold'
						my='1rem'>
						Nota de Transparencia
					</Text>
					<Text>
						El análisis de sentimientos es una herramienta de apoyo y no debe
						ser utilizado como un consejo financiero. Todas las decisiones de
						inversión deben tomarse considerando múltiples factores y riesgos.
					</Text>
				</ModalBody>
				<ModalFooter justifyContent='center'>
					<Button
						onClick={onClose}
						colorScheme='blue'>
						Cerrar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default FundamentalAnalysisModal;
