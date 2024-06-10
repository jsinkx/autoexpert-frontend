import { REVIEWS_SORTING_OPTIONS } from '@shared/reviews-sorting-options'

import { GetReviewsResponse } from '@redux/slices/reviews/types'

import { Review } from '@entities/review.types'
import { Tag } from '@entities/tag.types'

export const toReviewsAndTagsArray = (data: GetReviewsResponse) => {
	const reviews = [] as Review[]

	const tagsObject: { [key: string]: Tag } = {}

	Object.keys(data).forEach((reviewId) => {
		const thisReview = data[reviewId]!

		thisReview.adjectives.forEach((adjective) => {
			// Collect adjectives
			const lemmaAdjective = adjective.adjective.lemma.toLowerCase()

			const tagAdjective = {
				id: `${adjective._id}_1`,
				title: adjective.adjective.word,
				lemma: lemmaAdjective,
				count: 1,
			} as Tag

			if (!tagsObject[lemmaAdjective]) {
				tagsObject[lemmaAdjective] = tagAdjective
			} else tagsObject[lemmaAdjective].count++

			// Collect keywords

			const lemmaKeyword = adjective.key_word.lemma.toLowerCase()

			const tagKeyword = {
				id: `${adjective._id}_2`,
				title: adjective.key_word.word,
				lemma: lemmaKeyword,
				count: 1,
			} as Tag

			if (!tagsObject[lemmaKeyword]) {
				tagsObject[lemmaKeyword] = tagKeyword
			} else tagsObject[lemmaKeyword].count++
		})

		const reviewText = thisReview.text

		const review = {
			id: reviewId,
			text: reviewText.text,
			brand: reviewText.mark,
			model: reviewText.model,
			body: reviewText.body_type,
			score: Object.keys(REVIEWS_SORTING_OPTIONS).includes(reviewText.text_sentiment.label)
				? reviewText.text_sentiment.label
				: 'NEUTRAL',
			source: reviewText.source,
			sourceUrl: reviewText.link,
		} as Review

		reviews.push(review)
	})

	const tags = Object.values(tagsObject) as Tag[]

	return { tags, reviews }
}
