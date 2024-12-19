/** @format */

import React from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	Text,
	UnorderedList,
	ListItem,
} from '@chakra-ui/react';

const PricePredictionModal = ({ isOpen, onClose }) => {
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
				<ModalHeader>Predicción de Precios del Mercado</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Text>
						Este sistema de predicción de precios utiliza análisis de datos
						históricos del mercado para estimar tendencias futuras. Está
						diseñado como una herramienta de apoyo para ayudar a los usuarios a
						comprender mejor las dinámicas del mercado.
					</Text>
					<Text
						fontWeight='bold'
						my='1rem'>
						¿Cómo Funciona?
					</Text>
					<UnorderedList>
						<ListItem>
							<strong>Análisis de Datos:</strong> Se procesan datos históricos
							del mercado para identificar patrones relevantes.
						</ListItem>
						<ListItem>
							<strong>Estimación de Tendencias:</strong> Con base en los datos
							analizados, se generan estimaciones de movimientos potenciales del
							mercado.
						</ListItem>
						<ListItem>
							<strong>Proyecciones Basadas en Datos:</strong> Las predicciones
							reflejan los patrones identificados y las condiciones del mercado.
						</ListItem>
					</UnorderedList>
					<Text
						fontWeight='bold'
						my='1rem'>
						Aspectos Clave
					</Text>
					<UnorderedList>
						<ListItem>
							<strong>Análisis Predictivo:</strong> Se enfoca en identificar
							posibles cambios en las condiciones del mercado.
						</ListItem>
						<ListItem>
							<strong>Herramienta de Soporte:</strong> Proporciona una
							perspectiva adicional para apoyar la toma de decisiones.
						</ListItem>
						<ListItem>
							<strong>Datos Basados en Historias:</strong> Las predicciones se
							basan únicamente en tendencias históricas y no garantizan
							resultados futuros.
						</ListItem>
					</UnorderedList>
					<Text
						fontWeight='bold'
						my='1rem'>
						Consideraciones Importantes
					</Text>
					<Text>
						Este sistema no es un asesor financiero. Las decisiones de inversión
						deben tomarse con precaución, considerando la naturaleza volátil e
						impredecible del mercado. Se recomienda consultar con expertos antes
						de tomar decisiones importantes.
					</Text>
				</ModalBody>
				<ModalFooter>
					<Button
						colorScheme='blue'
						onClick={onClose}>
						Cerrar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default PricePredictionModal;
