import { useEffect } from 'react'

import { Status } from '@shared/status'

import { selectCarsState } from '@redux/slices/cars/selectors'
import { fetchCarParameters } from '@redux/slices/cars/slice'
import { selectReviews } from '@redux/slices/reviews/selectors'

import useAppDispatch from '@hooks/useAppDispatch'
import useAppSelector from '@hooks/useAppSelector'

import { MainLayout } from '@layouts/MainLayout/MainLayout'

import { LoadingPage } from '@pages/LoadingPage/LoadingPage'

import { CarParameters } from '@components/CarParameters/CarParameters'

import { StyledReviewsPage } from './ReviewsPage.styles'
import { ReviewsPageError } from './ReviewsPageError'
import { ReviewsPageInfo } from './ReviewsPageInfo'
import { ReviewsPageLoaded } from './ReviewsPageLoaded'

export const ReviewsPage = () => {
	const dispatch = useAppDispatch()

	const { currentBrand, currentModel, statusCars } = useAppSelector(selectCarsState)
	const { status: statusReviews } = useAppSelector(selectReviews)

	const carName = `${currentBrand} ${currentModel}`

	const isCarsLoading = statusCars === Status.LOADING
	const isCarsError = statusCars === Status.ERROR

	const isReviewsInit = statusReviews === Status.INIT
	const isReviewsLoaded = statusReviews === Status.SUCCESS

	useEffect(() => {
		const getCarsParameters = async () => {
			dispatch(fetchCarParameters())
		}

		getCarsParameters()
	}, [dispatch])

	if (isCarsLoading) return <LoadingPage />

	return (
		<MainLayout>
			<StyledReviewsPage>
				<h2 className="page__title">{isReviewsLoaded ? `Отзывы об автомобилях ${carName}` : 'Подбор отзывов'}</h2>
				<div className="page__content">
					{isCarsError ? (
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
								{isReviewsInit && <ReviewsPageInfo />}
								{!isReviewsInit && <ReviewsPageLoaded />}
							</section>
						</>
					)}
				</div>
			</StyledReviewsPage>
		</MainLayout>
	)
}
