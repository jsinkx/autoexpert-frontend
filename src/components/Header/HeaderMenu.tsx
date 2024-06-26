import { useState } from 'react'

import { Colors } from '@shared/colors'
import { paths } from '@shared/paths'

import { CustomLink } from '@components/CustomLink/CustomLink'

import MenuIcon from '@mui/icons-material/Menu'
import { IconButton, Menu, MenuItem } from '@mui/material'

const MENU_ITEMS = [
	{
		name: 'О нас',
		path: paths.aboutUs,
	},
	{
		name: 'Добавить отзыв',
		path: paths.addReview,
	},
	{
		name: 'Подбор отзывов',
		path: paths.reviews,
	},
	{
		name: 'Облако слов отзывов',
		path: paths.wordcloud,
	},
	{
		name: 'Сравнение показателей',
		path: paths.indicatorsComparison,
	},
	{
		name: 'Средняя оценка автомобилей',
		path: paths.avgCarScores,
	},
	{
		name: 'Рейтинг отзывов автомобилей',
		path: paths.reviewsScores,
	},
]

export const HeaderMenu = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
	const open = Boolean(anchorEl)
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget)
	}
	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<>
			<IconButton
				id="basic-button"
				aria-controls={open ? 'header-navigation-menu' : undefined}
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onClick={handleClick}
			>
				<MenuIcon
					sx={{
						color: Colors.BLACK,
					}}
				/>
			</IconButton>
			<Menu
				id="header-navigation-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
			>
				{MENU_ITEMS.map(({ name, path }) => (
					<MenuItem
						key={name}
						onClick={handleClose}
						sx={{
							padding: 0,
						}}
					>
						<CustomLink
							to={path}
							style={{
								width: '100%',
								padding: '10px',
								color: Colors.BLACK,
							}}
						>
							{name}
						</CustomLink>
					</MenuItem>
				))}
			</Menu>
		</>
	)
}
