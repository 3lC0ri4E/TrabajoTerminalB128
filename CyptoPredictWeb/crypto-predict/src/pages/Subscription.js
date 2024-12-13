/** @format */

import { Text, Box, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

export default function Subscription() {
	const navigate = useNavigate();
	return (
		<Box
			display={'flex'}
			flexDirection={{ base: 'column', md: 'row' }}
			h='100vh'>
			<Box
				display={{ md: 'flex' }}
				borderRadius='30px'
				h='85vh'
				w='85%'
				p={4}
				justifyContent='space-between'
				alignItems='center'
				alignContent='center'
				m='auto'
				bg='#3d3d3d'
				overflow='auto'>
				<Box
					flexShrink={0}
					flex='1'
					textAlign='center'
					justifyContent='center'
					m='auto'
					p={[5]}>
					<Image
						src='/images/Logo.jpg'
						alt='CryptoPredict Logo'
						borderRadius='20px'
						boxSize='25%'
						display='block'
						m='auto'
						onClick={() => navigate('/')}
					/>
					<Text
						fontWeight={450}
						fontSize={{ base: 25, md: 30, xl: 40 }}
						m={[3, 3, 4, 5]}>
						Suscribete a CryptoPredict
					</Text>
				</Box>
			</Box>
		</Box>
	);
}
