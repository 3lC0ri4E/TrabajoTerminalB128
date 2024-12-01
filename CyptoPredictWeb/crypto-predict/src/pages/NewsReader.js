import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Box,
    Button,
    Flex,
    Spinner,
    useBreakpointValue,
} from '@chakra-ui/react';

function NewsReader() {
    const [csvData, setCsvData] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true); 

    // Función para leer el archivo CSV localmente
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); 

            const response = await fetch('./docs/news_data.csv');
            const blob = await response.blob();
            const text = await blob.text();

            Papa.parse(text, {
                header: true,
                complete: (result) => {
                    const sortedData = result.data
                        .sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate))
                        .slice(0, 100); // Limitar a las primeras 100 noticias

                    setCsvData(sortedData);
                    setIsLoading(false); // Terminar carga
                },
                skipEmptyLines: true,
            });
        };

        fetchData();
    }, []);

    const handleRowClick = (link) => {
        window.open(link, '_blank');
    };

    // Determinar el tamaño de los elementos por página según el tamaño de la pantalla
    const itemsPerPage = useBreakpointValue({ base: 4, sm: 4, md: 4});

    // Dividir las noticias en grupos según el tamaño de la pantalla
    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const paginatedData = chunkArray(csvData, itemsPerPage || 5); // Fallback de 5 si no se define

    // Controladores de navegación de páginas
    const goToPreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const goToNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, paginatedData.length - 1));
    };

    if (isLoading) {
        // Mostrar un spinner mientras se cargan los datos
        return (
            <Box display="flex" justifyContent="center" alignItems="center" h="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    return (
        <Box m="auto" w="100%" maxW="100%" overflow="auto" p={4}>
            {csvData.length > 0 && (
                <>
                    <TableContainer display="block" overflowY="auto" overflowX="auto">
                        <Table variant="simple" size="md">
                            <Thead>
                                <Tr>
                                    <Th
                                        color={'white'}
                                        fontSize={{ base: 12 }}
                                    >Título</Th>
                                    <Th
                                        color={'white'}
                                          fontSize={{ base: 12 }}
                                    >Fecha</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {paginatedData[currentPage]?.map((row, index) => (
                                    <Tr
                                        key={index}
                                        onClick={() => handleRowClick(row.link)}
                                        _hover={{
                                            cursor: 'pointer',
                                            opacity: 0.3,
                                        }}>
                                        <Td
                                           fontSize={{ base: 12, lg: 15 }}
                                        >
                                            <Box whiteSpace="normal" wordWrap="break-word" lineHeight="1.2em">
                                                <strong>{row.title}</strong>
                                                <Box
                                                  fontSize={{ base: 10, lg: 12 }}
                                                    color="#FFA000">
                                                    {row.site}
                                                </Box>
                                            </Box>
                                        </Td>
                                        <Td
                                            fontSize={{ base: 12, md: 15 }}
                                        >{new Date(row.pubDate).toLocaleDateString()}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>

                    {/* Controles de navegación */}
                    <Flex justify="space-between" mt={4}>
                        <Button
                            onClick={goToPreviousPage}
                            isDisabled={currentPage === 0}
                            fontSize={{ md: 12, lg: 15 }}
                            bg='#FFA000'
                            w={{ md: '15vw', lg: '12vw' }}
                            color='black'
                            _hover={{ bg: '#D84226' }}
                            transition='0.3s'
                        >
                            {'<<'}
                        </Button>
                        <Button
                            onClick={goToNextPage}
                            isDisabled={currentPage === paginatedData.length - 1}
                            fontSize={{ md: 12, lg: 15 }}
                            bg='#FFA000'
                            w={{ md: '15vw', lg: '12vw' }}
                            color='black'
                            _hover={{ bg: '#D84226' }}
                            transition='0.3s'
                            
                        >
                            {">>"}
                        </Button>
                    </Flex>
                </>
            )}
        </Box>
    );
}

export default NewsReader;
