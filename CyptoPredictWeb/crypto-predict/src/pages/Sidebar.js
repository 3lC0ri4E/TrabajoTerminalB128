/** @format */

import React, { useState } from 'react';
import {
	Box,
	Image,
	Button,
	Flex,
	HStack,
	useDisclosure,
	Link,
	Text,
	useToast,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../supabase/supabase_functions';

const menuItems = [
	{ name: 'Inicio', link: '/', icon: '/icons/home.png' },
	{ name: 'Dashboard', link: '/dashboard', icon: '/icons/dashboard.png' },
	{ name: 'Noticias', link: '/noticias', icon: '/icons/news.png' },
	{ name: 'Ajustes', link: '/ajustes', icon: '/icons/settings.png' },
];

const SideBar = (selectedInde) => {
	const [selectedIndex, setSelectedIndex] = useState(
		Object.values(selectedInde)[0]
	);
	const {
		isOpen: isDialogOpen,
		onOpen: onDialogOpen,
		onClose: onDialogClose,
	} = useDisclosure();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const navigate = useNavigate();
	const toast = useToast();
	const [user, setUser] = useState(null); // Guarda el usuario autenticado
	const cancelRef = React.useRef();

	const handleSignOut = async () => {
		const toastId = toast({
			title: 'Cerrando Sesión',
			description: 'Por favor, espera...',
			status: 'info',
			duration: null,
			isClosable: true,
			position: 'top',
		});

		try {
			await signOut();

			toast.update(toastId, {
				title: 'Sesión cerrada',
				description: 'Hasta luego!',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			setUser();
			navigate('/');
		} catch (error) {
			toast.update(toastId, {
				title: 'Error al cerrar sesión',
				description: 'No se pudo cerrar sesión',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	};

	const signout = () => {
		onDialogOpen(); // Abre el diálogo de confirmación
	};

	const confirmSignOut = () => {
		handleSignOut(); // Llama a la función que cierra la sesión
		onDialogClose(); // Cierra el diálogo
	};

	const sidebar = (index, link) => {
		setSelectedIndex(index);
		navigate(link);
	};

	return (
		<>
			{/* SideBar */}
			<Box
				alignItems='center'
				w={[0, 0, '30%', '20%', '25%']}
				h='100vh'
				display={{ base: 'none', md: 'flex' }}
				bgGradient='linear(to-t,#1294FF, #022C4F)'
				flexDirection='column'
				justifyContent='space-between'>
				<Box
					w='100%'
					m={5}
					pt={5}>
					<Image
						src='/images/Logo.jpg'
						alt='CryptoPredict Logo'
						borderRadius='20px'
						w='25%'
						display='block'
						m='auto'
						onClick={() => navigate('/')}
					/>
				</Box>
				<HStack alignItems={'center'}>
					<HStack
						as={'nav'}
						display={{ base: 'none', md: 'flex' }}
						flex={1}
						flexDirection='column'
						mx={8}
						alignContent='center'
						justifyContent='center'>
						{menuItems.map((item, index) => (
							<Box
								key={index}
								w='100%'
								onClick={() => sidebar(index, item.link)}
								my={6}
								py={1}
								px={[0, 0, 3, 5]}
								display='flex'
								flexDirection='row'
								alignItems='center'
								_hover={{ opacity: '0.6' }}
								transition='0.3s'
								borderRadius='md'
								opacity={selectedIndex === index ? '0.5' : '1'}
								ml={selectedIndex === index ? '20px' : '0px'}
								cursor='pointer'>
								<Image
									w={[0, 0, 7, 8, 10]}
									src={item.icon}
									alt={item.name}
								/>
								<Text
									pl={5}
									fontWeight={650}
									fontSize={[0, 0, 13, 14, 15]}
									alignContent='center'
									_focus={{ outline: 'none' }}>
									{item.name}
								</Text>
							</Box>
						))}
					</HStack>
				</HStack>
				<Box
					alignContent='center'
					w='100%'
					mb={5}>
					<Button
						// fontSize={[0, 0, 12, 15, 15]}
						fontSize={{ md: 15, xl: 18 }}
						bg='#FFA000'
						w='70%'
						h={{ base: '35', lg: '45' }}
						color='black'
						_hover={{ bg: '#D84226' }}
						transition='0.3s'
						onClick={signout}>
						Cerrar Sesión
					</Button>
				</Box>
			</Box>

			{/* PopBar */}
			<Box
				display={{ base: 'flex', md: 'none' }}
				bgGradient='linear(to-r,#1294FF, #022C4F)'
				px={4}>
				<Flex
					alignItems={'center'}
					justifyContent={'space-between'}
					p={5}>
					<Flex>
						{isOpen ? (
							<Image
								src='/icons/close.png'
								alt='Close'
								w={{ base: '50%' }}
								onClick={isOpen ? onClose : onOpen}
								display='block'
								m='auto'
								_hover={{ opacity: '0.5' }}
							/>
						) : (
							<Image
								src='/icons/menu.png'
								alt='Menu'
								w={20}
								onClick={isOpen ? onClose : onOpen}
								display='block'
								m='auto'
								_hover={{ opacity: '0.5' }}
							/>
						)}
					</Flex>
					<Flex display={{ md: 'none' }}>
						<Image
							src='/images/Logo.jpg'
							alt='CryptoPredict Logo'
							borderRadius={['10px', '20px']}
							w='15%'
							display='block'
							m='auto'
							onClick={() => navigate('/')}
						/>
					</Flex>
					<Flex display={{ md: 'none' }}>
						<Image
							src='/icons/logout.png'
							alt='Logout'
							w={20}
							display='block'
							m='auto'
							_hover={{ opacity: '0.5' }}
							onClick={signout}
						/>
					</Flex>
				</Flex>
				{isOpen && (
					<Box
						borderRadius='20px'
						m={3}
						w={{ base: '60%', sm: '50%' }}
						display={{ md: 'none' }}
						bg='#ffffff'
						position='absolute'
						zIndex={1000}>
						<HStack spacing={8}>
							<HStack
								as={'nav'}
								spacing={10}
								flex={1}
								display='flex'
								flexDirection='column'
								m={5}>
								{menuItems.map((item, index) => (
									<Box>
										<Button
											// as={Link}
											// leftIcon={
											// <Image
											// w={[0, 0, 7, 8, 10]}
											// src={item.icon}
											// m={3}
											// />}
											onClick={() => navigate(item.link)}
											key={index}
											fontWeight={600}
											fontSize={[15, 18]}
											color='#085799'
											variant='ghost'
											w='100%'>
											{item.name}
										</Button>
									</Box>
								))}
							</HStack>
						</HStack>
					</Box>
				)}
				{/* AlertDialog para confirmar cierre de sesión */}
				<AlertDialog
					isOpen={isDialogOpen}
					onClose={onDialogClose}
					leastDestructiveRef={cancelRef}>
					<AlertDialogOverlay>
						<AlertDialogContent>
							<AlertDialogHeader
								fontSize='lg'
								fontWeight='bold'>
								Confirmar Cierre de Sesión
							</AlertDialogHeader>
							<AlertDialogBody>
								¿Estás seguro de que deseas cerrar sesión?
							</AlertDialogBody>
							<AlertDialogFooter>
								<Button
									ref={cancelRef}
									onClick={onDialogClose}>
									Cancelar
								</Button>
								<Button
									colorScheme='red'
									onClick={confirmSignOut}
									ml={3}>
									Cerrar Sesión
								</Button>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialogOverlay>
				</AlertDialog>
			</Box>
		</>
	);
};

export default SideBar;
