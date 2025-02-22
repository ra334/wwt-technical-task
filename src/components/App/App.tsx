import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react'

import type { SearchRequestFilter } from '@api/types/SearchRequest/SearchRequestFilter'

import { ConfirmModal } from '@components/ConfirmModal/ConfirmModal'
import { FilterModal } from '@components/FilterModal/FilterModal'
import filterData from '@temp/filterData.json'

export const App = () => {
	const filterModal = useDisclosure()
	const confirmModal = useDisclosure()
	const { t } = useTranslation()
	const [checkedItems, setCheckedItems] = useState<SearchRequestFilter>([])
	const [newCheckedItems, setNewCheckedItems] = useState<SearchRequestFilter>(
		[]
	)
	const [oldFilter, setOldFilter] = useState<boolean>(false)
	const [newFilter, setNewFilter] = useState<boolean>(false)
	const [apply, setApply] = useState<boolean>(false)

	useEffect(() => {
		if (oldFilter) {
			setNewCheckedItems(checkedItems)
			setOldFilter(false)
		}
	}, [oldFilter])

	useEffect(() => {
		if (newFilter) {
			setCheckedItems(newCheckedItems)
			setNewFilter(false)
		}
	}, [newFilter])

	useEffect(() => {
		if (apply) {
			confirmModal.onOpen()
			setApply(false)
		}
	}, [apply])

	return (
		<Box
			maxW="90rem"
			mx="auto"
			minH="100vh"
		>
			{JSON.stringify(checkedItems)}
			<FilterModal
				isOpen={filterModal.isOpen}
				onClose={filterModal.onClose}
				filterData={filterData}
				checkedItems={newCheckedItems}
				setCheckedItems={setNewCheckedItems}
				setApply={setApply}
			/>
			<ConfirmModal
				isOpen={confirmModal.isOpen}
				onClose={confirmModal.onClose}
				setNewFilter={setNewFilter}
				setOldFilter={setOldFilter}
				onCloseFilter={filterModal.onClose}
			/>
			<Flex
				h="100vh"
				justify="center"
				align="center"
			>
				<Button
					variant="solid"
					colorScheme="brand"
					size="md"
					onClick={filterModal.onOpen}
				>
					{t('button')}
				</Button>
			</Flex>
		</Box>
	)
}
