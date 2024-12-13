/** @format */

import React, { useState } from 'react';
import {
	Input,
	Stack,
	Text,
	Button,
	Divider,
	Box,
	FormLabel,
	FormErrorMessage,
	FormControl,
	Image,
	InputGroup,
	InputRightElement,
	useToast,
	Link,
} from '@chakra-ui/react';
import useValidation from '../hooks/useValidation';
import validateLoginForm from '../hooks/validation/LoginForm';
import { useNavigate } from 'react-router-dom';

import { sendResetPasswordEmail, signIn } from '../supabase/supabase_functions';

export default function LogIn() {
	const [show, setShow] = useState(false);
	const [isForgotPassword, setIsForgotPassword] = useState(false); // Estado para alternar formularios
	const handleClick = () => setShow(!show);
	const navigate = useNavigate();
	const toast = useToast();

	const initialState = {
		email: '',
		password: '',
	};

	const { values, errors, handleSubmit, handleChange } = useValidation(
		initialState,
		(values) => validateLoginForm(values, isForgotPassword), // Añade isForgotPassword aquí
		onSubmit
	);

	async function onSubmit() {
		if (isForgotPassword) {
			const toastId = toast({
				title: 'Enviando correo de Recuperacion de Contraseña',
				description: 'Por favor, espera...',
				status: 'info',
				duration: null,
				isClosable: true,
				position: 'top',
			});
			try {
				const { error } = await sendResetPasswordEmail(values.email);
				if (error) {
					toast.update(toastId, {
						title: 'Error al enviar el correo',
						description:
							'No se pudo enviar el correo de recuperación. Intenta nuevamente.',
						status: 'error',
						duration: 5000,
						isClosable: true,
					});
				} else {
					toast.update(toastId, {
						title: 'Correo enviado',
						description:
							'Revisa tu bandeja de entrada para restablecer tu contraseña.',
						status: 'success',
						duration: 5000,
						isClosable: true,
					});
					setIsForgotPassword(false); // Regresa al formulario de login después de enviar el correo
				}
			} catch (error) {
				toast.update(toastId, {
					title: 'Error Recuperar Contraseña',
					description: error.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			}
		} else {
			const toastId = toast({
				title: 'Iniciando Sesión',
				description: 'Por favor, espera...',
				status: 'info',
				duration: null,
				isClosable: true,
				position: 'top',
			});
			try {
				const { data, error } = await signIn(values.email, values.password);
				const user = data?.user;
				if (error || !user) {
					toast.update(toastId, {
						title: 'Error al iniciar sesión',
						description: error?.message || 'Credenciales incorrectas',
						status: 'error',
						duration: 5000,
						isClosable: true,
					});
					return;
				}
				toast.update(toastId, {
					title: 'Sesión iniciada',
					description: 'Bienvenido de nuevo!',
					status: 'success',
					duration: 5000,
					isClosable: true,
				});
				navigate('/');
			} catch (error) {
				toast.update(toastId, {
					title: 'Error iniciar sesión',
					description: error.message,
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			}
		}
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
						¡Bienvenido!
					</Text>
					<Text
						fontSize={{ base: 15, md: 20, xl: 25 }}
						fontWeight={450}
						m={[1, 2, 4, 5]}>
						{isForgotPassword
							? 'Recupera tu contraseña'
							: 'Por favor, inicia sesión para continuar'}
					</Text>
				</Box>

				<Box
					flex='1'
					p={{ md: 10 }}
					display='flex'
					flexDirection='column'
					justifyContent='center'>
					<Text
						fontSize={{ base: 18, xl: 20 }}
						fontWeight={450}
						mb={[2, 2, 3, 3]}>
						{isForgotPassword ? 'Recuperar Contraseña' : 'Iniciar Sesión'}
					</Text>
					<Divider />
					<form id='login-form'>
						<Stack
							pl={'10%'}
							pr={'10%'}>
							<FormControl
								isInvalid={
									errors.email || (!isForgotPassword && errors.password)
								}>
								<FormLabel
									htmlFor='email'
									mt={[3, 5, 10, 10]}
									fontSize={{ base: 12, md: 15 }}>
									Correo Electrónico
								</FormLabel>
								<Input
									size={{ base: 'sm' }}
									padding='15px'
									variant='flushed'
									name='email'
									id='login_email'
									type='email'
									placeholder='ejemplo@ejemplo.com'
									onChange={handleChange}
									value={values.email}
									mb={[2, 2, 5, 5]}
								/>
								{errors.email && (
									<FormErrorMessage
										mt={{ base: '-5px', md: '-15px' }}
										mb='10px'
										ml='10px'
										fontSize={{ base: 10, md: 15 }}>
										{errors.email}
									</FormErrorMessage>
								)}
								{!isForgotPassword && (
									<>
										<FormLabel
											htmlFor='password'
											mt={1}
											fontSize={{ base: 12, md: 15 }}>
											Contraseña
										</FormLabel>
										<InputGroup>
											<Input
												size={['xs', 'xs', 'sm', 'md']}
												padding='15px'
												variant='flushed'
												name='password'
												id='login_password'
												type={show ? 'text' : 'password'}
												placeholder='*********'
												value={values.password}
												onChange={handleChange}
												mb={[2, 2, 5, 5]}
											/>
											<InputRightElement width='4.5rem'>
												<Button
													h={{ base: '20px', xl: '35px' }}
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
											<FormErrorMessage
												mt={{ base: '-5px', md: '-15px' }}
												mb='10px'
												ml='10px'
												fontSize={{ base: 10, md: 15 }}>
												{errors.password}
											</FormErrorMessage>
										)}
									</>
								)}
							</FormControl>
						</Stack>
					</form>
					{isForgotPassword ? (
						<Text
							mt={4}
							fontSize={{ base: 12, lg: 15 }}
							color='#FFA000'
							cursor='pointer'
							onClick={() => setIsForgotPassword(false)}>
							Volver a Iniciar Sesión
						</Text>
					) : (
						<Box>
							<Text
								my={{ base: 4 }}
								fontSize={{ base: 14 }}>
								¿No tienes cuenta?&nbsp;
								<Box
									as='span'
									color='#FFA000'>
									<Link
										key={1}
										onClick={() => navigate('/signup')}>
										Regístrate
									</Link>
								</Box>
							</Text>
							<Text
								mt={4}
								fontSize={{ base: 14 }}
								color='#c0c0c0'
								cursor='pointer'
								onClick={() => setIsForgotPassword(true)}>
								Olvidé mi Contraseña
							</Text>
						</Box>
					)}
					<Box
						alignContent='center'
						mt={4}>
						<Button
							mt={3}
							fontSize={{ md: 12, lg: 15 }}
							bg='#FFA000'
							w={{ base: '40vw', md: '15vw', lg: '17vw' }}
							h={{ base: '35' }}
							_hover={{ bg: '#D84226' }}
							form='login-form'
							onClick={handleSubmit}>
							{isForgotPassword ? 'Enviar Correo' : 'Iniciar Sesión'}
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
