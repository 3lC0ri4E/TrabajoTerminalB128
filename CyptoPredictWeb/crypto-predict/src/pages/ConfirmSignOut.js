/** @format */

import React from 'react';
import {
	Button,
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	useDisclosure,
} from '@chakra-ui/react';

function ConfirmSignOut({
	triggerText = 'Dialogo',
	headerText = 'Alerta',
	bodyText = '¿Estás Seguro que quieres proceder?',
	onConfirm,
	onCancel,
}) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();

	return (
		<>
			<Button
				colorScheme='red'
				onClick={onOpen}>
				{triggerText}
			</Button>

			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={() => {
					onClose();
					if (onCancel) onCancel();
				}}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader
							fontSize='lg'
							fontWeight='bold'>
							{headerText}
						</AlertDialogHeader>

						<AlertDialogBody>{bodyText}</AlertDialogBody>

						<AlertDialogFooter>
							<Button
								ref={cancelRef}
								onClick={() => {
									onClose();
									if (onCancel) onCancel();
								}}>
								Cancel
							</Button>
							<Button
								colorScheme='red'
								onClick={() => {
									onClose();
									if (onConfirm) onConfirm();
								}}
								ml={3}>
								Confirm
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}

export default ConfirmSignOut;

// import CustomAlertDialog from './CustomAlertDialog'; // Ajusta la ruta según tu estructura de archivos

// function SomePage() {
//   const handleConfirm = () => {
//     console.log('Confirmed');
//   };

//   const handleCancel = () => {
//     console.log('Cancelled');
//   };

//   return (
//     <div>
//       <CustomAlertDialog
//         triggerText="Delete Item"
//         headerText="Confirm Deletion"
//         bodyText="Are you sure you want to delete this item?"
//         onConfirm={handleConfirm}
//         onCancel={handleCancel}
//       />
//     </div>
//   );
// }

// export default SomePage;
