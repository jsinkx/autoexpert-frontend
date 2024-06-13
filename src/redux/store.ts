import { configureStore } from '@reduxjs/toolkit'

import { IS_PROD } from '@shared/constants'

import { carsReducer } from './slices/cars/slice'
import { reviewsReducer } from './slices/reviews/slice'
import { reviewChartsReducer } from './slices/reviewsCharts/slice'

export const store = configureStore({
	reducer: {
		cars: carsReducer,
		reviews: reviewsReducer,
		reviewsCharts: reviewChartsReducer,
	},
	devTools: !IS_PROD,
})
