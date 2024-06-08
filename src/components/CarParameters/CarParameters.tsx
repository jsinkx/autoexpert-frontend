import { ComponentPropsWithoutRef, FC } from 'react'

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
	const isValidParams = true

	return (
		<StyledCarParameters {...props}>
			{isDisplayKeywordSearch && <CartParametersKeywordsSearch />}
			{isDisplayBrandParams && <CarParametersBrand />}
			{isDisplaySiteSources && <CarParametersSiteSources />}
			{isDisplaySynonyms && <CarParametersSynonyms />}
			{isValidParams && <Button variant="contained">Получить обзоры</Button>}
		</StyledCarParameters>
	)
}
