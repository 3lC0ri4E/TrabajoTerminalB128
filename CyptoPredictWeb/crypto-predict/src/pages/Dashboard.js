/** @format */

import React, { useState, useEffect } from 'react';
import {
	Box,
	Wrap,
	WrapItem,
	Modal,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	useDisclosure,
	Text,
	Button,
} from '@chakra-ui/react';
import SideBar from './Sidebar.js';
import Bitcoinchart from './Bitcoinchart.js';
import { getUser } from '../supabase/supabase_functions';

export default function Dashboard() {
	const [user, setUser] = useState();

	const Overlay = () => (
		<Box
			position='absolute'

			top='0'
			left='0'
			right='0'
			bottom='0'
			bg='rgba(0, 0, 0, 0.5)'
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
				setUser(userData);
				if (userData.user_metadata.num_visita >= 4) {
					setOverlay(<Overlay />);
					onOpen(); // Abre el modal
				}
			}
		};
		fetchUser();
	}, [onOpen]); // onOpen como dependencia

	return (
		<Box
			display='flex'
			flexDirection={{ base: 'column', md: 'row' }}
			h='100vh'>
			<SideBar selectedInde={1} />
			{/* Aquí aplicamos el blur solo a este contenedor */}
			<Box
				flex={{ md: 1 }}
				h='100vh'
				alignContent='center'
				justifyItems='center'
				overflow='auto'
				position='relative'
			>
				{isOpen && overlay}
				<Wrap
					align='center'
					justify='center'
					spacing='3vw'>
					<WrapItem
						mt={{ base: 5, lg: 0 }}
						borderRadius='30px'
						bg='#3c3c3c'
						w={{ base: '85vw', md: '70vh', lg: '32vw' }}
						h={{ base: '30vh', sm: '50vh', md: '40vh' }}
						overflow='auto'
						flexDirection='column'
						justifyContent='space-between'
						alignContent='center'></WrapItem>

					<WrapItem
						borderRadius='30px'
						bg='#3c3c3c'
						w={{ base: '85vw', md: '70vh', lg: '32vw' }}
						h={{ base: '30vh', sm: '50vh', md: '40vh' }}
						overflow='auto'
						flexDirection='column'
						justifyContent='space-between'
						alignContent='center'
						p={3}>
						<Bitcoinchart />
					</WrapItem>

					<WrapItem
						borderRadius='30px'
						bg='#3c3c3c'
						w={{ base: '85vw', md: '70vh', lg: '32vw' }}
						h={{ base: '30vh', sm: '50vh', md: '40vh' }}
						overflow='auto'
						flexDirection='column'
						justifyContent='space-between'
						alignContent='center'></WrapItem>

					<WrapItem
						borderRadius='30px'
						bg='#3c3c3c'
						w={{ base: '85vw', md: '70vh', lg: '32vw' }}
						h={{ base: '30vh', sm: '50vh', md: '40vh' }}
						overflow='auto'
						flexDirection='column'
						justifyContent='space-between'
						alignContent='center'
						mb={{ base: 5, lg: 0 }}></WrapItem>
				</Wrap>
			</Box>

			<Modal
				isCentered
				isOpen={isOpen}
				onClose={onClose}
				size={'xl'}
				closeOnOverlayClick={false} // No cerrar el modal al hacer clic en el fondo
				isClosable={false} // Deshabilitar el botón de cierre
			>
				<ModalContent>
					<ModalHeader>Visitas Excedidas</ModalHeader>
					<ModalBody>
						<Text>Has excedido el número permitido de visitas.</Text>
					</ModalBody>
					<ModalFooter>
						<Button onClick={onClose}>Aceptar</Button>
						{/* Botón sin función para cerrar */}
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
}
