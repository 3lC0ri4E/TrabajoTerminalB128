/** @format */

import React, { useState, useEffect } from 'react';
import { getLastTAnalysis , getLastFA, /*uploadNewsWithLastAnalisis*/ } from '../supabase/supabase_functions';
import {
	Box,
	Wrap,
	WrapItem,
	Modal,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	useDisclosure,
	Text,
	Button,
	Image,
	Tooltip,
	UnorderedList,
	ListItem,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import SideBar from './Sidebar.js';
import Bitcoinchart from './Bitcoinchart.js';
import TechnicalAnalysis from './RNN.js';
import PricePrediction from './PricePrediction.js';
import FundamentalAnalysis from './BERT.js';

export default function Dashboard() {
	const navigate = useNavigate();
	const [lastTAnalysis, setLastTAnalysis] = useState(null);
	const [lastFAnalysis, setLastFAnalysis] = useState(null);
	const [TAerror, setTAError] = useState(null);

	const { isOpen, onClose } = useDisclosure(); // Modal de "Visitas Excedidas"
	const {
		isOpen: isTechnicalModalOpen,
		onOpen: onTechnicalOpen,
		onClose: onTechnicalClose,
	} = useDisclosure();

	const {
		isOpen: isFundamentalModalOpen,
		onOpen: onFundamentalOpen,
		onClose: onFundamentalClose,
	} = useDisclosure();

	useEffect(() => {
		const fetchLastAnalysis = async () => {
			const { data, error } = await getLastTAnalysis();
			if (error) {
				setTAError(error.message);
			} else if (data) {
				setLastTAnalysis(data[0]);
			}
		};

		fetchLastAnalysis();
	}, []);

	useEffect(() => {
		const fetchLastFAnalysis = async () => {
			const { data, error } = await getLastFA();
			if (error) {
				setTAError(error.message);
			} else if (data) {
				setLastFAnalysis(data[0].probability);
			}
		};

		fetchLastFAnalysis();
	}, []);

	/*useEffect(() => {
		const updateIdNews = async () => {
			await uploadNewsWithLastAnalisis();
			console.log('Noticias actualizadas con éxito');
		};
		updateIdNews();
	}, []);*/
	// useEffect(() => {
	// 	const fetchUser = async () => {
	// 		const userData = await getUser();
	// 		if (userData) {
	// 			if (userData.user_metadata.num_visita >= 100) {
	// 				const Overlay = () => (
	// 					<Box
	// 						position='absolute'
	// 						top='0'
	// 						left='0'
	// 						right='0'
	// 						bottom='0'
	// 						bg='rgba(0, 0, 0, 0.7)'
	// 						backdropFilter='blur(10px)'
	// 						display='flex'
	// 						flexDirection={{ base: 'column', md: 'row' }}
	// 						zIndex='1'
	// 					/>
	// 				);
	// 				setOverlay(<Overlay />);
	// 				onOpen();
	// 			}
	// 		}
	// 	};
	// 	fetchUser();
	// }, [onOpen]);

	return (
		<Box
			display='flex'
			flexDirection={{ base: 'column', md: 'row' }}
			h='100vh'>
			<SideBar selectedInde={1} />
			<Box
				flex={{ md: 1 }}
				h='100vh'
				alignContent='center'
				justifyItems='center'
				overflow='auto'
				position='relative'>
				<Wrap
					align='center'
					justify='center'
					spacing='3vw'>
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
						position='relative'>
						<Box
							position='absolute'
							top='10px'
							right='10px'>
							<Tooltip
								label='Información del Modelo de IA'
								fontSize={{ md: 'xs' }}>
								<Image
									src='/icons/info.png'
									alt='Información del Modelo'
									w={{ base: '6vw', md: '2vw' }}
									display='block'
									mr={2}
									mt={1}
									_hover={{ opacity: '0.5' }}
									onClick={onTechnicalOpen} // Abrir modal al hacer clic
								/>
							</Tooltip>
						</Box>
						<PricePrediction
							lastTAnalysis={lastTAnalysis}
							TAerror={TAerror}
						/>
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
						p={3}>
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
						position='relative'>
						<Box
							position='absolute'
							top='10px'
							right='10px'>
							<Tooltip
								label='Información del Modelo de IA'
								fontSize={{ md: 'xs' }}>
								<Image
									src='/icons/info.png'
									alt='Información del Modelo'
									w={{ base: '6vw', md: '2vw' }}
									display='block'
									mr={2}
									mt={1}
									_hover={{ opacity: '0.5' }}
									onClick={onTechnicalOpen} // Abrir modal al hacer clic
								/>
							</Tooltip>
						</Box>
						<TechnicalAnalysis
							lastTAnalysis={lastTAnalysis}
							TAerror={TAerror}
						/>
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
						position='relative'>
						<Box
							position='absolute'
							top='10px'
							right='10px'>
							<Tooltip
								label='Información del Modelo de IA'
								fontSize={{ md: 'xs' }}>
								<Image
									src='/icons/info.png'
									alt='Información del Modelo'
									w={{ base: '6vw', md: '2vw' }}
									display='block'
									mr={2}
									mt={1}
									_hover={{ opacity: '0.5' }}
									onClick={onFundamentalOpen} // Abrir modal de análisis fundamental
								/>
							</Tooltip>
						</Box>
						<FundamentalAnalysis
							FAprobability={lastFAnalysis}/>
					</WrapItem>
				</Wrap>

				{/* Modal de Visitas Excedidas */}
				<Modal
					isOpen={isOpen}
					onClose={onClose}
					isCentered
					size='lg'
					closeOnOverlayClick={false}
					isClosable={false}
					scrollBehavior='inside'
					motionPreset='slideInBottom'>
					<ModalContent
						mx='auto'
						position='absolute'
						transform='translate(-50%, -50%)'
						w={{ base: '90%', md: '70%', lg: '60%' }}>
						<ModalHeader textAlign='center'>Visitas Excedidas</ModalHeader>
						<ModalBody>
							<Text textAlign='center'>
								Has excedido el número permitido de visitas.
							</Text>
							<Text textAlign='center'>
								Adquiere una suscripción para poder continuar viendo nuestro
								análisis.
							</Text>
						</ModalBody>
						<ModalFooter justifyContent='center'>
							<Button
								onClick={() => navigate('/suscripcion')}
								colorScheme='blue'>
								Suscribirse
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>

				{/* Modal de Análisis Técnico */}
				<Modal
					isOpen={isTechnicalModalOpen}
					onClose={onTechnicalClose}
					isCentered
					size='lg'
					scrollBehavior='inside'
					motionPreset='slideInBottom'>
					<ModalContent
						mx='auto'
						position='absolute'
						transform='translate(-50%, -50%)'>
						<ModalHeader>
							Análisis Técnico con Inteligencia Artificial
						</ModalHeader>
						<ModalBody>
							<Text>
								Nuestro sistema utiliza algoritmos avanzados de inteligencia
								artificial para analizar datos históricos del mercado de
								criptomonedas y predecir tendencias futuras. Este modelo está
								diseñado para ayudar a los usuarios a tomar decisiones más
								informadas y estratégicas en sus inversiones.
							</Text>

							<Text
								fontWeight='bold'
								my='1rem'>
								¿Cómo Funciona?
							</Text>
							<UnorderedList>
								<ListItem>
									<strong>Análisis de Patrones:</strong> El modelo examina datos
									históricos del mercado y detecta patrones de comportamiento en
									los precios de las criptomonedas.
								</ListItem>
								<ListItem>
									<strong>Redes Neuronales Especializadas:</strong> Utiliza
									redes avanzadas diseñadas para procesar secuencias de datos y
									extraer información clave para predecir tendencias futuras.
								</ListItem>
								<ListItem>
									<strong>Predicciones Basadas en Datos:</strong> Las
									predicciones se generan a partir de patrones identificados,
									permitiendo anticipar movimientos del mercado.
								</ListItem>
							</UnorderedList>

							<Text
								fontWeight='bold'
								my='1rem'>
								Resultados
							</Text>
							<Text>
								Nuestro sistema ha sido probado exhaustivamente para asegurar su
								precisión y eficacia. En nuestras pruebas, el modelo ha
								demostrado ser una herramienta confiable para identificar
								tendencias en el mercado:
							</Text>
							<UnorderedList>
								<ListItem>
									<strong>Alta Capacidad Predictiva:</strong> Identifica
									patrones clave con precisión.
								</ListItem>
								<ListItem>
									<strong>Información Valiosa:</strong> Proporciona resultados
									claros y útiles para decisiones estratégicas.
								</ListItem>
							</UnorderedList>

							<Text
								fontWeight='bold'
								my='1rem'>
								Aspectos Clave
							</Text>
							<UnorderedList>
								<ListItem>
									<strong>Análisis Técnico Avanzado:</strong> Basado en datos
									históricos del mercado para identificar oportunidades y
									riesgos.
								</ListItem>
								<ListItem>
									<strong>Predicciones Precisas:</strong> Basadas en patrones de
									comportamiento pasado y modelos avanzados.
								</ListItem>
								<ListItem>
									<strong>Herramienta de Apoyo:</strong> Diseñada para mejorar
									la toma de decisiones, aunque no garantiza resultados debido a
									la volatilidad inherente del mercado.
								</ListItem>
							</UnorderedList>

							<Text
								fontWeight='bold'
								my='1rem'>
								Nota de Transparencia
							</Text>
							<Text>
								Este sistema es una herramienta de apoyo y no debe considerarse
								un asesor financiero. Todas las decisiones de inversión deben
								ser evaluadas cuidadosamente, teniendo en cuenta los riesgos
								inherentes al mercado de criptomonedas.
							</Text>
						</ModalBody>
						<ModalFooter justifyContent='center'>
							<Button
								onClick={onTechnicalClose}
								colorScheme='blue'>
								Cerrar
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>

				{/* Modal del Analisis Fundamental */}
				<Modal
					isOpen={isFundamentalModalOpen}
					onClose={onFundamentalClose}
					isCentered
					size='lg'
					motionPreset='slideInBottom'
					scrollBehavior='inside'>
					<ModalContent
						mx='auto'
						position='absolute'
						transform='translate(-50%, -50%)'>
						<ModalHeader>
							Análisis de Sentimientos del Mercado de Bitcoin
						</ModalHeader>
						<ModalBody>
							<Text>
								Nuestro sistema utiliza inteligencia artificial avanzada para
								analizar el sentimiento de noticias relacionadas con Bitcoin
								(BTC). Este análisis proporciona a los usuarios una visión más
								clara de cómo las noticias pueden influir en el mercado,
								ayudando a tomar decisiones más informadas.
							</Text>

							<Text
								fontWeight='bold'
								my='1rem'>
								¿Cómo Funciona?
							</Text>
							<UnorderedList>
								<ListItem>
									<strong>Recolección de Noticias:</strong> Utilizamos
									tecnología de web scraping para recopilar noticias relevantes
									de fuentes confiables en tiempo real.
								</ListItem>
								<ListItem>
									<strong>Clasificación de Sentimientos:</strong> El sistema
									evalúa cada noticia y la clasifica como:
									<UnorderedList pl='1.5rem'>
										<ListItem>
											<strong>Positiva:</strong> Noticias que podrían favorecer
											el mercado.
										</ListItem>
										<ListItem>
											<strong>Negativa:</strong> Noticias que podrían indicar
											riesgos o caídas en el mercado.
										</ListItem>
									</UnorderedList>
								</ListItem>
								<ListItem>
									<strong>Actualización Continua:</strong> Las noticias se
									analizan constantemente para ofrecer información actualizada y
									precisa.
								</ListItem>
							</UnorderedList>

							<Text
								fontWeight='bold'
								my='1rem'>
								Resultados del Modelo
							</Text>
							<Text>
								El modelo ha sido evaluado exhaustivamente, mostrando un alto
								nivel de precisión en la clasificación de noticias. A
								continuación, un resumen de su rendimiento:
							</Text>
							<UnorderedList>
								<ListItem>
									<strong>Precisión General:</strong> 97%
								</ListItem>
								<ListItem>
									<strong>Clasificación de Noticias Positivas:</strong> 99% de
									acierto.
								</ListItem>
								<ListItem>
									<strong>Clasificación de Noticias Negativas:</strong> 84% de
									acierto.
								</ListItem>
								<ListItem>
									<strong>Promedio General:</strong>
								</ListItem>
								<UnorderedList pl='1.5rem'>
									<ListItem>
										<strong>Precisión:</strong> 97%
									</ListItem>
									<ListItem>
										<strong>Recall:</strong> 97%
									</ListItem>
									<ListItem>
										<strong>F1-Score:</strong> 97%
									</ListItem>
								</UnorderedList>
							</UnorderedList>
							<Text>
								Estas métricas muestran que el modelo es altamente confiable al
								interpretar el impacto emocional de las noticias sobre el
								mercado.
							</Text>

							<Text
								fontWeight='bold'
								my='1rem'>
								Ventajas del Sistema
							</Text>
							<UnorderedList>
								<ListItem>
									<strong>Actualización Automática:</strong> Aseguramos que
									siempre tengas la información más reciente y relevante.
								</ListItem>
								<ListItem>
									<strong>Modelo Especializado:</strong> Diseñado
									específicamente para el análisis del mercado de Bitcoin.
								</ListItem>
								<ListItem>
									<strong>Toma de Decisiones Informada:</strong> Ayuda a los
									usuarios a comprender cómo las noticias pueden influir en las
									tendencias del mercado.
								</ListItem>
							</UnorderedList>

							<Text
								fontWeight='bold'
								my='1rem'>
								NOTA DE TRANSPARENCIA
							</Text>
							<Text>
								El análisis de sentimientos es una herramienta de apoyo y no
								debe ser utilizado como un consejo financiero. Todas las
								decisiones de inversión deben tomarse considerando múltiples
								factores y riesgos.
							</Text>
						</ModalBody>
						<ModalFooter justifyContent='center'>
							<Button
								onClick={onFundamentalClose}
								colorScheme='blue'>
								Cerrar
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Box>
		</Box>
	);
}
