import { useEffect } from 'react'

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
import { ChartsPagePiechart } from './Charts/PieChartReviewsScores'

export const ChartsPageContentReviewsScores = () => {
	const dispatch = useAppDispatch()

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

		dispatch(fetchReviewsScores(params))
	}

	useEffect(() => {
		const getCarsParameters = async () => {
			dispatch(fetchCarParameters())
		}

		getCarsParameters()

		return () => {
			dispatch(resetReviewsCharts())
		}
	}, [dispatch])

	if (isCarsLoading) return <LoadingPage />

	return (
		<>
			<title> Рейтинг отзывов - Автоэксперт </title>
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
								<div className="section-reviews-scores__piechart">
									<ChartsPagePiechart carName={carName} reviewsScores={reviewsScores} />
								</div>
							)}
						</section>
					</>
				)}
			</div>
		</>
	)
}
