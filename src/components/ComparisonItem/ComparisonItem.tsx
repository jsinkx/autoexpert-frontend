import { ComponentPropsWithoutRef, FC } from 'react'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'

import { IndicatorItem } from '@entities/indicator-item.types'

import { StyledComparisonItem } from './ComparisonItem.styles'

type ComparisonItemProps = {
	isPros: boolean
	items: IndicatorItem[]
} & ComponentPropsWithoutRef<'div'>

export const ComparisonItem: FC<ComparisonItemProps> = ({ isPros, items: _items, ...props }) => {
	const items = _items.map(({ name, count }) => ({ name, count })).sort((a, b) => b.count - a.count)

	return (
		<StyledComparisonItem $isPros={isPros} {...props}>
			{isPros ? <AddCircleOutlineIcon fontSize="large" /> : <RemoveCircleOutlineIcon fontSize="large" />}
			{/* <h3>{isPros ? 'Достоинства' : 'Недостатки'}</h3> */}

			<ul className="comparison-item__list">
				{items.map(({ name, count }) => (
					<li key={name} className="comparison-item__list__item">
						{name} ({count})
					</li>
				))}
			</ul>
		</StyledComparisonItem>
	)
}
