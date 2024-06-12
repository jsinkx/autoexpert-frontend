import { useDispatch } from 'react-redux'

import { Status } from '@shared/status'

import { selectReviews } from '@redux/slices/reviews/selectors'
import { setSelectedTags, setTagsSorting, updateReviews } from '@redux/slices/reviews/slice'

import useAppSelector from '@hooks/useAppSelector'

import { Tag } from '@components/Tag/Tag'

import { Breadcrumbs } from '@mui/material'

import { Tag as TagType } from '@entities/tag.types'

const LOADING_TAGS = Array.from({ length: 17 }, () => ({
	id: '',
	title: '',
	lemma: '',
	count: 0,
	isAdjective: true,
})) as TagType[]

export const ReviewsPageLoadedTags = () => {
	const dispatch = useDispatch()

	const { status, tags: tagsData, tagsSorting, selectedTags } = useAppSelector(selectReviews)

	const isLoading = status === Status.LOADING

	const tags = isLoading ? LOADING_TAGS : tagsData
	const tagsSortingIsDesc = tagsSorting === 'desc'

	const handleClickSelectTag = (tag: TagType) => () => {
		dispatch(setSelectedTags(tag))

		dispatch(updateReviews())
	}

	const handleClickSetTagsSorting = (params: { isDesc: boolean }) => () => {
		dispatch(setTagsSorting(params))
	}

	return (
		<section className="reviews-loaded__block">
			{(!!tags.length || isLoading) && (
				<>
					<div className="reviews-loaded__block__title">
						<h3 className="reviews-loaded__block__title__text">Слова</h3>
						<Breadcrumbs aria-label="breadcrumb" className="reviews-loaded__block__title__breadcrumbs">
							<span
								onClick={handleClickSetTagsSorting({ isDesc: true })}
								className={`reviews-loaded__block__title__breadcrumbs__breadcrumb ${tagsSortingIsDesc && 'active'}`}
							>
								популярные
							</span>
							<span
								onClick={handleClickSetTagsSorting({ isDesc: false })}
								className={`reviews-loaded__block__title__breadcrumbs__breadcrumb ${!tagsSortingIsDesc && 'active'}`}
							>
								непопулярные
							</span>
						</Breadcrumbs>
					</div>
					<div className="reviews-loaded__block__tags">
						{tags.map((tag, index) => {
							const { id, title, lemma, count, isAdjective } = tag
							const isTagSelected =
								selectedTags.length === 0 || selectedTags.map((selectedTag) => selectedTag.id).includes(tag.id)

							return isAdjective ? (
								<Tag
									key={id || index}
									id={id}
									isLoading={isLoading}
									title={title}
									lemma={lemma}
									count={count}
									className={`reviews-loaded__block__tags__tag ${isTagSelected && 'reviews-loaded__block__tags__tag--active'}`}
									onClick={handleClickSelectTag(tag)}
								/>
							) : null
						})}
					</div>
				</>
			)}
		</section>
	)
}
