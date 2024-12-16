/** @format */

import React from 'react';
import { Box, Stat, StatLabel, Text } from '@chakra-ui/react';

import ProbabilitySpeedometer from './Speedometer';

const TechnicalAnalysis = ({ lastTAnalysis, TAerror }) => {
	return (
		<Box
			m={'auto'}
			overflow={'auto'}>
			{/* Mostrar mensaje de error si existe */}
			{TAerror && <Text color='red.500'>{TAerror}</Text>}

			<Stat>
				<StatLabel fontSize={{ base: 20 }}>Análisis Técnico</StatLabel>

				{lastTAnalysis && lastTAnalysis.probability !== undefined ? (
					<ProbabilitySpeedometer
						probability={lastTAnalysis.probability}
						texts={{
							down: 'Bajista',
							middle: 'Lateral',
							up: 'Alcista',
							label: 'Tendencia del Mercado',
						}}
					/>
				) : (
					<Text>Cargando análisis técnico...</Text>
				)}
			</Stat>
		</Box>
	);
};

export default TechnicalAnalysis;
