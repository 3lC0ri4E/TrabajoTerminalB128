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
			const { data, error } = await signUp(values);

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
				description: 'Por favor, confirma tu correo para completar el registro.',
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
			const { data } = await signIn(
				values.email,
				values.password,
			);

			const user = data?.user;


			if (user && user.confirmed_at) {
				clearInterval(intervalId); // Detenemos el intervalo


				toast({
					title: 'Cuenta confirmada',
					description: '¡Tu cuenta ha sido confirmada exitosamente!',
					status: 'success',
					duration: 10000,
					isClosable: true,
					position: 'top',
				});
				navigate('/dashboard'); // Redirige a la página principal
			}
		}, 3000); // Verificar cada 3 segundos
	}
	return (
		<Box h='100vh' display='flex' flexDirection={{ base: 'column', md: 'row' }}>
			<Box
				display={{ md: 'flex' }}
				borderRadius='30px'
				h='85vh'
				w='85%'
				overflow='auto'
				p={4}
				justifyContent='center'
				alignItems='center'
				m='auto'
				bg='#3d3d3d'
			>
				<Box flex='1' textAlign='center' justifyContent='center' pb={5}>
					<Image
						src='/images/Logo.jpg'
						alt='CryptoPredict Logo'
						borderRadius='20px'
						boxSize='25%'
						display='block'
						m='auto'
						onClick={() => navigate('/')}
					/>
					<Text fontWeight={450} fontSize={{ base: 25, md: 35, xl: 45 }} mt={[1, 2, 4, 5]}>
						¡Bienvenido a CryptoPredict!
					</Text>
				</Box>
				<Box flex='1' display='flex' flexDirection='column' justifyContent='center'>
					{isAwaitingVerification ? (
						<Text fontSize={[16, 18, 20, 24]} fontWeight={450} textAlign='center' color='yellow.400'>
							Revisa tu correo para confirmar tu cuenta antes de iniciar sesión.
						</Text>
					) : (
						<>
							<Text fontSize={[16, 18, 20, 24]} fontWeight={450} mb={[2, 2, 3, 3]}>
								Crear Cuenta
							</Text>
							<Divider />
							<form id='signup-form'>
								<Stack pl='10%' pr='10%'>
									<FormControl isInvalid={errors.email || errors.password}>

										<Input
											mt={3}
											size={{ base: 'xs', md: 'sm', xl: 'xl' }}
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
											<FormErrorMessage
												mt={{ base: '-5px', md: '-15px' }}
												mb='10px'
												ml='10px'
												fontSize={{ base: 10, md: 12, xl: 15 }}>
												{errors.name}
											</FormErrorMessage>
										)}
										<Input
											size={{ base: 'xs', md: 'sm', xl: 'xl' }}
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
											<FormErrorMessage
												mt={{ base: '-5px', md: '-15px' }}
												mb='10px'
												ml='10px'
												fontSize={{ base: 10, md: 12, xl: 15 }}>
												{errors.lastname}
											</FormErrorMessage>
										)}
										<Input
											size={{ base: 'xs', md: 'sm', xl: 'xl' }}
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
											<FormErrorMessage
												mt={{ base: '-5px', md: '-15px' }}
												mb='10px'
												ml='10px'
												fontSize={{ base: 10, md: 12, xl: 15 }}>
												{errors.username}
											</FormErrorMessage>
										)}
										<Input
											size={{ base: 'xs', md: 'sm', xl: 'xl' }}
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
											<FormErrorMessage
												mt={{ base: '-5px', md: '-15px' }}
												mb='10px'
												ml='10px'
												fontSize={{ base: 10, md: 12, xl: 15 }}>
												{errors.email}
											</FormErrorMessage>
										)}
										<InputGroup>
											<Input
												size={{ base: 'xs', md: 'sm', xl: 'xl' }}
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
													h={{ base: '20px', xl: '35px' }}
													size='sm'
													onClick={handleClick}
													bg='#3d3d3d'
													color='#ffffff'
													_hover={{ bg: '#505967' }}
													fontSize={{ base: 10, xl: 15 }}>
													{show ? 'Esconder' : 'Mostrar'}
												</Button>
											</InputRightElement>
										</InputGroup>
										{errors.password && (
											<FormErrorMessage
												mt={{ base: '-5px', md: '-15px' }}
												mb='10px'
												ml='10px'
												fontSize={{ base: 10, md: 12, xl: 15 }}>
												{errors.password}
											</FormErrorMessage>
										)}
										<Input
											size={{ base: 'xs', md: 'sm', xl: 'xl' }}
											padding='15px'
											variant='flushed'
											name='confirmpassword'
											id='confirm password'
											// type="password"
											type={show ? 'text' : 'password'}
											placeholder='Confirmar Contraseña'
											value={values.confirmpassword}
											onChange={handleChange}
											mb={[2, 2, 5, 5]}
										/>
										{errors.confirmpassword && (
											<FormErrorMessage
												mt={{ base: '-5px', md: '-15px' }}
												mb='10px'
												ml='10px'
												fontSize={{ base: 10, md: 12, xl: 15 }}>
												{errors.confirmpassword}
											</FormErrorMessage>
										)}
									</FormControl>
								</Stack>
							</form>
							<Box alignContent='center' pt={3}>
								<Button
									mt={2}
									fontSize={{ base: 12, md: 15, xl: 18 }}
									bg='#FFA000'
									w='50%'
									h={{ base: '35', lg: '45' }}
									_hover={{ bg: '#D84226' }}
									form='signup-form'
									onClick={handleSubmit}
								>
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































