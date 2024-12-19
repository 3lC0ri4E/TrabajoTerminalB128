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

const FAHelp = ({ isOpen, onClose }) => {
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
					Interpretación Resultados del Análisis Fundamental
				</ModalHeader>
				<ModalBody>
					<Text>
						Este gráfico ilustra un análisis de sentimiento del mercado basado
						en noticias recopiladas durante el día. La aguja indica el
						sentimiento predominante, clasificado como positivo, negativo o
						neutral, y proporciona una visión general sobre las percepciones del
						mercado respecto a Bitcoin.
					</Text>

					<Text
						fontWeight='bold'
						my='1rem'>
						1. Sentimiento Positivo
					</Text>
					<UnorderedList>
						<ListItem>
							<strong>Descripción:</strong> Si la aguja apunta hacia la región
							verde, sugiere un sentimiento mayoritariamente positivo.
						</ListItem>
						<ListItem>
							<strong>Causas comunes:</strong>
							<UnorderedList pl='1.5rem'>
								<ListItem>
									Noticias sobre adopción o interés institucional.
								</ListItem>
								<ListItem>
									Avances tecnológicos o mejoras relacionadas con el activo.
								</ListItem>
								<ListItem>
									Contextos económicos favorables que incrementan la confianza
									en el mercado.
								</ListItem>
							</UnorderedList>
						</ListItem>
						<ListItem>
							<strong>Implicación:</strong> Un sentimiento positivo puede
							indicar optimismo en el mercado y podría estar correlacionado con
							una tendencia alcista.
						</ListItem>
					</UnorderedList>

					<Text
						fontWeight='bold'
						my='1rem'>
						2. Sentimiento Negativo
					</Text>
					<UnorderedList>
						<ListItem>
							<strong>Descripción:</strong> Si la aguja apunta hacia la región
							roja, sugiere que las noticias del día reflejan un sentimiento
							mayoritariamente negativo.
						</ListItem>
						<ListItem>
							<strong>Causas comunes:</strong>
							<UnorderedList pl='1.5rem'>
								<ListItem>
									Noticias relacionadas con cambios regulatorios desfavorables.
								</ListItem>
								<ListItem>
									Eventos macroeconómicos adversos (como recesiones o alta
									inflación).
								</ListItem>
								<ListItem>
									Informes sobre caídas de precios o disminución en la confianza
									en el activo.
								</ListItem>
							</UnorderedList>
						</ListItem>
						<ListItem>
							<strong>Implicación:</strong> Esto puede reflejar un mercado con
							alta incertidumbre o pesimismo, lo que podría estar asociado con
							una presión bajista en los precios.
						</ListItem>
					</UnorderedList>
					<Text
						fontWeight='bold'
						my='1rem'>
						3. Zona Neutral
					</Text>
					<UnorderedList>
						<ListItem>
							<strong>Descripción:</strong> Si la aguja se encuentra cerca del
							centro, refleja un equilibrio entre noticias positivas y
							negativas.
						</ListItem>
						<ListItem>
							<strong>Causas comunes:</strong>
							<UnorderedList pl='1.5rem'>
								<ListItem>
									Ausencia de eventos significativos o noticias contradictorias.
								</ListItem>
							</UnorderedList>
						</ListItem>
						<ListItem>
							<strong>Implicación:</strong> En este caso, no se puede determinar
							una tendencia clara únicamente a partir del sentimiento.
						</ListItem>
					</UnorderedList>
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

export default FAHelp;
