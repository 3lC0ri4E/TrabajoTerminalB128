/** @format */

import React, { useState, useEffect, useRef} from 'react';
import {
	Box,
	Wrap,
	WrapItem,
	Modal,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	useDisclosure,
	Text,
	Button,
} from '@chakra-ui/react';
import SideBar from './Sidebar.js';
import Bitcoinchart from './Bitcoinchart.js';
import { getUser } from '../supabase/supabase_functions';
import RNNPrediction from './RNN.js';

export default function Dashboard() {

	const Overlay = () => (
		<Box
			position='absolute'

			top='0'
			left='0'
			right='0'
			bottom='0'
			bg='rgba(0, 0, 0, 0.7)'
			backdropFilter='blur(10px)'
			zIndex='1'
		/>
	);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [overlay, setOverlay] = useState(<Overlay />);

	useEffect(() => {
		const fetchUser = async () => {
			const userData = await getUser();
			if (userData) {
				if (userData.user_metadata.num_visita >= 4) {
					setOverlay(<Overlay />);
					onOpen(); // Abre el modal
				}
			}
		};
		fetchUser();
	}, [onOpen]); // 

	return (
		<Box
			display='flex'
			flexDirection={{ base: 'column', md: 'row' }}
			h='100vh'>
			<SideBar selectedInde={1} />
			{/* Aquí aplicamos el blur solo a este contenedor */}
			<Box
				flex={{ md: 1 }}
				h="100vh"
				alignContent="center"
				justifyItems="center"
				overflow="auto"
				position="relative"
			>
				{isOpen && overlay}

				<Wrap align="center" justify="center" spacing="3vw">
					<WrapItem
						mt={{ base: 5, lg: 0 }}
						borderRadius="30px"
						bg="#3c3c3c"
						w={{ base: '85vw', md: '70vh', lg: '32vw' }}
						h={{ base: '30vh', sm: '50vh', md: '40vh' }}
						overflow="auto"
						flexDirection="column"
						justifyContent="space-between"
						alignContent="center"
					>
						<RNNPrediction />
					</WrapItem>

					<WrapItem
						borderRadius="30px"
						bg="#3c3c3c"
						w={{ base: '85vw', md: '70vh', lg: '32vw' }}
						h={{ base: '30vh', sm: '50vh', md: '40vh' }}
						overflow="auto"
						flexDirection="column"
						justifyContent="space-between"
						alignContent="center"
						p={3}
					>
						<Bitcoinchart />
					</WrapItem>

					<WrapItem
						borderRadius="30px"
						bg="#3c3c3c"
						w={{ base: '85vw', md: '70vh', lg: '32vw' }}
						h={{ base: '30vh', sm: '50vh', md: '40vh' }}
						overflow="auto"
						flexDirection="column"
						justifyContent="space-between"
						alignContent="center"
					></WrapItem>

					<WrapItem
						borderRadius="30px"
						bg="#3c3c3c"
						w={{ base: '85vw', md: '70vh', lg: '32vw' }}
						h={{ base: '30vh', sm: '50vh', md: '40vh' }}
						overflow="auto"
						flexDirection="column"
						justifyContent="space-between"
						alignContent="center"
						mb={{ base: 5, lg: 0 }}
					></WrapItem>
				</Wrap>

				{/* Modal centrado dentro del contenedor */}
				<Modal
					isOpen={isOpen}
					onClose={onClose}
					isCentered
					size="lg"
					closeOnOverlayClick={false} 
					isClosable={true} 
					>
					<ModalContent
						mx="auto"
						position="absolute"
						// top="50%"
						// left="50%"
						transform="translate(-50%, -50%)"
						w={{ base: '90%', md: '70%', lg: '60%' }}
						>
						<ModalHeader textAlign="center">Visitas Excedidas</ModalHeader>
						<ModalBody>
						<Text textAlign="center">Has excedido el número permitido de visitas.</Text>
						</ModalBody>
						<ModalFooter justifyContent="center">
						<Button onClick={onClose} colorScheme="blue">
							Aceptar
						</Button>
						</ModalFooter>
					</ModalContent>
					</Modal>
			</Box>

		</Box>
	);
}
