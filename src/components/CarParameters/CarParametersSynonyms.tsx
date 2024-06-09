import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Status } from '@shared/status'

import { selectCarsState } from '@redux/slices/cars/selectors'
import { setCurrentSynonyms } from '@redux/slices/cars/slice'

import useAppSelector from '@hooks/useAppSelector'

import { Loader } from '@components/Loader/Loader'

import {
	Checkbox,
	FormControl,
	InputLabel,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material'

type CarParametersSynonymsProps = {}

export const CarParametersSynonyms: FC<CarParametersSynonymsProps> = () => {
	const dispatch = useDispatch()

	const { synonyms, currentSynonyms, statusSynonyms } = useAppSelector(selectCarsState)
	const [isFocused, setIsFocused] = useState(false)

	const isDisabledSynonyms = !synonyms.length
	const isLoadingSynonyms = statusSynonyms === Status.LOADING

	const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		setIsFocused(event.type === 'focus')
	}

	const handleChangeSynonyms = (event: SelectChangeEvent<string[]>) => {
		const {
			target: { value },
		} = event

		const newSynonyms = typeof value === 'string' ? value.split(',') : value

		dispatch(setCurrentSynonyms(newSynonyms))
	}

	// If synonyms loaded not successful or no synonyms after load, don't render
	// Its means when we reset keyword, no synonyms
	if (
		(!isLoadingSynonyms && statusSynonyms !== Status.SUCCESS) ||
		(!synonyms.length && statusSynonyms === Status.SUCCESS)
	)
		return null

	return (
		<div className="car-parameters">
			<p className="car-parameters__label"> Выбор синонимов </p>
			{isLoadingSynonyms ? (
				<Loader />
			) : (
				<FormControl sx={{ width: '300px' }} size="small">
					{currentSynonyms.length === 0 && !isFocused && <InputLabel>{synonyms.length} синонима(-ов) </InputLabel>}
					<Select
						multiple
						value={currentSynonyms}
						onChange={handleChangeSynonyms}
						onFocus={handleFocus}
						onBlur={handleFocus}
						renderValue={(selected) => selected.join(', ')}
						disabled={isDisabledSynonyms}
						className="car-parameters__select"
					>
						{synonyms.map((siteSource) => (
							<MenuItem key={siteSource} value={siteSource}>
								<ListItemIcon>
									<Checkbox checked={currentSynonyms.indexOf(siteSource) > -1} />
								</ListItemIcon>
								<ListItemText primary={siteSource} />
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)}
		</div>
	)
}
