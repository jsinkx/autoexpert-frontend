import { ComponentPropsWithoutRef, FC, memo } from 'react'

import { paths } from '@shared/paths'

import { Logo } from '@components/Logo/Logo'

import { StyledCustomLink, StyledHeader } from './Header.styles'

type HeaderProps = {} & ComponentPropsWithoutRef<'header'>

export const Header: FC<HeaderProps> = memo(({ ...props }) => {
	return (
		<StyledHeader {...props}>
			<nav>
				<h1 className="header__logo--text">
					<Logo className="header__logo--text__logo" />
					<StyledCustomLink to={paths.reviews}>Автоэксперт</StyledCustomLink>
				</h1>
			</nav>
		</StyledHeader>
	)
})
