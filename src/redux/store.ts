import { configureStore } from '@reduxjs/toolkit'

import { IS_PROD } from '@shared/constants'

import { carsSliceReducer } from './slices/cars/slice'

export const store = configureStore({
	reducer: {
		cars: carsSliceReducer,
	},
	devTools: !IS_PROD,
})
