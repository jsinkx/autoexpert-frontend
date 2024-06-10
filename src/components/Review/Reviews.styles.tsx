import styled from 'styled-components'

import { Colors } from '@shared/colors'

type StyledReviewProps = {
	$score: string
	$isLoading?: boolean
}

const getColorByScore = (score: string) => {
	switch (score) {
		case 'POSITIVE':
			return Colors.GREEN
		case 'NEGATIVE':
			return Colors.RED
		default:
			return Colors.BLUE_ELEMENT_BACKGROUND_COLOR
	}
}

export const StyledReview = styled.article<StyledReviewProps>`
	padding: 10px;
	border-radius: 4px;
	background-color: ${({ $score }) => getColorByScore($score)};
	box-sizing: border-box;

	${({ $isLoading }) =>
		$isLoading &&
		`
		padding: 0;
		background-color: initial;
	`}

	.review__site-source-icon {
		width: 30px;
		margin-left: 10px;
		user-select: none;
	}

	.review__title {
		display: flex;
		align-items: center;

		&--header {
			margin: 0;
			margin-left: 10px;
			font-size: 1.4em;
		}

		&--source-url {
			width: 50%;
			margin-right: 10px;
			margin-left: auto;
			font-size: 1em;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			user-select: none;
		}
	}

	.review__text {
		max-height: 120px;
		margin-top: 10px;
		margin-bottom: 5px;
		font-size: 1.3em;
		overflow: hidden;

		&--expanded {
			max-height: none;
		}

		&__word--founded-in-tags {
			padding-inline: 1px 3px;
			border-radius: 4px;
			background-color: ${Colors.ORANGE};
		}
	}

	.review__open-more {
		margin-inline: auto;
		display: flex;
		justify-content: center;
	}
`
