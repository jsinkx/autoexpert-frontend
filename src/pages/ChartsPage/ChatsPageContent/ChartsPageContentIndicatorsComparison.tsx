import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { Status } from '@shared/status'

import { selectCarsState } from '@redux/slices/cars/selectors'
import { fetchCarParameters } from '@redux/slices/cars/slice'
import { selectReviewCharts } from '@redux/slices/reviewsCharts/selectors'
import { fetchIndicatorsComparison, resetReviewsCharts } from '@redux/slices/reviewsCharts/slice'

import useAppDispatch from '@hooks/useAppDispatch'
import useAppSelector from '@hooks/useAppSelector'

import { LoadingPage } from '@pages/LoadingPage/LoadingPage'

import { CarParameters } from '@components/CarParameters/CarParameters'
import { ComparisonItem } from '@components/ComparisonItem/ComparisonItem'

import { Alert } from '@mui/material'

import { ChartsPageError } from '../ChartsPageError'
import { ChartsPageLoading } from '../ChartsPageLoading'

export const ChartsPageContentIndicatorsComparison = () => {
	const dispatch = useDispatch()
	const asyncDispatch = useAppDispatch()

	const { currentModel, currentBody, currentBrand, statusCars } = useAppSelector(selectCarsState)

	const { status: statusReviewsCharts, message, indicatorsComparison } = useAppSelector(selectReviewCharts)

	const carName = currentBrand.join(', ')

	const isCarsLoading = statusCars === Status.LOADING
	const isCarsError = statusCars === Status.ERROR

	const isReviewsChartsLoading = statusReviewsCharts === Status.LOADING
	const isReviewsChartsLoaded = statusReviewsCharts === Status.SUCCESS

	const handleGetIndicatorsComparison = () => {
		const params = {
			marks: currentBrand,
			models: currentModel,
			body_types: currentBody,
		}

		asyncDispatch(fetchIndicatorsComparison(params))
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

	const isProsNull = !Object.keys(indicatorsComparison.pros).length
	const isConsNull = !Object.keys(indicatorsComparison.cons).length

	const isIndicatorsComparisonNull = isProsNull && isConsNull
	return (
		<>
			<h2 className="page__title">
				{isReviewsChartsLoaded ? `Сравнение показателей для ${carName}` : 'Сравнение показателей'}
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
								buttonText="Сравнить"
								isLoading={isReviewsChartsLoading}
								callback={handleGetIndicatorsComparison}
								className="section-settings__article-car-parameters"
							/>
						</section>
						<section className="section-chart section-indicators-comparison">
							{isReviewsChartsLoading && <ChartsPageLoading />}
							{isReviewsChartsLoaded && isIndicatorsComparisonNull && (
								<Alert severity="warning" className="section-indicators-comparison__alert">
									Не удалось сравнить
								</Alert>
							)}
							{isReviewsChartsLoaded && (
								<>
									{!isProsNull && (
										<ComparisonItem
											isPros
											items={indicatorsComparison.pros}
											className="section-indicators-comparison__item"
										/>
									)}
									{!isConsNull && (
										<ComparisonItem
											isPros={false}
											items={indicatorsComparison.cons}
											className="section-indicators-comparison__item"
										/>
									)}
								</>
							)}
						</section>
					</>
				)}
			</div>
		</>
	)
}
