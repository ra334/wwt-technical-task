import { useTranslation } from 'react-i18next'

import {
	Box,
	Button,
	Checkbox,
	Divider,
	Grid,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text
} from '@chakra-ui/react'

import type { FilterBase, FilterChooseOption } from '@api/types/Filter/index'
import type { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter'

interface FilterModalProps {
	isOpen: boolean
	onClose: () => void
	filterData: { filterItems: FilterBase[] }
	checkedItems: SearchRequestFilter
	setCheckedItems: React.Dispatch<React.SetStateAction<SearchRequestFilter>>
	setApply: (value: boolean) => void
}

export const FilterModal = ({
	isOpen,
	onClose,
	filterData,
	checkedItems,
	setCheckedItems,
	setApply
}: FilterModalProps) => {
	const { t } = useTranslation('filter')
	const data = filterData.filterItems

	const handleCheckboxChange = (id: string) => {
		setCheckedItems((prevState: SearchRequestFilter) => ({
			...prevState,
			[id]: !prevState[id]
		}))
	}

	const handleApplyFilters = () => {
		setApply(true)
	}

	const handleClearFilters = () => {
		setCheckedItems([])
	}

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalOverlay />
			<ModalContent maxW="1280px">
				<Box position="relative">
					<ModalHeader>{t('filter')}</ModalHeader>
					<ModalCloseButton size="lg" />
				</Box>
				<ModalBody>
					{data.map(category => (
						<>
							<Box
								key={category.id}
								m={4}
							>
								<Text
									textStyle="headline-5"
									mb={6}
								>
									{t(category.name)}
								</Text>
								<Grid
									templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
									gap={6}
								>
									{category.options.map((option: FilterChooseOption) => (
										<Checkbox
											key={option.id}
											isChecked={checkedItems[option.id] || false}
											onChange={() => handleCheckboxChange(option.id)}
										>
											{t(option.name)}
										</Checkbox>
									))}
								</Grid>
							</Box>
							<Divider py={4}></Divider>
						</>
					))}
				</ModalBody>
				<ModalFooter
					position="relative"
					justifyContent="center"
				>
					<Button
						variant="solid"
						colorScheme="brand"
						size="lg"
						onClick={handleApplyFilters}
					>
						{t('apply')}
					</Button>
					<Button
						variant="link"
						colorScheme="cyan"
						onClick={handleClearFilters}
						position="absolute"
						top="50%"
						right="80px"
						transform="translate(50%, -50%)"
					>
						{t('clear_parameters')}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}
