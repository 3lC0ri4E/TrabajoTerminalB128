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
import TAHelp from './modals/TAHelp.js';
import PriceHelp from './modals/PriceHelp.js';
import PricePredictionModal from './modals/PricePredictionModal.js';
import FAHelp from './modals/FAHelp.js';

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

	const {
		isOpen: isPriceModalOpen,
		onOpen: onPriceModalOpen,
		onClose: onPriceModalClose,
	} = useDisclosure();

	const {
		isOpen: isTAHelpModalOpen,
		onOpen: onTAHelpModalOpen,
		onClose: onTAHelpModalClose,
	} = useDisclosure();

	const {
		isOpen: isPriceHelpModalOpen,
		onOpen: onPriceHelpModalOpen,
		onClose: onPriceHelpModalClose,
	} = useDisclosure();

	const {
		isOpen: isFAHelpModalOpen,
		onOpen: onFAHelpModalOpen,
		onClose: onFAHelpModalClose,
	} = useDisclosure();

	useEffect(() => {
		const fetchLastTAnalysis = async () => {
			const { data, error } = await getLastTAnalysis();
			if (error) {
				setTAError(error.message);
			} else if (data) {
				setLastTAnalysis(data[0]);
			}
		};

		fetchLastTAnalysis();
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

	console.log(lastTAnalysis);
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
									onClick={onPriceModalOpen}
								/>
							</Tooltip>
						</Box>
						<Box
							position='absolute'
							top='10px'
							left='15px'>
							<Tooltip
								label='¿Cómo intepreto estos resultados?'
								fontSize={{ md: 'xs' }}>
								<Image
									src='/icons/info.png'
									alt='Información del Modelo'
									w={{ base: '6vw', md: '2vw' }}
									display='block'
									mr={2}
									mt={1}
									_hover={{ opacity: '0.5' }}
									onClick={onPriceHelpModalOpen}
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
						<Box
							position='absolute'
							top='10px'
							left='15px'>
							<Tooltip
								label='¿Cómo intepreto estos resultados?'
								fontSize={{ md: 'xs' }}>
								<Image
									src='/icons/info.png'
									alt='Información del Modelo'
									w={{ base: '6vw', md: '2vw' }}
									display='block'
									mr={2}
									mt={1}
									_hover={{ opacity: '0.5' }}
									onClick={onTAHelpModalOpen}
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
						<Box
							position='absolute'
							top='10px'
							left='15px'>
							<Tooltip
								label='¿Cómo intepreto estos resultados?'
								fontSize={{ md: 'xs' }}>
								<Image
									src='/icons/info.png'
									alt='Información del Modelo'
									w={{ base: '6vw', md: '2vw' }}
									display='block'
									mr={2}
									mt={1}
									_hover={{ opacity: '0.5' }}
									onClick={onFAHelpModalOpen}
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
				<PricePredictionModal
					isOpen={isPriceModalOpen}
					onClose={onPriceModalClose}
				/>
				<TAHelp
					isOpen={isTAHelpModalOpen}
					onClose={onTAHelpModalClose}
				/>
				<FAHelp
					isOpen={isFAHelpModalOpen}
					onClose={onFAHelpModalClose}
				/>
				<PriceHelp
					isOpen={isPriceHelpModalOpen}
					onClose={onPriceHelpModalClose}
					data={lastTAnalysis}
				/>
			</Box>
		</Box>
	);
}
