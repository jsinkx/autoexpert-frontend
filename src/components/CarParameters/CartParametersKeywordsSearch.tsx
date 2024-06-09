import { FC, MouseEventHandler, useCallback, useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux'

import debounce from 'lodash.debounce'

import { selectCarsState } from '@redux/slices/cars/selectors'
import { fetchCarSynonyms, setCurrentKeyword, setSynonyms } from '@redux/slices/cars/slice'

import useAppDispatch from '@hooks/useAppDispatch'
import useAppSelector from '@hooks/useAppSelector'

import SearchIcon from '@mui/icons-material/Search'
import { FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material'

type CartParametersKeywordsSearchProps = {}

const SEARCH_DEBOUNCE_DELAY_MS = 1.5 * 1000

export const CartParametersKeywordsSearch: FC<CartParametersKeywordsSearchProps> = () => {
	const dispatch = useDispatch()
	const asyncDispatch = useAppDispatch()

	const searchButtonRef = useRef<HTMLButtonElement | null>(null)

	const { currentKeyword } = useAppSelector(selectCarsState)

	const isButtonSearchDisabled = currentKeyword === ''

	const getCarSynonyms = (keyword: string) => {
		keyword !== '' ? asyncDispatch(fetchCarSynonyms(keyword)) : dispatch(setSynonyms([]))
	}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const getCarSynonymsDebounced = useCallback(debounce(getCarSynonyms, SEARCH_DEBOUNCE_DELAY_MS), [])

	const handleChangeSearchByKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(setCurrentKeyword(event.target.value))
	}

	const handleClickSearchByKeyword: MouseEventHandler = () => {
		getCarSynonymsDebounced(currentKeyword)
	}

	const handleKeyDownInTextField = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && searchButtonRef.current) {
			searchButtonRef.current.click()
		}
	}

	useEffect(() => {
		getCarSynonymsDebounced(currentKeyword)
	}, [currentKeyword, getCarSynonymsDebounced])

	return (
		<div className="car-parameters">
			<FormControl variant="outlined">
				<OutlinedInput
					placeholder="Искать по ключевому слову"
					value={currentKeyword}
					onChange={handleChangeSearchByKeyword}
					size="small"
					onKeyDown={handleKeyDownInTextField}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								ref={searchButtonRef}
								type="button"
								aria-label="search"
								onClick={handleClickSearchByKeyword}
								disabled={isButtonSearchDisabled}
							>
								<SearchIcon />
							</IconButton>
						</InputAdornment>
					}
					className="car-parameters__search"
				/>
			</FormControl>
		</div>
	)
}
