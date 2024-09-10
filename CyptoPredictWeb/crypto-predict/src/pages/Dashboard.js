import React, { useState } from 'react';
import {
    Box,
    Wrap,
    WrapItem,
} from '@chakra-ui/react'
import SideBar from './Sidebar.js'
import Bitcoinchart from './Bitcoinchart.js';


export default function Dashboard() {

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
                justifyItems='center'
                overflow='auto'
                m='auto'
            >
                <Wrap
                    align='center'
                    justify='center'
                    spacing='3vw'
                >
                    <WrapItem
                        mt={{ base: 5, lg: 0 }}
                        borderRadius='30px'
                        bg='#3c3c3c'
                        w={{ base: '85vw', md: '70vh', lg: '32vw' }}
                        h={{ base: '30vh', sm: '50vh', md: '40vh' }}
                        overflow='auto'
                        flexDirection='column'
                        justifyContent='space-between'
                        alignContent='center'
                    >

                    </WrapItem>

                    <WrapItem
                        borderRadius='30px'
                        bg='#3c3c3c'
                        w={{ base: '85vw', md: '70vh', lg: '32vw' }}
                        h={{ base: '30vh', sm: '50vh', md: '40vh' }}
                        overflow='auto'
                        flexDirection='column'
                        justifyContent='space-between'
                        alignContent='center'
                        p={3}
                    >
                        <Bitcoinchart />
                    </WrapItem>

                    <WrapItem
                        borderRadius='30px'
                        bg='#3c3c3c'
                        w={{ base: '85vw', md: '70vh', lg: '32vw' }}
                        h={{ base: '30vh', sm: '50vh', md: '40vh' }}
                        overflow='auto'
                        flexDirection='column'
                        justifyContent='space-between'
                        alignContent='center'
                    >

                    </WrapItem>

                    <WrapItem
                        // m='auto'
                        borderRadius='30px'
                        bg='#3c3c3c'
                        w={{ base: '85vw', md: '70vh', lg: '32vw' }}
                        h={{ base: '30vh', sm: '50vh', md: '40vh' }}
                        overflow='auto'
                        flexDirection='column'
                        justifyContent='space-between'
                        alignContent='center'
                        mb={{ base: 5, lg: 0 }}
                    >

                    </WrapItem>
                </Wrap>
            </Box>
        </Box >
    )
}