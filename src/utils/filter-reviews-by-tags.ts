import { ALL_SIGNS_REGEXP } from '@shared/regexps'

import { Review } from '@entities/review.types'
import { Tag } from '@entities/tag.types'

export const filterReviewsByTags = (reviews: Review[], tags: Tag[]) => {
	return reviews.filter((review) => {
		const words = review.text.split(' ')

		return !!words.find((word) => {
			const formattedWord = word.toLowerCase().replaceAll(ALL_SIGNS_REGEXP, '')
			const tagsWords = tags.map((tag) => [tag.lemma.toLowerCase(), tag.title.toLowerCase()]).flat()

			return tagsWords.includes(formattedWord)
		})
	})
}
