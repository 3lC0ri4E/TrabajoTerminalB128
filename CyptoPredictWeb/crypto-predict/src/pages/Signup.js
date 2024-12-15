/** @format */

import React, { useState } from 'react';
import {
	Input,
	Stack,
	Text,
	Button,
	Divider,
	Box,
	FormErrorMessage,
	FormControl,
	Image,
	InputGroup,
	InputRightElement,
	useToast,
	Link,
} from '@chakra-ui/react';
import useValidation from '../hooks/useValidation';
import validateSignupForm from '../hooks/validation/SignupForm';
import { useNavigate } from 'react-router-dom';
import { signUp, signIn } from '../supabase/supabase_functions';

export default function SignUp() {
	const [show, setShow] = useState(false);
	const [isAwaitingVerification, setIsAwaitingVerification] = useState(false);
	const handleClick = () => setShow(!show);
	const navigate = useNavigate();
	const toast = useToast();

	const initialState = {
		name: '',
		lastname: '',
		username: '',
		email: '',
		password: '',
		confirmpassword: '',
	};

	const { values, errors, handleSubmit, handleChange } = useValidation(
		initialState,
		validateSignupForm,
		onSubmit
	);

	async function onSubmit() {
		const toastId = toast({
			title: 'Registrando usuario',
			description: 'Por favor, espera mientras creamos tu cuenta...',
			status: 'info',
			duration: null,
			isClosable: true,
			position: 'top',
		});

		try {
			const { error } = await signUp(values);

			if (error) {
				toast.update(toastId, {
					title: 'Error al registrar usuario',
					description: error?.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
				return;
			}

			// Notificar que el correo de verificación fue enviado
			toast.update(toastId, {
				title: 'Correo de confirmación enviado',
				description:
					'Por favor, confirma tu correo para completar el registro.',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});

			setIsAwaitingVerification(true); // Estado para mostrar mensaje de espera
			checkVerificationStatus(values); // Iniciar la verificación periódica
		} catch (error) {
			toast.update(toastId, {
				title: 'Error al registrar usuario',
				description: error.message || 'Ocurrió un error inesperado',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	}

	function checkVerificationStatus(values) {
		const intervalId = setInterval(async () => {
			// Reautenticamos al usuario para obtener el estado actualizado
			const { data } = await signIn(values.email, values.password);
			const user = data?.user;
			if (user && user.confirmed_at) {
				clearInterval(intervalId);
				toast({
					title: 'Cuenta confirmada',
					description: '¡Tu cuenta ha sido confirmada exitosamente!',
					status: 'success',
					duration: 10000,
					isClosable: true,
					position: 'top',
				});
				navigate('/dashboard');
			}
		}, 3000);
	}
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
						¡Bienvenido a CryptoPredict!
					</Text>
				</Box>
				<Box
					flex='1'
					display='flex'
					flexDirection='column'
					justifyContent='center'>
					{isAwaitingVerification ? (
						<Text
							fontSize={{ base: 25, md: 30, xl: 40 }}
							fontWeight={450}
							textAlign='center'
							color='yellow.400'>
							Revisa tu correo para confirmar tu cuenta antes de iniciar sesión.
						</Text>
					) : (
						<>
							<Text
								fontSize={{ base: 18, xl: 20 }}
								fontWeight={450}
								mb={[2, 2, 3, 3]}>
								Crear Cuenta
							</Text>
							<Divider />
							<form id='signup-form'>
								<Stack
									pl='10%'
									pr='10%'>
									<FormControl isInvalid={errors.email || errors.password}>
										<Input
											mt={3}
											size={{ base: 'sm' }}
											padding='15px'
											variant='flushed'
											name='name'
											id='name'
											type='text'
											placeholder='Nombre(s)'
											onChange={handleChange}
											value={values.name}
											mb={[2, 2, 5, 5]}
										/>
										{errors.name && (
											<Box textAlign='left'>
												<FormErrorMessage
													mt={{ base: '-5px', md: '-15px' }}
													mb='10px'
													ml='10px'
													fontSize={{ base: 10, md: 12, xl: 15 }}>
													{errors.name}
												</FormErrorMessage>
											</Box>
										)}
										<Input
											size={{ base: 'sm' }}
											padding='15px'
											variant='flushed'
											name='lastname'
											id='lastname'
											type='text'
											placeholder='Apellido(s)'
											onChange={handleChange}
											value={values.lastname}
											mb={[2, 2, 5, 5]}
										/>
										{errors.lastname && (
											<Box textAlign='left'>
												<FormErrorMessage
													mt={{ base: '-5px', md: '-15px' }}
													mb='10px'
													ml='10px'
													fontSize={{ base: 10, md: 12, xl: 15 }}>
													{errors.lastname}
												</FormErrorMessage>
											</Box>
										)}
										<Input
											size={{ base: 'sm' }}
											padding='15px'
											variant='flushed'
											name='username'
											id='username'
											type='text'
											placeholder='Nombre de Usuario'
											onChange={handleChange}
											value={values.username}
											mb={[2, 2, 5, 5]}
										/>
										{errors.username && (
											<Box textAlign='left'>
												<FormErrorMessage
													mt={{ base: '-5px', md: '-15px' }}
													mb='10px'
													ml='10px'
													fontSize={{ base: 10, md: 12, xl: 15 }}>
													{errors.username}
												</FormErrorMessage>
											</Box>
										)}
										<Input
											size={{ base: 'sm' }}
											padding='15px'
											variant='flushed'
											name='email'
											id='email'
											type='email'
											placeholder='Correo Electrónico'
											onChange={handleChange}
											value={values.email}
											mb={[2, 2, 5, 5]}
										/>
										{errors.email && (
											<Box textAlign='left'>
												<FormErrorMessage
													mt={{ base: '-5px', md: '-15px' }}
													mb='10px'
													ml='10px'
													fontSize={{ base: 10, md: 12, xl: 15 }}>
													{errors.email}
												</FormErrorMessage>
											</Box>
										)}
										<InputGroup>
											<Input
												size={{ base: 'sm' }}
												padding='15px'
												variant='flushed'
												name='password'
												id='password'
												// type="password"
												type={show ? 'text' : 'password'}
												placeholder='Contraseña'
												value={values.password}
												onChange={handleChange}
												mb={[2, 2, 5, 5]}
											/>
											<InputRightElement width='4.5rem'>
												<Button
													h={{ base: '20px', sm: '10px', xl: '20px' }}
													size='xs'
													onClick={handleClick}
													bg='#3d3d3d'
													color='#ffffff'
													_hover={{ bg: '#505967' }}>
													{show ? 'Esconder' : 'Mostrar'}
												</Button>
											</InputRightElement>
										</InputGroup>
										{errors.password && (
											<Box textAlign='left'>
												<FormErrorMessage
													mt={{ base: '-5px', md: '-15px' }}
													mb='10px'
													ml='10px'
													fontSize={{ base: 10, md: 12, xl: 15 }}>
													{errors.password}
												</FormErrorMessage>
											</Box>
										)}
										<Input
											size={{ base: 'sm' }}
											padding='15px'
											variant='flushed'
											name='confirmpassword'
											id='confirm password'
											// type="password"
											type={show ? 'text' : 'password'}
											placeholder='Confirmar Contraseña'
											value={values.confirmpassword}
											onChange={handleChange}
										/>
										{errors.confirmpassword && (
											<Box textAlign='left'>
												<FormErrorMessage
													mt={{ base: '5px', md: '10px' }}
													mb='10px'
													ml='10px'
													fontSize={{ base: 10, md: 12, xl: 15 }}>
													{errors.confirmpassword}
												</FormErrorMessage>
											</Box>
										)}
									</FormControl>
								</Stack>
							</form>
							<Box alignContent='center'>
								<Text
									mt={{ base: 4 }}
									fontSize={{ base: 14 }}>
									¿Tienes una cuenta?&nbsp;
									<Box
										as='span'
										color='#FFA000'>
										<Link
											key={1}
											onClick={() => navigate('/login')}
											// color='#085799'
										>
											Entrar
										</Link>
									</Box>
								</Text>
								<Button
									mt={3}
									fontSize={{ md: 12, lg: 15 }}
									bg='#FFA000'
									w={{ base: '35vw', md: '15vw', lg: '17vw' }}
									h={{ base: '35' }}
									_hover={{
										bg: '#D84226',
									}}
									form='signup-form'
									onClick={handleSubmit}>
									Registrarse
								</Button>
							</Box>
						</>
					)}
				</Box>
			</Box>
		</Box>
	);
}
