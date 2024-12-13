/** @format */

import React, { useState } from 'react';
import {
	Box,
	Slider,
	SliderTrack,
	SliderFilledTrack,
	SliderThumb,
	SliderMark,
} from '@chakra-ui/react';

const ProbabilitySlider = ({ probabilities }) => {
	const [sliderValue, setSliderValue] = useState(0);

	const labelStyles = {
		mt: '2',
		ml: '-2.5',
		fontSize: 'sm',
	};

	// Adjust slider value dynamically based on probabilities
	React.useEffect(() => {
		if (probabilities) {
			setSliderValue(parseFloat(probabilities.downwardProbability)); // Set initial value to upward probability
		}
	}, [probabilities]);

	return (
		<Box w={'27vw'}>
			<Slider
				isDisabled
				aria-label='probability-slider'
				value={sliderValue}
				onChange={(val) => setSliderValue(val)} // Update slider value on change
				min={0}
				colorScheme='yellow'
				max={100}>
				<SliderMark
					value={0}
					{...labelStyles}>
					0%
				</SliderMark>
				<SliderMark
					value={50}
					{...labelStyles}>
					50%
				</SliderMark>
				<SliderMark
					value={100}
					{...labelStyles}>
					100%
				</SliderMark>
				<SliderMark
					value={sliderValue}
					textAlign='center'
					color='white'
					mt='-10'
					ml='-10'
					w='20'>
					{sliderValue.toFixed(2)}%
				</SliderMark>
				<SliderTrack>
					<SliderFilledTrack />
				</SliderTrack>
				<SliderThumb />
			</Slider>
		</Box>
	);
};

export default ProbabilitySlider;
