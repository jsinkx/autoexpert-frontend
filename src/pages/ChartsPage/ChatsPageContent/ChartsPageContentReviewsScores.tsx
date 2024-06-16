import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Status } from '@shared/status'

import { selectCarsState } from '@redux/slices/cars/selectors'
import { fetchCarParameters } from '@redux/slices/cars/slice'
import { selectReviewCharts } from '@redux/slices/reviewsCharts/selectors'
import { fetchReviewsScores, resetReviewsCharts } from '@redux/slices/reviewsCharts/slice'

import useAppDispatch from '@hooks/useAppDispatch'
import useAppSelector from '@hooks/useAppSelector'

import { LoadingPage } from '@pages/LoadingPage/LoadingPage'

import { CarParameters } from '@components/CarParameters/CarParameters'
import ReviewsSettings from '@components/ReviewsSettings/ReviewsSettings'

import { Alert } from '@mui/material'

import { ChartsPageError } from '../ChartsPageError'
import { ChartsPageLoading } from '../ChartsPageLoading'
import { ChartsPageBarchart } from './Charts/BarChartReviewsScores'

export const ChartsPageContentReviewsScores = () => {
	const dispatch = useDispatch()
	const asyncDispatch = useAppDispatch()

	const { currentModel, currentBody, currentBrand, statusCars, currentSiteSources } =
		useAppSelector(selectCarsState)

	const { status: statusReviewsCharts, message, reviewsScores } = useAppSelector(selectReviewCharts)

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
			sources: currentSiteSources,
		}

		asyncDispatch(fetchReviewsScores(params))
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
				{isReviewsChartsLoaded ? `Рейтинг отзывов автомобилей ${carName}` : 'Рейтинг отзывов'}
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
								isLoading={isReviewsChartsLoading}
								buttonText="Получить рейтинг"
								callback={handleGetAvgScores}
								className="section-settings__article-car-parameters"
							>
								<ReviewsSettings isDisplaySiteSources className="section-settings__article-settings" />
							</CarParameters>
						</section>
						<section className="section-chart section-reviews-scores">
							{isReviewsChartsLoading && <ChartsPageLoading />}
							{isReviewsChartsLoaded && !Object.keys(reviewsScores).length && (
								<Alert severity="warning">Не удалось получить среднюю оценку по данным параметрам</Alert>
							)}
							{isReviewsChartsLoaded && (
								<div className="section-reviews-scores__barchart">
									<ChartsPageBarchart carName={carName} reviewsScores={reviewsScores} />
								</div>
							)}
						</section>
					</>
				)}
			</div>
		</>
	)
}
