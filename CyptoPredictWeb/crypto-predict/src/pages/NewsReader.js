/** @format */

import React, { useState, useEffect } from 'react';
import { getNewsFromDatabase } from '../supabase/supabase_functions.js';
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
	Skeleton,
	useBreakpointValue,
	Tooltip,
	Image,
	useDisclosure,
	Modal,
	ModalContent,
	ModalBody,
	Text,
	ModalFooter,
	ModalHeader,
} from '@chakra-ui/react';

function NewsReader() {
	const [newsData, setNewsData] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const { isOpen, onOpen, onClose } = useDisclosure();

	// Función para leer las noticias de la base de datos
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const { data, error } = await getNewsFromDatabase();
			console.log('Noticias obtenidas:', data);
			if (error) {
				console.error(
					'Error al obtener las noticias de la base de datos:',
					error.message
				);
			} else {
				setNewsData(data);
				console.log('Noticias obtenidas:', data);
			}
			setIsLoading(false);
		};
		fetchData();
	}, []);


	const handleRowClick = (link) => {
		window.open(link, '_blank');
	};

	const itemsPerPage = useBreakpointValue({ base: 4, sm: 4, md: 4 });
	const chunkArray = (array, size) => {
		const result = [];
		for (let i = 0; i < array.length; i += size) {
			result.push(array.slice(i, i + size));
		}
		return result;
	};

	const paginatedData = chunkArray(newsData, itemsPerPage || 5);

	const goToPreviousPage = () => {
		setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
	};

	const goToNextPage = () => {
		setCurrentPage((prevPage) =>
			Math.min(prevPage + 1, paginatedData.length - 1)
		);
	};

	return (
		<Box
			m='auto'
			w='100%'
			maxW='100%'
			overflow='auto'
			p={4}>
			<Box position='relative'>
				<Box
					position='absolute'
					top='10px'
					right='10px'>
					<Tooltip
						label='Información de la Sección de Noticias'
						fontSize={{ md: 'xs' }}>
						<Image
							src='/icons/info.png'
							alt='Información del Modelo'
							w={{ base: '6vw', md: '2vw' }}
							mt={-7}
							_hover={{ opacity: '0.5' }}
							onClick={onOpen}
						/>
					</Tooltip>
				</Box>
				<TableContainer
					display='block'
					overflowY='auto'
					overflowX='auto'>
					<Table
						variant='simple'
						size='md'>
						<Thead>
							<Tr>
								<Th
									color={'white'}
									fontSize={{ base: 12 }}>
									<Skeleton isLoaded={!isLoading}>Título</Skeleton>
								</Th>
								<Th
									color={'white'}
									fontSize={{ base: 12 }}>
									<Skeleton isLoaded={!isLoading}>Fecha</Skeleton>
								</Th>
							</Tr>
						</Thead>
						<Tbody>
							{isLoading
								? Array.from({ length: 5 }).map((_, index) => (
										<Tr key={index}>
											<Td>
												<Skeleton height='20px' />
											</Td>
											<Td>
												<Skeleton height='20px' />
											</Td>
										</Tr>
									))
								: paginatedData[currentPage]?.map((row, index) => (
										<Tr
											key={index}
											onClick={() => handleRowClick(row.link)}
											_hover={{
												cursor: 'pointer',
												opacity: 0.3,
											}}>
											<Td fontSize={{ base: 12, lg: 15 }}>
												<Box
													whiteSpace='normal'
													wordWrap='break-word'
													lineHeight='1.2em'>
													<strong>{row.title}</strong>
													<Box
														fontSize={{ base: 10, lg: 12 }}
														color='#FFA000'>
														{row.site}
													</Box>
												</Box>
											</Td>
											<Td fontSize={{ base: 12, md: 15 }}>
												{new Date(row.pubDate).toLocaleDateString()}
											</Td>
										</Tr>
									))}
						</Tbody>
					</Table>
				</TableContainer>

				<Flex
					justify='space-between'
					mt={4}>
					<Button
						onClick={goToPreviousPage}
						isDisabled={currentPage === 0 || isLoading}
						fontSize={{ md: 12, lg: 15 }}
						bg='#FFA000'
						w={{ md: '15vw', lg: '12vw' }}
						color='black'
						_hover={{ bg: '#D84226' }}
						transition='0.3s'>
						{'<<'}
					</Button>
					<Button
						onClick={goToNextPage}
						isDisabled={currentPage === paginatedData.length - 1 || isLoading}
						fontSize={{ md: 12, lg: 15 }}
						bg='#FFA000'
						w={{ md: '15vw', lg: '12vw' }}
						color='black'
						_hover={{ bg: '#D84226' }}
						transition='0.3s'>
						{'>>'}
					</Button>
				</Flex>
			</Box>

			<Modal
				isOpen={isOpen}
				onClose={onClose}
				isCentered
				size='lg'
				scrollBehavior='inside'
				motionPreset='slideInBottom'>
				<ModalContent
					mx='auto'
					position='absolute'
					transform='translate(-50%, -50%)'>
					<ModalHeader>Noticias del Mercado de Criptomonedas</ModalHeader>
					<ModalBody>
						<Text>
							Nuestro sistema recopila y actualiza automáticamente las noticias
							más relevantes relacionadas con Bitcoin y el mercado de
							criptomonedas...
						</Text>
					</ModalBody>
					<ModalFooter justifyContent='center'>
						<Button
							onClick={onClose}
							colorScheme='blue'>
							Cerrar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
	);
}

export default NewsReader;
