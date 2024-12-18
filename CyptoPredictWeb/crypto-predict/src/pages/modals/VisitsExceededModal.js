/** @format */

import React from 'react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	Button,
	Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const VisitsExceededModal = ({ isOpen, onClose }) => {
	const navigate = useNavigate();
	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			isCentered
			size='lg'>
			<ModalContent>
				<ModalHeader textAlign='center'>Visitas Excedidas</ModalHeader>
				<ModalBody>
					<Text textAlign='center'>
						Has excedido el número permitido de visitas.
					</Text>
					<Text textAlign='center'>
						Adquiere una suscripción para continuar.
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
	);
};

export default VisitsExceededModal;
