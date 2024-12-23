/** @format */

import React, { useState, useEffect, useRef } from 'react';
import {
	Box,
	Image,
	Button,
	Flex,
	HStack,
	useDisclosure,
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
	const boxRef = useRef();
	const {
		isOpen: isDialogOpen,
		onOpen: onDialogOpen,
		onClose: onDialogClose,
	} = useDisclosure();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const navigate = useNavigate();
	const toast = useToast();
	const cancelRef = React.useRef();

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
								my={4}
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
									w={{ md: 5, lg: 8 }}
									src={item.icon}
									alt={item.name}
								/>
								<Text
									pl={5}
									fontWeight={650}
									fontSize={{ md: 10, lg: 15 }}
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
						fontSize={{ md: 12, lg: 15 }}
						bg='#FFA000'
						w={{ base: '35vw', md: '15vw', lg: '17vw' }}
						h={{ base: '35' }}
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
					alignItems='center'
					justifyContent='space-between'
					p={5}
					w='100%'>
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
						<Image
							src='/icons/menu.png'
							alt='Menu'
							w='20vw'
							mr={4}
							display='block'
							_hover={{ opacity: '0.5' }}
							onClick={isOpen ? onClose : onOpen}
						/>
						<Image
							src='/icons/logout.png'
							alt='Logout'
							w='20vw'
							display='block'
							_hover={{ opacity: '0.5' }}
							onClick={signout}
						/>
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
						position='absolute'
						zIndex={1000}>
						<HStack spacing={8}>
							<HStack
								as={'nav'}
								spacing={10}
								flex={1}
								flexDirection='column'
								m={5}>
								{menuItems.map((item, index) => (
									<Box key={index}>
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
			</Box>
		</>
	);
};

export default SideBar;
