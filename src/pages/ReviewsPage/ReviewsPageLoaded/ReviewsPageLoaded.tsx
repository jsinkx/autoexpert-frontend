import { memo } from 'react'

import { Status } from '@shared/status'

import { selectReviews } from '@redux/slices/reviews/selectors'

import useAppSelector from '@hooks/useAppSelector'

import { ReviewsPageError } from '../ReviewsPageError'
import { ReviewsPageLoadedReviews } from './ReviewsPageLoadedReviews'
import { ReviewsPageLoadedTags } from './ReviewsPageLoadedTags'

export const ReviewsPageLoaded = memo(() => {
	const { status } = useAppSelector(selectReviews)

	const isError = status === Status.ERROR

	if (isError) return <ReviewsPageError />

	// TODO: fix long rerender after change sorting

	return (
		<div className="reviews-loaded">
			<ReviewsPageLoadedTags />
			<ReviewsPageLoadedReviews />
		</div>
	)
})
