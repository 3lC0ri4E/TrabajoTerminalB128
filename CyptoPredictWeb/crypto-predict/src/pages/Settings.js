import React, { useState } from 'react';
import {
    Box,
    Text,
    Button,
    Input,
    FormErrorMessage,
    InputRightElement,
    Stack,
    FormControl,
    InputGroup
} from '@chakra-ui/react'
import SideBar from './Sidebar.js'

import useValidation from '../hooks/useValidation'
import validateSettingsForm from '../hooks/validation/SettingsForm'


export default function Settings() {

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    const initialState = {
        name: '',
        lastname: '',
        username: '',
        email: '',
        password: '',
        confirmpassword: ''
    };
    const { values, errors, submitForm, handleSubmit, handleChange } =
        useValidation(initialState, validateSettingsForm, onSubmit);
    async function onSubmit() {
        try {
            console.log(values)
        } catch {
            console.log('No Pasa')
        }
    }

    return (
        <Box
            display={'flex'}
            flexDirection={{ base: 'column', md: 'row' }}

            //  w={[0, 0, '70%', '80%', '75%']}
            h='100vh'

        // bg='#ffffff'

        >
            <SideBar />
            <Box
                // p={5}
                // m={'auto'}
                flex={{ md: 1 }}
                h='100vh'
                // alignItems='center'
                alignContent='center'
            // justifyContent='space-between'

            // justifyItems='center'
            // bg='#ffffff'
            >

                <Box
                    m='auto'
                    // p={3}
                    borderRadius='30px'
                    bg='#3c3c3c'
                    w={'80%'}
                    // h={'80%'}

                    // h={{ base: '90%', md: '75%' }}
                    overflow='auto'
                    flexDirection='column'
                    justifyContent='space-between'
                    alignContent='center'

                >
                    <Text
                        pt={4}
                        fontWeight={450}
                        // fontSize='300%'
                        fontSize={{ base: 15, md: 20, xl: 30 }}
                    // m={[1, 2, 4, 5]}
                    >
                        Información de Perfil
                    </Text>

                    <form id='login-form'>
                        <Stack
                            pl={'10%'}
                            pr={'10%'}
                        >
                            <FormControl isInvalid={errors.email || errors.password}>
                                <Input
                                    // mt={6}
                                    size={['xs', 'xs', 'sm', 'md']}
                                    padding="15px"
                                    variant="flushed"
                                    name="name"
                                    id="name"
                                    type="text"
                                    placeholder="Nombre(s)"
                                    onChange={handleChange}
                                    value={values.name}
                                    mb={{ base: 2, md: 5 }}
                                // w={{ base: '90%', md: '75%' }}
                                />
                                {errors.name && (
                                    <FormErrorMessage
                                        mt={{ base: "-5px", md: '-15px' }}
                                        mb="10px"
                                        ml="10px"
                                        fontSize={{ base: 10, md: 15, xl: 20 }}
                                    >
                                        {errors.name}
                                    </FormErrorMessage>
                                )}
                                <Input
                                    size={['xs', 'xs', 'sm', 'md']}
                                    padding="15px"
                                    variant="flushed"
                                    name="lastname"
                                    id="lastname"
                                    type="text"
                                    placeholder="Apellido(s)"
                                    onChange={handleChange}
                                    value={values.lastname}
                                    mb={[2, 2, 5, 5]}
                                // w={{ base: '90%', md: '75%' }}

                                />
                                {errors.lastname && (
                                    <FormErrorMessage
                                        mt={{ base: "-5px", md: '-15px' }}
                                        mb="10px"
                                        ml="10px"
                                        fontSize={{ base: 10, md: 15, xl: 20 }}
                                    >
                                        {errors.lastname}
                                    </FormErrorMessage>
                                )}
                                <Input
                                    size={['xs', 'xs', 'sm', 'md']}
                                    padding="15px"
                                    variant="flushed"
                                    name="username"
                                    id="username"
                                    type="text"
                                    placeholder="Nombre de Usuario"
                                    onChange={handleChange}
                                    value={values.username}
                                    mb={[2, 2, 5, 5]}
                                // w={{ base: '90%', md: '75%' }}

                                />
                                {errors.username && (
                                    <FormErrorMessage
                                        mt={{ base: "-5px", md: '-15px' }}
                                        mb="10px"
                                        ml="10px"
                                        fontSize={{ base: 10, md: 15, xl: 20 }}
                                    >
                                        {errors.username}
                                    </FormErrorMessage>
                                )}
                                <Input
                                    size={['xs', 'xs', 'sm', 'md']}
                                    padding="15px"
                                    variant="flushed"
                                    name="email"
                                    id="email"
                                    type="email"
                                    placeholder="Correo Electrónico"
                                    onChange={handleChange}
                                    value={values.email}
                                    mb={[2, 2, 5, 5]}
                                // w={{ base: '90%', md: '75%' }}

                                />
                                {errors.email && (
                                    <FormErrorMessage
                                        mt={{ base: "-5px", md: '-15px' }}
                                        mb="10px"
                                        ml="10px"
                                        fontSize={{ base: 10, md: 15, xl: 20 }}
                                    >
                                        {errors.email}
                                    </FormErrorMessage>
                                )}

                                <Text
                                    fontWeight={450}
                                    fontSize={{ base: 15, md: 20, xl: 30 }}

                                    m={[1, 2, 4, 5]}
                                >
                                    Confirmación de Contraseña
                                </Text>
                                <InputGroup>
                                    <Input
                                        size={['xs', 'xs', 'sm', 'md']}
                                        padding="15px"
                                        variant="flushed"
                                        name="password"
                                        id="password"
                                        // type="password"
                                        type={show ? 'text' : 'password'}
                                        placeholder="Contraseña"
                                        value={values.password}
                                        onChange={handleChange}
                                        mb={[2, 2, 5, 5]}
                                    // w={{ base: '90%', md: '75%' }}

                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button
                                            h={['20px', '20px', '22px', '35px']}
                                            size='sm'
                                            onClick={handleClick}
                                            bg='#3d3d3d'
                                            color='#ffffff'
                                            _hover={{ bg: '#505967' }}
                                            fontSize={{ base: 10, lg: 12 }}
                                        // w={{ base: '90%', md: '75%' }}
                                        >
                                            {show ? 'Esconder' : 'Mostrar'}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                                {errors.password && (
                                    <FormErrorMessage
                                        mt={{ base: "-5px", md: '-15px' }}
                                        mb="10px"
                                        ml="10px"
                                        fontSize={{ base: 10, md: 15, xl: 20 }}
                                    >
                                        {errors.password}
                                    </FormErrorMessage>
                                )}
                                <Input
                                    size={['xs', 'xs', 'sm', 'md']}
                                    padding="15px"
                                    variant="flushed"
                                    name="confirmpassword"
                                    id="confirm password"
                                    // type="password"
                                    type={show ? 'text' : 'password'}
                                    placeholder="Confirmar Contraseña"
                                    value={values.confirmpassword}
                                    onChange={handleChange}
                                    mb={{ base: 2, md: 5 }}
                                // w={{ base: '90%', md: '75%' }}
                                />
                                {errors.confirmpassword && (
                                    <FormErrorMessage
                                        mt={{ base: "-5px", md: '-15px' }}
                                        mb="10px"
                                        ml="10px"
                                        fontSize={{ base: 10, md: 15, xl: 20 }}
                                    >
                                        {errors.confirmpassword}
                                    </FormErrorMessage>
                                )}
                            </FormControl>
                        </Stack>
                    </form>

                    <Box
                        alignContent='center'
                        pt={5}
                        mb={4}
                    >
                        <Button
                            fontSize={{ base: 12, md: 15, xl: 18 }}

                            bg='#FFA000'
                            w="50%"
                            h={{ base: '35', lg: '45' }}

                            _hover={{
                                bg: '#D84226'
                            }}
                            form="login-form"
                            onClick={handleSubmit}
                        >
                            Guardar Cambios
                        </Button>
                    </Box>

                </Box>
            </Box>



        </ Box >
    )
}