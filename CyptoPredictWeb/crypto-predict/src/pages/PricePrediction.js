/** @format */

import React, { useState, useEffect } from 'react';
import {
	Box,
	Text,
	VStack,
	Stat,
	StatLabel,
	StatNumber,
	StatHelpText,
	StatArrow,
} from '@chakra-ui/react';

const PricePrediction = ({ lastTAnalysis, TAerror }) => {
	return (
		<Box
			m={'auto'}
			overflow={'auto'}>
			{/* Mostrar mensaje de TAerror si existe */}
			{TAerror && <Text color='red.500'>{TAerror}</Text>}

			{/* Renderizar el análisis solo si existe */}
			{lastTAnalysis && (
				<Stat>
					<StatLabel fontSize={{ base: 25 }}>Predicción de Precio</StatLabel>
					<StatNumber fontSize={{ base: 30 }}>
						$
						{lastTAnalysis.predictedPrice
							? lastTAnalysis.predictedPrice.toLocaleString('en-US', {
									minimumFractionDigits: 2,
									maximumFractionDigits: 2,
								})
							: 'N/A'}
					</StatNumber>
					<StatHelpText>
						{lastTAnalysis.predictedPrice !== undefined &&
						lastTAnalysis.realPrice !== undefined ? (
							<>
								<StatArrow
									type={
										lastTAnalysis.predictedPrice > lastTAnalysis.realPrice
											? 'increase'
											: 'decrease'
									}
								/>
								<Text
									as='span'
									fontSize={{ base: 20 }}
									fontWeight='bold'>
									$
									{Math.abs(
										lastTAnalysis.predictedPrice - lastTAnalysis.realPrice
									).toLocaleString('en-US', {
										minimumFractionDigits: 2,
										maximumFractionDigits: 2,
									})}
									*
								</Text>
								<VStack
									spacing={1}
									align='center'>
									<Text
										mx={2}
										as='span'
										fontSize={{ base: 12 }}>
										*Comparado con el último precio registrado de ${' '}
										{lastTAnalysis.realPrice.toLocaleString('en-US', {
											minimumFractionDigits: 2,
											maximumFractionDigits: 2,
										})}
									</Text>
								</VStack>
							</>
						) : (
							<Text>
								No hay suficiente información para calcular la diferencia.
							</Text>
						)}
					</StatHelpText>
				</Stat>
			)}
		</Box>
	);
};

export default PricePrediction;
