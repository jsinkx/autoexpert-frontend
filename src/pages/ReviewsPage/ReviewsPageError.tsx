import { selectCarsState } from '@redux/slices/cars/selectors'
import { fetchCarParameters } from '@redux/slices/cars/slice'

import useAppDispatch from '@hooks/useAppDispatch'
import useAppSelector from '@hooks/useAppSelector'

import { Alert, Button } from '@mui/material'

export const ReviewsPageError = () => {
	const dispatch = useAppDispatch()

	const { messageCars } = useAppSelector(selectCarsState)

	const refetchCarParameters = () => {
		dispatch(fetchCarParameters())
	}

	return (
		<Alert severity="error" className="reviews-error__alert">
			{messageCars}
			<Button onClick={refetchCarParameters} color="error">
				Обновить
			</Button>
		</Alert>
	)
}
