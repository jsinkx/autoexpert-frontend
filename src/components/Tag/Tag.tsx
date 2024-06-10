import { ComponentPropsWithoutRef, FC } from 'react'

import { tagLoadingSizes } from '@shared/tag-loading-sizes'

import { Skeleton } from '@mui/material'

import { Tag as TagType } from '@entities/tag.types'

import { StyledTag } from './Tag.styles'

type TagProps = {
	isLoading?: boolean
} & TagType &
	ComponentPropsWithoutRef<'div'>

export const Tag: FC<TagProps> = ({ isLoading, title, lemma, count, ...props }) => {
	const { width, height } = tagLoadingSizes[Math.floor(Math.random() * tagLoadingSizes.length)]!

	return isLoading ? (
		<StyledTag $isLoading title="Загрузка" {...props}>
			<Skeleton variant="rectangular" width={width} height={height} />
		</StyledTag>
	) : (
		<StyledTag title={`Встречается ${count} раз`} {...props}>
			{lemma} ({count})
		</StyledTag>
	)
}
