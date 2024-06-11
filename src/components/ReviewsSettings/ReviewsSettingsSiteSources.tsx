import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { selectCarsState } from '@redux/slices/cars/selectors'
import { fetchCarParameters, setCurrentSiteSources } from '@redux/slices/cars/slice'
import { setCurrentSiteSources as setCurrentSiteSourcesInReviews } from '@redux/slices/reviews/slice'

import useAppDispatch from '@hooks/useAppDispatch'
import useAppSelector from '@hooks/useAppSelector'

import {
	Alert,
	Button,
	Checkbox,
	FormControl,
	InputLabel,
	ListItemIcon,
	ListItemText,
	MenuItem,
	Select,
	SelectChangeEvent,
} from '@mui/material'

export const ReviewsSettingsSiteSources = () => {
	const dispatch = useDispatch()
	const asyncDispatch = useAppDispatch()

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
		dispatch(setCurrentSiteSourcesInReviews(newSiteSources))
	}

	const refetchCarParameters = () => {
		asyncDispatch(fetchCarParameters())
	}

	useEffect(() => {
		dispatch(setCurrentSiteSourcesInReviews(siteSources))
	}, [dispatch, siteSources])

	if (!siteSources.length)
		return (
			<Alert severity="error" className="car-parameter__error">
				Не удалось получить источники <Button onClick={refetchCarParameters}> обновить </Button>
			</Alert>
		)

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
