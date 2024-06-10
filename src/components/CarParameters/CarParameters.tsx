import { ComponentPropsWithoutRef, FC } from 'react'

import { Status } from '@shared/status'

import { isValidGetReviewsParams } from '@utils/is-valid-get-reviews-params'

import { selectCarsState } from '@redux/slices/cars/selectors'
import { selectReviews } from '@redux/slices/reviews/selectors'
import { fetchReviews } from '@redux/slices/reviews/slice'

import useAppDispatch from '@hooks/useAppDispatch'
import useAppSelector from '@hooks/useAppSelector'

import { Button } from '@mui/material'

import { StyledCarParameters } from './CarParameters.styles'
import { CarParametersBrand } from './CarParametersBrand'
import { CarParametersSynonyms } from './CarParametersSynonyms'
import { CartParametersKeywordsSearch } from './CartParametersKeywordsSearch'

type CarParametersProps = {
	isDisplayKeywordSearch?: boolean
	isDisplayBrandParams?: boolean
	isDisplaySiteSources?: boolean
	isDisplaySynonyms?: boolean
} & ComponentPropsWithoutRef<'article'>

export const CarParameters: FC<CarParametersProps> = ({
	isDisplayKeywordSearch,
	isDisplayBrandParams,
	isDisplaySiteSources,
	isDisplaySynonyms,
	...props
}) => {
	const dispatch = useAppDispatch()

	const { currentKeyword, currentBrand, currentModel, currentBody, currentSynonyms } =
		useAppSelector(selectCarsState)

	const { status: statusReviews } = useAppSelector(selectReviews)
	const isValidParams = isValidGetReviewsParams({
		keyword: currentKeyword,
		brand: currentBrand,
		model: currentModel,
		body: currentBody,
		synonyms: currentSynonyms,
		isLoading: statusReviews === Status.LOADING,
	})

	const handleClickGetReviews = () => {
		const params = {
			words: currentSynonyms,
			marks: [currentBrand!],
			models: [currentModel!],
			body_types: [currentBody!],
		}

		dispatch(fetchReviews(params))
	}

	return (
		<StyledCarParameters {...props}>
			{isDisplayKeywordSearch && <CartParametersKeywordsSearch />}
			{isDisplayBrandParams && <CarParametersBrand />}
			{isDisplaySynonyms && <CarParametersSynonyms />}
			<Button onClick={handleClickGetReviews} variant="contained" disabled={!isValidParams.isValid}>
				{isValidParams.message}
			</Button>
		</StyledCarParameters>
	)
}
