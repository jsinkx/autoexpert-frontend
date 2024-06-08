import { ComponentPropsWithoutRef, FC, useState } from 'react'

import { CustomLink } from '@components/CustomLink/CustomLink'
import { TagType } from '@components/Tag/Tag.types'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { IconButton } from '@mui/material'

import { ReviewRateIcon } from './ReviewRateIcon'
import { ReviewSiteSourceIcon } from './ReviewSiteSourceIcon'
import { StyledReview } from './Reviews.styles'

type ReviewProps = {
	text: string
	brand: string
	model: string
	body: string
	score: string
	source: string
	sourceUrl: string
	tags?: TagType[]
} & ComponentPropsWithoutRef<'div'>

const selectTagsInText = (text: string, tags: TagType[]) => {
	const textArray = text.split(' ')

	return textArray.map((spitedText, index) => {
		const formattedWord = spitedText.toLowerCase().replace(/[\s.,%]/g, '')
		const tagsTitles = tags.map((tag) => tag.title.toLowerCase())

		if (tagsTitles.includes(formattedWord)) {
			return (
				// eslint-disable-next-line react/no-array-index-key
				<span key={index} className="review__text__word--founded-in-tags">
					{spitedText}
				</span>
			)
		}

		// eslint-disable-next-line react/no-array-index-key
		return <span key={index}> {spitedText} </span>
	})
}

const MAX_REVIEW_TEXT_LENGTH = 398

export const Review: FC<ReviewProps> = ({
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
	const selectedTagsInText = selectTagsInText(text, tags)
	const [isExpandedReview, setIsExpandedReview] = useState(false)

	const handleClickExpandReview = () => {
		setIsExpandedReview(!isExpandedReview)
	}

	return (
		<StyledReview $score={score} {...props}>
			<div className="review__title">
				<ReviewRateIcon score={score} />
				<h5 className="review__title--header">
					{brand} {model} {body}
				</h5>

				<CustomLink to={sourceUrl} target="_blank" className="review__title--source-url">
					Прямая ссылка
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
