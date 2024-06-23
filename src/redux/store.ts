import { configureStore } from '@reduxjs/toolkit'

import { IS_PROD } from '@shared/constants'

import { reviewsApi } from '@redux/services/reviews-api/api'

import { carsReducer } from './slices/cars/slice'
import { reviewsReducer } from './slices/reviews/slice'
import { reviewChartsReducer } from './slices/reviewsCharts/slice'

export const store = configureStore({
	reducer: {
		cars: carsReducer,
		reviews: reviewsReducer,
		reviewsCharts: reviewChartsReducer,
		[reviewsApi.reducerPath]: reviewsApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(reviewsApi.middleware),
	devTools: !IS_PROD,
})
