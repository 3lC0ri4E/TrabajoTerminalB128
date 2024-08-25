import React, { useEffect } from 'react';
import {
    Box,
    Text,
    Button,
    Input,
    FormErrorMessage,
    InputRightElement,
    Stack,
    FormControl,
    InputGroup,
    SimpleGrid,
    Wrap,
    WrapItem
} from '@chakra-ui/react'
import Navbar from './Navbar'
import BitcoinChart from './Bitcoinchart';
import BitcoinLineChart from './Bitcoinlinechart';

export default function Main() {

    return (
        <Box
        // overflow='auto'
        >
            <Navbar />
            <Wrap
                align='center'
                justify='center'
                spacing={5}
            >
                <WrapItem>
                    <Box
                        w={{ base: '80vw', md: '45vw' }}
                        // h='70vh'
                        m={6}
                    // m='auto'
                    // bg='#ffffff'
                    >
                        <Text
                            fontWeight={600}
                            fontSize={{ base: 25, md: 35, xl: 50 }}
                            p={[1, 2, 4, 5]}
                            textAlign='left'
                        >
                            El futuro de las
                            <Box
                                as="span"
                                color="#64e400 "
                            >
                                &nbsp;inversiones&nbsp;
                            </Box>
                            está aquí
                        </Text>
                        <Text
                            fontSize={{ base: 15, md: 20, xl: 30 }}
                            fontWeight={450}
                            p={[1, 2, 4, 5]}
                            textAlign='left'

                        >
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget sollicitudin purus, sed tincidunt urna.
                        </Text>
                    </Box>
                </WrapItem>
                <WrapItem>
                    <Box
                        w={{ base: '90vw', md: '45vw' }}
                        h={{ base: '50vh', md: '70vh' }}
                        mb={6}
                    >
                        {/* <BitcoinChart /> */}
                        <BitcoinLineChart />
                    </Box>
                </WrapItem>
            </Wrap>
        </Box >
    );
}
