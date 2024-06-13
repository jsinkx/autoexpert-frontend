import { FC } from 'react'

import { selectCarsState } from '@redux/slices/cars/selectors'
import { fetchCarParameters } from '@redux/slices/cars/slice'

import useAppDispatch from '@hooks/useAppDispatch'
import useAppSelector from '@hooks/useAppSelector'

import { Alert, Button } from '@mui/material'

type ChartsPageErrorProps = {
	message: string
}

export const ChartsPageError: FC<ChartsPageErrorProps> = ({ message: _message }) => {
	const dispatch = useAppDispatch()

	const { messageCars } = useAppSelector(selectCarsState)

	const message = messageCars || _message

	const refetchCarParameters = () => {
		dispatch(fetchCarParameters())
	}

	return (
		<Alert severity="error" className="wordcloud-error__alert">
			{message}
			{messageCars && (
				<Button onClick={refetchCarParameters} color="error">
					Обновить
				</Button>
			)}
		</Alert>
	)
}
