import { MainLayout } from '@layouts/MainLayout/MainLayout'

import { CarParameters } from '@components/CarParameters/CarParameters'
import { Loader } from '@components/Loader/Loader'

import { StyledReviewsPage } from './ReviewsPage.styles'
import { ReviewsPageInfo } from './ReviewsPageInfo'
import { ReviewsPageLoaded } from './ReviewsPageLoaded'

const MOCK_SELECTED_CAR = 'Porsche Cayenne Turbo S'

export const ReviewsPage = () => {
	const isReviewsLoaded = true
	const isReviewsLoading = false

	return (
		<MainLayout>
			<StyledReviewsPage>
				<h2 className="page__title">
					{isReviewsLoaded ? `Отзывы об автомобилях ${MOCK_SELECTED_CAR}` : 'Подбор отзывов'}
				</h2>
				<div className="page__content">
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
				</div>
			</StyledReviewsPage>
		</MainLayout>
	)
}
