import { useState } from 'react'

import { Colors } from '@shared/colors'
import { API_URL } from '@shared/constants'
import { paths } from '@shared/paths'

import { CustomLink } from '@components/CustomLink/CustomLink'

import MenuIcon from '@mui/icons-material/Menu'
import { IconButton, Menu, MenuItem } from '@mui/material'

const MENU_ITEMS = [
	{
		name: 'Подбор отзывов',
		path: paths.reviews,
	},
	{
		name: 'О нас',
		path: paths.aboutUs,
	},
	{
		name: 'API',
		path: `${API_URL}/docs`,
		isNextTab: true,
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
						color: Colors.WHITE,
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
				{MENU_ITEMS.map(({ name, path, isNextTab }) => (
					<MenuItem
						key={name}
						onClick={handleClose}
						sx={{
							padding: 0,
						}}
					>
						<CustomLink
							to={path}
							target={isNextTab ? '_blank' : '_self'}
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
