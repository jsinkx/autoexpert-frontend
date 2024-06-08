import { ComponentPropsWithoutRef, FC } from 'react'

import AUTOEXPERT_LOGO from '@assets/images/autoexpert-logo.webp'

import { StyledLogo } from './Logo.styles'

type LogoProps = {} & ComponentPropsWithoutRef<'img'>

export const Logo: FC<LogoProps> = ({ ...props }) => {
	return <StyledLogo src={AUTOEXPERT_LOGO} alt="Autoexpert" {...props} />
}
