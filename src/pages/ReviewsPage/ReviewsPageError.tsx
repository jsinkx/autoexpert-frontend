import { selectCarsState } from '@redux/slices/cars/selectors'
import { fetchCarParameters } from '@redux/slices/cars/slice'
import { selectReviews } from '@redux/slices/reviews/selectors'

import useAppDispatch from '@hooks/useAppDispatch'
import useAppSelector from '@hooks/useAppSelector'

import { Alert, Button } from '@mui/material'

export const ReviewsPageError = () => {
	const dispatch = useAppDispatch()

	const { messageCars } = useAppSelector(selectCarsState)
	const { message: messageReviews } = useAppSelector(selectReviews)

	const message = messageCars || messageReviews

	const refetchCarParameters = () => {
		dispatch(fetchCarParameters())
	}

	return (
		<Alert severity="error" className="reviews-error__alert">
			{message}
			{messageCars && (
				<Button onClick={refetchCarParameters} color="error">
					Обновить
				</Button>
			)}
		</Alert>
	)
}
