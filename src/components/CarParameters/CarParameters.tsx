import { ComponentPropsWithoutRef, FC } from 'react'

import { isValidGetReviewsParams } from '@utils/is-valid-get-reviews-params'

import { selectCarsState } from '@redux/slices/cars/selectors'

import useAppSelector from '@hooks/useAppSelector'

import { Button } from '@mui/material'

import { StyledCarParameters } from './CarParameters.styles'
import { CarParametersBrand } from './CarParametersBrand'
import { CarParametersSiteSources } from './CarParametersSiteSources'
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
	const { currentKeyword, currentBrand, currentModel, currentBody } = useAppSelector(selectCarsState)
	const isValidParams = isValidGetReviewsParams(currentKeyword, currentBrand, currentModel, currentBody)

	return (
		<StyledCarParameters {...props}>
			{isDisplayKeywordSearch && <CartParametersKeywordsSearch />}
			{isDisplayBrandParams && <CarParametersBrand />}
			{/* FIXME: if we have reviews, render this option */}
			{isDisplaySiteSources && <CarParametersSiteSources />}
			{isDisplaySynonyms && <CarParametersSynonyms />}
			<Button variant="contained" disabled={!isValidParams.isValid}>
				{isValidParams.message}
			</Button>
		</StyledCarParameters>
	)
}
