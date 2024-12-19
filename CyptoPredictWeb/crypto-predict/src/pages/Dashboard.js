/** @format */

import React, { useState, useEffect } from 'react';
import { getLastTAnalysis, getLastFA } from '../supabase/supabase_functions';
import VisitsExceededModal from './modals/VisitsExceededModal';
import TechnicalAnalysisModal from './modals/TechnicalAnalysisModal';
import FundamentalAnalysisModal from './modals/FundamentalAnalysisModal.js';
import {
	Box,
	Wrap,
	WrapItem,
	useDisclosure,
	Image,
	Tooltip,
} from '@chakra-ui/react';
import SideBar from './Sidebar.js';
import Bitcoinchart from './Bitcoinchart.js';
import TechnicalAnalysis from './RNN.js';
import PricePrediction from './PricePrediction.js';
import FundamentalAnalysis from './BERT.js';

export default function Dashboard() {
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
									src='/icons/privacy.png'
									alt='Información del Modelo'
									w={{ base: '6vw', md: '2vw' }}
									display='block'
									mr={2}
									mt={1}
									_hover={{ opacity: '0.5' }}
									onClick={onTechnicalOpen}
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
									src='/icons/privacy.png'
									alt='Información del Modelo'
									w={{ base: '6vw', md: '2vw' }}
									display='block'
									mr={2}
									mt={1}
									_hover={{ opacity: '0.5' }}
									onClick={onTechnicalOpen}
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
									src='/icons/privacy.png'
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
						<FundamentalAnalysis FAprobability={lastFAnalysis} />
					</WrapItem>
				</Wrap>

				<VisitsExceededModal
					isOpen={isOpen}
					onClose={onClose}
				/>
				<TechnicalAnalysisModal
					isOpen={isTechnicalModalOpen}
					onClose={onTechnicalClose}
				/>
				<FundamentalAnalysisModal
					isOpen={isFundamentalModalOpen}
					onClose={onFundamentalClose}
				/>
			</Box>
		</Box>
	);
}
