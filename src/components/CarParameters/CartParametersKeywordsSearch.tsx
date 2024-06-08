import { FC, MouseEventHandler, useRef, useState } from 'react'

import SearchIcon from '@mui/icons-material/Search'
import { FormControl, IconButton, InputAdornment, OutlinedInput } from '@mui/material'

type CartParametersKeywordsSearchProps = {}

export const CartParametersKeywordsSearch: FC<CartParametersKeywordsSearchProps> = () => {
	const searchButtonRef = useRef<HTMLButtonElement | null>(null)

	const [searchByKeywordValue, setSearchByKeywordValue] = useState('')

	const isButtonSearchDisabled = searchByKeywordValue === ''

	const handleChangeSearchByKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchByKeywordValue(event.target.value)
	}

	const handleClickSearchByKeyword: MouseEventHandler = async () => {
		!isButtonSearchDisabled && console.log(searchByKeywordValue)
	}

	const handleKeyDownInTextField = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' && searchButtonRef.current) {
			searchButtonRef.current.click()
		}
	}

	return (
		<div className="car-parameters">
			<FormControl variant="outlined">
				<OutlinedInput
					placeholder="Искать по ключевому слову"
					value={searchByKeywordValue}
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
