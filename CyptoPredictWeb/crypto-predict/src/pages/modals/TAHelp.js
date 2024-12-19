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

const TAHelp = ({ isOpen, onClose }) => {
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
					Interpretación de Resultados del Análisis Técnico
				</ModalHeader>
				<ModalBody>
					<Text>
						El análisis técnico presentado permite identificar tendencias
						generales del mercado, ofreciendo tres posibles escenarios basados
						en patrones y métricas técnicas.
					</Text>

					<Text
						fontWeight='bold'
						my='1rem'>
						Tendencia Alcista
					</Text>
					<UnorderedList>
						<ListItem>
							<strong>Descripción:</strong> Cuando el indicador apunta hacia la
							región verde, sugiere un comportamiento positivo del mercado,
							asociado a posibles aumentos de precios.
						</ListItem>
						<ListItem>
							<strong>Factores asociados:</strong> Incremento en la actividad
							compradora y patrones históricos de alza.
						</ListItem>
					</UnorderedList>

					<Text
						fontWeight='bold'
						my='1rem'>
						Tendencia Bajista
					</Text>
					<UnorderedList>
						<ListItem>
							<strong>Descripción:</strong> Si el indicador apunta hacia la
							región roja, esto señala una tendencia negativa, con posibles
							disminuciones en los precios.
						</ListItem>
						<ListItem>
							<strong>Factores asociados:</strong> Incremento en la actividad
							vendedora y patrones históricos de caída.
						</ListItem>
					</UnorderedList>

					<Text
						fontWeight='bold'
						my='1rem'>
						Zona Neutral
					</Text>
					<UnorderedList>
						<ListItem>
							<strong>Descripción:</strong> Una posición en el centro del
							indicador sugiere falta de dirección clara en el mercado,
							indicando estabilidad o incertidumbre.
						</ListItem>
						<ListItem>
							<strong>Factores asociados:</strong> Fluctuaciones leves y
							reacción a factores externos.
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

export default TAHelp;
