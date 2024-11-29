/** @format */
import React, { useState } from 'react';
import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	Input,
	Stack,
	Text,
	useDisclosure,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	FormLabel,
	useToast,
	InputRightElement,
	InputGroup,
} from '@chakra-ui/react';
import validatePasswordForm from '../hooks/validation/ChangePasswordForm'; // Validador específico
import useValidation from '../hooks/useValidation';
import { updatePassword } from '../supabase/supabase_functions'; // Asegúrate de que esta importación sea correcta
import { useNavigate } from 'react-router-dom';

export default function ChangePassword() {
	const [show, setShow] = useState(false);
	const handleClick = () => setShow(!show);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();
	const toast = useToast();
	const navigate = useNavigate();

	const initialState = {
		email: '',
		password: '',
		confirmpassword: '',
	};

	const { values, errors, handleSubmit, handleChange } = useValidation(
		initialState,
		validatePasswordForm,
		onSubmit
	);

	async function onSubmit() {
		const toastId = toast({
			title: 'Actualizando contraseña',
			description: 'Por favor, espera mientras actualizamos tu contraseña...',
			status: 'info',
			duration: null,
			isClosable: true,
			position: 'top',
		});

		try {
			if (values.password !== values.confirmpassword) {
				toast.update(toastId, {
					title: 'Error',
					description: 'Las contraseñas nuevas no coinciden.',
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
				return;
			}

			const user = await updatePassword(values.email, values.password);

			if (user) {
				toast.update(toastId, {
					title: 'Contraseña actualizada',
					description: 'Tu contraseña ha sido actualizada correctamente.',
					status: 'success',
					duration: 5000,
					isClosable: true,
				});
				navigate('/dashboard'); // Redirige al dashboard o la página que desees
			} else {
				toast.update(toastId, {
					title: 'Error',
					description:
						'No se pudo actualizar tu contraseña. Inténtalo de nuevo.',
					status: 'error',
					duration: 5000,
					isClosable: true,
				});
			}
		} catch (error) {
			toast.update(toastId, {
				title: 'Error al actualizar',
				description: error.message || 'Ocurrió un error inesperado.',
				status: 'error',
				duration: 5000,
				isClosable: true,
			});
		}
	}

	return (
		<Box
			h={{ base: '60vh', md: '70vh' }}
			alignContent='center'
	justifyItems="space-between"
		>
			<Text
				fontWeight={450}
				fontSize={{ base: 18, xl: 20 }}
				mb={3}
			>
				Cambiar Contraseña
			</Text>

			<form
				id='password-form'
				onSubmit={handleSubmit}>
				<Stack px={'10%'}>
					{/* Campo de Email */}
					<FormControl isInvalid={errors.email}>
						<FormLabel
							htmlFor='email'
							mt={3}
							fontSize={{ base: 12 }}
							fontWeight='normal'>
							Correo Electrónico
						</FormLabel>
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
						/>
						{errors.email && (
							<FormErrorMessage
								mt={{ base: '2px', md: '5px' }}
								mb='10px'
								ml='10px'
								fontSize={{ base: 10, md: 12 }}>
								{errors.email}
							</FormErrorMessage>
						)}
					</FormControl>

					<FormControl isInvalid={errors.password}>
						<FormLabel
							mt={3}
							htmlFor='password'
							fontSize={{ base: 12 }}
							fontWeight='normal'>
							Nueva Contraseña
						</FormLabel>
						<InputGroup>
							<Input
								size={{ base: 'sm' }}
								padding='15px'
								variant='flushed'
								name='password'
								id='password'
								type={show ? 'text' : 'password'}
								placeholder='Nueva Contraseña'
								onChange={handleChange}
								value={values.password}
							/>
							<InputRightElement width='4.5rem'>
								<Button
									h={{ base: '20px', sm : '10px', xl: '20px' }}
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
								mt={{ base: '2px', md: '5px' }}
								mb='10px'
								ml='10px'
								fontSize={{ base: 10, md: 12 }}>
								{errors.password}
							</FormErrorMessage>
						)}
					</FormControl>

					<FormControl isInvalid={errors.confirmpassword}>
						<FormLabel
							mt={3}
							htmlFor='confirmpassword'
							fontSize={{ base: 12 }}
							fontWeight='normal'>
							Confirmar Nueva Contraseña
						</FormLabel>
						<InputGroup>
							<Input
								size={{ base: 'sm' }}
								padding='15px'
								variant='flushed'
								name='confirmpassword'
								id='confirmpassword'
								type={show ? 'text' : 'password'}
								placeholder='Confirmar Nueva Contraseña'
								onChange={handleChange}
								value={values.confirmpassword}
							/>
							{errors.confirmpassword && (
								<FormErrorMessage
									mt={{ base: '2px', md: '5px' }}
									mb='10px'
									ml='10px'
									fontSize={{ base: 10, md: 12 }}	
								>
									{errors.confirmpassword}
								</FormErrorMessage>
							)}
						</InputGroup>
					</FormControl>
				</Stack>
			</form>

			<Box
				alignContent='center'
				mt={3}
			>
				<Button
					mt={3}
					fontSize={{ md: 12, lg: 15 }}
					bg='#FFA000'
					w={{ base: '40vw', md: '15vw', lg: '17vw' }}
					h={{ base: '35' }	}
					_hover={{ bg: '#D84226' }}
					form='password-form'
					onClick={onOpen}>
					Guardar Cambios
				</Button>
			</Box>

			<AlertDialog
				isOpen={isOpen}
				onClose={onClose}
				leastDestructiveRef={cancelRef}>
				<AlertDialogOverlay>
					<AlertDialogContent
						maxW={{ base: '90%', sm: '80%', md: '60%', lg: '40%' }}
						mx='auto'>
						<AlertDialogHeader
							fontSize='lg'
							fontWeight='bold'>
							Confirmar Cambios
						</AlertDialogHeader>
						<AlertDialogBody>
							¿Estás seguro de que deseas guardar los cambios realizados en tu
							contraseña?
						</AlertDialogBody>
						<AlertDialogFooter>
							<Button
								ref={cancelRef}
								onClick={onClose}>
								Cancelar
							</Button>
							<Button
								colorScheme='teal'
								onClick={handleSubmit}
								bg='#D84226'
								h={{ base: '35px', lg: '45px' }}
								_hover={{ bg: '#FFA000' }}
								ml={3}>
								Confirmar
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</Box>
	);
}
