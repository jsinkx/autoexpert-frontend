import { ComponentPropsWithoutRef, FC, Fragment, useState } from 'react'

import { ALL_SIGNS_REGEXP, PUNCTUATION_REGEXP } from '@shared/regexps'

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
} & ReviewType &
	ComponentPropsWithoutRef<'div'>

const selectTagsInText = (text: string, tags: Tag[]) => {
	const textArray = text.split(' ')

	return textArray.map((spitedText, index) => {
		const formattedWord = spitedText.toLowerCase().replaceAll(ALL_SIGNS_REGEXP, '')
		const tagsWords = tags.map((tag) => [tag.lemma.toLowerCase(), tag.title.toLowerCase()]).flat()

		if (tagsWords.includes(formattedWord)) {
			return (
				// eslint-disable-next-line react/no-array-index-key
				<Fragment key={index}>
					<span className="review__text__word--founded-in-tags">{spitedText.replace(PUNCTUATION_REGEXP, '')}</span>
					{spitedText.match(PUNCTUATION_REGEXP)?.join()}{' '}
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
	tagsInText = [],
	tags = [],
	brand,
	model,
	body,
	score,
	source,
	sourceUrl,
	...props
}) => {
	const selectedTagsInText = isLoading ? [] : selectTagsInText(text, [...tags, ...tagsInText])
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
				{sourceUrl !== '' && (
					<CustomLink to={sourceUrl} target="_blank" className="review__title--source-url">
						Читать полностью
						<ReviewSiteSourceIcon source={source} />
					</CustomLink>
				)}
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
