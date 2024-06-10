import { memo } from 'react'
import { useDispatch } from 'react-redux'

import { REVIEWS_SORTING_OPTIONS } from '@shared/reviews-sorting-options'
import { Status } from '@shared/status'

import { selectReviews } from '@redux/slices/reviews/selectors'
import { setReviewsSorting } from '@redux/slices/reviews/slice'

import useAppSelector from '@hooks/useAppSelector'

import { Review } from '@components/Review/Review'

import { Alert, Breadcrumbs } from '@mui/material'

import { Review as ReviewType } from '@entities/review.types'

const LOADING_REVIEWS = Array.from({ length: 3 }, () => ({
	text: '',
	brand: '',
	model: '',
	body: '',
	score: '',
	source: '',
	sourceUrl: '',
})) as ReviewType[]

export const ReviewsPageLoadedReviews = memo(() => {
	const dispatch = useDispatch()

	const { status, reviews: reviewsData, tags: tagsData, reviewsSorting } = useAppSelector(selectReviews)

	const isLoading = status === Status.LOADING

	const reviews = isLoading ? LOADING_REVIEWS : reviewsData

	const handleClickSetTagsSorting = (params: { score: '' | 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL' }) => () => {
		dispatch(setReviewsSorting(params))
	}

	return (
		<section className="reviews-loaded__block">
			<div className="reviews-loaded__block__title">
				<h3 className="reviews-loaded__block__title__text">Отзывы пользователей</h3>
			</div>
			<div className="reviews-loaded__block__parameters">
				<span> Показывать сначала </span>
				<Breadcrumbs aria-label="breadcrumb" className="reviews-loaded__block__parameters__breadcrumbs">
					{Object.keys(REVIEWS_SORTING_OPTIONS)!.map((optionKey) => {
						const optionLabel = REVIEWS_SORTING_OPTIONS[optionKey as keyof typeof REVIEWS_SORTING_OPTIONS]

						return (
							<span
								onClick={handleClickSetTagsSorting({ score: optionKey as keyof typeof REVIEWS_SORTING_OPTIONS })}
								className={`reviews-loaded__block__parameters__breadcrumbs__breadcrumb ${reviewsSorting === optionKey && 'active'}`}
								key={optionKey}
							>
								{optionLabel}
							</span>
						)
					})}
				</Breadcrumbs>
			</div>
			<div className="reviews-loaded__block__reviews">
				{!reviews.length && !isLoading && (
					<Alert severity="warning"> Не удалось подобрать по заданным параметрам </Alert>
				)}
				{reviews.map(({ id, text, brand, model, body, score, source, sourceUrl }, index) => (
					<Review
						key={id || index}
						id={id}
						isLoading={isLoading}
						text={text}
						brand={brand}
						model={model}
						body={body}
						score={score}
						source={source}
						sourceUrl={sourceUrl}
						tags={tagsData}
						className="reviews-loaded__block__reviews__review"
					/>
				))}
			</div>
		</section>
	)
})
