import { MouseEventHandler, useEffect, useState } from 'react'

import { isValidGetReviewsParams } from '@utils/is-valid-get-reviews-params'

import { useAddReviewMutation } from '@redux/services/reviews-api/api'

import { useInput } from '@hooks/useInput'

import { MainLayout } from '@layouts/MainLayout/MainLayout'

import { InfoText } from '@components/InfoText/InfoText'
import { Input } from '@components/Input/Input'
import { Loader } from '@components/Loader/Loader'

import { Alert, Button, TextField } from '@mui/material'

import { CarBody } from '@entities/car.types'

import { StyledAddReviewPage } from './AddReviewPage.styles'

const CAR_BODIES = ['SEDAN', 'HATCHBACK', 'LIFTBACK'] // FIXME: hardcode, need to take from API
const TEMPORALLY_DISABLED = true

export const AddReviewPage = () => {
	const currentCarBrand = useInput()
	const currentCarModel = useInput()
	const [currentCarBody, setCurrentCarBody] = useState<CarBody>('')

	const currentReview = useInput()
	const currentLink = useInput()

	const [addReview, { isLoading, isError, isSuccess }] = useAddReviewMutation()

	const validParams = isValidGetReviewsParams({
		isLoading,
		brand: { value: currentCarBrand.value !== '' ? [currentCarBrand.value] : [], active: true },
		model: { value: currentCarModel.value !== '' ? [currentCarModel.value] : [], active: true },
		body: { value: currentCarBody !== '' ? [currentCarBody] : [], active: true },
		extra: [
			{
				value: currentReview.value,
				message: 'Введите отзыв',
				isValid: (value: string) => value !== '',
			},
		],
	})

	const isDisabledInputs = isLoading

	const handleChangeCarBody = (event: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = event

		setCurrentCarBody(value)
	}

	const handleClickAddReview: MouseEventHandler = () => {
		const params = {
			mark: currentCarBrand.value,
			model: currentCarModel.value,
			body_type: currentCarBody!,
			text: currentReview.value,
			link: currentLink.value,
			other_data: {},
		}

		addReview(params)
	}

	useEffect(() => {
		if (isSuccess) {
			currentCarModel.reset()
			currentCarBrand.reset()

			setCurrentCarBody('')

			currentReview.reset()
			currentLink.reset()
		}
	}, [currentCarModel, currentCarBrand, currentReview, currentLink, isSuccess])

	return (
		<MainLayout>
			<title> Добавить отзыв - Автоэксперт </title>
			<StyledAddReviewPage>
				<h2 className="page__title">
					Добавить отзыв
					{isLoading && (
						<Loader
							styles={{
								height: '60px',
							}}
						/>
					)}
				</h2>
				{isSuccess && (
					<Alert severity="success" className="page__alert">
						Отзыв успешно добавлен!
					</Alert>
				)}
				{TEMPORALLY_DISABLED && (
					<Alert severity="info" className="page__alert">
						Функционал на техническом обслуживании
					</Alert>
				)}
				{isError && (
					<Alert severity="error" className="page__alert">
						Произошла ошибка при добавлении отзыва, попробуйте позже
					</Alert>
				)}
				<div className="page__content">
					<div className="add-review__car-parameters">
						<Input
							isRequired
							value={currentCarBrand.value}
							onChange={currentCarBrand.onChange}
							label="Марка"
							placeholder="Марка автомобиля"
							disabled={isDisabledInputs}
							size="small"
							className="add-review__car-parameters__input"
						/>
						<Input
							isRequired
							value={currentCarModel.value}
							onChange={currentCarModel.onChange}
							label="Модель"
							placeholder="Модель автомобиля"
							disabled={isDisabledInputs}
							size="small"
							className="add-review__car-parameters__input"
						/>
						<Input
							isSelect
							isRequired
							selectValues={CAR_BODIES}
							selectedValues={currentCarBody}
							value={currentCarBody!}
							onChange={handleChangeCarBody}
							label="Корпус"
							disabled={isDisabledInputs}
							size="small"
							className="add-review__car-parameters__input"
						/>
					</div>
					<TextField
						multiline
						rows={4}
						value={currentReview.value}
						onChange={currentReview.onChange}
						placeholder="Текст отзыва"
						disabled={isDisabledInputs}
						className="add-review__review-text"
					/>
					<div className="add-review__link-text">
						<Input
							value={currentLink.value}
							onChange={currentLink.onChange}
							label="Ссылка"
							placeholder="Ссылка на отзыв"
							disabled={isDisabledInputs}
							size="small"
							className="add-review__link-text__input"
						/>
						<InfoText
							text="Если источник отсутствует, оставить поле пустым"
							className="add-review__link-text__info"
						/>
					</div>
					<Button
						onClick={handleClickAddReview}
						disabled={!validParams.isValid || TEMPORALLY_DISABLED}
						variant="contained"
						className='className="add-review__button"'
					>
						{validParams.isValid ? 'Добавить' : validParams.message}
					</Button>
				</div>
			</StyledAddReviewPage>
		</MainLayout>
	)
}
