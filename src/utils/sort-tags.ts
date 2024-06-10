import { Tag } from '@entities/tag.types'

export const sortTags = (tags: Tag[], isDesc = true) => {
	const sortCallback = (a: Tag, b: Tag) => (isDesc ? b.count - a.count : a.count - b.count)

	return tags.sort(sortCallback)
}
