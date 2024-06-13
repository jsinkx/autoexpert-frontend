import { Review } from '@entities/review.types'
import { Tag } from '@entities/tag.types'

export const filterReviewsByTags = (reviews: Review[], tags: Tag[]) => {
	return reviews.filter((review) => {
		const tagsInReviewLemmas = review.tagsInText?.map((tag) => tag.lemma) || []

		return !!tagsInReviewLemmas.find((tagInReviewLemma) =>
			tags.map((tag) => tag.lemma).includes(tagInReviewLemma),
		)?.length

		// const words = review.text.split(' ')

		// return !!words.find((word) => {
		// 	const formattedWord = word.toLowerCase().replaceAll(ALL_SIGNS_REGEXP, '')
		// 	const tagsWords = tags.map((tag) => [tag.lemma.toLowerCase(), tag.title.toLowerCase()]).flat()

		// 	return tagsWords.includes(formattedWord)
		// })
	})
}
