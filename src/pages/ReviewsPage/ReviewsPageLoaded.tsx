import { memo } from 'react'

import { Status } from '@shared/status'

import { selectReviews } from '@redux/slices/reviews/selectors'

import useAppSelector from '@hooks/useAppSelector'

import { Review } from '@components/Review/Review'
import { Tag } from '@components/Tag/Tag'

import { Review as ReviewType } from '@entities/review.types'
import { Tag as TagType } from '@entities/tag.types'

import { ReviewsPageError } from './ReviewsPageError'

const LOADING_TAGS = Array.from({ length: 17 }, () => ({
	id: '',
	title: '',
	lemma: '',
	count: 0,
})) as TagType[]
const LOADING_REVIEWS = Array.from({ length: 3 }, () => ({
	text: '',
	brand: '',
	model: '',
	body: '',
	score: '',
	source: '',
	sourceUrl: '',
})) as ReviewType[]

export const ReviewsPageLoaded = memo(() => {
	const { status, reviews: reviewsData, tags: tagsData, tagsSorting } = useAppSelector(selectReviews)

	const isLoading = status === Status.LOADING
	const isError = status === Status.ERROR

	const tags = tagsData.length === 0 || isLoading ? LOADING_TAGS : tagsData
	const reviews = reviewsData.length === 0 || isLoading ? LOADING_REVIEWS : reviewsData

	const tagsSortingLabel = tagsSorting === 'desc' ? 'Популярные' : 'Непопулярные'

	if (isError) return <ReviewsPageError />

	return (
		<div className="reviews-loaded">
			<section className="reviews-loaded__block">
				<h3 className="reviews-loaded__block__title">{tagsSortingLabel} слова</h3>
				<div className="reviews-loaded__block__tags">
					{tags.map(({ id, title, lemma, count }, index) => (
						<Tag
							key={id || index}
							id={id}
							isLoading={isLoading}
							title={title}
							lemma={lemma}
							count={count}
							className="reviews-loaded__block__tags__tag"
						/>
					))}
				</div>
			</section>
			<section className="reviews-loaded__block">
				<h3 className="reviews-loaded__block__title">Отзывы пользователей</h3>
				<div className="reviews-loaded__block__reviews">
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
							tags={tags}
							className="reviews-loaded__block__reviews__review"
						/>
					))}
				</div>
			</section>
		</div>
	)
})
