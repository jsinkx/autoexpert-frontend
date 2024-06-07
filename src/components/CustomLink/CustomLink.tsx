import { FC, ReactNode, RefAttributes } from 'react'
import { LinkProps, NavLinkProps } from 'react-router-dom'

import { StyledCustomLink, StyledCustomNavLink } from './CustomLink.styles'

type CustomLinkProps = {
	children: ReactNode
	variant?: 'link' | 'navlink' | 'anchor'
} & (LinkProps | NavLinkProps)

export const CustomLink: FC<CustomLinkProps> = ({ children, variant = 'link', ...props }) => {
	switch (variant) {
		case 'link':
			props = props as LinkProps & RefAttributes<HTMLAnchorElement>

			return <StyledCustomLink {...props}>{children}</StyledCustomLink>
		case 'navlink':
			props = props as NavLinkProps & RefAttributes<HTMLAnchorElement>

			return <StyledCustomNavLink {...props}>{children}</StyledCustomNavLink>
		default:
			props = props as LinkProps & RefAttributes<HTMLAnchorElement>

			return <StyledCustomLink {...props}>{children}</StyledCustomLink>
	}
}
