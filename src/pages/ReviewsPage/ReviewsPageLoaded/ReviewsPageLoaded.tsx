import { useEffect, useState } from 'react'

import { Status } from '@shared/status'

import { selectReviews } from '@redux/slices/reviews/selectors'

import useAppSelector from '@hooks/useAppSelector'

import { Pagination } from '@mui/material'

import { ReviewsPageError } from '../ReviewsPageError'
import { ReviewsPageLoadedReviews } from './ReviewsPageLoadedReviews'
import { ReviewsPageLoadedTags } from './ReviewsPageLoadedTags'

const DISPLAY_REVIEWS_COUNT_ON_PAGE = 10

export const ReviewsPageLoaded = () => {
	const { status, reviews, _reviews } = useAppSelector(selectReviews)

	const [currentPage, setCurrentPage] = useState(1)

	const countPages = Math.ceil(reviews.length / DISPLAY_REVIEWS_COUNT_ON_PAGE)

	const handleClickChangePage = (_: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value)
	}

	const isError = status === Status.ERROR

	useEffect(() => {
		setCurrentPage(1)
	}, [_reviews])

	if (isError) return <ReviewsPageError />

	return (
		<div className="reviews-loaded">
			<ReviewsPageLoadedTags />
			<ReviewsPageLoadedReviews reviewsOnPage={DISPLAY_REVIEWS_COUNT_ON_PAGE} currentPage={currentPage} />
			{reviews.length > DISPLAY_REVIEWS_COUNT_ON_PAGE && (
				<Pagination
					page={currentPage}
					count={countPages}
					onChange={handleClickChangePage}
					size="large"
					className="reviews-loaded__pagination"
				/>
			)}
		</div>
	)
}
