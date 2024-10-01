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

// const menuItems = names.map((name, index) => ({
// name: name,
// link: links[index]
// }))

const Navbar = () => {
	const [user, setUser] = useState();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);

	async function signout() {
		try {
			await signOut();
			setUser();
		} catch {
			console.log('error');
		}
	}

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
			{/* Navbar */}
			<Box
				// display={'flex'}
				// bg='#ffffff'
				bgGradient='linear(to-r,#1294FF, #022C4F)'
				display={{ base: 'none', md: 'flow' }}
				pt='3vh'
				h='20vh'>
				<Flex
					// bg='blue'
					// pt={4}
					pl={{ md: 10, lg: 12 }}>
					<Box
					// m={'aut }o'}
					// w={'10%'}
					// bg={'red'}
					>
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
							spacing={{ md: '10', lg: '15', xl: '20' }}
							// flex={1}
							// display='flex'
							flexDirection='row'
							// m={5}
						>
							{menuItems.map((item, index) => (
								<Box>
									<Link
										// fontWeight={650}
										key={index}
										fontSize={{ md: 12, lg: 15 }}
										href={item.link}
										// color='#085799'
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
								fontSize={{ md: 12, lg: 15 }}
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
								fontSize={{ md: 15, lg: 20 }}
								mr={5}>
								Bienvenido {user.user_metadata.name}{' '}
								{user.user_metadata.lastname}
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
								fontSize='md'>
								<Image
									src='/icons/logout.png'
									alt='Logout'
									w='2vw'
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
							src='/icons/login.png'
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
	);
};

export default Navbar;
