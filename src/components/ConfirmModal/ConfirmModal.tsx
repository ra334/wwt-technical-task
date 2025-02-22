import { useTranslation } from 'react-i18next'

import {
	Box,
	Button,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Text
} from '@chakra-ui/react'

interface ConfirmModalProps {
	isOpen: boolean
	onClose: () => void
	onCloseFilter: () => void
	setOldFilter: (value: boolean) => void
	setNewFilter: (value: boolean) => void
}

export const ConfirmModal = ({
	isOpen,
	onClose,
	setOldFilter,
	setNewFilter,
	onCloseFilter
}: ConfirmModalProps) => {
	const { t } = useTranslation('apply')

	const handleApplyOldFilter = () => {
		setOldFilter(true)
		onClose()
		onCloseFilter()
	}

	const handleApplyNewFilter = () => {
		setNewFilter(true)
		onClose()
		onCloseFilter()
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalOverlay />
			<ModalContent
				maxW="1280px"
				py="32px"
			>
				<Box
					position="relative"
					textAlign="center"
					mb="140px"
				>
					<Text textStyle="headline-2">{t('title')}</Text>
					<ModalCloseButton size="lg" />
				</Box>
				<ModalBody>
					<Flex
						justify="center"
						gap={5}
					>
						<Button
							variant="ghost"
							colorScheme="blackAlpha"
							onClick={handleApplyOldFilter}
						>
							{t('old_filter')}
						</Button>
						<Button
							variant="solid"
							colorScheme="brand"
							onClick={handleApplyNewFilter}
						>
							{t('new_filter')}
						</Button>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	)
}
