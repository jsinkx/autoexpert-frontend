import { ComponentPropsWithoutRef, FC } from 'react'

import { paths } from '@shared/paths'

import { Logo } from '@components/Logo/Logo'

import { StyledCustomLink, StyledHeader } from './Header.styles'
import { HeaderMenu } from './HeaderMenu'

type HeaderProps = {} & ComponentPropsWithoutRef<'header'>

export const Header: FC<HeaderProps> = ({ ...props }) => {
	return (
		<StyledHeader {...props}>
			<nav className="header__nav">
				<h1 className="header__nav__logo--text">
					<Logo className="header__nav__logo--text__logo" />
					<StyledCustomLink to={paths.reviews}>Автоэксперт</StyledCustomLink>
				</h1>
				<HeaderMenu />
			</nav>
		</StyledHeader>
	)
}
