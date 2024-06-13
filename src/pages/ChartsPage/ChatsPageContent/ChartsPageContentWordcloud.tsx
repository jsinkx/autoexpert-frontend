import { useEffect } from 'react'

import { Status } from '@shared/status'

import { selectCarsState } from '@redux/slices/cars/selectors'
import { fetchCarParameters } from '@redux/slices/cars/slice'
import { selectReviews } from '@redux/slices/reviews/selectors'
import { selectReviewCharts } from '@redux/slices/reviewsCharts/selectors'
import { fetchWordcloud } from '@redux/slices/reviewsCharts/slice'

import useAppDispatch from '@hooks/useAppDispatch'
import useAppSelector from '@hooks/useAppSelector'

import { LoadingPage } from '@pages/LoadingPage/LoadingPage'

import { CarParameters } from '@components/CarParameters/CarParameters'
import ReviewsSettings from '@components/ReviewsSettings/ReviewsSettings'
import { Wordcloud } from '@components/Wordcloud/Wordcloud'

import { ChartsPageError } from '../ChartsPageError'
import { ChartsPageLoading } from '../ChartsPageLoading'

export const ChartsPageContentWordcloud = () => {
	const dispatch = useAppDispatch()

	const { currentSynonyms, currentSiteSources, currentModel, currentBody, currentBrand, statusCars } =
		useAppSelector(selectCarsState)

	const { currentReviewsScores } = useAppSelector(selectReviews)

	const { status: statusReviewsCharts, message, wordcloudData } = useAppSelector(selectReviewCharts)

	const carName = currentBrand.join(', ')

	const isCarsLoading = statusCars === Status.LOADING
	const isCarsError = statusCars === Status.ERROR

	const isReviewsChartsLoading = statusReviewsCharts === Status.LOADING
	const isReviewsChartsLoaded = statusReviewsCharts === Status.SUCCESS

	const handleGetWordcloudData = () => {
		const params = {
			words: currentSynonyms,
			marks: currentBrand,
			models: currentModel,
			body_types: currentBody,
			sources: currentSiteSources,
			sentiments: currentReviewsScores,
		}

		dispatch(fetchWordcloud(params))
	}

	useEffect(() => {
		const getCarsParameters = async () => {
			dispatch(fetchCarParameters())
		}

		getCarsParameters()
	}, [dispatch])

	if (isCarsLoading) return <LoadingPage />

	return (
		<>
			<h2 className="page__title">
				{isReviewsChartsLoaded ? `Облако слов об автомобилях ${carName} ` : 'Облако слов'}
			</h2>
			<div className="page__content">
				{isCarsError ? (
					<ChartsPageError message={message} />
				) : (
					<>
						<section className="section-settings">
							<CarParameters
								isDisplayBrandParams
								isDisplaySiteSources
								isDisplayKeywordSearch
								isDisplaySynonyms
								buttonText="Получить облако слов"
								callback={handleGetWordcloudData}
								className="section-settings__article-car-parameters"
							>
								<ReviewsSettings isDisplayButtonApply={false} className="section-settings__article-settings" />
							</CarParameters>
						</section>
						<section className="section-chart section-wordcloud">
							{isReviewsChartsLoading && <ChartsPageLoading />}
							{isReviewsChartsLoaded && <Wordcloud words={wordcloudData} className="section-chart__wordcloud" />}
						</section>
					</>
				)}
			</div>
		</>
	)
}
