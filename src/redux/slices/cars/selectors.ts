import { RootState } from '@redux/types'

export const selectCarsState = (state: RootState) => state.cars

export const selectCars = (state: RootState) => state.cars.cars
export const selectSynonyms = (state: RootState) => state.cars.synonyms
