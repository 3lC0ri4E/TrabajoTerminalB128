/** @format */

import React, { useState, useEffect } from 'react';
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
	{ name: '¿Quiénes Somos?', link: '/quienessomos' },
	{ name: 'Propósito', link: '/proposito' },
	{ name: 'Misión', link: '/mision' },
	{ name: 'Visión', link: '/vision' },
];

const Navbar = () => {
	const [user, setUser] = useState();
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
					// display={'flex'}
					// bg='#ffffff'
					bgGradient='linear(to-r,#1294FF, #022C4F)'
					display={{ base: 'none', md: 'flow' }}
					pt='3vh'
					h='20vh'>
					<Flex
						pl={{ md: 10, lg: 12 }}>
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
								flexDirection='row'
							>
								{menuItems.map((item, index) => (
									<Box>
										<Link						
											key={index}
											fontSize={{ md: 12, lg: 15 }}
											href={item.link}
										>
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
										alignContent={'center'}
									>
									Bienvenido {user.user_metadata.name}
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
										w={{base: 0, md: 5, lg: 8 }}

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

				{/* Popbar */}
				<Box
					display={{ md: 'none' }}
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
									w='30vw'
									onClick={isOpen ? onClose : onOpen}
									display='block'
									m='auto'
									_hover={{ opacity: '0.5' }}></Image>
							)}
						</Flex>
						<Flex display={{ md: 'none' }}>
							<Image
								src='/images/Logo.jpg'
								alt='CryptoPredict Logo'
								borderRadius={['10px', '20px']}
								w='20%'
								display='block'
								m='auto'
								onClick={() => navigate('/')}
							/>
						</Flex>
						<Flex display={{ md: 'none' }}>
							<Image
								src='/icons/logout.png'
								alt='Logout'
								w='30vw'
								display='block'
								m='auto'
								_hover={{ opacity: '0.5' }}
								onClick={signout}
							/>
						</Flex>
					</Flex>
					{isOpen ? (
						<Box
							borderRadius='20px'
							m={3}
							w={{ base: '60%', sm: '50%' }}
							display={{ md: 'none' }}
							bg='#ffffff'
							position='absolute'>
							<HStack spacing={8}>
								<HStack
									as={'nav'}
									spacing={10}
									flex={1}
									display='flex'
									flexDirection='column'
									m={5}>
									{menuItems.map((item, index) => (
										<Box w={'100%'}>
											<Button
												onClick={() => navigate(item.link)}
												key={index}
												fontWeight={650}
												fontSize={[15, 18]}
												// href={item.link}
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
					) : null}
				</Box>
			</>

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
		</>
	);
};

export default Navbar;
