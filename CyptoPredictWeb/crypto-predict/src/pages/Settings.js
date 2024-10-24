/** @format */

import React from 'react';
import {
	Box,
	Text,
	Tabs,
	TabList,
	Tab,
	TabPanels,
	TabPanel,
} from '@chakra-ui/react';
import SideBar from './Sidebar.js';
import UserInfo from './UserInfo.js';
import ChangePassword from './ChangePassword.js';

export default function Settings() {
	return (
		<Box
			display={'flex'}
			flexDirection={{ base: 'column', md: 'row' }}
			h='100vh'>
			<SideBar selectedIndex={3} />
			<Box
				flex={{ md: 1 }}
				h='100vh'
				alignContent='center'>
				<Box
					m='auto'
					borderRadius='30px'
					bg='#3c3c3c'
					w={{ base: '80vw', md: '60vw' }}
					h={{ base: '75vh', md: '85vh' }}
					overflow='auto'>
					<Box>
						<Tabs
							isFitted
							variant='line'
							colorScheme='yellow'>
							<Box>
								<TabList>
									<Tab>Perfil</Tab>
									<Tab>Cambiar contraseña</Tab>
								</TabList>
							</Box>

							<TabPanels>
								{/* Perfil */}
								<TabPanel>
									<UserInfo />
								</TabPanel>
								{/* Cambiar contraseña */}
								<TabPanel>
									<ChangePassword />
								</TabPanel>
							</TabPanels>
						</Tabs>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
