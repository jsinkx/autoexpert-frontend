import { ComponentPropsWithoutRef, FC } from 'react'

import { paths } from '@shared/paths'

import { StyledCustomLink, StyledHeader } from './Header.styles'

type HeaderProps = {} & ComponentPropsWithoutRef<'header'>

export const Header: FC<HeaderProps> = ({ ...props }) => {
	return (
		<StyledHeader {...props}>
			<nav>
				<h1 className="header__logo--text">
					<StyledCustomLink to={paths.reviews}>Автоэксперт</StyledCustomLink>
				</h1>
			</nav>
		</StyledHeader>
	)
}
