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
    Flex,
    FormLabel,
    FormErrorMessage,
    FormControl,
    Image
} from '@chakra-ui/react';
import useValidation from '../hooks/useValidation';
import validateLoginForm from '../hooks/validation/LoginForm';

export default function Login() {
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
                            ¡Bienvenido!
                        </Text>
                        <Text
                            fontSize={[14, 18, 20, 20]}
                            fontWeight={450}
                            m={[1, 2, 4, 5]}
                        >
                            Por favor, inicia sesión para continuar
                        </Text>
                        <Text
                            fontSize={[12, 16, 15, 16]}
                        >
                            <Box
                                as="span"
                                color="#FFA000"
                            >
                                ¿No tienes cuenta?&nbsp;
                            </Box>
                            Regístrate
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
                            Iniciar Sesión
                        </Text>
                        <Divider />
                        <form id='login-form'>
                            <Stack
                            // spacing={10}
                            // w='90%'
                            >
                                <FormControl isInvalid={errors.email || errors.password}>
                                    <FormLabel
                                        htmlFor="email"
                                        mt={[3, 5, 10, 10]}
                                        fontSize={[12, 12, 15, 15]}
                                        fontWeight="normal"
                                    >
                                        Correo Electrónico
                                    </FormLabel>
                                    <Input
                                        size={['xs', 'xs', 'sm', 'md']}
                                        padding="15px"
                                        variant="flushed"
                                        name="email"
                                        id="login_email"
                                        type="email"
                                        placeholder="ejemplo@ejemplo.com"
                                        onChange={handleChange}
                                        value={values.email}
                                        mb={[2, 2, 5, 5]}
                                    />
                                    {errors.email && (
                                        <FormErrorMessage mt="-15px" mb="10px" ml="10px">
                                            {errors.email}
                                        </FormErrorMessage>
                                    )}
                                    <FormLabel
                                        htmlFor="password"
                                        mt={1}
                                        fontSize={[12, 12, 15, 15]}
                                        fontWeight="normal"
                                    >
                                        Contraseña
                                    </FormLabel>
                                    <Input
                                        size={['xs', 'xs', 'sm', 'md']}
                                        padding="15px"
                                        variant="flushed"
                                        name="password"
                                        id="login_password"
                                        type="password"
                                        placeholder="*********"
                                        value={values.password}
                                        onChange={handleChange}
                                        mb={[2, 2, 5, 5]}
                                    />
                                    {errors.password && (
                                        <FormErrorMessage mt="-15px" mb="10px" ml="10px">
                                            {errors.password}
                                        </FormErrorMessage>
                                    )}
                                </FormControl>
                            </Stack>
                        </form>
                        <Text
                            m={[2, 3, 4, 5]}
                            fontSize={[10, 10, 12, 18]}
                        >
                            Olvidé mi Contraseña
                        </Text>
                        <Box alignContent='center'>
                            <Button

                                fontSize={[15, 15, 15, 22]}
                                bg='#FFA000'
                                w="50%"
                                // h="45"
                                // mb="20px"
                                // color="white"
                                // mt="20px"
                                _hover={{
                                    bg: '#D84226'
                                }}
                                form="login-form"
                                onClick={handleSubmit}
                            >
                                Iniciar Sesión
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </AbsoluteCenter>
        </div >
    );
}
