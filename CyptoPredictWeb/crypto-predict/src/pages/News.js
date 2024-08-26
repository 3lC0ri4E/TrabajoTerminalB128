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



export default function News() {

    return (
        <Box
            display={'flex'}
            flexDirection={{ base: 'column', md: 'row' }}
            h='100vh'
        >
            <SideBar />
            <Box
                flex={{ md: 1 }}
                h='100vh'
                alignContent='center'
            >
                <Box
                    m='auto'
                    // p={3}
                    borderRadius='30px'
                    bg='#3c3c3c'
                    w={{ base: '80vw', md: '60vw' }}
                    h={{ base: '75vh', md: '85vh' }}
                    // h={{ base: '90%', md: '75%' }}
                    overflow='auto'
                    flexDirection='column'
                    justifyContent='space-between'
                    alignContent='center'
                >
                </Box>
            </Box>
        </Box>
    )
}