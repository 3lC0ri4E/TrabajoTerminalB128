/** @format */
import { Box, Stat, StatLabel } from '@chakra-ui/react';
import ProbabilitySpeedometer from './Speedometer';

const FundamentalAnalysis = ({ FAprobability }) => {
	return (
		<Box
			m={'auto'}
			overflow={'auto'}>
			<Stat>
				<StatLabel fontSize={{ base: 20 }}>Análisis Fundamental</StatLabel>
				<ProbabilitySpeedometer
					probability={FAprobability}
					texts={{
						down: 'Negativo',
						middle: 'Neutral',
						up: 'Positivo',
						label: 'Sentimiento del Mercado',
					}}
				/>
			</Stat>
		</Box>
	);
};

export default FundamentalAnalysis;
