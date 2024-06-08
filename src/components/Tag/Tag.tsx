import { ComponentPropsWithoutRef, FC } from 'react'

import { StyledTag } from './Tag.styles'
import { TagType } from './Tag.types'

type TagProps = {} & TagType & ComponentPropsWithoutRef<'div'>

export const Tag: FC<TagProps> = ({ title, count, ...props }) => {
	return (
		<StyledTag title={`Встречается ${count} раз`} {...props}>
			{title} ({count})
		</StyledTag>
	)
}
