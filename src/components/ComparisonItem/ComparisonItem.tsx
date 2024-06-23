import { ComponentPropsWithoutRef, FC, useState } from 'react'

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import { Badge, IconButton } from '@mui/material'

import { IndicatorItem } from '@entities/indicator-item.types'

import { StyledComparisonItem } from './ComparisonItem.styles'

type ComparisonItemProps = {
	isPros: boolean
	items: IndicatorItem[]
} & ComponentPropsWithoutRef<'div'>

const SHOW_TOP = 5

export const ComparisonItem: FC<ComparisonItemProps> = ({ isPros, items: _items, ...props }) => {
	const [isExpandedItem, setIsExpandedItem] = useState(false)

	const items = _items
		.map(({ name, count }) => ({ name, count }))
		.sort((a, b) => b.count - a.count)
		.slice(0, isExpandedItem ? _items.length : SHOW_TOP)

	const itemIcon = isPros ? (
		<AddCircleOutlineIcon fontSize="large" color="success" className="item-icon" />
	) : (
		<RemoveCircleOutlineIcon fontSize="large" color="error" className="item-icon" />
	)

	const handleClickExpandItem = () => {
		setIsExpandedItem((p) => !p)
	}

	return (
		<StyledComparisonItem $isPros={isPros} {...props}>
			<h3>{isPros ? 'ДОСТОИНСТВА' : 'НЕДОСТАТКИ'}</h3>
			<ul className="comparison-item__list">
				{items.map(({ name, count }) => {
					const itemsTotalCount = _items.map(({ count: _count }) => _count).reduce((a, b) => a + b, 0)
					const itemPercentage = ((count / itemsTotalCount) * 100).toFixed(2)

					return (
						<li key={name} className="comparison-item__list__item">
							{itemIcon}
							<span>
								{name} - <span className="comparison-item__list__item--percentage"> {itemPercentage}% </span>
							</span>
							<span className="comparison-item__list__item--count"> {count} </span>
						</li>
					)
				})}
			</ul>
			{_items.length > SHOW_TOP && (
				<IconButton onClick={handleClickExpandItem} className="open-more" size="large">
					{isExpandedItem ? (
						<KeyboardArrowUpIcon fontSize="large" />
					) : (
						<Badge badgeContent={_items.length - SHOW_TOP} color={isPros ? 'success' : 'error'}>
							<KeyboardArrowDownIcon fontSize="large" />
						</Badge>
					)}
				</IconButton>
			)}
		</StyledComparisonItem>
	)
}
