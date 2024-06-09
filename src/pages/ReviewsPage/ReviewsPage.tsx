import { useEffect } from 'react'

import { Status } from '@shared/status'

import { selectCarsState } from '@redux/slices/cars/selectors'
import { fetchCarParameters } from '@redux/slices/cars/slice'

import useAppDispatch from '@hooks/useAppDispatch'
import useAppSelector from '@hooks/useAppSelector'

import { MainLayout } from '@layouts/MainLayout/MainLayout'

import { LoadingPage } from '@pages/LoadingPage/LoadingPage'

import { CarParameters } from '@components/CarParameters/CarParameters'
import { Loader } from '@components/Loader/Loader'

import { StyledReviewsPage } from './ReviewsPage.styles'
import { ReviewsPageError } from './ReviewsPageError'
import { ReviewsPageInfo } from './ReviewsPageInfo'
import { ReviewsPageLoaded } from './ReviewsPageLoaded'

export const ReviewsPage = () => {
	const dispatch = useAppDispatch()

	const { currentBrand, currentModel, statusCars } = useAppSelector(selectCarsState)

	const carName = `${currentBrand} ${currentModel}`

	// FIXME: added real check with reviews data
	const isReviewsLoaded = currentBrand !== null && currentModel !== null
	const isReviewsLoading = false

	useEffect(() => {
		const getCarsParameters = async () => {
			dispatch(fetchCarParameters())
		}

		getCarsParameters()
	}, [dispatch])

	if (statusCars === Status.LOADING) return <LoadingPage />

	return (
		<MainLayout>
			<StyledReviewsPage>
				<h2 className="page__title">{isReviewsLoaded ? `Отзывы об автомобилях ${carName}` : 'Подбор отзывов'}</h2>
				<div className="page__content">
					{statusCars === Status.ERROR ? (
						<ReviewsPageError />
					) : (
						<>
							<CarParameters
								isDisplayBrandParams
								isDisplaySiteSources
								isDisplayKeywordSearch
								isDisplaySynonyms
								className="article-car-parameters"
							/>
							<section className="section-reviews">
								{!isReviewsLoaded && <ReviewsPageInfo />}
								{isReviewsLoading && (
									<div className="section-reviews__loader">
										<Loader variant="loader" height="165" width="165" />
									</div>
								)}
								{!isReviewsLoading && isReviewsLoaded && <ReviewsPageLoaded />}
							</section>
						</>
					)}
				</div>
			</StyledReviewsPage>
		</MainLayout>
	)
}
