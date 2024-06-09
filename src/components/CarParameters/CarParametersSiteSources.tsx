import { FC, useState } from 'react'
import { useDispatch } from 'react-redux'

import { selectCarsState } from '@redux/slices/cars/selectors'
import { setCurrentSiteSources } from '@redux/slices/cars/slice'

import useAppSelector from '@hooks/useAppSelector'

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

type CarParametersSiteSourcesProps = {}

export const CarParametersSiteSources: FC<CarParametersSiteSourcesProps> = () => {
	const dispatch = useDispatch()

	const { currentSiteSources, siteSources } = useAppSelector(selectCarsState)

	const [isFocused, setIsFocused] = useState(false)

	const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		setIsFocused(event.type === 'focus')
	}

	const handleChangeSiteSources = (event: SelectChangeEvent<string[]>) => {
		const {
			target: { value },
		} = event

		const newSiteSources = typeof value === 'string' ? value.split(',') : value

		dispatch(setCurrentSiteSources(newSiteSources))
	}

	if (!siteSources.length) return null

	return (
		<div className="car-parameters">
			<p className="car-parameters__label"> Выбор источников </p>
			<FormControl sx={{ width: '300px' }} size="small">
				{currentSiteSources.length === 0 && !isFocused && (
					<InputLabel>{siteSources.length} источника(-ов)</InputLabel>
				)}
				<Select
					multiple
					value={currentSiteSources}
					onChange={handleChangeSiteSources}
					onFocus={handleFocus}
					onBlur={handleFocus}
					renderValue={(selected) => selected.join(', ')}
					className="car-parameters__select"
				>
					{siteSources.map((siteSource) => (
						<MenuItem key={siteSource} value={siteSource}>
							<ListItemIcon>
								<Checkbox checked={currentSiteSources.indexOf(siteSource) > -1} />
							</ListItemIcon>
							<ListItemText primary={siteSource} />
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	)
}
