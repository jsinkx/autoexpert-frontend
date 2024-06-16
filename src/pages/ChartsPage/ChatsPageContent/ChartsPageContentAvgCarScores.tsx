import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Status } from '@shared/status'

import { selectCarsState } from '@redux/slices/cars/selectors'
import { fetchCarParameters } from '@redux/slices/cars/slice'
import { selectReviews } from '@redux/slices/reviews/selectors'
import { selectReviewCharts } from '@redux/slices/reviewsCharts/selectors'
import { fetchAvgCarScores, resetReviewsCharts } from '@redux/slices/reviewsCharts/slice'

import useAppDispatch from '@hooks/useAppDispatch'
import useAppSelector from '@hooks/useAppSelector'

import { LoadingPage } from '@pages/LoadingPage/LoadingPage'

import { AvgCarScore } from '@components/AvgCarScore/AvgCarScore'
import { CarParameters } from '@components/CarParameters/CarParameters'
import ReviewsSettings from '@components/ReviewsSettings/ReviewsSettings'

import { Alert } from '@mui/material'

import { ChartsPageError } from '../ChartsPageError'
import { ChartsPageLoading } from '../ChartsPageLoading'

export const ChartsPageContentAvgCarScores = () => {
	const dispatch = useDispatch()
	const asyncDispatch = useAppDispatch()

	const { currentModel, currentBody, currentBrand, statusCars } = useAppSelector(selectCarsState)

	const { currentReviewsScores } = useAppSelector(selectReviews)

	const { status: statusReviewsCharts, message, avgCarScores } = useAppSelector(selectReviewCharts)

	const carName = currentBrand.join(', ')

	const isCarsLoading = statusCars === Status.LOADING
	const isCarsError = statusCars === Status.ERROR

	const isReviewsChartsLoading = statusReviewsCharts === Status.LOADING
	const isReviewsChartsLoaded = statusReviewsCharts === Status.SUCCESS

	const handleGetAvgScores = () => {
		const params = {
			marks: currentBrand,
			models: currentModel,
			body_types: currentBody,
			sentiments: currentReviewsScores,
		}

		asyncDispatch(fetchAvgCarScores(params))
	}

	useEffect(() => {
		const getCarsParameters = async () => {
			asyncDispatch(fetchCarParameters())
		}

		getCarsParameters()

		return () => {
			dispatch(resetReviewsCharts())
		}
	}, [asyncDispatch, dispatch])
	if (isCarsLoading) return <LoadingPage />

	return (
		<>
			<h2 className="page__title">
				{isReviewsChartsLoaded ? `Средняя оценка по автомобилям ${carName}` : 'Средняя оценка по автомобилям'}
			</h2>
			<div className="page__content">
				{isCarsError ? (
					<ChartsPageError message={message} />
				) : (
					<>
						<section className="section-settings">
							<CarParameters
								isDisplayBrandParams
								isDisplayButtonApply
								buttonText="Получить оценку"
								isLoading={isReviewsChartsLoading}
								callback={handleGetAvgScores}
								className="section-settings__article-car-parameters"
							>
								<ReviewsSettings isDisplayFilterScore className="section-settings__article-settings" />
							</CarParameters>
						</section>
						<section className="section-chart section-avg-car-scores">
							{isReviewsChartsLoading && <ChartsPageLoading />}
							{isReviewsChartsLoaded && !avgCarScores.length && (
								<Alert severity="warning">Не удалось получить среднюю оценку по данным параметрам</Alert>
							)}
							{isReviewsChartsLoaded &&
								avgCarScores.map(({ name, score }) => (
									<AvgCarScore
										key={name}
										name={name}
										score={score}
										className="section-avg-car-scores__avg-car-score"
									/>
								))}
						</section>
					</>
				)}
			</div>
		</>
	)
}
