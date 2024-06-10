import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { REVIEWS_SORTING_OPTIONS } from '@shared/reviews-sorting-options'

import { selectReviews } from '@redux/slices/reviews/selectors'
import { setReviewsScores } from '@redux/slices/reviews/slice'

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

const REVIEWS_SCORES = Object.keys(REVIEWS_SORTING_OPTIONS)!.slice(0, -1)

export const ReviewsSettingsFilterScore = () => {
	const dispatch = useDispatch()

	const { currentReviewsScores } = useAppSelector(selectReviews)

	const [isFocused, setIsFocused] = useState(false)

	const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
		setIsFocused(event.type === 'focus')
	}

	const handleChangeSiteSources = (event: SelectChangeEvent<string[]>) => {
		const {
			target: { value },
		} = event

		const newReviewsScores = typeof value === 'string' ? value.split(',') : value

		dispatch(setReviewsScores(newReviewsScores))
	}

	return (
		<div className="car-parameters">
			<p className="car-parameters__label"> Выбор типов </p>
			<FormControl sx={{ width: '300px' }} size="small">
				{currentReviewsScores.length === 0 && !isFocused && (
					<InputLabel>{REVIEWS_SCORES.length} типа(-ов) </InputLabel>
				)}
				<Select
					multiple
					value={currentReviewsScores}
					onChange={handleChangeSiteSources}
					onFocus={handleFocus}
					onBlur={handleFocus}
					renderValue={(selected) =>
						selected
							.map(
								(reviewScoreKey) => REVIEWS_SORTING_OPTIONS[reviewScoreKey as keyof typeof REVIEWS_SORTING_OPTIONS],
							)
							.join(', ')
					}
					className="car-parameters__select"
				>
					{REVIEWS_SCORES.map((reviewScoreKey) => (
						<MenuItem key={reviewScoreKey} value={reviewScoreKey}>
							<ListItemIcon>
								<Checkbox checked={currentReviewsScores.indexOf(reviewScoreKey) > -1} />
							</ListItemIcon>
							<ListItemText
								primary={REVIEWS_SORTING_OPTIONS[reviewScoreKey as keyof typeof REVIEWS_SORTING_OPTIONS]}
							/>
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	)
}
