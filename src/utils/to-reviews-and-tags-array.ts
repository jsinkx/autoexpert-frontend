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

		const review = {
			id: reviewId,
			text: thisReview.text.text,
			brand: thisReview.text.mark,
			model: thisReview.text.model,
			body: thisReview.text.body_type,
			score: thisReview.text.text_sentiment.label,
			source: thisReview.text.source,
			sourceUrl: thisReview.text.link,
		} as Review

		reviews.push(review)
	})

	const tags = Object.values(tagsObject) as Tag[]

	return { tags, reviews }
}
