import { FC } from 'react'

import { StyledHeader } from './Header.styles'

type HeaderProps = {}

export const Header: FC<HeaderProps> = () => {
	return (
		<StyledHeader>
			<h1> Автоэксперт </h1>
		</StyledHeader>
	)
}
