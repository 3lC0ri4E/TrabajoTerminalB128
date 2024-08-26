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
import { useNavigate } from 'react-router-dom';


export default function LogIn() {
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const navigate = useNavigate();

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
        <Box
            display={'flex'}
            flexDirection={{ base: 'column', md: 'row' }}
            h='100vh'
        >
            <Box
                display={{ md: 'flex' }}
                borderRadius='30px'
                h='85vh'
                w='85%'
                // overflow='auto'
                p={4}
                justifyContent="center"
                alignItems="center"
                alignContent='center'
                m='auto'
                bg='#3d3d3d'
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
                        boxSize='25%'
                        display='block'
                        m='auto'
                        onClick={() => navigate('/')}
                    />
                    <Text
                        fontWeight={450}
                        fontSize={{ base: 25, md: 35, xl: 45 }}
                        mt={[1, 2, 4, 5]}
                    >
                        ¡Bienvenido!
                    </Text>
                    <Text
                        fontSize={{ base: 15, md: 20, xl: 30 }}
                        fontWeight={450}
                        m={[1, 2, 4, 5]}
                    >
                        Por favor, inicia sesión para continuar
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
                            pl={'10%'}
                            pr={'10%'}
                        >
                            <FormControl isInvalid={errors.email || errors.password}>
                                <FormLabel
                                    htmlFor="email"
                                    mt={[3, 5, 10]}
                                    fontSize={{ base: 12, md: 15 }}
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
                                    mb={{ base: 2, md: 5 }}
                                />
                                {errors.email && (
                                    <FormErrorMessage
                                        mt={{ base: "-5px", md: '-15px' }}
                                        mb="10px"
                                        ml="10px"
                                        fontSize={{ base: 10, md: 15 }}
                                    >
                                        {errors.email}
                                    </FormErrorMessage>
                                )}
                                <FormLabel
                                    htmlFor="password"
                                    mt={1}
                                    fontSize={{ base: 12, md: 15 }}
                                    fontWeight="normal"
                                >
                                    Contraseña
                                </FormLabel>
                                <InputGroup>
                                    <Input

                                        size={['xs', 'xs', 'sm', 'md']}
                                        padding="15px"
                                        variant="flushed"
                                        name="password"
                                        id="login_password"
                                        type={show ? 'text' : 'password'}
                                        placeholder="*********"
                                        value={values.password}
                                        onChange={handleChange}
                                        mb={{ base: 2, md: 5 }}
                                    />
                                    <InputRightElement width='4.5rem'>
                                        <Button
                                            h='1.75rem'
                                            size='sm'
                                            onClick={handleClick}
                                            bg='#3d3d3d'
                                            color='#ffffff'
                                            _hover={{ bg: '#505967' }}
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
                                        fontSize={{ base: 10, md: 15 }}
                                    >
                                        {errors.password}
                                    </FormErrorMessage>
                                )}
                            </FormControl>
                        </Stack>
                    </form>
                    <Text
                        mt={{ base: 2, md: 4 }}

                        fontSize={{ base: 12, lg: 15 }}
                    >
                        <Box
                            as="span"
                            color="#FFA000"
                        >
                            ¿No tienes cuenta?&nbsp;
                        </Box>
                        Regístrate
                    </Text>

                    <Text
                        m={[2, 3, 4, 5]}
                        fontSize={{ base: 12, lg: 15 }}
                    >
                        Olvidé mi Contraseña
                    </Text>
                    <Box alignContent='center'>
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
                            Iniciar Sesión
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box >
    );
}
