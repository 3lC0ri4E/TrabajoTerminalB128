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

const PriceHelp = ({ isOpen, onClose, data }) => {
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
				<ModalHeader>Interpretación de la Predicción de Precio</ModalHeader>
				<ModalBody>
					<Text>
						El gráfico presenta la predicción del precio de Bitcoin al día{' '}
						{data && data.created_at ? data.created_at : 'de hoy'}. Aquí se
						detallan los elementos clave:
					</Text>

					<Text
						fontWeight='bold'
						my='1rem'>
						1. Predicción del Precio
					</Text>
					<UnorderedList>
						<ListItem>
							<strong>Valor proyectado:</strong>{' '}
							{data && data.predictedPrice !== undefined
								? `El modelo predice un precio de $${data.predictedPrice.toLocaleString(
										'en-US',
										{
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										}
									)} para la fecha especificada.`
								: 'Información no disponible.'}
						</ListItem>

						<ListItem>
							<strong>Origen de la predicción:</strong> Este valor es el
							resultado del análisis de patrones históricos en los datos de
							precios y tendencias del mercado.
						</ListItem>
					</UnorderedList>

					<Text
						fontWeight='bold'
						my='1rem'>
						2. Cambio en el Precio
					</Text>
					<UnorderedList>
						<ListItem>
							<strong>Incremento proyectado:</strong>{' '}
							{data &&
							data.predictedPrice !== undefined &&
							data.realPrice !== undefined &&
							data.realPrice !== undefined ? (
								<>
									El precio se espera que{' '}
									{data.predictedPrice > data.realPrice ? 'suba' : 'baje'} en $
									{Math.abs(
										data.predictedPrice - data.realPrice
									).toLocaleString('en-US', {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}{' '}
									respecto al último precio registrado de $
									{data.realPrice.toLocaleString('en-US', {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
									.
								</>
							) : (
								'Información no disponible.'
							)}
						</ListItem>

						<ListItem>
							<strong>Indicador de tendencia:</strong>{' '}
							{data &&
							data.predictedPrice !== undefined &&
							data.realPrice !== undefined ? (
								data.predictedPrice > data.realPrice ? (
									<>
										El símbolo de la flecha verde (↑) indica una proyección
										alcista del mercado, es decir, una expectativa de
										crecimiento en el valor del activo.
									</>
								) : (
									<>
										El símbolo de la flecha roja (↓) indica una proyección
										bajista del mercado, es decir, una expectativa de
										disminución en el valor del activo.
									</>
								)
							) : (
								'Información no disponible.'
							)}
						</ListItem>
					</UnorderedList>

					<Text
						fontWeight='bold'
						my='1rem'>
						3. Implicaciones
					</Text>
					<UnorderedList>
						{data &&
						data.predictedPrice !== undefined &&
						data.realPrice !== undefined ? (
							data.predictedPrice > data.realPrice ? (
								<>
									<ListItem>
										<strong>Tendencia positiva:</strong> Esta predicción sugiere
										que el mercado podría estar en una fase de recuperación o
										crecimiento.
									</ListItem>
									<ListItem>
										<strong>Oportunidad de inversión:</strong> Los usuarios
										pueden considerar esto como un indicador para evaluar
										estrategias de compra o mantenimiento, dependiendo de su
										perfil de riesgo.
									</ListItem>
								</>
							) : (
								<>
									<ListItem>
										<strong>Tendencia negativa:</strong> Esta predicción sugiere
										que el mercado podría estar en una fase de corrección o
										caída.
									</ListItem>
									<ListItem>
										<strong>Advertencia para inversionistas:</strong> Los
										usuarios pueden considerar esto como un indicador para
										evaluar estrategias de venta o cobertura, dependiendo de su
										perfil de riesgo.
									</ListItem>
								</>
							)
						) : (
							<ListItem>
								Información no disponible para evaluar las implicaciones.
							</ListItem>
						)}
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

export default PriceHelp;
