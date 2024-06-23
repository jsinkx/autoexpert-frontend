import { createApi } from '@reduxjs/toolkit/query/react'

import { axiosBaseQuery } from '../axios-base-query'
import { PostAddReviewRequest, PostAddReviewResponse } from './types'

export const reviewsApi = createApi({
	reducerPath: 'reviewsApi',
	baseQuery: axiosBaseQuery(),
	tagTypes: ['Reviews'],
	endpoints: (build) => ({
		addReview: build.mutation<PostAddReviewResponse, PostAddReviewRequest>({
			query: (params) => ({
				url: `/add_data/text`,
				method: 'POST',
				data: params,
			}),
		}),
	}),
})

export const { useAddReviewMutation } = reviewsApi
