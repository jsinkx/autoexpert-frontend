import { ComponentPropsWithoutRef, FC, MouseEventHandler } from 'react'

import { Status } from '@shared/status'

import { isValidGetReviewsParams } from '@utils/is-valid-get-reviews-params'

import { selectCarsState } from '@redux/slices/cars/selectors'
import { selectReviews } from '@redux/slices/reviews/selectors'

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
	isDisplayButtonApply?: boolean
	isLoading?: boolean
	buttonText?: string
	callback: () => void
} & ComponentPropsWithoutRef<'article'>

export const CarParameters: FC<CarParametersProps> = ({
	isDisplayKeywordSearch = false,
	isDisplayBrandParams = false,
	isDisplaySynonyms = false,
	isDisplayButtonApply = false,
	isLoading: isLoadingQuery = false,
	buttonText = 'Получить',
	callback,
	children,
	...props
}) => {
	const { currentKeyword, currentBrand, currentModel, currentBody, currentSynonyms } =
		useAppSelector(selectCarsState)

	const { status: statusReviews } = useAppSelector(selectReviews)
	const isValidParams = isValidGetReviewsParams({
		keyword: {
			value: currentKeyword,
			active: isDisplayKeywordSearch,
		},
		brand: {
			value: currentBrand,
			active: isDisplayBrandParams,
		},
		model: { value: currentModel, active: isDisplayBrandParams },
		body: { value: currentBody, active: isDisplayBrandParams },
		synonyms: { value: currentSynonyms, active: isDisplaySynonyms },
		isLoading: isLoadingQuery || statusReviews === Status.LOADING,
	})

	const handleClickGetReviews: MouseEventHandler<HTMLButtonElement> = () => {
		callback()
	}

	return (
		<StyledCarParameters {...props}>
			{isDisplayKeywordSearch && <CartParametersKeywordsSearch />}
			{isDisplayBrandParams && <CarParametersBrand />}
			{isDisplaySynonyms && <CarParametersSynonyms />}
			{/* Extra parameters */}
			{children}
			{isDisplayButtonApply && (
				<Button onClick={handleClickGetReviews} variant="contained" disabled={!isValidParams.isValid}>
					{isValidParams.isValid ? buttonText : isValidParams.message}
				</Button>
			)}
		</StyledCarParameters>
	)
}
