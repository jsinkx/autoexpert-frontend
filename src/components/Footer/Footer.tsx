import { FC } from 'react'

import { StyledFooter } from './Footer.styles'

type FooterProps = {}

export const Footer: FC<FooterProps> = () => {
	return (
		<StyledFooter>
			<p> Code by jsink </p>
		</StyledFooter>
	)
}
