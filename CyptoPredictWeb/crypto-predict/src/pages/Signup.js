/** @format */

import React, { useState } from 'react';
import {
    Input,
    Stack,
    Text,
    Button,
    Divider,
    AbsoluteCenter,
    Box,
    FormLabel,
    FormErrorMessage,
    FormControl,
    Image,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react';
import useValidation from '../hooks/useValidation';
import validateLoginForm from '../hooks/validation/LoginForm';

export default function SignUp() {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const initialState = {
        email: '',
        password: '',
    };

    const { values, errors, submitForm, handleSubmit, handleChange } =
        useValidation(initialState, validateLoginForm, onSubmit);

    async function onSubmit() {
        try {
            console.log(values);
        } catch {
            console.log('No Pasa');
        }
    }

    return (
        <div>
            <AbsoluteCenter
                w='85%'
                h='100%'
                display="flex"
                alignItems="center"
                justifyContent="center"
                m='auto'
            >
                <Box
                    display={{ md: 'flex' }} borderRadius='30px'
                    h='80%'
                    bg='#3d3d3d'
                    overflow='auto'
                    p={4}
                >
                    <Box
                        flexShrink={0}
                        flex='1'
                        textAlign='center'
                        justifyContent='center'
                        m='auto'
                        p={[5]}
                    >
                        <Image
                            src='/images/Logo.jpg'
                            alt='CryptoPredict Logo'
                            borderRadius='20px'
                            boxSize='40%'
                            display='block'
                            m='auto'
                        />
                        <Text
                            fontWeight={450}
                            // fontSize='300%'
                            fontSize={[24, 30, 30, 40]}
                            m={[1, 2, 4, 5]}
                        >
                            ¡Bienvenido a CryptoPredict!
                        </Text>
                    </Box>


                    <Box
                        flex='1'
                        p={{ md: 10 }}
                        display='flex'
                        flexDirection='column'
                        justifyContent="center"
                    >
                        <Text
                            // bg='#3d3d3d'
                            fontSize={[16, 18, 20, 24]}
                            fontWeight={450}
                            mb={[2, 2, 3, 3]}
                        >
                            Crear Cuenta
                        </Text>
                        <Divider />
                        <form id='login-form'>
                            <Stack>
                                <FormControl isInvalid={errors.email || errors.password}>
                                    <Input
                                        mt={6}
                                        size={['xs', 'xs', 'sm', 'md']}
                                        padding="15px"
                                        variant="flushed"
                                        name="name"
                                        id="name"
                                        type="text"
                                        placeholder="Nombre(s)"
                                        onChange={handleChange}
                                        value={values.name}
                                        mb={[2, 2, 5, 5]}
                                    />
                                    {errors.name && (
                                        <FormErrorMessage mt="-15px" mb="10px" ml="10px">
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
                                    />
                                    {errors.lastname && (
                                        <FormErrorMessage mt="-15px" mb="10px" ml="10px">
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
                                    />
                                    {errors.username && (
                                        <FormErrorMessage mt="-15px" mb="10px" ml="10px">
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
                                    />
                                    {errors.email && (
                                        <FormErrorMessage mt="-15px" mb="10px" ml="10px">
                                            {errors.email}
                                        </FormErrorMessage>
                                    )}
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
                                        />
                                        <InputRightElement width='4.5rem'>
                                            <Button
                                                h={['20px', '20px', '22px', '35px']}
                                                size='sm'
                                                onClick={handleClick}
                                                bg='#3d3d3d'
                                                color='#ffffff'
                                                _hover={{ bg: '#505967' }}
                                                fontSize={[10, 10, 10, 12]}
                                            >
                                                {show ? 'Esconder' : 'Mostrar'}
                                            </Button>
                                        </InputRightElement>
                                        {errors.password && (
                                            <FormErrorMessage mt="-15px" mb="10px" ml="10px">
                                                {errors.password}
                                            </FormErrorMessage>
                                        )}
                                    </InputGroup>

                                    <Input
                                        size={['xs', 'xs', 'sm', 'md']}
                                        padding="15px"
                                        variant="flushed"
                                        name="password"
                                        id="confirm_password"
                                        // type="password"
                                        type={show ? 'text' : 'password'}
                                        placeholder="Confirmar Contraseña"
                                        value={values.confirmpassword}
                                        onChange={handleChange}
                                        mb={[2, 2, 5, 5]}
                                    />
                                    {errors.confirmpassword && (
                                        <FormErrorMessage mt="-15px" mb="10px" ml="10px">
                                            {errors.confirmpassword}
                                        </FormErrorMessage>
                                    )}


                                </FormControl>
                            </Stack>
                        </form>
                        <Box
                            alignContent='center'
                            pt={5}>
                            <Button
                                fontSize={[15, 15, 15, 22]}
                                bg='#FFA000'
                                w="50%"
                                _hover={{
                                    bg: '#D84226'
                                }}
                                form="login-form"
                                onClick={handleSubmit}
                            >
                                Registrarse
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </AbsoluteCenter>
        </div >
    );
}
