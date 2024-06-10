import { Tag } from '@entities/tag.types'

export const sortTags = (tags: Tag[], isDesc = true) => {
	const sortCallback = (firstTag: Tag, secondTag: Tag) =>
		isDesc ? secondTag.count - firstTag.count : firstTag.count - secondTag.count

	return tags.sort(sortCallback)
}
