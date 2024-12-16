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
	ListItem,
	UnorderedList,
} from '@chakra-ui/react';

function NewsReader() {
	const [newsData, setNewsData] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const { isOpen, onOpen, onClose } = useDisclosure();

	// Función para leer el archivo CSV localmente
	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			const { data, error } = await getNewsFromDatabase();
			if (!error) {
				setNewsData(data);
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
													overflowWrap='break-word'
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
												{new Date(row.pubDate).toLocaleDateString('en-US', {
													timeZone: 'UTC',
												})}
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
							criptomonedas. Esto permite a nuestros usuarios mantenerse
							informados sobre las tendencias, desarrollos y eventos más
							recientes que pueden influir en el mercado.
						</Text>
						<Text
							fontWeight='bold'
							my='1rem'>
							Fuentes de Información
						</Text>
						<Text>
							Las noticias se obtienen de una selección de fuentes confiables y
							reconocidas en el sector de criptomonedas:
						</Text>
						<UnorderedList>
							<ListItem>
								<strong>Cointelegraph:</strong> Noticias, análisis y opiniones
								sobre el mercado de criptomonedas.{' '}
								<a
									href='https://cointelegraph.com/'
									target='_blank'
									rel='noopener noreferrer'>
									Ir al sitio
								</a>
							</ListItem>
							<ListItem>
								<strong>Bitcoin Magazine:</strong> Actualizaciones sobre
								Bitcoin, blockchain y su ecosistema.{' '}
								<a
									href='https://bitcoinmagazine.com/'
									target='_blank'
									rel='noopener noreferrer'>
									Ir al sitio
								</a>
							</ListItem>
							<ListItem>
								<strong>CryptoPotato:</strong> Cobertura de noticias globales
								sobre criptomonedas.{' '}
								<a
									href='https://cryptopotato.com/'
									target='_blank'
									rel='noopener noreferrer'>
									Ir al sitio
								</a>
							</ListItem>
							<ListItem>
								<strong>CryptoSlate:</strong> Noticias, análisis y datos de
								mercado.{' '}
								<a
									href='https://cryptoslate.com/'
									target='_blank'
									rel='noopener noreferrer'>
									Ir al sitio
								</a>
							</ListItem>
							<ListItem>
								<strong>CryptoNews:</strong> Actualizaciones rápidas sobre
								criptomonedas y tendencias del mercado.{' '}
								<a
									href='https://cryptonews.com/'
									target='_blank'
									rel='noopener noreferrer'>
									Ir al sitio
								</a>
							</ListItem>
						</UnorderedList>

						<Text
							fontWeight='bold'
							my='1rem'>
							Ventajas de Esta Sección
						</Text>
						<UnorderedList>
							<ListItem>
								<strong>Actualización en Tiempo Real:</strong> Acceso a las
								últimas noticias del mercado de criptomonedas.
							</ListItem>
							<ListItem>
								<strong>Fuentes Confiables:</strong> La información proviene de
								medios reconocidos por su cobertura profesional y precisa.
							</ListItem>
							<ListItem>
								<strong>Perspectiva Integral:</strong> Obtén una visión clara
								del panorama actual en el mercado de criptomonedas.
							</ListItem>
						</UnorderedList>
						<Text
							fontWeight='bold'
							my='1rem'>
							Nota Importante
						</Text>
						<Text>
							Esta sección es informativa y no debe considerarse asesoramiento
							financiero. Recomendamos analizar cuidadosamente la información
							antes de tomar decisiones relacionadas con inversiones.
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
