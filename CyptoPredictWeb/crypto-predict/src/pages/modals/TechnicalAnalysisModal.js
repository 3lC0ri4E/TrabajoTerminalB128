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

const TechnicalAnalysisModal = ({ isOpen, onClose }) => {
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered
			size='lg'
			scrollBehavior='inside'
			motionPreset='slideInBottom'>
			<ModalContent
				mx='auto'
				position='absolute'
				transform='translate(-50%, -50%)'>
				<ModalHeader>Análisis Técnico con Inteligencia Artificial</ModalHeader>
				<ModalBody>
					<Text>
						Nuestro sistema utiliza algoritmos avanzados de inteligencia
						artificial para analizar datos históricos del mercado de
						criptomonedas y predecir tendencias futuras. Este modelo está
						diseñado para ayudar a los usuarios a tomar decisiones más
						informadas y estratégicas en sus inversiones.
					</Text>

					<Text
						fontWeight='bold'
						my='1rem'>
						¿Cómo Funciona?
					</Text>
					<UnorderedList>
						<ListItem>
							<strong>Análisis de Patrones:</strong> El modelo examina datos
							históricos del mercado y detecta patrones de comportamiento en los
							precios de las criptomonedas.
						</ListItem>
						<ListItem>
							<strong>Redes Neuronales Especializadas:</strong> Utiliza redes
							avanzadas diseñadas para procesar secuencias de datos y extraer
							información clave para predecir tendencias futuras.
						</ListItem>
						<ListItem>
							<strong>Predicciones Basadas en Datos:</strong> Las predicciones
							se generan a partir de patrones identificados, permitiendo
							anticipar movimientos del mercado.
						</ListItem>
					</UnorderedList>

					<Text
						fontWeight='bold'
						my='1rem'>
						Aspectos Clave
					</Text>
					<UnorderedList>
						<ListItem>
							<strong>Análisis Técnico Avanzado:</strong> Basado en datos
							históricos del mercado para identificar oportunidades y riesgos.
						</ListItem>
						<ListItem>
							<strong>Predicciones Precisas:</strong> Basadas en patrones de
							comportamiento pasado y modelos avanzados.
						</ListItem>
						<ListItem>
							<strong>Herramienta de Apoyo:</strong> Diseñada para mejorar la
							toma de decisiones, aunque no garantiza resultados debido a la
							volatilidad inherente del mercado.
						</ListItem>
					</UnorderedList>

					<Text
						fontWeight='bold'
						my='1rem'>
						Resultados del Modelo
					</Text>
					<UnorderedList>
						<ListItem>
							<strong>Precisión General (Accuracy):</strong> 71.2%
						</ListItem>
						<ListItem>
							<strong>Precisión (Precision):</strong> 74.1%
						</ListItem>
						<ListItem>
							<strong>Exhaustividad (Recall):</strong> 71.0%
						</ListItem>
						<ListItem>
							<strong>Puntaje F1 (F1-Score):</strong> 72.5%
						</ListItem>
					</UnorderedList>

					<Text
						fontWeight='bold'
						my='1rem'>
						Nota de Transparencia
					</Text>
					<Text>
						Este sistema es una herramienta de apoyo y no debe considerarse un
						asesor financiero. Todas las decisiones de inversión deben ser
						evaluadas cuidadosamente, teniendo en cuenta los riesgos inherentes
						al mercado de criptomonedas.
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

export default TechnicalAnalysisModal;
