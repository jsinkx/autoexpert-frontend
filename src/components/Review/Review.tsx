import { ComponentPropsWithoutRef, FC, Fragment, useState } from 'react'

import { CustomLink } from '@components/CustomLink/CustomLink'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { IconButton, Skeleton } from '@mui/material'

import { Review as ReviewType } from '@entities/review.types'
import { Tag } from '@entities/tag.types'

import { ReviewRateIcon } from './ReviewRateIcon'
import { ReviewSiteSourceIcon } from './ReviewSiteSourceIcon'
import { StyledReview } from './Reviews.styles'

type ReviewProps = {
	isLoading?: boolean
	tags?: Tag[]
} & ReviewType &
	ComponentPropsWithoutRef<'div'>

const PUNCTUATION_REGEXP = /[\s.,%]/g

const selectTagsInText = (text: string, tags: Tag[]) => {
	const textArray = text.split(' ')

	return textArray.map((spitedText, index) => {
		const formattedWord = spitedText.toLowerCase().replace(PUNCTUATION_REGEXP, '')
		const punctuation = spitedText.match(PUNCTUATION_REGEXP)
		const tagsLemmas = tags.map((tag) => tag.lemma.toLowerCase())

		if (tagsLemmas.includes(formattedWord)) {
			return (
				// eslint-disable-next-line react/no-array-index-key
				<Fragment key={index}>
					<span className="review__text__word--founded-in-tags">{spitedText.replace(PUNCTUATION_REGEXP, '')}</span>
					<span>{punctuation?.join('')}</span>
				</Fragment>
			)
		}

		// eslint-disable-next-line react/no-array-index-key
		return <span key={index}> {spitedText} </span>
	})
}

const MAX_REVIEW_TEXT_LENGTH = 430

export const Review: FC<ReviewProps> = ({
	isLoading,
	id,
	text,
	brand,
	model,
	body,
	score,
	source,
	sourceUrl,
	tags = [],
	...props
}) => {
	const selectedTagsInText = isLoading ? [] : selectTagsInText(text, tags)
	const [isExpandedReview, setIsExpandedReview] = useState(false)

	const handleClickExpandReview = () => {
		setIsExpandedReview(!isExpandedReview)
	}

	return isLoading ? (
		<StyledReview $isLoading $score={score} title="Загрузка" {...props}>
			<Skeleton variant="rectangular" height={130} />
		</StyledReview>
	) : (
		<StyledReview $score={score} {...props}>
			<div className="review__title">
				<ReviewRateIcon score={score} />
				<h5 className="review__title--header">
					{brand} {model} {body}
				</h5>

				<CustomLink to={sourceUrl} target="_blank" className="review__title--source-url">
					Читать полностью
					<ReviewSiteSourceIcon source={source} />
				</CustomLink>
			</div>
			<p className={`review__text ${isExpandedReview && 'review__text--expanded'}`}> {selectedTagsInText} </p>
			{text.length > MAX_REVIEW_TEXT_LENGTH && (
				<IconButton onClick={handleClickExpandReview} className="review__open-more" size="large">
					{isExpandedReview ? (
						<KeyboardArrowUpIcon fontSize="large" />
					) : (
						<KeyboardArrowDownIcon fontSize="large" />
					)}
				</IconButton>
			)}
		</StyledReview>
	)
}
