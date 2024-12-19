/** @format */

import React, { useState, useEffect, useRef } from 'react';
import {
	Box,
	Flex,
	Image,
	HStack,
	Link,
	Button,
	useDisclosure,
	Text,
	Spinner,
	Tooltip,
	useToast,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { getUser, signOut } from '../supabase/supabase_functions';

const menuItems = [
	{ name: 'Inicio', link: '/' },
	{ name: 'Nosotros', link: '/quienessomos' },
	{ name: 'Propósito', link: '/proposito' },
	{ name: 'Misión', link: '/mision' },
	{ name: 'Visión', link: '/vision' },
];

const Navbar = () => {
	const [user, setUser] = useState();
	const boxRef = useRef();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		isOpen: isDialogOpen,
		onOpen: onDialogOpen,
		onClose: onDialogClose,
	} = useDisclosure();
	const cancelRef = React.useRef();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const toast = useToast();
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (boxRef.current && !boxRef.current.contains(event.target) && isOpen) {
				onClose();
			}
		};
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isOpen, onClose]);

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
		onDialogOpen();
	};

	const confirmSignOut = () => {
		handleSignOut();
		onDialogClose();
	};

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const userData = await getUser();
				if (userData) {
					setUser(userData);
				}
			} finally {
				setLoading(false); // Actualiza el estado de carga
			}
		};

		fetchUser();
	}, []);

	if (loading)
		return (
			<Box
				display='flex'
				alignItems='center'
				justifyContent='center'
				h='100vh'
				w='100vw'
				position='fixed'
				zIndex='1000'>
				<Spinner size='xl' />
			</Box>
		);

	return (
		<>
			<>
				{/* Navbar */}
				<Box
					bgGradient='linear(to-r,#1294FF, #022C4F)'
					display={{ base: 'none', md: 'flow' }}
					pt='3vh'
					h='20vh'>
					<Flex pl={{ md: 10, lg: 12 }}>
						<Box>
							<Image
								src='/images/Logo.jpg'
								alt='CryptoPredict Logo'
								borderRadius={{ md: '10px', lg: '15px' }}
								w={{ md: '50px', lg: '75px' }}
								// display='block'
								m='auto'
								onClick={() => navigate('/')}
							/>
						</Box>
						<Flex
							pl={5}
							m={'auto'}
							justifyContent={'space-between'}>
							<HStack
								spacing={{ md: '5', lg: '12', xl: '18' }}
								flexDirection='row'>
								{menuItems.map((item, index) => (
									<Box key={index}>
										<Link
											fontSize={{ md: 12, lg: 15 }}
											onClick={() => navigate(item.link)}>
											{item.name}
										</Link>
									</Box>
								))}
							</HStack>
						</Flex>

						{!user ? (
							<Flex m={'auto'}>
								{/* <Divider orientation='vertical' /> */}
								<Button
									bg='#FFA000'
									w={{ md: '10vw', lg: '12vw' }}
									h={{ md: '30', lg: '35' }}
									color='black'
									_hover={{ bg: '#D84226' }}
									transition='0.3s'
									onClick={() => navigate('signup')}>
									Registrarse
								</Button>
								<Button
									ml={5}
									variant='ghost'
									fontSize={{ md: 12, lg: 15 }}
									w={{ md: '10vw', lg: '12vw' }}
									h={{ md: '30', lg: '35' }}
									color='white'
									_hover={{ bg: '#000000' }}
									transition='0.3s'
									onClick={() => navigate('/login')}>
									Iniciar Sesión
								</Button>
							</Flex>
						) : (
							<Flex m={'auto'}>
								<Text
									fontSize={{ md: 12, lg: 15 }}
									mr={5}
									alignContent={'center'}>
									Bienvenid@ {user.user_metadata.name}
								</Text>
								<Button
									fontSize={{ md: 12, lg: 15 }}
									bg='#FFA000'
									mr={5}
									w={{ md: '10vw', lg: '12vw' }}
									h={{ md: '30', lg: '35' }}
									color='black'
									_hover={{ bg: '#D84226' }}
									transition='0.3s'
									onClick={() => navigate('/dashboard')}>
									Dashboard
								</Button>
								<Tooltip
									label='Cerrar sesión'
									fontSize={{ md: 'xs', lg: 'sm' }}>
									<Image
										w={{ base: 0, md: 5, lg: 8 }}
										src='/icons/logout.png'
										alt='Logout'
										display='block'
										m='auto'
										_hover={{ opacity: '0.5' }}
										onClick={signout}
									/>
								</Tooltip>
							</Flex>
						)}
					</Flex>
				</Box>
				{/* PopBar */}
				<Box
					display={{ base: 'flex', md: 'none' }}
					bgGradient='linear(to-r,#1294FF, #022C4F)'
					px={4}>
					<Flex
						alignItems='center'
						justifyContent='space-between'
						p={5}
						w='100%'>
						{/* Logo a la Izquierda */}
						<Flex
							justifyContent='flex-start'
							alignItems='center'
							gap={4}>
							<Image
								src='/images/Logo.jpg'
								alt='CryptoPredict Logo'
								borderRadius={['10px', '20px']}
								w='20%'
								display='block'
								onClick={() => navigate('/')}
							/>
						</Flex>

						{/* Íconos a la Derecha */}
						<Flex justifyContent='flex-end'>
							{user ? (
								<>
									{/* Íconos para usuario autenticado */}
									<Image
										src='/icons/more.png'
										alt='More'
										w='12vw'
										mr={4}
										_hover={{ opacity: '0.5' }}
										onClick={isOpen ? onClose : onOpen}
									/>
									<Image
										src='/icons/dashboard.png'
										alt='Dashboard'
										w='12vw'
										mr={4}
										_hover={{ opacity: '0.5' }}
										onClick={() => navigate('/dashboard')}
									/>
									<Image
										src='/icons/logout.png'
										alt='Sign Out'
										w='12vw'
										_hover={{ opacity: '0.5' }}
										onClick={signout}
									/>
								</>
							) : (
								<>
									{/* Íconos para usuario no autenticado */}
									<Image
										src='/icons/more.png'
										alt='More'
										w='12vw'
										mr={4}
										_hover={{ opacity: '0.5' }}
										onClick={isOpen ? onClose : onOpen}
									/>
									<Image
										src='/icons/login.png'
										alt='Login'
										w='20vw'
										mr={4}
										_hover={{ opacity: '0.5' }}
										onClick={() => navigate('/login')}
									/>
									<Image
										src='/icons/signup.png'
										alt='Sign Up'
										w='20vw'
										mr={4}
										_hover={{ opacity: '0.5' }}
										onClick={() => navigate('/signup')}
									/>
								</>
							)}
						</Flex>
					</Flex>

					{/* Menú desplegable */}
					{isOpen && (
						<Box
							ref={boxRef}
							borderRadius='20px'
							m={3}
							w={{ base: '60%', sm: '50%' }}
							bg='#ffffff'
							position='fixed'
							zIndex={1000}>
							<HStack spacing={8}>
								<HStack
									as='nav'
									spacing={10}
									flex={1}
									display='flex'
									flexDirection='column'
									m={5}>
									{menuItems.map((item, index) => (
										<Box
											w='100%'
											key={index}>
											<Button
												onClick={() => navigate(item.link)}
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
				</Box>
			</>

			{/* AlertDialog para confirmar cierre de sesión */}
			<AlertDialog
				isOpen={isDialogOpen}
				onClose={onDialogClose}
				leastDestructiveRef={cancelRef}>
				<AlertDialogOverlay>
					<AlertDialogContent
						w='90%'
						maxW='500px'
						mx='auto'>
						<AlertDialogHeader
							fontSize='lg'
							fontWeight='bold'
							textAlign='center'>
							Confirmar Cierre de Sesión
						</AlertDialogHeader>
						<AlertDialogBody textAlign='center'>
							¿Estás seguro de que deseas cerrar sesión?
						</AlertDialogBody>
						<AlertDialogFooter
							display='flex'
							justifyContent='center'>
							<Button
								ref={cancelRef}
								onClick={onDialogClose}
								variant='ghost'>
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
		</>
	);
};

export default Navbar;
