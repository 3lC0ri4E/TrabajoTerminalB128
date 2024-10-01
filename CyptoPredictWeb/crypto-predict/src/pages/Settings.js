/** @format */

import React, { useState, useEffect } from 'react';
import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	Input,
	Stack,
	Text,
	useToast,
	useDisclosure,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	FormLabel,
} from '@chakra-ui/react';
import { getUserInfo, updateUserInfo } from '../supabase/supabase_functions'; // Importa tus funciones
import useValidation from '../hooks/useValidation'; // Importa el hook
import { useNavigate } from 'react-router-dom';
import SideBar from './Sidebar.js';
import validateSettingsForm from '../hooks/validation/SettingsForm.js';

export default function Settings() {
	const [loading, setLoading] = useState(true);
	const [user, setUser] = useState(null); // Guarda el usuario autenticado
	const toast = useToast();
	const navigate = useNavigate();
	const { isOpen, onOpen, onClose } = useDisclosure(); // Para el AlertDialog
	const cancelRef = React.useRef(); // Para referenciar el botón de cancelar

	const initialState = {
		name: '',
		lastname: '',
		username: '',
		email: '',
		password: '', // Campo de contraseña eliminado
	};

	const { values, errors, handleSubmit, handleChange, setValues } =
		useValidation(initialState, validateSettingsForm, onSubmit);

	// Obtener el usuario autenticado y llenar el formulario con sus datos
	useEffect(() => {
		const fetchUser = async () => {
			const userData = await getUserInfo(); // Usa la función externa para obtener la información del usuario

			if (userData) {
				// Rellena el formulario con la información del usuario
				setValues({
					name: userData.user_metadata?.name || '',
					lastname: userData.user_metadata?.lastname || '',
					username: userData.user_metadata?.username || '',
					email: userData.email || '', // El correo electrónico no está en user_metadata
				});
				setUser(userData); // Guarda el usuario actual para futuras actualizaciones
			}
			setLoading(false);
		};
		fetchUser();
	}, [setValues]);

	async function onSubmit() {
		const toastId = toast({
			title: 'Actualizando información',
			description: 'Por favor, espera mientras actualizamos tus datos...',
			status: 'info',
			duration: null, // Mantiene el toast visible hasta que se cierre manualmente
			isClosable: true,
			position: 'top',
		});

		try {
			if (!user) return;

			// Usa la función externa para actualizar la información del usuario
			const updatedUser = await updateUserInfo(values.email, values.password, {
				name: values.name,
				lastname: values.lastname,
				username: values.username,
			});

			if (updatedUser) {
				toast.update(toastId, {
					title: 'Información actualizada',
					description: 'Tus datos han sido actualizados correctamente.',
					status: 'success',
					duration: 5000,
					isClosable: true,
				});
				navigate('/dashboard');
			} else {
				toast.update(toastId, {
					title: 'Error',
					description:
						'No se pudieron actualizar tus datos. Inténtalo de nuevo.',
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
			display={'flex'}
			flexDirection={{ base: 'column', md: 'row' }}
			h='100vh'>
			<SideBar selectedIndex={3} />
			<Box
				flex={{ md: 1 }}
				h='100vh'
				alignContent='center'>
				<Box
					m='auto'
					borderRadius='30px'
					bg='#3c3c3c'
					w={{ base: '80vw', md: '60vw' }}
					h={{ base: '75vh', md: '85vh' }}
					overflow='auto'
					flexDirection='column'
					justifyContent='space-between'
					alignContent='center'>
					{loading ? (
						<div>Cargando información del usuario...</div>
					) : (
						<>
							<Text
								pt={4}
								fontWeight={450}
								fontSize={{ base: 15, md: 20, xl: 30 }}>
								Información de Perfil
							</Text>

							<form
								id='settings-form'
								onSubmit={handleSubmit}>
								<Stack px={'10%'}>
									<FormControl isInvalid={errors.email}>
										<FormLabel
											htmlFor='email'
											mt={3}
											fontSize={{ base: 12, md: 15 }}
											fontWeight='normal'>
											Correo Electrónico
										</FormLabel>
										<Input
											size={['xs', 'xs', 'sm', 'md']}
											isDisabled={true}
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
												mt={{ base: '-5px', md: '-15px' }}
												mb='10px'
												ml='10px'
												fontSize={{ base: 10, md: 15 }}>
												{errors.email}
											</FormErrorMessage>
										)}
									</FormControl>
									<FormControl isInvalid={errors.name}>
										<FormLabel
											htmlFor='name'
											fontSize={{ base: 12, md: 15 }}
											fontWeight='normal'>
											Nombre
										</FormLabel>
										<Input
											size={['xs', 'xs', 'sm', 'md']}
											padding='15px'
											variant='flushed'
											name='name'
											id='name'
											type='text'
											placeholder='Nombre(s)'
											onChange={handleChange}
											value={values.name}
										/>
										{errors.name && (
											<FormErrorMessage
												mt={{ base: '-5px', md: '-15px' }}
												mb='10px'
												ml='10px'
												fontSize={{ base: 10, md: 15 }}>
												{errors.name}
											</FormErrorMessage>
										)}
									</FormControl>

									<FormControl isInvalid={errors.lastname}>
										<FormLabel
											htmlFor='lastname'
											fontSize={{ base: 12, md: 15 }}
											fontWeight='normal'>
											Apellido
										</FormLabel>
										<Input
											size={['xs', 'xs', 'sm', 'md']}
											padding='15px'
											variant='flushed'
											name='lastname'
											id='lastname'
											type='text'
											placeholder='Apellido(s)'
											onChange={handleChange}
											value={values.lastname}
										/>
										{errors.lastname && (
											<FormErrorMessage
												mt={{ base: '-5px', md: '-15px' }}
												mb='10px'
												ml='10px'
												fontSize={{ base: 10, md: 15 }}>
												{errors.lastname}
											</FormErrorMessage>
										)}
									</FormControl>

									<FormControl isInvalid={errors.username}>
										<FormLabel
											htmlFor='username'
											fontSize={{ base: 12, md: 15 }}
											fontWeight='normal'>
											Nombre de Usuario
										</FormLabel>
										<Input
											size={['xs', 'xs', 'sm', 'md']}
											padding='15px'
											variant='flushed'
											name='username'
											id='username'
											type='text'
											placeholder='Nombre de Usuario'
											onChange={handleChange}
											value={values.username}
										/>
										{errors.username && (
											<FormErrorMessage
												mt={{ base: '-5px', md: '-15px' }}
												mb='10px'
												ml='10px'
												fontSize={{ base: 10, md: 15 }}>
												{errors.username}
											</FormErrorMessage>
										)}
									</FormControl>
								</Stack>
							</form>

							<Box
								alignContent='center'
								pt={5}
								mb={4}>
								<Button
									fontSize={{ base: 12, md: 15, xl: 18 }}
									bg='#FFA000'
									w='50%'
									h={{ base: '35', lg: '45' }}
									_hover={{
										bg: '#D84226',
									}}
									form='settings-form'
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
										maxW={{ base: '90%', sm: '80%', md: '60%', lg: '40%' }} // Ancho responsivo
										mx='auto' // Centra el diálogo
									>
										<AlertDialogHeader
											fontSize='lg'
											fontWeight='bold'>
											Confirmar Cambios
										</AlertDialogHeader>
										<AlertDialogBody>
											¿Estás seguro de que deseas guardar los cambios realizados
											en tu perfil?
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
												h={{ base: '35px', lg: '45px' }} // Altura responsiva
												_hover={{
													bg: '#FFA000',
												}}
												ml={3}>
												Confirmar
											</Button>
										</AlertDialogFooter>
									</AlertDialogContent>
								</AlertDialogOverlay>
							</AlertDialog>
						</>
					)}
				</Box>
			</Box>
		</Box>
	);
}
