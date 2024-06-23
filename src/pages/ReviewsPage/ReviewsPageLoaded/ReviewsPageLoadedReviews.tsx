import { FC } from 'react'

import { REVIEWS_SORTING_OPTIONS } from '@shared/reviews-sorting-options'
import { Status } from '@shared/status'

import { selectReviews } from '@redux/slices/reviews/selectors'
import { setReviewsSorting } from '@redux/slices/reviews/slice'

import useAppDispatch from '@hooks/useAppDispatch'
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

type ReviewsPageLoadedReviewsProps = {
	reviewsOnPage: number
	currentPage: number
}

export const ReviewsPageLoadedReviews: FC<ReviewsPageLoadedReviewsProps> = ({
	reviewsOnPage,
	currentPage,
}) => {
	const dispatch = useAppDispatch()

	const {
		status,
		reviews: reviewsData,
		reviewsSorting,
		countReviewsByScore,
		tags,
	} = useAppSelector(selectReviews)

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
								{optionLabel} ({countReviewsByScore[optionKey as keyof typeof countReviewsByScore]})
							</span>
						)
					})}
				</Breadcrumbs>
			</div>
			<div className="reviews-loaded__block__reviews">
				{!reviews.length && !isLoading && (
					<Alert severity="warning"> Не удалось подобрать по заданным параметрам </Alert>
				)}
				{reviews
					.slice(reviewsOnPage * (currentPage - 1), (currentPage - 1) * reviewsOnPage + reviewsOnPage)
					.map(({ id, text, tagsInText = [], brand, model, body, score, source, sourceUrl }, index) => (
						<Review
							key={id || index}
							id={id}
							isLoading={isLoading}
							text={text}
							tagsInText={tagsInText}
							tags={tags}
							brand={brand}
							model={model}
							body={body}
							score={score}
							source={source}
							sourceUrl={sourceUrl}
							className="reviews-loaded__block__reviews__review"
						/>
					))}
			</div>
		</section>
	)
}
